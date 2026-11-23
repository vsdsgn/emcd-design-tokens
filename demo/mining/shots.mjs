#!/usr/bin/env node
// Демо K4: скриншоты 15 экранов майнинга (Playwright Chromium) и сравнение с макетами Figma.
//   npm run demo:mining  →  demo/mining/out/<screen>.png + out/compare-<screen>.png (макет | код | разница) + out/web-dashboard-hover.png (hover графика)
//   + загрузка дашбордов (?state=loading, patterns 3.11a) → out/<screen>-loading.png; высоты блоков (сводка, факты, график, плитки статусов) в загрузке = после загрузки (±1 px), иначе провал
// Репо раздаётся статически (свой http-сервер), браузер не скачивается — берётся установленный Playwright.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const OUT = path.join(ROOT, 'demo/mining/out');
const SCREENS = [
  ['web-dashboard', 1440, 900], ['web-workers', 1440, 900], ['web-history', 1440, 900],
  ['mw-dashboard', 375, 812, true], ['mw-workers', 375, 812], ['mw-history', 375, 812],
  // 19.11: Калькулятор (3.10a), Watcher-link и Настройки (3.9a); макеты Watcher-link и Настроек — 1200 × 750 (кадр 1440 в масштабе) → в сравнении растягиваются до ширины страницы
  ['web-calculator', 1440, 914], ['mw-calculator', 375, 812, true], ['web-watcher', 1440, 900], ['web-settings', 1440, 900],
  // 19.11: макеты экранов DS (Figma «… · DS 2.0»): мобильные 370 × 800 (кадр 375 в масштабе), «Вывод» — 375 × 1042 (вся высота), Выплаты Web — 1200 × 750
  ['web-payouts', 1440, 900], ['mw-payouts', 375, 812], ['mw-watcher', 375, 812], ['mw-settings-notify', 375, 812], ['mw-settings-withdraw', 375, 812, true],
  // 19.11: App (iOS) — экраны «… · App · DS 2.0» (статус-бар — устройство, в коде только его высота 54)
  ['app-dashboard', 375, 1609, true], ['app-workers', 375, 812], ['app-history', 375, 812], ['app-payouts', 375, 812],
  ['app-calculator', 375, 812, true], ['app-settings-withdraw', 375, 812], ['app-settings-notify', 375, 812], ['app-watcher', 375, 812], ['app-export', 375, 812], ['app-main-dashboard', 375, 812],
  // 22.11: пилот цели 3 — Мониторинг · Главная (Web 1440, вся высота), WL B2B · Users (Web), WL B2C · Statistics (App 375, вся высота)
  ['mon-main', 1440, 1807, true], ['b2b-users', 1440, 1060], ['b2c-statistics', 375, 1115, true],
  // 23.11: H7 — Мониторинг · Площадки, Детали устройства; WL B2B · User profile · Mining
  ['mon-sites', 1440, 900], ['mon-device', 1440, 900], ['b2b-profile', 1440, 1391, true]];
const only = process.argv.slice(2);
// Блоки, чья высота в загрузке (State=Skeleton) должна совпасть с загруженной: [подпись, селектор] — каждый найденный элемент по порядку
const LOADING_BLOCKS = {
  'web-dashboard': [['сводка', '.demo-summary'], ['факты', '.demo-facts'], ['график', '.demo-chart'], ['показатель графика', '.emcd-chart-metric'], ['легенда', '.emcd-chart-card__legend'],
    ['область графика', '.emcd-chart-plot'], ['плитка статуса', '.emcd-status-summary__tile'], ['ряд графика', '.demo-chart-row']],
  'mw-dashboard': [['сводка', '.demo-mw-summary'], ['факты', '.demo-mw-facts'], ['график', '.demo-chart--mw'], ['показатель графика', '.emcd-chart-metric'], ['легенда', '.emcd-chart-card__legend'],
    ['область графика', '.emcd-chart-plot'], ['плитка статуса', '.emcd-status-summary__tile'], ['сводка статусов', '.emcd-status-summary']],
};
const heights = (page, blocks) => page.evaluate((bl) => bl.flatMap(([label, sel]) => [...document.querySelectorAll(sel)].map((el, i) => ({ key: `${label} ${i + 1}`, h: el.getBoundingClientRect().height }))), blocks);
const heightFails = [];
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.png': 'image/png', '.svg': 'image/svg+xml', '.json': 'application/json', '.woff2': 'font/woff2' };

const server = http.createServer((req, res) => {
  const p = path.normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^([/\\])+/, '');
  const f = path.join(ROOT, p);
  if (!f.startsWith(ROOT) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' });
  fs.createReadStream(f).pipe(res);
});
await new Promise((r) => server.listen(0, '127.0.0.1', r));
const base = `http://127.0.0.1:${server.address().port}`;
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const errors = [];
try {
  for (const [name, w, hgt, full] of SCREENS) {
    if (only.length && !only.includes(name)) continue;
    const ctx = await browser.newContext({ viewport: { width: w, height: hgt }, deviceScaleFactor: 1, colorScheme: 'dark' });
    const page = await ctx.newPage();
    page.on('pageerror', (e) => errors.push(`${name}: ${e.message}`));
    page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errors.push(`${name}: console ${m.type()}: ${m.text()}`); });
    const load = async (pg, query = '') => {
      await pg.goto(`${base}/demo/mining/${name}.html${query}`, { waitUntil: 'networkidle' });
      // Шрифты бренда (Roobert PRO, IBM Plex Mono) лицензионные и в репо их нет: на стенде — ближайшие по метрикам свободные (только для скриншота)
      if (!process.env.DEMO_REAL_FONTS) await pg.addStyleTag({ content: "@font-face{font-family:'Roobert PRO';src:local('Liberation Sans'),local('Arial')}@font-face{font-family:'IBM Plex Mono';src:local('Liberation Mono'),local('Courier New')}" });
      await pg.waitForSelector('#root > *');
      await pg.evaluate(() => document.fonts.ready);
    };
    await load(page);
    const shot = path.join(OUT, `${name}.png`);
    // Вся высота: окно растягивается до высоты страницы — закреплённый снизу Action bar (sticky) встаёт в конец страницы, как на макете
    if (full) await page.setViewportSize({ width: w, height: await page.evaluate(() => document.documentElement.scrollHeight) });
    await page.screenshot({ path: shot, fullPage: !!full });
    if (full) await page.setViewportSize({ width: w, height: hgt });
    // Hover графика (Chart crosshair + Chart tooltip): указатель на ~60 % ширины области → out/web-dashboard-hover.png (без сравнения — в макетах hover нет)
    if (name === 'web-dashboard') {
      const b = await page.locator('.emcd-chart-plot__area-box').first().boundingBox();
      await page.mouse.move(b.x + b.width * 0.6, b.y + b.height * 0.5);
      await page.waitForSelector('.emcd-chart-plot__tooltip[style*="visible"]');
      await page.screenshot({ path: path.join(OUT, `${name}-hover.png`) });
      await page.mouse.move(0, 0);
      await page.waitForSelector('.emcd-chart-plot__tooltip', { state: 'detached' });
    }
    // Период в «Истории»: клик по полю открывает Date range panel, Esc закрывает (без скриншота)
    if (name === 'web-history') {
      await page.click('.demo-filters__period input');
      await page.waitForSelector('.emcd-date-panel');
      await page.keyboard.press('Escape');
      await page.waitForSelector('.emcd-date-panel', { state: 'detached' });
    }
    // Сравнение: макет | код | разница (mix-blend-mode: difference) — в той же странице, без зависимостей; макет приводится к ширине страницы (другой масштаб кадра)
    const ref = fs.readFileSync(path.join(ROOT, `demo/mining/reference/${name}.png`)).toString('base64');
    const cur = fs.readFileSync(shot).toString('base64');
    const cmp = await ctx.newPage();
    await cmp.setViewportSize({ width: w * 3 + 64, height: 400 });
    await cmp.setContent(`<!doctype html><body style="margin:0;background:#222;font:14px system-ui;color:#ddd">
      <div style="display:flex;gap:16px;padding:16px;align-items:flex-start" id="c">
        <figure style="margin:0"><figcaption>Figma — ${name}</figcaption><img src="data:image/png;base64,${ref}" style="display:block;width:${w}px"></figure>
        <figure style="margin:0"><figcaption>Код (demo/mining) — ${name}</figcaption><img src="data:image/png;base64,${cur}"></figure>
        <figure style="margin:0"><figcaption>Разница</figcaption><div style="position:relative;isolation:isolate">
          <img src="data:image/png;base64,${ref}" style="display:block;width:${w}px"><img src="data:image/png;base64,${cur}" style="position:absolute;left:0;top:0;mix-blend-mode:difference"></div></figure>
      </div></body>`);
    await cmp.locator('#c').screenshot({ path: path.join(OUT, `compare-${name}.png`) });
    console.log(`demo:mining — ${name} ${w}×${full ? 'full' : hgt} → out/${name}.png, out/compare-${name}.png`);
    // Загрузка (patterns 3.11a): ?state=loading — скриншот (пульс остановлен) и сверка высот блоков с загруженной страницей
    const blocks = LOADING_BLOCKS[name];
    if (blocks) {
      const loaded = await heights(page, blocks);
      const lp = await ctx.newPage();
      lp.on('pageerror', (e) => errors.push(`${name}-loading: ${e.message}`));
      lp.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errors.push(`${name}-loading: console ${m.type()}: ${m.text()}`); });
      await load(lp, '?state=loading');
      if (!(await lp.locator('.emcd-amount--skeleton').count()) || !(await lp.locator('.emcd-chart-plot--skeleton').count())) errors.push(`${name}-loading: нет Skeleton у Amount / Chart plot`);
      await lp.screenshot({ path: path.join(OUT, `${name}-loading.png`), fullPage: !!full, animations: 'disabled' });
      const busy = await heights(lp, blocks);
      const rows = loaded.map((a) => { const b = busy.find((x) => x.key === a.key); return { key: a.key, loaded: a.h, loading: b ? b.h : NaN }; });
      for (const b of busy) if (!loaded.some((a) => a.key === b.key)) rows.push({ key: b.key, loaded: NaN, loading: b.h });
      const bad = rows.filter((r) => !(Math.abs(r.loaded - r.loading) <= 1));
      for (const r of bad) heightFails.push(`${name}: ${r.key} — загружено ${r.loaded}, загрузка ${r.loading}`);
      console.log(`demo:mining — ${name}?state=loading → out/${name}-loading.png; высоты блоков (${rows.length}): ${bad.length ? 'расходятся ' + bad.length : 'совпадают ±1 px'}`
        + '\n  ' + rows.map((r) => `${r.key} ${Math.round(r.loaded * 10) / 10}/${Math.round(r.loading * 10) / 10}`).join(' · '));
      await lp.close();
    }
    await ctx.close();
  }
} finally {
  await browser.close();
  server.close();
}
if (heightFails.length) console.error('demo:mining — загрузка меняет высоту блоков (patterns 3.11a):\n' + heightFails.join('\n'));
if (errors.length) console.error('demo:mining — ошибки страницы:\n' + errors.join('\n'));
if (errors.length || heightFails.length) process.exit(1);

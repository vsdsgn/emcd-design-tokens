#!/usr/bin/env node
// Демо K4: скриншоты 6 экранов майнинга (Playwright Chromium) и сравнение с макетами Figma.
//   npm run demo:mining  →  demo/mining/out/<screen>.png + out/compare-<screen>.png (макет | код | разница) + out/web-dashboard-hover.png (hover графика)
// Репо раздаётся статически (свой http-сервер), браузер не скачивается — берётся установленный Playwright.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '../..');
const OUT = path.join(ROOT, 'demo/mining/out');
const SCREENS = [
  ['web-dashboard', 1440, 900], ['web-workers', 1440, 900], ['web-history', 1440, 900],
  ['mw-dashboard', 375, 812, true], ['mw-workers', 375, 812], ['mw-history', 375, 812]];
const only = process.argv.slice(2);
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
    await page.goto(`${base}/demo/mining/${name}.html`, { waitUntil: 'networkidle' });
    // Шрифты бренда (Roobert PRO, IBM Plex Mono) лицензионные и в репо их нет: на стенде — ближайшие по метрикам свободные (только для скриншота)
    if (!process.env.DEMO_REAL_FONTS) await page.addStyleTag({ content: "@font-face{font-family:'Roobert PRO';src:local('Liberation Sans'),local('Arial')}@font-face{font-family:'IBM Plex Mono';src:local('Liberation Mono'),local('Courier New')}" });
    await page.waitForSelector('#root > *');
    await page.evaluate(() => document.fonts.ready);
    const shot = path.join(OUT, `${name}.png`);
    await page.screenshot({ path: shot, fullPage: !!full });
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
    // Сравнение: макет | код | разница (mix-blend-mode: difference) — в той же странице, без зависимостей
    const ref = fs.readFileSync(path.join(ROOT, `demo/mining/reference/${name}.png`)).toString('base64');
    const cur = fs.readFileSync(shot).toString('base64');
    const cmp = await ctx.newPage();
    await cmp.setViewportSize({ width: w * 3 + 64, height: 400 });
    await cmp.setContent(`<!doctype html><body style="margin:0;background:#222;font:14px system-ui;color:#ddd">
      <div style="display:flex;gap:16px;padding:16px;align-items:flex-start" id="c">
        <figure style="margin:0"><figcaption>Figma — ${name}</figcaption><img src="data:image/png;base64,${ref}"></figure>
        <figure style="margin:0"><figcaption>Код (demo/mining) — ${name}</figcaption><img src="data:image/png;base64,${cur}"></figure>
        <figure style="margin:0"><figcaption>Разница</figcaption><div style="position:relative;isolation:isolate">
          <img src="data:image/png;base64,${ref}" style="display:block"><img src="data:image/png;base64,${cur}" style="position:absolute;left:0;top:0;mix-blend-mode:difference"></div></figure>
      </div></body>`);
    await cmp.locator('#c').screenshot({ path: path.join(OUT, `compare-${name}.png`) });
    await ctx.close();
    console.log(`demo:mining — ${name} ${w}×${full ? 'full' : hgt} → out/${name}.png, out/compare-${name}.png`);
  }
} finally {
  await browser.close();
  server.close();
}
if (errors.length) { console.error('demo:mining — ошибки страницы:\n' + errors.join('\n')); process.exit(1); }

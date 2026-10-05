// Cross-browser token test. Usage:
//   npm run test:browsers                 → chromium, firefox, webkit (Playwright engines)
//   npm run test:browsers -- webkit       → one engine
//   CHROMIUM_PATH=/path/to/chrome …        → use an existing Chromium/Chrome/Yandex/Edge binary
// Needs once: npx playwright install chromium firefox webkit
import { chromium, firefox, webkit } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = join(ROOT, 'tests/xbrowser/out'); mkdirSync(OUT, { recursive: true });
const probe = readFileSync(join(ROOT, 'tests/xbrowser/probe.js'), 'utf8');
const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript' };
const server = createServer((req, res) => {
  const f = join(ROOT, decodeURIComponent(req.url.split('?')[0]));
  if (!f.startsWith(ROOT) || !existsSync(f)) { res.writeHead(404).end(); return; }
  res.writeHead(200, { 'content-type': TYPES[extname(f)] || 'application/octet-stream' }).end(readFileSync(f));
}).listen(0);
const URL = `http://localhost:${server.address().port}/tests/xbrowser/fixture.html`;

const engines = { chromium, firefox, webkit };
const pick = process.argv.slice(2).filter((a) => engines[a]);
const run = pick.length ? pick : Object.keys(engines);
const fails = [], warns = [], snaps = {};
const check = (ok, msg, soft = false) => { if (!ok) (soft ? warns : fails).push(msg); };

for (const name of run) {
  const opts = name === 'chromium' && process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {};
  let browser; try { browser = await engines[name].launch(opts); } catch (e) { warns.push(`${name}: not launched (${e.message.split('\n')[0]})`); continue; }
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const cdp = name === 'chromium' ? await page.context().newCDPSession(page) : null;
  const load = async (media = {}, rt = false, attrs = {}) => {
    await page.emulateMedia({ reducedMotion: 'no-preference', forcedColors: 'none', contrast: 'no-preference', ...media });
    if (cdp) await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-transparency', value: rt ? 'reduce' : '' }] });
    await page.goto(URL); await page.addScriptTag({ content: probe });
    await page.evaluate((a) => Object.entries(a).forEach(([k, v]) => (document.documentElement.dataset[k] = v)), attrs);
    return page.evaluate(() => window.__probe());
  };
  const r = await load();
  snaps[name] = r.snapshot;
  const tag = `${name} ${r.ua.match(/(Chrome|Firefox|Version)\/[\d.]+/)?.[0] || ''}`;
  check(!Object.keys(r.empty).length, `${tag}: unresolved tokens ${Object.keys(r.empty).slice(0, 5).join(', ')}`);
  check(/sans-serif|system-ui/.test(r.misc.bodyFont), `${tag}: brand font has no generic fallback (${r.misc.bodyFont})`);
  // Expressive only where prefers-reduced-transparency is detectable (Chromium 118+); elsewhere Base.
  const ex = await load({}, false, { style: 'expressive' });
  check(ex.misc.rtSupported ? ex.misc.glass.blur !== '0px' : ex.misc.glass.blur === '0px',
    `${tag}: Expressive gating wrong (detectable=${ex.misc.rtSupported}, glass blur ${ex.misc.glass.blur})`);
  console.log(`  ${tag}: Expressive ${ex.misc.rtSupported ? 'on' : 'off → Base'}`);
  check(r.nested.geoPrimaryAction !== r.nested.htmlPrimaryAction, `${tag}: nested [data-brand] without [data-theme] keeps the outer brand's semantic tokens`, true);

  const cm = await load({ contrast: 'more' }, false, { style: 'expressive' });
  if (cm.misc.mm['(prefers-contrast: more)']) {
    check(cm.misc.contrast.subtle !== cm.misc.contrast.strong, `${tag}: contrast-more collapses border-subtle into border-strong`);
    check(cm.misc.glass.blur === '0px', `${tag}: contrast-more keeps glass blur`);
  } else warns.push(`${tag}: prefers-contrast emulation unavailable`);
  const rm = await load({ reducedMotion: 'reduce' });
  check(parseFloat(rm.misc.motion.feedback) < 1, `${tag}: reduced motion keeps durations (${rm.misc.motion.feedback})`);
  check(rm.misc.motion.press === '1', `${tag}: reduced motion keeps press scale`);
  if (cdp) {
    const rt = await load({}, true, { style: 'expressive' });
    check(rt.misc.glass.blur === '0px', `${tag}: reduced transparency keeps glass blur`);
  }
  const fc = await load({ forcedColors: 'active' });
  check(!fc.misc.mm['(forced-colors: active)'] || /highlight|rgb/i.test(fc.misc.contrast.ring) && fc.misc.contrast.ring !== r.misc.contrast.ring, `${tag}: forced-colors focus ring not mapped to system colour (${fc.misc.contrast.ring})`);

  for (const [t, s] of [['dark', 'base'], ['dark', 'expressive'], ['light', 'base'], ['light', 'expressive']]) {
    await load({}, false, { theme: t, style: s }); await page.screenshot({ path: join(OUT, `${name}-${t}-${s}.png`), fullPage: true });
  }
  for (const w of [320, 600, 1200, 2560]) {
    await page.setViewportSize({ width: w, height: 900 }); const x = await load();
    check(parseFloat(x.misc.h1Size) >= 20, `${tag}: heading collapses at ${w}px (${x.misc.h1Size})`);
  }
  await page.setViewportSize({ width: 1280, height: 900 });
  console.log(`✓ ${tag}: ${r.count} tokens × ${Object.keys(r.snapshot).length} mode combinations`);
  await browser.close();
}

const norm = (s) => s.replace(/"/g, "'").replace(/\s/g, '').toLowerCase().replace(/(\d+\.\d+)/g, (m) => (+m).toFixed(2));
const names = Object.keys(snaps);
for (const other of names.slice(1)) {
  const a = snaps[names[0]], b = snaps[other]; let n = 0, ex = '';
  for (const k in a) if (!k.endsWith('/expressive')) for (const p in a[k]) if (norm(a[k][p]) !== norm(b[k][p])) { n++; ex ||= `${k} ${p}: ${a[k][p]} ≠ ${b[k][p]}`; }
  check(!n, `${names[0]} vs ${other}: ${n} token values differ (e.g. ${ex})`);
}
writeFileSync(join(OUT, 'result.json'), JSON.stringify({ fails, warns }, null, 2));
warns.forEach((w) => console.log('! ' + w)); fails.forEach((f) => console.log('✗ ' + f));
console.log(fails.length ? `${fails.length} failed` : 'all checks passed');
server.close(); process.exit(fails.length ? 1 : 0);

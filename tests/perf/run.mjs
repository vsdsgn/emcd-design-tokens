// Performance & loading test.  npm run test:perf [-- chromium|firefox|webkit]
// Loading (Chromium, network emulation): index.css (@import chain) vs ds.min.css (one file) on fast / 4G / 3G / 2G.
// Rendering: frame times while scrolling the stress page, Base vs Expressive vs perf-low; Chromium also with CPU 4× / 6× slowdown.
// Results → tests/perf/out/result.json and a table on stdout. Numbers from a GPU-less container are pessimistic for blur; compare Base vs Expressive, not absolutes.
import { chromium, firefox, webkit } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { gzipSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = join(ROOT, 'tests/perf/out'); mkdirSync(OUT, { recursive: true });
const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript' };
const server = createServer((req, res) => {
  const f = join(ROOT, decodeURIComponent(req.url.split('?')[0]));
  if (!f.startsWith(ROOT) || !existsSync(f)) { res.writeHead(404).end(); return; }
  const gz = /gzip/.test(req.headers['accept-encoding'] || '') && /\.(css|js|html)$/.test(f);
  res.writeHead(200, { 'content-type': TYPES[extname(f)] || 'application/octet-stream', 'cache-control': 'no-store', ...(gz ? { 'content-encoding': 'gzip' } : {}) })
    .end(gz ? gzipSync(readFileSync(f)) : readFileSync(f));
}).listen(0);
const BASE = `http://localhost:${server.address().port}/tests/perf/stress.html`;

// Throughput in bytes/s, latency = RTT ms (Chrome DevTools presets).
const NET = { fast: null, '4G': { latency: 150, down: 1.6e6 / 8, up: 750e3 / 8 }, '3G': { latency: 400, down: 400e3 / 8, up: 400e3 / 8 }, '2G': { latency: 800, down: 250e3 / 8, up: 50e3 / 8 } };
const engines = { chromium, firefox, webkit };
const pick = process.argv.slice(2).filter((a) => engines[a]);
const result = { load: [], render: [], guard: [] };
const fails = [];

for (const name of pick.length ? pick : Object.keys(engines)) {
  const opts = name === 'chromium' && process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {};
  let browser; try { browser = await engines[name].launch(opts); } catch (e) { console.log(`! ${name}: not launched`); continue; }
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  const cdp = name === 'chromium' ? await ctx.newCDPSession(page) : null;
  const ver = browser.version();

  if (cdp) {
    await cdp.send('Network.enable'); await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
    for (const [net, c] of Object.entries(NET)) for (const css of ['index.css', 'ds.min.css']) {
      await cdp.send('Network.emulateNetworkConditions', c ? { offline: false, latency: c.latency, downloadThroughput: c.down, uploadThroughput: c.up } : { offline: false, latency: 0, downloadThroughput: -1, uploadThroughput: -1 });
      await page.goto(`${BASE}?css=${css}`, { waitUntil: 'load', timeout: 120000 });
      const m = await page.evaluate(async () => {
        await new Promise((r) => { try { new PerformanceObserver(r).observe({ type: 'paint', buffered: true }); } catch (e) { r(); } setTimeout(r, 500); });
        const css = performance.getEntriesByType('resource').filter((e) => e.name.endsWith('.css'));
        const fcp = performance.getEntriesByName('first-contentful-paint')[0];
        return { files: css.length, kb: Math.round(css.reduce((a, e) => a + (e.transferSize || e.encodedBodySize || 0), 0) / 1024), cssReady: Math.round(Math.max(...css.map((e) => e.responseEnd))), fcp: Math.round(fcp ? fcp.startTime : 0) };
      });
      result.load.push({ engine: `${name} ${ver}`, net, css, ...m });
    }
    // Perf guard. Pretend a capable device (8 GB, 8 cores) so only the signal under test decides.
    await ctx.addInitScript(() => { for (const [k, v] of [['deviceMemory', 8], ['hardwareConcurrency', 8]]) Object.defineProperty(Navigator.prototype, k, { get: () => v, configurable: true }); });
    // Weak network → low before first paint; fast → untouched.
    for (const [net, expect] of [['3G', 'low'], ['fast', null]]) {
      const c = NET[net];
      await cdp.send('Network.emulateNetworkConditions', c ? { offline: false, latency: c.latency, downloadThroughput: c.down, uploadThroughput: c.up } : { offline: false, latency: 0, downloadThroughput: -1, uploadThroughput: -1 });
      await page.goto(`${BASE}?css=ds.min.css&style=expressive&guard=1`, { waitUntil: 'load', timeout: 120000 });
      const g = await page.evaluate(() => ({ perf: document.documentElement.getAttribute('data-perf'), reason: document.documentElement.getAttribute('data-perf-reason') }));
      result.guard.push({ case: `network ${net}`, ...g });
      if (g.perf !== expect) fails.push(`guard on ${net}: data-perf=${g.perf} (${g.reason}), expected ${expect}`);
    }
    await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 0, downloadThroughput: -1, uploadThroughput: -1 });
    await page.evaluate(() => localStorage.clear());
  }

  // Frame-based guard — the only signal in Safari / Firefox, so test it in every engine.
  await page.goto(BASE); await page.evaluate(() => localStorage.clear());
    // Slow frames (each frame burns 40 ms — same on any hardware) + Expressive → guard switches to low and remembers it.
    await page.evaluate(() => localStorage.clear());
    await page.goto(`${BASE}?css=ds.min.css&style=expressive&guard=1&burn=40`, { waitUntil: 'load' });
    await page.waitForTimeout(1300); await page.evaluate(() => window.__scrollTest(3000));
    let g = await page.evaluate(() => ({ perf: document.documentElement.getAttribute('data-perf'), reason: emcdPerf.reason() }));
    result.guard.push({ case: `${name} slow frames`, ...g }); if (g.perf !== 'low') fails.push(`guard on slow frames: data-perf=${g.perf} (${g.reason})`);
    await page.goto(`${BASE}?css=ds.min.css&style=expressive&guard=1`, { waitUntil: 'load' });
    g = await page.evaluate(() => ({ perf: document.documentElement.getAttribute('data-perf'), reason: emcdPerf.reason() }));
    result.guard.push({ case: `${name} next visit`, ...g }); if (g.reason !== 'frames-saved') fails.push(`guard did not remember slow frames (${g.reason})`);
    await page.evaluate(() => emcdPerf.set('high')); await page.reload({ waitUntil: 'load' });
    g = await page.evaluate(() => ({ perf: document.documentElement.getAttribute('data-perf'), reason: emcdPerf.reason() }));
    result.guard.push({ case: `${name} user high`, ...g }); if (g.perf !== null) fails.push(`user setting ignored (${g.reason})`);
  await page.evaluate(() => localStorage.clear());

  for (const cpu of cdp ? [1, 4, 6] : [1]) {
    if (cdp) await cdp.send('Emulation.setCPUThrottlingRate', { rate: cpu });
    for (const mode of ['style=base', 'style=expressive', 'style=expressive&perf=low']) {
      await page.goto(`${BASE}?css=ds.min.css&${mode}`, { waitUntil: 'load' }); await page.waitForTimeout(300);
      const r = await page.evaluate(() => window.__scrollTest(3000));
      result.render.push({ engine: `${name} ${ver}`, cpu: `${cpu}×`, mode: mode.replace('style=', '').replace('&perf=low', ' + perf-low'), ...r });
    }
  }
  if (cdp) await cdp.send('Emulation.setCPUThrottlingRate', { rate: 1 });
  await browser.close();
}
server.close();
writeFileSync(join(OUT, 'result.json'), JSON.stringify(result, null, 2));
if (result.load.length) { console.log('\nLOAD          net   css         files  KB   css ready  FCP');
  for (const r of result.load) console.log(`${r.engine.split(' ')[0].padEnd(13)} ${r.net.padEnd(5)} ${r.css.padEnd(11)} ${String(r.files).padStart(5)} ${String(r.kb).padStart(4)} ${String(r.cssReady).padStart(8)}ms ${String(r.fcp).padStart(5)}ms`); }
console.log('\nRENDER        cpu  mode                     fps   p50   p95  >25ms%');
for (const r of result.render) console.log(`${r.engine.split(' ')[0].padEnd(13)} ${r.cpu.padEnd(4)} ${r.mode.padEnd(24)} ${String(r.fps).padStart(5)} ${String(r.p50).padStart(5)} ${String(r.p95).padStart(5)} ${String(r.slow).padStart(6)}`);
if (result.guard.length) { console.log('\nGUARD'); for (const g of result.guard) console.log(`  ${g.case.padEnd(24)} data-perf=${g.perf} (${g.reason})`); }
fails.forEach((f) => console.log('✗ ' + f)); console.log(fails.length ? `${fails.length} failed` : 'perf guard checks passed');
process.exit(fails.length ? 1 : 0);

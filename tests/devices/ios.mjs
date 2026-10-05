// iOS Simulator run: real Safari (WebKit) per installed iOS version. Needs Xcode + simulator runtimes.
//   node tests/devices/ios.mjs   → each iOS runtime × (small iPhone, regular iPhone) + one iPad on the newest
// Opens stress.html?report=… in Safari, waits for the page's report, saves a screenshot → tests/devices/out/.
// Simulators run on the Mac's CPU/GPU: this checks compatibility (Expressive gate, safe-area, dvh, guard), not speed.
import { execSync } from 'node:child_process';
import { readFileSync, existsSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { serve } from './serve.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = join(ROOT, 'tests/devices/out'), REPORTS = join(OUT, 'reports.jsonl');
const sh = (c) => execSync(c, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const PORT = 8790; const server = serve(PORT);
const ver = (rt) => rt.split('iOS-')[1].replace(/-/g, '.');

const list = JSON.parse(sh('xcrun simctl list -j devices available'));
const runtimes = Object.keys(list.devices).filter((r) => /iOS/.test(r)).sort((a, b) => parseFloat(ver(a)) - parseFloat(ver(b)));
const targets = [];
for (const rt of runtimes) {
  const devs = list.devices[rt];
  const small = devs.find((d) => /iPhone SE|iPhone 1\de|mini/.test(d.name));
  const phone = devs.find((d) => /^iPhone \d+$/.test(d.name)) || devs.find((d) => /iPhone/.test(d.name));
  for (const d of [small, phone]) if (d && !targets.some((t) => t.udid === d.udid)) targets.push({ ...d, ios: ver(rt) });
}
const newest = runtimes[runtimes.length - 1];
const ipad = list.devices[newest].find((d) => /iPad Air 11|iPad Pro 11/.test(d.name)) || list.devices[newest].find((d) => /iPad/.test(d.name));
if (ipad) targets.push({ ...ipad, ios: ver(newest) });

const results = [];
for (const t of targets) {
  const tag = `iOS ${t.ios} - ${t.name}`.replace(/[^\w .()-]/g, '');
  console.log('→', tag);
  try { sh(`xcrun simctl boot ${t.udid}`); } catch (e) { /* already booted */ }
  sh(`xcrun simctl bootstatus ${t.udid} -b`);
  const url = `http://localhost:${PORT}/tests/perf/stress.html?css=ds.min.css&style=expressive&guard=1&report=${encodeURIComponent(tag)}`;
  const before = existsSync(REPORTS) ? readFileSync(REPORTS, 'utf8').length : 0;
  sh(`xcrun simctl openurl ${t.udid} "${url}"`);
  let rep = null;
  for (let i = 0; i < 60 && !rep; i++) {
    await sleep(2000);
    if (existsSync(REPORTS)) rep = readFileSync(REPORTS, 'utf8').slice(before).split('\n').filter(Boolean)
      .map((l) => { try { return JSON.parse(l); } catch (e) { return {}; } }).find((r) => r.device === tag) || null;
  }
  await sleep(1500);
  try { sh(`xcrun simctl io ${t.udid} screenshot "${join(OUT, tag.replace(/[^\w.-]+/g, '_') + '.png')}"`); } catch (e) {}
  try { sh(`xcrun simctl shutdown ${t.udid}`); } catch (e) {}
  results.push(rep || { device: tag, error: 'no report in 120 s' });
  console.log(rep
    ? `  Expressive ${rep.decorMaterial === 'true' ? 'ON' : 'OFF'} · blur ${rep.headerBlur} · perf ${rep.perf || '-'} (${rep.perfReason}) · ${rep.scroll.fps} fps · safe-area ${rep.safeArea.join(' ')} · dvh ${rep.dvh} · vp ${rep.viewport.join('x')}`
    : '  ✗ no report');
}
writeFileSync(join(OUT, 'ios.json'), JSON.stringify(results, null, 2));
server.close();

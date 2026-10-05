// Android run: Chrome on a running emulator or USB device (adb). Start the emulator first, e.g.
//   ~/Library/Android/sdk/emulator/emulator -avd ds_android -no-window -gpu swiftshader_indirect
// swiftshader = software GPU: a rough stand-in for a weak phone GPU (blur gets expensive, guard should react).
//   node tests/devices/android.mjs [label]
import { execSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homedir } from 'node:os';
import { serve } from './serve.mjs';
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = join(ROOT, 'tests/devices/out'), REPORTS = join(OUT, 'reports.jsonl');
const ADB = process.env.ADB || join(homedir(), 'Library/Android/sdk/platform-tools/adb');
const adb = (c) => execSync(`"${ADB}" ${c}`, { encoding: 'utf8' }).trim();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const server = serve(8790);
const tag = process.argv[2] || `Android ${adb('shell getprop ro.build.version.release')} - Chrome`;
adb('shell am set-debug-app --persistent com.android.chrome');        // lets Chrome read the flags below
adb(`shell 'echo "_ --disable-fre --no-default-browser-check --no-first-run" > /data/local/tmp/chrome-command-line'`);
const before = existsSync(REPORTS) ? readFileSync(REPORTS, 'utf8').length : 0;
adb(`shell am start -a android.intent.action.VIEW -d "'http://10.0.2.2:8790/tests/perf/stress.html?css=ds.min.css&style=expressive&guard=1&report=${encodeURIComponent(tag)}'" com.android.chrome`);
let rep = null;
for (let i = 0; i < 45 && !rep; i++) { await sleep(2000);
  if (existsSync(REPORTS)) rep = readFileSync(REPORTS, 'utf8').slice(before).split('\n').filter(Boolean).map((l) => JSON.parse(l)).find((r) => r.device === tag) || null; }
execSync(`"${ADB}" exec-out screencap -p > "${join(OUT, tag.replace(/[^\w.-]+/g, '_') + '.png')}"`);
console.log(rep ? `${tag}: Expressive ${rep.decorMaterial === 'true' ? 'ON' : 'OFF'} · perf ${rep.perf || '-'} (${rep.perfReason}) · ${rep.scroll.fps} fps, slow ${rep.scroll.slow}% · dvh ${rep.dvh}` : `${tag}: ✗ no report`);
server.close();

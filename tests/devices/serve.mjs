// Device test server: serves the repo on all interfaces (simulators: localhost, Android emulator: 10.0.2.2)
// and collects POST /report from tests/perf/stress.html?report=<device> into tests/devices/out/reports.jsonl.
import { createServer } from 'node:http';
import { readFileSync, existsSync, mkdirSync, appendFileSync } from 'node:fs';
import { join, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = join(ROOT, 'tests/devices/out'); mkdirSync(OUT, { recursive: true });
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript' };
export function serve(port = 8790) {
  return createServer((req, res) => {
    if (req.method === 'POST' && req.url.startsWith('/report')) {
      let b = ''; req.on('data', (c) => (b += c)); req.on('end', () => { appendFileSync(join(OUT, 'reports.jsonl'), b.replace(/\n/g, ' ') + '\n'); res.writeHead(204).end(); });
      return;
    }
    const f = join(ROOT, decodeURIComponent(req.url.split('?')[0]));
    if (!f.startsWith(ROOT) || !existsSync(f)) { res.writeHead(404).end(); return; }
    res.writeHead(200, { 'content-type': TYPES[extname(f)] || 'application/octet-stream', 'cache-control': 'no-store' }).end(readFileSync(f));
  }).listen(port, '0.0.0.0');
}
if (process.argv[1] === fileURLToPath(import.meta.url)) { serve(+process.argv[2] || 8790); console.log('serving on :' + (+process.argv[2] || 8790)); }

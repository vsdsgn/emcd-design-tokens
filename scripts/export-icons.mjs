// Exports DS 2.0 icons from Figma into the repo.
//   icons/svg/<name>.svg      — web: strokes kept, currentColor, stroke-width from token
//   icons/flutter/<name>.svg  — Flutter: strokes converted to filled outlines (picosvg)
//   icons/manifest.json       — name, description, tokens
//
// Needs a Figma personal access token in the environment (never commit it):
//   echo 'FIGMA_TOKEN=figd_...' > .env      (.env is gitignored)
// Run: npm run icons
import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const FILE_KEY = 'HLeaDeTWLJyypv79XpMrs2'; // ◆ EMCD DS 2.0 — Icons
const FRAME_NAME = 'icons/ui';
if (existsSync('.env')) for (const l of readFileSync('.env', 'utf8').split('\n')) { const m = l.match(/^(\w+)=(.*)$/); if (m) process.env[m[1]] ??= m[2].trim(); }
const TOKEN = process.env.FIGMA_TOKEN;
if (!TOKEN) { console.error('FIGMA_TOKEN is not set (.env or environment).'); process.exit(1); }
const api = async (p) => { const r = await fetch('https://api.figma.com/v1' + p, { headers: { 'X-Figma-Token': TOKEN } }); if (!r.ok) throw new Error(`${r.status} ${p}`); return r.json(); };

// 1. Find components inside the icons frame
const file = await api(`/files/${FILE_KEY}?depth=4`);
const find = (n) => (n.name === FRAME_NAME ? n : (n.children || []).map(find).find(Boolean));
const frame = file.document.children.map(find).find(Boolean);
if (!frame) throw new Error(`Frame "${FRAME_NAME}" not found`);
const comps = frame.children.filter((c) => c.type === 'COMPONENT');
const meta = file.components || {};
console.log(`Found ${comps.length} icons`);

// 2. Ask Figma to render SVGs (in chunks)
const urls = {};
for (let i = 0; i < comps.length; i += 50) {
  const ids = comps.slice(i, i + 50).map((c) => c.id).join(',');
  const res = await api(`/images/${FILE_KEY}?ids=${encodeURIComponent(ids)}&format=svg&svg_outline_text=true&svg_include_id=false&svg_simplify_stroke=true`);
  Object.assign(urls, res.images);
}

// 3. Download, normalise to 24×24 + currentColor, write
for (const d of ['icons/svg', 'icons/flutter']) { rmSync(d, { recursive: true, force: true }); mkdirSync(d, { recursive: true }); }
const manifest = [];
for (const c of comps) {
  const name = c.name.replace(/^icon\//, '').replace(/\//g, '-');
  let svg = await (await fetch(urls[c.id])).text();
  svg = svg
    .replace(/<svg[^>]*>/, (m) => m.replace(/width="[^"]*"/, 'width="24"').replace(/height="[^"]*"/, 'height="24"'))
    .replace(/(fill|stroke)="#(?:0{3}|0{6}|000000ff)"/gi, '$1="currentColor"')
    .replace(/(fill|stroke)="black"/gi, '$1="currentColor"');
  writeFileSync(`icons/svg/${name}.svg`, svg);
  manifest.push({ name, figma: c.name, description: (meta[c.id] && meta[c.id].description) || '' });
}

// 4. Flutter: outline strokes with picosvg (pip install picosvg)
let outlined = 0;
for (const { name } of manifest) {
  try {
    const out = execFileSync('picosvg', [`icons/svg/${name}.svg`], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
    writeFileSync(`icons/flutter/${name}.svg`, out.replace(/fill="(?!none)[^"]*"/g, 'fill="currentColor"'));
    outlined++;
  } catch { /* picosvg missing or failed for this icon — web SVG still exported */ }
}
writeFileSync('icons/manifest.json', JSON.stringify({ source: `figma:${FILE_KEY}`, count: manifest.length, icons: manifest }, null, 2) + '\n');
console.log(`Wrote ${manifest.length} web SVGs, ${outlined} Flutter SVGs`);

#!/usr/bin/env node
// Иконки из Figma без REST-токена: SVG, выгруженные через Figma MCP (use_figma → exportAsync({format:'SVG_STRING'})),
// приводятся к формату репо и пишутся в icons/svg, icons/flutter (если есть picosvg) и icons/manifest.json.
//
// Вход: JSON-файлы { "<имя без icon/>": "<svg …>" } (чанки выгрузки) и, по желанию, --desc <file.json>
//       { "<имя>": "<description компонента>" } — новые/изменённые описания; остальные берутся из текущего манифеста.
// Набор иконок = ключи входных файлов (что есть только в репо и нет в выгрузке — удаляется).
// Запуск: node scripts/icons-normalize.mjs [--desc d.json] [--picosvg path/to/picosvg] chunk-1.json chunk-2.json …
//
// Формат icons/svg/<name>.svg (как в export-icons.mjs): без width/height, class="ds-icon", viewBox сохранён,
// цвета заливки/обводки → currentColor, обведённым элементам — vector-effect="non-scaling-stroke".
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const args = process.argv.slice(2);
const opt = (k) => { const i = args.indexOf(k); if (i < 0) return null; const v = args[i + 1]; args.splice(i, 2); return v; };
const descFile = opt('--desc');
const picosvg = opt('--picosvg') || (fs.existsSync(path.join(ROOT, '.venv/bin/picosvg')) ? path.join(ROOT, '.venv/bin/picosvg') : 'picosvg');
if (!args.length) { console.error('icons-normalize: нужны JSON-чанки выгрузки'); process.exit(1); }

const src = {};
for (const f of args) Object.assign(src, JSON.parse(fs.readFileSync(f, 'utf8')));
const desc = descFile ? JSON.parse(fs.readFileSync(descFile, 'utf8')) : {};
const manifestPath = path.join(ROOT, 'icons/manifest.json');
const prev = fs.existsSync(manifestPath) ? JSON.parse(fs.readFileSync(manifestPath, 'utf8')).icons : [];
const prevDesc = Object.fromEntries(prev.map((i) => [i.name, i.description]));

export function normalize(svg) {
  const m = svg.match(/<svg\b([^>]*)>([\s\S]*)<\/svg>/);
  if (!m) throw new Error('не SVG');
  const viewBox = (m[1].match(/viewBox="([^"]+)"/) || [])[1];
  if (!viewBox) throw new Error('нет viewBox');
  const fill = (m[1].match(/\sfill="([^"]+)"/) || [])[1];
  const body = m[2]
    .replace(/>\s*</g, '><')
    .replace(/(fill|stroke)="(#[0-9a-fA-F]{3,8}|black|white)"/gi, '$1="currentColor"')
    .replace(/<(path|circle|rect|line|polyline|polygon|ellipse)\b([^>]*?)(\/?)>/g, (all, tag, attrs, close) =>
      `<${tag}${/stroke="currentColor"/.test(attrs) && !attrs.includes('vector-effect') ? attrs + ' vector-effect="non-scaling-stroke"' : attrs}${close}>`)
    .replace(/></g, '>\n<');
  return `<svg class="ds-icon" viewBox="${viewBox}"${fill ? ` fill="${fill}"` : ''} xmlns="http://www.w3.org/2000/svg">\n${body}\n</svg>\n`;
}

const svgDir = path.join(ROOT, 'icons/svg');
const before = Object.fromEntries(fs.readdirSync(svgDir).filter((f) => f.endsWith('.svg')).map((f) => [f.slice(0, -4), fs.readFileSync(path.join(svgDir, f), 'utf8')]));
const names = Object.keys(src).sort();
const stat = { added: [], changed: [], same: 0, removed: [] };
for (const n of names) {
  const out = normalize(src[n]);
  if (!(n in before)) stat.added.push(n); else if (before[n] !== out) stat.changed.push(n); else stat.same++;
  fs.writeFileSync(path.join(svgDir, `${n}.svg`), out);
}
for (const n of Object.keys(before)) if (!(n in src)) { stat.removed.push(n); fs.rmSync(path.join(svgDir, `${n}.svg`)); }

// Flutter: обводки → заливки (picosvg); без picosvg Flutter-набор не трогаем
const flDir = path.join(ROOT, 'icons/flutter');
let outlined = 0;
if (spawnSync(picosvg, ['--help'], { stdio: 'ignore' }).error) console.warn('icons-normalize: picosvg не найден — icons/flutter не обновлён');
else {
  fs.rmSync(flDir, { recursive: true, force: true }); fs.mkdirSync(flDir, { recursive: true });
  const tmpDir = fs.mkdtempSync(path.join(process.env.TMPDIR || '/tmp', 'ds-icons-'));
  for (const n of names) {
    try {
      const tmp = path.join(tmpDir, `${n}.svg`);
      fs.writeFileSync(tmp, fs.readFileSync(path.join(svgDir, `${n}.svg`), 'utf8').replace(/ vector-effect="non-scaling-stroke"/g, '').replace(' class="ds-icon"', ''));
      const out = execFileSync(picosvg, [tmp], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] });
      fs.writeFileSync(path.join(flDir, `${n}.svg`), out.replace(/fill="(?!none)[^"]*"/g, 'fill="currentColor"'));
      outlined++;
    } catch { /* эта иконка не обвелась — web SVG всё равно есть */ }
  }
  fs.rmSync(tmpDir, { recursive: true, force: true });
}

const icons = names.map((n) => ({ name: n, figma: `icon/${n}`, description: desc[n] ?? prevDesc[n] ?? '' }));
const missing = icons.filter((i) => !i.description).map((i) => i.name);
fs.writeFileSync(manifestPath, JSON.stringify({ source: 'figma:icons', count: icons.length, icons }, null, 2) + '\n');
console.log(`icons-normalize: ${names.length} иконок · добавлено ${stat.added.length} [${stat.added}] · изменено ${stat.changed.length} [${stat.changed}] · без изменений ${stat.same} · удалено ${stat.removed.length} [${stat.removed}] · Flutter ${outlined}`);
if (missing.length) console.warn('icons-normalize: без описания —', missing.join(', '));

// Converts raw Figma variable exports (figma/export-*.json) into W3C DTCG token files (tokens/**).
// Usage: node scripts/figma-to-dtcg.mjs
import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const exportDir = join(root, 'figma');
const outDir = join(root, 'tokens');

// Figma collection -> code layer. `prefix` is prepended to token paths in code.
const LAYERS = {
  PC: { dir: 'primitives', file: () => 'color', prefix: [] },
  PS: { dir: 'primitives', file: () => 'scale', prefix: [] },
  B: { dir: 'brand', file: (m) => slug(m), prefix: ['brand'] },
  T: { dir: 'theme', file: (m) => slug(m), prefix: [] },
  PL: { dir: 'platform', file: (m) => slug(m), prefix: [] },
  VP: { dir: 'viewport', file: (m) => slug(m), prefix: [] },
  ST: { dir: 'style', file: (m) => slug(m), prefix: [] },
  OS: { dir: 'os', file: (m) => slug(m), prefix: [] },
};

const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

function refPath(alias) {
  // "@PC:violet/500" | "@PC:color/violet/500" | "@PS:dimension/4" | "@B:accent/600"
  const [, coll, name] = alias.match(/^@([A-Z]+):(.+)$/);
  let parts = name.split('/');
  if (coll === 'PC' && parts[0] !== 'color') parts = ['color', ...parts];
  return [...LAYERS[coll].prefix, ...parts].join('.');
}

function typeFor(name, t) {
  if (t === 'C') return 'color';
  if (t === 'B') return 'boolean';
  if (t === 'S') return /font-family|font\/family/.test(name) ? 'fontFamily' : (/easing/.test(name) ? 'cubicBezier' : 'string');
  if (/font-weight/.test(name)) return 'fontWeight';
  if (/(^|\/)duration\//.test(name)) return 'duration';
  if (/(^|\/)scale\/press/.test(name)) return 'number';
  if (/^blur\//.test(name) || /^effect\/blur\//.test(name)) return 'dimension';
  if (/opacity|columns|breakpoint-min/.test(name)) return 'number';
  return 'dimension';
}

function valueFor(raw, type) {
  if (typeof raw === 'string' && raw.startsWith('@')) return `{${refPath(raw)}}`;
  if (type === 'dimension') return `${raw}px`;
  if (type === 'duration') return `${raw}ms`;
  return raw;
}

function setDeep(obj, path, leaf) {
  let cur = obj;
  path.slice(0, -1).forEach((k) => { cur = cur[k] ??= {}; });
  cur[path.at(-1)] = leaf;
}

const files = readdirSync(exportDir).filter((f) => /^export-\d+\.json$/.test(f)).sort();
const collections = files.flatMap((f) => JSON.parse(readFileSync(join(exportDir, f), 'utf8')));

rmSync(outDir, { recursive: true, force: true });
const outputs = {};
for (const col of collections) {
  const layer = LAYERS[col.c];
  if (!layer) throw new Error(`Unknown collection ${col.c}`);
  col.m.forEach((mode, i) => {
    const key = join(layer.dir, `${layer.file(mode)}.json`);
    const tree = (outputs[key] ??= {});
    for (const [name, t, vals] of col.v) {
      const raw = Array.isArray(vals) ? vals[i] : vals;
      const type = typeFor(name, t);
      setDeep(tree, [...layer.prefix, ...name.split('/')], { $type: type, $value: valueFor(raw, type) });
    }
  });
}

let count = 0;
for (const [rel, tree] of Object.entries(outputs)) {
  const p = join(outDir, rel);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, JSON.stringify(tree, null, 2) + '\n');
  count++;
}
console.log(`Wrote ${count} token files to tokens/`);

// Builds platform outputs from tokens/** with Style Dictionary v4.
//  build/css/   layered CSS custom properties. Sizes in rem (respect the user's browser font size),
//               strokes in px, viewport via em media queries, fluid type 360→1600px, root scaling for 2560/3840+ screens.
//  build/json/  resolved flat tokens per brand × theme for Flutter (App platform, Compact viewport), sizes as numbers (dp).
import StyleDictionary from 'style-dictionary';
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, basename } from 'node:path';

const BASE = 16; // 1rem
const T = 'tokens';
const list = (dir) => readdirSync(join(T, dir)).filter((f) => f.endsWith('.json')).map((f) => basename(f, '.json'));
const brands = list('brand'), themes = list('theme'), platforms = list('platform');
const viewports = ['compact', 'medium', 'expanded', 'large', 'xlarge'];
const prim = [`${T}/primitives/*.json`];
const DEFAULT = { brand: 'emcd', theme: 'dark', platform: 'web' };
const px = (v) => parseFloat(String(v));
const rem = (n) => `${+(n / BASE).toFixed(4)}rem`;

// px stays px for hairlines and "infinite" radius; everything else becomes rem.
const keepPx = (t) => t.path[0] === 'stroke' || t.path.at(-1) === 'full';
StyleDictionary.registerTransform({
  name: 'emcd/size/rem', type: 'value',
  filter: (t) => t.$type === 'dimension',
  transform: (t) => (keepPx(t) ? `${px(t.$value)}px` : rem(px(t.$value))),
});
StyleDictionary.registerTransform({
  name: 'emcd/size/number', type: 'value',
  filter: (t) => t.$type === 'dimension',
  transform: (t) => px(t.$value),
});
const CSS = ['attribute/cti', 'name/kebab', 'color/css', 'fontFamily/css', 'emcd/size/rem'];
const JSONT = ['attribute/cti', 'name/camel', 'color/hex', 'emcd/size/number'];
const quiet = { verbosity: 'silent', warnings: 'disabled' };

async function cssLayer({ name, sources, own, selector }) {
  await new StyleDictionary({
    log: quiet, source: sources,
    platforms: { css: { transforms: CSS, buildPath: 'build/css/', files: [{
      destination: `${name}.css`, format: 'css/variables',
      filter: (t) => t.filePath.includes(own), options: { selector, outputReferences: true } }] } },
  }).buildAllPlatforms();
}
const sel = (attr, v, def) => (v === def ? `:root, [data-${attr}="${v}"]` : `[data-${attr}="${v}"]`);

await cssLayer({ name: 'primitives', sources: prim, own: 'primitives/', selector: ':root' });
for (const b of brands) await cssLayer({ name: `brand-${b}`, sources: [...prim, `${T}/brand/${b}.json`], own: `brand/${b}.json`, selector: sel('brand', b, DEFAULT.brand) });
for (const th of themes) await cssLayer({ name: `theme-${th}`, sources: [...prim, `${T}/brand/${DEFAULT.brand}.json`, `${T}/theme/${th}.json`], own: `theme/${th}.json`, selector: sel('theme', th, DEFAULT.theme) });
for (const p of platforms) await cssLayer({ name: `platform-${p}`, sources: [...prim, `${T}/brand/${DEFAULT.brand}.json`, `${T}/platform/${p}.json`], own: `platform/${p}.json`, selector: sel('platform', p, DEFAULT.platform) });
for (const v of viewports) await cssLayer({ name: `viewport-${v}`, sources: [...prim, `${T}/viewport/${v}.json`], own: `viewport/${v}.json`, selector: ':root' });

// Viewport steps as em media queries (em = scales with browser zoom / default font size).
const vpTokens = Object.fromEntries(viewports.map((v) => [v, JSON.parse(readFileSync(`${T}/viewport/${v}.json`, 'utf8'))]));
const stripHeader = (css) => css.replace(/^\/\*\*[\s\S]*?\*\/\n/, '');
writeFileSync('build/css/viewport.css', viewports.map((v) => {
  const min = vpTokens[v].layout['breakpoint-min'].$value;
  const css = stripHeader(readFileSync(`build/css/viewport-${v}.css`, 'utf8'));
  return min > 0 ? `@media (min-width: ${min / BASE}em) {\n${css}}\n` : css;
}).join('\n'));

// Fluid typography: interpolate every type size / line-height between Compact (360px) and XLarge (1600px).
const refPx = (ref) => +String(ref).match(/(\d+(?:\.\d+)?)\}$/)[1];
const W0 = 360, W1 = 1600;
const fluid = (a, b) => {
  if (a === b) return rem(a);
  const slope = (b - a) / (W1 - W0), icpt = a - slope * W0;
  return `clamp(${rem(Math.min(a, b))}, ${rem(icpt)} + ${+(slope * 100).toFixed(4)}vw, ${rem(Math.max(a, b))})`;
};
const lines = [];
const walk = (node, path) => {
  for (const [k, v] of Object.entries(node)) {
    if (v && v.$value !== undefined) {
      const p = [...path, k];
      const get = (vp) => p.reduce((o, key) => o[key], vpTokens[vp]).$value;
      lines.push(`  --${p.join('-')}: ${fluid(refPx(get('compact')), refPx(get('xlarge')))};`);
    } else walk(v, [...path, k]);
  }
};
walk(vpTokens.compact.type, ['type']);
writeFileSync('build/css/type-fluid.css', `/* Fluid type 360→1600px. Overrides stepped viewport values. */\n:root {\n${lines.join('\n')}\n}\n`);

// Root scaling for very large logical widths (4K/8K at 100% OS scaling, ultrawide). Percent keeps user font settings.
writeFileSync('build/css/root.css', `/* 320 → 8K: everything in rem scales up on very wide screens. */
html { font-size: 100%; }
@media (min-width: 160em) { html { font-size: 112.5%; } } /* ≥ 2560px */
@media (min-width: 240em) { html { font-size: 125%; } }   /* ≥ 3840px */
@media (min-width: 480em) { html { font-size: 150%; } }   /* ≥ 7680px */
`);

const order = ['root', 'primitives', ...brands.map((b) => `brand-${b}`), ...themes.map((t) => `theme-${t}`), ...platforms.map((p) => `platform-${p}`), 'viewport', 'type-fluid'];
writeFileSync('build/css/index.css', order.map((f) => `@import "./${f}.css";`).join('\n') + '\n');

mkdirSync('build/json', { recursive: true });
for (const b of brands) for (const th of themes) {
  await new StyleDictionary({
    log: quiet,
    source: [...prim, `${T}/brand/${b}.json`, `${T}/theme/${th}.json`, `${T}/platform/app.json`, `${T}/viewport/compact.json`],
    platforms: { json: { transforms: JSONT, buildPath: 'build/json/', files: [{
      destination: `${b}.${th}.json`, format: 'json/flat', filter: (t) => !t.filePath.includes('primitives/') }] } },
  }).buildAllPlatforms();
}
console.log(`Built CSS layers (rem, fluid type, root scaling) + ${brands.length * themes.length} Flutter JSON files`);

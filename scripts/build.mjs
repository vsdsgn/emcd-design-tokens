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
const brands = list('brand'), themes = list('theme'), platforms = list('platform'), styles = list('style');
const viewports = ['compact', 'medium', 'expanded', 'large', 'xlarge'];
const prim = [`${T}/primitives/*.json`];
const DEFAULT = { brand: 'emcd', theme: 'dark', platform: 'web', style: 'base' };
const px = (v) => parseFloat(String(v));
const rem = (n) => `${+(n / BASE).toFixed(4)}rem`;

// px stays px for hairlines and "infinite" radius; everything else becomes rem.
const keepPx = (t) => t.path[0] === 'stroke' || t.path[0] === 'blur' || t.path.at(-1).endsWith('blur') || t.path.at(-1) === 'full';
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
// Brand fonts are web fonts: without a generic fallback a failed or blocked load renders the browser default (Times).
const SANS_FALLBACK = "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif";
const MONO_FALLBACK = "ui-monospace, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace";
StyleDictionary.registerTransform({
  name: 'emcd/font/fallback', type: 'value', transitive: true,
  filter: (t) => t.$type === 'fontFamily' && t.path[0] === 'font-family',
  transform: (t) => `'${String(t.$value).replace(/'/g, '')}', ${/mono/i.test(t.$value) ? MONO_FALLBACK : SANS_FALLBACK}`,
});
const CSS = ['attribute/cti', 'name/kebab', 'color/css', 'emcd/font/fallback', 'emcd/size/rem'];
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
for (const s of styles) await cssLayer({ name: `style-${s}`, sources: [...prim, `${T}/brand/${DEFAULT.brand}.json`, `${T}/theme/${DEFAULT.theme}.json`, `${T}/platform/${DEFAULT.platform}.json`, `${T}/style/${s}.json`], own: `style/${s}.json`, selector: sel('style', s, DEFAULT.style) });
// Expressive only where the browser can tell us the user has NOT asked for less transparency.
// prefers-reduced-transparency exists in Chromium 118+ (Chrome, Edge, Yandex, Opera, WebView, Samsung 25+);
// Safari and Firefox don't know it → the whole block is ignored there and the page stays Base (degraded by design).
{
  const f = `build/css/style-expressive.css`, c = readFileSync(f, 'utf8');
  const head = c.match(/^\/\*\*[\s\S]*?\*\/\n/)?.[0] || '';
  writeFileSync(f, `${head}/* Applies only where prefers-reduced-transparency is supported and off. Elsewhere: Base. docs/browser-support.md */\n@media (prefers-reduced-transparency: no-preference) {\n${c.slice(head.length).trim()}\n}\n`);
}
for (const v of viewports) await cssLayer({ name: `viewport-${v}`, sources: [...prim, `${T}/viewport/${v}.json`], own: `viewport/${v}.json`, selector: ':root' });

// Viewport steps as em media queries (em = scales with browser zoom / default font size).
const vpTokens = Object.fromEntries(viewports.map((v) => [v, JSON.parse(readFileSync(`${T}/viewport/${v}.json`, 'utf8'))]));
const defFirstEarly = (arr, def) => [def, ...arr.filter((x) => x !== def)];
const defFirst = defFirstEarly;
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
writeFileSync('build/css/type-fluid.css', `/* Fluid type 360→1600px. Overrides stepped viewport values where clamp() is supported (Safari < 13.1 keeps steps). */\n@supports (width: clamp(1px, 1vw, 2px)) {\n:root {\n${lines.join('\n')}\n}\n}\n`);

// Root scaling for very large logical widths (4K/8K at 100% OS scaling, ultrawide). Percent keeps user font settings.
writeFileSync('build/css/root.css', `/* 320 → 8K: everything in rem scales up on very wide screens. */
html { font-size: 100%; }
@media (min-width: 160em) { html { font-size: 112.5%; } } /* ≥ 2560px */
@media (min-width: 240em) { html { font-size: 125%; } }   /* ≥ 3840px */
@media (min-width: 480em) { html { font-size: 150%; } }   /* ≥ 7680px */
`);

// Low-performance / reduced-transparency layer: no blur, glass becomes opaque, edges keep only the fade,
// and Expressive falls back to Base (Base is the default; Expressive only on capable devices).
const baseStyle = (() => { const c = readFileSync('build/css/style-base.css', 'utf8'); return c.slice(c.indexOf('{') + 1, c.lastIndexOf('}')).trim().replace(/\n\s*/g, ' '); })();
writeFileSync('build/css/perf-low.css', `/* Lite mode: old phones, low-end Android, reduced transparency, no backdrop-filter support. */
[data-perf="low"], [data-perf="low"] [data-style] {
  --effect-blur-glass-sm: 0px; --effect-blur-glass-md: 0px; --effect-blur-glass-lg: 0px;
  --effect-blur-edge: 0px; --effect-blur-backdrop: 0px;
  --surface-glass: var(--surface-raised);
  ${baseStyle}
}
@media (prefers-reduced-transparency: reduce) {
  :root, [data-style] { --effect-blur-glass-sm: 0px; --effect-blur-glass-md: 0px; --effect-blur-glass-lg: 0px; --effect-blur-edge: 0px; --effect-blur-backdrop: 0px; --surface-glass: var(--surface-raised); ${baseStyle} }
}
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  :root, [data-style] { --surface-glass: var(--surface-raised); ${baseStyle} }
}
`);

// High contrast (prefers-contrast: more): focus ring = solid brand border colour (passes 3:1), each border one step
// stronger, tertiary text → secondary, no decor (Base). Values are taken per theme from the theme layer, not chained
// through var(--border-default): a chained override would collapse subtle → default → strong into one colour.
// Forced colors: focus uses system colours; components must also keep a transparent outline (box-shadow is removed).
const themeVal = (th, name) => (readFileSync(`build/css/theme-${th}.css`, 'utf8').match(new RegExp(`\\s${name}:\\s*([^;]+);`)) || [])[1];
const contrastBlock = (th) => {
  const sel = th === DEFAULT.theme ? `:root, [data-theme="${th}"]` : `[data-theme="${th}"]`;
  return `  ${sel} {
    --border-focus-ring: var(--border-focus);
    --border-subtle: ${themeVal(th, '--border-default')};
    --border-default: ${themeVal(th, '--border-strong')};
    --control-border-default: ${themeVal(th, '--border-strong')};
    --text-tertiary: ${themeVal(th, '--text-secondary')};
    --icon-tertiary: ${themeVal(th, '--icon-secondary')};
  }`;
};
writeFileSync('build/css/contrast-more.css', `/* prefers-contrast: more */
@media (prefers-contrast: more) {
${defFirstEarly(themes, DEFAULT.theme).map(contrastBlock).join('\n')}
  :root, [data-style] { ${baseStyle} }
}
/* forced-colors (Windows High Contrast): system colours for focus. */
@media (forced-colors: active) {
  :root, [data-theme] { --border-focus: Highlight; --border-focus-ring: Highlight; --edge-highlight: transparent; }
}
`);

// Reduced motion (OS setting or [data-motion="reduced"]): durations ≈ 0, no press scale.
// 0.01ms instead of 0 so transitionend / animationend still fire for components that wait on them.
const motionNames = [...new Set([...readFileSync(`build/css/platform-${DEFAULT.platform}.css`, 'utf8').matchAll(/(--motion-duration-[a-z0-9-]+):/g)].map((m) => m[1]))];
const reduced = `${motionNames.map((n) => `${n}: 0.01ms;`).join(' ')} --motion-scale-press: 1;`;
writeFileSync('build/css/motion-reduced.css', `/* Reduced motion: docs/motion.md §10 */
@media (prefers-reduced-motion: reduce) {
  :root, [data-platform] { ${reduced} }
}
[data-motion="reduced"], [data-motion="reduced"] [data-platform] { ${reduced} }
`);

// Default layer (:root) must come first, otherwise it overrides [data-*] selectors of equal specificity.
const order = ['root', 'primitives',
  ...defFirst(brands, DEFAULT.brand).map((b) => `brand-${b}`),
  ...defFirst(themes, DEFAULT.theme).map((t) => `theme-${t}`),
  ...defFirst(platforms, DEFAULT.platform).map((p) => `platform-${p}`),
  ...defFirst(styles, DEFAULT.style).map((s) => `style-${s}`),
  'viewport', 'type-fluid', 'perf-low', 'contrast-more', 'motion-reduced'];
writeFileSync('build/css/index.css', order.map((f) => `@import "./${f}.css";`).join('\n') + '\n');

mkdirSync('build/json', { recursive: true });
for (const b of brands) for (const th of themes) for (const st of styles) for (const os of ['ios', 'android']) {
  await new StyleDictionary({
    log: quiet,
    source: [...prim, `${T}/brand/${b}.json`, `${T}/theme/${th}.json`, `${T}/platform/${os}.json`, `${T}/viewport/compact.json`, `${T}/style/${st}.json`],
    platforms: { json: { transforms: JSONT, buildPath: 'build/json/', files: [{
      destination: `${b}.${th}.${os}` + (st === DEFAULT.style ? '' : `.${st}`) + '.json', format: 'json/flat', filter: (t) => !t.filePath.includes('primitives/') }] } },
  }).buildAllPlatforms();
}
console.log(`Built CSS layers (rem, fluid type, root scaling) + ${brands.length * themes.length * styles.length * 2} Flutter JSON files (iOS / Android)`);

// Builds platform outputs from tokens/** with Style Dictionary v4.
//  build/css/*.css   — layered CSS custom properties (switch via data-brand / data-theme / data-platform, viewport via media queries)
//  build/json/*.json — fully resolved flat tokens per brand × theme (App platform, Compact viewport) for Flutter
import StyleDictionary from 'style-dictionary';
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, basename } from 'node:path';

const T = 'tokens';
const list = (dir) => readdirSync(join(T, dir)).filter((f) => f.endsWith('.json')).map((f) => basename(f, '.json'));
const brands = list('brand');
const themes = list('theme');
const platforms = list('platform');
const viewports = ['compact', 'medium', 'expanded', 'large', 'xlarge'];
const prim = [`${T}/primitives/*.json`];
const DEFAULT = { brand: 'emcd', theme: 'dark', platform: 'web' };

async function cssLayer({ name, sources, own, selector }) {
  const sd = new StyleDictionary({
    log: { verbosity: 'silent', warnings: 'disabled' },
    source: sources,
    platforms: {
      css: {
        transformGroup: 'css',
        buildPath: 'build/css/',
        files: [{
          destination: `${name}.css`,
          format: 'css/variables',
          filter: (t) => t.filePath.includes(own),
          options: { selector, outputReferences: true },
        }],
      },
    },
  });
  await sd.buildAllPlatforms();
}

await cssLayer({ name: 'primitives', sources: prim, own: 'primitives/', selector: ':root' });
for (const b of brands)
  await cssLayer({ name: `brand-${b}`, sources: [...prim, `${T}/brand/${b}.json`], own: `brand/${b}.json`,
    selector: b === DEFAULT.brand ? `:root, [data-brand="${b}"]` : `[data-brand="${b}"]` });
for (const th of themes)
  await cssLayer({ name: `theme-${th}`, sources: [...prim, `${T}/brand/${DEFAULT.brand}.json`, `${T}/theme/${th}.json`], own: `theme/${th}.json`,
    selector: th === DEFAULT.theme ? `:root, [data-theme="${th}"]` : `[data-theme="${th}"]` });
for (const p of platforms)
  await cssLayer({ name: `platform-${p}`, sources: [...prim, `${T}/brand/${DEFAULT.brand}.json`, `${T}/platform/${p}.json`], own: `platform/${p}.json`,
    selector: p === DEFAULT.platform ? `:root, [data-platform="${p}"]` : `[data-platform="${p}"]` });
for (const v of viewports)
  await cssLayer({ name: `viewport-${v}`, sources: [...prim, `${T}/viewport/${v}.json`], own: `viewport/${v}.json`, selector: ':root' });

// Wrap viewport layers in media queries using their breakpoint-min token.
const mq = viewports.map((v) => {
  const tokens = JSON.parse(readFileSync(`${T}/viewport/${v}.json`, 'utf8'));
  const min = tokens.layout['breakpoint-min'].$value;
  const css = readFileSync(`build/css/viewport-${v}.css`, 'utf8').replace(/^\/\*\*[\s\S]*?\*\/\n/, '');
  return min > 0 ? `@media (min-width: ${min}px) {\n${css}}\n` : css;
}).join('\n');
writeFileSync('build/css/viewport.css', mq);

const order = ['primitives', ...brands.map((b) => `brand-${b}`), ...themes.map((t) => `theme-${t}`), ...platforms.map((p) => `platform-${p}`), 'viewport'];
writeFileSync('build/css/index.css', order.map((f) => `@import "./${f}.css";`).join('\n') + '\n');

// Resolved flat JSON for Flutter (App platform, Compact viewport).
mkdirSync('build/json', { recursive: true });
for (const b of brands) for (const th of themes) {
  const sd = new StyleDictionary({
    log: { verbosity: 'silent', warnings: 'disabled' },
    source: [...prim, `${T}/brand/${b}.json`, `${T}/theme/${th}.json`, `${T}/platform/app.json`, `${T}/viewport/compact.json`],
    platforms: { json: { transformGroup: 'js', buildPath: 'build/json/',
      files: [{ destination: `${b}.${th}.json`, format: 'json/flat', filter: (t) => !t.filePath.includes('primitives/') }] } },
  });
  await sd.buildAllPlatforms();
}
console.log(`Built CSS layers + ${brands.length * themes.length} resolved JSON files`);

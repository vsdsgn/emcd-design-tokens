#!/usr/bin/env node
// Код компонентов: один CSS на React, Vue и HTML + бандл React для Claude DS.
//   packages/styles/components.css ← claude-ds/components/*/style.css (порядок ORDER)
//   claude-ds/bundle/bundle.js      ← packages/react/src/index.js (classic script → window.EMCD, React из window)
//   claude-ds/bundle/index.d.ts     ← packages/react/index.d.ts
// Без сборщика: исходник React написан без JSX, импортирует только react.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const r = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const w = (p, s) => { fs.mkdirSync(path.dirname(path.join(ROOT, p)), { recursive: true }); const old = fs.existsSync(path.join(ROOT, p)) ? r(p) : null; if (old !== s) fs.writeFileSync(path.join(ROOT, p), s); return old !== s; };
const CHECK = process.argv.includes('--check');

const ORDER = ['Button', 'IconButton', 'Badge', 'Chip', 'Checkbox', 'Radio', 'Toggle', 'Input', 'Textarea', 'Modal',
  // пачка 2: простые → составные; Select после Input и Menu, Transaction после ListItem
  'Counter', 'Status', 'Avatar', 'Divider', 'Spinner', 'Skeleton', 'Progress', 'StatusBar', 'BulkActionBar', 'Amount', 'Card', 'SectionHeader', 'Breadcrumbs', 'PageHeader', 'StatCard', 'Tooltip', 'Toast', 'Suggest',
  'Tabs', 'Segmented', 'ListItem', 'Transaction', 'Menu', 'Select', 'PasswordField',
  // пачка 3 — экраны майнинга: атомы → молекулы → организмы → конструкции (draft)
  'Icon', 'Coin', 'CoinStack', 'LegendSwatch', 'LegendItem', 'PageIndicator', 'NavItem', 'KeyValueRow', 'Search', 'SelectCompact', 'DateRangeField', 'Calendar', 'DateRangePanel', 'ChartMetric',
  'TableHeaderCell', 'TableCell', 'TableRow', 'Table', 'PromoCard', 'Sidebar', 'ChartCrosshair', 'ChartTooltip', 'ChartPlot', 'ChartCard', 'TopBar', 'StatusSummary', 'PromoCarousel', 'ActionBar', 'Sheet',
  // пачка 5 — App: плавающая кнопка, нижняя навигация
  'FloatingButton', 'TabBarItem', 'TabBar'];
const dirs = fs.readdirSync(path.join(ROOT, 'claude-ds/components')).filter((d) => fs.existsSync(path.join(ROOT, 'claude-ds/components', d, 'style.css')));
const extra = dirs.filter((d) => !ORDER.includes(d)).sort();
// Мост имён: CSS компонентов написан под имена Claude DS (tokens.json); в build/css часть имён другая.
const BRIDGE = `:where(:root) {
  --font-sans: var(--brand-font-family-text), "Inter", system-ui, sans-serif;
  --font-display: var(--brand-font-family-display), "Inter", system-ui, sans-serif;
  --font-mono: var(--brand-font-family-mono), "IBM Plex Mono", ui-monospace, monospace;
  --radius-xs: var(--brand-radius-xs); --radius-sm: var(--brand-radius-sm); --radius-control-xs: var(--brand-radius-control-xs);
  --radius-2xs: var(--brand-radius-2xs); --radius-full: var(--brand-radius-full);
}`;
const css = ['/* EMCD DS 2.0 — стили компонентов (классы emcd-*). Генерируется scripts/code-build.mjs из claude-ds/components/<Comp>/style.css; токены — build/css (подключить раньше). */', BRIDGE]
  .concat([...ORDER.filter((d) => dirs.includes(d)), ...extra].map((d) => r(`claude-ds/components/${d}/style.css`).trim())).join('\n\n') + '\n';

const src = r('packages/react/src/index.js');
const names = [...src.matchAll(/^export (?:const|function) (\w+)/gm)].map((m) => m[1]).filter((n) => n !== 'components');
let body = src
  .replace(/^import \* as React from 'react';\n/m, '')
  .replace(/^export const components = \{[\s\S]*?\};\n/m, '')
  .replace(/^export (const|function) /gm, '$1 ');
if (/^\s*(import|export)\b/m.test(body)) throw new Error('code-build: в исходнике React остались import / export');
if (/<\/script|<!--/i.test(body)) throw new Error('code-build: литерал </script или <!-- в бандле');
const header = `/* @ds-bundle: ${JSON.stringify({ format: 4, namespace: 'EMCD', components: names.map((name) => ({ name })) })} */`;
const bundle = `${header}
/* EMCD DS 2.0 — компоненты React 18. Генерируется scripts/code-build.mjs из packages/react/src/index.js — не править руками. */
(function () {
'use strict';
var React = window.React;
${body.trim()}
window.EMCD = { ${names.join(', ')} };
})();
`;

const targets = [['packages/styles/components.css', css], ['claude-ds/bundle/bundle.js', bundle], ['claude-ds/bundle/index.d.ts', r('packages/react/index.d.ts')]];
let changed = 0;
for (const [p, s] of targets) {
  if (CHECK) { const cur = fs.existsSync(path.join(ROOT, p)) ? r(p) : ''; if (cur !== s) { console.error(`code-build: ${p} устарел — npm run code`); changed++; } }
  else if (w(p, s)) { console.log('записан:', p); changed++; }
}
console.log(`code-build: компонентов React ${names.length}, CSS из ${dirs.length} наборов; ${CHECK ? 'расходится' : 'обновлено'} ${changed}`);
if (CHECK && changed) process.exit(1);

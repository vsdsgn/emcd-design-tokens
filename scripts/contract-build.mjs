// Контракты компонентов из манифеста Figma. Вход: docs/ds-manifest.json + scripts/contract-data.mjs (рукописная часть:
// назначение, правила, анатомия, поведение, a11y, результаты проверок, миграция). Выход: docs/components/<name>.md.
// Запуск: node scripts/contract-build.mjs [--date=ГГГГ-ММ-ДД] [--check]
//   Разделы 1, 4 (оси состояний), 5, 10, 12, 13 собираются из манифеста — поэтому контракт не расходится с Figma.
//   Пишет только наборы, перечисленные в contract-data.mjs; рукописные контракты (field-base, input, …) не трогает.
//   --check: ничего не пишет, код 1, если файл на диске отличается от сборки (для CI).
import fs from 'node:fs';
import { DATA } from './contract-data.mjs';

const arg = (k) => (process.argv.find((a) => a.startsWith(`--${k}=`)) || '').slice(k.length + 3);
const check = process.argv.includes('--check');
const manifest = JSON.parse(fs.readFileSync('docs/ds-manifest.json', 'utf8'));
const date = arg('date') || manifest.generated || new Date().toISOString().slice(0, 10);
const sets = new Map(manifest.pages.flatMap((p) => p.sets.map((s) => [s.name, { ...s, level: p.level, page: p.page, pageId: p.pageId, boards: p.boards || [] }])));

const kebab = (s) => s.replace(/^_/, '').replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '').toLowerCase();
const pascal = (s) => s.replace(/[^\p{L}\p{N}]+/gu, ' ').trim().split(' ').map((w) => w[0].toUpperCase() + w.slice(1)).join('');
const camel = (s) => { const p = pascal(s); return p[0].toLowerCase() + p.slice(1); };
const val = (s) => String(s).trim().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '').toLowerCase();
const list = (a) => (a && a.length ? a.map((x) => `- ${x}`).join('\n') : '- —');
const code = (a) => a.map((x) => `\`${x}\``).join(', ');

const SERVICE_PROPS = new Set(['Focus ring', 'Show hit area', 'Safe margin']);
const SERVICE_LAYERS = /^(focus ring|state layer|hit area|safe area)/;
const ROLE = { f: 'заливка / цвет', s: 'обводка', sw: 'толщина обводки', r: 'радиус', p: 'отступы', gap: 'интервал', h: 'высота', w: 'ширина', minw: 'мин. ширина', o: 'прозрачность', visible: 'видимость', effects: 'эффект' };
const TYPO = new Set(['fontFamily', 'fontSize', 'fontWeight', 'lineHeight']);

// «type/label/md/size» + «…/line-height» → «type/label/md»
const typoName = (t) => t.replace(/\/(size|line-height)$/, '');

function tokensBlock(s) {
  const rows = []; const service = new Set();
  for (const [layer, items] of Object.entries(s.tokens || {})) {
    const byRole = {};
    for (const it of items) {
      const i = it.indexOf(':'); const k = it.slice(0, i); const t = it.slice(i + 1);
      const role = TYPO.has(k) ? 'типографика' : (ROLE[k] || k);
      (byRole[role] = byRole[role] || new Set()).add(TYPO.has(k) ? typoName(t) : t);
    }
    const text = Object.entries(byRole).map(([r, set]) => `${r} ${code([...set].sort())}`).join('; ');
    if (SERVICE_LAYERS.test(layer)) { service.add(`\`${layer}\`: ${text}`); continue; }
    rows.push(`- \`${layer === '(root)' ? 'корень' : layer}\`: ${text}.`);
  }
  if (service.size) rows.push(`- Служебные слои (общие правила — \`service-layers.md\`): ${[...service].join(' · ')}.`);
  const mm = (s.minmax || []).map((m) => m.replace(/^(minw|maxw|minh|maxh)=/, (x, k) => ({ minw: 'minWidth ', maxw: 'maxWidth ', minh: 'minHeight ', maxh: 'maxHeight ' }[k])).replace(' RAW', ' числом'));
  if (mm.length) rows.push(`- Min / max корня: ${mm.join(', ')}.`);
  return rows.join('\n') || '- —';
}

function propsBlock(s) {
  const out = [];
  const axes = Object.entries(s.axes || {});
  if (axes.length) {
    out.push('Оси (варианты):', '', '| Ось | Значения | По умолчанию |', '|---|---|---|');
    const def = s.defaultVariant || {};
    for (const [a, v] of axes) out.push(`| ${a} | ${v.join(' · ')} | ${def[a] || '—'} |`);
    out.push('');
    out.push(s.variants === s.full ? `Матрица полная: ${s.variants} вариантов.` : `Матрица: ${s.variants} из ${s.full}.`);
  } else out.push('Осей нет: один компонент.');
  const props = (s.props || []);
  if (props.length) {
    out.push('', 'Свойства:', '', '| Свойство | Тип | По умолчанию | Привязано в вариантах |', '|---|---|---|---|');
    for (const p of props) out.push(`| ${p.name} | ${p.type === 'BOOLEAN' ? 'булево' : p.type === 'TEXT' ? 'текст' : p.type === 'INSTANCE_SWAP' ? 'замена экземпляра' : p.type} | ${p.type === 'TEXT' ? `«${p.def}»` : p.type === 'BOOLEAN' ? (p.def ? 'вкл' : 'выкл') : `\`${p.def}\``} | ${p.bound} из ${s.variants}${SERVICE_PROPS.has(p.name) ? ' · служебное' : ''} |`);
  }
  return out.join('\n');
}

function codeBlock(s, d) {
  const out = [`Кода нет: DSP, Vue и Flutter недоступны (\`docs/dsp-check-2026-11-12.md\`). Ожидаемый API по правилам имён \`scripts/parity.mjs\` — сверить, когда появится манифест кода.`, ''];
  const name = pascal(s.name);
  const props = [];
  for (const [a, v] of Object.entries(s.axes || {})) { if (a === 'State') continue; const bool = v.length <= 2 && v.every((x) => /^(on|off|true|false)$/i.test(x)); props.push(`\`${camel(a)}\`: ${bool ? 'boolean' : v.map(val).join(' | ')}`); }
  for (const p of s.props || []) { if (SERVICE_PROPS.has(p.name) || p.type === 'INSTANCE_SWAP') continue; props.push(`\`${camel(p.name)}\`: ${p.type === 'BOOLEAN' ? `boolean = ${p.def}` : 'string или слот'}`); }
  out.push(`- Vue: \`<Ds${name}>\`; Flutter: \`Ds${name}\`.`);
  out.push(`- Props: ${props.join('; ') || 'нет'}.`);
  const st = (s.axes || {}).State;
  if (st) out.push(`- Состояния (${st.join(', ')}) — не props: Hover / Pressed / Focus из платформы; \`disabled\`${st.includes('Loading') || (s.props || []).some((p) => p.name === 'Loading') ? ', `loading`' : ''}${st.includes('Skeleton') ? ', `skeleton`' : ''} — props.`);
  for (const x of d.code || []) out.push(`- ${x}`);
  return out.join('\n');
}

function build(d) {
  const s = sets.get(d.name);
  if (!s) throw new Error(`contract-build: набора «${d.name}» нет в манифесте`);
  const board = s.boards.find((b) => b.v3);
  const layers = s.layers || {};
  const svc = [['кольцо фокуса', layers.ring], ['зона Web', layers.hitWeb], ['зона касания', layers.hitApp], ['безопасное поле', layers.safe]].map(([n, c]) => `${n} ${c || 0}`).join(' · ');
  const nested = Object.entries(s.nested || {}).map(([n, c]) => `${n === '(icons)' ? 'иконки' : `\`${n}\``} ×${c}`).join(', ');
  const L = [];
  L.push(`# ${s.name} — контракт (${date})`, '');
  L.push('Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.');
  L.push('Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.', '');
  L.push('## 1. Identity');
  L.push(`- Набор: \`${s.name}\`. Status: ${s.status}. Level: ${s.level}.`);
  L.push(`- Figma: Components, страница «${s.page}» (\`${s.pageId}\`), ${s.type === 'SET' ? 'набор' : 'компонент'} \`${s.id}\`. Платформы: ${d.platformsList || 'Web, Mobile web, iOS, Android'}.`);
  for (const x of d.identity || []) L.push(`- ${x}`);
  L.push('', '## 2. Intent');
  L.push(`- ${d.what}`);
  L.push(`- Когда использовать: ${d.use}`);
  L.push(`- Когда нет: ${d.dont}`);
  if (d.rule) { L.push('- Правило выбора варианта:'); for (const r of d.rule) L.push(`  - ${r}`); }
  if (d.never) L.push(`- Не делаем: ${d.never}`);
  L.push('', '## 3. Anatomy', list(d.anatomy));
  if (nested) L.push(`- Вложено: ${nested}.`);
  L.push(`- Служебные слои (вариантов из ${s.variants}): ${svc}.`);
  L.push('', '## 4. States');
  L.push(`- Группа модели состояний (\`docs/components.md\`): ${d.group}.`);
  L.push(list(d.states));
  L.push('', '## 5. Properties', propsBlock({ ...s, defaultVariant: d.defaults }));
  if (d.propsNote) L.push('', list(d.propsNote));
  L.push('', '## 6. Content / slots', list(d.content));
  L.push('', '## 7. Events', list(d.events));
  L.push('', '## 8. Behavior', list(d.behavior));
  L.push('', '## 9. Accessibility', list(d.a11y));
  L.push('', '## 10. Tokens', tokensBlock(s));
  if (s.rawCount) L.push(`- Значений без переменной: ${s.rawCount}${s.raw && s.raw.length ? ` (напр. ${s.raw.slice(0, 4).map((x) => `\`${x}\``).join(', ')})` : ''} — размеры слоёв зон и то, что перечислено в разделе 14.`);
  L.push('', '## 11. Platforms', list(d.platforms));
  L.push('', '## 12. Figma projection');
  L.push(`- ${s.type === 'SET' ? `Набор \`${s.name}\`, вариантов ${s.variants} из ${s.full}` : `Компонент \`${s.name}\``}; оси: ${Object.keys(s.axes || {}).join(', ') || 'нет'}.`);
  L.push(`- Борда: ${board ? `«${board.name}», разделов ${board.sections.length}` : 'шаблона v3 нет'}.`);
  L.push(`- Описание: ${s.descLen} знаков, разделы: ${(s.descHeads || []).join(' ')}`);
  for (const x of d.figma || []) L.push(`- ${x}`);
  L.push('', '## 13. Code projection', codeBlock(s, d));
  L.push('', `## 14. Acceptance (${date})`);
  L.push(`- \`audit.plugin.js\` — ${d.accept.audit}.`);
  L.push(`- \`variables-check.plugin.js\` — ${d.accept.vc}.`);
  L.push(`- \`audit-parity.plugin.js\` — ${d.accept.ap}.`);
  L.push(`- \`npm run parity\` — токены набора есть в репо или ждут Publish (\`docs/parity-baseline.json\`); сверка props пропущена: кода нет.`);
  L.push(`- Не проверено: ${d.accept.not || 'стенд Light / Dark × бренды × платформы × L0–L3, длинный текст, 6 языков, текст 200 % — снимаются при замене набора (фаза C, после точки отката)'}.`);
  L.push('', '## 15. Migration', list(d.migration));
  if (d.todo && d.todo.length) L.push('', 'Правки к замене набора (фаза C, после точки отката и «ок» Стефана):', list(d.todo));
  return L.join('\n') + '\n';
}

let changed = 0;
fs.mkdirSync('docs/components', { recursive: true });
for (const d of DATA) {
  const file = `docs/components/${kebab(d.name)}.md`;
  const text = build(d);
  const old = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : '';
  if (old === text) continue;
  changed++;
  if (check) console.log(`✗ ${file}: отличается от сборки — node scripts/contract-build.mjs`);
  else fs.writeFileSync(file, text);
}
console.log(`contract-build: наборов ${DATA.length}, ${check ? 'расходится' : 'записано'} ${changed}`);
process.exit(check && changed ? 1 : 0);

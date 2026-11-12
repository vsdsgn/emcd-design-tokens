// Аудит draft-наборов по манифесту Figma: что мешает перевести набор в beta. Наборы не меняет, в Figma не ходит.
// Вход: docs/ds-manifest.json. Выход: docs/audit-draft.md.
// Запуск: node scripts/draft-audit.mjs [--check]
//   --check: ничего не пишет, код 1, если файл на диске отличается от сборки (для CI).
//   Правила — те же, что у audit-parity.plugin.js (DESC, MATRIX, AXES, MINMAX), плюс PROPS, RAW, SERVICE, BOARD из манифеста.
import fs from 'node:fs';

const check = process.argv.includes('--check');
const OUT = 'docs/audit-draft.md';
const manifest = JSON.parse(fs.readFileSync('docs/ds-manifest.json', 'utf8'));
const sets = manifest.pages.flatMap((p) => p.sets.map((s) => ({ ...s, level: p.level, page: p.page, boards: p.boards || [], boardMissing: p.boardMissing || [] })));
const draft = sets.filter((s) => s.status !== 'beta');

const DESC_REQUIRED = ['Когда использовать:', 'Правила:', 'A11y:'];
const INTERACTIVE = new Set(['Hover', 'Pressed', 'Focus', 'Focused']);
const BOOL = [['Off', 'On'], ['False', 'True'], ['No', 'Yes']];
const sameSet = (a, b) => a.length === b.length && a.every((x) => b.includes(x));

function findings(s) {
  const f = [];
  // DESC: первая строка — Status, обязательные разделы описания
  const miss = DESC_REQUIRED.filter((h) => !s.descHeads.includes(h));
  if (!s.statusFirstLine) miss.unshift('Status: первой строкой');
  if (miss.length) f.push(['DESC', `нет: ${miss.join(', ')}`]);
  // MATRIX: вариантов меньше, чем полная матрица осей
  if (s.variants < s.full) f.push(['MATRIX', `${s.variants} из ${s.full}`]);
  // AXES: булева ось вместо свойства; Left / Right вместо Start / End
  for (const [axis, values] of Object.entries(s.axes || {})) {
    if (BOOL.some((b) => sameSet(values, b))) f.push(['AXES', `\`${axis}\` — булева ось (${values.join(' | ')})`]);
    if (values.includes('Left') || values.includes('Right')) f.push(['AXES', `\`${axis}\` — Left / Right вместо Start / End`]);
  }
  // PROPS: свойство привязано не во всех вариантах
  const loose = (s.props || []).filter((p) => p.bound < s.variants);
  if (loose.length) f.push(['PROPS', loose.map((p) => `${p.name} ${p.bound} из ${s.variants}`).join('; ')]);
  // MINMAX: min / max числом
  const raw = (s.minmax || []).filter((x) => x.endsWith('RAW')).map((x) => x.replace(' RAW', ''));
  if (raw.length) f.push(['MINMAX', raw.join(', ')]);
  // RAW: значения без переменной
  if (s.rawCount) f.push(['RAW', `${s.rawCount} (напр. ${(s.raw || []).slice(0, 2).map((x) => `\`${x}\``).join(', ')})`]);
  // SERVICE: у интерактивного набора — кольцо фокуса, зона нажатия, безопасное поле
  const interactive = Object.values(s.axes || {}).some((v) => v.some((x) => INTERACTIVE.has(x)));
  if (interactive) {
    const l = s.layers || {};
    const no = [];
    if (!l.ring) no.push('кольца фокуса');
    if (!l.hitWeb && !l.hitApp && !l.hit) no.push('зоны нажатия');
    if (!l.safe) no.push('безопасного поля');
    if (no.length) f.push(['SERVICE', `нет ${no.join(', ')}`]);
  }
  // BOARD: борда v3 и её разделы
  if (!s.boards.some((b) => b.v3)) f.push(['BOARD', 'нет борды v3']);
  else if (s.boardMissing.length) f.push(['BOARD', `нет разделов ${s.boardMissing.join(', ')}`]);
  return f;
}

const LEVELS = [['atom', 'Атомы'], ['molecule', 'Молекулы'], ['organism', 'Организмы']];
const rows = draft.map((s) => ({ s, f: findings(s) }));
const count = {};
for (const r of rows) for (const code of new Set(r.f.map((x) => x[0]))) count[code] = (count[code] || 0) + 1;
const clean = rows.filter((r) => !r.f.length);

let md = `# Аудит draft-наборов (${manifest.generated})

Собрано \`scripts/draft-audit.mjs\` из \`docs/ds-manifest.json\` — править там, не здесь. Наборы в Figma не менялись.
Это проверка по манифесту, а не «Готово»: плагины \`audit\` и \`variables-check\`, стенд и контракт по каждому набору — при переводе в beta.

## Сводка

- Наборов не в beta: ${draft.length} (draft ${draft.filter((s) => s.status === 'draft').length}, без статуса ${draft.filter((s) => s.status !== 'draft').length}: ${draft.filter((s) => s.status !== 'draft').map((s) => s.name).join(', ') || '—'}).
- Без замечаний по манифесту: ${clean.length}${clean.length ? ` (${clean.map((r) => r.s.name).join(', ')})` : ''}.
- Наборов с замечанием: ${Object.entries(count).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} — ${v}`).join(', ')}.

Коды: DESC — разделы описания; MATRIX — неполная матрица осей; AXES — булева ось или Left / Right; PROPS — свойство привязано не во всех вариантах (часть — по делу: свойство есть только у вариантов со слотом); MINMAX — min / max числом; RAW — значения без переменной (часть — размеры служебных слоёв); SERVICE — у набора с Hover / Pressed / Focus нет служебных слоёв; BOARD — нет борды v3 или её разделов (у неинтерактивного набора разделы 04 «Состояния», 05 «Зоны» могут быть не нужны — решается при контракте).
`;
for (const [level, title] of LEVELS) {
  const part = rows.filter((r) => r.s.level === level).sort((a, b) => a.s.name.localeCompare(b.s.name));
  if (!part.length) continue;
  md += `\n## ${title} (${part.length})\n\n| Набор | Страница | Вариантов | Замечания |\n|---|---|---|---|\n`;
  for (const { s, f } of part) md += `| ${s.name} | ${s.page} | ${s.variants} | ${f.length ? f.map(([c, t]) => `${c}: ${t.replace(/\|/g, '\\|')}`).join('<br>') : '—'} |\n`;
}

const old = fs.existsSync(OUT) ? fs.readFileSync(OUT, 'utf8') : '';
const diff = old === md ? 0 : 1;
if (!check) fs.writeFileSync(OUT, md);
console.log(`draft-audit: наборов ${draft.length}, без замечаний ${clean.length}; ${check ? 'расходится' : 'обновлено'} ${diff}`);
if (check && diff) process.exit(1);

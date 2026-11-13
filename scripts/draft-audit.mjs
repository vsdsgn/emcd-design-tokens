// Аудит draft-наборов по манифесту Figma: что мешает перевести набор в beta. Наборы не меняет, в Figma не ходит.
// Вход: docs/ds-manifest.json. Выход: docs/audit-draft.md.
// Запуск: node scripts/draft-audit.mjs [--check]
//   --check: ничего не пишет, код 1, если файл на диске отличается от сборки (для CI).
//   Правила — те же, что у audit-parity.plugin.js (DESC, MATRIX, AXES, MINMAX), плюс PROPS, RAW, SERVICE, BOARD из манифеста.
import fs from 'node:fs';
import { findings } from './draft-findings.mjs';

const check = process.argv.includes('--check');
const OUT = 'docs/audit-draft.md';
const manifest = JSON.parse(fs.readFileSync('docs/ds-manifest.json', 'utf8'));
const sets = manifest.pages.flatMap((p) => p.sets.map((s) => ({ ...s, level: p.level, page: p.page, boards: p.boards || [], boardMissing: p.boardMissing || [] })));
const draft = sets.filter((s) => s.status !== 'beta');

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

Коды: DESC — разделы описания; MATRIX — неполная матрица осей; AXES — булева ось (кроме осей выбора Status / Selected и списка BOOL_OK) или Left / Right; PROPS — свойство не привязано ни в одном варианте; MINMAX — min / max числом; RAW — значения без переменной (без размеров образца на корне и зоны нажатия; строки реестра docs/exceptions.md — в списке RAW_OK); SERVICE — у набора с Hover / Pressed / Focus нет служебных слоёв; BOARD — нет борды v3 или её разделов (разделы, которых у набора нет по смыслу, перечисляет блок «Не собрано в этой версии» на самой борде).
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

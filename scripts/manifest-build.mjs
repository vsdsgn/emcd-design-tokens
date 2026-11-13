// Сборка docs/ds-manifest.json из ответов scripts/figma/manifest.plugin.js.
// Вход: папка с файлами <батч>.<кусок>.txt (первая строка «chunk i/N», дальше кусок JSON).
// Уровень по первой букве батча: A — atom, M — molecule, O — organism. bases.json в той же папке (ответ
// scripts/figma/manifest-bases.plugin.js) → раздел bases: базы и служебные слои, в подсчёты наборов не входят. Запуск: node scripts/manifest-build.mjs <папка> [--date=YYYY-MM-DD]
import fs from 'node:fs';
import path from 'node:path';

const dir = process.argv[2];
if (!dir) { console.error('usage: node scripts/manifest-build.mjs <dir> [--date=YYYY-MM-DD]'); process.exit(1); }
const date = (process.argv.find(a => a.startsWith('--date=')) || '').slice(7) || new Date().toISOString().slice(0, 10);
const LEVEL = { A: 'atom', M: 'molecule', O: 'organism' };
const SECTIONS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];

const batches = {};
for (const f of fs.readdirSync(dir).filter(f => /^\w+\.\d+\.txt$/.test(f))) {
  const [batch, chunk] = f.split('.'); const text = fs.readFileSync(path.join(dir, f), 'utf8');
  const nl = text.indexOf('\n'); const m = text.slice(0, nl).match(/^chunk (\d+)\/(\d+)$/);
  if (!m || +m[1] !== +chunk) throw new Error(`${f}: заголовок «${text.slice(0, nl)}» не совпадает с именем файла`);
  (batches[batch] = batches[batch] || { total: +m[2], parts: [] }).parts[+chunk] = text.slice(nl + 1);
}

const pages = {};
for (const [batch, b] of Object.entries(batches).sort()) {
  for (let i = 0; i < b.total; i++) if (b.parts[i] == null) throw new Error(`батч ${batch}: нет куска ${i} из ${b.total}`);
  for (const p of JSON.parse(b.parts.join(''))) {
    if (!p.page) { console.warn(`батч ${batch}: страница ${p.id} не найдена`); continue; }
    const boardSections = new Set(p.board.filter(x => /шаблон v3/.test(x.name)).flatMap(x => x.sections.map(s => s.slice(0, 2))));
    pages[p.id] = {
      level: LEVEL[batch[0]] || 'unknown', page: p.page.replace(/^\P{L}+/u, ''), pageId: p.id, pageMark: (p.page.match(/^\P{L}+/u) || [''])[0].trim(),
      boards: p.board.map(x => ({ name: x.name, id: x.id, v3: /шаблон v3/.test(x.name), sections: x.sections.filter(s => s !== 'Frame') })),
      boardMissing: p.board.some(x => /шаблон v3/.test(x.name)) ? SECTIONS.filter(s => !boardSections.has(s)) : SECTIONS,
      sets: p.sets.map(s => ({ ...s, status: (s.status.match(/^Status:\s*(\w+)/) || [, null])[1], statusFirstLine: /^Status:/.test(s.status) })),
    };
  }
}

const list = Object.values(pages).sort((a, b) => 'amo'.indexOf(a.level[0]) - 'amo'.indexOf(b.level[0]) || a.page.localeCompare(b.page));
const sets = list.flatMap(p => p.sets.map(s => ({ ...s, level: p.level, page: p.page })));
const count = (arr, key) => arr.reduce((o, x) => (o[key(x)] = (o[key(x)] || 0) + 1, o), {});
const summary = {
  pages: count(list, p => p.level), sets: count(sets, s => s.level), status: count(sets, s => s.status || 'нет'),
  variants: sets.reduce((n, s) => n + s.variants, 0),
  incompleteMatrix: sets.filter(s => s.variants < s.full).length,
  propsNotBoundEverywhere: sets.filter(s => s.props.some(p => p.bound < s.variants)).length,
  rawMinMax: sets.filter(s => s.minmax.some(m => / RAW$/.test(m))).length,
  withRawValues: sets.filter(s => s.rawCount > 0).length,
  withFocusRing: sets.filter(s => s.layers.ring > 0).length,
  withHitArea: sets.filter(s => s.layers.hitWeb + s.layers.hitApp + s.layers.hit > 0).length,
  withSafeMargin: sets.filter(s => s.layers.safe > 0).length,
  pagesWithoutV3Board: list.filter(p => !p.boards.some(b => b.v3)).length,
  pagesWithFullBoard: list.filter(p => p.boardMissing.length === 0).length,
};
const basesFile = path.join(dir, 'bases.json');
const bases = fs.existsSync(basesFile) ? JSON.parse(fs.readFileSync(basesFile, 'utf8')).map(p => ({ page: p.page.replace(/^\P{L}+/u, ''), pageId: p.id, sets: p.sets })) : [];
summary.baseSets = bases.reduce((n, p) => n + p.sets.length, 0);
fs.writeFileSync('docs/ds-manifest.json', JSON.stringify({ generated: date, source: 'Figma Components, scripts/figma/manifest.plugin.js, manifest-bases.plugin.js (read-only)', summary, pages: list, bases }, null, 1) + '\n');
console.log(JSON.stringify(summary, null, 1));

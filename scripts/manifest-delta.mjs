// Дельта манифеста без старой папки сырья (26.11): вливает пересъёмку отдельных страниц в docs/ds-manifest.json.
// Вход: файлы ответов scripts/figma/manifest.plugin.js — <имя>.<кусок>.txt (первая строка «chunk i/N»), одна или несколько страниц.
// Страница заменяется по pageId, уровень берётся из прежней записи; сводка пересчитывается по тем же правилам, что в manifest-build.mjs.
// Запуск: node scripts/manifest-delta.mjs <папка> [--date=ГГГГ-ММ-ДД]
import fs from 'node:fs';
import path from 'node:path';

const dir = process.argv[2];
if (!dir) { console.error('usage: node scripts/manifest-delta.mjs <dir> [--date=YYYY-MM-DD]'); process.exit(1); }
const date = (process.argv.find(a => a.startsWith('--date=')) || '').slice(7) || new Date().toISOString().slice(0, 10);
const SECTIONS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
const M = JSON.parse(fs.readFileSync('docs/ds-manifest.json', 'utf8'));

const batches = {};
for (const f of fs.readdirSync(dir).filter(f => /^[\w-]+\.\d+\.txt$/.test(f))) {
  const [batch, chunk] = f.split('.'); const text = fs.readFileSync(path.join(dir, f), 'utf8');
  const nl = text.indexOf('\n'); const m = text.slice(0, nl).match(/^chunk (\d+)\/(\d+)$/);
  if (!m || +m[1] !== +chunk) throw new Error(`${f}: заголовок «${text.slice(0, nl)}» не совпадает с именем файла`);
  (batches[batch] = batches[batch] || { total: +m[2], parts: [] }).parts[+chunk] = text.slice(nl + 1);
}
const replaced = [];
for (const [batch, b] of Object.entries(batches)) {
  for (let i = 0; i < b.total; i++) if (b.parts[i] == null) throw new Error(`батч ${batch}: нет куска ${i} из ${b.total}`);
  for (const p of JSON.parse(b.parts.join(''))) {
    const idx = M.pages.findIndex(x => x.pageId === p.id); const old = M.pages[idx];
    const boardSections = new Set(p.board.filter(x => /шаблон v3/.test(x.name)).flatMap(x => x.sections.map(s => s.slice(0, 2))));
    const page = {
      level: old ? old.level : 'unknown', page: p.page.replace(/^\P{L}+/u, ''), pageId: p.id, pageMark: (p.page.match(/^\P{L}+/u) || [''])[0].trim(),
      boards: p.board.map(x => ({ name: x.name, id: x.id, v3: /шаблон v3/.test(x.name), sections: x.sections.filter(s => s !== 'Frame' && s !== 'Шапка') })),
      boardMissing: p.board.some(x => /шаблон v3/.test(x.name)) ? SECTIONS.filter(s => !boardSections.has(s)) : SECTIONS,
      sets: p.sets.map(s => ({ ...s, status: (s.status.match(/^Status:\s*(\w+)/) || [, null])[1], statusFirstLine: /^Status:/.test(s.status) })),
    };
    if (idx >= 0) M.pages[idx] = page; else M.pages.push(page);
    replaced.push(page.page + ' (' + page.sets.map(s => s.name + ' ' + s.variants + '/' + s.full).join(', ') + ')');
  }
}
const list = M.pages; const sets = list.flatMap(p => p.sets.map(s => ({ ...s, level: p.level, page: p.page })));
const count = (arr, key) => arr.reduce((o, x) => (o[key(x)] = (o[key(x)] || 0) + 1, o), {});
M.summary = { ...M.summary,
  pages: count(list, p => p.level), sets: count(sets, s => s.level), status: count(sets, s => s.status || 'нет'),
  variants: sets.reduce((n, s) => n + s.variants, 0), incompleteMatrix: sets.filter(s => s.variants < s.full).length,
  propsNotBoundEverywhere: sets.filter(s => s.props.some(p => p.bound < s.variants)).length,
  rawMinMax: sets.filter(s => s.minmax.some(m => / RAW$/.test(m))).length, withRawValues: sets.filter(s => s.rawCount > 0).length,
  withFocusRing: sets.filter(s => s.layers.ring > 0).length, withHitArea: sets.filter(s => s.layers.hitWeb + s.layers.hitApp + s.layers.hit > 0).length,
  withSafeMargin: sets.filter(s => s.layers.safe > 0).length, pagesWithoutV3Board: list.filter(p => !p.boards.some(b => b.v3)).length,
  pagesWithFullBoard: list.filter(p => p.boardMissing.length === 0).length };
M.generated = date;
fs.writeFileSync('docs/ds-manifest.json', JSON.stringify(M, null, 1));
console.log('заменено:\n- ' + replaced.join('\n- '));

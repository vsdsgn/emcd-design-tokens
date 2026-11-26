// Чтение «Как сделать» со страницы «⚑ Таблицы миграции» (26.11). Возвращает {colors:{'<NNN>':текст}, components:{'<NN>':текст}}; «…» и пусто — не возвращаются.
// Номер строки = порядок в docs/migration/table-colors.csv / table-components.csv. Слить: python3 scripts/migration-tables-figma.py --merge <json>.
const page = figma.root.children.find((p) => p.name === '⚑ Таблицы миграции'); await figma.setCurrentPageAsync(page);
const out = {};
for (const [t, k] of [['Цвета → токены', 'colors'], ['Компоненты prod → DS 2.0', 'components']]) {
  const tb = page.children.find((n) => n.name === t); out[k] = {};
  for (const r of tb.children.filter((n) => n.name.startsWith('row · '))) { const c = r.children.find((n) => n.name === 'how-cell'); if (!c) continue;
    const h = c.children.find((n) => n.type === 'TEXT'); let s = h ? h.characters.trim() : ''; if (s === '…') s = '';
    const ex = c.children.filter((n) => n.type !== 'TEXT').map((n) => n.name); // 26.11: Стефан кладёт в ячейку примеры компонентов
    if (ex.length) s = (s ? s + ' ' : '') + '[пример в ячейке: ' + ex.join(', ') + ']';
    if (s) out[k][r.name.slice(6).split(' ')[0]] = s; }
}
return out;

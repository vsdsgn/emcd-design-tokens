// Таблицы миграции в Figma (26.11): страница «⚑ Таблицы миграции» — цвета → токены и компоненты prod → DS 2.0, колонка «Как сделать» (жёлтая, редактируется руками).
// Генерация данных: python3 scripts/migration-tables-figma.py → чанки D = {t:<название таблицы>, x, cols:[[label,w,kind]], rows:[{id, c:[...]}]}; kind: t — текст, s — образец цвета (#hex/#hex+alpha), h — «Как сделать».
// Повторный прогон: строки с тем же id не дублируются (пропуск). Чтение ответов: текст узлов «how» в строках «row · <id>»; «…» = пусто.
const PAGE = '⚑ Таблицы миграции';
await Promise.all([{ family: 'Inter', style: 'Regular' }, { family: 'Inter', style: 'Semi Bold' }].map((f) => figma.loadFontAsync(f)));
let page = figma.root.children.find((p) => p.name === PAGE); if (!page) { page = figma.createPage(); page.name = PAGE; }
await figma.setCurrentPageAsync(page);
const rgb = (h) => ({ r: parseInt(h.slice(1, 3), 16) / 255, g: parseInt(h.slice(3, 5), 16) / 255, b: parseInt(h.slice(5, 7), 16) / 255 });
const G = (v) => [{ type: 'SOLID', color: { r: v, g: v, b: v } }];
const txt = (s, w, bold, grey) => { const t = figma.createText(); t.fontName = { family: 'Inter', style: bold ? 'Semi Bold' : 'Regular' }; t.fontSize = 12; t.lineHeight = { unit: 'PIXELS', value: 16 }; t.characters = s || '—'; t.fills = G(grey ? 0.55 : 0.1); t.textAutoResize = 'HEIGHT'; t.resize(w, t.height); return t; };
function cell(row, w, kind, v, head) {
  const c = figma.createAutoLayout(kind === 's' && !head ? 'HORIZONTAL' : 'VERTICAL'); c.name = head ? 'head' : kind === 'h' ? 'how-cell' : 'cell';
  c.paddingLeft = c.paddingRight = 8; c.paddingTop = c.paddingBottom = 6; c.itemSpacing = 6; c.counterAxisAlignItems = kind === 's' && !head ? 'CENTER' : 'MIN';
  c.fills = kind === 'h' ? [{ type: 'SOLID', color: head ? { r: 1, g: 0.85, b: 0.3 } : { r: 1, g: 0.97, b: 0.8 } }] : head ? G(0.93) : [];
  row.appendChild(c); c.primaryAxisSizingMode = 'FIXED'; c.counterAxisSizingMode = 'FIXED'; c.resize(w, 28); c.layoutSizingHorizontal = 'FIXED'; c.layoutSizingVertical = 'FILL';
  if (kind === 's' && !head && v) { const r = figma.createRectangle(); r.resize(20, 20); r.cornerRadius = 4; r.strokes = G(0.8); r.fills = [{ type: 'SOLID', color: rgb(v), opacity: v.length > 7 ? parseInt(v.slice(7, 9), 16) / 255 : 1 }]; c.appendChild(r); c.appendChild(txt(v, w - 42)); return c; }
  const t = txt(head ? v : kind === 'h' ? (v || '…') : v, w - 16, head, kind === 'h' && !v && !head); if (kind === 'h' && !head) t.name = 'how'; c.appendChild(t); return c;
}
function mkRow(tb, name) { const r = figma.createAutoLayout('HORIZONTAL'); r.name = name; r.itemSpacing = 0; r.fills = G(1); r.strokes = G(0.88); r.strokeTopWeight = r.strokeLeftWeight = r.strokeRightWeight = 0; r.strokeBottomWeight = 1; r.counterAxisAlignItems = 'MIN'; tb.appendChild(r); return r; }
let tb = page.children.find((n) => n.name === D.t);
if (!tb) {
  tb = figma.createAutoLayout('VERTICAL'); tb.name = D.t; tb.itemSpacing = 0; tb.fills = G(1); tb.x = D.x; tb.y = 0; page.appendChild(tb);
  const h1 = txt(D.t, 800, true); h1.fontSize = 24; h1.lineHeight = { unit: 'PIXELS', value: 32 }; h1.name = 'title'; tb.appendChild(h1);
  const n = txt(D.note, 800, false, true); n.name = 'note'; tb.appendChild(n);
  const hr = mkRow(tb, 'header'); for (const [l, w, k] of D.cols) cell(hr, w, k, l, true);
}
const have = new Set(tb.children.map((n) => n.name)); const made = [];
for (const r of D.rows) { const nm = 'row · ' + r.id; if (have.has(nm)) continue; const row = mkRow(tb, nm); D.cols.forEach(([l, w, k], i) => cell(row, w, k, r.c[i])); made.push(nm); }
return { page: page.id, table: tb.id, added: made.length, total: tb.children.filter((n) => n.name.startsWith('row · ')).length };

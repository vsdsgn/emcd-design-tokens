// Сборка страницы «📦 В общий файл · <продукт>» (25.11): по одному экрану на сценарий и платформу — для переноса Стефаном в общий файл миграции.
// ARGS: {pages:[id страницы-источника], product:'Monitoring', web:[1200,2000], mob:[320,430], byRow:false}. Запуск — use_figma в файле Migration test продукта.
// Правило отбора: в каждой секции (и на самой странице для экранов вне секций) — первый по положению (y, затем x) экран Web и первый мобильный.
// Ряд на страницу-источник: подпись раздела слева, экраны в ряд с зазором 120. Повторный запуск для той же страницы-источника — ряд заменяется.
const W = ARGS.web || [1200, 2000], M = ARGS.mob || [320, 430];
const cls = (w) => (w >= W[0] && w <= W[1] ? 'web' : w >= M[0] && w <= M[1] ? 'mob' : null);
const name = '📦 В общий файл · ' + ARGS.product;
let pack = figma.root.children.find((p) => p.name === name); if (!pack) { pack = figma.createPage(); pack.name = name; }
await figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' });
const out = []; const F = new Set();
// Перенос узла с текстом на другую страницу требует загруженных шрифтов всех текстов внутри.
const lfAll = async (n) => { for (const t of n.findAllWithCriteria({ types: ['TEXT'] })) { let segs = []; try { segs = t.getStyledTextSegments(['fontName']); } catch (e) {} for (const sg of segs) { const k = sg.fontName.family + '|' + sg.fontName.style; if (F.has(k)) continue; F.add(k); try { await figma.loadFontAsync(sg.fontName); } catch (e) {} } } };
for (const id of ARGS.pages) {
  const src = await figma.getNodeByIdAsync(id); await src.loadAsync(); const groups = [];
  const collect = (c) => { const fr = c.children.filter((x) => x.type === 'FRAME' && cls(x.width) && x.height >= 500); if (fr.length) groups.push(fr); for (const s of c.children.filter((x) => x.type === 'SECTION')) collect(s); };
  collect(src);
  // byRow: в секции может быть несколько рядов-сценариев (Firmware D01…) — тогда первый экран каждого ряда (ряд — экраны с y в пределах 100).
  const picks = []; for (const fr of groups) for (const k of ['web', 'mob']) { const fs = fr.filter((x) => cls(x.width) === k).sort((a, b) => a.y - b.y || a.x - b.x); if (!fs.length) continue;
    if (!ARGS.byRow) { picks.push(fs[0]); continue; } let rowY = null; for (const f of fs) { if (rowY === null || f.y - rowY > 100) { rowY = f.y; picks.push(fs.filter((g) => Math.abs(g.y - rowY) <= 100).sort((a, b) => a.x - b.x)[0]); } } }
  const rowName = '⟶ ' + src.name.trim();
  const old = pack.children.find((n) => n.name === rowName); let y;
  if (old) { y = old.y; old.remove(); } else { y = pack.children.length ? Math.max(...pack.children.map((n) => n.y + n.height)) + 600 : 0; }
  const row = figma.createFrame(); row.name = rowName; row.fills = []; row.clipsContent = false; pack.appendChild(row); row.x = 0; row.y = y;
  const t = figma.createText(); t.fontName = { family: 'Inter', style: 'Semi Bold' }; t.fontSize = 96; t.characters = src.name.trim(); t.fills = [{ type: 'SOLID', color: { r: 0.6, g: 0.6, b: 0.6 } }]; row.appendChild(t); t.x = 0; t.y = 0;
  let x = 0, h = 0; for (const f of picks) { await lfAll(f); const c = f.clone(); row.appendChild(c); c.x = x; c.y = 200; x += c.width + 120; h = Math.max(h, c.height); }
  row.resize(Math.max(x, t.width), 200 + h);
  out.push(src.name.trim() + ': ' + picks.length);
}
return { page: pack.id, rows: out };

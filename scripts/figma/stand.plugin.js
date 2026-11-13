// Временный стенд для ручной проверки набора перед переводом в beta (раздел 4 брифа «Готово»).
// Запуск: Figma MCP use_figma в файле Components. Создаёт страницу PAGE_NAME (если её нет) и на ней секцию на каждый набор из SETS:
//   6 строк Theme × Brand; в строке — ячейки Platform (Web, iOS, Android) на L0, у EMCD ещё L1–L3 на Web;
//   строка «Текст»: длинный текст и 6 языков в варианте по умолчанию (все TEXT-свойства), ячейка «200 %» — все варианты с удвоенным кеглем,
//   строка «Свойства»: каждое булево свойство переключено из значения по умолчанию.
// Возврат: секция, строки и рамки ячеек (cells: имя, x, y, w, h от угла секции) — по ним скриншот секции режется на листы для просмотра.
// В ячейке — экземпляры всех вариантов. После просмотра скриншотов страницу удалить (REMOVE = true).
const SETS = ['167:78']; // id наборов (COMPONENT_SET) или отдельных компонентов
const REMOVE = false; // true — удалить страницу стенда и выйти
const CLEAR = false; // true — перед сборкой убрать со страницы стенда прежние секции (скриншоты уже сняты)
const PAGE_NAME = '⚑ Стенд · временный'; const CELL_W = 560;
const SAMPLES = { long: 'Очень длинный текст, который не помещается в одну строку и должен усечься или перенестись по правилу компонента', de: 'Rechtsschutzversicherungsgesellschaften Auszahlung', ar: 'سحب الأموال إلى المحفظة الخارجية', hi: 'बाहरी वॉलेट में निकासी', th: 'ถอนเงินไปยังกระเป๋าเงินภายนอก', ja: '外部ウォレットへの出金', kk: 'Сыртқы әмиянға қаражат шығару' };
figma.skipInvisibleInstanceChildren = false;
let page = figma.root.children.find(p => p.name === PAGE_NAME);
if (REMOVE) { if (page) page.remove(); return { removed: !!page }; }
if (!page) { page = figma.createPage(); page.name = PAGE_NAME; }
await figma.setCurrentPageAsync(page);
if (CLEAR) for (const ch of [...page.children]) ch.remove();
const C = {}; const VARS = {};
for (const c of await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync()) { const vs = await figma.teamLibrary.getVariablesInLibraryCollectionAsync(c.key); if (!vs.length) continue;
  const pick = n => vs.find(v => v.name === n); const first = await figma.variables.importVariableByKeyAsync(vs[0].key);
  C[c.name] = await figma.variables.getVariableCollectionByIdAsync(first.variableCollectionId);
  for (const n of ['surface/current', 'text/primary', 'border/subtle']) if (pick(n)) VARS[n] = await figma.variables.importVariableByKeyAsync(pick(n).key); }
const mode = (col, name) => C[col].modes.find(m => m.name === name).modeId;
await figma.loadFontAsync({ family: 'Inter', style: 'Regular' }); await figma.loadFontAsync({ family: 'Inter', style: 'Semi Bold' });
// Шрифты всех брендов и платформ: без них экземпляр нельзя вставить во фрейм с другим режимом.
const fams = new Set(); const famOf = async (val, d) => { if (typeof val === 'string') fams.add(val); else if (val && val.type === 'VARIABLE_ALIAS' && d < 5) { const a = await figma.variables.getVariableByIdAsync(val.id); if (a) for (const x of Object.values(a.valuesByMode)) await famOf(x, d + 1); } };
for (const c of await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync()) for (const lv of await figma.teamLibrary.getVariablesInLibraryCollectionAsync(c.key)) if (/font\/family|font-family/.test(lv.name)) { const v = await figma.variables.importVariableByKeyAsync(lv.key); for (const x of Object.values(v.valuesByMode)) await famOf(x, 0); }
for (const f of await figma.listAvailableFontsAsync()) if (fams.has(f.fontName.family)) await figma.loadFontAsync(f.fontName);
const paint = v => [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5 } }, 'color', v)];
const al = (dir, gap, pad) => { const f = figma.createFrame(); f.layoutMode = dir; f.itemSpacing = gap; f.paddingTop = f.paddingBottom = f.paddingLeft = f.paddingRight = pad; f.primaryAxisSizingMode = 'AUTO'; f.counterAxisSizingMode = 'AUTO'; f.fills = []; return f; };
const text = (s, size, style) => { const t = figma.createText(); t.fontName = { family: 'Inter', style: style || 'Regular' }; t.fontSize = size; t.characters = s; t.fills = paint(VARS['text/primary']); return t; };
const cell = (row, label, modes) => { const c = al('VERTICAL', 12, 16); c.name = label; c.fills = paint(VARS['surface/current']); c.strokes = paint(VARS['border/subtle']); c.strokeWeight = 1;
  for (const [col, m] of Object.entries(modes)) c.setExplicitVariableModeForCollection(C[col], mode(col, m));
  row.appendChild(c); c.appendChild(text(label, 11));
  const w = al('HORIZONTAL', 16, 0); w.name = 'variants'; w.clipsContent = false; w.layoutWrap = 'WRAP'; w.counterAxisSpacing = 16; w.counterAxisAlignItems = 'MIN'; c.appendChild(w); w.resize(CELL_W, 10); w.primaryAxisSizingMode = 'FIXED'; w.counterAxisSizingMode = 'AUTO'; return w; };
const loadFonts = async n => { for (const t of n.findAll(x => x.type === 'TEXT')) for (const s of t.getStyledTextSegments(['fontName'])) await figma.loadFontAsync(s.fontName); };
const out = []; const errors = []; let y = 0;
for (const ch of page.children) y = Math.max(y, ch.y + ch.height + 200);
for (const id of SETS) {
  const s = await figma.getNodeByIdAsync(id); if (!s) { errors.push('нет узла ' + id); continue; }
  const variants = s.type === 'COMPONENT_SET' ? s.children : [s];
  for (const ex of page.children.filter(n => n.name === 'Стенд · ' + s.name)) ex.remove();
  const sec = al('VERTICAL', 16, 24); sec.name = 'Стенд · ' + s.name; sec.fills = [{ type: 'SOLID', color: { r: 0.93, g: 0.93, b: 0.93 } }]; page.appendChild(sec); sec.x = 0; sec.y = y;
  sec.appendChild(text('Стенд · ' + s.name + ' · ' + variants.length + ' вариантов', 20, 'Semi Bold'));
  const rows = [];
  for (const theme of ['Light', 'Dark']) for (const brand of ['EMCD', 'Geometria', 'WL Default']) {
    const row = al('HORIZONTAL', 16, 0); row.name = theme + ' · ' + brand; sec.appendChild(row);
    const cells = ['Web', 'iOS', 'Android'].map(p => [p + ' · L0', p, 'L0']); if (brand === 'EMCD') for (const l of ['L1', 'L2', 'L3']) cells.push(['Web · ' + l, 'Web', l]);
    for (const [lab, p, l] of cells) { const w = cell(row, theme + ' · ' + brand + ' · ' + lab, { Theme: theme, Brand: brand, Platform: p, 'Surface context': l }); for (const v of variants) w.appendChild(v.createInstance()); }
    rows.push({ name: row.name, id: row.id });
  }
  const trow = al('HORIZONTAL', 16, 0); trow.name = 'Текст'; sec.appendChild(trow);
  const defs = s.type === 'COMPONENT_SET' || (s.parent && s.parent.type !== 'COMPONENT_SET') ? s.componentPropertyDefinitions : {}; const tprops = Object.keys(defs).filter(k => defs[k].type === 'TEXT');
  for (const [lang, sample] of Object.entries(SAMPLES)) { const w = cell(trow, 'Текст · ' + lang, { Theme: 'Light', Brand: 'EMCD', Platform: 'Web', 'Surface context': 'L0' }); w.resize(360, 10); w.primaryAxisSizingMode = 'FIXED'; w.counterAxisSizingMode = 'AUTO';
    const i = variants[0].createInstance(); w.appendChild(i);
    try { await loadFonts(i); if (tprops.length) i.setProperties(Object.fromEntries(tprops.map(k => [k, sample]))); else for (const t of i.findAll(x => x.type === 'TEXT')) t.characters = sample; } catch (e) { errors.push(s.name + ' ' + lang + ': ' + String(e.message || e).slice(0, 100)); } }
  rows.push({ name: 'Текст', id: trow.id });
  const zrow = al('HORIZONTAL', 16, 0); zrow.name = '200 %'; sec.appendChild(zrow);
  const zw = cell(zrow, 'Текст 200 % · все варианты', { Theme: 'Light', Brand: 'EMCD', Platform: 'Web', 'Surface context': 'L0' }); zw.resize(CELL_W * 2, 10); zw.primaryAxisSizingMode = 'FIXED'; zw.counterAxisSizingMode = 'AUTO';
  for (const v of variants) { const i = v.createInstance(); zw.appendChild(i);
    try { await loadFonts(i); for (const t of i.findAll(x => x.type === 'TEXT')) { const fs = t.fontSize, lh = t.lineHeight; if (typeof fs !== 'number') continue; if (t.boundVariables && t.boundVariables.fontSize) t.setBoundVariable('fontSize', null); if (t.boundVariables && t.boundVariables.lineHeight) t.setBoundVariable('lineHeight', null); t.fontSize = fs * 2; if (lh && lh.unit === 'PIXELS') t.lineHeight = { unit: 'PIXELS', value: lh.value * 2 }; } } catch (e) { errors.push(s.name + ' 200 %: ' + String(e.message || e).slice(0, 100)); } }
  rows.push({ name: '200 %', id: zrow.id });
  // Свойства: каждое булево свойство переключено из значения по умолчанию, все варианты.
  const prow = al('HORIZONTAL', 16, 0); prow.name = 'Свойства'; sec.appendChild(prow);
  for (const k of Object.keys(defs).filter(k => defs[k].type === 'BOOLEAN')) { const w = cell(prow, 'Свойство · ' + k.split('#')[0] + ' = ' + (defs[k].defaultValue ? 'Off' : 'On'), { Theme: 'Light', Brand: 'EMCD', Platform: 'Web', 'Surface context': 'L0' });
    for (const v of variants) { const i = v.createInstance(); w.appendChild(i); try { i.setProperties({ [k]: !defs[k].defaultValue }); } catch (e) { errors.push(s.name + ' ' + k + ': ' + String(e.message || e).slice(0, 100)); } } }
  if (prow.children.length) rows.push({ name: 'Свойства', id: prow.id }); else prow.remove();
  out.push({ set: s.name, section: sec.id, w: Math.round(sec.width), h: Math.round(sec.height), cells: sec.findAll(n => n.name === 'variants').map(w => { const c = w.parent, a = c.absoluteBoundingBox, b = sec.absoluteBoundingBox; return [c.name, Math.round(a.x - b.x), Math.round(a.y - b.y), Math.round(a.width), Math.round(a.height)]; }) }); y += sec.height + 200;
}
return { page: page.id, out, errors: [...new Set(errors)].slice(0, 20) };

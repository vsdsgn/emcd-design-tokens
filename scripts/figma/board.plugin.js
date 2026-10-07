// ⚠️ 2026-10-07: первая версия удаляла раздел «Варианты» вместе с мастером компонента (Accordion потерял ключ библиотеки).
// Правило: раздел с COMPONENT_SET не трогаем никогда. Скрипт пересобирает только «Свойства» и «Поверхности».
// Board generator for Components (run via use_figma). Set SET_ID (component set) and optional OPTS.
// Keeps the board's header (first child), "В контексте" and "Правила"; rebuilds Варианты, Свойства и зоны, Поверхности L0–L3
// using the Checkbox board (321:40) as the style reference.
const SET_ID = globalThis.SET_ID; const OPTS = globalThis.OPTS || {};
const REF = await figma.getNodeByIdAsync('321:40');
const set = await figma.getNodeByIdAsync(SET_ID);
let page = set; while (page.type !== 'PAGE') page = page.parent; await figma.setCurrentPageAsync(page);
const board = page.children.find(n => /— борда$/.test(n.name)) || page.children.find(n => n.type === 'FRAME' && n.name.includes(set.name));
const refSec = n => REF.children.find(k => k.name === n);
const titleT = refSec('Варианты').children[0], subT = refSec('Варианты').children[1];
const labelT = refSec('Свойства').children[2].children[0];
for (const t of [titleT, subT, labelT]) await figma.loadFontAsync(t.fontName);
const txt = async (tpl, s) => { const t = tpl.clone(); await figma.loadFontAsync(t.fontName); t.characters = s; return t; };
const section = async (name, title, sub) => { const f = figma.createFrame(); f.name = name; f.layoutMode = 'VERTICAL'; f.itemSpacing = 20; f.fills = []; f.clipsContent = false; f.primaryAxisSizingMode = 'AUTO'; f.counterAxisSizingMode = 'AUTO'; f.appendChild(await txt(titleT, title)); if (sub) f.appendChild(await txt(subT, sub)); return f; };
const row = (gap = 24) => { const r = figma.createFrame(); r.layoutMode = 'HORIZONTAL'; r.itemSpacing = gap; r.counterAxisAlignItems = 'CENTER'; r.fills = []; r.clipsContent = false; r.primaryAxisSizingMode = 'AUTO'; r.counterAxisSizingMode = 'AUTO'; return r; };
const col = (gap = 16) => { const r = row(gap); r.layoutMode = 'VERTICAL'; r.counterAxisAlignItems = 'MIN'; return r; };
const defs = set.componentPropertyDefinitions;
const axes = Object.entries(defs).filter(([, d]) => d.type === 'VARIANT').map(([k, d]) => [k, d.variantOptions]);
const colAxis = OPTS.colAxis || (axes.find(a => a[0] === 'State') ? 'State' : axes[axes.length - 1][0]);
const rowAxes = axes.filter(a => a[0] !== colAxis);
const parse = n => Object.fromEntries(n.split(', ').map(p => p.split('=')));
const variants = set.children.filter(c => c.type === 'COMPONENT').map(c => [c, parse(c.name)]);
const rowKey = p => rowAxes.map(([a]) => a + '=' + p[a]).join(', ');
const rowsSeen = []; for (const [, p] of variants) { const k = rowKey(p); if (!rowsSeen.includes(k)) rowsSeen.push(k); }
const colOpts = axes.find(a => a[0] === colAxis)[1];
// 1. Variants
const secV = await section('Варианты', 'Варианты', `Строки — ${rowAxes.map(a => a[0]).join(' · ') || '—'}. Колонки — ${colAxis}.`);
const grid = col(16);
const head = row(24); const sp = await txt(labelT, ''); sp.resize(220, sp.height); head.appendChild(sp);
const cellW = {};
for (const o of colOpts) { const w = Math.max(...variants.filter(([, p]) => p[colAxis] === o).map(([c]) => c.width), 80); cellW[o] = Math.min(w, 480); const h = await txt(labelT, colAxis + ' = ' + o); h.textAutoResize = 'HEIGHT'; h.resize(cellW[o], h.height); head.appendChild(h); }
grid.appendChild(head);
for (const rk of rowsSeen) { const r = row(24); r.counterAxisAlignItems = 'MIN'; const l = await txt(labelT, rk || set.name); l.textAutoResize = 'HEIGHT'; l.resize(220, l.height); r.appendChild(l);
  for (const o of colOpts) { const v = variants.find(([, p]) => rowKey(p) === rk && p[colAxis] === o); const holder = figma.createFrame(); holder.fills = []; holder.clipsContent = false; holder.layoutMode = 'VERTICAL'; holder.primaryAxisSizingMode = 'AUTO'; holder.counterAxisSizingMode = 'FIXED'; holder.resize(cellW[o], 10); if (v) holder.appendChild(v[0].createInstance()); r.appendChild(holder); }
  grid.appendChild(r); }
secV.appendChild(grid);
// 2. Properties & zones (Web / iOS)
const plat = await (async () => { const libs = await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync(); const pl = libs.find(c => c.name === 'Platform' && c.libraryName.includes('Foundations')); const v = await figma.variables.importVariableByKeyAsync((await figma.teamLibrary.getVariablesInLibraryCollectionAsync(pl.key))[0].key); return figma.variables.getVariableCollectionByIdAsync(v.variableCollectionId); })();
const secP = await section('Свойства', 'Свойства и зоны', OPTS.propsNote || 'Кольцо фокуса; зона нажатия Web 24 / касание 44 (красная), safe area (зелёная). Переключение — свойства Show hit area / Show safe area / Focus ring.');
const base = variants.find(([, p]) => Object.values(p).every(x => /^(Default|Off|M|Neutral|Left|Horizontal|Plain|Text first)$/.test(x) || true))[0];
const def = (variants.find(([, p]) => (p.State || 'Default') === 'Default') || variants[0])[0];
const pk = n => Object.keys(defs).find(k => k.startsWith(n + '#'));
for (const pm of ['Web', 'iOS']) { const r = row(48); const l = await txt(labelT, 'Platform = ' + pm); l.resize(220, l.height); r.appendChild(l);
  const mode = plat.modes.find(m => m.name === pm); r.setExplicitVariableModeForCollection(plat, mode.modeId);
  const a = def.createInstance(); r.appendChild(a);
  if (pk('Focus ring')) { const b = def.createInstance(); b.setProperties({ [pk('Focus ring')]: true }); r.appendChild(b); }
  if (pk('Show hit area')) { const c = def.createInstance(); const pr = { [pk('Show hit area')]: true }; if (pk('Show safe area')) pr[pk('Show safe area')] = true; c.setProperties(pr); r.appendChild(c); }
  secP.appendChild(r); }
// 3. Surfaces L0–L3 (clone reference panels, refill with this component)
const secS = refSec('Поверхности').clone();
const reps = []; for (const o of colOpts) { const v = variants.find(([, p]) => p[colAxis] === o && rowKey(p) === rowsSeen[0]); if (v) reps.push(v[0]); }
for (const panel of secS.children.filter(c => c.type === 'FRAME')) for (const lvl of panel.children) { for (const c of [...lvl.children].slice(1)) c.remove(); for (const v of reps.slice(0, 6)) lvl.appendChild(v.createInstance()); }
// assemble
const keep = board.children.filter((c, i) => i === 0 || /Правила|контекст/i.test(c.name) || c.findOne(n => n.type === 'COMPONENT_SET' || n.type === 'COMPONENT'));
for (const c of [...board.children]) if (!keep.includes(c)) c.remove();
const rules = keep.find(c => /Правила/.test(c.name));
const ctx = keep.find(c => /контекст/i.test(c.name));
let idx = 1; for (const s of [secV, secP, ctx, secS].filter(Boolean)) { board.insertChild(Math.min(idx, board.children.length), s); idx++; }
if (rules) board.appendChild(rules);
return { board: board.id, rows: rowsSeen.length, cols: colOpts.length };

// Таблицы Web (26.11): legacy-ячейки DS Web → DS Table cell / Table header cell один в один (место, ширина, высота прежние). ARGS: {src:<id фрейма>, dry}.
// table / label text (· coin md label text — монета остаётся отдельным слоем) → Table cell Align Start: primary — первая строка, secondary — вторая (нет — скрыта).
// table title / text → Table header cell Sortable=false; table title / sort title → Sortable=true, Sort: active=true → Descending, иначе None.
// mirror=true → Align End (числа и суммы). Старые таблицы собраны колонками (фрейм-колонка: заголовок + ячейки) — структура колонок сохраняется.
// Не трогаем: table / empty (отступ 32), table / small buttons, строки-компоненты stroke · stroke-table-email (внутри инстанса — отдельный проход).
figma.skipInvisibleInstanceChildren = false;
const K = { Cell: 'bd68682aaa5771775a39dad21617dcc9cd069804', Head: '5fc93236a03fd94a49edd22080d60f4ed83f41a5' };
const SETS = {}; async function set(k) { for (let i = 0; i < 4 && !SETS[k]; i++) { try { SETS[k] = await figma.importComponentSetByKeyAsync(K[k]); } catch (e) {} } return SETS[k]; }
const variant = (s, w) => s.children.find((c) => Object.entries(w).every(([a, b]) => c.variantProperties[a] === b));
const pk = (inst, base) => Object.keys(inst.componentProperties).find((k) => k.split('#')[0] === base);
const on = (v) => /^(true|yes|on)$/i.test(String(v || ''));
const texts = (n) => n.findAll((x) => x.type === 'TEXT' && x.visible && x.characters.trim()).sort((a, b) => a.absoluteTransform[1][2] - b.absoluteTransform[1][2] || a.absoluteTransform[0][2] - b.absoluteTransform[0][2]);
async function put(t, s) { await Promise.all(t.getStyledTextSegments(['fontName']).map((g) => figma.loadFontAsync(g.fontName))); t.characters = s; }
const KIND = { 'table / label text': 'Cell', 'table title / text': 'Head', 'table title / sort title': 'Head' };
const root = await figma.getNodeByIdAsync(ARGS.src); const st = { swapped: {}, errors: [] };
const cands = root.findAll((n) => n.type === 'INSTANCE' && KIND[n.name]).filter((i) => { let p = i.parent; while (p && p !== root) { if (p.type === 'INSTANCE') return false; p = p.parent; } return true; });
for (const inst of cands) { try {
  const mc = await inst.getMainComponentAsync(); const s = mc && mc.parent && mc.parent.type === 'COMPONENT_SET' ? mc.parent.name : mc && mc.name; const kind = KIND[s]; if (!kind) continue;
  const vp = inst.variantProperties || {}; const tx = texts(inst).map((t) => t.characters.trim()); const w = inst.width, h = inst.height, keepW = inst.layoutSizingHorizontal, keepH = inst.layoutSizingVertical;
  const align = on(vp.mirror) ? 'End' : 'Start';
  if (ARGS.dry) { st.swapped[kind] = (st.swapped[kind] || 0) + 1; continue; }
  if (kind === 'Cell') { const v = variant(await set('Cell'), { Align: align, State: 'Default' }); inst.swapComponent(v); inst.resetOverrides();
    const pr = inst.findOne((n) => n.type === 'TEXT' && n.name === 'primary'), se = inst.findOne((n) => n.type === 'TEXT' && n.name === 'secondary');
    if (pr) await put(pr, tx[0] || ''); if (se) { if (tx[1]) await put(se, tx[1]); else se.visible = false; } }
  else { const sortable = s === 'table title / sort title'; const v = variant(await set('Head'), { Align: align, Sort: sortable && on(vp.active) ? 'Descending' : 'None', State: 'Default' }); inst.swapComponent(v); inst.resetOverrides();
    const P = {}; const l = pk(inst, 'Label'), so = pk(inst, 'Sortable'); if (l) P[l] = tx[0] || ''; if (so) P[so] = sortable; inst.setProperties(P); }
  try { inst.resize(w, h); } catch (e) {} if (keepW === 'FILL') { try { inst.layoutSizingHorizontal = 'FILL'; } catch (e) {} } if (keepH === 'FILL') { try { inst.layoutSizingVertical = 'FILL'; } catch (e) {} }
  st.swapped[kind] = (st.swapped[kind] || 0) + 1;
} catch (e) { st.errors.push(String(e).slice(0, 100)); } }
st.errors = st.errors.slice(0, 6); return st;

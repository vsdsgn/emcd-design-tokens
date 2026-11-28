// Возврат текстов Select после обновления Components (28.11). См. docs/LESSONS.md#l-036, #l-023.
// 27.11 Select пересобран на экспонированном `_Field base` (Field): свои свойства Select (Label, Value, Helper,
// Show label, Show leading, Leading) удалены — после принятия обновления экземпляры на экранах теряют тексты.
// До обновления снимок записан в текстовый слой «⚑ data · select-texts» на странице скриптов (36:6983):
// { <id экземпляра>: { Label, Value, Helper, Show label, Show leading, Size, Label position, State, _lead: <key монеты / иконки> } }.
// ARGS: { page: '<id страницы>' | undefined (все), dry: true|false }. Ставит значения во вложенный Field; Leading — в слот Field.
figma.skipInvisibleInstanceChildren = false;
const sp = await figma.getNodeByIdAsync('36:6983'); await sp.loadAsync();
const DATA = JSON.parse(sp.children.find((n) => n.name === '⚑ data · select-texts').characters);
const pk = (i, b) => Object.keys(i.componentProperties).find((k) => k.split('#')[0] === b);
const st = { done: 0, missing: 0, old: 0, errors: [] };
for (const [id, pr] of Object.entries(DATA)) {
  const i = await figma.getNodeByIdAsync(id); if (!i || i.removed) { st.missing++; continue; }
  if (ARGS.page) { let p = i; while (p && p.type !== 'PAGE') p = p.parent; if (!p || p.id !== ARGS.page) continue; }
  const f = i.findOne((n) => n.type === 'INSTANCE' && n.name === 'Field'); if (!f) { st.old++; continue; }
  if (ARGS.dry) { st.done++; continue; }
  try {
    const P = {}; const put = (b, v) => { const k = pk(f, b); if (k !== undefined && v !== undefined) P[k] = v; };
    put('Label', pr.Label); put('Value', pr.Value); put('Helper', pr.Helper); put('Show label', pr['Show label']); put('Show leading', !!pr['Show leading']);
    f.setProperties(P);
    if (pr['Show leading'] && pr._lead) { const slot = f.findOne((n) => n.type === 'SLOT' && n.name === 'Leading'); if (slot) { const c = await figma.importComponentByKeyAsync(pr._lead); for (const ch of [...slot.children]) ch.remove(); slot.appendChild(c.createInstance()); } }
    st.done++;
  } catch (e) { st.errors.push(id + ': ' + String(e).slice(0, 100)); }
}
st.errors = st.errors.slice(0, 6); return st;

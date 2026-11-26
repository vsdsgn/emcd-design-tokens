// Визуальные примеры для «Компоненты prod → DS 2.0» (26.11): ячейки «vis · <spec>» → инстанс / клон, вписан в 224×160, тёмная подложка, Theme = Dark. ARGS: {n: сколько ячеек за вызов (8)}.
// spec: s:<ключ набора> (вариант по умолчанию) · c:<ключ компонента> · n:<id узла в общем файле> (клон живого legacy-примера). Готовые ячейки переименовываются в «vis ✓».
const page = figma.root.children.find((p) => p.name === '⚑ Таблицы миграции'); await figma.setCurrentPageAsync(page);
const tb = page.children.find((n) => n.name === 'Компоненты prod → DS 2.0');
const todo = tb.findAll((n) => n.type === 'FRAME' && n.name.startsWith('vis · ')).slice(0, (typeof ARGS !== 'undefined' && ARGS.n) || 8);
const G = (v) => [{ type: 'SOLID', color: { r: v, g: v, b: v } }];
const vs = await figma.teamLibrary.getVariablesInLibraryCollectionAsync('663c113f032f46cf39f7641bd6a67133805a2142'); const v0 = await figma.variables.importVariableByKeyAsync(vs[0].key);
const col = await figma.variables.getVariableCollectionByIdAsync(v0.variableCollectionId); const DARK = col.modes.find((m) => m.name === 'Dark').modeId;
const LIB = {}; const st = { done: 0, miss: [] };
for (const c of todo) { const v = c.name.slice(6); let n = null;
  try { if (v.startsWith('n:')) { const src = await figma.getNodeByIdAsync(v.slice(2)); if (src) n = src.clone(); }
    else { if (!(v in LIB)) { try { LIB[v] = v[0] === 's' ? (await figma.importComponentSetByKeyAsync(v.slice(2))).defaultVariant : await figma.importComponentByKeyAsync(v.slice(2)); } catch (e) { try { LIB[v] = await figma.importComponentByKeyAsync(v.slice(2)); } catch (e2) { LIB[v] = null; } } }
      if (LIB[v]) n = LIB[v].createInstance(); } } catch (e) { n = null; }
  for (const k of [...c.children]) k.remove();
  c.setExplicitVariableModeForCollection(col, DARK);
  if (n) { c.appendChild(n); const f = Math.min(1, 224 / n.width, 160 / n.height); if (f < 1) n.rescale(f); st.done++; }
  else { const t = figma.createText(); t.characters = 'нет примера'; t.fontSize = 12; t.fills = G(0.55); c.appendChild(t); st.miss.push(v); }
  c.name = 'vis ✓'; }
st.left = tb.findAll((n) => n.type === 'FRAME' && n.name.startsWith('vis · ')).length; return st;

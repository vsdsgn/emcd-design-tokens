// Визуальные примеры для «Компоненты prod → DS 2.0» (26.11): ячейки «vis · <spec>» → инстанс / клон, 1:1 (без rescale — дробные размеры недопустимы; узкая ячейка расширяется проходом ширины), hit area · web скрыт, тёмная подложка, Theme = Dark. ARGS: {n: сколько ячеек за вызов (8)}.
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
  if (n) { c.appendChild(n); for (const h of n.findAll ? n.findAll((x) => x.name === 'hit area · web') : []) { try { if (h.boundVariables && h.boundVariables.visible) h.setBoundVariable('visible', null); h.visible = false; } catch (e) {} } st.done++; }
  else { const t = figma.createText(); t.characters = 'нет примера'; t.fontSize = 12; t.fills = G(0.55); c.appendChild(t); st.miss.push(v); }
  c.name = 'vis ✓'; }
st.left = tb.findAll((n) => n.type === 'FRAME' && n.name.startsWith('vis · ')).length; return st;
// 26.11: проход ширины (ARGS.widths=true): колонки «Было» / «Стало» = max(240, самый широкий пример + 16), целые px, у заголовка и всех строк одинаково.

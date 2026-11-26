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
// 26.11 (по комментариям Стефана «сравнивать стейты корректно»): «Стало» подогнано под состояние «Было» отдельным вызовом —
//   01 Primary L + левая иконка · 02 Text · 04 Accent Subtle L · 05 Number · 06 без подписи · 07 Selected Off + бейдж · 08 / 09 голый контрол без подписи
//   10 / 11 невыбранные, подписи как в legacy · 14 → Select Open «Выбрано» (было Input) · 17 подпись Bitcoin · 19 L · 2 · 20 L закрыт · 25 On Hover
//   26 → Segmented M · 2 (Switch — это сегменты) · 27 Text 25% · 32 Snack Success · 41 App Root. Дробные размеры примеров округлены до целых.

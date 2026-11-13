// Привязка min / max к токенам size/*, заведённым 13.11 (дополнение к bind-sizes.plugin.js: высоты и вложенные слои).
// Запуск: Figma MCP use_figma в файле Components ПОСЛЕ Publish Foundations. Повторный запуск безопасен:
// привязывается только свойство, которое стоит числом и равно значению токена. Наборы «… · пилот» идут вместе с действующими.
// Правило R: набор → [слой ('ROOT' — корень варианта, иначе имя вложенного слоя), свойство, токен, значение].
figma.skipInvisibleInstanceChildren = false;
const cols = await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync();
const V = {};
for (const c of cols.filter(c => c.name === 'Platform'))
  for (const v of await figma.teamLibrary.getVariablesInLibraryCollectionAsync(c.key))
    if (/^size\//.test(v.name)) V[v.name] = await figma.variables.importVariableByKeyAsync(v.key);
const R = {
  'Counter': [['ROOT', 'maxWidth', 'size/counter/max', 40]],
  'Tab': [['counter', 'maxWidth', 'size/counter/max', 40]], 'Nav item': [['counter', 'maxWidth', 'size/counter/max', 40]], // экземпляры Counter: max стоял переопределением
  'Tooltip': [['ROOT', 'minWidth', 'size/tooltip/min', 58], ['ROOT', 'minHeight', 'size/tooltip/min', 58]],
  'Tooltip tour': [['ROOT', 'minWidth', 'size/tooltip/min', 58]],
  'Icon button': [['tooltip', 'minWidth', 'size/tooltip/min', 58]],
  'Toast': [['ROOT', 'minWidth', 'size/toast/min', 280]],
  'Dropdown panel': [['list', 'maxHeight', 'size/dropdown-panel/max-height', 320]],
  '_List row': [['ROOT', 'minHeight', 'size/row/min', 40], ['content', 'minWidth', 'size/row/content-min', 120]],
  '_Field base': [['field', 'minHeight', 'size/field/multi-min', 96]],
  // Пакет 13.11 (второй): корневые min / max, стоявшие числом при существующем токене.
  'Checkbox group': [['ROOT', 'maxWidth', 'size/field/max', 480]], 'Radio group': [['ROOT', 'maxWidth', 'size/field/max', 480]], 'Toggle group': [['ROOT', 'maxWidth', 'size/field/max', 480]],
  'Date range field': [['ROOT', 'maxWidth', 'size/field/max', 480], ['ROOT', 'minWidth', 'size/field/min', 120]],
  'Input amount': [['ROOT', 'maxWidth', 'size/field/max', 480], ['ROOT', 'minWidth', 'size/field/min', 120]],
  'Password field': [['ROOT', 'maxWidth', 'size/field/max', 480], ['ROOT', 'minWidth', 'size/field/min', 120]],
  'Select': [['ROOT', 'maxWidth', 'size/field/max', 480], ['ROOT', 'minWidth', 'size/field/min', 120]],
  'Notification': [['ROOT', 'maxWidth', 'size/toast/max', 480], ['ROOT', 'minWidth', 'size/toast/min', 280]],
  'Snack': [['ROOT', 'maxWidth', 'size/toast/max', 480], ['ROOT', 'minWidth', 'size/toast/min', 280]],
  'Stat card': [['ROOT', 'minWidth', 'size/card/min', 280]],
  'Menu': [['ROOT', 'minWidth', 'size/menu/min', 160], ['ROOT', 'maxWidth', 'size/menu/max', 320]],
  'Sheet': [['ROOT', 'maxWidth', 'size/sheet/max', 480]],
  // Токены заведены 13.11 (второй пакет) и ждут Publish Foundations; до него скрипт остановится на проверке missing.
  'Code input': [['ROOT', 'maxWidth', 'size/code-input/max', 400]],
  'Select compact': [['ROOT', 'maxWidth', 'size/select-compact/max', 200]],
  'Legend item': [['ROOT', 'maxWidth', 'size/legend-item/max', 160]],
  'Step': [['ROOT', 'maxWidth', 'size/step/max', 160]],
  'Chart metric': [['ROOT', 'maxWidth', 'size/chart-metric/max', 240]],
  'Chart tooltip': [['ROOT', 'minWidth', 'size/chart-tooltip/min', 168]],
  'Chart axis label': [['ROOT', 'maxWidth', 'size/chart-axis-label/max', 64]],
  'Page header': [['text', 'minWidth', 'size/page-header/text-min', 200]],
  // size/selection/label-max (436) у label / description в _Selection control не привязывается: Plugin API не даёт maxWidth текстового слоя
  // («invalid field for text node»). Значение сверяет аудит числом; привязка — когда подпись получит фрейм-обёртку (OPEN-QUESTIONS).
};
const missing = [...new Set(Object.values(R).flat().map(r => r[2]))].filter(n => !V[n]);
if (missing.length) return { error: 'в библиотеке нет переменных (Publish Foundations и принять обновление в Components)', missing };
const out = {}; const ids = []; const skipped = [];
const pages = figma.root.children.filter(p => /^[🟠🟡🟢🔴]/u.test(p.name) || /^_/.test(p.name)); // страницы компонентов и служебных баз — по имени, не по индексу
for (const pg of pages) {
  await pg.loadAsync();
  for (const s of pg.findAll(n => n.type === 'COMPONENT_SET' && n.name.replace(/ · пилот$/, '') in R)) {
    for (const [layer, prop, token, value] of R[s.name.replace(/ · пилот$/, '')]) {
      for (const v of s.children) {
        const nodes = [];
        if (layer === 'ROOT') nodes.push(v);
        else { const stack = [...v.children]; while (stack.length) { const n = stack.pop(); if (n.name === layer) nodes.push(n); if (n.type !== 'INSTANCE' && n.children) stack.push(...n.children); } }
        for (const n of nodes) {
          if (n[prop] !== value || (n.boundVariables && n.boundVariables[prop])) continue;
          if (n.type === 'TEXT') { skipped.push(s.name + ' | ' + layer); continue; }
          n.setBoundVariable(prop, V[token]);
          const k = s.name + ' | ' + layer + ' | ' + prop + ' → ' + token; out[k] = (out[k] || 0) + 1; ids.push(n.id);
        }
      }
    }
  }
}
return { bound: out, count: ids.length, skipped: [...new Set(skipped)], mutatedNodeIds: ids.slice(0, 40) };

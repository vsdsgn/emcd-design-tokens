// Привязка «сырых» чисел в мастерах к существующим переменным (то, что находит variables-check.plugin.js и для чего токен уже есть).
// Запуск: Figma MCP use_figma в файле Components. Повторный запуск безопасен: привязывается только свойство, которое стоит числом.
// Правила: зазор и отступ N → space/N (если такая переменная есть); толщина обводки 1 → border/width/default, 1.5 → icon/stroke/regular,
// 2 → border/width/strong (линии Chart plot → chart/stroke); точечные правила — в карте R (набор → [слой, свойство, токен, значение]).
// Не трогает: экземпляры (правится главный компонент), отрицательные зазоры (нахлёст, реестр исключений), заглушку `content` у Card,
// min / max текстовых слоёв (Plugin API не привязывает).
figma.skipInvisibleInstanceChildren = false;
const cols = await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync();
const V = {};
for (const c of cols.filter(c => c.name === 'Platform'))
  for (const v of await figma.teamLibrary.getVariablesInLibraryCollectionAsync(c.key))
    if (/^(space\/\d+|border\/width\/(default|strong)|icon\/stroke\/regular|chart\/stroke|control\/height\/(sm|md)|radius\/control|size\/row\/content-min)$/.test(v.name)) V[v.name] = await figma.variables.importVariableByKeyAsync(v.key);
const R = {
  'Pagination item': [['ROOT', 'minWidth', 'control/height/sm', 32], ['ROOT', 'minWidth', 'control/height/md', 40]], // минимальная ширина = высота контрола
  'Tab bar item': [['state layer', 'cornerRadius', 'radius/control', 12]],
  'Transaction': [['content', 'minWidth', 'size/row/content-min', 120]],
};
const SW = { 1: 'border/width/default', 1.5: 'icon/stroke/regular', 2: 'border/width/strong' };
const out = {}; const ids = []; const errors = [];
const hit = (k, n) => { out[k] = (out[k] || 0) + 1; ids.push(n.id); };
const walk = (n, fn) => { if (n.type === 'INSTANCE') return; fn(n); if (n.children) for (const c of n.children) walk(c, fn); };
for (const pg of figma.root.children) {
  if (!/^[🟠🟡🟢🔴]/u.test(pg.name) && !/^_/.test(pg.name)) continue;
  await pg.loadAsync();
  for (const s of pg.findAll(n => n.type === 'COMPONENT_SET' || (n.type === 'COMPONENT' && n.parent.type !== 'COMPONENT_SET'))) {
    const rules = R[s.name.replace(/ · пилот$/, '')] || [];
    for (const v of (s.type === 'COMPONENT_SET' ? s.children : [s])) walk(v, n => {
      if (s.name === 'Card' && n.name === 'content') return;
      const b = n.boundVariables || {};
      try {
        if (n.layoutMode && n.layoutMode !== 'NONE') for (const k of ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'itemSpacing'])
          if (n[k] > 0 && !b[k] && V['space/' + n[k]]) { n.setBoundVariable(k, V['space/' + n[k]]); hit(s.name + ' | ' + k + ' → space/' + n[k], n); }
        if (n.strokes && n.strokes.length && typeof n.strokeWeight === 'number' && n.strokeWeight && !b.strokeTopWeight && !b.strokeWeight) {
          const t = s.name === 'Chart plot' && n.strokeWeight === 2 ? 'chart/stroke' : SW[n.strokeWeight];
          if (t && V[t]) { n.setBoundVariable('strokeWeight', V[t]); hit(s.name + ' | strokeWeight → ' + t, n); }
        }
        for (const [layer, prop, token, value] of rules) {
          if (!(layer === 'ROOT' ? n === v : n.name === layer) || n.type === 'TEXT') continue;
          if (prop === 'cornerRadius') { if (n.cornerRadius === value && !b.topLeftRadius) { for (const k of ['topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius']) n.setBoundVariable(k, V[token]); hit(s.name + ' | ' + layer + ' radius → ' + token, n); } }
          else if (n[prop] === value && !b[prop]) { n.setBoundVariable(prop, V[token]); hit(s.name + ' | ' + layer + ' ' + prop + ' → ' + token, n); }
        }
      } catch (e) { errors.push(s.name + ' / ' + n.name + ': ' + String(e.message || e).slice(0, 80)); }
    });
  }
}
return { bound: out, count: ids.length, errors: [...new Set(errors)].slice(0, 20), mutatedNodeIds: ids.slice(0, 40) };

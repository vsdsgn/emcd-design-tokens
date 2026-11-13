// Привязка фиксированных width / height мастеров к переменным Platform (control/height/*, icon/size/*, size/*).
// Запуск: Figma MCP use_figma в файле Components. Повторный запуск безопасен: привязывается только размер, который стоит числом,
// равен значению правила и задан как FIXED. Правила с токенами, которых ещё нет в библиотеке (ждут Publish Foundations),
// пропускаются и возвращаются в missing — после Publish запустить ещё раз.
// Правило R: набор (имя или префикс со «*») → [слой ('ROOT' — корень варианта, иначе имя слоя), 'width' | 'height' | 'both', токен, значение].
figma.skipInvisibleInstanceChildren = false;
const cols = await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync();
const KEYS = {};
for (const c of cols.filter(c => c.name === 'Platform'))
  for (const v of await figma.teamLibrary.getVariablesInLibraryCollectionAsync(c.key))
    if (/^(size\/|icon\/size\/|control\/height\/)/.test(v.name)) KEYS[v.name] = v.key;
const media = (layer, pairs) => pairs.map(([t, n]) => [layer, 'both', 'size/media/' + t, n]);
const R = {
  // Токены есть в библиотеке
  'Pagination item': [['ROOT', 'height', 'control/height/sm', 32], ['ROOT', 'height', 'control/height/md', 40]],
  'Floating button': [['ROOT', 'both', 'control/height/xl', 56]],
  'Date cell': [['ROOT', 'both', 'control/height/md', 40]],
  'Input addon / Clear': [['ROOT', 'both', 'icon/size/control', 20], ['circle', 'both', 'icon/size/control', 20]],
  'Page dot': [['ROOT', 'both', 'size/dot/sm', 6]],
  'Spinner': [['ROOT', 'both', 'icon/size/sm', 16], ['ROOT', 'both', 'icon/size/md', 20], ['ROOT', 'both', 'icon/size/lg', 24], ['track', 'both', 'icon/size/sm', 16], ['track', 'both', 'icon/size/md', 20], ['track', 'both', 'icon/size/lg', 24]],
  'Circle timer': [['ROOT', 'both', 'icon/size/sm', 16], ['ROOT', 'both', 'icon/size/lg', 24], ['track', 'both', 'icon/size/sm', 16], ['track', 'both', 'icon/size/lg', 24]],
  // Токены заведены 13.11 (вторая пачка size/*) и ждут Publish Foundations
  'Avatar': [...media('ROOT', [['xs', 20], ['md', 32], ['lg', 40], ['xl', 56]]), ...media('circle', [['xs', 20], ['md', 32], ['lg', 40], ['xl', 56]])],
  'Coin': media('ROOT', [['2xs', 16], ['xs', 20], ['sm', 24], ['md', 32], ['lg', 40]]),
  'Step symbol': media('ROOT', [['sm', 24]]),
  'Step trail': [['ROOT', 'height', 'size/media/sm', 24]],
  'Transaction': [['ROOT', 'height', 'size/row/lg', 64], ['icon', 'both', 'size/media/lg', 40]],
  'Progress': [['track', 'height', 'size/track/sm', 4], ['track', 'height', 'size/track/md', 8], ['fill', 'height', 'size/track/sm', 4], ['fill', 'height', 'size/track/md', 8]],
  'Step segment': [['ROOT', 'height', 'size/track/sm', 4]],
  'Step progress': [['ROOT', 'height', 'size/track/sm', 4]],
  'Scrollbar': [['ROOT', 'both', 'size/scrollbar', 12], ['thumb', 'both', 'size/track/sm', 4], ['thumb', 'both', 'size/track/md', 8]],
  'Progress circle': ['ROOT', 'track', 'fill'].flatMap(l => [[l, 'both', 'size/progress-circle/sm', 24], [l, 'both', 'size/progress-circle/md', 48], [l, 'both', 'size/progress-circle/lg', 72]]),
  'Legend swatch': [['ROOT', 'both', 'size/legend-swatch', 12]],
  'Code cell': [['ROOT', 'height', 'size/code-cell/md', 56], ['ROOT', 'height', 'size/code-cell/lg', 68]],
  'Nav item': [['ROOT', 'both', 'size/row/compact', 36]],
  'Select compact': [['ROOT', 'height', 'size/row/compact', 36]],
  'Table header cell': [['ROOT', 'height', 'size/table/header', 44]],
  'Table cell / *': [['ROOT', 'height', 'size/table/row-lg', 80]],
  'Table row': [['ROOT', 'height', 'size/table/row-sm', 48], ['ROOT', 'height', 'size/table/row-lg', 80]],
};
const rulesFor = name => { const n = name.replace(/ · пилот$/, ''); if (R[n]) return R[n]; for (const k in R) if (k.endsWith('*') && n.startsWith(k.slice(0, -1))) return R[k]; return null; };
const V = {}; const missing = new Set();
for (const t of new Set(Object.values(R).flat().map(r => r[2]))) { if (KEYS[t]) V[t] = await figma.variables.importVariableByKeyAsync(KEYS[t]); else missing.add(t); }
const out = {}; const ids = []; const errors = [];
const fixed = (n, k) => (k === 'width' ? n.layoutSizingHorizontal : n.layoutSizingVertical) === 'FIXED' || !('layoutSizingHorizontal' in n);
for (const pg of figma.root.children.filter(p => /^[🟠🟡🟢🔴]/u.test(p.name) || /^_/.test(p.name))) {
  await pg.loadAsync();
  for (const s of pg.findAll(n => (n.type === 'COMPONENT_SET' || (n.type === 'COMPONENT' && n.parent.type !== 'COMPONENT_SET')) && rulesFor(n.name))) {
    for (const v of (s.type === 'COMPONENT_SET' ? s.children : [s])) {
      for (const [layer, prop, token, value] of rulesFor(s.name)) {
        if (!V[token]) continue;
        const nodes = [];
        if (layer === 'ROOT') nodes.push(v);
        else { const stack = [...v.children]; while (stack.length) { const n = stack.pop(); if (n.name === layer) nodes.push(n); if (n.type !== 'INSTANCE' && n.children) stack.push(...n.children); } }
        for (const n of nodes) for (const k of (prop === 'both' ? ['width', 'height'] : [prop])) {
          if (n[k] !== value || (n.boundVariables && n.boundVariables[k]) || !fixed(n, k)) continue;
          try { n.setBoundVariable(k, V[token]); const key = s.name + ' | ' + layer + ' ' + k + ' → ' + token; out[key] = (out[key] || 0) + 1; ids.push(n.id); }
          catch (e) { errors.push(s.name + ' / ' + n.name + ' ' + k + ': ' + String(e.message || e).slice(0, 80)); }
        }
      }
    }
  }
}
return { bound: out, count: ids.length, missing: [...missing], errors: [...new Set(errors)].slice(0, 20), mutatedNodeIds: ids.slice(0, 40) };

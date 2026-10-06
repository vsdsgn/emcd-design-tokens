// Run in Components via use_figma AFTER Foundations (with size/* tokens) is published
// and Components has accepted the library update. Binds minWidth/maxWidth to size/* tokens.
const cols = await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync();
const V = {};
for (const c of cols.filter(c => c.name === 'Platform'))
  for (const v of await figma.teamLibrary.getVariablesInLibraryCollectionAsync(c.key))
    if (/^size\/|^layout\/min-viewport/.test(v.name)) V[v.name] = await figma.variables.importVariableByKeyAsync(v.key);
const R = {
  'Button': { min: 'size/button/min', skip: n => /Type=Text,/.test(n) },
  'Input': { min: 'size/field/min' }, 'Select': { min: 'size/field/min' }, 'Textarea': { min: 'size/field/min' },
  'Input amount': { min: 'size/field/min' }, 'Password field': { min: 'size/field/min' }, 'Multiselect': { min: 'size/field/min' },
  'Menu': { min: 'size/menu/min', max: 'size/menu/max' }, 'Tooltip': { max: 'size/tooltip/max' },
  'Toast': { max: 'size/toast/max' }, 'Sheet': { max: 'size/sheet/max' }, 'Notification': { max: 'size/toast/max' },
  'Alert': { min: 'size/card/min' }, 'Banner': { min: 'size/card/min' }, 'Stat card': { min: 'size/card/min' },
  'Chip': { max: 'size/chip/max' }, 'Badge': { max: 'size/badge/max' }, 'Table header cell': { min: 'size/table-cell/min' },
};
const out = {};
for (const pg of figma.root.children) {
  await figma.setCurrentPageAsync(pg);
  for (const s of pg.findAll(n => n.type === 'COMPONENT_SET' && (n.name in R || /^Table cell \//.test(n.name)))) {
    const r = R[s.name] || { min: 'size/table-cell/min' }; let k = 0;
    for (const v of s.children) {
      if (r.skip && r.skip(v.name)) continue;
      if (r.min && V[r.min]) v.setBoundVariable('minWidth', V[r.min]);
      if (r.max && V[r.max]) v.setBoundVariable('maxWidth', V[r.max]);
      k++;
    }
    out[s.name] = k;
  }
}
return out;

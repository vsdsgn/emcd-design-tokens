// Манифест баз и служебных слоёв (read-only): токены наборов на страницах _Field base, _Selection control, _Service layers, _List row, _Overlay surface.
// Нужен parity: после замены наборов на месте токены живут в базе и глифах, а не в надстройке.
// Запуск: Figma MCP use_figma в файле Components. Ответ сохранить как <папка сырья>/bases.json (первую строку с длиной убрать),
// затем node scripts/manifest-build.mjs <папка сырья>. Новую базу — добавить её страницу в PAGES. Наборы «… · пилот» пропускаются.
figma.skipInvisibleInstanceChildren = false;
const PAGES = /^\P{L}*(_Field base|_Selection control|_Service layers|_List row|_Overlay surface)$/u;
const cache = {}; const vn = async id => { if (!(id in cache)) { const v = await figma.variables.getVariableByIdAsync(id); cache[id] = v ? v.name : '?'; } return cache[id]; };
const walk = (n, inst, fn) => { if (n.type === 'INSTANCE' && inst) { fn(n); return; } fn(n); if (n.children) for (const c of n.children) walk(c, true, fn); };
const out = [];
for (const pg of figma.root.children.filter(p => PAGES.test(p.name))) {
  await pg.loadAsync(); const P = { page: pg.name, id: pg.id, sets: [] };
  for (const s of pg.findAll(n => (n.type === 'COMPONENT_SET' || (n.type === 'COMPONENT' && n.parent.type !== 'COMPONENT_SET')) && !/· пилот$/.test(n.name))) {
    const vars = s.type === 'COMPONENT_SET' ? s.children : [s]; const tk = new Set(); const nested = {};
    for (const v of vars) {
      const nodes = []; walk(v, false, n => nodes.push(n));
      for (const n of nodes) {
        const b = n.boundVariables || {};
        for (const val of Object.values(b)) for (const a of (Array.isArray(val) ? val : [val])) if (a && a.id) tk.add(await vn(a.id));
        for (const kk of ['fills', 'strokes']) if (Array.isArray(n[kk])) for (const p of n[kk]) if (p.boundVariables && p.boundVariables.color) tk.add(await vn(p.boundVariables.color.id));
        if (n.type === 'INSTANCE' && n !== v) { const m = await n.getMainComponentAsync(); const nm = m ? (m.parent && m.parent.type === 'COMPONENT_SET' ? m.parent.name : m.name) : '?'; if (!/^(icon|ic)\//i.test(nm)) nested[nm] = 1; }
      }
    }
    const axes = {}; if (s.type === 'COMPONENT_SET') for (const [k, d] of Object.entries(s.componentPropertyDefinitions)) if (d.type === 'VARIANT') axes[k] = d.variantOptions;
    P.sets.push({ name: s.name, id: s.id, status: ((s.description || '').match(/^Status:\s*(\w+)/) || [, null])[1], variants: vars.length, axes, nested: Object.keys(nested).sort(), tokens: [...tk].sort() });
  }
  out.push(P);
}
const json = JSON.stringify(out); return json.length + '\n' + json;

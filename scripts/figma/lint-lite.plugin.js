// Проверки в духе FigmaLint по всем компонентам сразу (28.11; FigmaLint анализирует по одному выделению).
// Только чтение. Ловит: нет «Когда использовать» / «Когда нет» в описании (FigmaLint: Usage guidance),
// короткое описание (< 200), безымянные слои (Frame 12, Rectangle…), заливки и обводки без переменной.
// Служебные (_*), deprecated и страницы 🗄 🧪 🔍 ⚑ 📖 📋 📐 пропускает. Слои внутри экземпляров не судит.
const SKIP = /^(🗄|🧪|🔍|⚑|📖|📋|📐|---|━━)/u;
const DEF = /^(Frame|Group|Rectangle|Ellipse|Vector|Line|Union|Subtract|Polygon|Text|Instance|Component)( \d+)?$/;
const res = { noUsage: [], noWhenNot: [], shortDesc: [], defaultNames: {}, rawColor: {} };
for (const p of figma.root.children) {
  if (SKIP.test(p.name)) continue; await p.loadAsync();
  for (const c of p.findAllWithCriteria({ types: ['COMPONENT_SET', 'COMPONENT'] })) {
    if (c.type === 'COMPONENT' && c.parent.type === 'COMPONENT_SET') continue;
    const skipDesc = /^_|deprecated/.test(c.name); const d = c.description || '';
    if (!skipDesc && !/Когда использовать/i.test(d)) res.noUsage.push(c.name);
    if (!skipDesc && !/Когда нет/i.test(d)) res.noWhenNot.push(c.name);
    if (!skipDesc && d.length < 200) res.shortDesc.push(`${c.name} (${d.length})`);
    const own = (n) => { let q = n.parent; while (q && q !== c) { if (q.type === 'INSTANCE') return false; q = q.parent; } return true; };
    let dn = 0, rc = 0;
    for (const n of c.findAll(own)) {
      if (DEF.test(n.name)) dn++;
      for (const f of ['fills', 'strokes']) { if (!(f in n) || !Array.isArray(n[f])) continue; for (const pt of n[f]) if (pt.type === 'SOLID' && pt.visible !== false && !(pt.boundVariables && pt.boundVariables.color)) rc++; }
    }
    if (dn) res.defaultNames[c.name] = dn; if (rc) res.rawColor[c.name] = rc;
  }
}
return res;

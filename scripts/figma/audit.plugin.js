// Components audit (run via use_figma, все страницы компонентов). Reports per component:
// raw text (no text style), raw paints, raw spacing, raw radius, focus ring problems,
// and state-logic deviations (Hover/Pressed layer tokens, legacy hover tokens, Disabled text != text/disabled).
// Rules it checks are in docs/components.md («Модель состояний») and docs/HOW-IT-WORKS.md.
// Focus ring (решение 2026-11-09/12): рамка +2 px от цели, OUTSIDE border/width/focus-ring, радиус radius/focus-ring*;
// подробная проверка кольца — RING в audit-parity.plugin.js.
// PAGES: пусто — страницы компонентов по индексу (2..58), наборы с «_» пропускаются; id страниц — только они, включая служебные «_» базы.
const PAGES = [];
figma.skipInvisibleInstanceChildren = false;
const cache = {}; const vn = async id => { if (!(id in cache)) { const v = await figma.variables.getVariableByIdAsync(id); cache[id] = v ? v.name : '?'; } return cache[id]; };
const walk = (n, inst, fn) => { if (n.type === 'INSTANCE' && inst) { if (n.name === 'focus ring' || n.name === 'state layer') fn(n); return; } fn(n); if (n.children) for (const c of n.children) walk(c, true, fn); };
const rep = {};
const pages = PAGES.length ? figma.root.children.filter(p => PAGES.includes(p.id)) : figma.root.children.slice(2, 59);
for (const pg of pages) {
  await figma.setCurrentPageAsync(pg);
  for (const s of pg.findAll(n => (n.type === 'COMPONENT_SET' || (n.type === 'COMPONENT' && n.parent.type !== 'COMPONENT_SET')) && (PAGES.length || !n.name.startsWith('_')))) {
    const issues = new Set();
    walk(s, false, n => {
      if (n.type === 'COMPONENT_SET' || /hit area|safe area|overlay/.test(n.name)) return;
      if (n.type === 'TEXT' && !n.textStyleId) issues.add('raw text: ' + n.name);
      for (const kk of ['fills', 'strokes']) if (Array.isArray(n[kk])) for (const p of n[kk]) if (p.visible !== false && p.type === 'SOLID' && !(p.boundVariables && p.boundVariables.color)) issues.add('raw paint: ' + n.name);
      if (n.layoutMode && n.layoutMode !== 'NONE') for (const k of ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'itemSpacing']) if (n[k] && !(n.boundVariables && n.boundVariables[k]) && !(k === 'itemSpacing' && n.primaryAxisAlignItems === 'SPACE_BETWEEN')) issues.add('raw ' + k + '=' + n[k]);
      if (n.name !== 'focus ring' && typeof n.cornerRadius === 'number' && n.cornerRadius > 0 && !(n.boundVariables && n.boundVariables.topLeftRadius)) issues.add('raw radius ' + n.cornerRadius);
      if (n.name === 'focus ring') { const b = n.boundVariables || {}; if (n.strokeAlign !== 'OUTSIDE' || !b.strokes || !b.strokeTopWeight || !b.topLeftRadius) issues.add('ring bindings'); }
    });
    for (const v of s.children || []) {
      const st = (v.name.match(/State=(\w+)/) || [])[1]; if (!st) continue; const nodes = []; walk(v, false, n => nodes.push(n));
      const layers = nodes.filter(n => n.name === 'state layer' && n.visible);
      if (st === 'Hover' || st === 'Pressed') for (const L of layers) { const o = L.boundVariables && L.boundVariables.opacity; const on = o ? await vn(o.id) : 'raw'; if (on !== (st === 'Hover' ? 'state/hover' : 'state/pressed')) issues.add(st + ' layer opacity ' + on); }
      if (st === 'Disabled') for (const t of nodes.filter(n => n.type === 'TEXT' && n.visible)) { const b = t.fills[0] && t.fills[0].boundVariables && t.fills[0].boundVariables.color; const nm = b ? await vn(b.id) : 'raw'; if (nm !== 'text/disabled') issues.add('Disabled text ' + nm); }
    }
    if (issues.size) rep[s.name] = [...issues].slice(0, 6);
  }
}
return rep;

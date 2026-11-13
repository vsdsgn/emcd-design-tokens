// «Всё на переменных, кроме реестра» (run via use_figma on Components, read-only).
// Walks component sets / components of the pages in [FROM, TO) (index in figma.root.children) and reports every value that is
// not bound to a variable: fill / stroke colour, stroke weight, padding / gap, radius, min / max width / height, font size / line height (no text style).
// A finding is an exception only when it is listed in docs/exceptions.md (value, where, reason, review date); everything else is a defect.
// Output: { "<component>": ["fill #hex @layer", "radius 1 @layer", ...] }  (instances are skipped: their masters are checked).
const FROM = 0, TO = 20; // окно по списку страниц компонентов (эмодзи статуса в имени), а не по индексу в файле
const PAGES = []; // id страниц: если задано, FROM / TO и фильтр по эмодзи не действуют (служебные страницы баз «_…»)
figma.skipInvisibleInstanceChildren = true;
const rep = {};
const walk = (n, fn) => { if (n.type === 'INSTANCE') return; fn(n); if (n.children) for (const c of n.children) walk(c, fn); };
const hex = (c) => '#' + [c.r, c.g, c.b].map((x) => Math.round(x * 255).toString(16).padStart(2, '0')).join('');
for (const pg of PAGES.length ? figma.root.children.filter((p) => PAGES.includes(p.id)) : figma.root.children.filter((p) => /^[🟠🟡🟢🔴]/u.test(p.name)).slice(FROM, TO)) {
  await figma.setCurrentPageAsync(pg);
  for (const s of pg.findAll((n) => n.type === 'COMPONENT_SET' || (n.type === 'COMPONENT' && n.parent.type !== 'COMPONENT_SET'))) {
    const out = new Set();
    walk(s, (n) => {
      if (n.type === 'COMPONENT_SET' || !n.visible) return;
      const b = n.boundVariables || {};
      for (const k of ['fills', 'strokes']) if (Array.isArray(n[k])) for (const p of n[k]) if (p.visible !== false && p.type === 'SOLID' && !(p.boundVariables && p.boundVariables.color)) out.add(`${k === 'fills' ? 'fill' : 'stroke'} ${hex(p.color)} @${n.name}`);
      if (n.strokes && n.strokes.length && typeof n.strokeWeight === 'number' && n.strokeWeight && !b.strokeTopWeight && !b.strokeWeight) out.add(`stroke-weight ${n.strokeWeight} @${n.name}`);
      if (n.layoutMode && n.layoutMode !== 'NONE') for (const k of ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'itemSpacing']) if (n[k] && !b[k]) out.add(`${k} ${n[k]} @${n.name}`);
      if (typeof n.cornerRadius === 'number' && n.cornerRadius > 0 && !b.topLeftRadius) out.add(`radius ${n.cornerRadius} @${n.name}`);
      for (const k of ['minWidth', 'maxWidth', 'minHeight', 'maxHeight']) if (n[k] != null && !b[k]) out.add(`${k} ${n[k]} @${n.name}`);
      if (n.type === 'TEXT' && !n.textStyleId && !(b.fontSize)) out.add(`text ${n.fontSize} @${n.name}`);
    });
    if (out.size) rep[pg.name + ' / ' + s.name] = [...out];
  }
}
return rep;

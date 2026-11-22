// Аудит компонентов v2 (22.11, «новый аудит» Стефана): read-only, use_figma в файле Components.
// ARGS = { from: <индекс страницы>, to: <индекс>, } — страницы компонентов (🟠🟡🟢 и «_» базы) в диапазоне.
// Для каждого набора — компактная строка с замерами и флагами:
//   SZ   — высоты вариантов (уникальные), вне шкалы 16/20/24/28/32/36/40/44/48/56/64 → OFFSCALE
//   R    — радиус корня варианта и токен; SMALL-R — h ≤ 32 и радиус > h/4 (мелкий объект «таблеткой»), кроме круга/chip
//   RAW  — несвязанные отступы/зазоры/радиусы/заливки/обводки/эффекты/текст (вне экземпляров)
//   GRID — отступы/зазоры не кратны 2 (вне 4-сетки помечаются отдельно)
//   FX   — эффекты без стиля и без переменных
//   NEST — вложенные экземпляры с State≠Default внутри вариантов (подмена состояния вложенным компонентом)
//   DET  — фреймы, повторяющие атом DS без экземпляра (подозрение: текст+подложка вместо Badge/Button/…)
//   BOARD— на странице кроме набора: число прочих узлов, набор не сеткой, нет описания / статуса
figma.skipInvisibleInstanceChildren = false;
const SCALE = [16, 20, 24, 28, 32, 36, 40, 44, 48, 56, 64];
const cache = {}; const vn = async (id) => { if (!(id in cache)) { const v = await figma.variables.getVariableByIdAsync(id); cache[id] = v ? v.name : '?'; } return cache[id]; };
// свои узлы варианта: всё, кроме внутренностей вложенных экземпляров (сам экземпляр — да, его слоты — да)
const own = (n, f, acc = []) => { if (f(n)) acc.push(n); for (const c of (n.children || [])) { if (c.type === 'INSTANCE') { if (f(c)) acc.push(c); for (const s of c.children.filter((x) => x.type === 'SLOT')) own(s, f, acc); } else own(c, f, acc); } return acc; };
const pages = figma.root.children.filter((p, i) => i >= ARGS.from && i <= ARGS.to && /^([🟠🟡🟢]|_)/u.test(p.name));
const out = [];
for (const pg of pages) {
  await pg.loadAsync();
  const sets = pg.children.filter((n) => n.type === 'COMPONENT_SET' || n.type === 'COMPONENT');
  for (const s of sets) {
    const vars = s.type === 'COMPONENT_SET' ? s.children : [s];
    const hs = new Set(), rs = new Map(), raw = new Set(), grid = new Set(), fx = new Set(), nest = new Set(), small = new Set();
    for (const v of vars) {
      const h = Math.round(v.height); hs.add(h);
      const r = typeof v.cornerRadius === 'number' ? v.cornerRadius : 'mix';
      const rb = v.boundVariables && v.boundVariables.topLeftRadius ? await vn(v.boundVariables.topLeftRadius.id) : (r ? 'raw' : '-');
      rs.set(`${r}:${rb}`, (rs.get(`${r}:${rb}`) || 0) + 1);
      // мелкий объект: проверяем корень и главную подложку (plate/container/field) по высоте
      const plates = [v, ...v.findAll((x) => (x.type === 'FRAME' || x.type === 'RECTANGLE') && x.visible && /plate|field|box|track|container|surface|chip|pill|bg|base/i.test(x.name))].filter((x) => typeof x.cornerRadius === 'number' && x.cornerRadius > 0 && x.name !== 'focus ring');
      for (const p of plates) { const ph = Math.min(p.height, p.width); if (ph <= 32 && p.cornerRadius > ph / 4 + 0.5 && p.cornerRadius < ph / 2 - 0.5) small.add(`${p.name === v.name ? 'root' : p.name}:${Math.round(ph)}/r${p.cornerRadius}`); }
      for (const n of own(v, () => true)) {
        if (n.type === 'INSTANCE' && n !== v) {
          const cp = n.componentProperties || {}; const st = Object.entries(cp).find(([k]) => k.split('#')[0] === 'State');
          if (st && st[1].value !== 'Default' && !/focus|state layer/.test(n.name)) { const pst = (v.name.match(/State=(\w+)/) || [])[1]; nest.add(`${n.name}=${st[1].value}${pst ? '@' + pst : ''}`); }
          continue;
        }
        if (/hit area|safe area|focus ring|overlay/.test(n.name)) continue;
        const b = n.boundVariables || {};
        if (n.layoutMode && n.layoutMode !== 'NONE') for (const k of ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'itemSpacing']) {
          if (n[k] > 0 && !b[k] && !(k === 'itemSpacing' && n.primaryAxisAlignItems === 'SPACE_BETWEEN')) raw.add(`${k[0] === 'i' ? 'gap' : 'pad'}${n[k]}`);
          if (n[k] > 0 && n[k] % 2) grid.add(`${n.name}.${k}=${n[k]}`);
        }
        if (typeof n.cornerRadius === 'number' && n.cornerRadius > 0 && !b.topLeftRadius) raw.add('r' + n.cornerRadius);
        for (const kk of ['fills', 'strokes']) if (Array.isArray(n[kk])) for (const p of n[kk]) if (p.visible !== false && p.type === 'SOLID' && !(p.boundVariables && p.boundVariables.color)) raw.add(kk === 'fills' ? 'fill' : 'stroke');
        if (n.type === 'TEXT' && !n.textStyleId && !(b.fontSize)) raw.add('text');
        if (Array.isArray(n.effects) && n.effects.some((e) => e.visible !== false) && !n.effectStyleId && !n.effects.some((e) => e.boundVariables && Object.keys(e.boundVariables).length)) fx.add(n.name);
      }
    }
    const off = [...hs].filter((h) => !SCALE.includes(h) && h <= 64);
    const others = pg.children.filter((n) => n !== s && !sets.includes(n)).length;
    const d = s.description || '';
    out.push([s.name, `n${vars.length}`, `H${[...hs].sort((a, b) => a - b).join('/')}`, off.length ? 'OFF' + off.join('/') : '',
      'R' + [...rs.keys()].slice(0, 4).join(','), small.size ? 'SMALL ' + [...small].slice(0, 4).join(',') : '',
      raw.size ? 'RAW ' + [...raw].slice(0, 6).join(',') : '', grid.size ? 'GRID ' + [...grid].slice(0, 3).join(',') : '', fx.size ? 'FX ' + [...fx].slice(0, 3).join(',') : '',
      nest.size ? 'NEST ' + [...nest].slice(0, 4).join(',') : '',
      `BOARD o${others}${s.type === 'COMPONENT_SET' && s.layoutMode && s.layoutMode !== 'NONE' ? ' AL' : ''}${d ? '' : ' NODESC'}${/Status:/.test(d) ? '' : ' NOSTATUS'}`].filter(Boolean).join(' | '));
  }
}
return out;

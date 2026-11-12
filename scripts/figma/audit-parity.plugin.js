// Расширенный аудит компонентов (read-only). Запуск: Figma → Components → use_figma / плагин, без записи.
// Каждая находка разработки или ручного прохода сначала становится проверкой здесь, потом исправляется.
// Что ловит: DEPRECATED (токены из списка ниже ещё привязаны), SIZE (ключевые слои без переменной размера),
// RING (кольцо фокуса не OUTSIDE / толщина и радиус без переменной / виден вне Focus),
// COVERAGE (у части вариантов по оси сырой цвет, у соседей токен), PARITY (парные компоненты расходятся),
// MINMAX (min / max корня числом, без переменной size/*), MATRIX (вариантов меньше произведения осей и в описании нет строки «Матрица:»),
// DESC (первая строка не Status:, нет Level / «Когда использовать» / A11y, экранированные сущности &amp; / &quot; / &lt; в тексте), AXES (Left / Right вместо Start / End, булева ось, State не последняя ось),
// BASE (компонент семьи без вложенной базы; оси надстройки не совпадают с вариантом вложенной базы — если у базы такого значения оси нет, база обязана быть Default; оси глифа в слоте базы не совпадают с надстройкой), BOARD (на странице нет борды v3),
// NESTED (вложен компонент со статусом deprecated или без главного компонента).
// SERVICE (в наборах из SERVICE_DONE служебный слой не экземпляр _Focus ring / _State layer / _Hit area / _Safe margin).
// OVERLAY (надстройка оверлея из таблицы OVERLAY: нет слоя overlay surface / не тот Kind / слой не во весь корень / у корня своя заливка, тень или clip / радиус корня не равен радиусу поверхности / обводка или отступ корня числом; у базы Material-вариант без блюра или тень не равна Elevation).
// STATE (слой state layer во весь родитель, а радиус привязан к другой переменной, чем у родителя).
// SIZE не считает ширину корня (ширина по умолчанию — не размер компонента).
// Чего НЕ ловит (проверять руками, см. docs/preflight.md): цвет иконки и подписи, заливка полоски под подписью (notch).
const PAGES = null; // null = все страницы компонентов; или имена / id страниц: ['Segment', 'Input', '1825:3314'] (по id берутся и наборы с «_»)
const CHUNK = 0; const CHUNK_SIZE = 18500; // ответ use_figma ≤ 20 KB
// Семьи: база → кто обязан быть собран на ней (вложенный экземпляр базы). Добавлять по мере появления базовых.
const FAMILIES = { '_Field base': ['Input', 'Textarea', 'Select', 'Multiselect', 'Password field', 'Date range field', 'Input amount', 'Code input', 'Input · пилот', 'Textarea · пилот'],
  '_Selection control': ['Checkbox', 'Radio', 'Toggle', 'Checkbox · пилот', 'Radio · пилот', 'Toggle · пилот'],
  '_List row': ['Menu item', 'Multiselect option', 'List item', 'Menu item · пилот', 'Multiselect option · пилот', 'List item · пилот'] };
const PAIRS = [['Input', 'Textarea']]; // парные компоненты: добавлять сюда новые пары
const DEPRECATED = new Set(['action/tertiary/hover', 'action/tertiary/pressed', 'surface/hover', 'surface/active', 'control/segment-hover', 'action/secondary/hover']);
figma.skipInvisibleInstanceChildren = false;
const cache = {};
const vinfo = async id => { if (!(id in cache)) { const v = await figma.variables.getVariableByIdAsync(id); const n = v ? v.name : '?'; cache[id] = { n, dep: DEPRECATED.has(n) || (v && /^⚠️ Deprecated/.test(v.description || '')) }; } return cache[id]; };
// Вложенные экземпляры не обходим, кроме служебных слоёв (focus ring, state layer, hit area · overlay, safe area · outer): сам экземпляр проверяем, внутрь не идём.
const SERVICE = { 'focus ring': '_Focus ring', 'state layer': '_State layer', 'hit area · overlay': '_Hit area', 'safe area · outer': '_Safe margin', 'overlay surface': '_Overlay surface' };
// Наборы, уже пересаженные на служебные компоненты (страница _Service layers). Добавлять по мере миграции; для них служебный слой обязан быть экземпляром.
const SERVICE_DONE = new Set(['_Field base', '_Selection control', '_Checkbox control', '_Radio control', '_Toggle control', '_List row', 'Tooltip · пилот', 'Menu · пилот', 'Dropdown panel · пилот', 'Toast · пилот', 'Modal · пилот', 'Sheet · пилот']);
// Оверлеи: набор → Kind базы _Overlay surface. При замене действующих наборов добавить их имена без «· пилот».
const OVERLAY = { 'Tooltip · пилот': 'Tooltip', 'Menu · пилот': 'Popover', 'Dropdown panel · пилот': 'Popover', 'Toast · пилот': 'Toast', 'Modal · пилот': 'Modal', 'Sheet · пилот': 'Sheet' };
// Тени Material-вариантов базы (стиль эффектов не совмещается с блюром): [key radius, key y, ambient radius, ambient y, ambient spread] = Elevation/2 и Elevation/4, docs/effects.md.
const OVERLAY_FX = { Popover: [2, 1, 24, 8, -4], Sheet: [6, 2, 56, 24, -8] };
const walk = (n, inst, fn) => { if (n.type === 'INSTANCE' && inst) { if (SERVICE[n.name]) fn(n); return; } fn(n); if (n.children) for (const c of n.children) walk(c, true, fn); };
const SKIP = /hit area|safe area|safe margin|overlay/i;
const KEY = /^(control|box|track|thumb|dot|mark|check|indicator|pill|body|field)$/i;
const rep = {}; const add = (k, msg) => { (rep[k] = rep[k] || new Set()).add(msg); };
const paintCount = (v) => { let bound = 0, raw = 0; walk(v, false, n => { if (SKIP.test(n.name) || n.visible === false || n.type === 'TEXT') return; for (const kk of ['fills', 'strokes']) if (Array.isArray(n[kk])) for (const p of n[kk]) if (p.visible !== false && p.type === 'SOLID') { if (p.boundVariables && p.boundVariables.color) bound++; else raw++; } }); return { bound, raw }; };
const bySet = {};
const byId = p => !!PAGES && PAGES.includes(p.id);
const pages = figma.root.children.slice(2).filter(p => byId(p) || (/^[🟠🟡🟢🔴]/u.test(p.name) && (!PAGES || PAGES.includes(p.name.replace(/^[🟠🟡🟢🔴]\s*/u, '')))));
const baseOf = {}; for (const [b, list] of Object.entries(FAMILIES)) for (const n of list) baseOf[n] = b;
const mainSetName = async i => { const m = await i.getMainComponentAsync(); if (!m) return null; return { name: m.parent && m.parent.type === 'COMPONENT_SET' ? m.parent.name : m.name, variant: m.name, set: m.parent && m.parent.type === 'COMPONENT_SET' ? m.parent : null, desc: ((m.parent && m.parent.type === 'COMPONENT_SET' ? m.parent.description : m.description) || '') }; };
for (const pg of pages) {
  await figma.setCurrentPageAsync(pg);
  const sets = pg.findAll(n => n.type === 'COMPONENT_SET' && (byId(pg) || !n.name.startsWith('_')));
  if (sets.some(s => !s.name.startsWith('_') && !/· пилот$/.test(s.name)) && !pg.children.some(n => /— борда · шаблон v3/.test(n.name))) add(pg.name.replace(/^[🟠🟡🟢🔴]\s*/u, ''), 'BOARD на странице нет борды «шаблон v3»');
  for (const s of sets) {
    const key = pg.name.replace(/^[🟠🟡🟢🔴]\s*/u, '') + ' / ' + s.name; bySet[s.name] = s;
    const axes = {}; for (const v of s.children) for (const part of v.name.split(', ')) { const [a, b] = part.split('='); (axes[a] = axes[a] || new Set()).add(b); }
    const d = (s.description || '').trim(), isBase = s.name.startsWith('_');
    if (!/^Status:\s*(draft|beta|stable|deprecated)/.test(d)) add(key, 'DESC первая строка не «Status: draft|beta|stable|deprecated»');
    if (!/(^|\n)Level:/.test(d)) add(key, 'DESC нет строки Level:');
    if (!isBase && !/Когда использовать/i.test(d)) add(key, 'DESC нет «Когда использовать»');
    if (!isBase && !/A11y:/.test(d)) add(key, 'DESC нет A11y:');
    if (/&(amp|quot|lt|gt|#\d+);/.test(d)) add(key, 'DESC в описании экранированные сущности (&amp; / &quot; / &lt;)');
    const full = Object.values(axes).reduce((p, x) => p * x.size, 1);
    if (s.children.length < full && !/(^|\n)Матрица:/.test(d)) add(key, 'MATRIX вариантов ' + s.children.length + ' из ' + full + ', в описании нет строки «Матрица:» с правилом');
    const order = Object.keys(axes);
    for (const [a, vals] of Object.entries(axes)) { const vs = [...vals];
      if (vs.some(x => /^(Left|Right)$/i.test(x)) || /left|right/i.test(a)) add(key, 'AXES ось «' + a + '»: Left / Right, нужно Start / End');
      if (vs.length <= 2 && vs.every(x => /^(true|false|on|off|yes|no)$/i.test(x))) add(key, 'AXES ось «' + a + '» булева (' + vs.join(' / ') + '): проверить, не свойство ли это'); }
    if (order.includes('State') && order[order.length - 1] !== 'State') add(key, 'AXES порядок осей: State не последняя (' + order.join(', ') + ')');
    const fam = baseOf[s.name]; let famHit = 0;
    const sigs = {};
    for (const v of s.children) {
      sigs[v.name] = paintCount(v); const st = (v.name.match(/State=([\w-]+)/) || [])[1];
      const vb = v.boundVariables || {}; for (const k of ['minWidth', 'maxWidth', 'minHeight', 'maxHeight']) if (v[k] != null && !vb[k]) add(key, 'MINMAX ' + k + '=' + v[k] + ' числом, нужна переменная size/*');
      const insts = []; (function w(n) { if (n.type === 'INSTANCE') { insts.push(n); return; } if (n.children) for (const c of n.children) w(c); })(v);
      let hasBase = false;
      for (const i of insts) { const m = await mainSetName(i);
        if (!m) { add(key, 'NESTED «' + i.name + '» без главного компонента'); continue; }
        if (/^Status:\s*deprecated/.test(m.desc.trim())) add(key, 'NESTED вложен deprecated «' + m.name + '»');
        if (fam && m.name === fam) { hasBase = true; const mv = Object.fromEntries(m.variant.split(', ').map(p => p.split('=')));
          for (const part of v.name.split(', ')) { const [a, b] = part.split('='); if (a in mv && mv[a] !== b && (mv[a] !== 'Default' || (m.set && m.set.children.some(c => c.name.split(', ').includes(a + '=' + b))))) add(key, 'BASE ось ' + a + ': надстройка ' + b + ', база ' + mv[a] + ' (' + v.name + ')'); }
          if (!i.isExposedInstance) add(key, 'BASE экземпляр базы не раскрыт (isExposedInstance)');
          for (const g of i.exposedInstances || []) { const gm = await mainSetName(g); if (!gm) continue; const gv = Object.fromEntries(gm.variant.split(', ').map(p => p.split('=')));
            for (const part of v.name.split(', ')) { const [a, b] = part.split('='); if (a in gv && gv[a] !== b) add(key, 'BASE глиф ' + gm.name + ' ось ' + a + ': надстройка ' + b + ', глиф ' + gv[a] + ' (' + v.name + ')'); } } } }
      if (OVERLAY[s.name]) { const o = v.children[0], vbn = v.boundVariables || {};
        if (!o || o.name !== 'overlay surface' || o.type !== 'INSTANCE') add(key, 'OVERLAY первый слой не «overlay surface» (' + v.name + ')');
        else { const om = await mainSetName(o); if (om && om.name === '_Overlay surface' && om.variant !== 'Kind=' + OVERLAY[s.name]) add(key, 'OVERLAY ' + om.variant + ', нужен Kind=' + OVERLAY[s.name]);
          if (o.layoutPositioning !== 'ABSOLUTE' || Math.abs(o.x) > 0.01 || Math.abs(o.y) > 0.01 || Math.abs(o.width - v.width) > 0.01 || Math.abs(o.height - v.height) > 0.01 || o.constraints.horizontal !== 'STRETCH' || o.constraints.vertical !== 'STRETCH') add(key, 'OVERLAY слой overlay surface не во весь корень (' + v.name + ')');
          const ob = o.boundVariables || {}; for (const k of ['topLeftRadius', 'bottomLeftRadius']) { const a = vbn[k] && vbn[k].id, c = ob[k] && ob[k].id; if (a !== c || (!a && v[k] !== o[k])) add(key, 'OVERLAY ' + k + ' корня не равен радиусу поверхности (' + v.name + ')'); } }
        if (v.fills.length || v.effects.length || v.clipsContent) add(key, 'OVERLAY у корня своя заливка, тень или clip (' + v.name + ')');
        if (v.strokes.length && !vbn.strokeTopWeight) add(key, 'OVERLAY толщина обводки корня числом');
        for (const k of ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'itemSpacing']) if (v[k] > 0 && !vbn[k] && (k !== 'itemSpacing' || v.primaryAxisAlignItems !== 'SPACE_BETWEEN')) add(key, 'OVERLAY ' + k + '=' + v[k] + ' числом'); }
      if (s.name === '_Overlay surface') { const kd = v.name.replace('Kind=', ''), fx = OVERLAY_FX[kd], sh = v.effects.filter(e => e.type === 'DROP_SHADOW'), bl = v.effects.find(e => e.type === 'BACKGROUND_BLUR');
        if (fx) { if (!bl || !(bl.boundVariables && bl.boundVariables.radius)) add(key, 'OVERLAY ' + kd + ': нет блюра material/thick/blur'); const got = sh.length === 2 ? [sh[0].radius, sh[0].offset.y, sh[1].radius, sh[1].offset.y, sh[1].spread] : []; if (got.join() !== fx.join() || sh.some(e => !(e.boundVariables && e.boundVariables.color))) add(key, 'OVERLAY ' + kd + ': тень не равна Elevation (' + got.join(' ') + ')'); }
        else if (!v.effectStyleId) add(key, 'OVERLAY ' + kd + ': тень без стиля Elevation'); }
      if (fam && hasBase) famHit++;
      const nodes = []; walk(v, false, n => nodes.push(n));
      for (const n of nodes) {
        if (SERVICE[n.name] && SERVICE_DONE.has(s.name)) { const m = n.type === 'INSTANCE' ? await mainSetName(n) : null; if (!m || m.name !== SERVICE[n.name]) add(key, 'SERVICE слой «' + n.name + '» не экземпляр ' + SERVICE[n.name]); }
        if (SKIP.test(n.name)) continue; const b = n.boundVariables || {};
        const ids = []; for (const kk of ['fills', 'strokes']) if (Array.isArray(n[kk])) for (const p of n[kk]) if (p.boundVariables && p.boundVariables.color) ids.push(p.boundVariables.color.id);
        for (const [k, val] of Object.entries(b)) { if (k === 'fills' || k === 'strokes') continue; for (const a of (Array.isArray(val) ? val : [val])) if (a && a.id) ids.push(a.id); }
        for (const id of ids) { const vi = await vinfo(id); if (vi.dep) add(key, 'DEPRECATED ' + vi.n + ' (' + st + ' · ' + n.name + ')'); }
        if (n.visible !== false && n.type !== 'TEXT' && (n === v || KEY.test(n.name))) for (const [k, sz] of [['width', n.layoutSizingHorizontal], ['height', n.layoutSizingVertical]]) if (sz !== 'FILL' && sz !== 'HUG' && !b[k] && !(n === v && (k === 'width' || s.name === '_Overlay surface'))) add(key, 'SIZE ' + n.name + '.' + k + ' без переменной');
        if (n.name === 'state layer' && n.parent && n.parent !== v && Math.abs(n.width - n.parent.width) < 1 && Math.abs(n.height - n.parent.height) < 1) { const pb = n.parent.boundVariables || {}; if (pb.topLeftRadius && (!b.topLeftRadius || b.topLeftRadius.id !== pb.topLeftRadius.id)) add(key, 'STATE радиус слоя state layer не равен радиусу «' + n.parent.name + '»'); }
        if (n.name === 'focus ring') { if (n.strokeAlign !== 'OUTSIDE') add(key, 'RING обводка ' + n.strokeAlign + ', нужна OUTSIDE'); if (!b.strokeTopWeight && !b.strokeWeight) add(key, 'RING толщина без переменной'); if (!b.topLeftRadius) add(key, 'RING радиус без переменной'); if (n.visible && st && st !== 'Focus' && st !== 'Default') add(key, 'RING виден в ' + st); }
      }
    }
    if (fam && famHit < s.children.length) add(key, 'BASE собран не на ' + fam + ' (' + famHit + ' из ' + s.children.length + ' вариантов)');
    for (const a of Object.keys(axes)) { if (axes[a].size < 2) continue; const groups = {};
      for (const v of s.children) { const rest = v.name.split(', ').filter(p => p.split('=')[0] !== a).join(', '); (groups[rest] = groups[rest] || []).push(v.name); }
      for (const names of Object.values(groups)) { if (names.length < 2) continue; const raws = names.map(n => sigs[n].raw); if (Math.max(...raws) > 0 && Math.min(...raws) === 0) add(key, 'COVERAGE ось ' + a + ': у части вариантов сырой цвет (' + names.filter((n, i) => raws[i] > 0).slice(0, 2).join(' | ') + ')'); } }
  }
}
// PROPS: свойства компонента (boolean, text, instance swap) не привязаны ни к одному слою в части вариантов.
// «Мёртвый» вариант: ни одно свойство не привязано (в Figma свойство в нём не работает). Skeleton пропускаем.
const pathOf = (n, root) => { const parts = []; let c = n; while (c && c !== root) { const sib = c.parent.children.filter(x => x.name === c.name); parts.unshift(c.name + '#' + sib.indexOf(c)); c = c.parent; } return parts.join('/'); };
const allWalk = (n, fn) => { fn(n); if (n.children) for (const c of n.children) allWalk(c, fn); };
for (const [sname, s] of Object.entries(bySet)) {
  const defs = Object.keys(s.componentPropertyDefinitions).filter(k => s.componentPropertyDefinitions[k].type !== 'VARIANT'); if (!defs.length) continue;
  const have = {}; for (const v of s.children) { const set = new Set(); allWalk(v, n => { const r = n.componentPropertyReferences; if (r) for (const x of Object.values(r)) if (defs.includes(x)) set.add(x); }); have[v.id] = set; }
  const pgName = (s.parent && s.parent.type === 'PAGE' ? s.parent.name : '').replace(/^[🟠🟡🟢🔴]\s*/u, ''); const key = (pgName || '?') + ' / ' + sname;
  const dead = s.children.filter(v => have[v.id].size === 0 && !/State=Skeleton/.test(v.name));
  if (dead.length) add(key, 'PROPS ни одно свойство не привязано у ' + dead.length + ' вариантов (напр. ' + dead[0].name + ')');
  for (const k of defs) { const lacking = s.children.filter(v => !have[v.id].has(k) && have[v.id].size > 0 && !/State=Skeleton/.test(v.name)); if (!lacking.length || lacking.length === s.children.length) continue;
    // считаем дефектом только если соседний вариант привязывает это свойство к слою с тем же путём, который есть и в «слепом» варианте
    const bound = s.children.filter(v => have[v.id].has(k)); if (!bound.length) continue; const ref = bound[0]; const paths = []; allWalk(ref, n => { const r = n.componentPropertyReferences; if (r && Object.values(r).includes(k)) paths.push(pathOf(n, ref)); });
    const real = lacking.filter(v => paths.some(p => { let t = null; allWalk(v, n => { if (n !== v && pathOf(n, v) === p) t = n; }); return !!t; }));
    if (real.length) add(key, 'PROPS «' + k.split('#')[0] + '» не привязано у ' + real.length + ' вариантов (напр. ' + real[0].name + ')'); } }
// ICON: у подписи text/disabled иконка должна быть icon/disabled; у text/danger (Button, Menu item) icon/danger;
// у text/secondary в Tab, Tab bar item, Nav item (иконка часть подписи) icon/secondary. Иконки полей ввода слева не трогаем.
const ICON_SECONDARY = new Set(['Tab', 'Tab bar item', 'Nav item']), ICON_DANGER = new Set(['Button', 'Menu item', 'Menu item · пилот']);
const nameOf = async id => (await vinfo(id)).n;
for (const [sname, s] of Object.entries(bySet)) {
  const pgName = (s.parent && s.parent.type === 'PAGE' ? s.parent.name : '').replace(/^[🟠🟡🟢🔴]\s*/u, ''); const key = (pgName || '?') + ' / ' + sname;
  for (const v of s.children) { const t = v.findAll(n => n.type === 'TEXT' && /label|title|text|value/i.test(n.name))[0]; if (!t || !t.fills[0] || !t.fills[0].boundVariables || !t.fills[0].boundVariables.color) continue;
    const lt = await nameOf(t.fills[0].boundVariables.color.id); let want = null;
    if (lt === 'text/disabled') want = 'icon/disabled'; else if (lt === 'text/danger' && ICON_DANGER.has(sname)) want = 'icon/danger'; else if (lt === 'text/secondary' && ICON_SECONDARY.has(sname)) want = 'icon/secondary'; if (!want) continue;
    for (const ic of v.findAll(n => /^icon( |$|\/|·)/i.test(n.name) && n.type === 'INSTANCE' && !/swap|wrap/i.test(n.name))) {
      for (const x of ic.findAll(() => true)) for (const kk of ['strokes', 'fills']) { const arr = x[kk]; if (!Array.isArray(arr)) continue; for (const p of arr) if (p.type === 'SOLID' && p.visible !== false && p.boundVariables && p.boundVariables.color && (await nameOf(p.boundVariables.color.id)) === 'icon/primary') add(key, 'ICON подпись ' + lt + ', иконка icon/primary, нужна ' + want + ' (' + v.name.slice(0, 50) + ')'); } } } }
for (const [A, B] of PAIRS) { const a = bySet[A], b = bySet[B]; if (!a || !b) continue; const bm = {}; for (const v of b.children) bm[v.name] = v;
  for (const va of a.children) { const vb = bm[va.name]; if (!vb) continue; const la = {}, lb = {};
    walk(va, false, n => { la[n.name] = n; }); walk(vb, false, n => { lb[n.name] = n; });
    for (const nm of Object.keys(la)) if (!lb[nm] && la[nm].visible !== false && /hit area|focus ring|field|helper|label|notch/i.test(nm)) add(A + '↔' + B, 'PARITY слой «' + nm + '» только в ' + A);
    if (la['focus ring'] && lb['focus ring'] && la['focus ring'].strokeAlign !== lb['focus ring'].strokeAlign) add(A + '↔' + B, 'PARITY кольцо: ' + la['focus ring'].strokeAlign + ' ≠ ' + lb['focus ring'].strokeAlign);
    if (la['field'] && lb['field']) for (const k of ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft']) { const x = !!(la['field'].boundVariables && la['field'].boundVariables[k]), y = !!(lb['field'].boundVariables && lb['field'].boundVariables[k]); if (x !== y) add(A + '↔' + B, 'PARITY field.' + k + ': привязка ' + (x ? 'есть только у ' + A : 'есть только у ' + B)); } } }
const res = {}; let total = 0; const kinds = {}; for (const [k, v] of Object.entries(rep)) { res[k] = [...v].slice(0, 12); total += v.size; for (const m of v) { const t = m.split(' ')[0]; kinds[t] = (kinds[t] || 0) + 1; } }
const json = JSON.stringify({ sets: Object.keys(bySet).length, withIssues: Object.keys(res).length, issues: total, kinds, res }); const nCh = Math.ceil(json.length / CHUNK_SIZE);
return 'chunk ' + CHUNK + '/' + nCh + '\n' + json.slice(CHUNK * CHUNK_SIZE, (CHUNK + 1) * CHUNK_SIZE);

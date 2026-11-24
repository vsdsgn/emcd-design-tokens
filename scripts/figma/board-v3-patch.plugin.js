// Патч борды v3 на месте (25.11): пересобирает визуальные разделы по эталону Checkbox — 02 превью + «Размеры», 03 «Раскладка и содержимое», 04 срез состояний, 06 представители, 07 не больше двух примеров. Текстовые разделы (из контракта) не трогает.
// Запуск: текст файла — в узле «board-v3-patch» страницы «⚑ Генератор · временный»; use_figma: new AF('ARGS', node.characters)({ pairs: [[boardId, setId], …] }).
figma.skipInvisibleInstanceChildren = false;
const C = {}; const V = {}; const fams = new Set();
const famOf = async (val, d) => { if (typeof val === 'string') fams.add(val); else if (val && val.type === 'VARIABLE_ALIAS' && d < 5) { const a = await figma.variables.getVariableByIdAsync(val.id); if (a) for (const x of Object.values(a.valuesByMode)) await famOf(x, d + 1); } };
for (const c of await figma.teamLibrary.getAvailableLibraryVariableCollectionsAsync()) { const vs = await figma.teamLibrary.getVariablesInLibraryCollectionAsync(c.key); if (!vs.length) continue;
  const first = await figma.variables.importVariableByKeyAsync(vs[0].key); C[c.name] = await figma.variables.getVariableCollectionByIdAsync(first.variableCollectionId);
  for (const lv of vs) { if (['surface/current', 'text/primary', 'text/secondary', 'border/subtle'].includes(lv.name)) V[lv.name] = await figma.variables.importVariableByKeyAsync(lv.key);
    if (/font\/family|font-family/.test(lv.name)) { const v = await figma.variables.importVariableByKeyAsync(lv.key); for (const x of Object.values(v.valuesByMode)) await famOf(x, 0); } } }
// Шрифты всех брендов и платформ: без них экземпляр нельзя вставить во фрейм с другим режимом.
for (const f of await figma.listAvailableFontsAsync()) if (fams.has(f.fontName.family)) await figma.loadFontAsync(f.fontName);
const MONO = { family: 'Roboto Mono', style: 'Regular' }; await figma.loadFontAsync(MONO);
for (const s of ['Regular', 'Medium', 'Semi Bold', 'Bold']) await figma.loadFontAsync({ family: 'Inter', style: s });
const INK = '#0a0a0a', GREY = '#6b6b6b', LINE = '#e6e6e6', SOFT = '#f6f6f7';
const solid = h => [{ type: 'SOLID', color: { r: parseInt(h.slice(1, 3), 16) / 255, g: parseInt(h.slice(3, 5), 16) / 255, b: parseInt(h.slice(5, 7), 16) / 255 } }];
const paint = v => [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0.5, g: 0.5, b: 0.5 } }, 'color', v)];
const F = (dir, gap, pv, ph) => { const f = figma.createFrame(); f.layoutMode = dir; f.itemSpacing = gap || 0; f.paddingTop = f.paddingBottom = pv || 0; f.paddingLeft = f.paddingRight = ph === undefined ? pv || 0 : ph; f.primaryAxisSizingMode = 'AUTO'; f.counterAxisSizingMode = 'AUTO'; f.fills = []; f.clipsContent = false; return f; };
const fixW = (f, w) => { f.resize(w, Math.max(f.height, 1)); if (f.layoutMode === 'VERTICAL') { f.counterAxisSizingMode = 'FIXED'; f.primaryAxisSizingMode = 'AUTO'; } else { f.primaryAxisSizingMode = 'FIXED'; f.counterAxisSizingMode = 'AUTO'; } return f; };
const gapW = w => { const f = figma.createFrame(); f.resize(w, 1); f.fills = []; return f; };
const wrap = (w, gap) => { const f = F('HORIZONTAL', gap); f.layoutWrap = 'WRAP'; f.counterAxisSpacing = gap; return fixW(f, w); };
// Текст; фрагменты в `обратных кавычках` — моноширинным. color — hex или переменная (для подписей на тематической подложке).
const T = (s, size, style, color, w) => { const t = figma.createText(); t.fontName = { family: 'Inter', style: style || 'Regular' }; t.fontSize = size; t.lineHeight = { unit: 'PERCENT', value: 145 };
  let plain = ''; const spans = []; String(s).split('`').forEach((p, i) => { if (i % 2 && p) spans.push([plain.length, plain.length + p.length]); plain += p; });
  t.characters = plain; for (const [a, b] of spans) t.setRangeFontName(a, b, MONO);
  t.fills = typeof color === 'string' ? solid(color) : paint(color); if (w) { t.textAutoResize = 'HEIGHT'; t.resize(w, t.height); } return t; };
const add = (p, ...ch) => { for (const c of ch) if (c) p.appendChild(c); return p; };
const chip = (s, bg, fg) => { const c = F('HORIZONTAL', 0, 3, 8); c.fills = solid(bg); c.cornerRadius = 6; return add(c, T(s, 12, 'Medium', fg)); };
const RW = 1680; const sections = []; const skipped = []; const errors = [];
const sec = (num, title, note) => { const s = F('HORIZONTAL', 64, 72, 80); s.name = num + ' · ' + title; s.strokes = solid(LINE); s.strokeWeight = 0; s.strokeTopWeight = 1; board.appendChild(s); sections.push(s.name);
  const l = fixW(F('VERTICAL', 12), 400); add(s, l); add(l, T(num, 13, 'Semi Bold', GREY), T(title, 30, 'Semi Bold', INK, 400), note && T(note, 15, 'Regular', GREY, 400));
  const r = fixW(F('VERTICAL', 40), RW); add(s, r); return r; };
const block = (parent, title) => { const b = fixW(F('VERTICAL', 16), RW); add(parent, b); if (title) add(b, T(title, 18, 'Semi Bold', INK)); return b; };
const bullets = (parent, list, w) => { const b = F('VERTICAL', 10); add(parent, b); for (const s of list) add(b, add(F('HORIZONTAL', 12), T('—', 15, 'Regular', GREY), T(s[0].toUpperCase() + s.slice(1), 15, 'Regular', INK, (w || RW) - 28))); return b; };
const table = (parent, cols, rows) => { const t = fixW(F('VERTICAL', 0), RW); add(parent, t); const h = F('HORIZONTAL', 0); h.paddingBottom = 12; add(t, h);
  for (const [name, w] of cols) add(h, T(name, 12, 'Semi Bold', GREY, w - 20), gapW(20));
  for (const row of rows) { const r = fixW(F('HORIZONTAL', 0, 14, 0), RW); r.strokes = solid(LINE); r.strokeWeight = 0; r.strokeTopWeight = 1; add(t, r); row.forEach((c, i) => add(r, T(c || '—', 14, i ? 'Regular' : 'Semi Bold', INK, cols[i][1] - 20), gapW(20))); }
  return t; };
const mode = (col, name) => { const m = C[col] && C[col].modes.find(x => x.name === name); if (!m) throw new Error('нет режима ' + col + ' = ' + name); return m.modeId; };
// Подложка превью: фон — surface/current в заданных режимах; экземпляры внутри наследуют режимы.
const stage = (modes, w, pad) => { const s = F('VERTICAL', 24, pad || 48); s.fills = paint(V['surface/current']); s.strokes = solid(LINE); s.strokeWeight = 1; s.cornerRadius = 12; s.clipsContent = true;
  for (const [col, m] of Object.entries(modes)) s.setExplicitVariableModeForCollection(C[col], mode(col, m)); if (w) fixW(s, w); return s; };
const BASE = { Theme: 'Light', Brand: 'EMCD', Platform: 'Web', 'Surface context': 'L0' };
const cap = (s, size) => T(s, size || 12, 'Medium', V['text/secondary']);
const inst = (v, maxW) => { const i = v.createInstance(); if (maxW && i.width > maxW) i.rescale(maxW / i.width); return i; };
const loadFonts = async n => { for (const t of n.findAll(x => x.type === 'TEXT')) for (const s of t.getStyledTextSegments(['fontName'])) await figma.loadFontAsync(s.fontName); };
const vprops = v => { try { return v.variantProperties || {}; } catch (e) { return Object.fromEntries(v.name.split(', ').map(x => x.split('='))); } };
const SERVICE = ['Focus ring', 'Show hit area', 'Safe margin'];
const TYPE = { VARIANT: 'вариант', BOOLEAN: 'булево', TEXT: 'текст', INSTANCE_SWAP: 'замена экземпляра', SLOT: 'слот' };
const live = async id => { const s = await figma.getNodeByIdAsync(id); if (!s) throw new Error('нет набора ' + id);
  const variants = s.type === 'COMPONENT_SET' ? s.children.filter(x => x.type === 'COMPONENT') : [s]; const defs = s.componentPropertyDefinitions || {};
  const axes = Object.keys(defs).filter(k => defs[k].type === 'VARIANT').map(k => ({ name: k, options: defs[k].variantOptions }));
  const P = new Map(variants.map(v => [v, s.type === 'COMPONENT_SET' ? vprops(v) : {}])); const dv = Object.fromEntries(axes.map(a => [a.name, defs[a.name].defaultValue])); if (dv.Size && defs.Size.variantOptions.includes('M')) dv.Size = 'M'; /* срез борды — типовой размер M, даже если набор по умолчанию отдаёт XS */ const def = variants.find(v => axes.every(a => P.get(v)[a.name] === dv[a.name])) || (s.type === 'COMPONENT_SET' && s.defaultVariant) || variants[0];
  return { s, variants, defs, axes, P, def, key: n => Object.keys(defs).find(k => k.split('#')[0] === n) }; };
// Оси набора по роли (эталон — борда Checkbox, 25.11): State — столбцы матрицы состояний; Size — блок «Размеры»;
// оси облика (LOOK) — строки матрицы; остальные (раскладка, содержимое) — блок «Раскладка и содержимое», по одной строке на ось.
// На борде не вся матрица набора, а срез: прочие оси — как у варианта по умолчанию. Полная матрица — в самом наборе.
const LOOK = ['Type', 'Tone', 'Style', 'Selected', 'Status', 'Open', 'Emphasis', 'Sign', 'Mode', 'Color', 'Shape', 'Level', 'Collapsed'];
const roles = L => { const st = L.axes.find(a => a.name === 'State'); const size = L.axes.find(a => a.name === 'Size'); const look = L.axes.filter(a => LOOK.includes(a.name)); const other = L.axes.filter(a => a !== st && a !== size && !look.includes(a)); return { st, size, look, other }; };
// Вариант: оси из want — обязательно, остальные — как можно ближе к варианту по умолчанию.
const pickV = (L, want) => { const dp = L.P.get(L.def); let best = null, bs = -1; for (const v of L.variants) { const p = L.P.get(v); if (Object.entries(want).some(([a, b]) => p[a] !== b)) continue; const sc = L.axes.filter(a => p[a.name] === dp[a.name]).length; if (sc > bs) { best = v; bs = sc; } } return best; };
// Матрица вариантов (срез): столбцы — State (без него — ось облика с наибольшим числом значений), строки — сочетания остальных осей облика. Не помещается по ширине — ячейки с подписью и переносом.
const matrix = (L, W) => { const { axes, P } = L; const box = F('VERTICAL', 20);
  if (!axes.length) return add(box, inst(L.variants[0], W));
  const R = roles(L); const colAx = R.st || [...R.look].sort((a, b) => b.options.length - a.options.length)[0] || axes[axes.length - 1]; const rowAxes = R.look.filter(a => a !== colAx);
  const combos = rowAxes.reduce((acc, a) => acc.flatMap(c => a.options.map(o => ({ ...c, [a.name]: o }))), [{}]);
  const cell = new Map(); for (const c of combos) for (const o of colAx.options) { const v = pickV(L, { ...c, [colAx.name]: o }); if (v) cell.set(JSON.stringify(c) + '|' + o, v); }
  const keyOfC = c => rowAxes.map(a => c[a.name]).join(' · '); const liveC = combos.filter(c => colAx.options.some(o => cell.has(JSON.stringify(c) + '|' + o)));
  const rowKeys = liveC.map(keyOfC); const byKey = new Map(liveC.map(c => [keyOfC(c), c])); const variants = [...cell.values()];
  const find = (k, c) => cell.get(JSON.stringify(byKey.get(k)) + '|' + c);
  // Столбцы: Default первым; состояние, которое есть только у одной строки (Skeleton у Badge), — не столбец с прочерками, а строка под матрицей.
  let cols = [...colAx.options]; if (R.st) cols.sort((a, b) => (b === 'Default') - (a === 'Default')); const cnt = o => liveC.filter(c => cell.has(JSON.stringify(c) + '|' + o)).length; const extra = liveC.length >= 3 ? cols.filter(o => cnt(o) <= 1) : []; cols = cols.filter(o => !extra.includes(o));
  const cw = Math.max(80, Math.ceil(Math.max(...variants.map(v => v.width)))); const LAB = rowAxes.length ? 200 : 0; const n = cols.length;
  if (LAB + n * cw + (n - 1 + (LAB ? 1 : 0)) * 24 <= W) {
    const h = F('HORIZONTAL', 24); add(box, h); if (LAB) add(h, gapW(LAB)); for (const c of cols) add(h, T(c, 12, 'Semi Bold', V['text/secondary'], cw));
    for (const k of rowKeys) { const r = F('HORIZONTAL', 24); r.counterAxisAlignItems = 'CENTER'; add(box, r); if (LAB) add(r, T(k, 12, 'Medium', V['text/secondary'], LAB));
      let pt = 0, pb = 0; for (const c of cols) { const v = find(k, c); const i = v ? inst(v) : cap('—'); add(r, add(fixW(F('VERTICAL', 0), cw), i)); const rb = v && i.absoluteRenderBounds, y = i.absoluteTransform[1][2]; if (rb) { pt = Math.max(pt, Math.ceil(y - rb.y)); pb = Math.max(pb, Math.ceil(rb.y + rb.height - y - i.height)); } } r.paddingTop = pt; r.paddingBottom = pb; }
  } else for (const k of rowKeys) { const g = F('VERTICAL', 12); add(box, g); if (k) add(g, T(k, 13, 'Semi Bold', V['text/primary'])); const w = wrap(W, 24); add(g, w);
    for (const c of cols) { const v = find(k, c); if (v) add(w, add(F('VERTICAL', 8), cap(c, 11), inst(v, W))); } }
  if (extra.length) { const w = wrap(W, 24); add(box, w); add(w, T('Только у одного варианта:', 12, 'Medium', V['text/secondary'])); for (const o of extra) for (const c of liveC) { const v = cell.get(JSON.stringify(c) + '|' + o); if (v) add(w, add(F('VERTICAL', 8), cap(o + (keyOfC(c) ? ' · ' + keyOfC(c) : ''), 11), inst(v, W))); } }
  return box; };

// ── Патч ──
const out = [];
for (const [bid, sid] of ARGS.pairs) { const res = { bid };
  try {
  const B = await figma.getNodeByIdAsync(bid); if (!B) { out.push({ bid, error: 'нет борды' }); continue; } if (!B.children[0] || B.children[0].name !== 'Шапка') { out.push({ bid, skip: 'ручная борда (эталон) — не трогаю' }); continue; }
  const L = await live(sid); const { def } = L; const R = roles(L);
  const secOf = p => B.children.find(c => c.name.startsWith(p + ' · '));
  const right = s => s && s.children[1];
  const isBlock = (n, re) => n.type === 'FRAME' && n.children[0] && n.children[0].type === 'TEXT' && re.test(n.children[0].characters);
  const varLen = n => n % 10 === 1 && n % 100 !== 11 ? 'вариант' : [2, 3, 4].includes(n % 10) && ![12, 13, 14].includes(n % 100) ? 'варианта' : 'вариантов';
  // 02: превью по оси облика + «Размеры»
  { const s = secOf('02'); const r = right(s); if (r) { const pax = R.look[0];
    const st0 = r.children[0]; if (st0 && st0.type === 'FRAME' && !isBlock(st0, /./)) { const pv = st0.children[0]; if (pv) { for (const c of [...pv.children]) c.remove(); const pvs = def.width > 160 || !pax ? [def] : [...new Set(pax.options.map(o => pickV(L, { [pax.name]: o })).filter(Boolean))].slice(0, 8); for (const v of pvs) add(pv, inst(v, RW - 96)); } }
    for (const c of [...r.children]) if (c.name === 'Размеры') c.remove();
    if (R.size) { const rows = R.size.options.map(o => [o, pickV(L, { Size: o })]).filter(x => x[1]).sort((a, b) => a[1].height - b[1].height || a[1].width - b[1].width);
      const b = block(r, 'Размеры'); b.name = 'Размеры'; const st = stage(BASE, RW, 32); st.itemSpacing = 0; add(b, st); const hd = F('HORIZONTAL', 0); hd.paddingBottom = 8; add(st, hd); for (const [n, w] of [['Size', 160], ['Пример', 1000], ['Высота', 160], ['Ширина', 160]]) add(hd, fixW(add(F('VERTICAL', 0), cap(n)), w));
      for (const [o, v] of rows) { const rw = F('HORIZONTAL', 0, 12, 0); rw.counterAxisAlignItems = 'CENTER'; add(st, rw); add(rw, fixW(add(F('VERTICAL', 0), T(o, 14, 'Semi Bold', V['text/primary'])), 160), fixW(add(F('VERTICAL', 0), inst(v, 960)), 1000));
        for (const x of [v.height, v.width]) add(rw, fixW(add(F('VERTICAL', 0), T(Math.round(x) + ' px', 14, 'Regular', V['text/primary'])), 160)); } res.sizes = rows.length; } } }
  // 03: «Раскладка и содержимое»
  { const r = right(secOf('03')); if (r) { for (const c of [...r.children]) if (c.name === 'Раскладка и содержимое') c.remove(); const lay = R.other.filter(a => a.options.length > 1);
    if (lay.length) { const b = block(r, 'Раскладка и содержимое'); b.name = 'Раскладка и содержимое'; add(b, T('Каждая ось отдельно, остальное — как у варианта по умолчанию.', 13, 'Regular', GREY, RW));
      for (const a of lay) { const vs = a.options.map(o => [o, pickV(L, { [a.name]: o })]).filter(x => x[1]); const wide = Math.max(...vs.map(x => x[1].width)) > 520; const cw = wide ? RW - 96 : Math.min(520, (RW - 96 - (vs.length - 1) * 24) / Math.min(vs.length, 3));
        const st = stage(BASE, RW, 32); add(b, st); add(st, T(a.name, 13, 'Semi Bold', V['text/primary'])); const w = wrap(RW - 64, 24); w.counterAxisAlignItems = 'MAX'; add(st, w);
        for (const [o, v] of vs) add(w, add(F('VERTICAL', 8), cap(o, 11), inst(v, cw))); } res.layout = lay.map(a => a.name); } } }
  // 04: срез вместо полной матрицы
  { const s = secOf('04'); const r = right(s); if (r) { for (const c of [...r.children]) if (isBlock(c, /^(Светлая|Тёмная) тема/)) c.remove();
    if (!R.st && !R.look.length) { if (!r.children.length) { s.remove(); res.s04 = 'убран'; } else { const nt = s.children[0].children[2]; if (nt) { await figma.loadFontAsync(nt.fontName); nt.characters = 'Оси State у набора нет: правила состояний — текстом; варианты — в 03.'; } res.s04 = 'только текст'; } }
    else { const fixed = [R.size, ...R.other].filter(Boolean).map(a => a.name + ' = ' + L.P.get(def)[a.name]); const lc = s.children[0];
      const tt = lc.children[1], nt = lc.children[2]; await figma.loadFontAsync(tt.fontName); tt.characters = R.st ? 'Состояния' : 'Варианты облика';
      if (nt) { await figma.loadFontAsync(nt.fontName); nt.characters = (R.st ? 'Одна логика состояний' : 'Оси облика') + ' в светлой и тёмной теме.' + (fixed.length ? ' Срез: ' + fixed.join(', ') + '. Полная матрица — в наборе.' : ''); }
      s.name = '04 · ' + tt.characters;
      for (const [t, name] of [['Light', 'Светлая тема'], ['Dark', 'Тёмная тема']]) { const b = block(r, name); const st = stage({ ...BASE, Theme: t }, RW); add(b, st); add(st, matrix(L, RW - 96)); } res.s04 = 'срез'; } } }
  // 05: у широкой надстройки зоны показывают вложенную базу — раздел дублирует её борду
  { const s = secOf('05'); if (s && (def.width > 420 || def.height > 200) && /вложенной базы/.test(s.children[0].children.map(t => t.characters || '').join(' '))) { s.remove(); res.s05 = 'убран'; } }
  // 06: представители по оси облика
  { const r = right(secOf('06')); if (r) { for (const c of [...r.children]) c.remove();
    const reps = [def]; const ax = R.look[0]; if (ax) for (const o of ax.options) { if (reps.length >= 3) break; const v = pickV(L, { [ax.name]: o }); if (v && !reps.includes(v)) reps.push(v); }
    const mw = Math.max(...reps.map(v => v.width)); const cols = mw <= 344 ? 4 : mw <= 768 ? 2 : 1; const cw = (RW - (cols - 1) * 16) / cols;
    for (const [t, name] of [['Light', 'Светлая тема'], ['Dark', 'Тёмная тема']]) { const b = block(r, name); const w = wrap(RW, 16); add(b, w);
      for (const l of ['L0', 'L1', 'L2', 'L3']) { const st = stage({ ...BASE, Theme: t, 'Surface context': l }, cw, 24); st.itemSpacing = 16; add(w, st); add(st, cap(l)); for (const v of reps) add(st, inst(v, cw - 48)); } } } }
  // 07: два самых компактных примера
  { const r = right(secOf('07')); if (r) { const bs = r.children.filter(c => isBlock(c, /^Внутри /)); const area = b => { const i = b.findOne(x => x.type === 'INSTANCE'); return i ? i.width * i.height : 1e12; };
    bs.sort((a, b) => area(a) - area(b)); for (const b of bs.slice(2)) b.remove(); res.s07 = Math.min(2, bs.length); } }
  // Шапка: «Вариантов» — как в наборе
  res.h = Math.round(B.height);
  } catch (e) { res.error = String(e.message || e).slice(0, 200); }
  out.push(res); }
return out;

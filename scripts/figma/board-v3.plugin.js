// Генератор борды v3: собирает борду набора из контракта (данные D из `scripts/board-data.mjs`) и живого набора в Figma.
// Запуск: Figma MCP use_figma в файле Components; тело ждёт объект D (см. board-data.mjs). Текст — только из контракта, оси, варианты и свойства — из набора.
// Старая борда D.board заменяется на месте (D.archive — id страницы, куда её убрать; без него удаляется; D.keepOld — не трогать); если в ней есть компоненты — выход без изменений. Раздел без данных не рисуется и попадает в «— · Не собрано в этой версии».
// Возврат: { board, w, h, level, sections, skipped, errors }.
figma.skipInvisibleInstanceChildren = false;
const page = await figma.getNodeByIdAsync(D.pageId); await figma.setCurrentPageAsync(page);
const old = D.board ? await figma.getNodeByIdAsync(D.board) : null;
if (old && old.findOne(n => n.type === 'COMPONENT' || n.type === 'COMPONENT_SET')) return { error: 'в старой борде есть компоненты — не заменяю' };
const roots = figma.root.children; let level = '';
for (let i = roots.indexOf(page); i >= 0 && !level; i--) { const n = roots[i].name; level = /АТОМ/i.test(n) ? 'атом' : /МОЛЕКУЛ/i.test(n) ? 'молекула' : /ОРГАНИЗМ/i.test(n) ? 'организм' : ''; }
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
const board = F('VERTICAL', 0); board.name = D.name + ' — борда · шаблон v3'; board.fills = solid('#ffffff'); page.appendChild(board); fixW(board, 2304);
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
const TYPE = { VARIANT: 'вариант', BOOLEAN: 'булево', TEXT: 'текст', INSTANCE_SWAP: 'замена экземпляра' };
const live = async id => { const s = await figma.getNodeByIdAsync(id); if (!s) throw new Error('нет набора ' + id);
  const variants = s.type === 'COMPONENT_SET' ? s.children.filter(x => x.type === 'COMPONENT') : [s]; const defs = s.componentPropertyDefinitions || {};
  const axes = Object.keys(defs).filter(k => defs[k].type === 'VARIANT').map(k => ({ name: k, options: defs[k].variantOptions }));
  const P = new Map(variants.map(v => [v, s.type === 'COMPONENT_SET' ? vprops(v) : {}])); const def = (s.type === 'COMPONENT_SET' && s.defaultVariant) || variants[0];
  return { s, variants, defs, axes, P, def, key: n => Object.keys(defs).find(k => k.split('#')[0] === n) }; };
// Матрица вариантов: столбцы — State (или последняя ось), строки — сочетания остальных осей. Не помещается по ширине — ячейки с подписью и переносом.
const matrix = (L, W) => { const { variants, axes, P } = L; const box = F('VERTICAL', 20);
  if (!axes.length) return add(box, inst(variants[0], W));
  const colAx = axes.find(a => a.name === 'State') || axes[axes.length - 1]; const rowAxes = axes.filter(a => a !== colAx);
  const rk = v => rowAxes.map(a => P.get(v)[a.name]).join(' · '); const ord = v => rowAxes.reduce((n, a) => n * 64 + a.options.indexOf(P.get(v)[a.name]), 0); const rowKeys = [...new Set([...variants].sort((a, b) => ord(a) - ord(b)).map(rk))];
  const find = (k, c) => variants.find(v => rk(v) === k && P.get(v)[colAx.name] === c);
  const cw = Math.max(80, Math.ceil(Math.max(...variants.map(v => v.width)))); const LAB = rowAxes.length ? 200 : 0; const n = colAx.options.length;
  if (LAB + n * cw + (n - 1 + (LAB ? 1 : 0)) * 24 <= W) {
    const h = F('HORIZONTAL', 24); add(box, h); if (LAB) add(h, gapW(LAB)); for (const c of colAx.options) add(h, T(c, 12, 'Semi Bold', V['text/secondary'], cw));
    for (const k of rowKeys) { const r = F('HORIZONTAL', 24); r.counterAxisAlignItems = 'CENTER'; add(box, r); if (LAB) add(r, T(k, 12, 'Medium', V['text/secondary'], LAB));
      let pt = 0, pb = 0; for (const c of colAx.options) { const v = find(k, c); const i = v ? inst(v) : cap('—'); add(r, add(fixW(F('VERTICAL', 0), cw), i)); const rb = v && i.absoluteRenderBounds, y = i.absoluteTransform[1][2]; if (rb) { pt = Math.max(pt, Math.ceil(y - rb.y)); pb = Math.max(pb, Math.ceil(rb.y + rb.height - y - i.height)); } } r.paddingTop = pt; r.paddingBottom = pb; }
  } else for (const k of rowKeys) { const g = F('VERTICAL', 12); add(box, g); if (k) add(g, T(k, 13, 'Semi Bold', V['text/primary'])); const w = wrap(W, 24); add(g, w);
    for (const c of colAx.options) { const v = find(k, c); if (v) add(w, add(F('VERTICAL', 8), cap(c, 11), inst(v, W))); } }
  return box; };

let newId = null;
try {
  const S = D.sets[0]; const L = await live(S.id); const { defs, axes, variants, def } = L;
  // Шапка
  const head = F('VERTICAL', 20, 72, 80); head.name = 'Шапка'; add(board, head);
  const ST = { beta: ['#e8f0fb', '#1565c0'], draft: ['#fff4e0', '#b26a00'], stable: ['#eaf6ec', '#2e7d32'] }[S.status] || ['#efeff1', INK];
  const hr = F('HORIZONTAL', 12); hr.counterAxisAlignItems = 'CENTER'; add(head, add(hr, T(D.name, 56, 'Bold', INK), chip(S.status, ST[0], ST[1]), level && chip(level, '#efeff1', INK)));
  add(head, T(S.what || 'Назначение в контракте не описано.', 20, 'Regular', INK, 1500));
  const meta = F('HORIZONTAL', 40); add(head, meta);
  for (const [k, v] of [['Платформы', S.platforms], ['Имя в коде', S.codeName], ['Вариантов', String(variants.length)], ['Контракт', S.file]]) if (v) add(meta, add(F('VERTICAL', 4), T(k, 12, 'Semi Bold', GREY), T(v, 15, 'Medium', INK)));
  const skip = (name, why) => skipped.push(name + ' — ' + (why || 'в контракте не описано'));
  // 01
  if (S.use.length || S.dont.length || S.rule.length) { const r = sec('01', 'Когда применять', 'Одна задача — один способ. Если подходит другой компонент, берём его.');
    if (S.use.length) bullets(block(r, 'Когда использовать'), S.use); if (S.dont.length) bullets(block(r, 'Когда не использовать'), S.dont); if (S.rule.length) bullets(block(r, 'Правило выбора варианта'), S.rule);
  } else skip('01 · Когда применять');
  // 02
  { const r = sec('02', 'Превью и анатомия', 'Вариант по умолчанию и состав компонента.'); const st = stage(BASE, RW); st.counterAxisAlignItems = 'CENTER'; add(r, st); const pv = F('HORIZONTAL', 32); pv.counterAxisAlignItems = 'CENTER'; add(st, pv); const pax = axes.find(x => x.name !== 'State');
    const pvs = def.width > 160 || !pax ? [def] : pax.options.map(o => variants.find(x => L.P.get(x)[pax.name] === o && axes.every(q => q === pax || L.P.get(x)[q.name] === L.P.get(def)[q.name]))).filter(Boolean).slice(0, 8); for (const v of pvs) add(pv, inst(v, RW - 96));
    if (S.anatomy.length) { const b = block(r, 'Анатомия'); const w = wrap(RW, 12); add(b, w);
      S.anatomy.forEach((a, i) => { const c = F('HORIZONTAL', 12, 16); c.fills = solid(SOFT); c.cornerRadius = 12; const d = F('HORIZONTAL', 0); d.resize(28, 28); d.primaryAxisSizingMode = 'FIXED'; d.counterAxisSizingMode = 'FIXED'; d.primaryAxisAlignItems = 'CENTER'; d.counterAxisAlignItems = 'CENTER'; d.fills = solid(INK); d.cornerRadius = 14;
        add(w, add(c, add(d, T(String(i + 1), 12, 'Semi Bold', '#ffffff')), T(a, 13, 'Regular', INK, S.anatomy.length > 1 ? 754 : 1596))); });
      if (S.nested) add(b, T('Вложено: ' + S.nested, 13, 'Regular', GREY, RW)); } else skip('02 · Анатомия'); }
  // 03
  { const r = sec('03', 'Свойства и варианты', 'Оси и свойства набора в Figma. Служебные свойства в код не переносятся.'); const rows = [];
    for (const k of Object.keys(defs)) { const d = defs[k]; const name = k.split('#')[0]; let vals = '', dv = String(d.defaultValue);
      if (d.type === 'VARIANT') vals = d.variantOptions.join(' · '); else if (d.type === 'BOOLEAN') { vals = 'On · Off'; dv = d.defaultValue ? 'On' : 'Off'; }
      else if (d.type === 'INSTANCE_SWAP') { const n = await figma.getNodeByIdAsync(d.defaultValue); dv = n ? (n.parent && n.parent.type === 'COMPONENT_SET' ? n.parent.name + ' · ' + n.name : n.name) : '—'; vals = 'любой экземпляр'; } else vals = 'строка';
      rows.push([name, (TYPE[d.type] || d.type) + (SERVICE.includes(name) ? ' · служебное' : ''), vals, dv]); }
    if (rows.length) table(r, [['Свойство', 300], ['Тип', 260], ['Значения', 760], ['По умолчанию', 360]], rows); else add(r, T('У компонента нет осей и свойств: один вариант.', 15, 'Regular', INK, RW)); }
  // 04
  { const r = sec('04', 'Состояния', 'Все варианты набора в светлой и тёмной теме.'); if (S.states.length) bullets(r, S.states);
    for (const [t, name] of [['Light', 'Светлая тема'], ['Dark', 'Тёмная тема']]) { const b = block(r, name + ' · ' + variants.length + ' ' + (variants.length % 10 === 1 && variants.length % 100 !== 11 ? 'вариант' : [2, 3, 4].includes(variants.length % 10) && ![12, 13, 14].includes(variants.length % 100) ? 'варианта' : 'вариантов')); const st = stage({ ...BASE, Theme: t }, RW); add(b, st); add(st, matrix(L, RW - 96)); } }
  // 05
  { const have = SERVICE.filter(n => L.key(n) && defs[L.key(n)].type === 'BOOLEAN');
    if (have.length) { const r = sec('05', 'Зоны', 'Служебные слои: зона нажатия, кольцо фокуса, безопасное поле. Включаются свойствами, в макетах выключены.'); const w = wrap(RW, 16); add(r, w);
      const cells = []; for (const n of have) if (n === 'Show hit area') cells.push([n, 'Web', 'Зона нажатия · указатель (Web)'], [n, 'iOS', 'Зона нажатия · касание (iOS)']); else cells.push([n, 'Web', n === 'Focus ring' ? 'Кольцо фокуса' : 'Безопасное поле']);
      const cw = def.width <= 420 ? 548 : RW;
      for (const [n, pf, label] of cells) { const st = stage({ ...BASE, Platform: pf }, cw, 32); st.counterAxisAlignItems = 'CENTER'; st.clipsContent = false; add(w, st); const lab = cap(label); add(st, lab); lab.layoutAlign = 'STRETCH'; const i = inst(def, cw - 64); add(st, i); try { i.setProperties({ [L.key(n)]: true }); } catch (e) { errors.push('05 ' + n + ': ' + String(e.message || e).slice(0, 80)); } }
    } else skip('05 · Зоны', 'у набора нет служебных свойств Focus ring / Show hit area / Safe margin'); }
  // 06
  { const r = sec('06', 'На поверхностях', 'Компонент на уровнях L0–L3 в обеих темах: фон — `surface/current`.');
    const reps = [def]; const ax = axes.find(a => a.name !== 'State'); if (ax) for (const o of ax.options) { if (reps.length >= 3) break; const v = variants.find(x => x !== def && L.P.get(x)[ax.name] === o && axes.every(a => a === ax || L.P.get(x)[a.name] === L.P.get(def)[a.name])); if (v) reps.push(v); }
    const mw = Math.max(...reps.map(v => v.width)); const cols = mw <= 344 ? 4 : mw <= 768 ? 2 : 1; const cw = (RW - (cols - 1) * 16) / cols;
    for (const [t, name] of [['Light', 'Светлая тема'], ['Dark', 'Тёмная тема']]) { const b = block(r, name); const w = wrap(RW, 16); add(b, w);
      for (const l of ['L0', 'L1', 'L2', 'L3']) { const st = stage({ ...BASE, Theme: t, 'Surface context': l }, cw, 24); st.itemSpacing = 16; add(w, st); add(st, cap(l)); for (const v of reps) add(st, inst(v, cw - 48)); } } }
  // 07
  if ((D.usedIn || []).length) { const r = sec('07', 'Примеры в составе', 'Где компонент вложен в другие компоненты Base: вариант по умолчанию родителя.');
    for (const u of D.usedIn) { const ps = await figma.getNodeByIdAsync(u.id); if (!ps) { errors.push('07 нет ' + u.name); continue; } const pd = ps.type === 'COMPONENT_SET' ? (ps.defaultVariant || ps.children[0]) : ps;
      const b = block(r, 'Внутри ' + u.name); const st = stage(BASE, RW); st.counterAxisAlignItems = 'CENTER'; add(b, st); const pi = inst(pd, RW - 96); add(st, pi); const on = {};
      for (const x of pd.findAll(q => q.type === 'INSTANCE')) { const mc = await x.getMainComponentAsync(); if (!mc || !(mc.id === S.id || (mc.parent && mc.parent.id === S.id))) continue; for (let y = x; y && y !== pd; y = y.parent) { const ref = y.componentPropertyReferences; if (ref && ref.visible) on[ref.visible] = true; } }
      try { if (Object.keys(on).length) pi.setProperties(on); } catch (e) { errors.push('07 ' + u.name + ': ' + String(e.message || e).slice(0, 80)); } }
  } else skip('07 · Примеры в составе', 'набор не вложен в другие компоненты Base: примеры — на экранах (сборка организмов)');
  // 08
  if (S.behavior.length || S.events.length) { const r = sec('08', 'Движение', 'Поведение, переходы и события.'); if (S.behavior.length) bullets(block(r, 'Поведение'), S.behavior); if (S.events.length) bullets(block(r, 'События'), S.events); } else skip('08 · Движение');
  // 09
  if (S.never.length || S.platformNotes.length) { const r = sec('09', 'Правила', 'Чего не делаем с компонентом и что зависит от платформы.');
    if (S.never.length) { const w = wrap(RW, 20); add(r, w); for (const n of S.never) { const c = fixW(F('VERTICAL', 10, 16), 405); c.fills = solid(SOFT); c.cornerRadius = 14; add(w, add(c, chip('✗ Не делаем', '#fdecec', '#c62828'), T(n[0].toUpperCase() + n.slice(1), 14, 'Semi Bold', INK, 373))); } }
    if (S.platformNotes.length) bullets(block(r, 'Платформы'), S.platformNotes); } else skip('09 · Правила');
  // 10
  if (S.a11y.length) { const r = sec('10', 'Доступность', 'Роль, клавиатура, озвучивание.'); const w = wrap(RW, 20); add(r, w); for (const a of S.a11y) { const c = fixW(F('VERTICAL', 0, 16), 830); c.fills = solid(SOFT); c.cornerRadius = 14; add(w, add(c, T(a, 14, 'Regular', INK, 798))); } } else skip('10 · Доступность');
  // 11
  { const r = sec('11', 'Код и токены', 'Проекция в код и токены по слоям. Источник — контракт.');
    if (S.codeLines.length) { const c = fixW(F('VERTICAL', 12, 20), RW); c.fills = solid('#16161a'); c.cornerRadius = 12; add(r, c); add(c, T(S.codeName, 12, 'Semi Bold', '#9b9ba6'));
      const t = figma.createText(); t.fontName = MONO; t.fontSize = 13; t.lineHeight = { unit: 'PERCENT', value: 160 }; t.characters = S.codeLines.join('\n').replace(/`/g, ''); t.fills = solid('#e6e6ea'); t.textAutoResize = 'HEIGHT'; t.resize(RW - 40, t.height); add(c, t); }
    if (S.tokens.length) { const b = block(r, 'Токены по слоям'); table(b, [['Слой', 320], ['Токены', 1360]], S.tokens.map(([a, x]) => ['`' + a + '`', x])); if (S.minmax) add(b, T('Min / max корня: ' + S.minmax, 13, 'Regular', GREY, RW)); if (S.service) add(b, T('Служебные слои: ' + S.service, 13, 'Regular', GREY, RW)); } else skip('11 · Токены');
    if (S.migration.length) bullets(block(r, 'Миграция'), S.migration); }
  // 12
  if (S.content.length) { const r = sec('12', 'Локали и RTL', 'Длинный текст, языки, RTL, масштаб текста.'); bullets(r, S.content);
    const tp = Object.keys(defs).filter(k => defs[k].type === 'TEXT');
    if (tp.length) { const b = block(r, 'Длинный текст в контейнере 560'); const st = stage(BASE, RW); add(b, st); const box = fixW(F('VERTICAL', 0), 560); box.clipsContent = true; add(st, box); const i = inst(def, 560); add(box, i);
      try { await loadFonts(i); i.setProperties(Object.fromEntries(tp.map(k => [k, 'Очень длинный текст, который не помещается в одну строку и должен усечься или перенестись по правилу компонента']))); } catch (e) { errors.push('12: ' + String(e.message || e).slice(0, 80)); } }
  } else skip('12 · Локали и RTL');
  // Остальные наборы страницы
  for (const X of D.sets.slice(1)) { const r = sec('13', 'Набор: ' + X.name, X.what); const LX = await live(X.id);
    if (X.rule.length) bullets(block(r, 'Правило выбора варианта'), X.rule);
    for (const [t, name] of [['Light', 'Светлая тема'], ['Dark', 'Тёмная тема']]) { const st = stage({ ...BASE, Theme: t }, RW); add(block(r, name), st); add(st, matrix(LX, RW - 96)); }
    if (X.tokens.length) table(block(r, 'Токены по слоям'), [['Слой', 320], ['Токены', 1360]], X.tokens.map(([a, x]) => ['`' + a + '`', x])); }
  if (skipped.length) { const s = F('HORIZONTAL', 64, 72, 80); s.name = '— · Не собрано в этой версии'; s.strokes = solid(LINE); s.strokeWeight = 0; s.strokeTopWeight = 1; add(board, s); sections.push(s.name);
    add(s, add(fixW(F('VERTICAL', 12), 400), T('—', 13, 'Semi Bold', GREY), T('Не собрано в этой версии', 30, 'Semi Bold', INK, 400))); bullets(add(s, fixW(F('VERTICAL', 40), RW)).children[1], skipped); }
  if (old && !D.keepOld) { board.x = old.x; board.y = old.y; const arch = D.archive && await figma.getNodeByIdAsync(D.archive); if (arch) { await arch.loadAsync(); let x = 0; for (const ch of arch.children) x = Math.max(x, ch.x + ch.width + 200); arch.appendChild(old); old.x = x; old.y = 0; } else old.remove(); }
  else { let x = 0; for (const ch of page.children) if (ch !== board) x = Math.max(x, ch.x + ch.width + 200); board.x = x; board.y = 0; }
  newId = board.id;
} catch (e) { board.remove(); return { error: String(e.message || e), stack: String(e.stack || '').slice(0, 400) }; }
return { board: newId, w: Math.round(board.width), h: Math.round(board.height), level, sections, skipped, errors };

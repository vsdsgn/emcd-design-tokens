// Миграция строк списков App (24.11): legacy «List» → DS 2.0, принцип «как оригинал».
// ARGS: {src:<id фрейма>}. Запуск — use_figma в файле Migration test, страница с фреймом.
// Правила:
//  - FRAME «List» (Left + Content + Content [+ Right]) → List item M Text first: Label / Description из первой колонки;
//    правая колонка «+0.0001 BTC / подпись» → Amount M Align=End (Sign по знаку, вторая строка — Fiat), иначе клон колонки;
//    Badge и Right (шеврон, toggle) → слот Trailing; Left → иконка монеты в Leading. Поля строки 0, если у legacy 0 (inset).
//    Divider — только если у строки свой разделитель и у родителя нет прямоугольников-разделителей.
//  - Строка настройки с toggle (INSTANCE «List» с toggle внутри, или фрейм «подпись + описание + toggle») → Toggle M,
//    Control position End, Show description; бейдж у названия (Coinhold «🔥 8% APY») → Show badge, Badge Accent Solid.
//    В узкой колонке — оверрайд «Fill и перенос» (OPEN-QUESTIONS, _Selection control, вариант «а»): text / тексты Fill + Auto height,
//    label — Hug (бейдж сразу за названием); поля строки 16 сверху и снизу, как у legacy List.
//  - Не покрыто: иконка-подсказка у названия (ic-info) — в List item места нет, отмечается в gaps; голые radio в абсолютной
//    раскладке (Ручной вывод) — без строки-обёртки не переносятся.
figma.skipInvisibleInstanceChildren = false;
const K = { ListItem: '7c56f6d48a90d21d1761e3670432817039773bdf', Toggle: '905bee526f44521ca81e5662693788344b1b2efe', Amount: '4fb0c93dffedad7d12704f653271d73f8069456b' };
const S = {}; for (const [k, v] of Object.entries(K)) for (let i = 0; i < 4 && !S[k]; i++) { try { S[k] = await figma.importComponentSetByKeyAsync(v); } catch (e) {} }
const V = (s, w) => s.children.find((c) => Object.entries(w).every(([a, b]) => c.variantProperties[a] === b));
const pk = (i, b) => Object.keys(i.componentProperties).find((k) => k.split('#')[0] === b);
const setP = (i, o) => { const p = {}; for (const [b, v] of Object.entries(o)) { const k = pk(i, b); if (k) p[k] = v; } i.setProperties(p); };
const fonts = new Set(); const lf = async (n) => { for (const t of n.findAll((x) => x.type === 'TEXT')) for (const s of t.getStyledTextSegments(['fontName'])) { const k = s.fontName.family + s.fontName.style; if (!fonts.has(k)) { await figma.loadFontAsync(s.fontName); fonts.add(k); } } };
const ys = (n) => n.absoluteTransform[1][2]; const T = (n) => n.findAll((x) => x.type === 'TEXT' && x.visible).sort((a, b) => ys(a) - ys(b));
const place = (old, neu) => { const p = old.parent; p.insertChild(p.children.indexOf(old), neu); if (p.layoutMode && p.layoutMode !== 'NONE') neu.layoutSizingHorizontal = 'FILL'; else { neu.x = old.x; neu.y = old.y; neu.resize(old.width, neu.height); } neu.visible = old.visible; old.remove(); };
const amount = async (lines) => { const m = (lines[0] || '').match(/^([+−-])?\s*(\d[\d .,]*)\s+([A-Z]{2,6})$/); if (!m) return null;
  const a = V(S.Amount, { Size: 'M', Sign: m[1] === '+' ? 'Positive' : m[1] ? 'Negative' : 'None', Align: 'End', State: 'Default', Tone: 'Default' }).createInstance(); await lf(a);
  setP(a, { Value: m[2].trim(), Ticker: m[3], Fiat: lines[1] || '', 'Show fiat': !!lines[1] }); return a; };
const toggleRow = async (old, label, desc, on, badgeText, pad) => {
  const t = V(S.Toggle, { Status: on ? 'On' : 'Off', Size: 'M', 'Control position': 'End', State: 'Default' }).createInstance(); old.parent.appendChild(t); await lf(t);
  const sc = t.findOne((x) => x.name === '_Selection control'); await lf(sc);
  setP(sc, { Label: label, Description: desc || '', 'Show description': !!desc, 'Show badge': !!badgeText });
  if (badgeText) { const b = sc.findAll((x) => x.type === 'INSTANCE').find((x) => /badge/i.test(x.name)); if (b) { await lf(b); setP(b, { Label: badgeText }); const set = (await b.getMainComponentAsync()).parent; const nv = V(set, { ...b.variantProperties, Tone: 'Accent', Style: 'Solid' }); if (nv) b.swapComponent(nv); } }
  place(old, t);
  sc.layoutSizingHorizontal = 'FILL'; const tx = sc.findOne((x) => x.name === 'text'); tx.layoutSizingHorizontal = 'FILL'; const lr = tx.findOne((x) => x.name === 'label row'); if (lr) lr.layoutSizingHorizontal = 'FILL';
  for (const n of tx.findAll((x) => x.type === 'TEXT')) { n.layoutSizingHorizontal = 'FILL'; n.textAutoResize = 'HEIGHT'; }
  const lab = tx.findOne((x) => x.type === 'TEXT' && x.name === 'label'); if (lab) { lab.textAutoResize = 'WIDTH_AND_HEIGHT'; lab.layoutSizingHorizontal = 'HUG'; }
  if (pad) { t.paddingTop = pad; t.paddingBottom = pad; } return t; };
const root = await figma.getNodeByIdAsync(ARGS.src); const res = { rows: 0, toggles: 0, gaps: [] };
const inInst = (n) => { let p = n.parent; while (p && p !== root) { if (p.type === 'INSTANCE') return true; p = p.parent; } return false; };
for (const n of root.findAll((x) => x.name === 'List' && (x.type === 'FRAME' || x.type === 'INSTANCE'))) { if (inInst(n) || !n.visible) continue;
  const kids = n.type === 'FRAME' ? n.children.filter((c) => c.visible) : []; const cont = kids.filter((c) => c.name === 'Content');
  const tog = n.findOne((x) => x.type === 'INSTANCE' && x.name === 'toggle');
  if (tog) { const tl = T(cont[0] || n).filter((t) => !/badge/i.test(t.parent.name)).map((t) => t.characters.trim()); const bd = n.findOne((x) => x.type === 'INSTANCE' && /badge/i.test(x.name));
    await toggleRow(n, tl[0] || '', tl[1] || '', /yes|on|true/i.test(tog.variantProperties.Active || ''), bd ? T(bd).map((t) => t.characters).join(' ') : '', n.paddingTop || 16); res.toggles++; continue; }
  const tl = cont[0] ? T(cont[0]).filter((t) => !/badge/i.test(t.parent.name)).map((t) => t.characters) : []; const tr = cont[1] ? T(cont[1]).map((t) => t.characters) : [];
  const li = V(S.ListItem, { Size: 'M', Content: 'Text first', State: 'Default' }).createInstance(); root.appendChild(li); await lf(li);
  const row = li.exposedInstances.find((e) => e.name === '_List row'); await lf(row);
  const lead = kids.find((c) => c.name === 'Left'); const ownDiv = kids.some((c) => /devider|divider/i.test(c.name)); const parentDiv = n.parent.children.some((c) => c.type === 'RECTANGLE' && c !== n);
  const trail = []; if (tr.length) { const a = await amount(tr); trail.push(a || cont[1].clone()); if (!a) res.gaps.push('правая колонка не сумма: ' + tr[0]); }
  const badge = cont[0] && cont[0].findOne((x) => x.type === 'INSTANCE' && /badge/i.test(x.name)); if (badge) trail.push(badge.clone());
  const right = kids.find((c) => c.name === 'Right'); if (right) trail.push(right.clone());
  if (kids.some((c) => /^ic-info/.test(c.name))) res.gaps.push('«' + (tl[0] || '').trim() + '» — иконка-подсказка у названия');
  setP(row, { Label: (tl[0] || '').trim(), Description: tl[1] || '', 'Show description': !!(tl[1] && tl[1].trim().length > 1), 'Show leading': !!lead, Divider: ownDiv && !parentDiv, 'Show trailing': trail.length > 0 });
  if (lead) { const ic = lead.findOne((x) => x.type === 'INSTANCE' && /^(ic|smbl)/.test(x.name)); const slot = row.findOne((x) => x.type === 'SLOT' && x.name === 'Leading'); if (slot && ic) { for (const c of [...slot.children]) c.remove(); slot.appendChild(ic.clone()); } }
  if (trail.length) { const slot = row.findOne((x) => x.type === 'SLOT' && x.name === 'Trailing'); if (slot) { for (const c of [...slot.children]) c.remove(); for (const t of trail) slot.appendChild(t); } }
  if ((n.paddingLeft || 0) === 0) { row.paddingLeft = 0; row.paddingRight = 0; }
  place(n, li); res.rows++; }
for (const t of root.findAll((x) => x.type === 'INSTANCE' && x.name === 'toggle')) { if (inInst(t)) continue; const par = t.parent; const tx = T(par).map((x) => x.characters);
  await toggleRow(par, tx[0] || '', tx[1] || '', /yes|on/i.test(t.variantProperties.Active || ''), '', 0); res.toggles++; }
return res;

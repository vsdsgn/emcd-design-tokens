// Миграция компонентов, часть 2 (26.11): наборы Monitoring / майнинга / WL / Geometria, которых нет в component-swap.
// ARGS: {src:<id фрейма>, dry, data:{m,k} — карта иконок (как у icon-swap)}. Принцип «как оригинал»: размер по высоте, подпись, иконка, состояние.
// Sidebar item → Nav item; baseCheckbox / checkbox / Checkbox → Checkbox (без подписи); baseToggle / toggle → Toggle (без подписи);
// tab item / tabs/x / navbar-item / #Submenu tab / Menu Item → Tab; baseChip / base --1.5 → Chip;
// поля: input / baseInput / Input / Input & Select / Select White → Input, Select (шеврон), Search (лупа);
// Accordion / accordion --1.5 → Accordion (Open = !Collapsed, текст раскрытого — в слот Content);
// Links → Button Text; base badge status → Status; base badge counter / сounter → Badge Number; Separator → Divider; avatar / avatar group line → Avatar / Avatar group.
// Подробная таблица — docs/migration/component-map-all.csv.
figma.skipInvisibleInstanceChildren = false;
const K = { Nav: '386edb1b1f62d7bddb44a840d85340436d5637ba', Checkbox: 'cae4941d0d68609ffb3903e0a49e5781654a71b8', Toggle: '905bee526f44521ca81e5662693788344b1b2efe', Tab: '0862e584abdf9f0102f5703fb4fce8fa62f5fd18', Chip: '3f74c25f9995add339d0ee560df0f6d00addc344',
  Button: '2be8e84200d3048665f4264661a03d47dc58a2b6', Status: 'b04c86bfec329f25e938fb1eefcfed55f318fc2d', Badge: '8b8e47935737e95ffcef6087d42c4d13dfa0c647', Divider: '819e4a209e67a1aa47225a785f8ac73c5e38cf26', Avatar: '9994f20a363a6e6084adc63705d2f424c7d3e0d5', AvatarGroup: 'e8fdae48a852a165c866feab5df051e5d7324519',
  Input: '8cf45c072502f201cf3ec6e9dc10d4860162b98a', Select: 'a935454f75dba75fec4f039820de48de05c031d7', Search: '5c158f806db5cf294dc41c420c59fc0bad72d0e3', Password: 'c8d1f2e0a1360e810af036068a1b5fda75c74ce3', Accordion: '14c90ff773ffa6f1b721ada334d6e8a0bc533943' };
const SETS = {}; async function set(k) { for (let i = 0; i < 4 && !SETS[k]; i++) { try { SETS[k] = await figma.importComponentSetByKeyAsync(K[k]); } catch (e) {} } return SETS[k]; }
const variant = (s, want) => s.children.find((c) => Object.entries(want).every(([a, b]) => c.variantProperties[a] === b)) || null;
const pk = (inst, base) => Object.keys(inst.componentProperties).find((k) => k.split('#')[0] === base);
// иконки: карта как у icon-swap
const E = (n) => n.replace(/^~/, 'icon/').replace(/^¤/, 'symbol/coin/'); const KEYS = {}; const M = {};
if (ARGS.data) { for (const [n, k] of Object.entries(ARGS.data.k)) KEYS[E(n)] = k; for (const [l, n] of Object.entries(ARGS.data.m)) M[l] = KEYS[E(n)]; }
const norm = (n) => n.replace(/^(ic|smbl)[-_ ]+/i, '').replace(/[-_ ](x\d([,.]\d)?|md|sm|lg|xs)$/i, '').replace(/[_ ]+/g, '-').toLowerCase();
const IC = {}; async function dsIcon(legacy) { const mc = await legacy.getMainComponentAsync(); if (!mc) return null; if (/^(icon|symbol)\//.test(mc.name)) return mc;
  const nm = mc.parent && mc.parent.type === 'COMPONENT_SET' ? mc.parent.name : mc.name; const k = M[nm] || KEYS['icon/' + norm(nm)]; if (!k) return mc;
  if (!IC[k]) { try { IC[k] = await figma.importComponentByKeyAsync(k); } catch (e) { return mc; } } return IC[k]; }
const on = (v) => /^(true|yes|on|active|selected)$/i.test(String(v || ''));
const firstText = (n) => { const t = n.findAll((x) => x.type === 'TEXT' && x.visible).sort((a, b) => a.absoluteTransform[0][2] - b.absoluteTransform[0][2]); return t[0] ? t[0].characters : ''; };
const iconOf = (n) => n.findAll((x) => x.type === 'INSTANCE' && x.visible && x.width <= 32 && x.height <= 32 && !x.findOne((t) => t.type === 'TEXT'))[0] || null;
const sz = (h, map) => map.reduce((b, c) => (Math.abs(c[1] - h) < Math.abs(b[1] - h) ? c : b))[0];
const KIND = (s, vp) => {
  if (s === 'Sidebar item') return 'Nav';
  if (/^(baseCheckbox|checkbox|Checkbox)$/.test(s)) return 'Checkbox';
  if (/^(baseToggle|toggle)$/.test(s)) return 'Toggle';
  if (/^(tab item|tabs\/x|navbar-item|#Submenu tab|Menu Item)$/.test(s)) return 'Tab';
  if (/^baseChip \/ base/.test(s)) return 'Chip';
  // 26.11, решения Стефана: Links → Button Text (текстовая); точка статуса → Status без подписи; счётчики → Badge Number; Separator → Divider
  if (s === 'Links') return 'Button';
  if (s === 'base badge status') return 'Status';
  if (/^(base badge counter|сounter|Counter badge)$/.test(s)) return 'Badge';
  if (s === 'Separator') return 'Divider';
  if (s === 'avatar') return 'Avatar';
  if (/^(Accordion|accordion --1\.5|baseAccordion --1\.5)$/.test(s)) return 'Accordion';
  // 26.11: поля — input / baseInput / Input (App) / Input & Select · input & select (Geometria) / Select White; шеврон → Select, лупа → Search, иначе Input
  if (/^(input|baseInput|Input|Input & Select|input & select|Select White|input \/ --password --v1\.5)$/.test(s)) return 'Field';
  if (s === 'avatar group line') return 'AvatarGroup'; // 26.11: в продуктах это стопка монет («KAS + 1», «Litecoin + 6») → Avatar group Type=Coin; монеты и их число — по тикерам рядом (донастройка — отдельным проходом, см. PLAN-migration)
  return null; };
const root = await figma.getNodeByIdAsync(ARGS.src); const st = { swapped: {}, skipped: {}, errors: [] };
const cands = root.findAll((n) => n.type === 'INSTANCE').filter((i) => { let p = i.parent; while (p && p !== root) { if (p.type === 'INSTANCE') return false; p = p.parent; } return true; });
for (const inst of cands) { try {
  const mc = await inst.getMainComponentAsync(); if (!mc) continue; const s = mc.parent && mc.parent.type === 'COMPONENT_SET' ? mc.parent : mc;
  if (Object.values(K).includes(s.key)) continue; const vp = inst.variantProperties || {}; let kind = KIND(s.name, vp); if (!kind) { st.skipped[s.name] = (st.skipped[s.name] || 0) + 1; continue; }
  const h = Math.round(inst.height), label = firstText(inst), ic = iconOf(inst);
  const act = on(vp.selected ?? vp.active ?? vp.Active ?? vp.status) || /^(Active|Selected)$/.test(vp.State || '');
  const dis = on(vp.disable) || on(vp.Disabled);
  let want = {}, props = [], nested = null;
  if (kind === 'Nav') { want = { Collapsed: 'Off', Selected: act ? 'On' : 'Off', State: 'Default' }; props = [['Label', label], ['Badge', on((inst.componentProperties[pk(inst, 'badge')] || {}).value)]]; }
  if (kind === 'Checkbox') { const sv = String(vp.status || vp.Active || '').toLowerCase(); want = { Status: /indeterm|minus/.test(sv) ? 'Indeterminate' : (sv === 'active' || on(sv)) ? 'On' : 'Off', Tone: on(vp.danger) ? 'Danger' : 'Default', Size: h <= 18 ? 'S' : 'M', 'Control position': 'Start', State: dis ? 'Disabled' : 'Default' }; nested = { 'Show label': !!label && inst.width > 40, Label: label }; }
  if (kind === 'Toggle') { want = { Status: act ? 'On' : 'Off', Size: (vp.size === 'sm' || h <= 24) ? 'S' : 'M', 'Control position': 'End', State: dis ? 'Disabled' : 'Default' }; nested = { 'Show label': false }; }
  if (kind === 'Tab') { want = { Size: sz(h, [['S', 32], ['M', 48], ['L', 56]]), Selected: act ? 'On' : 'Off', State: 'Default' }; props = [['Label', label], ['Icon', !!ic && !label]]; const cb = Object.keys(inst.componentProperties).find((k) => /counter/i.test(k)); if (cb) props.push(['Counter', on(inst.componentProperties[cb].value)]); }
  if (kind === 'Chip') { want = { Size: vp.size === 'sm' || h <= 34 ? 'S' : 'M', Selected: act ? 'On' : 'Off', State: dis ? 'Disabled' : 'Default' }; props = [['Label', label], ['Icon', !!ic]]; }
  const TONE = { danger: 'Danger', error: 'Danger', success: 'Success', warning: 'Warning', attention: 'Warning', brand: 'Accent', accent: 'Accent', info: 'Info', neutral: 'Neutral' };
  const tn = TONE[String(vp.status || vp.Color || '').toLowerCase()];
  if (kind === 'Button') { want = { Type: 'Text', Tone: 'Default', Size: h <= 26 ? 'XS' : h <= 36 ? 'S' : 'M', State: 'Default' }; props = [['Label', label]]; }
  if (kind === 'Status') { want = { Size: h <= 8 ? 'S' : 'M', Tone: tn || 'Neutral' }; props = [['Show label', !!label], ['Label', label]]; }
  if (kind === 'Badge') { want = { Size: 'XS', Tone: tn === 'Danger' || tn === 'Accent' ? tn : 'Neutral', Style: tn === 'Danger' || tn === 'Accent' ? 'Solid' : 'Subtle', State: 'Default', Content: 'Number' }; props = [['Value', label]]; }
  if (kind === 'Divider') { want = { Orientation: inst.width >= inst.height ? 'Horizontal' : 'Vertical', Label: 'Off', Style: 'Solid' }; }
  if (kind === 'Avatar') { want = { Size: sz(inst.width, [['2XS', 16], ['XS', 20], ['S', 24], ['M', 32], ['L', 40], ['XL', 56]]), Type: label ? 'Text' : 'Icon', Network: 'Off', State: 'Default' }; props = [['Initials', label || 'A']]; }
  if (kind === 'AvatarGroup') { const n = inst.findAll((x) => x.type === 'INSTANCE' && x.visible && Math.abs(x.width - x.height) < 1 && x.width >= 14 && x.width <= 44).length; const av = inst.findAll((x) => x.type === 'INSTANCE' && x.visible && Math.abs(x.width - x.height) < 1 && x.width >= 14 && x.width <= 44)[0]; want = { Type: 'Coin', Size: sz(av ? av.width : h, [['XS', 20], ['S', 24], ['M', 32]]), Count: String(Math.min(4, Math.max(2, n || 2))), More: 'Off' }; }
  let accBody = null;
  if (kind === 'Accordion') { const col = String(vp.Collapsed ?? '').toLowerCase(); const open = col ? /^(false|no|off)$/.test(col) : on(vp.open ?? vp.Open); const tt = inst.findAll((x) => x.type === 'TEXT' && x.visible && x.characters.trim()).sort((a, b) => a.absoluteTransform[1][2] - b.absoluteTransform[1][2]);
    want = { Size: root.width <= 460 ? 'M' : 'L', Open: open ? 'On' : 'Off', State: 'Default' }; props = [['Label', tt[0] ? tt[0].characters : label]]; if (open && tt.length > 1) accBody = tt.slice(1).map((t) => t.characters).join('\n'); }
  let fieldPlan = null;
  if (kind === 'Field') {
    const ics = inst.findAll((x) => x.type === 'INSTANCE' && x.visible && x.width <= 32 && x.height <= 32).map((x) => x.name.toLowerCase());
    const isSel = ics.some((n) => /chevron|corner-small-down|select_list_down|arrow.*down/.test(n)) || on((inst.componentProperties[pk(inst, 'Select')] || {}).value) || /select/i.test(vp.Type || vp.type || '');
    const isSearch = !isSel && ics.some((n) => /search|searh/.test(n));
    const isPass = !isSel && (ics.some((n) => /eye|hide/.test(n)) || /password/i.test(s.name + ' ' + (vp.Type || '')));
    const seen = (t) => { for (let p = t; p && p !== inst.parent; p = p.parent) { if (!p.visible || p.opacity === 0) return false; } const fl = Array.isArray(t.fills) ? t.fills.filter((q) => q.visible !== false) : []; return !fl.length || fl.some((q) => (q.opacity ?? 1) > 0.05); };
    const ib = inst.absoluteBoundingBox; const tx = inst.findAll((x) => x.type === 'TEXT' && seen(x) && x.characters.trim()).map((t) => ({ t, y: t.absoluteBoundingBox.y - ib.y, fs: typeof t.fontSize === 'number' ? t.fontSize : 14 }));
    const main = tx.filter((o) => o.fs >= 14).sort((a, b) => b.fs - a.fs || a.y - b.y)[0];
    const small = tx.filter((o) => o !== main);
    const lab = small.find((o) => main && o.y < main.y), help = small.find((o) => main && o.y > main.y + main.t.height);
    // явный признак legacy: Filled=No / False — текст 14+ это плейсхолдер (подпись), значения нет; видимая подпись над текстом — поле с подписью и значением
    const fx = String(vp.Filled ?? '').toLowerCase(); const filled = lab ? true : fx ? /^(yes|true)$/.test(fx) : /^(filled|active|typing)$/i.test(vp.state || vp.State || '');
    const err = /error/i.test(vp.state || vp.State || '') || /^yes$/i.test(vp.Error || '');
    const dis = /disabl/i.test(vp.state || vp.State || '');
    const label = lab ? lab.t.characters : (filled ? '' : (main ? main.t.characters : ''));
    const value = filled && main ? main.t.characters : '';
    const size = h <= 44 ? 'M' : 'L';
    const state = dis ? 'Disabled' : err ? 'Error' : value ? 'Filled' : 'Default';
    if (isSearch) { kind = 'Search'; want = { Size: h <= 36 ? 'S' : 'M', State: 'Default' }; props = [['Text', main ? main.t.characters : '']]; }
    else if (isPass) { kind = 'Password'; want = { State: state }; fieldPlan = { Label: label, 'Show label': !!label, Value: value, _input: { Size: size, 'Label position': 'On border' } }; props = [['Show requirements', false]]; }
    else if (isSel) { kind = 'Select'; want = { Size: size, 'Label position': 'On border', State: state === 'Filled' ? 'Filled' : state }; props = [['Label', label], ['Show label', !!label], ['Value', value]]; }
    else { kind = 'Input'; want = { Size: size, 'Label position': 'On border', State: state }; nested = null; fieldPlan = { Label: label, 'Show label': !!label, Value: value, Helper: help ? help.t.characters : '', 'Show helper': !!help }; }
  }
  const S = await set(kind); const v = variant(S, want); if (!v) { st.errors.push(kind + ' нет варианта ' + JSON.stringify(want)); continue; }
  if (ARGS.dry) { st.swapped[kind] = (st.swapped[kind] || 0) + 1; continue; }
  const icComp = ic ? await dsIcon(ic) : null;
  const keepW = inst.layoutSizingHorizontal, oldW = inst.width, pos = inst.layoutPositioning, ox = inst.x, oy = inst.y, op = inst.opacity;
  inst.swapComponent(v); inst.resetOverrides();
  if (pos === 'ABSOLUTE') { try { inst.layoutPositioning = 'ABSOLUTE'; inst.x = ox; inst.y = oy; } catch (e) {} } inst.opacity = op;
  const P = {}; for (const [b, val] of props) { const k = pk(inst, b); if (k) P[k] = val; }
  if (icComp) { const k = pk(inst, 'Icon · swap'); if (k) P[k] = icComp.id; }
  if (Object.keys(P).length) inst.setProperties(P);
  // Password field: Size и Label position — только у вложенного Input (GOAL-4 M6) — ставим как у соседних полей формы
  if (accBody) { const tx = inst.findOne((x) => x.type === 'TEXT' && x.name === 'text'); if (tx) { try { await figma.loadFontAsync(tx.fontName); tx.characters = accBody; } catch (e) {} } }
  if (fieldPlan && fieldPlan._input) { const ni = inst.findOne((e) => e.type === 'INSTANCE' && e.name === 'Input'); if (ni) { try { ni.setProperties(fieldPlan._input); } catch (e) {} } delete fieldPlan._input; }
  if (fieldPlan) { const fd = inst.exposedInstances.find((e) => e.name === 'Field') || inst.findOne((e) => e.type === 'INSTANCE' && e.name === 'Field'); if (fd) { const p = {}; for (const [b, val] of Object.entries(fieldPlan)) { const k = pk(fd, b); if (k) p[k] = val; } fd.setProperties(p); } }
  if (nested) { const sc = inst.exposedInstances.find((e) => e.name === '_Selection control'); if (sc) { const p = {}; for (const [b, val] of Object.entries(nested)) { const k = pk(sc, b); if (k && val !== '') p[k] = val; } sc.setProperties(p); } }
  // 26.11, решение Стефана: рамка чекбокса видна всегда, в том числе в таблицах (legacy «with box=false» — рамка только при наведении — не переносим)
  if (keepW === 'FILL') { try { inst.layoutSizingHorizontal = 'FILL'; } catch (e) {} }
  else if (kind === 'Nav' || /^(Input|Select|Search|Password|Accordion)$/.test(kind) || kind === 'Tab' && oldW - inst.width > 12) { try { inst.resize(oldW, inst.height); } catch (e) {} }
  st.swapped[kind] = (st.swapped[kind] || 0) + 1;
} catch (e) { st.errors.push(String(e).slice(0, 100)); } }
st.skipped = Object.entries(st.skipped).sort((a, b) => b[1] - a[1]).slice(0, 15); st.errors = st.errors.slice(0, 8); return st;

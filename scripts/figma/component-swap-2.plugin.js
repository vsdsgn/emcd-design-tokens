// Миграция компонентов, часть 2 (26.11): наборы Monitoring / майнинга / WL / Geometria, которых нет в component-swap.
// ARGS: {src:<id фрейма>, dry, data:{m,k} — карта иконок (как у icon-swap)}. Принцип «как оригинал»: размер по высоте, подпись, иконка, состояние.
// Sidebar item → Nav item; baseCheckbox / checkbox / Checkbox → Checkbox (без подписи); baseToggle / toggle → Toggle (без подписи);
// tab item / tabs/x / navbar-item / #Submenu tab / Menu Item → Tab; baseChip / base --1.5 → Chip.
// Подробная таблица — docs/migration/component-map-all.csv.
figma.skipInvisibleInstanceChildren = false;
const K = { Nav: '386edb1b1f62d7bddb44a840d85340436d5637ba', Checkbox: 'cae4941d0d68609ffb3903e0a49e5781654a71b8', Toggle: '905bee526f44521ca81e5662693788344b1b2efe', Tab: '0862e584abdf9f0102f5703fb4fce8fa62f5fd18', Chip: '3f74c25f9995add339d0ee560df0f6d00addc344' };
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
  return null; };
const root = await figma.getNodeByIdAsync(ARGS.src); const st = { swapped: {}, skipped: {}, errors: [] };
const cands = root.findAll((n) => n.type === 'INSTANCE').filter((i) => { let p = i.parent; while (p && p !== root) { if (p.type === 'INSTANCE') return false; p = p.parent; } return true; });
for (const inst of cands) { try {
  const mc = await inst.getMainComponentAsync(); if (!mc) continue; const s = mc.parent && mc.parent.type === 'COMPONENT_SET' ? mc.parent : mc;
  if (Object.values(K).includes(s.key)) continue; const vp = inst.variantProperties || {}; const kind = KIND(s.name, vp); if (!kind) { st.skipped[s.name] = (st.skipped[s.name] || 0) + 1; continue; }
  const h = Math.round(inst.height), label = firstText(inst), ic = iconOf(inst);
  const act = on(vp.selected ?? vp.active ?? vp.Active ?? vp.status) || /^(Active|Selected)$/.test(vp.State || '');
  const dis = on(vp.disable) || on(vp.Disabled);
  let want = {}, props = [], nested = null;
  if (kind === 'Nav') { want = { Collapsed: 'Off', Selected: act ? 'On' : 'Off', State: 'Default' }; props = [['Label', label], ['Badge', on((inst.componentProperties[pk(inst, 'badge')] || {}).value)]]; }
  if (kind === 'Checkbox') { const sv = String(vp.status || vp.Active || '').toLowerCase(); want = { Status: /indeterm|minus/.test(sv) ? 'Indeterminate' : (sv === 'active' || on(sv)) ? 'On' : 'Off', Tone: on(vp.danger) ? 'Danger' : 'Default', Size: h <= 18 ? 'S' : 'M', 'Control position': 'Start', State: dis ? 'Disabled' : 'Default' }; nested = { 'Show label': !!label && inst.width > 40, Label: label }; }
  if (kind === 'Toggle') { want = { Status: act ? 'On' : 'Off', Size: (vp.size === 'sm' || h <= 24) ? 'S' : 'M', 'Control position': 'End', State: dis ? 'Disabled' : 'Default' }; nested = { 'Show label': false }; }
  if (kind === 'Tab') { want = { Size: sz(h, [['S', 32], ['M', 48], ['L', 56]]), Selected: act ? 'On' : 'Off', State: 'Default' }; props = [['Label', label], ['Icon', !!ic && !label]]; const cb = Object.keys(inst.componentProperties).find((k) => /counter/i.test(k)); if (cb) props.push(['Counter', on(inst.componentProperties[cb].value)]); }
  if (kind === 'Chip') { want = { Size: vp.size === 'sm' || h <= 34 ? 'S' : 'M', Selected: act ? 'On' : 'Off', State: dis ? 'Disabled' : 'Default' }; props = [['Label', label], ['Icon', !!ic]]; }
  const S = await set(kind); const v = variant(S, want); if (!v) { st.errors.push(kind + ' нет варианта ' + JSON.stringify(want)); continue; }
  if (ARGS.dry) { st.swapped[kind] = (st.swapped[kind] || 0) + 1; continue; }
  const icComp = ic ? await dsIcon(ic) : null;
  const keepW = inst.layoutSizingHorizontal, oldW = inst.width, pos = inst.layoutPositioning, ox = inst.x, oy = inst.y, op = inst.opacity;
  inst.swapComponent(v); inst.resetOverrides();
  if (pos === 'ABSOLUTE') { try { inst.layoutPositioning = 'ABSOLUTE'; inst.x = ox; inst.y = oy; } catch (e) {} } inst.opacity = op;
  const P = {}; for (const [b, val] of props) { const k = pk(inst, b); if (k) P[k] = val; }
  if (icComp) { const k = pk(inst, 'Icon · swap'); if (k) P[k] = icComp.id; }
  if (Object.keys(P).length) inst.setProperties(P);
  if (nested) { const sc = inst.exposedInstances.find((e) => e.name === '_Selection control'); if (sc) { const p = {}; for (const [b, val] of Object.entries(nested)) { const k = pk(sc, b); if (k && val !== '') p[k] = val; } sc.setProperties(p); } }
  // 26.11: legacy-чекбокс «with box=false» без отметки в оригинале не виден (рамка только при наведении) — оставляем скрытым
  if (kind === 'Checkbox' && vp['with box'] === 'false' && want.Status === 'Off') inst.visible = false;
  if (keepW === 'FILL') { try { inst.layoutSizingHorizontal = 'FILL'; } catch (e) {} }
  else if (kind === 'Nav' || kind === 'Tab' && oldW - inst.width > 12) { try { inst.resize(oldW, inst.height); } catch (e) {} }
  st.swapped[kind] = (st.swapped[kind] || 0) + 1;
} catch (e) { st.errors.push(String(e).slice(0, 100)); } }
st.skipped = Object.entries(st.skipped).sort((a, b) => b[1] - a[1]).slice(0, 15); st.errors = st.errors.slice(0, 8); return st;

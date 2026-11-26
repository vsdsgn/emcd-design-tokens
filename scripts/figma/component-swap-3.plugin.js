// Миграция компонентов, часть 3 (26.11): ещё наборы кнопок майнинга, оверлеи, полосы вкладок (контейнеры), голое радио.
// ARGS: {src:<id фрейма>, dry, data:{m,k} — карта иконок}. Принцип «как оригинал»: размер по высоте, подпись, иконка, состояние; место и ширина прежние.
// Button / Desktop · Button / Mobile · Buttons / Desktop-tablet · button xsmall → Button (без подписи → Icon button): Type Primary → Primary, Secondary → Tertiary,
//   Outline / Stroke → Tertiary outline, Text / Link → Text, Danger / Error → Primary Danger; State Inactive / Disabled → Disabled.
// base overlay · overlay · Overlay → прямоугольник «overlay» с заливкой surface/overlay (компонента не нужно).
// base tabbar --1.5 · navbar-lvl-2 · tabs / fix · tabs (Web) · Tab menu · TabMenu → Tabs: пункты — вложенные tab item / //Tab / navbar tab; размер по высоте (S 32 · M 48 · L 56 · Page 64).
// baseRadio → Radio без подписи.
figma.skipInvisibleInstanceChildren = false;
const K = { Button: '2be8e84200d3048665f4264661a03d47dc58a2b6', IconButton: '316b6554fa0dc6bbb5e07253c6cb92296f62bc44', Tabs: '2663ccdd7adbf5bca76c0e6703952656ca387001', Radio: '7888491bce9f0e35fb6290533e029cf2de842f1b', Chip: '3f74c25f9995add339d0ee560df0f6d00addc344', Segment: '498a3bdf5954fd9f36988dbed26ca36dbd8e02cd' };
const THEME = '663c113f032f46cf39f7641bd6a67133805a2142';
const SETS = {}; async function set(k) { for (let i = 0; i < 4 && !SETS[k]; i++) { try { SETS[k] = await figma.importComponentSetByKeyAsync(K[k]); } catch (e) {} } return SETS[k]; }
const variant = (s, want) => s.children.find((c) => Object.entries(want).every(([a, b]) => c.variantProperties[a] === b)) || null;
const pk = (inst, base) => Object.keys(inst.componentProperties).find((k) => k.split('#')[0] === base);
const E = (n) => n.replace(/^~/, 'icon/').replace(/^¤/, 'symbol/coin/'); const KEYS = {}; const M = {};
if (ARGS.data) { for (const [n, k] of Object.entries(ARGS.data.k)) KEYS[E(n)] = k; for (const [l, n] of Object.entries(ARGS.data.m)) M[l] = KEYS[E(n)]; }
const norm = (n) => n.replace(/^(ic|smbl)[-_ ]+/i, '').replace(/[-_ ](x\d([,.]\d)?|md|sm|lg|xs)$/i, '').replace(/[_ ]+/g, '-').toLowerCase();
const IC = {}; async function dsIcon(legacy) { const mc = await legacy.getMainComponentAsync(); if (!mc) return null; if (/^(icon|symbol)\//.test(mc.name) || /^Network=/.test(mc.name)) return mc;
  const nm = mc.parent && mc.parent.type === 'COMPONENT_SET' ? mc.parent.name : mc.name; const k = M[nm] || KEYS['icon/' + norm(nm)]; if (!k) return mc;
  if (!IC[k]) { try { IC[k] = await figma.importComponentByKeyAsync(k); } catch (e) { return mc; } } return IC[k]; }
let OV = null; async function overlayVar() { if (!OV) { const lib = await figma.teamLibrary.getVariablesInLibraryCollectionAsync(THEME); const v = lib.find((x) => x.name === 'surface/overlay'); OV = await figma.variables.importVariableByKeyAsync(v.key); } return OV; }
const on = (v) => /^(true|yes|on|active|selected)$/i.test(String(v || ''));
const texts = (n) => n.findAll((x) => x.type === 'TEXT' && x.visible && x.characters.trim()).sort((a, b) => a.absoluteTransform[0][2] - b.absoluteTransform[0][2]);
const iconOf = (n) => n.findAll((x) => x.type === 'INSTANCE' && x.visible && x.width <= 32 && x.height <= 32 && !x.findOne((t) => t.type === 'TEXT'))[0] || null;
const sz = (h, map) => map.reduce((b, c) => (Math.abs(c[1] - h) < Math.abs(b[1] - h) ? c : b))[0];
const KIND = (s) => {
  if (/^(Button \/ Desktop|Button \/ Mobile|Buttons \/ Desktop-tablet|button xsmall)$/.test(s)) return 'Button';
  if (/^(base overlay|overlay|Overlay)$/.test(s)) return 'Overlay';
  if (/^(base tabbar --1\.5|navbar-lvl-2|tabs \/ fix|Tab menu|TabMenu)$/.test(s)) return 'Tabs';
  if (s === 'baseRadio') return 'Radio';
  // 26.11: Radiogroup (App, Active / Size) — это чип периода с метой («360 дней · 7%») → Chip; одиночные сегменты (группа-фрейм на 5–6 пунктов) → Segment
  if (s === 'Radiogroup') return 'Chip';
  if (/^base segmented picker item \//.test(s)) return 'Segment';
  return null; };
const root = await figma.getNodeByIdAsync(ARGS.src); const st = { swapped: {}, skipped: {}, errors: [] };
const cands = root.findAll((n) => n.type === 'INSTANCE').filter((i) => { let p = i.parent; while (p && p !== root) { if (p.type === 'INSTANCE') return false; p = p.parent; } return true; });
for (const inst of cands) { try {
  const mc = await inst.getMainComponentAsync(); if (!mc) continue; const s = mc.parent && mc.parent.type === 'COMPONENT_SET' ? mc.parent : mc;
  const vp = inst.variantProperties || {}; let kind = KIND(s.name); if (!kind) continue;
  const h = Math.round(inst.height), keepW = inst.layoutSizingHorizontal, oldW = inst.width, pos = inst.layoutPositioning, ox = inst.x, oy = inst.y, par = inst.parent, idx = par.children.indexOf(inst);
  if (kind === 'Overlay') { if (ARGS.dry) { st.swapped.Overlay = (st.swapped.Overlay || 0) + 1; continue; }
    const r = figma.createRectangle(); r.name = 'overlay'; par.insertChild(idx, r); r.resize(inst.width, inst.height); if (pos === 'ABSOLUTE' || !par.layoutMode || par.layoutMode === 'NONE') { if (pos === 'ABSOLUTE' && par.layoutMode && par.layoutMode !== 'NONE') r.layoutPositioning = 'ABSOLUTE'; r.x = ox; r.y = oy; }
    r.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', await overlayVar())]; r.visible = inst.visible; r.constraints = inst.constraints; inst.remove(); st.swapped.Overlay = (st.swapped.Overlay || 0) + 1; continue; }
  let S, v, props = {};
  if (kind === 'Button') { const T = String(vp.Type || 'Primary'); const tx = texts(inst); const label = tx[0] ? tx[0].characters : ''; const ic = iconOf(inst);
    const dis = /inactive|disabl/i.test(vp.State || ''); const danger = /danger|error/i.test(T);
    const type = /^primary/i.test(T) || danger ? 'Primary' : /outline|stroke/i.test(T) ? 'Tertiary outline' : /text|link|ghost/i.test(T) ? 'Text' : 'Tertiary';
    const size = sz(h, [['XS', 24], ['S', 32], ['M', 40], ['L', 48], ['XL', 56]]);
    if (!label && ic) { kind = 'IconButton'; S = await set('IconButton'); v = variant(S, { Type: type === 'Text' ? 'Ghost' : type, Tone: danger ? 'Danger' : 'Default', Size: sz(h, [['XS', 24], ['S', 32], ['M', 40], ['L', 48]]), Loading: 'False', State: dis ? 'Disabled' : 'Default' });
      props = { Icon: (await dsIcon(ic)).id }; }
    else { S = await set('Button'); v = variant(S, { Type: type, Tone: danger ? 'Danger' : 'Default', Size: size, State: dis ? 'Disabled' : 'Default' }) || variant(S, { Type: type, Tone: 'Default', Size: 'L', State: dis ? 'Disabled' : 'Default' });
      props = { Label: label }; if (ic) { const left = !tx[0] || ic.absoluteTransform[0][2] < tx[0].absoluteTransform[0][2]; props[left ? 'Icon left' : 'Icon right'] = true; props[(left ? 'Icon left' : 'Icon right') + ' · swap'] = (await dsIcon(ic)).id; } } }
  if (kind === 'Radio') { S = await set('Radio'); v = variant(S, { Status: on(vp.active) ? 'On' : 'Off', Tone: on(vp.danger) ? 'Danger' : 'Default', Size: 'M', 'Control position': 'Start', State: on(vp.disable) ? 'Disabled' : 'Default' }); }
  if (kind === 'Chip') { if (!('Active' in vp)) continue; const tx = texts(inst); S = await set('Chip'); v = variant(S, { Size: h <= 34 ? 'S' : 'M', Selected: on(vp.Active) ? 'On' : 'Off', State: 'Default' }); props = { Label: tx[0] ? tx[0].characters : '', Meta: tx.length > 1, 'Meta text': tx[1] ? tx[1].characters : '' }; }
  if (kind === 'Segment') { const tx = texts(inst); S = await set('Segment'); v = variant(S, { Size: sz(h, [['S', 32], ['M', 40], ['L', 48]]), Selected: on(vp.active) ? 'On' : 'Off', Tone: 'Neutral', State: 'Default' }); props = { Label: tx[0] ? tx[0].characters : '', 'Show label': !!tx[0] }; }
  let items = null;
  if (kind === 'Tabs') { items = inst.findAll((x) => x.type === 'INSTANCE' && x.visible && /tab/i.test(x.name) && x.findOne((t) => t.type === 'TEXT' && t.visible))
      .filter((x) => !x.parent || !/tab/i.test(x.parent.name) || x.parent === inst || x.parent.type !== 'INSTANCE')
      .map((x) => { const p = x.variantProperties || {}; const t = texts(x)[0]; const f = t && Array.isArray(t.fills) && t.fills.find((q) => q.visible !== false && q.type === 'SOLID'); return { label: t ? t.characters : '', on: on(p.selected ?? p.Active ?? p.active), x: x.absoluteTransform[0][2], fs: t && typeof t.fontSize === 'number' ? t.fontSize : 14, lum: f ? 0.2126 * f.color.r + 0.7152 * f.color.g + 0.0722 * f.color.b : 0, vid: f && f.boundVariables && f.boundVariables.color ? f.boundVariables.color.id : null }; })
      .filter((x) => x.label).sort((a, b) => a.x - b.x);
    const seen = new Set(); items = items.filter((i) => !seen.has(i.label + i.x) && seen.add(i.label + i.x));
    if (items.length < 2) { st.skipped[s.name] = (st.skipped[s.name] || 0) + 1; continue; } items = items.slice(0, 6); // 26.11: выбранная — по варианту; если вариант не задаёт (navbar-lvl-2: «Tab Phone» = true), — по самому яркому тексту (Dark) / самому тёмному (Light)
    if (items.filter((i) => i.on).length !== 1) { const dark = items.reduce((n, i) => n + i.lum, 0) / items.length > 0.5; const best = items.reduce((b, i) => (dark ? i.lum > b.lum : i.lum < b.lum) ? i : b, items[0]); items.forEach((i) => { i.on = i === best; }); }
    // размер — по кеглю подписи legacy (верхние вкладки Web — текст 18 при высоте 48), иначе по высоте
    const fs = Math.max(...items.map((i) => i.fs)); const size = fs >= 18 ? 'Page' : fs >= 16 ? 'L' : sz(h, [['S', 32], ['M', 48], ['L', 56], ['Page', 64]]);
    S = await set('Tabs'); v = variant(S, { Size: size }); }
  if (!v) { st.errors.push(kind + ' нет варианта · ' + s.name + ' ' + JSON.stringify(vp)); continue; }
  if (ARGS.dry) { st.swapped[kind] = (st.swapped[kind] || 0) + 1; continue; }
  const op = inst.opacity; inst.swapComponent(v); inst.resetOverrides();
  if (pos === 'ABSOLUTE') { try { inst.layoutPositioning = 'ABSOLUTE'; inst.x = ox; inst.y = oy; } catch (e) {} } inst.opacity = op;
  const P = {}; for (const [b, val] of Object.entries(props)) { const k = pk(inst, b); if (k) P[k] = val; } if (Object.keys(P).length) inst.setProperties(P);
  if (kind === 'Radio') { const sc = inst.exposedInstances.find((e) => e.name === '_Selection control'); if (sc) { const k = pk(sc, 'Show label'); if (k) sc.setProperties({ [k]: false }); } }
  if (items) { const bp = {}; for (const n of [3, 4, 5, 6]) { const k = pk(inst, 'Tab ' + n); if (k) bp[k] = items.length >= n; } inst.setProperties(bp);
    const tabs = inst.children.filter((c) => c.type === 'INSTANCE' && c.visible);
    tabs.forEach((tb, j) => { const it = items[j]; if (!it) return; const p = {}; const l = pk(tb, 'Label'), se = pk(tb, 'Selected'), c = pk(tb, 'Counter'); if (l) p[l] = it.label; if (se) p[se] = it.on ? 'On' : 'Off'; if (c) p[c] = false; tb.setProperties(p); }); }
  if (keepW === 'FILL') { try { inst.layoutSizingHorizontal = 'FILL'; } catch (e) {} }
  else if (kind === 'Tabs' || kind === 'Segment' || (kind === 'Button' && oldW - inst.width > 12)) { try { inst.resize(oldW, inst.height); } catch (e) {} }
  // 26.11: в родителе без auto layout позиция после замены съезжала (кнопка «Создать аккаунт») — возвращаем
  if (pos !== 'ABSOLUTE' && (!par.layoutMode || par.layoutMode === 'NONE')) { inst.x = ox; inst.y = oy; }
  st.swapped[kind] = (st.swapped[kind] || 0) + 1;
} catch (e) { st.errors.push(String(e).slice(0, 100)); } }
st.skipped = Object.entries(st.skipped); st.errors = st.errors.slice(0, 8); return st;

// Замена deprecated-наборов на экранах (26.11, решения Стефана п. 1Б и 9). ARGS: {src:<id фрейма/страницы>, dry, limit}.
// Search · deprecated → Input M (Label position Above — без подписи высота 40, как у Search, State как было; у вложенного Field: Show label Off, Show leading On — в Leading icon/search; Value = текст поиска).
// Select compact · deprecated (и язык) → Button Tertiary, Size 1:1, State Open → Pressed; Label = текст; Icon left = монета / иконка из Leading (если был); Icon right = icon/chevron-down.
// Amount · deprecated → detach (тексты на тех же стилях и токенах). media/status (Icons) → media/status (Illustrations), тон 1:1.
// Место, ширина и Fill сохраняются; высота — по новому компоненту.
figma.skipInvisibleInstanceChildren = false;
const K = { Input: '8cf45c072502f201cf3ec6e9dc10d4860162b98a', Button: '2be8e84200d3048665f4264661a03d47dc58a2b6', Media: '550cead7b6b0460f0f9f4074810e13598160ffc0', Chevron: '2dda62352bf8a77be978e6354981718818b7c89c' };
const SETS = {}; async function set(k) { if (!SETS[k]) SETS[k] = await figma.importComponentSetByKeyAsync(K[k]); return SETS[k]; }
const variant = (s, w) => s.children.find((c) => Object.entries(w).every(([a, b]) => c.variantProperties[a] === b));
const pk = (i, b) => Object.keys(i.componentProperties).find((k) => k.split('#')[0] === b);
const val = (i, b) => { const k = pk(i, b); return k ? i.componentProperties[k].value : undefined; };
let CHEV = null;
const root = await figma.getNodeByIdAsync(ARGS.src); const st = { Search: 0, SelectCompact: 0, Amount: 0, Media: 0, errors: [] };
const cands = root.findAllWithCriteria({ types: ['INSTANCE'] }).filter((i) => /^(Search|Select compact|Amount|media\/status|Language|language)/.test(i.name)).slice(0, ARGS.limit || 100000);
for (const i of cands) { try { if (i.removed) continue;
  const mc = await i.getMainComponentAsync(); if (!mc) continue; const sn = mc.parent && mc.parent.type === 'COMPONENT_SET' ? mc.parent.name : mc.name; const vp = mc.variantProperties || {};
  const w = i.width, fillW = i.layoutSizingHorizontal;
  const keepW = () => { try { if (fillW === 'FILL') i.layoutSizingHorizontal = 'FILL'; else i.resize(w, i.height); } catch (e) {} };
  if (/^Search( · deprecated)?$/.test(sn)) { if (ARGS.dry) { st.Search++; continue; }
    const text = val(i, 'Text') || ''; const state = { Default: 'Default', Hover: 'Hover', Focus: 'Focus', Filled: 'Filled', Disabled: 'Disabled' }[vp.State] || 'Default';
    i.swapComponent(variant(await set('Input'), { Size: 'M', 'Label position': 'Above', State: state })); i.resetOverrides();
    const f = i.findOne((n) => n.type === 'INSTANCE' && n.name === 'Field'); const P = {}; for (const [b, v] of [['Show label', false], ['Show leading', true], ['Value', text]]) { const k = pk(f, b); if (k) P[k] = v; } f.setProperties(P);
    keepW(); st.Search++; }
  else if (/^Select compact( · deprecated)?$/.test(sn)) { if (ARGS.dry) { st.SelectCompact++; continue; }
    const text = val(i, 'Text') || ''; const lead = val(i, 'Show leading'); const slot = i.findOne((n) => n.type === 'SLOT' && n.name === 'Leading'); const li = slot && slot.children.find((c) => c.type === 'INSTANCE'); const leadMc = lead && li ? await li.getMainComponentAsync() : null;
    const state = { Default: 'Default', Hover: 'Hover', Pressed: 'Pressed', Open: 'Pressed', Disabled: 'Disabled' }[vp.State] || 'Default';
    i.swapComponent(variant(await set('Button'), { Type: 'Tertiary', Tone: 'Default', Size: vp.Size || 'M', State: state })); i.resetOverrides();
    if (!CHEV) CHEV = await figma.importComponentByKeyAsync(K.Chevron);
    const P = {}; const put = (b, v) => { const k = pk(i, b); if (k) P[k] = v; };
    put('Label', text); put('Icon right', true); put('Icon right · swap', CHEV.id); put('Icon left', !!leadMc); if (leadMc) put('Icon left · swap', leadMc.id); i.setProperties(P);
    keepW(); st.SelectCompact++; }
  else if (/^Amount( · deprecated)?$/.test(sn)) { if (ARGS.dry) { st.Amount++; continue; } let p = i.parent, nested = false; while (p && p !== root) { if (p.type === 'INSTANCE') { nested = true; break; } p = p.parent; } if (nested) continue; i.detachInstance(); st.Amount++; }
  else if (/^media\/status/.test(sn) && mc.remote && !/Illustrations/.test(sn)) { const ms = await set('Media'); if (mc.parent.id === ms.id) continue; if (ARGS.dry) { st.Media++; continue; } i.swapComponent(variant(ms, { Tone: vp.Tone }) || ms.defaultVariant); st.Media++; }
} catch (e) { st.errors.push(i.name + ': ' + String(e).slice(0, 100)); } }
st.errors = st.errors.slice(0, 6); return st;

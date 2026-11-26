// Шапки (26.11): legacy → DS Top bar. ARGS: {src:<id фрейма>, dry, data:{m,k}}.
// navigation bar (App, Lavel=Second): системный статус-бар iOS остаётся (копия legacy, системный слой) + Top bar · App · Inner: «назад», заголовок (Has label), действие справа (Has right icon 1).
//   С вкладками (Has tabs) — пропуск, отдельным правилом.
// Navbar mobile (мобильный веб): Top bar · Mobile web · Root (аккаунт, баланс) + Tabs M из «Navbar item» (подменю раздела); выбранная вкладка — по цвету текста.
// Обёртка «Top bar · …» — вертикальный auto layout на прежнем месте и прежней ширины.
figma.skipInvisibleInstanceChildren = false;
const K = { TopBar: '6dddc8162af403306d12f07053cf3dd1b4a43c35', Tabs: '2663ccdd7adbf5bca76c0e6703952656ca387001' };
const E = (n) => n.replace(/^~/, 'icon/').replace(/^¤/, 'symbol/coin/'); const KEYS = {}; const M = {};
if (ARGS.data) { for (const [n, k] of Object.entries(ARGS.data.k)) KEYS[E(n)] = k; for (const [l, n] of Object.entries(ARGS.data.m)) M[l] = KEYS[E(n)]; }
const pk = (inst, base) => Object.keys(inst.componentProperties).find((k) => k.split('#')[0] === base);
const setP = (inst, o) => { const p = {}; for (const [b, v] of Object.entries(o)) { const k = pk(inst, b); if (k) p[k] = v; } if (Object.keys(p).length) inst.setProperties(p); };
const lum = (t) => { const f = Array.isArray(t.fills) && t.fills.find((q) => q.visible !== false && q.type === 'SOLID'); return f ? 0.2126 * f.color.r + 0.7152 * f.color.g + 0.0722 * f.color.b : 0; };
const SETS = {}; async function set(k) { for (let i = 0; i < 4 && !SETS[k]; i++) { try { SETS[k] = await figma.importComponentSetByKeyAsync(K[k]); } catch (e) {} } return SETS[k]; }
const variant = (s, w) => s.children.find((c) => Object.entries(w).every(([a, b]) => c.variantProperties[a] === b));
const root = await figma.getNodeByIdAsync(ARGS.src); const st = { swapped: {}, skipped: [], errors: [] };
const cands = root.findAll((n) => n.type === 'INSTANCE' && /^(navigation bar|Navbar mobile)$/.test(n.name)).filter((i) => { let p = i.parent; while (p && p !== root) { if (p.type === 'INSTANCE') return false; p = p.parent; } return true; });
for (const old of cands) { try {
  const par = old.parent, idx = par.children.indexOf(old), pos = old.layoutPositioning, x = old.x, y = old.y, w = old.width, fill = old.layoutSizingHorizontal;
  let after = null; const wrap = figma.createAutoLayout('VERTICAL'); wrap.name = 'Top bar · ' + old.name; wrap.fills = []; wrap.itemSpacing = 0;
  if (old.name === 'navigation bar') {
    const prop = (b) => { const k = pk(old, b); return k ? old.componentProperties[k].value : undefined; };
    if (prop('Has tabs') === true) { st.skipped.push('navigation bar с вкладками'); wrap.remove(); continue; }
    if (ARGS.dry) { st.swapped.TopBarInner = (st.swapped.TopBarInner || 0) + 1; wrap.remove(); continue; }
    const sb = old.findOne((n) => n.type === 'INSTANCE' && /status bar/i.test(n.name)); if (sb) { const c = sb.clone(); wrap.appendChild(c); }
    const title = prop('Has label') ? (old.findAll((t) => t.type === 'TEXT').map((t) => t.characters.trim()).find(Boolean) || '') : '';
    const tb = variant(await set('TopBar'), { Platform: 'App', Level: 'Inner' }).createInstance(); wrap.appendChild(tb); setP(tb, { Title: title, 'Show action': !!prop('Has right icon 1') });
    if (!title) { const tt = tb.findOne((n) => n.type === 'TEXT' && n.name === 'title'); if (tt) tt.visible = false; }
    st.swapped.TopBarInner = (st.swapped.TopBarInner || 0) + 1;
  } else {
    const nb = old.findOne((n) => n.name === 'Navbar item'); const tx = old.findAll((t) => t.type === 'TEXT' && t.visible).map((t) => t.characters.trim());
    const items = nb ? nb.findAll((t) => t.type === 'TEXT' && t.visible && t.characters.trim()).sort((a, b) => a.absoluteTransform[0][2] - b.absoluteTransform[0][2]).map((t) => ({ label: t.characters.trim(), l: lum(t) })) : [];
    if (ARGS.dry) { st.swapped.TopBarRoot = (st.swapped.TopBarRoot || 0) + 1; wrap.remove(); continue; }
    const tb = variant(await set('TopBar'), { Platform: 'Mobile web', Level: 'Root' }).createInstance(); wrap.appendChild(tb);
    const acc = tx.find((t) => /^[A-Za-z][\w.-]{2,}$/.test(t)); const bal = tx.find((t) => /^[\d\s,]+$/.test(t) && t.length > 2); const cents = tx.find((t) => /^\.\d+$/.test(t));
    setP(tb, { Account: acc || 'Alexandrewang', Balance: bal ? '$' + bal : '$123 456', Cents: cents || '', 'Show balance': !!bal });
    if (items.length >= 2) { const T = variant(await set('Tabs'), { Size: 'M' }).createInstance(); wrap.appendChild(T);
      // 26.11: свойства вкладок внутри одного прогона не применяются (ни до, ни после вставки) — ставить ОТДЕЛЬНЫМ вызовом use_figma
      //   по данным исходного файла (подписи и выбранная — по ряду и x экрана; см. PLAN-migration «Шапки»)
      after = () => { const bp = {}; for (const n of [3, 4, 5, 6]) { const k = pk(T, 'Tab ' + n); if (k) bp[k] = items.length >= n; } T.setProperties(bp);
        const best = items.reduce((b, i) => (i.l > b.l ? i : b), items[0]); const tabs = T.children.filter((c) => c.type === 'INSTANCE' && c.visible);
        tabs.forEach((t, j) => { const it = items[j]; if (it) setP(t, { Label: it.label, Selected: it === best ? 'On' : 'Off', Counter: false }); }); }; }
    st.swapped.TopBarRoot = (st.swapped.TopBarRoot || 0) + 1;
  }
  par.insertChild(idx, wrap); for (const c of wrap.children) { try { c.layoutSizingHorizontal = 'FILL'; } catch (e) {} }
  if (pos === 'ABSOLUTE' && par.layoutMode && par.layoutMode !== 'NONE') wrap.layoutPositioning = 'ABSOLUTE';
  if (fill === 'FILL') { try { wrap.layoutSizingHorizontal = 'FILL'; } catch (e) {} } else { wrap.counterAxisSizingMode = 'FIXED'; wrap.resize(w, wrap.height); }
  if (!par.layoutMode || par.layoutMode === 'NONE' || pos === 'ABSOLUTE') { wrap.x = x; wrap.y = y; }
  wrap.constraints = old.constraints; wrap.visible = old.visible; old.remove(); if (after) after();
} catch (e) { st.errors.push(String(e).slice(0, 120)); } }
return st;

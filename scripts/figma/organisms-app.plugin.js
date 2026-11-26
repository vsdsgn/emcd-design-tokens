// Организмы App (26.11): нижняя навигация legacy → DS Tab bar. ARGS: {src:<id фрейма>, dry, data:{m,k}}.
// tabbar · --2.0-- tabbar (App EMCD) · BottomNavi (Geometria) → Tab bar: пункты по порядку слева направо — подпись, иконка, выбранный.
// Иконки ic_tabbar_stage (Type) → DS Icons: Home → home, Workers / Mining → lightning, Wallet → wallet, Income → dollar-circle, P2P → exchange,
//   History → history, Profile → user, Statistics / Dashboard → chart-bar, Settings → settings; знак EMCD (ic-emcd-icon) → пункт Type=Action, Brand logo · Mark.
// Высота — Tab bar + safe area платформы (iOS 34); ширина — прежняя. Выбранный — Active=yes у иконки или самый яркий / акцентный текст.
figma.skipInvisibleInstanceChildren = false;
const K = { TabBar: '3acdc5313bf6f0355e40040c1f25f28153cdcd06', Mark: '9fb75b5681e3f1e7bd0e07ee90267c841070b7fe' };
const E = (n) => n.replace(/^~/, 'icon/').replace(/^¤/, 'symbol/coin/'); const KEYS = {};
if (ARGS.data) for (const [n, k] of Object.entries(ARGS.data.k)) KEYS[E(n)] = k;
const MAP = { home: 'home', workers: 'lightning', mining: 'lightning', wallet: 'wallet', income: 'dollar-circle', p2p: 'exchange', 'p2p-2': 'exchange', history: 'history', profile: 'user',
  statistics: 'chart-bar', statistic: 'chart-bar', dashboard: 'chart-bar', settings: 'settings', watcher: 'link', 'watcher link': 'link', referral: 'users' };
const LABEL = { 'главная': 'home', 'майнинг': 'lightning', 'кошелек': 'wallet', 'кошелёк': 'wallet', 'доход': 'dollar-circle', 'p2p': 'exchange', 'история': 'history', 'профиль': 'user',
  'статистика': 'chart-bar', 'дашборд': 'chart-bar', 'воркеры': 'lightning', 'настройки': 'settings', 'watcher link': 'link' };
const GEO = { 'статистика': 'home', 'воркеры': 'devices' };
const IC = {}; async function icon(name) { const k = KEYS['icon/' + name]; if (!k) return null; if (!IC[k]) { try { IC[k] = await figma.importComponentByKeyAsync(k); } catch (e) { return null; } } return IC[k]; }
const pk = (inst, base) => Object.keys(inst.componentProperties).find((k) => k.split('#')[0] === base);
const lum = (t) => { const f = Array.isArray(t.fills) && t.fills.find((q) => q.visible !== false && q.type === 'SOLID'); return f ? { l: 0.2126 * f.color.r + 0.7152 * f.color.g + 0.0722 * f.color.b, sat: Math.max(f.color.r, f.color.g, f.color.b) - Math.min(f.color.r, f.color.g, f.color.b) } : { l: 0, sat: 0 }; };
const root = await figma.getNodeByIdAsync(ARGS.src); const st = { swapped: {}, errors: [] };
let TB = null; for (let i = 0; i < 4 && !TB; i++) { try { TB = await figma.importComponentByKeyAsync(K.TabBar); } catch (e) {} }
const cands = root.findAll((n) => n.type === 'INSTANCE' && /^(tabbar|--2\.0-- tabbar|BottomNavi)$/.test(n.name)).filter((i) => { let p = i.parent; while (p && p !== root) { if (p.type === 'INSTANCE') return false; p = p.parent; } return true; });
for (const old of cands) { try {
  const ob = old.absoluteBoundingBox;
  const tx = old.findAll((t) => t.type === 'TEXT' && t.visible && t.characters.trim() && t.absoluteBoundingBox && t.absoluteBoundingBox.height < 24);
  const items = tx.map((t) => { let p = t.parent; while (p && p !== old && !(p.findAll && p.findAll((x) => x.type === 'INSTANCE' && x.width <= 40).length)) p = p.parent; const ic = p && p !== old ? p.findAll((x) => x.type === 'INSTANCE' && x.width <= 40)[0] : null;
    const vp = ic && ic.variantProperties || {}; const lb = t.characters.trim(); const ty = String(vp.Type || '').toLowerCase();
    const geo = old.name === 'BottomNavi' && GEO[lb.toLowerCase()]; // 26.11: Geometria — свои иконки (Статистика — домик, Воркеры — сервер)
    return { label: lb, x: t.absoluteBoundingBox.x, active: /^(yes|true|on)$/i.test(vp.Active || vp.active || ''), icon: geo || MAP[ty] || LABEL[lb.toLowerCase()] || null, action: ic && /emcd/i.test(ic.name), ...lum(t) }; })
    .sort((a, b) => a.x - b.x).slice(0, 5);
  if (items.length < 3) { st.errors.push('мало пунктов: ' + old.name); continue; }
  // 26.11: в App EMCD центральный пункт — кнопка «E» (знак EMCD поверх, подпись скрыта) → Type=Action
  if (items.length === 5 && /tabbar/.test(old.name)) items[2].action = true;
  if (items.filter((i) => i.active).length !== 1) { const best = items.reduce((b, i) => (i.sat > b.sat || (i.sat === b.sat && i.l > b.l)) ? i : b, items[0]); items.forEach((i) => { i.active = i === best; }); }
  if (ARGS.dry) { st.swapped.TabBar = (st.swapped.TabBar || 0) + 1; continue; }
  const par = old.parent, idx = par.children.indexOf(old), pos = old.layoutPositioning, x = old.x, y = old.y, w = old.width, fill = old.layoutSizingHorizontal;
  const t = TB.createInstance(); par.insertChild(idx, t);
  if (pos === 'ABSOLUTE' && par.layoutMode && par.layoutMode !== 'NONE') t.layoutPositioning = 'ABSOLUTE';
  if (fill === 'FILL') { try { t.layoutSizingHorizontal = 'FILL'; } catch (e) {} } else t.resize(w, t.height);
  if (!par.layoutMode || par.layoutMode === 'NONE' || pos === 'ABSOLUTE') { t.x = x; t.y = y + old.height - t.height; }
  t.constraints = old.constraints;
  const slot = t.findOne((n) => n.type === 'SLOT' && n.name === 'Items'); const its = slot ? slot.children.filter((c) => c.type === 'INSTANCE') : [];
  for (let j = 0; j < its.length; j++) { const it = its[j], d = items[j]; if (!d) { it.remove(); continue; }
    const set = (await it.getMainComponentAsync()).parent; const v = set.children.find((c) => c.variantProperties.Type === (d.action ? 'Action' : 'Item') && c.variantProperties.Selected === (d.active ? 'On' : 'Off') && c.variantProperties.State === 'Default'); if (v) it.swapComponent(v);
    const p = {}; const l = pk(it, 'Label'); if (l) p[l] = d.label; const bd = pk(it, 'Badge dot'); if (bd) p[bd] = false; const ik = pk(it, 'Icon · swap'); if (ik) { const c = d.action ? await figma.importComponentByKeyAsync(K.Mark) : (d.icon ? await icon(d.icon) : null); if (c) p[ik] = c.id; } it.setProperties(p); }
  t.visible = old.visible; old.remove(); st.swapped.TabBar = (st.swapped.TabBar || 0) + 1;
} catch (e) { st.errors.push(String(e).slice(0, 120)); } }
return st;

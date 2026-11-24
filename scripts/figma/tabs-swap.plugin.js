// Миграция вкладок App (24.11): legacy «tabs» (полоса tabs/x, App EMCD) → DS 2.0 Tabs M, принцип «как оригинал».
// ARGS: {src:<id фрейма>}. Запуск — use_figma в файле Migration test.
// Правила (контракт Tabs, ширина 20.11): все вкладки помещаются — делят ширину поровну (Tab — Fill); не помещаются — по содержимому
// с прокруткой, выбранная вкладка сдвигается в зону видимости. Поля 16 — у самих Tabs (разделитель border/subtle на всю ширину).
// Обёртка «Tabs · прокрутка»: подложка surface/level-1, скругление 16 сверху (как legacy), фиксированная высота, обрезка.
// Выбранная — legacy active=yes в зоне видимости (у legacy бывает два active). Шапка экрана поднимается над контентом,
// если корень без auto layout (контент наезжал на 4–5 px и закрывал подчёркивание).
figma.skipInvisibleInstanceChildren = false;
const KEY = '2663ccdd7adbf5bca76c0e6703952656ca387001', THEME = '663c113f032f46cf39f7641bd6a67133805a2142';
let S = null; for (let i = 0; i < 4 && !S; i++) { try { S = await figma.importComponentSetByKeyAsync(KEY); } catch (e) {} }
const lv = (await figma.teamLibrary.getVariablesInLibraryCollectionAsync(THEME)).find((v) => v.name === 'surface/level-1');
let L1 = null; for (let i = 0; i < 4 && !L1; i++) { try { L1 = await figma.variables.importVariableByKeyAsync(lv.key); } catch (e) {} }
const pk = (i, b) => Object.keys(i.componentProperties).find((k) => k.split('#')[0] === b);
const fonts = new Set(); const lf = async (n) => { for (const t of n.findAll((x) => x.type === 'TEXT')) for (const s of t.getStyledTextSegments(['fontName'])) { const k = s.fontName.family + s.fontName.style; if (!fonts.has(k)) { await figma.loadFontAsync(s.fontName); fonts.add(k); } } };
const root = await figma.getNodeByIdAsync(ARGS.src); const old = root.findOne((x) => x.type === 'INSTANCE' && x.name === 'tabs'); if (!old) return { skip: 'нет tabs' };
const items = old.findAll((x) => x.name === 'tabs/x' && x.visible).map((x) => ({ label: (x.findOne((y) => y.type === 'TEXT') || {}).characters || '', on: x.variantProperties.active === 'yes', x: x.absoluteTransform[0][2] - old.absoluteTransform[0][2] }));
const ons = items.filter((i) => i.on); const sel = ons.find((i) => i.x < old.width) || ons[0]; items.forEach((i) => { i.on = i === sel; });
const t = S.children.find((c) => c.variantProperties.Size === 'M').createInstance(); root.appendChild(t); await lf(t);
const bp = {}; for (const k of [3, 4, 5, 6]) bp[pk(t, 'Tab ' + k)] = items.length >= k; t.setProperties(bp);
const tabs = t.children.filter((c) => c.type === 'INSTANCE' && c.visible);
for (let j = 0; j < tabs.length; j++) { const tb = tabs[j]; await lf(tb); const p = { [pk(tb, 'Label')]: items[j].label, [pk(tb, 'Selected')]: items[j].on ? 'On' : 'Off' }; const c = pk(tb, 'Counter'); if (c) p[c] = false; tb.setProperties(p); }
t.paddingLeft = 16; t.paddingRight = 16;
const wrap = figma.createAutoLayout('HORIZONTAL'); wrap.name = 'Tabs · прокрутка'; wrap.clipsContent = true; wrap.topLeftRadius = 16; wrap.topRightRadius = 16;
wrap.fills = [figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 0, g: 0, b: 0 } }, 'color', L1)];
const par = old.parent; par.insertChild(par.children.indexOf(old), wrap); wrap.appendChild(t);
if (par.layoutMode && par.layoutMode !== 'NONE') wrap.layoutSizingHorizontal = 'FILL'; else { wrap.resize(old.width, t.height); wrap.x = old.x; wrap.y = old.y; }
let mode;
if (t.width <= wrap.width) { t.layoutSizingHorizontal = 'FILL'; for (const tb of tabs) tb.layoutSizingHorizontal = 'FILL'; mode = 'поровну'; }
else { const s = tabs[items.findIndex((i) => i.on)]; const shift = Math.max(0, s.x + s.width - (wrap.width - 16)); t.layoutPositioning = 'ABSOLUTE'; wrap.counterAxisSizingMode = 'FIXED'; wrap.resize(wrap.width, t.height); t.x = -shift; t.y = 0; mode = 'прокрутка, сдвиг ' + Math.round(shift); }
old.remove();
if (root.layoutMode === 'NONE') { let h = wrap.parent; while (h.parent !== root) h = h.parent; const x = h.x, y = h.y; const tb = root.children.find((c) => c.name === 'tabbar'); root.appendChild(h); h.x = x; h.y = y; if (tb) root.appendChild(tb); }
return { tabs: items.length, mode, selected: sel && sel.label };

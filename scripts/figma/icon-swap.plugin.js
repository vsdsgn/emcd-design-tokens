// Замена legacy-иконок на экране → DS 2.0 Icons (25.11). ARGS: {src:<id фрейма>, data:{m:{legacy: имя DS}, k:{имя DS: ключ}}, dry}; имена сжаты: «~» = icon/, «¤» = symbol/coin/.
// Данные — scripts/icon-map-build.mjs → docs/migration/icon-map.json + icon-keys.tsv; в Figma лежат текстом в узле «⚑ data · icon-map».
// Поиск: точное имя legacy в карте; затем нормализация (ic-/ic_/smbl- срезаются, суффиксы -x1/-x2/-md/-sm, «_» → «-») и совпадение с icon/<имя>;
// монеты — по тикеру (последнее слово) → symbol/coin/*. Размер — прежний; цвет — переменная, привязанная к legacy-вектору (после миграции цветов), переносится на векторы новой иконки.
// Не трогает экземпляры внутри компонентов DS (их иконки уже DS) и иконки внутри иллюстраций.
// Проверка — сравнить с экраном до замены: монеты по тикеру, положение стрелок, серые (i). Legacy (i) — белый глиф 50 % в круге 7 %: после замены цвет icon/tertiary.
figma.skipInvisibleInstanceChildren = false;
const root = await figma.getNodeByIdAsync(ARGS.src); const E = (n) => n.replace(/^~/, 'icon/').replace(/^¤/, 'symbol/coin/'); const KEYS = {}; for (const [n, k] of Object.entries(ARGS.data.k)) KEYS[E(n)] = k; const M = {}; for (const [l, n] of Object.entries(ARGS.data.m)) M[l] = KEYS[E(n)]; const st = { swapped: 0, byName: {}, miss: {}, err: 0 };
const norm = (n) => n.replace(/^(ic|smbl)[-_ ]+/i, '').replace(/[-_ ](x\d([,.]\d)?|md|sm|lg|xs)$/i, '').replace(/[_ ]+/g, '-').toLowerCase();
const keyFor = (n) => { if (M[n]) return M[n]; const k = norm(n); if (KEYS['icon/' + k]) return KEYS['icon/' + k]; if (/^(smbl|ic)[-_ ]/i.test(n) && /[-_ ][a-z0-9]{2,6}$/i.test(n)) { const t = n.split(/[-_ ]/).pop().toLowerCase(); if (M['_coin:' + t]) return M['_coin:' + t]; } return null; };
const isDS = async (i) => { const mc = await i.getMainComponentAsync(); if (!mc) return false; const s = mc.parent && mc.parent.type === 'COMPONENT_SET' ? mc.parent : mc; return /Status: (beta|stable|draft)/.test(s.description || '') || /^(icon|symbol)\//.test(mc.name); };
let ACC = null; const accentVar = async () => { if (!ACC) { const lib = await figma.teamLibrary.getVariablesInLibraryCollectionAsync('663c113f032f46cf39f7641bd6a67133805a2142'); const k = lib.find((x) => x.name === 'icon/accent'); ACC = k && (await figma.variables.importVariableByKeyAsync(k.key)); } return ACC; };
const comps = {}; const cands = [];
for (const i of root.findAll((n) => n.type === 'INSTANCE')) { try { if (i.width > 48 || i.height > 48) continue; let p = i.parent, inDS = false; while (p && p !== root) { if (p.type === 'INSTANCE' && (await isDS(p))) { inDS = true; break; } p = p.parent; } if (inDS) continue;
  const mc = await i.getMainComponentAsync(); if (!mc || /^(icon|symbol)\//.test(mc.name)) continue; const nm = mc.parent && mc.parent.type === 'COMPONENT_SET' ? mc.parent.name : mc.name; cands.push([i, nm]); } catch (e) { st.err++; } }
for (const [i, nm] of cands) { let k; try { k = keyFor(nm) || keyFor(i.name); } catch (e) { st.err++; continue; } if (!k) { st.miss[nm] = (st.miss[nm] || 0) + 1; continue; }
  if (ARGS.dry) { st.swapped++; st.byName[nm] = (st.byName[nm] || 0) + 1; continue; }
  try { if (!comps[k]) comps[k] = await figma.importComponentByKeyAsync(k);
    const v0 = i.findAll((x) => 'strokes' in x && x.type !== 'INSTANCE').map((x) => [...(x.strokes || []), ...(x.fills || [])]).flat().find((p) => p.boundVariables && p.boundVariables.color);
    const vid = v0 && v0.boundVariables.color.id; const w = i.width, h = i.height; const coin = /^symbol\//.test(comps[k].name);
    // 25.11: resetOverrides НЕ вызываем — у вложенного экземпляра он сбрасывает и саму замену (монета откатывается к умолчанию родителя, BTC),
    // у верхнего — позиционирование ABSOLUTE и прозрачность. Сохраняем их явно.
    const nested = (() => { let p = i.parent; while (p && p !== root) { if (p.type === 'INSTANCE') return true; p = p.parent; } return false; })();
    const pos = !nested && i.layoutPositioning, x = i.x, y = i.y, op = i.opacity;
    i.swapComponent(comps[k]); if (!nested) { if (pos === 'ABSOLUTE') { i.layoutPositioning = 'ABSOLUTE'; i.x = x; i.y = y; } i.opacity = op; }
    try { if (Math.abs(i.width - w) > 0.5 || Math.abs(i.height - h) > 0.5) i.resize(w, h); } catch (e) {}
    if (vid && !coin) { let v = await figma.variables.getVariableByIdAsync(vid);
      // 25.11: переносим только переменную DS 2.0; legacy (не перекрашенная внутри вложенного компонента) → акцент для Brand / Link, иначе цвет иконки DS по умолчанию
      if (v && !v.variableCollectionId.includes('663c113f032f46cf39f7641bd6a67133805a2142')) { v = /brand|link|accent|process/i.test(v.name) ? await accentVar() : null; }
      if (v) for (const x of i.findAll((y) => y.type === 'VECTOR' || y.type === 'BOOLEAN_OPERATION')) { if (x.strokes && x.strokes.length) x.strokes = x.strokes.map((p) => figma.variables.setBoundVariableForPaint(p, 'color', v)); if (x.fills && x.fills.length && x.fills.some((p) => p.type === 'SOLID')) x.fills = x.fills.map((p) => p.type === 'SOLID' ? figma.variables.setBoundVariableForPaint(p, 'color', v) : p); } }
    st.swapped++; st.byName[nm] = (st.byName[nm] || 0) + 1; } catch (e) { st.err++; } }
st.byName = Object.entries(st.byName).sort((a, b) => b[1] - a[1]).slice(0, 15); st.miss = Object.entries(st.miss).sort((a, b) => b[1] - a[1]).slice(0, 25); return st;

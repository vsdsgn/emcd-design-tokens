// Манифест компонентов (read-only). Запуск: Figma → Components → use_figma, без записи. Сборка: scripts/manifest-build.mjs → docs/ds-manifest.json.
// На набор: описание (Status), оси и значения, варианты против полного произведения, свойства (тип, дефолт, привязано в n из N),
// вложенные экземпляры, токены по слоям (объединение по вариантам), непривязанные значения, min/max корня,
// служебные слои (focus ring, hit area · web|app, safe margin / safe area), борда и её разделы.
// Ответ use_figma ≤ 20 KB: вывод режется на куски, CHUNK = номер куска; первая строка «chunk i/N».
// Каждый ответ сохранить как <батч>.<кусок>.txt (батч: A* атомы, M* молекулы, O* организмы), затем node scripts/manifest-build.mjs <папка>.
const PAGES = ['320:11']; // id страниц (несколько маленьких можно вместе)
const CHUNK = 0; const CHUNK_SIZE = 18500;
figma.skipInvisibleInstanceChildren = false;
const cache = {}; const vn = async id => { if (!(id in cache)) { const v = await figma.variables.getVariableByIdAsync(id); cache[id] = v ? v.name : '?'; } return cache[id]; };
const SHORT = { fills: 'f', strokes: 's', itemSpacing: 'gap', counterAxisSpacing: 'gap2', width: 'w', height: 'h', minWidth: 'minw', maxWidth: 'maxw', minHeight: 'minh', maxHeight: 'maxh', opacity: 'o' };
const sk = k => SHORT[k] || (/^padding/.test(k) ? 'p' : /Radius$/.test(k) ? 'r' : /^stroke.*Weight$/.test(k) ? 'sw' : k);
const walk = (n, inst, fn) => { if (n.type === 'INSTANCE' && inst) { fn(n, true); return; } fn(n, false); if (n.children) for (const c of n.children) walk(c, true, fn); };
const KEY = /^(control|box|track|thumb|dot|mark|check|indicator|pill|body|field|hit area.*|focus ring)$/i;
const hex = c => '#' + [c.r, c.g, c.b].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('');
const num = x => Math.round(x * 100) / 100;
const out = [];
for (const pid of PAGES) {
  const pg = await figma.getNodeByIdAsync(pid); if (!pg || pg.type !== 'PAGE') { out.push({ page: null, id: pid }); continue; } await figma.setCurrentPageAsync(pg);
  const board = pg.children.filter(n => /— борда/.test(n.name)).map(b => ({ name: b.name, id: b.id, sections: (b.children || []).map(c => c.name) }));
  const P = { page: pg.name, id: pg.id, board, top: pg.children.filter(n => !/— борда/.test(n.name)).map(n => n.type[0] + ':' + n.name).slice(0, 12), sets: [] };
  const sets = pg.findAll(n => n.type === 'COMPONENT_SET' || (n.type === 'COMPONENT' && n.parent.type !== 'COMPONENT_SET'));
  for (const s of sets) {
    const isSet = s.type === 'COMPONENT_SET'; const vars = isSet ? s.children.filter(c => c.type === 'COMPONENT') : [s];
    const defs = s.componentPropertyDefinitions; const d = (s.description || '').trim();
    const axes = {}; let full = 1; const props = [];
    for (const [k, df] of Object.entries(defs)) {
      if (df.type === 'VARIANT') { axes[k] = df.variantOptions; full *= df.variantOptions.length; continue; }
      let def = df.defaultValue; if (df.type === 'INSTANCE_SWAP') { const c = await figma.getNodeByIdAsync(def); def = c ? (c.parent && c.parent.type === 'COMPONENT_SET' ? c.parent.name + ' / ' : '') + c.name : '?'; }
      const bound = vars.filter(v => v.findAll(n => n.componentPropertyReferences && Object.values(n.componentPropertyReferences).includes(k)).length > 0).length;
      props.push({ name: k.split('#')[0], type: df.type, def, bound });
    }
    const tokens = {}, raw = new Set(), nested = {}, mm = new Set(), lay = { ring: 0, hitWeb: 0, hitApp: 0, hit: 0, safe: 0 }; let rawCount = 0;
    const addRaw = (n, m) => { rawCount++; if (raw.size < 30) raw.add((n.parent.type === 'COMPONENT_SET' || n === s ? '(root)' : n.name) + ':' + m); };
    for (const v of vars) {
      const seen = {}; const nodes = []; walk(v, false, (n, isNested) => nodes.push([n, isNested]));
      for (const [n, isNested] of nodes) {
        if (/^focus ring$/i.test(n.name)) seen.ring = 1; if (/^hit area · web/i.test(n.name)) seen.hitWeb = 1; else if (/^hit area · app/i.test(n.name)) seen.hitApp = 1; else if (/^hit area/i.test(n.name)) seen.hit = 1; if (/safe (margin|area)/i.test(n.name)) seen.safe = 1;
        if (isNested) { const m = await n.getMainComponentAsync(); const nm = m ? (m.parent && m.parent.type === 'COMPONENT_SET' ? m.parent.name : m.name) : '?'; if (!/^(icon|ic)\//i.test(nm)) nested[nm] = (nested[nm] || 0) + 1; else nested['(icons)'] = (nested['(icons)'] || 0) + 1; }
        const b = n.boundVariables || {}; const ln = n === v ? '(root)' : n.name; const t = tokens[ln] = tokens[ln] || new Set();
        for (const [k, val] of Object.entries(b)) for (const a of (Array.isArray(val) ? val : [val])) if (a && a.id) t.add(sk(k) + ':' + await vn(a.id));
        if (n === v) for (const k of ['minWidth', 'maxWidth', 'minHeight', 'maxHeight']) if (n[k] != null) mm.add(sk(k) + '=' + num(n[k]) + (b[k] ? ' ' + await vn(b[k].id) : ' RAW'));
        if (isNested || n.visible === false) continue;
        for (const kk of ['fills', 'strokes']) if (Array.isArray(n[kk])) n[kk].forEach((p, i) => { if (p.visible !== false && p.type === 'SOLID' && !(p.boundVariables && p.boundVariables.color)) addRaw(n, sk(kk) + '=' + hex(p.color)); });
        if (n.layoutMode && n.layoutMode !== 'NONE') { for (const k of ['paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom']) if (n[k] && !b[k]) addRaw(n, 'p=' + num(n[k])); if (n.itemSpacing && !b.itemSpacing && n.children.length > 1 && n.primaryAxisAlignItems !== 'SPACE_BETWEEN') addRaw(n, 'gap=' + num(n.itemSpacing)); }
        if (typeof n.topLeftRadius === 'number' && n.topLeftRadius > 0 && !b.topLeftRadius) addRaw(n, 'r=' + num(n.topLeftRadius));
        if (Array.isArray(n.strokes) && n.strokes.some(p => p.visible !== false)) { const w = typeof n.strokeTopWeight === 'number' ? n.strokeTopWeight : n.strokeWeight; if (typeof w === 'number' && w > 0 && !b.strokeTopWeight && !b.strokeWeight) addRaw(n, 'sw=' + num(w)); }
        if (typeof n.opacity === 'number' && n.opacity < 1 && !b.opacity) addRaw(n, 'o=' + num(n.opacity));
        if (n.type !== 'TEXT' && (n === v || KEY.test(n.name))) for (const [k, sz] of [['width', n.layoutSizingHorizontal], ['height', n.layoutSizingVertical]]) if (sz !== 'FILL' && sz !== 'HUG' && !b[k]) addRaw(n, sk(k) + '=' + num(n[k]));
        if (n.type === 'TEXT' && !(typeof n.textStyleId === 'string' && n.textStyleId) && !b.fontSize) addRaw(n, 'font=raw');
      }
      for (const k of Object.keys(seen)) lay[k]++;
    }
    const tk = {}; for (const [k, set] of Object.entries(tokens)) if (set.size) tk[k] = [...set].sort();
    P.sets.push({ name: s.name, id: s.id, type: isSet ? 'SET' : 'COMPONENT', status: (d.split('\n')[0] || '').slice(0, 60), descLen: d.length,
      descHeads: d.split('\n').map(l => (l.match(/^[^:.—]{2,24}[:.—]/) || [''])[0]).filter(Boolean).slice(0, 12),
      inBoard: (() => { let c = s.parent; while (c && c.type !== 'PAGE') { if (/— борда/.test(c.name)) return true; c = c.parent; } return false; })(),
      axes, variants: vars.length, full, props, nested, minmax: [...mm], layers: lay, rawCount, raw: [...raw], tokens: tk });
  }
  out.push(P);
}
const json = JSON.stringify(out); const n = Math.ceil(json.length / CHUNK_SIZE);
return 'chunk ' + CHUNK + '/' + n + '\n' + json.slice(CHUNK * CHUNK_SIZE, (CHUNK + 1) * CHUNK_SIZE);

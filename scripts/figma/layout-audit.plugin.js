// Аудит вёрстки экранов (Figma, use_figma): ARGS = { page: '<id страницы>', filter: 'DS 2\\.0$' }.
// Ловит то, что 20.11 нашлось на экранах майнинга глазами (patterns 0.3):
//  OVER       — элемент вылезает за поле родителя (padding box) в автолейауте;
//  COLLAPSED  — свой фрейм FIXED по высоте ниже содержимого (колонки «высотой 10», поля 18);
//  RAW        — отступ / зазор своего фрейма без токена space/*;
//  TABLE      — ширины колонок шапки ≠ ширины ячеек строк, выравнивание содержимого ячейки ≠ шапке;
//  WORD-BREAK — слово шире текстового блока (перенос по буквам);
//  COIN       — символ монеты не совпадает с подписью (KAS с Tether).
// Внутренние слои экземпляров не трогает и не судит (кроме содержимого слотов).
await figma.setCurrentPageAsync(await figma.getNodeByIdAsync(ARGS.page));
const re = new RegExp(ARGS.filter || 'DS 2\\.0$');
const frames = figma.currentPage.children.filter((n) => n.type === 'FRAME' && re.test(n.name));
const inInst = (n) => { let p = n.parent; while (p && p.type !== 'PAGE') { if (p.type === 'INSTANCE') return true; p = p.parent; } return false; };
const own = (n) => !inInst(n) || (n.parent && n.parent.type === 'SLOT');
const TK = { 'tether-usdt': 'USDT', 'kaspa-kas': 'KAS', 'bitcoin-btc': 'BTC', 'litecoin-ltc': 'LTC', 'dogecoin-doge': 'DOGE', 'ethereum-eth': 'ETH' };
const out = {};
for (const f of frames) {
  const iss = [];
  for (const n of f.findAll((x) => x.visible && (x.type === 'FRAME' || x.type === 'INSTANCE'))) {
    const p = n.parent;
    if (!own(n) || !p || !('layoutMode' in p) || p.layoutMode === 'NONE' || n.layoutPositioning === 'ABSOLUTE') continue;
    if (/chips|scroll|track|Slides|carousel|tabs/i.test(p.name) || /chips/i.test(n.name)) continue;
    const pb = p.absoluteBoundingBox, b = n.absoluteBoundingBox; if (!pb || !b) continue;
    const L = pb.x + (p.paddingLeft || 0), R = pb.x + pb.width - (p.paddingRight || 0);
    if (b.x < L - 2 || b.x + b.width > R + 2) iss.push(`OVER ${n.name} в ${p.name}: ${Math.round(b.x - pb.x)}..${Math.round(b.x + b.width - pb.x)}`);
    if (n.type === 'FRAME' && n.layoutMode && n.layoutMode !== 'NONE') {
      for (const k of ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'itemSpacing']) if (n[k] > 0 && !(n.boundVariables && n.boundVariables[k])) iss.push(`RAW ${n.name} ${k}=${n[k]}`);
      const kids = n.children.filter((c) => c.visible && c.layoutPositioning !== 'ABSOLUTE');
      if (n.layoutSizingVertical === 'FIXED' && kids.length) {
        const need = n.layoutMode === 'VERTICAL' ? kids.reduce((a, c) => a + c.height, 0) + n.itemSpacing * (kids.length - 1) + n.paddingTop + n.paddingBottom : Math.max(...kids.map((c) => c.height)) + n.paddingTop + n.paddingBottom;
        if (need > n.height + 1) iss.push(`COLLAPSED ${n.name} ${Math.round(n.height)} < ${Math.round(need)}`);
      }
    }
  }
  for (const h of f.findAll((n) => n.name === 'header row' && n.children.some((c) => /header cell/i.test(c.name)))) {
    const heads = h.children.filter((c) => c.visible);
    const row = h.parent.children.find((c) => c.type === 'INSTANCE' && /Table row/.test(c.name) && c.visible); if (!row) continue;
    const cells = row.children.filter((c) => c.visible && c.type === 'INSTANCE' && !/hit|focus|safe|state/.test(c.name));
    if (cells.length !== heads.length) { iss.push(`TABLE колонок: шапка ${heads.length}, строка ${cells.length}`); continue; }
    heads.forEach((hd, i) => {
      if (Math.abs(hd.width - cells[i].width) > 1) iss.push(`TABLE ширина колонки ${i + 1}: шапка ${Math.round(hd.width)}, ячейка ${Math.round(cells[i].width)}`);
      const al = hd.componentProperties && hd.componentProperties.Align && hd.componentProperties.Align.value;
      const slot = cells[i].findOne((x) => x.type === 'SLOT');
      if (al && slot && slot.counterAxisAlignItems !== (al === 'End' ? 'MAX' : 'MIN')) iss.push(`TABLE выравнивание колонки ${i + 1}: шапка ${al}, ячейка ${slot.counterAxisAlignItems}`);
    });
  }
  for (const t of f.findAll((x) => x.type === 'TEXT' && x.visible && x.textAutoResize !== 'WIDTH_AND_HEIGHT')) {
    const fs = typeof t.fontSize === 'number' ? t.fontSize : 14;
    const longest = Math.max(0, ...t.characters.split(/\s+/).map((w) => w.length));
    if (longest * fs * 0.48 > t.width + 2) iss.push(`WORD-BREAK "${t.characters.slice(0, 24)}" w${Math.round(t.width)}`);
  }
  for (const s of f.findAll((n) => n.type === 'INSTANCE' && /^(Select compact|Select)$/.test(n.name))) {
    const syms = [];
    for (const c of s.findAll((x) => x.type === 'INSTANCE' && x.visible)) { const m = await c.getMainComponentAsync(); if (m && /^symbol\/coin\//.test(m.name)) syms.push(m.name.slice(12)); }
    const txt = s.findAll((x) => x.type === 'TEXT' && x.visible).map((t) => t.characters).join(' ').toUpperCase();
    if (syms.length && !/\+\s?\d/.test(txt) && !syms.some((x) => txt.includes(TK[x] || x.toUpperCase()) || txt.includes(x.split('-')[0].toUpperCase()))) iss.push(`COIN "${txt.slice(0, 20)}" ← ${syms.join(',')}`);
  }
  out[f.name] = iss;
}
return out;

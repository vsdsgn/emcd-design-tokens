// Геометрия Chart plot для DsChartPlot — та же, что в packages/react/src/index.js (ChartPlot): шкала «круглых» делений, столбцы, линии, области, подписи осей, hover (перекрестие + тултип).
export function chartScale(max, ticks = 4, fixed) {
  if (fixed && fixed.length) { const m = Math.max(...fixed); return { max: m || 1, ticks: fixed, digits: Math.max(0, ...fixed.map((t) => (String(t).split('.')[1] || '').length)) }; }
  const raw = (Number(max) > 0 ? Number(max) : 1) / ticks; // нет данных — шкала 0…1
  const p = Math.pow(10, Math.floor(Math.log10(raw)));
  const step = [1, 2, 2.5, 5, 10].map((k) => k * p).find((s) => s >= raw - 1e-12) || 10 * p;
  const digits = step >= 1 ? 0 : (String(+step.toFixed(6)).split('.')[1] || '').length;
  return { max: step * ticks, ticks: Array.from({ length: ticks + 1 }, (_, i) => +(i * step).toFixed(6)), digits };
}
const KIND = { bars: ['bar'], line: ['line'], area: ['area'], 'line-bars': ['line', 'bar'], 'multi-line': ['line'], 'dual-area': ['area', 'area'], 'stacked-bars': ['stack'] };
// → { W, H, n, L, R, grid: [y], marks: [{ tag, key, cls, attrs }], xl: [{ key, left, text }], left: [{ t, top, text }], right: [...], skeleton, empty, hoverAt(k) }
export function chartModel({ type = 'bars', series = [], labels = [], xTicks = 6, yLeft, yRight, format, height = 200, state = 'default', dates, times, valueFormat }) {
  const W = 1000; const H = Number(height) || 200;
  const kinds = KIND[type] || KIND.bars;
  const n = Math.max(1, ...series.map((s) => (s.data || []).length), labels.length);
  const slot = W / n;
  const dual = type === 'line-bars' || type === 'dual-area';
  const kindOf = (i) => (type === 'stacked-bars' ? 'stack' : kinds[Math.min(i, kinds.length - 1)]);
  const axisOf = (i) => (dual && i === 1 ? 'right' : 'left');
  const colorOf = (i) => (dual && i === 1 ? 4 : i + 1);
  const maxOf = (axis) => (type === 'stacked-bars'
    ? Math.max(0, ...Array.from({ length: n }, (_, k) => series.reduce((a, s) => a + (Number((s.data || [])[k]) || 0), 0)))
    : Math.max(0, ...series.filter((_, i) => axisOf(i) === axis).flatMap((s) => (s.data || []).map(Number).filter(Number.isFinite))));
  const L = chartScale(maxOf('left'), 4, yLeft && yLeft.ticks);
  const R = dual ? chartScale(maxOf('right'), 4, yRight && yRight.ticks) : null;
  const fmt = (v, axis, sc) => (format ? format(v, axis) : v === 0 ? '0' : v.toFixed(sc.digits));
  const y = (v, sc) => H - (Math.max(0, Number(v) || 0) / sc.max) * H;
  const x = (k) => (k + 0.5) * slot;
  const skeleton = state === 'skeleton';
  const empty = state === 'empty' || (!skeleton && !series.some((s) => (s.data || []).length));
  const barKind = kinds[0] === 'bar' || kinds[0] === 'stack';
  const bars = series.map((s, i) => i).filter((i) => kindOf(i) === 'bar');
  const marks = [];
  if (skeleton) {
    if (barKind) { const m = n > 1 ? Math.min(n, 24) : 12; const w = W / m; for (let k = 0; k < m; k++) { const v = 0.35 + 0.25 * ((k % 4) / 3); marks.push({ tag: 'rect', key: 'k' + k, cls: 'emcd-chart-plot__bone', attrs: { x: k * w + w * 0.3, y: H * (1 - v), width: w * 0.4, height: H * v } }); } }
    else marks.push({ tag: 'path', key: 'k', cls: 'emcd-chart-plot__bone', attrs: { d: `M0 ${H * 0.55} C ${W * 0.2} ${H * 0.25}, ${W * 0.35} ${H * 0.75}, ${W * 0.55} ${H * 0.45} S ${W * 0.85} ${H * 0.3}, ${W} ${H * 0.5} L ${W} ${H} L 0 ${H} Z` } });
  } else if (!empty) {
    const bw = slot * (type === 'stacked-bars' ? 0.5 : 0.45) / Math.max(1, bars.length);
    const base = new Array(n).fill(0);
    series.forEach((s, i) => {
      const kind = kindOf(i); const sc = axisOf(i) === 'right' ? R : L; const d = s.data || [];
      const cls = `emcd-chart-plot__series emcd-chart-plot__series--${colorOf(i)}`;
      if (kind === 'bar') { const j = bars.indexOf(i); d.forEach((v, k) => { const top = y(v, sc); marks.push({ tag: 'rect', key: `b${i}-${k}`, cls: cls + ' emcd-chart-plot__bar', attrs: { x: x(k) - (bw * bars.length) / 2 + j * bw, y: top, width: bw, height: H - top } }); }); }
      else if (kind === 'stack') d.forEach((v, k) => { const top = y(base[k] + (Number(v) || 0), sc); const bot = y(base[k], sc); base[k] += Number(v) || 0; marks.push({ tag: 'rect', key: `s${i}-${k}`, cls: cls + ' emcd-chart-plot__bar', attrs: { x: x(k) - bw / 2, y: top, width: bw, height: bot - top } }); });
      else {
        const pts = d.map((v, k) => `${x(k).toFixed(1)} ${y(v, sc).toFixed(1)}`);
        if (!pts.length) return;
        if (kind === 'area') marks.push({ tag: 'path', key: `a${i}`, cls: cls + ' emcd-chart-plot__area', attrs: { d: `M${x(0).toFixed(1)} ${H} L${pts.join(' L')} L${x(d.length - 1).toFixed(1)} ${H} Z` } });
        marks.push({ tag: 'path', key: `l${i}`, cls: cls + ' emcd-chart-plot__line' + (i >= 4 ? ` emcd-chart-plot__line--dash-${i + 1}` : ''), attrs: { d: 'M' + pts.join(' L') } });
      }
    });
  }
  marks.sort((a, b) => (a.cls.includes('__line') ? 1 : 0) - (b.cls.includes('__line') ? 1 : 0)); // линии — поверх столбцов и областей
  const filled = labels.map((t, k) => (t != null && t !== '' ? k : -1)).filter((k) => k >= 0);
  const step = Math.max(1, Math.ceil(filled.length / Math.max(1, xTicks)));
  const xl = filled.filter((_, j) => j % step === 0).map((k) => ({ key: k, left: ((k + 0.5) / n) * 100 + '%', text: labels[k] }));
  const ticks = (sc, side) => (skeleton || empty ? [] : sc.ticks.map((t) => ({ t, top: (1 - t / sc.max) * 100 + '%', text: fmt(t, side, sc) })));
  const grid = skeleton && !barKind ? [] : L.ticks.map((t) => y(t, L));
  // Hover: точка k → Chart crosshair (линии — точки серий, столбцы — полоса) + строки Chart tooltip + текст для aria-live
  const band = kinds[0] === 'bar' || kinds[0] === 'stack';
  const name = (s, i) => s.name ?? `Серия ${i + 1}`;
  const value = (s, i, v) => (v == null || v === '' ? '—' : s.format ? s.format(v) : valueFormat ? valueFormat(v, i) : `${v}${s.unit ? ' ' + s.unit : ''}`);
  const hoverAt = (k) => {
    const x = ((k + 0.5) / n) * 100;
    const points = band ? [] : series.map((s, i) => [s, i]).filter(([, i]) => kindOf(i) === 'line' || kindOf(i) === 'area')
      .map(([s, i]) => ({ v: (s.data || [])[k], i })).filter((p) => p.v != null && Number.isFinite(Number(p.v)))
      .map((p) => ({ series: colorOf(p.i), y: (y(p.v, axisOf(p.i) === 'right' ? R : L) / H) * 100 }));
    const rows = series.map((s, i) => ({ label: name(s, i), value: value(s, i, (s.data || [])[k]), series: colorOf(i), marker: s.marker }));
    const date = dates ? dates[k] : labels[k];
    const time = times ? times[k] : undefined;
    const summary = [date, time, ...rows.map((r) => `${r.label} ${r.value}`)].filter((t) => t != null && t !== '').join(', ');
    return { x, target: band ? 'bar' : 'line', band: (band ? 70 : 0) / n, points, rows, date, time, summary };
  };
  return { W, H, n, L, R, grid, marks, xl: skeleton || empty ? [] : xl, left: ticks(L, 'left'), right: R ? ticks(R, 'right') : [], skeleton, empty, hoverAt };
}

// Тултип у выбранной точки: справа от перекрестия, не помещается — слева, иначе прижат к краю области; если накрывает точку — в другую половину по высоте
export function placeTooltip(box, tip, xPct, yPct) {
  if (!box || !tip) return;
  const bw = box.clientWidth; const bh = box.clientHeight; const tw = tip.offsetWidth; const th = tip.offsetHeight; const gap = 12;
  const px = (xPct / 100) * bw;
  let left = px + gap;
  if (left + tw > bw) left = px - gap - tw >= 0 ? px - gap - tw : Math.max(0, Math.min(bw - tw, px - tw / 2));
  const covers = left < px + gap && left + tw > px - gap;
  const top = covers && yPct != null && yPct < 50 ? Math.max(0, bh - th) : 0;
  tip.style.left = left + 'px'; tip.style.top = top + 'px'; tip.style.visibility = 'visible';
}

<!-- Chart plot — область графика (SVG): серии, сетка, подписи осей (моно). type: bars | line | area | line-bars | multi-line | dual-area | stacked-bars. series: [{ name, data, unit, format, marker }] — серия 1 — border/accent, далее data/2…8
     (вторая ось Line + Bars и Dual area — data/4); labels — подписи X (не больше xTicks); yLeft / yRight — { ticks }; state: default | skeleton | empty | disabled; label — aria-label.
     Hover (interactive, по умолчанию вкл.): указатель / касание → ближайшая точка — DsChartCrosshair + DsChartTooltip (dates / times — шапка, иначе labels); ← / → — по точкам, Home / End, Enter — закрепить, Esc — скрыть;
     aria-live озвучивает точку. v-model:index — выбранная точка (null — нет). Геометрия — chart.js. Контракт: docs/components/chart-plot.md -->
<script setup>
import { computed, ref, watch, nextTick, onBeforeUnmount } from 'vue';
import { chartModel, placeTooltip } from './chart.js';
import DsChartCrosshair from './DsChartCrosshair.vue';
import DsChartTooltip from './DsChartTooltip.vue';
const props = defineProps({
  type: { type: String, default: 'bars' },
  series: { type: Array, default: () => [] },
  labels: { type: Array, default: () => [] },
  xTicks: { type: Number, default: 6 },
  yLeft: Object,
  yRight: Object,
  format: Function,
  height: { type: Number, default: 200 },
  state: { type: String, default: 'default' },  // default | skeleton | empty | disabled
  emptyText: { type: String, default: 'Нет данных за период' },
  label: String,
  interactive: { type: Boolean, default: true },
  dates: Array,
  times: Array,
  valueFormat: Function,
});
const index = defineModel('index', { type: Number, default: null });
const m = computed(() => chartModel(props));
const live = computed(() => props.interactive && !m.value.skeleton && !m.value.empty && props.state !== 'disabled');
const k = computed(() => (live.value && index.value != null && index.value >= 0 && index.value < m.value.n ? Math.floor(index.value) : null));
const hv = computed(() => (k.value == null ? null : m.value.hoverAt(k.value)));
const pinned = ref(false);
const say = ref('');
const root = ref(null); const box = ref(null); const tip = ref(null);
const show = (j, speak) => { index.value = j; if (speak) say.value = j == null ? '' : m.value.hoverAt(j).summary; };
const pick = (e) => { const r = box.value && box.value.getBoundingClientRect(); return r && r.width ? Math.min(m.value.n - 1, Math.max(0, Math.floor(((e.clientX - r.left) / r.width) * m.value.n))) : null; };
const onMove = (e) => { if (!live.value || pinned.value) return; const j = pick(e); if (j != null && j !== k.value) show(j); };
const onDown = (e) => { if (!live.value) return; const j = pick(e); if (j != null) { pinned.value = false; show(j, e.pointerType !== 'mouse'); } };
const onLeave = (e) => { if (live.value && !pinned.value && e.pointerType === 'mouse') show(null); };
const onKey = (e) => {
  if (!live.value) return;
  const n = m.value.n; const cur = k.value;
  if (e.key === 'Escape') { if (cur != null) { e.preventDefault(); e.stopPropagation(); pinned.value = false; show(null, true); } return; }
  if (e.key === 'Enter') { if (cur != null) { e.preventDefault(); pinned.value = !pinned.value; } return; }
  const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
  const j = e.key === 'Home' ? 0 : e.key === 'End' ? n - 1 : d ? (cur == null ? (d > 0 ? 0 : n - 1) : Math.min(n - 1, Math.max(0, cur + d))) : null;
  if (j == null) return;
  e.preventDefault(); show(j, true);
};
const onBlur = (e) => { if (live.value && !pinned.value && !(root.value && root.value.contains(e.relatedTarget))) show(null); };
// касание и закреплённая точка — до нажатия вне графика
const out = (e) => { if (root.value && !root.value.contains(e.target)) { pinned.value = false; show(null); } };
watch(k, (v, old) => {
  if (typeof document === 'undefined') return;
  if (v != null && old == null) document.addEventListener('pointerdown', out);
  if (v == null && old != null) document.removeEventListener('pointerdown', out);
  if (v != null) nextTick(() => { const h = hv.value; if (h) placeTooltip(box.value, tip.value && tip.value.$el, h.x, h.points.length ? Math.min(...h.points.map((p) => p.y)) : null); });
});
onBeforeUnmount(() => { if (typeof document !== 'undefined') document.removeEventListener('pointerdown', out); });
</script>
<template>
  <div ref="root" :role="live ? 'group' : 'img'" :aria-roledescription="live ? 'график' : undefined" :aria-label="label" :aria-busy="m.skeleton || undefined" :tabindex="live ? 0 : undefined"
    :style="{ '--emcd-chart-h': m.H + 'px' }" @keydown="onKey" @focusout="onBlur"
    :class="['emcd-chart-plot', m.R && 'emcd-chart-plot--dual', live && 'emcd-chart-plot--interactive', m.skeleton && 'emcd-chart-plot--skeleton', m.empty && 'emcd-chart-plot--empty', state === 'disabled' && 'emcd-chart-plot--disabled']">
    <div class="emcd-chart-plot__axis emcd-chart-plot__axis--left" aria-hidden="true"><span v-for="t in m.left" :key="t.t" class="emcd-chart-plot__tick" :style="{ top: t.top }">{{ t.text }}</span></div>
    <div ref="box" class="emcd-chart-plot__area-box" @pointermove="onMove" @pointerdown="onDown" @pointerleave="onLeave">
      <DsChartCrosshair v-if="hv && hv.target === 'bar'" target="bar" :x="hv.x" :band="hv.band" />
      <svg class="emcd-chart-plot__svg" :viewBox="`0 0 ${m.W} ${m.H}`" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <line v-for="(gy, i) in m.grid" :key="'g' + i" class="emcd-chart-plot__grid" x1="0" :x2="m.W" :y1="gy" :y2="gy" />
        <component :is="mk.tag" v-for="mk in m.marks" :key="mk.key" :class="mk.cls" v-bind="mk.attrs" />
      </svg>
      <DsChartCrosshair v-if="hv && hv.target === 'line'" target="line" :x="hv.x" :points="hv.points" />
      <DsChartTooltip v-if="hv" ref="tip" :live="false" aria-hidden="true" class="emcd-chart-plot__tooltip" :rows="hv.rows" :date="hv.date" :time="hv.time" />
      <span v-if="m.empty" class="emcd-chart-plot__empty">{{ emptyText }}</span>
    </div>
    <div v-if="m.R" class="emcd-chart-plot__axis emcd-chart-plot__axis--right" aria-hidden="true"><span v-for="t in m.right" :key="t.t" class="emcd-chart-plot__tick" :style="{ top: t.top }">{{ t.text }}</span></div>
    <div class="emcd-chart-plot__x-row" aria-hidden="true"><span v-for="l in m.xl" :key="l.key" class="emcd-chart-plot__x" :style="{ left: l.left }">{{ l.text }}</span></div>
    <span v-if="live" class="emcd-chart-plot__live" role="status" aria-live="polite">{{ say }}</span>
  </div>
</template>

<!-- Chart plot — область графика (SVG): серии, сетка, подписи осей (моно). type: bars | line | area | line-bars | multi-line | dual-area | stacked-bars. series: [{ name, data }] — серия 1 — border/accent, далее data/2…8
     (вторая ось Line + Bars и Dual area — data/4); labels — подписи X (не больше xTicks); yLeft / yRight — { ticks }; state: default | skeleton | empty | disabled; label — aria-label. Геометрия — chart.js. Контракт: docs/components/chart-plot.md -->
<script setup>
import { computed } from 'vue';
import { chartModel } from './chart.js';
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
});
const m = computed(() => chartModel(props));
</script>
<template>
  <div role="img" :aria-label="label" :aria-busy="m.skeleton || undefined" :style="{ '--emcd-chart-h': m.H + 'px' }"
    :class="['emcd-chart-plot', m.R && 'emcd-chart-plot--dual', m.skeleton && 'emcd-chart-plot--skeleton', m.empty && 'emcd-chart-plot--empty', state === 'disabled' && 'emcd-chart-plot--disabled']">
    <div class="emcd-chart-plot__axis emcd-chart-plot__axis--left" aria-hidden="true"><span v-for="t in m.left" :key="t.t" class="emcd-chart-plot__tick" :style="{ top: t.top }">{{ t.text }}</span></div>
    <div class="emcd-chart-plot__area-box">
      <svg class="emcd-chart-plot__svg" :viewBox="`0 0 ${m.W} ${m.H}`" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <line v-for="(gy, i) in m.grid" :key="'g' + i" class="emcd-chart-plot__grid" x1="0" :x2="m.W" :y1="gy" :y2="gy" />
        <component :is="mk.tag" v-for="mk in m.marks" :key="mk.key" :class="mk.cls" v-bind="mk.attrs" />
      </svg>
      <span v-if="m.empty" class="emcd-chart-plot__empty">{{ emptyText }}</span>
    </div>
    <div v-if="m.R" class="emcd-chart-plot__axis emcd-chart-plot__axis--right" aria-hidden="true"><span v-for="t in m.right" :key="t.t" class="emcd-chart-plot__tick" :style="{ top: t.top }">{{ t.text }}</span></div>
    <div class="emcd-chart-plot__x-row" aria-hidden="true"><span v-for="l in m.xl" :key="l.key" class="emcd-chart-plot__x" :style="{ left: l.left }">{{ l.text }}</span></div>
  </div>
</template>

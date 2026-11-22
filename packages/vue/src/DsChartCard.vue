<!-- Chart card — виджет графика: Top (Chart metric × 1–3 + период — ряд Chip; в конце — легенда над графиком), Content (слот default — DsChartPlot), Bottom — итог за период (sum). metrics: [{ label, value, unit, icon, tone }];
     periods: [{ value, label }] + v-model:period; periodSize: s (Web) | m (Compact); legend: [{ label, series, marker, value, showValue }]; showBottom; слоты top / bottom — свои узлы; слот trailing — контрол справа в шапке вместо периода (22.11). Контракт: docs/components/chart-card.md -->
<script setup>
import { ref, computed } from 'vue';
import DsChartMetric from './DsChartMetric.vue';
import DsChip from './DsChip.vue';
import DsLegendItem from './DsLegendItem.vue';
const props = defineProps({
  label: String,
  metrics: { type: Array, default: () => [] },
  periods: Array,
  period: { type: [String, Number], default: undefined },
  periodSize: { type: String, default: 's' },
  periodLabel: { type: String, default: 'Период' },
  legend: { type: Array, default: () => [] },
  sum: String,
  showBottom: { type: Boolean, default: true },
});
const emit = defineEmits(['update:period']);
const inner = ref(undefined);
const cur = computed(() => props.period ?? inner.value ?? props.periods?.[0]?.value);
const pick = (v) => { inner.value = v; emit('update:period', v); };
</script>
<template>
  <section role="group" :aria-label="label" class="emcd-chart-card">
    <slot name="top">
      <div v-if="metrics.length || periods || legend.length || $slots.trailing" class="emcd-chart-card__head">
        <div v-if="metrics.length || periods || $slots.trailing" class="emcd-chart-card__top">
          <div v-if="metrics.length" class="emcd-chart-card__metrics"><DsChartMetric v-for="(mt, i) in metrics" :key="i" v-bind="mt" /></div>
          <div v-if="periods" :class="['emcd-chart-card__periods', periodSize === 'm' && 'emcd-chart-card__periods--m']" role="group" :aria-label="periodLabel">
            <DsChip v-for="p in periods" :key="p.value" :size="periodSize" :label="p.label" :selected="p.value === cur" @click="pick(p.value)" />
          </div>
          <div v-else-if="$slots.trailing" class="emcd-chart-card__periods"><slot name="trailing" /></div>
        </div>
        <ul v-if="legend.length" class="emcd-legend emcd-chart-card__legend"><li v-for="(l, i) in legend" :key="i"><DsLegendItem v-bind="l" /></li></ul>
      </div>
    </slot>
    <div class="emcd-chart-card__content"><slot /></div>
    <template v-if="showBottom">
      <slot name="bottom">
        <div v-if="sum != null" class="emcd-chart-card__bottom">
          <span class="emcd-chart-card__sum">{{ sum }}</span>
        </div>
      </slot>
    </template>
  </section>
</template>

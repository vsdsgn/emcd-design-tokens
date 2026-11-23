<!-- Sparkline — 🟠 draft: мини-график тренда без осей, сетки и подсказки (строка таблицы, плитка, List item). type — любой вид Chart plot. data — одна серия или series: [{ data }]; width — 80 ('fill' — на ширину контейнера); label — смысл для читалки (role=img), без него — aria-hidden. Контракт: docs/components/sparkline.md -->
<script setup>
import { computed } from 'vue';
import DsChartPlot from './DsChartPlot.vue';
const props = defineProps({
  type: { type: String, default: 'line' },
  data: Array,
  series: Array,
  width: { type: [Number, String], default: 80 },
  height: { type: Number, default: 24 },
  label: String,
});
const ss = computed(() => props.series || [{ data: props.data || [] }]);
const fill = computed(() => props.width === 'fill');
</script>
<template>
  <span :class="['emcd-sparkline', fill && 'emcd-sparkline--fill']" :style="fill ? undefined : { '--sparkline-w': width + 'px' }" :role="label ? 'img' : undefined" :aria-label="label" :aria-hidden="label ? undefined : true">
    <DsChartPlot :type="type" :series="ss" :height="height" :interactive="false" :x-ticks="0" />
  </span>
</template>

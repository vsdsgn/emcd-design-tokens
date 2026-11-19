<!-- Chart crosshair — перекрестие выбранной точки: target line — линия border/default + точки серий (points: [{ y (%), series 1–8 }]); bar — полоса status/neutral/subtle (band — ширина, %).
     x — положение по X, % ширины области. Неинтерактивен: положение и видимость выставляет DsChartPlot. Контракт: docs/components/chart-crosshair.md -->
<script setup>
const props = defineProps({
  target: { type: String, default: 'line' }, // line | bar
  x: { type: Number, default: 50 },
  points: { type: Array, default: () => [] },
  band: { type: Number, default: 4 },
});
const sn = (s) => Math.min(8, Math.max(1, Number(s) || 1));
</script>
<template>
  <div :class="['emcd-chart-crosshair', target === 'bar' && 'emcd-chart-crosshair--bar']" aria-hidden="true" :style="{ left: x + '%', width: target === 'bar' ? band + '%' : undefined }">
    <span v-if="target === 'bar'" class="emcd-chart-crosshair__band" />
    <template v-else>
      <span class="emcd-chart-crosshair__line" />
      <span v-for="(p, i) in points" :key="i" :class="['emcd-chart-crosshair__point', `emcd-chart-crosshair__point--s${sn(p.series)}`]" :style="{ top: p.y + '%' }" />
    </template>
  </div>
</template>

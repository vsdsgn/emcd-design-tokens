<!-- Chart tooltip — значения серий в точке графика: шапка (date / time; showDate=false — без шапки) + строки «маркер — серия — значение».
     rows: [{ label, value, series, marker, tone }] — 1–4, больше — 4 + «+N» (moreLabel); tone: danger | warning. Шрифт — текста (моно только у осей). role=status, aria-live=polite; live=false — без них. Контракт: docs/components/chart-tooltip.md -->
<script setup>
import { computed } from 'vue';
import DsLegendSwatch from './DsLegendSwatch.vue';
const props = defineProps({
  rows: { type: Array, default: () => [] },
  date: String,
  time: String,
  showDate: { type: Boolean, default: true },
  moreLabel: String,
  live: { type: Boolean, default: true },
});
const list = computed(() => props.rows.slice(0, 4));
const more = computed(() => props.rows.length - list.value.length);
</script>
<template>
  <div :role="live ? 'status' : undefined" :aria-live="live ? 'polite' : undefined" class="emcd-chart-tooltip">
    <div v-if="showDate && (date != null || time != null)" class="emcd-chart-tooltip__header">
      <span class="emcd-chart-tooltip__date">{{ date }}</span><span v-if="time != null" class="emcd-chart-tooltip__time">{{ time }}</span>
    </div>
    <div v-for="(r, i) in list" :key="i" class="emcd-chart-tooltip__row">
      <span class="emcd-chart-tooltip__label"><DsLegendSwatch :marker="r.marker || 'dot'" :series="r.series ?? i + 1" /><span class="emcd-chart-tooltip__series">{{ r.label }}</span></span>
      <span :class="['emcd-chart-tooltip__value', r.tone && r.tone !== 'default' && `emcd-chart-tooltip__value--${r.tone}`]">{{ r.value }}</span>
    </div>
    <div v-if="more > 0" class="emcd-chart-tooltip__more">{{ moreLabel ?? `+${more}` }}</div>
  </div>
</template>

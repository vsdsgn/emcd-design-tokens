<!-- Legend item — маркер серии + подпись (+ значение при showValue). selected — серия выбрана; interactive — кнопка «скрыть / показать серию» (aria-pressed, событие click); skeleton — полоса. Контракт: docs/components/legend-item.md -->
<script setup>
import DsLegendSwatch from './DsLegendSwatch.vue';
defineProps({
  label: String,
  value: [String, Number],
  showValue: Boolean,
  selected: Boolean,
  marker: { type: String, default: 'dot' },
  series: { type: [Number, String], default: 1 },
  interactive: Boolean,
  skeleton: Boolean,
});
defineEmits(['click']);
</script>
<template>
  <span v-if="skeleton" class="emcd-legend-item emcd-legend-item--skeleton" aria-hidden="true"><span class="emcd-legend-item__bone" /></span>
  <component :is="interactive ? 'button' : 'span'" v-else :type="interactive ? 'button' : undefined" :aria-pressed="interactive ? selected : undefined" :title="label"
    :class="['emcd-legend-item', selected && 'emcd-legend-item--selected', interactive && 'emcd-legend-item--interactive']" @click="$emit('click', $event)">
    <DsLegendSwatch :marker="marker" :series="series" />
    <span class="emcd-legend-item__label"><slot>{{ label }}</slot></span>
    <span v-if="showValue && value != null" class="emcd-legend-item__value">{{ value }}</span>
  </component>
</template>

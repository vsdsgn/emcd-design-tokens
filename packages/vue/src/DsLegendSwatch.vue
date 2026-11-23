<!-- Legend swatch — маркер серии: dot (столбцы, области) · line (линии; серии 5–8 пунктиром). series 1 — border/accent (основная), 2–8 — data/2…8. Декоративен. Контракт: docs/components/marker.md (22.11) -->
<script setup>
import { computed } from 'vue';
const props = defineProps({
  marker: { type: String, default: 'dot' },     // dot | line
  series: { type: [Number, String], default: 1 }, // 1–8
});
const DASH = { 5: '4 2', 6: '2 2', 7: '6 2 2 2', 8: '1 2' };
const s = computed(() => Math.min(8, Math.max(1, Number(props.series) || 1)));
</script>
<template>
  <span :class="['emcd-legend-swatch', marker === 'line' && 'emcd-legend-swatch--line', `emcd-legend-swatch--s${s}`]" aria-hidden="true">
    <svg v-if="marker === 'line'" viewBox="0 0 12 12" focusable="false"><line x1="0" y1="6" x2="12" y2="6" :stroke-dasharray="DASH[s]" /></svg>
    <span v-else class="emcd-legend-swatch__dot" />
  </span>
</template>

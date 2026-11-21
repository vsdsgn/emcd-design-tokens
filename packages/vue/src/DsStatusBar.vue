<!-- Status bar — полоса статусов парка (draft, 21.11): caption, segments [{ tone, label, value, count }] — порядок Danger → Warning → Success → Neutral, ширина — доля count. Контракт: docs/components/status-bar.md -->
<script setup>
import { computed } from 'vue';
import DsStatus from './DsStatus.vue';
const props = defineProps({
  caption: String,
  showCaption: { type: Boolean, default: true },
  showLegend: { type: Boolean, default: true },
  segments: { type: Array, default: () => [] },
});
const ORDER = ['danger', 'warning', 'success', 'neutral'];
const segs = computed(() => props.segments.filter(Boolean).slice().sort((a, b) => ORDER.indexOf(a.tone) - ORDER.indexOf(b.tone)));
const total = computed(() => segs.value.reduce((a, x) => a + (Number(x.count) || 0), 0));
const summary = computed(() => segs.value.map((x) => `${x.label} ${x.value ?? x.count}`).join(', '));
</script>
<template>
  <div class="emcd-status-bar">
    <p v-if="showCaption && caption" class="emcd-status-bar__caption">{{ caption }}</p>
    <div class="emcd-status-bar__track" role="img" :aria-label="(caption ? caption + ': ' : '') + summary">
      <span v-for="(x, i) in segs.filter((s) => Number(s.count) > 0)" :key="i" :class="['emcd-status-bar__segment', `emcd-status-bar__segment--${x.tone}`]" :style="{ flexGrow: total ? Number(x.count) / total : 1 }" />
    </div>
    <ul v-if="showLegend" class="emcd-status-bar__legend" aria-hidden="true">
      <li v-for="(x, i) in segs" :key="i" class="emcd-status-bar__item"><DsStatus :tone="x.tone" :label="x.label" /><span class="emcd-status-bar__value">{{ x.value ?? x.count }}</span></li>
    </ul>
  </div>
</template>

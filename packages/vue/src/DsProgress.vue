<!-- Progress — доля выполненного. percent 0–100 — ширина fill; value — текст справа. Indeterminate — только Accent. Контракт: docs/components/progress.md -->
<script setup>
import { computed } from 'vue';
const props = defineProps({
  size: { type: String, default: 's' },             // s — дорожка 4 | m — 8
  tone: { type: String, default: 'accent' },        // accent | success | warning | danger
  mode: { type: String, default: 'determinate' },   // determinate | indeterminate
  label: String,
  value: String,
  percent: { type: Number, default: 0 },
  showLabel: { type: Boolean, default: true },
});
const ind = computed(() => props.mode === 'indeterminate');
const pct = computed(() => Math.max(0, Math.min(100, props.percent || 0)));
</script>
<template>
  <div :class="['emcd-progress', size === 'm' && 'emcd-progress--m', !ind && tone !== 'accent' && `emcd-progress--${tone}`, ind && 'emcd-progress--indeterminate']">
    <div v-if="showLabel && (label || value)" class="emcd-progress__row">
      <span class="emcd-progress__label">{{ label }}</span><span v-if="!ind && value" class="emcd-progress__value">{{ value }}</span>
    </div>
    <div class="emcd-progress__track" role="progressbar" :aria-label="label" :aria-valuemin="ind ? undefined : 0" :aria-valuemax="ind ? undefined : 100" :aria-valuenow="ind ? undefined : pct" :aria-valuetext="ind ? undefined : value">
      <span class="emcd-progress__fill" :style="ind ? undefined : { width: pct + '%' }" />
    </div>
  </div>
</template>

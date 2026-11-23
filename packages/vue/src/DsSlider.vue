<!-- Slider — 🟠 draft. type: single — значение (steps 3 / 5 / 10 — точки, labels — подписи шагов) | range — диапазон [от, до] на непрерывной шкале. v-model — число или [a, b]. format(v) — подпись значения. Нативные input[type=range]. Контракт: docs/components/slider.md -->
<script setup>
import { computed, useId } from 'vue';
const props = defineProps({
  type: { type: String, default: 'single' },
  label: String,
  showLabel: { type: Boolean, default: true },
  min: { type: Number, default: 0 },
  max: { type: Number, default: 100 },
  step: Number,
  steps: Number,
  labels: Boolean,
  format: Function,
  valueText: String,
  description: String,
  disabled: Boolean,
  startLabel: { type: String, default: 'От' },
  endLabel: { type: String, default: 'До' },
});
const model = defineModel({ type: [Number, Array], default: undefined });
const id = useId();
const range = computed(() => props.type === 'range');
const st = computed(() => props.step ?? (props.steps ? (props.max - props.min) / (props.steps - 1) : 1));
const cur = computed(() => model.value ?? (range.value ? [props.min, props.max] : props.min));
const ab = computed(() => (range.value ? cur.value : [props.min, cur.value]));
const fmt = (v) => (props.format ? props.format(v) : String(v));
const pct = (v) => ((Number(v) - props.min) / (props.max - props.min || 1)) * 100;
const marks = computed(() => (props.steps ? Array.from({ length: props.steps }, (_, i) => props.min + (i * (props.max - props.min)) / (props.steps - 1)) : []));
const shown = computed(() => props.valueText ?? (range.value ? `${fmt(ab.value[0])} – ${fmt(ab.value[1])}` : fmt(cur.value)));
const set = (i, e) => { const v = Number(e.target.value); if (!range.value) { model.value = v; return; } const n = [...cur.value]; n[i] = i === 0 ? Math.min(v, n[1]) : Math.max(v, n[0]); model.value = n; };
const aria = (i) => (props.label ? `${props.label}: ` : '') + (i === 0 ? props.startLabel : props.endLabel);
</script>
<template>
  <div :class="['emcd-slider', range && 'emcd-slider--range', disabled && 'emcd-slider--disabled']" :style="{ '--a': pct(ab[0]) / 100, '--b': pct(ab[1]) / 100 }">
    <div v-if="showLabel && label" class="emcd-slider__head"><span :id="id" class="emcd-slider__label">{{ label }}<slot name="info" /></span><span class="emcd-slider__value" aria-hidden="true">{{ shown }}</span></div>
    <div class="emcd-slider__track">
      <span class="emcd-slider__fill" aria-hidden="true" />
      <template v-if="!range"><span v-for="(m, i) in marks" :key="i" :class="['emcd-slider__dot', m <= cur && 'emcd-slider__dot--on']" :style="{ left: `calc(${pct(m)}% + ${9 - (18 * pct(m)) / 100}px)` }" aria-hidden="true" /></template>
      <template v-if="range">
        <input v-for="i in [0, 1]" :key="i" type="range" class="emcd-slider__input" :min="min" :max="max" :step="st" :value="ab[i]" :disabled="disabled" :aria-label="aria(i)" :aria-valuetext="fmt(ab[i])" @input="set(i, $event)" />
      </template>
      <input v-else type="range" class="emcd-slider__input" :min="min" :max="max" :step="st" :value="cur" :disabled="disabled" :aria-labelledby="showLabel && label ? id : undefined" :aria-valuetext="fmt(cur)" @input="set(0, $event)" />
    </div>
    <div v-if="labels && marks.length" class="emcd-slider__marks" aria-hidden="true"><span v-for="(m, i) in marks" :key="i">{{ fmt(m) }}</span></div>
    <p v-if="description" class="emcd-slider__desc">{{ description }}</p>
  </div>
</template>

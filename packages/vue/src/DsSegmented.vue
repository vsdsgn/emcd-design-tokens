<!-- Segmented — один из 2–4, применяется сразу. v-model; items: [{ value, label, disabled }] или дети DsSegment. Контракт: docs/components/segmented.md -->
<script setup>
import { computed, provide, ref, onMounted, toRef } from 'vue';
import DsSegment from './DsSegment.vue';
const props = defineProps({
  size: { type: String, default: 's' },    // s 32 | m 40 | l 48 | xl 56 — как у соседнего поля или кнопки
  items: Array,
  tone: { type: String, default: 'neutral' }, // neutral | accent
  label: String,                           // aria-label группы
  block: Boolean,                          // на всю ширину
});
const model = defineModel({ type: [String, Number], default: undefined });
const emit = defineEmits(['change']);
const inner = ref(props.items ? (props.items[0]?.value ?? 0) : undefined);
const current = computed(() => (model.value !== undefined ? model.value : inner.value));
const select = (v) => { inner.value = v; model.value = v; emit('change', v); };
provide('emcd-segmented', { value: current, tone: toRef(props, 'tone'), select });
const root = ref(null);
onMounted(() => { if (current.value === undefined && root.value) { const f = root.value.querySelector('[role="radio"]:not(:disabled)'); if (f) f.click(); } });
const keys = (e) => {
  const list = [...e.currentTarget.querySelectorAll('[role="radio"]')].filter((t) => !t.disabled);
  const i = list.indexOf(document.activeElement); if (i < 0) return;
  let step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
  if (step && (e.key === 'ArrowLeft' || e.key === 'ArrowRight') && getComputedStyle(e.currentTarget).direction === 'rtl') step = -step;
  const next = step ? list[(i + step + list.length) % list.length] : null;
  if (next) { e.preventDefault(); next.focus(); next.click(); }
};
</script>
<template>
  <div ref="root" role="radiogroup" :aria-label="label" :class="['emcd-segmented', size !== 's' && `emcd-segmented--${size}`, block && 'emcd-segmented--block']" @keydown="keys">
    <template v-if="items"><DsSegment v-for="(it, i) in items" :key="it.value ?? i" v-bind="it" :value="it.value ?? i" /></template>
    <slot v-else />
  </div>
</template>

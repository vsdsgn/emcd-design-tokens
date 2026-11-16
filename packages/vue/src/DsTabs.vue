<!-- Tabs — бар вкладок (2–6). v-model — value выбранной; items: [{ value, label, counter, disabled }] или дети DsTab с value. Без v-model — первая выбрана. Контракт: docs/components/tabs.md -->
<script setup>
import { computed, provide, ref, onMounted, toRef } from 'vue';
import DsTab from './DsTab.vue';
const props = defineProps({
  size: { type: String, default: 'm' }, // s — в виджете | m — App и мобильный веб | l — Web | xl — табы-заголовок
  items: Array,
  label: String,                        // aria-label бара
});
const model = defineModel({ type: [String, Number], default: undefined });
const emit = defineEmits(['change']);
const inner = ref(props.items ? (props.items[0]?.value ?? 0) : undefined);
const current = computed(() => (model.value !== undefined ? model.value : inner.value));
const select = (v) => { inner.value = v; model.value = v; emit('change', v); };
provide('emcd-tabs', { size: toRef(props, 'size'), value: current, select });
const bar = ref(null);
// Без v-model и items — первая вкладка из детей
onMounted(() => {
  const el = bar.value; if (!el) return;
  if (current.value === undefined) { const first = el.querySelector('[role="tab"]:not(:disabled)'); if (first) first.click(); }
  const s = el.querySelector('[aria-selected="true"]');
  if (s && (s.offsetLeft < el.scrollLeft || s.offsetLeft + s.offsetWidth > el.scrollLeft + el.clientWidth)) el.scrollLeft = s.offsetLeft - 16;
});
const keys = (e) => {
  const list = [...e.currentTarget.querySelectorAll('[role="tab"]')].filter((t) => !t.disabled);
  const i = list.indexOf(document.activeElement); if (i < 0) return;
  let step = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
  if (step && getComputedStyle(e.currentTarget).direction === 'rtl') step = -step;
  const next = e.key === 'Home' ? list[0] : e.key === 'End' ? list[list.length - 1] : step ? list[(i + step + list.length) % list.length] : null;
  if (next) { e.preventDefault(); next.focus(); next.click(); }
};
</script>
<template>
  <div ref="bar" role="tablist" :aria-label="label" :class="['emcd-tabs', size !== 'm' && `emcd-tabs--${size}`]" @keydown="keys">
    <template v-if="items"><DsTab v-for="(it, i) in items" :key="it.value ?? i" v-bind="it" :value="it.value ?? i" /></template>
    <slot v-else />
  </div>
</template>

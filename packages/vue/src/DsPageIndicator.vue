<!-- Page indicator — точки карусели (2–5), текущая вытянутая. selected — номер с 1. interactive — точки-кнопки (событие select(n)), иначе декоративны. Озвучивается «Слайд 3 из 5». Контракт: docs/components/page-indicator.md -->
<script setup>
import { computed } from 'vue';
const props = defineProps({
  count: { type: Number, default: 2 },
  selected: { type: Number, default: 1 },
  interactive: Boolean,
  label: { type: String, default: 'Слайд' },
});
defineEmits(['select']);
const n = computed(() => Math.max(1, props.count || 1));
const cur = computed(() => Math.min(n.value, Math.max(1, props.selected || 1)));
</script>
<template>
  <div class="emcd-page-indicator" :role="interactive ? 'group' : 'img'" :aria-label="`${label} ${cur} из ${n}`">
    <template v-for="i in n" :key="i">
      <button v-if="interactive" type="button" class="emcd-page-dot" :aria-current="i === cur ? 'true' : undefined" :aria-label="`${label} ${i} из ${n}`" @click="$emit('select', i, $event)" />
      <span v-else class="emcd-page-dot" :aria-current="i === cur ? 'true' : undefined" />
    </template>
  </div>
</template>

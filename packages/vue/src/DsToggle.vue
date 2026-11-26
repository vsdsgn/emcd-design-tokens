<!-- Toggle — мгновенное вкл / выкл. v-model: boolean. Контракт: docs/components/toggle.md -->
<script setup>
import DsBadge from './DsBadge.vue';
const model = defineModel({ type: Boolean, default: false });
defineProps({
  size: { type: String, default: 'm' },              // m | s
  controlPosition: { type: String, default: 'end' }, // end | start
  label: String,
  badge: String, // Badge S Accent Subtle после подписи (21.11)
  description: String,
  disabled: Boolean,
  showLabel: { type: Boolean, default: true }, // false — контрол без видимой подписи (таблица, слот строки); подпись уходит в aria-label (26.11)
});
</script>
<template>
  <label :class="['emcd-toggle', size === 's' && 'emcd-toggle--s', controlPosition === 'start' && 'emcd-toggle--start']">
    <input v-model="model" type="checkbox" role="switch" :disabled="disabled" :aria-label="showLabel ? undefined : label" />
    <span v-if="showLabel" class="emcd-toggle__text"><span v-if="badge" class="emcd-check__label-row"><span><slot>{{ label }}</slot></span><DsBadge size="s" tone="accent" :label="badge" class="emcd-check__badge" /></span><span v-else><slot>{{ label }}</slot></span><span v-if="description" class="emcd-toggle__desc">{{ description }}</span></span>
  </label>
</template>

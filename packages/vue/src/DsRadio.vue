<!-- Radio — один из группы. v-model: значение группы. Контракт: docs/components/radio.md -->
<script setup>
import DsBadge from './DsBadge.vue';
const model = defineModel();
defineProps({
  value: { required: true },
  name: String,
  tone: { type: String, default: 'default' },
  size: { type: String, default: 'm' },
  controlPosition: { type: String, default: 'start' },
  label: String,
  badge: String, // Badge S Accent Subtle после подписи (21.11)
  description: String,
  disabled: Boolean,
  showLabel: { type: Boolean, default: true }, // false — контрол без видимой подписи (таблица, слот строки); подпись уходит в aria-label (26.11)
});
</script>
<template>
  <label :class="['emcd-check', size === 's' && 'emcd-check--s', controlPosition === 'end' && 'emcd-check--end', tone === 'danger' && 'emcd-check--danger']">
    <input v-model="model" type="radio" :name="name" :value="value" :disabled="disabled" :aria-invalid="tone === 'danger' || undefined" :aria-label="showLabel ? undefined : label" />
    <span v-if="showLabel" class="emcd-check__text"><span v-if="badge" class="emcd-check__label-row"><span><slot>{{ label }}</slot></span><DsBadge size="s" tone="accent" :label="badge" class="emcd-check__badge" /></span><span v-else><slot>{{ label }}</slot></span><span v-if="description" class="emcd-check__desc">{{ description }}</span></span>
  </label>
</template>

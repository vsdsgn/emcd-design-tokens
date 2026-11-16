<!-- Checkbox — независимый выбор. v-model: boolean; indeterminate — частичный выбор. Контракт: docs/components/checkbox.md -->
<script setup>
const model = defineModel({ type: Boolean, default: false });
defineProps({
  indeterminate: Boolean,
  tone: { type: String, default: 'default' },          // default | danger
  size: { type: String, default: 'm' },                // m | s
  controlPosition: { type: String, default: 'start' }, // start | end
  label: String,
  description: String,
  disabled: Boolean,
});
</script>
<template>
  <label :class="['emcd-check', size === 's' && 'emcd-check--s', controlPosition === 'end' && 'emcd-check--end', tone === 'danger' && 'emcd-check--danger']">
    <input v-model="model" type="checkbox" :indeterminate.prop="indeterminate" :disabled="disabled" :aria-invalid="tone === 'danger' || undefined" />
    <span class="emcd-check__text"><span><slot>{{ label }}</slot></span><span v-if="description" class="emcd-check__desc">{{ description }}</span></span>
  </label>
</template>

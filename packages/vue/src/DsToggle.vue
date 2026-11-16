<!-- Toggle — мгновенное вкл / выкл. v-model: boolean. Контракт: docs/components/toggle.md -->
<script setup>
const model = defineModel({ type: Boolean, default: false });
defineProps({
  size: { type: String, default: 'm' },              // m | s
  controlPosition: { type: String, default: 'end' }, // end | start
  label: String,
  description: String,
  disabled: Boolean,
});
</script>
<template>
  <label :class="['emcd-toggle', size === 's' && 'emcd-toggle--s', controlPosition === 'start' && 'emcd-toggle--start']">
    <input v-model="model" type="checkbox" role="switch" :disabled="disabled" />
    <span class="emcd-toggle__text"><span><slot>{{ label }}</slot></span><span v-if="description" class="emcd-toggle__desc">{{ description }}</span></span>
  </label>
</template>

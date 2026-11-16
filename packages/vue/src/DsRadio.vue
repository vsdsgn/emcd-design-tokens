<!-- Radio — один из группы. v-model: значение группы. Контракт: docs/components/radio.md -->
<script setup>
const model = defineModel();
defineProps({
  value: { required: true },
  name: String,
  tone: { type: String, default: 'default' },
  size: { type: String, default: 'm' },
  controlPosition: { type: String, default: 'start' },
  label: String,
  description: String,
  disabled: Boolean,
});
</script>
<template>
  <label :class="['emcd-check', size === 's' && 'emcd-check--s', controlPosition === 'end' && 'emcd-check--end', tone === 'danger' && 'emcd-check--danger']">
    <input v-model="model" type="radio" :name="name" :value="value" :disabled="disabled" :aria-invalid="tone === 'danger' || undefined" />
    <span class="emcd-check__text"><span><slot>{{ label }}</slot></span><span v-if="description" class="emcd-check__desc">{{ description }}</span></span>
  </label>
</template>

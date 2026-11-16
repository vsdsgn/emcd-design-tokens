<!-- Icon button — действие иконкой; label обязателен (доступное имя). Контракт: docs/components/icon-button.md -->
<script setup>
import { computed } from 'vue';
const props = defineProps({
  type: { type: String, default: 'tertiary' }, // primary | secondary | tertiary | tertiary-outline | ghost | text | inverted
  tone: { type: String, default: 'default' },
  size: { type: String, default: 'm' },
  label: { type: String, required: true },
  loading: Boolean,
  disabled: Boolean,
});
const TYPE = { primary: 'primary', secondary: 'secondary', tertiary: 'tertiary', 'tertiary-outline': 'outline', text: 'text', inverted: 'inverted', ghost: 'ghost' };
const cls = computed(() => ['emcd-btn', 'emcd-icon-btn', `emcd-btn--${TYPE[props.type]}`, props.tone === 'danger' && 'emcd-btn--danger', props.size !== 'm' && `emcd-btn--${props.size}`]);
</script>
<template>
  <button type="button" :class="cls" :disabled="disabled" :aria-label="label" :title="label" :aria-busy="loading || undefined">
    <svg v-if="loading" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-opacity=".24" stroke-width="2"/><path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
    <slot v-else />
  </button>
</template>

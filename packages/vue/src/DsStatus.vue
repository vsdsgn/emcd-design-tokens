<!-- Status — точка + подпись: состояние, которое обновляется само. showLabel=false — подпись уходит в aria-label. Контракт: docs/components/status.md -->
<script setup>
defineProps({
  size: { type: String, default: 's' },       // s — таблицы | m — карточки и шапки
  tone: { type: String, default: 'success' }, // success | warning | danger | info | neutral
  label: String,
  showLabel: { type: Boolean, default: true },
});
</script>
<template>
  <span :class="['emcd-status', size === 'm' && 'emcd-status--m', tone !== 'success' && `emcd-status--${tone}`]" :role="showLabel ? undefined : 'img'" :aria-label="showLabel ? undefined : label">
    <span class="emcd-status__dot" aria-hidden="true" />
    <span v-if="showLabel" class="emcd-status__label"><slot>{{ label }}</slot></span>
  </span>
</template>

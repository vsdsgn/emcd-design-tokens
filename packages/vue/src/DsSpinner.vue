<!-- Spinner — неизвестная длительность; цвет от родителя. Контракт: docs/components/spinner.md -->
<script setup>
defineProps({
  size: { type: String, default: 's' }, // s | m | l
  label: { type: String, default: 'Загрузка' },
});
</script>
<template>
  <svg :class="['emcd-spinner', size !== 's' && `emcd-spinner--${size}`]" viewBox="0 0 24 24" fill="none" role="status" :aria-label="label">
    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-opacity=".2" stroke-width="2" />
    <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
  </svg>
</template>

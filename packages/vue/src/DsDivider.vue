<!-- Divider — линия border-subtle; label — «или» (только horizontal). Контракт: docs/components/divider.md -->
<script setup>
defineProps({
  orientation: { type: String, default: 'horizontal' }, // horizontal | vertical
  label: Boolean,
  labelText: { type: String, default: 'или' },
  variant: { type: String, default: 'solid' },          // solid | dotted (в контракте — style; в Vue `style` занят атрибутом)
});
</script>
<template>
  <span v-if="orientation === 'vertical'" role="separator" aria-orientation="vertical" :class="['emcd-divider', 'emcd-divider--vertical', variant === 'dotted' && 'emcd-divider--dotted']" />
  <div v-else-if="label" role="separator" :class="['emcd-divider', 'emcd-divider--label', variant === 'dotted' && 'emcd-divider--dotted']"><slot>{{ labelText }}</slot></div>
  <hr v-else :class="['emcd-divider', variant === 'dotted' && 'emcd-divider--dotted']" />
</template>

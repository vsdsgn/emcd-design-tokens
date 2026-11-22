<!-- Badge — неинтерактивная метка. Тона Info нет (Info = цвет бренда → accent). Контракт: docs/components/badge.md -->
<script setup>
import DsCounter from './DsCounter.vue';
defineProps({
  content: { type: String, default: 'text' }, // text | number (22.11: Counter слит в Badge — Figma Content=Number; size xs → 16, s → 20)
  value: [String, Number],
  size: { type: String, default: 'm' },      // s | m | l
  tone: { type: String, default: 'neutral' }, // neutral | accent | success | warning | danger
  variant: { type: String, default: 'subtle' }, // subtle | solid (в контракте — style; в Vue `style` занят атрибутом)
  label: String,
  skeleton: Boolean,
});
</script>
<template>
  <DsCounter v-if="content === 'number'" :size="size === 'xs' ? 's' : 'm'" :tone="tone" :value="value ?? label" />
  <span v-else :class="['emcd-badge', size !== 'm' && `emcd-badge--${size}`, tone !== 'neutral' && `emcd-badge--${tone}`, variant === 'solid' && 'emcd-badge--solid', skeleton && 'emcd-badge--skeleton']" :aria-hidden="skeleton || undefined">
    <slot name="icon" /><span class="emcd-badge__label"><slot>{{ label }}</slot></span>
  </span>
</template>

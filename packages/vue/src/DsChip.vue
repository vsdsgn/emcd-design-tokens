<!-- Chip — фильтр или выбор (aria-pressed; Selected — инверсная белая плашка). statusDot — точка статуса. removable → крестик, событие remove. Контракт: docs/components/chip.md -->
<script setup>
defineProps({
  size: { type: String, default: 's' }, // s | m
  selected: Boolean,
  label: String,
  metaText: [String, Number],
  statusDot: Boolean,                              // точка статуса перед подписью — фильтр по статусу
  statusTone: { type: String, default: 'success' }, // success | warning | danger | neutral
  removable: Boolean,
  removeLabel: { type: String, default: 'Убрать' },
  disabled: Boolean,
});
defineEmits(['click', 'remove']);
</script>
<template>
  <span v-if="removable" :class="['emcd-chip', size === 'm' && 'emcd-chip--m', selected && 'emcd-chip--selected']">
    <button type="button" class="emcd-chip__action" :aria-pressed="selected" :disabled="disabled" @click="$emit('click', $event)">
      <slot name="icon" /><span v-if="statusDot" :class="['emcd-dot', statusTone !== 'success' && `emcd-dot--${statusTone}`]" aria-hidden="true" /><span class="emcd-chip__label"><slot>{{ label }}</slot></span><span v-if="metaText != null" class="emcd-chip__meta">{{ metaText }}</span>
    </button>
    <button type="button" class="emcd-chip__remove" :aria-label="removeLabel" :disabled="disabled" @click="$emit('remove', $event)">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
    </button>
  </span>
  <button v-else type="button" :class="['emcd-chip', size === 'm' && 'emcd-chip--m', selected && 'emcd-chip--selected']" :aria-pressed="selected" :disabled="disabled" @click="$emit('click', $event)">
    <slot name="icon" /><span v-if="statusDot" :class="['emcd-dot', statusTone !== 'success' && `emcd-dot--${statusTone}`]" aria-hidden="true" /><span class="emcd-chip__label"><slot>{{ label }}</slot></span><span v-if="metaText != null" class="emcd-chip__meta">{{ metaText }}</span><slot name="trailing" />
  </button>
</template>

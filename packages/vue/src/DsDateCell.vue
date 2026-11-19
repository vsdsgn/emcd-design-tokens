<!-- Date cell — ячейка дня в DsCalendar (вне Calendar не используется). state: default | today | selected | range-start | range-middle | range-end | outside; disabled — недоступен (зачёркнут, без click).
     Hover / Pressed / Focus — из платформы. label — полная дата для озвучки. Контракт: docs/components/date-cell.md -->
<script setup>
defineProps({
  day: [String, Number],
  state: { type: String, default: 'default' },
  disabled: Boolean,
  label: String,
});
const emit = defineEmits(['click']);
</script>
<template>
  <button type="button" :class="['emcd-date-cell', state !== 'default' && `emcd-date-cell--${state}`, disabled && 'emcd-date-cell--disabled']" :aria-label="label" :aria-disabled="disabled || undefined"
    :aria-current="state === 'today' ? 'date' : undefined" @click="!disabled && emit('click', $event)"><slot>{{ day }}</slot></button>
</template>

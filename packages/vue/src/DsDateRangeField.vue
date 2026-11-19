<!-- Date range field — поле периода на базе Input M (подпись на рамке): «ДД.ММ.ГГ → ДД.ММ.ГГ» + иконка календаря. from / to — даты в формате локали.
     Панель (Calendar Range + пресеты) — у продукта: событие open по нажатию, Enter, Space или ↓. state: default | error | disabled | skeleton. Контракт: docs/components/date-range-field.md -->
<script setup>
import { computed } from 'vue';
import DsInput from './DsInput.vue';
import DsIcon from './DsIcon.vue';
const props = defineProps({
  label: { type: String, default: 'Период' },
  from: String,
  to: String,
  placeholder: { type: String, default: 'ДД.ММ.ГГ → ДД.ММ.ГГ' },
  hint: String,
  error: String,
  state: { type: String, default: 'default' },
  labelPosition: { type: String, default: 'on-border' },
});
const emit = defineEmits(['open']);
const text = computed(() => (props.from || props.to ? `${props.from || '…'} → ${props.to || '…'}` : ''));
const off = computed(() => props.state === 'disabled' || props.state === 'skeleton');
const onKey = (e) => { if (!off.value && ['Enter', ' ', 'ArrowDown'].includes(e.key)) { e.preventDefault(); emit('open', e); } };
</script>
<template>
  <div role="group" :aria-label="label" class="emcd-date-range">
    <DsInput :model-value="text" :label="label" :label-position="labelPosition" :state="state" :hint="hint" :error="error" :placeholder="placeholder" readonly aria-haspopup="dialog"
      @click="!off && emit('open', $event)" @keydown="onKey">
      <template #trailing><DsIcon name="calendar" /></template>
    </DsInput>
  </div>
</template>

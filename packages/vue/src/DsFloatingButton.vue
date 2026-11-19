<!-- Floating button — плавающая кнопка главного действия Compact, одна на экран (позиция справа снизу над Tab bar — у продукта). layout: icon — круг 56, только Primary, label → aria-label;
     extended — иконка + подпись: size l 56 (поля 20, зазор 8) | m 40 (поля 16, зазор 6), type primary | secondary (нейтральное: action-secondary-default, text-primary) — 19.11.
     icon — имя иконки DS (по умолчанию plus) или слот icon; loading — Spinner L, click не испускается. Контракт: docs/components/floating-button.md -->
<script setup>
import { computed } from 'vue';
import DsIcon from './DsIcon.vue';
import DsSpinner from './DsSpinner.vue';
const props = defineProps({
  layout: { type: String, default: 'icon' },   // icon | extended
  size: { type: String, default: 'l' },        // l | m — только extended
  type: { type: String, default: 'primary' },  // primary | secondary — только extended
  label: String,                               // подпись extended; у icon — доступное имя
  icon: { type: String, default: 'plus' },
  loading: Boolean,
  disabled: Boolean,
  htmlType: { type: String, default: 'button' },
});
const emit = defineEmits(['click']);
const ext = computed(() => props.layout === 'extended');
const cls = computed(() => ['emcd-fab', ext.value && 'emcd-fab--extended', ext.value && props.size === 'm' && 'emcd-fab--m', ext.value && props.type === 'secondary' && 'emcd-fab--secondary', props.loading && 'emcd-fab--loading']);
</script>
<template>
  <button :type="htmlType" :class="cls" :disabled="disabled" :aria-busy="loading || undefined" :aria-label="ext ? undefined : label" @click="!loading && emit('click', $event)">
    <DsSpinner v-if="loading" size="l" :label="label || 'Загрузка'" class="emcd-fab__icon" />
    <span v-else class="emcd-fab__icon" aria-hidden="true"><slot name="icon"><DsIcon :name="icon" /></slot></span>
    <span v-if="ext" class="emcd-fab__label"><slot>{{ label }}</slot></span>
  </button>
</template>

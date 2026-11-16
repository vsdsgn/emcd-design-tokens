<!-- Segment — сегмент DsSegmented (value; выбор от родителя) или отдельно (selected). showLabel=false — только иконка, label → aria-label. Контракт: docs/components/segment.md -->
<script setup>
import { computed, inject } from 'vue';
const props = defineProps({
  size: String,               // от DsSegmented
  selected: Boolean,
  value: [String, Number],
  tone: String,               // neutral | accent; по умолчанию — от DsSegmented
  label: String,
  showLabel: { type: Boolean, default: true },
  disabled: Boolean,
});
const emit = defineEmits(['click']);
const ctx = inject('emcd-segmented', null);
const sel = computed(() => (ctx && props.value !== undefined ? ctx.value.value === props.value : props.selected));
const t = computed(() => props.tone || (ctx && ctx.tone.value) || 'neutral');
const onClick = (e) => { if (ctx && props.value !== undefined) ctx.select(props.value); emit('click', e); };
</script>
<template>
  <button type="button" role="radio" :aria-checked="sel" :tabindex="ctx ? (sel ? 0 : -1) : undefined" :disabled="disabled"
    :aria-label="showLabel ? undefined : label" :title="showLabel ? undefined : label"
    :class="['emcd-segment', t === 'accent' && 'emcd-segment--accent', !showLabel && 'emcd-segment--icon-only']" @click="onClick">
    <slot name="icon" /><span v-if="showLabel" class="emcd-segment__label"><slot>{{ label }}</slot></span>
  </button>
</template>

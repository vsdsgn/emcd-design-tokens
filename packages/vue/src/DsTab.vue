<!-- Tab — вкладка DsTabs (внутри — value; выбор от родителя) или отдельно (selected). counter — число в Counter. Контракт: docs/components/tab.md -->
<script setup>
import { computed, inject } from 'vue';
import DsCounter from './DsCounter.vue';
const props = defineProps({
  size: String,                                    // s | m | l | xl; по умолчанию — от DsTabs (m)
  selected: Boolean,
  value: [String, Number],
  label: String,
  counter: [String, Number],
  counterTone: { type: String, default: 'neutral' }, // accent / danger — только если требует действия
  disabled: Boolean,
  skeleton: Boolean,
});
const emit = defineEmits(['click']);
const ctx = inject('emcd-tabs', null);
const sz = computed(() => props.size || (ctx && ctx.size.value) || 'm');
const sel = computed(() => (ctx && props.value !== undefined ? ctx.value.value === props.value : props.selected));
const onClick = (e) => { if (ctx && props.value !== undefined) ctx.select(props.value); emit('click', e); };
</script>
<template>
  <button type="button" role="tab" :aria-selected="sel" :tabindex="ctx ? (sel ? 0 : -1) : undefined" :disabled="disabled || skeleton" :aria-hidden="skeleton || undefined"
    :class="['emcd-tab', sz !== 'm' && `emcd-tab--${sz}`, skeleton && 'emcd-tab--skeleton']" @click="onClick">
    <slot name="icon" /><span class="emcd-tab__label"><slot>{{ label }}</slot></span>
    <DsCounter v-if="counter != null" :size="sz === 'l' || sz === 'xl' ? 'm' : 's'" :tone="counterTone" :value="counter" />
    <span class="emcd-tab__ring" aria-hidden="true" />
  </button>
</template>

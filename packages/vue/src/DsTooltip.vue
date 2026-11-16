<!-- Tooltip — подсказка к элементу на Web. Со слотом default — оборачивает триггер (слот отдаёт describedby для aria-describedby триггера) (наведение, фокус, Escape скрывает); без него — сам пузырь. Контракт: docs/components/tooltip.md -->
<script setup>
import { ref, useId, useSlots } from 'vue';
defineProps({
  placement: { type: String, default: 'top' }, // top | bottom | start | end
  tone: { type: String, default: 'neutral' },  // neutral | accent
  arrow: { type: String, default: 'center' },  // center | start | end
  text: String,
  open: { type: Boolean, default: undefined },
});
const id = useId();
const hidden = ref(false);
const slots = useSlots();
</script>
<template>
  <span v-if="slots.default" class="emcd-tooltip-anchor" :data-open="open ? '' : undefined" :data-hidden="hidden ? '' : undefined"
    @keydown.esc="hidden = true" @mouseleave="hidden = false" @focusout="hidden = false">
    <slot :describedby="id" />
    <span v-if="open !== false" role="tooltip" :id="id" :class="['emcd-tooltip', `emcd-tooltip--${placement}`, tone === 'accent' && 'emcd-tooltip--accent', arrow !== 'center' && `emcd-tooltip--arrow-${arrow}`]">
      <slot name="text">{{ text }}</slot>
      <svg class="emcd-tooltip__arrow" viewBox="0 0 26 9" aria-hidden="true"><path class="emcd-tooltip__arrow-fill" d="M0 -1.5V.5L10.6 7.9Q13 9.6 15.4 7.9L26 .5V-1.5Z"/><path class="emcd-tooltip__arrow-edge" d="M0 .5L10.6 7.9Q13 9.6 15.4 7.9L26 .5"/></svg>
    </span>
  </span>
  <span v-else role="tooltip" :id="id" :class="['emcd-tooltip', `emcd-tooltip--${placement}`, tone === 'accent' && 'emcd-tooltip--accent', arrow !== 'center' && `emcd-tooltip--arrow-${arrow}`]">
    <slot name="text">{{ text }}</slot>
    <svg class="emcd-tooltip__arrow" viewBox="0 0 26 9" aria-hidden="true"><path class="emcd-tooltip__arrow-fill" d="M0 -1.5V.5L10.6 7.9Q13 9.6 15.4 7.9L26 .5V-1.5Z"/><path class="emcd-tooltip__arrow-edge" d="M0 .5L10.6 7.9Q13 9.6 15.4 7.9L26 .5"/></svg>
  </span>
</template>

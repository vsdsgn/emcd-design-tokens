<!-- List item — строка списка. content: text-first | description-first | big-value | description-only. href / interactive — строка открывает детали (Hover / Pressed). Контракт: docs/components/list-item.md -->
<script setup>
import { computed } from 'vue';
const props = defineProps({
  size: { type: String, default: 'l' },               // l — Web | m — Compact
  content: { type: String, default: 'text-first' },
  label: String,
  description: String,
  showDescription: { type: Boolean, default: true },  // false — строка из одного названия (19.11)
  value: [String, Number],                            // big-value: крупное значение
  subvalue: String,                                   // big-value: единица
  divider: Boolean,
  inset: { type: Boolean, default: true },          // false — без боковых полей: список внутри Card (19.11)
  disabled: Boolean,
  href: String,
  interactive: Boolean,
});
defineEmits(['click']);
const tag = computed(() => (props.href ? 'a' : props.interactive ? 'button' : 'div'));
</script>
<template>
  <component :is="tag" :href="disabled ? undefined : href" :type="tag === 'button' ? 'button' : undefined" :disabled="tag === 'button' ? disabled : undefined"
    :aria-disabled="tag !== 'button' && disabled ? true : undefined"
    :class="['emcd-list-item', size === 'm' && 'emcd-list-item--m', content !== 'text-first' && `emcd-list-item--${content}`, (href || interactive) && 'emcd-list-item--interactive', divider && 'emcd-list-item--divider', !inset && 'emcd-list-item--flush', disabled && 'emcd-list-item--disabled']"
    @click="!disabled && $emit('click', $event)">
    <span v-if="$slots.leading" class="emcd-list-item__leading"><slot name="leading" /></span>
    <span class="emcd-list-item__content">
      <template v-if="content === 'description-first'">
        <span v-if="showDescription && description" class="emcd-list-item__desc">{{ description }}</span><span v-if="label" class="emcd-list-item__label">{{ label }}</span>
      </template>
      <template v-else-if="content === 'big-value'">
        <span v-if="showDescription && description" class="emcd-list-item__desc">{{ description }}</span>
        <span class="emcd-list-item__value-row"><span class="emcd-list-item__value">{{ value ?? label }}</span><span v-if="subvalue" class="emcd-list-item__subvalue">{{ subvalue }}</span></span>
      </template>
      <span v-else-if="content === 'description-only'" class="emcd-list-item__label">{{ label ?? description }}</span>
      <template v-else>
        <span v-if="label" class="emcd-list-item__label">{{ label }}</span><span v-if="showDescription && description" class="emcd-list-item__desc">{{ description }}</span>
      </template>
      <slot />
    </span>
    <span v-if="$slots.trailing" class="emcd-list-item__trailing"><slot name="trailing" /></span>
  </component>
</template>

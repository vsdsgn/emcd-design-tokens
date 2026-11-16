<!-- Menu item — пункт меню. tone danger — последним после разделителя. selected — галочка (одиночный выбор); showSelection — глиф Checkbox (множественный, v-model:selected). Контракт: docs/components/menu-item.md -->
<script setup>
import { computed, inject } from 'vue';
const props = defineProps({
  size: String,                            // m 44 | l 56; по умолчанию — от DsMenu
  tone: { type: String, default: 'default' }, // default | danger
  label: String,
  description: String,
  showSelection: Boolean,
  disabled: Boolean,
  role: String,
});
const selected = defineModel('selected', { type: Boolean, default: false });
const emit = defineEmits(['click']);
const ctx = inject('emcd-menu', null);
const sz = computed(() => props.size || (ctx && ctx.size) || 'm');
const r = computed(() => props.role || (ctx && ctx.role === 'listbox' ? 'option' : props.showSelection ? 'menuitemcheckbox' : 'menuitem'));
const onClick = (e) => { if (props.disabled) return; if (props.showSelection) selected.value = !selected.value; emit('click', e); };
</script>
<template>
  <component :is="r === 'option' ? 'div' : 'button'" :type="r === 'option' ? undefined : 'button'" :role="r" :disabled="r === 'option' ? undefined : disabled"
    :aria-disabled="r === 'option' && disabled ? true : undefined" :aria-selected="r === 'option' ? selected : undefined" :aria-checked="r === 'menuitemcheckbox' ? selected : undefined" :tabindex="r === 'option' ? -1 : undefined"
    :class="['emcd-menu-item', sz === 'l' && 'emcd-menu-item--l', tone === 'danger' && 'emcd-menu-item--danger']" @click="onClick">
    <span v-if="showSelection" class="emcd-menu-item__box" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>
    <span v-if="$slots.leading" class="emcd-menu-item__leading"><slot name="leading" /></span>
    <span class="emcd-menu-item__content"><span class="emcd-menu-item__label"><slot>{{ label }}</slot></span><span v-if="description" class="emcd-menu-item__desc">{{ description }}</span></span>
    <span v-if="$slots.trailing" class="emcd-menu-item__trailing"><slot name="trailing" /></span>
    <span v-if="!showSelection && selected" class="emcd-menu-item__check"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>
  </component>
</template>

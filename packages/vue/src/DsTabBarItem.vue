<!-- Tab bar item — пункт нижней навигации Compact. type: item — раздел (иконка 24 + подпись) | action — центральная мультикнопка App («E»): плашка 56 × 40 action-secondary-default
     с обводкой border-accent, только иконка / логотип (слот icon), без подписи и selected; label обязателен (aria-label). selected → aria-current="page". badgeDot — точка без числа (badgeLabel — в доступное имя).
     Контракт: docs/components/tab-bar-item.md -->
<script setup>
import { computed } from 'vue';
import DsIcon from './DsIcon.vue';
const props = defineProps({
  type: { type: String, default: 'item' }, // item | action
  selected: Boolean,
  label: String,
  icon: { type: String, default: undefined }, // по умолчанию: item — dots-grid, action — logo-emcd
  badgeDot: Boolean,
  badgeLabel: { type: String, default: 'есть уведомления' },
  href: String,
});
defineEmits(['click']);
const action = computed(() => props.type === 'action');
const iconName = computed(() => props.icon ?? (action.value ? 'logo-emcd' : 'dots-grid'));
</script>
<template>
  <component :is="href ? 'a' : 'button'" :href="href" :type="href ? undefined : 'button'" :aria-current="!action && selected ? 'page' : undefined" :aria-label="action ? label : undefined"
    :class="['emcd-tab-bar-item', action && 'emcd-tab-bar-item--action', !action && selected && 'emcd-tab-bar-item--selected']" @click="$emit('click', $event)">
    <span v-if="action" class="emcd-tab-bar-item__plate" aria-hidden="true"><slot name="icon"><DsIcon :name="iconName" /></slot></span>
    <template v-else>
      <span class="emcd-tab-bar-item__icon" aria-hidden="true"><slot name="icon"><DsIcon :name="iconName" /></slot><span v-if="badgeDot" class="emcd-tab-bar-item__dot" /></span>
      <span class="emcd-tab-bar-item__label">{{ label }}</span>
      <span v-if="badgeDot" class="emcd-sr">, {{ badgeLabel }}</span>
    </template>
  </component>
</template>

<!-- Nav item — пункт сайдбара Web. selected → aria-current="page"; collapsed — только иконка, подпись в Tooltip и aria-label. icon — имя иконки DS или слот icon.
     counter — Counter Danger (число или true); badge — Badge S (badgeLabel, badgeTone) или слот badge; вместе с counter не показывается. Контракт: docs/components/nav-item.md -->
<script setup>
import DsIcon from './DsIcon.vue';
import DsBadge from './DsBadge.vue';
import DsCounter from './DsCounter.vue';
import DsTooltip from './DsTooltip.vue';
defineProps({
  label: String,
  icon: { type: String, default: 'dots-grid' },
  href: String,
  selected: Boolean,
  collapsed: Boolean,
  counter: { type: [Boolean, Number, String], default: false },
  badge: Boolean,
  badgeLabel: String,
  badgeTone: { type: String, default: 'neutral' },
  disabled: Boolean,
});
defineEmits(['click']);
</script>
<template>
  <DsTooltip v-if="collapsed && label" :text="label" placement="end">
    <component :is="href ? 'a' : 'button'" :href="disabled ? undefined : href" :type="href ? undefined : 'button'" :disabled="href ? undefined : disabled" :aria-disabled="href && disabled ? 'true' : undefined"
      :aria-current="selected ? 'page' : undefined" :aria-label="label" class="emcd-nav-item emcd-nav-item--collapsed" @click="$emit('click', $event)">
      <span class="emcd-nav-item__icon"><slot name="icon"><DsIcon :name="icon" /></slot></span>
      <DsCounter v-if="counter !== false && counter != null" tone="danger" :value="counter === true ? undefined : counter" class="emcd-nav-item__counter" />
    </component>
  </DsTooltip>
  <component :is="href ? 'a' : 'button'" v-else :href="disabled ? undefined : href" :type="href ? undefined : 'button'" :disabled="href ? undefined : disabled" :aria-disabled="href && disabled ? 'true' : undefined"
    :aria-current="selected ? 'page' : undefined" :class="['emcd-nav-item', collapsed && 'emcd-nav-item--collapsed']" @click="$emit('click', $event)">
    <span class="emcd-nav-item__icon"><slot name="icon"><DsIcon :name="icon" /></slot></span>
    <span v-if="!collapsed" class="emcd-nav-item__label"><slot>{{ label }}</slot></span>
    <template v-if="!collapsed && (counter === false || counter == null)"><slot name="badge"><DsBadge v-if="badge" size="s" :tone="badgeTone" :label="badgeLabel" class="emcd-nav-item__badge" /></slot></template>
    <DsCounter v-if="counter !== false && counter != null" tone="danger" :value="counter === true ? undefined : counter" class="emcd-nav-item__counter" />
  </component>
</template>

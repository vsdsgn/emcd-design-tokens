<!-- Button — действие. Одна главная (primary) на экран или блок. Контракт: docs/components/button.md -->
<script setup>
import { computed } from 'vue';
import DsBadge from './DsBadge.vue';
import DsIcon from './DsIcon.vue';
const props = defineProps({
  type: { type: String, default: 'primary' }, // primary | secondary | tertiary | tertiary-outline | text | inverted
  tone: { type: String, default: 'default' }, // default | danger
  size: { type: String, default: 'm' },       // xs 24 (Web) | s | m | l | xl (только App: главный CTA внизу экрана)
  label: String,
  badge: String,                              // 22.11: состояние действия после подписи («Авто»)
  badgeIcon: { type: String, default: 'history' },
  loading: Boolean,
  disabled: Boolean,
  htmlType: { type: String, default: 'button' },
});
const TYPE = { primary: 'primary', secondary: 'secondary', tertiary: 'tertiary', 'tertiary-outline': 'outline', text: 'text', inverted: 'inverted' };
const cls = computed(() => ['emcd-btn', `emcd-btn--${TYPE[props.type]}`, props.tone === 'danger' && 'emcd-btn--danger', props.size !== 'm' && `emcd-btn--${props.size}`]);
</script>
<template>
  <button :type="htmlType" :class="cls" :disabled="disabled" :aria-busy="loading || undefined">
    <svg v-if="loading" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-opacity=".24" stroke-width="2"/><path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
    <slot v-else name="iconLeft" />
    <span><slot>{{ label }}</slot></span>
    <DsBadge v-if="badge" class="emcd-btn__badge" size="s" :tone="type === 'primary' || type === 'inverted' ? 'neutral' : 'accent'" :variant="type === 'primary' || type === 'inverted' ? 'solid' : 'subtle'" :label="badge"><template #icon><DsIcon v-if="badgeIcon" :name="badgeIcon" /></template></DsBadge>
    <slot v-if="!loading" name="iconRight" />
  </button>
</template>

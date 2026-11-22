<!-- Bulk action bar — массовые действия над выбранными строками (draft, 22.11): count / total, actions (до двух), события more / clear (и Esc). Контракт: docs/components/bulk-action-bar.md -->
<script setup>
import { computed } from 'vue';
import DsButton from './DsButton.vue';
import DsIconButton from './DsIconButton.vue';
import DsIcon from './DsIcon.vue';
const props = defineProps({
  count: Number,
  total: Number,
  label: String,
  actions: { type: Array, default: () => [] },
  showMore: { type: Boolean, default: true },
  moreLabel: { type: String, default: 'Ещё действия' },
  clearLabel: { type: String, default: 'Снять выбор' },
  toolbarLabel: { type: String, default: 'Действия с выбранными' },
});
const emit = defineEmits(['action', 'more', 'clear']);
const text = computed(() => props.label ?? `Выбрано ${props.count}${props.total != null ? ' из ' + props.total : ''}`);
</script>
<template>
  <div class="emcd-bulk-bar" role="toolbar" :aria-label="toolbarLabel" @keydown.esc="emit('clear')">
    <span class="emcd-bulk-bar__count" aria-live="polite">{{ text }}</span>
    <span class="emcd-bulk-bar__actions">
      <DsButton v-for="(a, i) in actions.slice(0, 2)" :key="i" type="tertiary" size="m" :label="a.label" :disabled="a.disabled" @click="emit('action', a, i)" />
      <DsIconButton v-if="showMore" type="tertiary" size="m" :label="moreLabel" @click="emit('more')"><DsIcon name="more-horizontal" /></DsIconButton>
    </span>
    <DsIconButton type="ghost" size="m" :label="clearLabel" @click="emit('clear')"><DsIcon name="close" /></DsIconButton>
  </div>
</template>

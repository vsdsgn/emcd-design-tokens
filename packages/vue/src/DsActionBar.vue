<!-- Action bar (draft) — нижняя панель действий Compact: 1–2 Button M поровну, surface-level-0, прилипает к низу. actions — [{ label, type }] (одно — Primary, два — Tertiary; событие action(i)) или свои DsButton в слоте. badge + badgeText («A») — Badge S над последней кнопкой (19.11). Контракт: docs/components/action-bar.md -->
<script setup>
import DsButton from './DsButton.vue';
import DsBadge from './DsBadge.vue';
defineProps({
  actions: Array,
  badge: Boolean,                         // бейдж автодействия над последней кнопкой (19.11; только с actions)
  badgeText: { type: String, default: 'A' },
});
const emit = defineEmits(['action']);
</script>
<template>
  <div class="emcd-action-bar">
    <slot>
      <template v-for="(a, i) in (actions || []).slice(0, 2)" :key="i">
        <span v-if="badge && i === Math.min(actions.length, 2) - 1" class="emcd-action-bar__slot">
          <DsButton size="m" :type="a.type || (actions.length === 1 ? 'primary' : 'tertiary')" :label="a.label" @click="emit('action', i, $event)" />
          <DsBadge size="s" tone="neutral" :label="badgeText" class="emcd-action-bar__badge" />
        </span>
        <DsButton v-else size="m" :type="a.type || (actions.length === 1 ? 'primary' : 'tertiary')" :label="a.label" @click="emit('action', i, $event)" />
      </template>
    </slot>
  </div>
</template>

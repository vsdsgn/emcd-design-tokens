<!-- Action bar (draft) — нижняя панель действий Compact: 1–2 Button M поровну, surface-level-0, прилипает к низу. actions — [{ label, type }] (одно — Primary, два — Tertiary; событие action(i)) или свои DsButton в слоте. Контракт: docs/components/action-bar.md -->
<script setup>
import DsButton from './DsButton.vue';
defineProps({ actions: Array });
const emit = defineEmits(['action']);
</script>
<template>
  <div class="emcd-action-bar">
    <slot>
      <DsButton v-for="(a, i) in (actions || []).slice(0, 2)" :key="i" size="m" :type="a.type || (actions.length === 1 ? 'primary' : 'tertiary')" :label="a.label" @click="emit('action', i, $event)" />
    </slot>
  </div>
</template>

<!-- Table row — строка (tr) из DsTableCell. density: compact 48 | regular 64; selected — accent-subtle; interactive — строка открывает детали (Hover / Pressed, Tab + Enter, событие click). Контракт: docs/components/table-row.md -->
<script setup>
defineProps({
  density: { type: String, default: 'compact' },
  selected: Boolean,
  interactive: Boolean,
});
const emit = defineEmits(['click']);
</script>
<template>
  <tr :class="['emcd-tr', density === 'regular' && 'emcd-tr--regular', selected && 'emcd-tr--selected', interactive && 'emcd-tr--interactive']" :data-selected="selected ? '' : undefined"
    :tabindex="interactive ? 0 : undefined" @click="interactive && emit('click', $event)" @keydown.enter="interactive && $event.target === $event.currentTarget && emit('click', $event)"><slot /></tr>
</template>

<!-- Table cell — ячейка (td). align: start | end. Содержимое — слот (атом DS) или primary + secondary (две строки текста); skeleton — полоса; disabled — text-disabled. Контракт: docs/components/table-cell.md -->
<script setup>
defineProps({
  align: { type: String, default: 'start' },
  primary: [String, Number],
  secondary: [String, Number],
  skeleton: Boolean,
  disabled: Boolean,
});
</script>
<template>
  <td :class="['emcd-td', align === 'end' && 'emcd-td--end', skeleton && 'emcd-td--skeleton', disabled && 'emcd-td--disabled']" :aria-busy="skeleton || undefined">
    <div class="emcd-td__content">
      <span v-if="skeleton" class="emcd-td__bone" aria-hidden="true" />
      <slot v-else>
        <span class="emcd-td__primary" :title="primary != null ? String(primary) : undefined">{{ primary }}</span>
        <span v-if="secondary != null" class="emcd-td__secondary" :title="String(secondary)">{{ secondary }}</span>
      </slot>
    </div>
  </td>
</template>

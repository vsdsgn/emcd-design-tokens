<!-- Menu — всплывающий список: в слоте — DsMenuItem, подписи групп (.emcd-menu__group), разделители (.emcd-menu__line). search — от 10 пунктов (событие search). Контракт: docs/components/menu.md -->
<script setup>
import { provide } from 'vue';
import DsInput from './DsInput.vue';
const props = defineProps({
  size: { type: String, default: 'm' },     // m — действия и списки | l — монета, кошелёк, сеть; меню в Sheet
  search: Boolean,
  searchPlaceholder: { type: String, default: 'Поиск' },
  role: { type: String, default: 'menu' },  // menu | listbox (у Select)
  label: String,
  listId: String,
});
const emit = defineEmits(['search']);
provide('emcd-menu', { size: props.size, role: props.role });
const keys = (e) => {
  if (props.role !== 'menu') return;
  const list = [...e.currentTarget.querySelectorAll('.emcd-menu-item:not(:disabled)')];
  const step = e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0; if (!step || !list.length) return;
  e.preventDefault(); list[(list.indexOf(document.activeElement) + step + list.length) % list.length].focus();
};
</script>
<template>
  <div class="emcd-menu">
    <DsInput v-if="search" :placeholder="searchPlaceholder" :aria-label="searchPlaceholder" @input="emit('search', $event.target.value)">
      <template #leading><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg></template>
    </DsInput>
    <div :id="listId" :role="role" :aria-label="label" class="emcd-menu__items" @keydown="keys"><slot /></div>
  </div>
</template>

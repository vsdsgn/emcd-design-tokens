<!-- Table header cell — заголовок колонки (th scope=col, aria-sort). align: start | end; sortable — кнопка сортировки None → Descending → Ascending (v-model:sort); showFilter / showInfo; skeleton. Контракт: docs/components/table-header-cell.md -->
<script setup>
import { ref, computed } from 'vue';
import DsIcon from './DsIcon.vue';
import DsCheckbox from './DsCheckbox.vue';
const props = defineProps({
  align: { type: String, default: 'start' },     // start | end
  sort: { type: String, default: undefined },    // none | ascending | descending; без sort — своё состояние
  sortable: { type: Boolean, default: true },
  label: String,
  showFilter: Boolean,
  showInfo: Boolean,
  infoLabel: { type: String, default: 'Пояснение' },
  selectAll: Boolean,                            // Checkbox «выбрать все» перед подписью
  selectStatus: { type: String, default: 'off' },  // off | on | indeterminate
  selectLabel: { type: String, default: 'Выбрать все' },
  skeleton: Boolean,
});
const emit = defineEmits(['update:sort', 'select-all']);
const inner = ref('none');
const cur = computed(() => props.sort ?? inner.value);
const NEXT = { none: 'descending', descending: 'ascending', ascending: 'descending' };
const ICON = { none: 'sort', descending: 'sort-line-down', ascending: 'sort-line-up' };
const toggle = () => { const v = NEXT[cur.value] || 'descending'; inner.value = v; emit('update:sort', v); };
</script>
<template>
  <th scope="col" :aria-sort="sortable && !skeleton ? cur : undefined" :class="['emcd-th', align === 'end' && 'emcd-th--end', sortable && cur !== 'none' && 'emcd-th--sorted', skeleton && 'emcd-th--skeleton']">
    <span v-if="skeleton" class="emcd-th__bone" aria-hidden="true" />
    <span v-else :class="selectAll && 'emcd-th__select-row'">
    <DsCheckbox v-if="selectAll" :model-value="selectStatus === 'on'" :indeterminate="selectStatus === 'indeterminate'" :label="selectLabel" class="emcd-th__select" @update:model-value="(v) => emit('select-all', v)" />
    <component :is="sortable ? 'button' : 'span'" :type="sortable ? 'button' : undefined" :class="sortable ? 'emcd-th__button' : 'emcd-th__content'" @click="sortable && toggle()">
      <DsIcon v-if="showFilter" name="filter" size="sm" class="emcd-th__filter" />
      <DsIcon v-if="sortable" :name="ICON[cur] || 'sort'" size="sm" class="emcd-th__sort" />
      <span class="emcd-th__label" :title="label"><slot>{{ label }}</slot></span>
      <DsIcon v-if="showInfo" name="info" size="sm" :label="infoLabel" class="emcd-th__info" />
    </component>
    </span>
  </th>
</template>

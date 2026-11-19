<!-- Table — таблица Web (паттерн, не набор Figma): шапка DsTableHeaderCell + строки DsTableRow. columns: [{ key, label, align, sortable, width }]; rows: [{ id, selected, …значения по key }];
     ячейка — слот `cell-<key>` ({ row }) или значение row[key]. v-model:sort — { key, dir } (данные сортирует продукт); событие row-click(row) — строки открывают детали; skeletonRows — строки-скелетоны. -->
<script setup>
import { ref, computed } from 'vue';
import DsTableHeaderCell from './DsTableHeaderCell.vue';
import DsTableRow from './DsTableRow.vue';
import DsTableCell from './DsTableCell.vue';
const props = defineProps({
  columns: { type: Array, default: () => [] },
  rows: { type: Array, default: () => [] },
  density: { type: String, default: 'compact' },
  sort: { type: Object, default: undefined },
  label: String,
  caption: String,
  interactive: Boolean,
  skeletonRows: { type: Number, default: 0 },
});
const emit = defineEmits(['update:sort', 'row-click']);
const inner = ref(null);
const cur = computed(() => props.sort ?? inner.value);
const setSort = (key, dir) => { inner.value = { key, dir }; emit('update:sort', { key, dir }); };
</script>
<template>
  <div class="emcd-table-wrap">
    <table class="emcd-table" :aria-label="caption ? undefined : label">
      <caption v-if="caption" class="emcd-table__caption">{{ caption }}</caption>
      <colgroup v-if="columns.length"><col v-for="(c, i) in columns" :key="c.key ?? i" :style="c.width != null ? { width: typeof c.width === 'number' ? c.width + 'px' : c.width } : undefined" /></colgroup>
      <thead v-if="columns.length">
        <tr class="emcd-table__head">
          <DsTableHeaderCell v-for="(c, i) in columns" :key="c.key ?? i" :label="c.label" :align="c.align" :sortable="!!c.sortable"
            :sort="c.sortable ? (cur && cur.key === c.key ? cur.dir : 'none') : undefined" @update:sort="setSort(c.key, $event)" />
        </tr>
      </thead>
      <tbody>
        <template v-if="columns.length">
          <DsTableRow v-for="(r, ri) in rows" :key="r.id ?? ri" :density="density" :selected="!!r.selected" :interactive="interactive" @click="emit('row-click', r, $event)">
            <DsTableCell v-for="(c, ci) in columns" :key="c.key ?? ci" :align="c.align"><slot :name="`cell-${c.key}`" :row="r">{{ r[c.key] }}</slot></DsTableCell>
          </DsTableRow>
        </template>
        <slot v-else />
        <DsTableRow v-for="i in skeletonRows" :key="'sk' + i" :density="density"><DsTableCell v-for="(c, ci) in columns" :key="ci" :align="c.align" skeleton /></DsTableRow>
      </tbody>
    </table>
  </div>
</template>

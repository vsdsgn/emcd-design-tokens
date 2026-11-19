<!-- Status summary (draft) — сводка воркеров: 3 × Stat card Align=Center (Отключённые → Нестабильные → Активные) со стрелкой (событие item(item)). layout: column (Web) | row (Compact, + «Все воркеры», событие all). Контракт: docs/components/status-summary.md -->
<script setup>
import { computed } from 'vue';
import DsStatCard from './DsStatCard.vue';
import DsButton from './DsButton.vue';
import DsIcon from './DsIcon.vue';
const props = defineProps({
  layout: { type: String, default: 'column' }, // column | row
  offline: [Number, String],
  unstable: [Number, String],
  active: [Number, String],
  items: Array,                                // [{ tone, label, value }] вместо трёх чисел
  showAllLink: { type: Boolean, default: true },
  allLinkLabel: { type: String, default: 'Все воркеры' },
});
const emit = defineEmits(['item', 'all']);
const DEF = [{ tone: 'danger', label: 'Отключённые' }, { tone: 'warning', label: 'Нестабильные' }, { tone: 'neutral', label: 'Активные' }];
const list = computed(() => props.items ?? DEF.map((d, i) => ({ ...d, value: [props.offline, props.unstable, props.active][i] })));
</script>
<template>
  <div :class="['emcd-status-summary', layout === 'row' && 'emcd-status-summary--row']">
    <div class="emcd-status-summary__tiles">
      <DsStatCard v-for="(it, i) in list" :key="i" :tone="it.tone" align="center" :label="it.label" :value="it.value" :delta="false" :info="false" link
        :link-label="it.value != null ? `${it.label}, ${it.value}` : it.label" class="emcd-status-summary__tile" @link="emit('item', it, $event)" />
    </div>
    <DsButton v-if="layout === 'row' && showAllLink" type="text" size="s" :label="allLinkLabel" class="emcd-status-summary__all" @click="emit('all', $event)">
      <template #iconRight><DsIcon name="chevron-right" size="sm" /></template>
    </DsButton>
  </div>
</template>

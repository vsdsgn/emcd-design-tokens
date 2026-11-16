<!-- Transaction — строка операции; нажимается вся строка (событие click → детали). Знак суммы — по type и status. Контракт: docs/components/transaction.md -->
<script setup>
import { computed } from 'vue';
import DsListItem from './DsListItem.vue';
import DsAmount from './DsAmount.vue';
import DsStatus from './DsStatus.vue';
const props = defineProps({
  type: { type: String, default: 'withdrawal' }, // withdrawal | deposit | reward | exchange
  status: { type: String, default: 'completed' }, // completed | pending | failed
  label: String,                                 // «Вывод BTC»
  description: String,                           // дата
  value: [String, Number],
  ticker: String,
  statusLabel: String,
  href: String,
});
defineEmits(['click']);
const TYPE = {
  withdrawal: ['Вывод', 'M12 19V5M6 11l6-6 6 6'], deposit: ['Пополнение', 'M12 5v14M18 13l-6 6-6-6'],
  reward: ['Начисление', 'M13 2.5L4.5 13.5H12l-1 8 8.5-11H12l1-8z'], exchange: ['Обмен', 'M7 4L3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7'],
};
const STATUS = { completed: ['success', 'Выполнено'], pending: ['warning', 'В обработке'], failed: ['danger', 'Отклонено'] };
const t = computed(() => TYPE[props.type] || TYPE.withdrawal);
const st = computed(() => STATUS[props.status] || STATUS.completed);
const sign = computed(() => (props.status === 'failed' || props.type === 'exchange' ? 'none' : props.type === 'withdrawal' ? 'negative' : 'positive'));
</script>
<template>
  <DsListItem size="m" :label="label ?? t[0]" :description="description" :href="href" :interactive="!href" :class="['emcd-tx', `emcd-tx--${type}`, `emcd-tx--${status}`]" @click="$emit('click', $event)">
    <template #leading><span class="emcd-tx__icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="t[1]"/></svg></span></template>
    <template #trailing>
      <DsAmount size="s" :sign="sign" :value="value" :ticker="ticker" :show-fiat="false" align="end" />
      <DsStatus size="s" :tone="st[0]" :label="statusLabel ?? st[1]" />
    </template>
  </DsListItem>
</template>

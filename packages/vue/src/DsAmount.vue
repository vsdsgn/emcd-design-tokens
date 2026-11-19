<!-- Amount — сумма + тикер (неразрывный пробел) + фиат. sign: positive «+» и цвет успеха; negative «−» (U+2212), не красный. Контракт: docs/components/amount.md -->
<script setup>
import { computed } from 'vue';
const props = defineProps({
  size: { type: String, default: 's' },    // s 12 — строки Compact | m 14 — карточки, таблицы Web | l 24 Bold — заголовок блока | xl — главный баланс
  sign: { type: String, default: 'none' }, // none | positive | negative
  value: [String, Number],
  ticker: String,
  fiat: String,
  showFiat: { type: Boolean, default: true },
  align: { type: String, default: 'start' }, // start | end (в Trailing строки)
});
const shown = computed(() => {
  if (props.value == null) return '';
  const v = String(props.value).replace(/^[-+−]\s*/, '');
  return props.sign === 'positive' ? '+' + v : props.sign === 'negative' ? '−' + v : v;
});
</script>
<template>
  <span :class="['emcd-amount', size !== 's' && `emcd-amount--${size}`, sign !== 'none' && `emcd-amount--${sign}`, align === 'end' && 'emcd-amount--end']">
    <span class="emcd-amount__row"><span class="emcd-amount__value"><slot>{{ shown }}</slot></span><template v-if="ticker">&nbsp;<span class="emcd-amount__ticker">{{ ticker }}</span></template></span>
    <span v-if="showFiat && fiat" class="emcd-amount__fiat">{{ fiat }}</span>
  </span>
</template>

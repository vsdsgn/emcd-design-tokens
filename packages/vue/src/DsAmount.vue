<!-- Amount — сумма + тикер (неразрывный пробел) + фиат. sign: positive «+» и цвет успеха; negative «−» (U+2212), не красный. tone: success | danger — цвет суммы без знака. Контракт: docs/components/amount.md -->
<script setup>
import { computed } from 'vue';
const props = defineProps({
  size: { type: String, default: 's' },    // s 12 — строки Compact | m 14 — карточки, таблицы Web | l 24 Bold — заголовок блока | xl — главный баланс
  sign: { type: String, default: 'none' }, // none | positive | negative
  tone: { type: String, default: 'default' }, // default | success | danger — цвет суммы и тикера без знака (только sign none; 19.11)
  value: [String, Number],
  ticker: String,
  fiat: String,
  showFiat: { type: Boolean, default: true },
  align: { type: String, default: 'start' }, // start | end (в Trailing строки)
  skeleton: Boolean,                         // загрузка: значение → плашка высотой строки, фиат → короче (если showFiat); sign не применяется
});
const shown = computed(() => {
  if (props.value == null) return '';
  const v = String(props.value).replace(/^[-+−]\s*/, '');
  return props.sign === 'positive' ? '+' + v : props.sign === 'negative' ? '−' + v : v;
});
</script>
<template>
  <span v-if="skeleton" :class="['emcd-amount', size !== 's' && `emcd-amount--${size}`, align === 'end' && 'emcd-amount--end', 'emcd-amount--skeleton']" aria-busy="true">
    <span class="emcd-amount__row"><span class="emcd-amount__bone" aria-hidden="true" /></span>
    <span v-if="showFiat" class="emcd-amount__bone emcd-amount__bone--fiat" aria-hidden="true" />
  </span>
  <span v-else :class="['emcd-amount', size !== 's' && `emcd-amount--${size}`, sign !== 'none' && `emcd-amount--${sign}`, sign === 'none' && tone !== 'default' && `emcd-amount--tone-${tone}`, align === 'end' && 'emcd-amount--end']">
    <span class="emcd-amount__row"><span class="emcd-amount__value"><slot>{{ shown }}</slot></span><template v-if="ticker">&nbsp;<span class="emcd-amount__ticker">{{ ticker }}</span></template></span>
    <span v-if="showFiat && fiat" class="emcd-amount__fiat">{{ fiat }}</span>
  </span>
</template>

<!-- Coin stack — монеты внахлёст. coins — тикеры по значимости; size: s (24) · m (32) · l (40); count — сколько показать (2–4); showMore + more — «+N». Контракт: docs/components/coin-stack.md -->
<script setup>
import { computed } from 'vue';
import DsCoin from './DsCoin.vue';
const props = defineProps({
  coins: { type: Array, default: () => [] },
  size: { type: String, default: 's' },               // s | m | l
  count: Number,                                       // 2 | 3 | 4; по умолчанию — все до 4
  showMore: { type: Boolean, default: undefined },     // по умолчанию — когда монет больше count
  more: String,                                        // «+N»
  label: String,
});
const COIN = { s: 'm', m: 'l', l: 'xl' };
const shown = computed(() => props.coins.slice(0, Math.max(1, Math.min(4, props.count ?? props.coins.length))));
const hidden = computed(() => props.coins.length - shown.value.length);
</script>
<template>
  <span :class="['emcd-coin-stack', size !== 's' && `emcd-coin-stack--${size}`]" :role="label ? 'img' : undefined" :aria-label="label" :aria-hidden="label ? undefined : 'true'">
    <DsCoin v-for="(c, i) in shown" :key="i" :coin="c" :size="COIN[size] || 'm'" class="emcd-coin-stack__coin" />
    <span v-if="showMore ?? hidden > 0" class="emcd-coin-stack__more">{{ more ?? `+${hidden}` }}</span>
  </span>
</template>

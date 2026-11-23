<!-- Coin — монета из Symbols. coin — тикер (btc, kas, ltc, doge) или имя файла; нет в Symbols — нейтральный круг с буквой. size: xs 16 · s 20 · m 24 · l 32 · xl 40; network + networkCoin — монета сети (не у XS). Контракт: docs/components/avatar.md (Type=Coin, 22.11) -->
<script setup>
import { computed } from 'vue';
import { COINS } from './icons.js';
const props = defineProps({
  coin: { type: String, default: 'btc' },
  size: { type: String, default: 'xs' },        // xs | s | m | l | xl
  network: Boolean,
  networkCoin: { type: String, default: 'usdt' },
  skeleton: Boolean,
  label: String,                                 // доступное имя; без него — декоративна (название монеты — текстом рядом)
});
const ALIAS = { bitcoin: 'btc', kaspa: 'kas', litecoin: 'ltc', dogecoin: 'doge', tether: 'usdt' };
const key = (c) => { const k = String(c ?? '').trim().toLowerCase().replace(/^[a-z]+-([a-z0-9]+)$/, '$1'); return ALIAS[k] || k; };
const glyph = (c) => ({ svg: COINS[key(c)], letter: (String(c ?? '?').trim()[0] || '?').toUpperCase() });
const main = computed(() => glyph(props.coin));
const net = computed(() => glyph(props.networkCoin));
</script>
<template>
  <span :class="['emcd-coin', size !== 'xs' && `emcd-coin--${size}`, skeleton && 'emcd-coin--skeleton']" :data-coin="key(coin)"
    :role="label && !skeleton ? 'img' : undefined" :aria-label="skeleton ? undefined : label" :aria-hidden="label && !skeleton ? undefined : 'true'">
    <template v-if="!skeleton">
      <svg v-if="main.svg" class="emcd-coin__glyph" :viewBox="main.svg.viewBox" aria-hidden="true" focusable="false" v-html="main.svg.body" />
      <span v-else class="emcd-coin__glyph emcd-coin__fallback" aria-hidden="true">{{ main.letter }}</span>
      <span v-if="network && size !== 'xs'" class="emcd-coin__network">
        <svg v-if="net.svg" class="emcd-coin__glyph" :viewBox="net.svg.viewBox" aria-hidden="true" focusable="false" v-html="net.svg.body" />
        <span v-else class="emcd-coin__glyph emcd-coin__fallback" aria-hidden="true">{{ net.letter }}</span>
      </span>
    </template>
  </span>
</template>

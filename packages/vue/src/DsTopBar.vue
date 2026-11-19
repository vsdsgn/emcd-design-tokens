<!-- Top bar (draft) — шапка мобильного веба: логотип (слот logo), аккаунт + шеврон (событие account), баланс с копейками text-tertiary (событие balance), «Меню» (событие menu). Контракт: docs/components/top-bar.md -->
<script setup>
import DsIcon from './DsIcon.vue';
import DsIconButton from './DsIconButton.vue';
defineProps({
  platform: { type: String, default: 'mobile-web' },
  logo: { type: String, default: 'E' },
  account: String,
  balance: String,
  cents: String,
  showBalance: { type: Boolean, default: true },
  menuLabel: { type: String, default: 'Меню' },
});
const emit = defineEmits(['account', 'balance', 'menu']);
</script>
<template>
  <header class="emcd-top-bar" :data-platform-variant="platform">
    <span class="emcd-top-bar__logo"><slot name="logo">{{ logo }}</slot></span>
    <button v-if="account" type="button" class="emcd-top-bar__account" @click="emit('account', $event)"><span class="emcd-top-bar__name">{{ account }}</span><DsIcon name="chevron-down" size="sm" /></button>
    <button v-if="showBalance && balance" type="button" class="emcd-top-bar__balance" :aria-label="`Баланс ${balance}${cents ?? ''}`" @click="emit('balance', $event)">
      <span class="emcd-top-bar__amount">{{ balance }}<span v-if="cents" class="emcd-top-bar__cents">{{ cents }}</span></span><DsIcon name="chevron-down" size="sm" />
    </button>
    <DsIconButton type="ghost" size="m" :label="menuLabel" class="emcd-top-bar__menu" @click="emit('menu', $event)"><DsIcon name="menu" /></DsIconButton>
  </header>
</template>

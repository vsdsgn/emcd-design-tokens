<!-- Top bar (draft) — верхняя панель корневых экранов. platform: mobile-web — логотип (слот logo), аккаунт + шеврон (событие account), баланс с копейками text-tertiary (событие balance), «Меню» (событие menu);
     app (19.11) — Select compact аккаунта в начале (без leading), в конце Select compact монеты (Coin stack из coins) + Icon button Secondary M «+» (событие add, addLabel «Подключить»).
     app: accountOptions + v-model:accountValue / coinOptions + v-model:coinValue — списки; без списка — события account / coin (свой Sheet). Контракт: docs/components/top-bar.md -->
<script setup>
import { computed } from 'vue';
import DsIcon from './DsIcon.vue';
import DsIconButton from './DsIconButton.vue';
import DsSelectCompact from './DsSelectCompact.vue';
import DsCoinStack from './DsCoinStack.vue';
const props = defineProps({
  platform: { type: String, default: 'mobile-web' },   // mobile-web | app
  logo: { type: String, default: 'E' },
  account: String,
  balance: String,
  cents: String,
  showBalance: { type: Boolean, default: true },
  menuLabel: { type: String, default: 'Меню' },
  accountOptions: Array,
  coin: String,
  coins: Array,
  coinOptions: Array,
  addLabel: { type: String, default: 'Подключить' },
});
const accountValue = defineModel('accountValue', { type: [String, Number], default: undefined });
const coinValue = defineModel('coinValue', { type: [String, Number], default: undefined });
const emit = defineEmits(['account', 'balance', 'menu', 'coin', 'add']);
const stack = computed(() => (props.coins && props.coins.length ? props.coins : props.coin ? [props.coin.toLowerCase()] : []));
</script>
<template>
  <header v-if="platform === 'app'" class="emcd-top-bar emcd-top-bar--app" data-platform-variant="app">
    <DsSelectCompact v-if="account != null && accountOptions" v-model="accountValue" label="Аккаунт" :options="accountOptions" :show-leading="false" class="emcd-top-bar__select" />
    <DsSelectCompact v-else-if="account != null" label="Аккаунт" :text="account" :show-leading="false" :open="false" class="emcd-top-bar__select" @update:open="(o) => o && emit('account')" />
    <div class="emcd-top-bar__end">
      <DsSelectCompact v-if="coin != null && coinOptions" v-model="coinValue" label="Монета" :options="coinOptions" class="emcd-top-bar__select">
        <template v-if="stack.length" #leading><DsCoinStack :coins="stack" size="s" /></template>
      </DsSelectCompact>
      <DsSelectCompact v-else-if="coin != null" label="Монета" :text="coin" :open="false" class="emcd-top-bar__select" @update:open="(o) => o && emit('coin')">
        <template v-if="stack.length" #leading><DsCoinStack :coins="stack" size="s" /></template>
      </DsSelectCompact>
      <DsIconButton type="secondary" size="m" :label="addLabel" class="emcd-top-bar__add" @click="emit('add', $event)"><DsIcon name="plus" /></DsIconButton>
    </div>
  </header>
  <header v-else class="emcd-top-bar" :data-platform-variant="platform">
    <span class="emcd-top-bar__logo"><slot name="logo">{{ logo }}</slot></span>
    <button v-if="account" type="button" class="emcd-top-bar__account" @click="emit('account', $event)"><span class="emcd-top-bar__name">{{ account }}</span><DsIcon name="chevron-down" size="sm" /></button>
    <button v-if="showBalance && balance" type="button" class="emcd-top-bar__balance" :aria-label="`Баланс ${balance}${cents ?? ''}`" @click="emit('balance', $event)">
      <span class="emcd-top-bar__amount">{{ balance }}<span v-if="cents" class="emcd-top-bar__cents">{{ cents }}</span></span><DsIcon name="chevron-down" size="sm" />
    </button>
    <DsIconButton type="ghost" size="m" :label="menuLabel" class="emcd-top-bar__menu" @click="emit('menu', $event)"><DsIcon name="menu" /></DsIconButton>
  </header>
</template>

<!-- Sidebar — основная навигация Web (Large+), плавающая панель L1. collapsed — рейка 72 (v-model:collapsed + collapsible — кнопка «свернуть», aria-expanded).
     Header: слот header или logo (слот logo) + language (Button Secondary XS, событие language) + слот cta. Nav: слот nav или items — [{ label, icon, href, selected, counter, badge, badgeLabel, badgeTone } | { divider: true }] (событие navigate(item)).
     promo — показывать слот promo (Promo card S), при collapsed скрыт. Footer: слот footer + account — { name, link, src } (событие account). Контракт: docs/components/sidebar.md -->
<script setup>
import DsIcon from './DsIcon.vue';
import DsIconButton from './DsIconButton.vue';
import DsButton from './DsButton.vue';
import DsNavItem from './DsNavItem.vue';
import DsAvatar from './DsAvatar.vue';
defineProps({
  collapsible: Boolean,
  collapseLabel: { type: String, default: 'Свернуть меню' },
  expandLabel: { type: String, default: 'Развернуть меню' },
  logo: { type: String, default: 'EMCD' },
  language: String,
  items: { type: Array, default: () => [] },
  promo: { type: Boolean, default: true },
  account: Object,
  label: { type: String, default: 'Основная навигация' },
});
const collapsed = defineModel('collapsed', { type: Boolean, default: false });
const emit = defineEmits(['language', 'navigate', 'account']);
</script>
<template>
  <aside :class="['emcd-sidebar', collapsed && 'emcd-sidebar--collapsed']">
    <div class="emcd-sidebar__header">
      <slot name="header">
        <div class="emcd-sidebar__brand">
          <DsIconButton v-if="collapsible" type="tertiary" size="xs" :label="collapsed ? expandLabel : collapseLabel" :aria-expanded="!collapsed" class="emcd-sidebar__toggle" @click="collapsed = !collapsed">
            <DsIcon :name="collapsed ? 'chevron-right' : 'chevron-left'" />
          </DsIconButton>
          <span v-if="!collapsed" class="emcd-sidebar__logo"><slot name="logo">{{ logo }}</slot></span>
          <DsButton v-if="!collapsed && language" type="secondary" size="xs" :label="language" class="emcd-sidebar__language" @click="emit('language', $event)" />
        </div>
        <div v-if="!collapsed && $slots.cta" class="emcd-sidebar__cta"><slot name="cta" /></div>
      </slot>
    </div>
    <nav class="emcd-sidebar__nav" :aria-label="label">
      <slot name="nav">
        <template v-for="(it, i) in items" :key="it.key ?? i">
          <hr v-if="it.divider" class="emcd-sidebar__divider">
          <DsNavItem v-else :label="it.label" :icon="it.icon" :href="it.href" :selected="!!it.selected" :counter="it.counter ?? false" :badge="!!it.badge" :badge-label="it.badgeLabel"
            :badge-tone="it.badgeTone || 'neutral'" :collapsed="collapsed" @click="emit('navigate', it, $event)" />
        </template>
      </slot>
    </nav>
    <div v-if="!collapsed && promo && $slots.promo" class="emcd-sidebar__promo"><slot name="promo" /></div>
    <div v-if="$slots.footer || account" class="emcd-sidebar__footer">
      <slot name="footer" />
      <button v-if="account" type="button" class="emcd-sidebar__account" :aria-label="collapsed ? account.name : undefined" @click="emit('account', $event)">
        <DsAvatar size="m" :name="account.name" :src="account.src" />
        <span v-if="!collapsed" class="emcd-sidebar__account-text">
          <span class="emcd-sidebar__account-name">{{ account.name }}</span>
          <span class="emcd-sidebar__account-link">{{ account.link ?? 'Профиль' }}</span>
        </span>
        <DsIcon v-if="!collapsed" name="chevron-down" class="emcd-sidebar__account-chevron" />
      </button>
    </div>
  </aside>
</template>

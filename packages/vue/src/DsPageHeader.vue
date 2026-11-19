<!-- Page header — шапка страницы (beta, 19.11). size: large — Web, Heading/XL, действия справа (до двух: Secondary M + Primary M); compact — под Top bar на корневых экранах App / мобильного веба, Heading/LG, действия рядом под заголовком с переносом. title — заголовок level (по умолчанию h1); subtitle — сводка одной строкой; слоты breadcrumbs (только вложенные страницы Web, в nav «Хлебные крошки»), actions, tabs (последним). Контракт: docs/components/page-header.md -->
<script setup>
import { computed, useSlots } from 'vue';
const props = defineProps({
  size: { type: String, default: 'large' },       // large — Web | compact — App / мобильный веб под Top bar
  level: { type: [Number, String], default: 1 },  // уровень заголовка: 1 | 2 | 3
  title: String,
  subtitle: String,
  showSubtitle: { type: Boolean, default: undefined }, // по умолчанию — есть ли subtitle
  breadcrumbsLabel: { type: String, default: 'Хлебные крошки' },
  showActions: { type: Boolean, default: undefined },  // по умолчанию — есть ли слот actions
  showTabs: { type: Boolean, default: undefined },     // по умолчанию — есть ли слот tabs
});
const slots = useSlots();
const tag = computed(() => ([1, 2, 3].includes(Number(props.level)) ? `h${Number(props.level)}` : 'h1'));
const hasSubtitle = computed(() => (props.showSubtitle ?? true) && (props.subtitle != null || !!slots.subtitle));
const hasActions = computed(() => (props.showActions ?? true) && !!slots.actions);
const hasTabs = computed(() => (props.showTabs ?? true) && !!slots.tabs);
</script>
<template>
  <header :class="['emcd-page-header', size === 'compact' && 'emcd-page-header--compact']">
    <nav v-if="$slots.breadcrumbs" class="emcd-page-header__breadcrumbs" :aria-label="breadcrumbsLabel"><slot name="breadcrumbs" /></nav>
    <div class="emcd-page-header__row">
      <div class="emcd-page-header__text">
        <component :is="tag" class="emcd-page-header__title"><slot name="title">{{ title }}</slot></component>
        <p v-if="hasSubtitle" class="emcd-page-header__subtitle"><slot name="subtitle">{{ subtitle }}</slot></p>
      </div>
      <div v-if="hasActions" class="emcd-page-header__actions"><slot name="actions" /></div>
    </div>
    <div v-if="hasTabs" class="emcd-page-header__tabs"><slot name="tabs" /></div>
  </header>
</template>

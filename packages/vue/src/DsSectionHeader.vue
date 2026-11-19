<!-- Section header — заголовок секции внутри карточки или формы (draft, 19.11): title (h2–h4, по умолчанию h3), caption (body/sm text/secondary), слот trailing (Toggle, Button Text, Badge, Select compact). size: m — label/lg 16 · s — label/md 14. Контракт: docs/components/section-header.md -->
<script setup>
import { computed, useSlots } from 'vue';
const props = defineProps({
  size: { type: String, default: 'm' },          // m — секция карточки | s — подсекция
  level: { type: [Number, String], default: 3 }, // уровень заголовка: 2 | 3 | 4
  title: String,
  caption: String,
  showCaption: { type: Boolean, default: undefined },  // по умолчанию — есть ли caption
  trailing: String,
  showTrailing: { type: Boolean, default: undefined }, // по умолчанию — есть ли trailing (prop или слот)
});
const slots = useSlots();
const tag = computed(() => ([2, 3, 4].includes(Number(props.level)) ? `h${Number(props.level)}` : 'h3'));
const hasCaption = computed(() => (props.showCaption ?? true) && (props.caption != null || !!slots.caption));
const hasTrailing = computed(() => (props.showTrailing ?? true) && (props.trailing != null || !!slots.trailing || !!slots.default));
</script>
<template>
  <div :class="['emcd-section-header', size === 's' && 'emcd-section-header--s']">
    <div class="emcd-section-header__text">
      <component :is="tag" class="emcd-section-header__title"><slot name="title">{{ title }}</slot></component>
      <p v-if="hasCaption" class="emcd-section-header__caption"><slot name="caption">{{ caption }}</slot></p>
    </div>
    <div v-if="hasTrailing" class="emcd-section-header__trailing"><slot name="trailing"><slot>{{ trailing }}</slot></slot></div>
  </div>
</template>

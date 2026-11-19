<!-- Suggest — сообщение внутри страницы (card — в колонке; strip — вверху на всю ширину). 0–2 кнопки; крестик скрывает (событие close). Контракт: docs/components/suggest.md -->
<script setup>
import { computed, ref, useSlots } from 'vue';
import DsButton from './DsButton.vue';
import DsIconButton from './DsIconButton.vue';
const props = defineProps({
  layout: { type: String, default: 'card' },    // card | strip
  tone: { type: String, default: 'neutral' },   // neutral | accent | success | warning | danger (Info нет — Info = accent)
  title: String,
  showTitle: { type: Boolean, default: true },
  description: String,
  showDescription: { type: Boolean, default: true },
  showLeading: { type: Boolean, default: undefined }, // по умолчанию: card — вкл; strip — выкл (без иконки), если не передан слот leading
  primaryAction: { type: Boolean, default: true },
  primaryLabel: { type: String, default: 'Подробнее' },
  secondaryAction: Boolean,
  secondaryLabel: { type: String, default: 'Позже' },
  close: { type: Boolean, default: true },
  closeLabel: { type: String, default: 'Скрыть' },
});
const emit = defineEmits(['close', 'primary', 'secondary']);
const shown = ref(true);
const slots = useSlots();
const lead = computed(() => props.showLeading ?? (props.layout === 'strip' ? !!slots.leading : true));
const ICON = {
  neutral: ['M12 11v5M12 8h.01', true], accent: ['M12 11v5M12 8h.01', true], success: ['M8.5 12.5l2.5 2.5 4.5-5', true],
  warning: ['M10.3 4.2L2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0zM12 10v4M12 17h.01', false], danger: ['M12 8v4.5M12 16h.01', true],
};
</script>
<template>
  <section v-if="shown" :class="['emcd-suggest', layout === 'strip' && 'emcd-suggest--strip', tone !== 'neutral' && `emcd-suggest--${tone}`, !close && 'emcd-suggest--no-close']">
    <span v-if="lead" class="emcd-suggest__leading">
      <slot name="leading"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle v-if="(ICON[tone] || ICON.neutral)[1]" cx="12" cy="12" r="9"/><path :d="(ICON[tone] || ICON.neutral)[0]"/></svg></slot>
    </span>
    <div class="emcd-suggest__content">
      <div class="emcd-suggest__text">
        <p v-if="showTitle && title" class="emcd-suggest__title">{{ title }}</p>
        <p v-if="showDescription && description" class="emcd-suggest__desc">{{ description }}</p>
        <slot />
      </div>
      <div v-if="primaryAction" class="emcd-suggest__actions">
        <!-- Основная: на Neutral — Secondary, на Accent и тонах — Primary -->
        <DsButton :type="tone === 'neutral' ? 'secondary' : 'primary'" size="s" :label="primaryLabel" @click="emit('primary')" />
        <DsButton v-if="secondaryAction" type="tertiary-outline" size="s" :label="secondaryLabel" @click="emit('secondary')" />
      </div>
    </div>
    <DsIconButton v-if="close" type="ghost" size="s" :label="closeLabel" class="emcd-suggest__close" @click="shown = false; emit('close')">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
    </DsIconButton>
  </section>
</template>

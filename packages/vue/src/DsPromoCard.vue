<!-- Promo card — промо: заголовок, описание, одно действие (событие action), картинка справа. size: s (сайдбар) · m (мобильный) · l (дашборд Web); tone: neutral | accent; align: start | center (анонс).
     Действие — Button S: в S — Text, в M / L — Primary (Accent) / Secondary (Neutral). showMedia + media (src) или слот media; showClose — крестик (событие close), закрытая скрывается; showBadge — Badge S Accent. Контракт: docs/components/promo-card.md -->
<script setup>
import { ref } from 'vue';
import DsBadge from './DsBadge.vue';
import DsButton from './DsButton.vue';
import DsIconButton from './DsIconButton.vue';
import DsIcon from './DsIcon.vue';
defineProps({
  size: { type: String, default: 's' },          // s | m | l
  tone: { type: String, default: 'neutral' },    // neutral | accent
  align: { type: String, default: 'start' },     // start | center
  title: String,
  description: String,
  showDescription: { type: Boolean, default: true },
  showAction: { type: Boolean, default: true },
  actionLabel: { type: String, default: 'Подробнее' },
  showMedia: Boolean,
  media: String,
  showClose: { type: Boolean, default: true },
  closeLabel: { type: String, default: 'Скрыть' },
  showBadge: Boolean,
  badgeLabel: { type: String, default: 'Новое' },
});
const emit = defineEmits(['action', 'close']);
const shown = ref(true);
const close = (e) => { shown.value = false; emit('close', e); };
</script>
<template>
  <section v-if="shown" :aria-label="title"
    :class="['emcd-promo', size !== 's' && `emcd-promo--${size}`, tone === 'accent' && 'emcd-promo--accent', align === 'center' && 'emcd-promo--center', showMedia && align !== 'center' && 'emcd-promo--media']">
    <div v-if="showMedia && align !== 'center'" class="emcd-promo__media" aria-hidden="true">
      <span class="emcd-promo__glow" />
      <slot name="media"><img v-if="media" class="emcd-promo__image" :src="media" alt=""><span v-else class="emcd-promo__image emcd-promo__image--placeholder" /></slot>
    </div>
    <div class="emcd-promo__column">
      <div class="emcd-promo__text">
        <DsBadge v-if="showBadge && align === 'center'" size="s" tone="accent" :label="badgeLabel" class="emcd-promo__badge" />
        <div class="emcd-promo__title-row">
          <p class="emcd-promo__title"><slot name="title">{{ title }}</slot></p>
          <DsBadge v-if="showBadge && align !== 'center'" size="s" tone="accent" :label="badgeLabel" class="emcd-promo__badge" />
        </div>
        <p v-if="showDescription && description != null" class="emcd-promo__desc">{{ description }}</p>
        <slot />
      </div>
      <DsButton v-if="showAction" :type="size === 's' ? 'text' : tone === 'accent' ? 'primary' : 'secondary'" size="s" :label="actionLabel" class="emcd-promo__action" @click="emit('action', $event)" />
    </div>
    <DsIconButton v-if="showClose && align !== 'center'" type="ghost" size="s" :label="closeLabel" class="emcd-promo__close" @click="close"><DsIcon name="close" /></DsIconButton>
  </section>
</template>

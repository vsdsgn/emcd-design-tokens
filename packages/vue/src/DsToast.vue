<!-- Toast — отклик на действие, исчезает сам (duration, мс; пауза при наведении). Card — Web; Informer — App. Событие close. Контракт: docs/components/toast.md -->
<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import DsButton from './DsButton.vue';
import DsIconButton from './DsIconButton.vue';
const props = defineProps({
  layout: { type: String, default: 'card' }, // card | informer | snack (22.11: Snack слит в Toast)
  tone: { type: String, default: 'info' },   // info | success | warning | danger | neutral
  title: String,
  showTitle: { type: Boolean, default: true },
  description: String,
  showDescription: { type: Boolean, default: true },
  actions: Boolean,                          // кнопки — слот actions; без слота — одна Button с actionLabel
  actionLabel: { type: String, default: 'Открыть' },
  close: { type: Boolean, default: true },
  closeLabel: { type: String, default: 'Закрыть уведомление' },
  icon: { type: Boolean, default: true },
  timer: Boolean,
  duration: Number,
  safeArea: { type: Boolean, default: true },
  open: { type: Boolean, default: undefined },
});
const emit = defineEmits(['close', 'action']);
const shown = ref(true);
const SNACK = { info: ['M12 11v5M12 8h.01', 1], neutral: ['M12 11v5M12 8h.01', 1], success: ['M8.5 12.5l2.5 2.5 4.5-5', 1], warning: ['M10.3 4.2L2.4 18a2 2 0 0 0 1.7 3h15.8a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0zM12 10v4M12 17h.01', 0], danger: ['M12 8v4.5M12 16h.01', 1] };
const GLYPH = { info: 'M12 11v5M12 7.8h.01', success: 'M8 12.3l2.8 2.8 5.2-5.6', warning: 'M12 7.5v5M12 16.2h.01', danger: 'M9.2 9.2l5.6 5.6M14.8 9.2l-5.6 5.6' };
let tm = null; let left = 0; let started = 0;
const hide = () => { shown.value = false; emit('close'); };
const start = () => { if (!left) return; started = Date.now(); clearTimeout(tm); tm = setTimeout(hide, left); };
const pause = () => { if (!tm) return; clearTimeout(tm); tm = null; left = Math.max(0, left - (Date.now() - started)); };
const reset = () => { left = props.duration || 0; start(); };
onMounted(reset);
watch(() => props.duration, reset);
onBeforeUnmount(() => clearTimeout(tm));
</script>
<template>
  <div v-if="(open ?? shown) && layout === 'snack'" :role="tone === 'danger' ? 'alert' : 'status'" :aria-live="tone === 'danger' ? 'assertive' : 'polite'"
    :class="['emcd-toast', 'emcd-toast--snack', tone !== 'info' && `emcd-toast--${tone}`]" @mouseenter="pause" @mouseleave="start">
    <span v-if="icon" class="emcd-toast__snack-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle v-if="(SNACK[tone] || SNACK.info)[1]" cx="12" cy="12" r="9"/><path :d="(SNACK[tone] || SNACK.info)[0]"/></svg></span>
    <p class="emcd-toast__title">{{ title }}</p>
    <slot />
    <slot v-if="actions || $slots.actions" name="actions"><DsButton type="text" size="m" :label="actionLabel" class="emcd-toast__snack-action" @click="emit('action')" /></slot>
  </div>
  <div v-else-if="open ?? shown" :role="tone === 'danger' ? 'alert' : 'status'" :aria-live="tone === 'danger' ? 'assertive' : 'polite'"
    :class="['emcd-toast', layout === 'informer' && 'emcd-toast--informer', tone !== 'info' && `emcd-toast--${tone}`, layout === 'informer' && safeArea && 'emcd-toast--safe-area']"
    :style="timer && duration ? { '--emcd-toast-duration': duration + 'ms' } : undefined" @mouseenter="pause" @mouseleave="start">
    <span v-if="layout !== 'informer' && icon && tone !== 'neutral'" class="emcd-toast__icon"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="12"/><path :d="GLYPH[tone]"/></svg></span>
    <div class="emcd-toast__content">
      <p v-if="showTitle && title" class="emcd-toast__title">{{ title }}</p>
      <p v-if="layout !== 'informer' && showDescription && description" class="emcd-toast__desc">{{ description }}</p>
      <slot />
      <div v-if="layout !== 'informer' && (actions || $slots.actions)" class="emcd-toast__actions">
        <slot name="actions"><DsButton type="secondary" size="s" :label="actionLabel" @click="emit('action')" /></slot>
      </div>
    </div>
    <div v-if="close || (layout !== 'informer' && timer)" class="emcd-toast__tools">
      <svg v-if="layout !== 'informer' && timer" class="emcd-toast__timer" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6"/><circle cx="8" cy="8" r="6"/></svg>
      <DsIconButton v-if="close" type="ghost" size="s" :label="closeLabel" class="emcd-toast__close" @click="hide">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
      </DsIconButton>
    </div>
  </div>
</template>

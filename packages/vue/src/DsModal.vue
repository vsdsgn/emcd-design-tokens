<!-- Modal — диалог. header: title | coin | empty; footer: single | stacked | horizontal | none. На Compact — Sheet. Контракт: docs/components/modal.md -->
<script setup>
import { onMounted, onBeforeUnmount, useId } from 'vue';
import DsIconButton from './DsIconButton.vue';
const props = defineProps({
  header: { type: String, default: 'title' },
  footer: { type: String, default: 'single' },
  title: String,
  description: String,
  divider: Boolean,
  showClose: { type: Boolean, default: true },
  closeLabel: { type: String, default: 'Закрыть' },
  width: { type: String, default: 'md' }, // sm | md | lg
});
const emit = defineEmits(['close']);
const id = useId();
const onKey = (e) => { if (e.key === 'Escape') emit('close'); };
onMounted(() => document.addEventListener('keydown', onKey));
onBeforeUnmount(() => document.removeEventListener('keydown', onKey));
</script>
<template>
  <div class="emcd emcd-modal-scrim" @click.self="emit('close')">
    <div :class="['emcd-modal', width !== 'md' && `emcd-modal--${width}`, footer === 'none' && 'emcd-modal--no-footer']" role="dialog" aria-modal="true" :aria-labelledby="header !== 'empty' ? id : undefined" :aria-label="header === 'empty' ? title : undefined" data-open>
      <div class="emcd-modal__header">
        <div v-if="header === 'coin'" class="emcd-modal__heading">
          <slot name="coin"><span class="emcd-modal__coin" /></slot>
          <div><h2 :id="id" class="emcd-modal__title">{{ title }}</h2><p v-if="description" class="emcd-modal__desc">{{ description }}</p></div>
        </div>
        <h2 v-else-if="header === 'title'" :id="id" class="emcd-modal__title">{{ title }}</h2>
        <DsIconButton v-if="showClose" type="ghost" :label="closeLabel" class="emcd-modal__close" @click="emit('close')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>
        </DsIconButton>
      </div>
      <hr v-if="divider" class="emcd-modal__divider" />
      <div class="emcd-modal__body"><slot /></div>
      <div v-if="footer !== 'none'" :class="['emcd-modal__footer', footer === 'horizontal' && 'emcd-modal__footer--horizontal']"><slot name="footer" /></div>
    </div>
  </div>
</template>

<!-- Sheet (beta) — шторка Compact (App и мобильный веб): грабер, шапка (title h2, слот header-actions, закрытие — событие close), слот default (Body), слот footer (кнопки L на всю ширину).
     full-height — во всю высоту (поток формы); scrim — подложка, тап по ней — close; Esc — close. role=dialog, aria-modal. Контракт: docs/components/sheet.md -->
<script setup>
import { onMounted, onBeforeUnmount, useSlots } from 'vue';
import DsIcon from './DsIcon.vue';
import DsIconButton from './DsIconButton.vue';
const props = defineProps({
  open: { type: Boolean, default: true },
  title: String,
  showGrabber: { type: Boolean, default: true },
  showClose: { type: Boolean, default: true },
  closeLabel: { type: String, default: 'Закрыть' },
  fullHeight: Boolean,
  scrim: { type: Boolean, default: true },
});
const emit = defineEmits(['close']);
const slots = useSlots();
const id = 'emcd-sheet-' + Math.random().toString(36).slice(2, 8);
const onKey = (e) => { if (props.open && e.key === 'Escape') emit('close', e); };
onMounted(() => { if (typeof document !== 'undefined') document.addEventListener('keydown', onKey); });
onBeforeUnmount(() => { if (typeof document !== 'undefined') document.removeEventListener('keydown', onKey); });
</script>
<template>
  <div v-if="open && scrim" class="emcd-sheet-scrim" @click.self="emit('close', $event)">
    <section role="dialog" aria-modal="true" :aria-labelledby="title || slots.title ? id : undefined" :class="['emcd-sheet', fullHeight && 'emcd-sheet--full']">
      <span v-if="showGrabber" class="emcd-sheet__grabber" aria-hidden="true" />
      <div class="emcd-sheet__header">
        <h2 :id="id" class="emcd-sheet__title"><slot name="title">{{ title }}</slot></h2>
        <div v-if="slots['header-actions']" class="emcd-sheet__actions"><slot name="header-actions" /></div>
        <DsIconButton v-if="showClose" type="ghost" size="m" :label="closeLabel" class="emcd-sheet__close" @click="emit('close', $event)"><DsIcon name="close" /></DsIconButton>
      </div>
      <div class="emcd-sheet__body"><slot /></div>
      <div v-if="slots.footer" class="emcd-sheet__footer"><slot name="footer" /></div>
    </section>
  </div>
  <section v-else-if="open" role="dialog" aria-modal="true" :aria-labelledby="title || slots.title ? id : undefined" :class="['emcd-sheet', fullHeight && 'emcd-sheet--full']">
    <span v-if="showGrabber" class="emcd-sheet__grabber" aria-hidden="true" />
    <div class="emcd-sheet__header">
      <h2 :id="id" class="emcd-sheet__title"><slot name="title">{{ title }}</slot></h2>
      <div v-if="slots['header-actions']" class="emcd-sheet__actions"><slot name="header-actions" /></div>
      <DsIconButton v-if="showClose" type="ghost" size="m" :label="closeLabel" class="emcd-sheet__close" @click="emit('close', $event)"><DsIcon name="close" /></DsIconButton>
    </div>
    <div class="emcd-sheet__body"><slot /></div>
    <div v-if="slots.footer" class="emcd-sheet__footer"><slot name="footer" /></div>
  </section>
</template>

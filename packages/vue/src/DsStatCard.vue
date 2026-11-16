<!-- Stat card — один показатель: подпись, число, единица, дельта (Badge S + подпись). Контракт: docs/components/stat-card.md -->
<script setup>
import DsBadge from './DsBadge.vue';
import DsTooltip from './DsTooltip.vue';
defineProps({
  label: String,
  value: [String, Number],
  unit: String,
  info: { type: Boolean, default: true },
  infoText: String,                                  // текст тултипа у «i»; без него иконки нет
  delta: { type: Boolean, default: true },
  deltaValue: String,                                // «+4,2 %»
  deltaTone: { type: String, default: 'success' },   // success — рост | danger — падение | neutral — без изменений
  deltaCaption: String,                              // «к вчера»
  showFooter: Boolean,
  ambientLight: Boolean,                             // одна герой-карточка на экран
  skeleton: Boolean,
});
</script>
<template>
  <div v-if="skeleton" :class="['emcd-stat', 'emcd-stat--skeleton', ambientLight && 'emcd-stat--ambient']" aria-busy="true">
    <div class="emcd-stat__label-row"><span class="emcd-stat__bone" style="width:96px;height:12px" /></div>
    <div class="emcd-stat__value-row"><span class="emcd-stat__bone" style="width:140px;height:28px" /></div>
    <div class="emcd-stat__delta-row"><span class="emcd-stat__bone" style="width:112px;height:16px" /></div>
  </div>
  <div v-else :class="['emcd-stat', ambientLight && 'emcd-stat--ambient']">
    <div class="emcd-stat__label-row">
      <span class="emcd-stat__label"><slot name="label">{{ label }}</slot></span>
      <DsTooltip v-if="info && infoText" :text="infoText">
        <button type="button" class="emcd-stat__info" aria-label="Что это"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg></button>
      </DsTooltip>
    </div>
    <div class="emcd-stat__value-row"><span class="emcd-stat__value"><slot name="value">{{ value }}</slot></span><span v-if="unit" class="emcd-stat__unit">{{ unit }}</span></div>
    <div v-if="delta && deltaValue" class="emcd-stat__delta-row">
      <DsBadge size="s" :tone="['success', 'danger'].includes(deltaTone) ? deltaTone : 'neutral'" :label="deltaValue" />
      <span v-if="deltaCaption" class="emcd-stat__caption">{{ deltaCaption }}</span>
    </div>
    <div v-if="showFooter && $slots.footer" class="emcd-stat__footer"><slot name="footer" /></div>
  </div>
</template>

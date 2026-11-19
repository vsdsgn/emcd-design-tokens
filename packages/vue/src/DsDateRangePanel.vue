<!-- Date range panel — панель выбора периода: слева пресеты (DsMenuItem, listbox; presets=false — без них, мобильный в Sheet), справа DsCalendar Mode=Range, внизу «Сбросить» и «Применить».
     v-model — период { from, to } (черновик); v-model:preset — выбранный пресет; presetItems — [{ value, label, days | months | range(today) }].
     События: apply({ from, to }) — «Применить» (applyOnSelect — сразу по второй дате; по умолчанию при presets=false), reset — «Сбросить» (showReset), close — Esc. role=dialog «Период». Контракт: docs/components/date-range-panel.md -->
<script setup>
import { computed, ref, provide, useId } from 'vue';
import DsMenuItem from './DsMenuItem.vue';
import DsCalendar from './DsCalendar.vue';
import DsButton from './DsButton.vue';
import { toISO, monthStart, normRange, DATE_PRESETS, presetRange } from './calendar.js';
const props = defineProps({
  presets: { type: Boolean, default: true },
  presetItems: { type: Array, default: () => DATE_PRESETS },
  showReset: { type: Boolean, default: true },
  applyOnSelect: { type: Boolean, default: undefined },
  resetLabel: { type: String, default: 'Сбросить' },
  applyLabel: { type: String, default: 'Применить' },
  label: { type: String, default: 'Период' },
  presetsLabel: { type: String, default: 'Быстрый выбор' },
  today: [String, Date],
  min: [String, Date],
  max: [String, Date],
  isDateDisabled: Function,
  locale: { type: String, default: 'ru' },
  weekStart: Number,
});
const model = defineModel({ type: Object, default: undefined });
const emit = defineEmits(['apply', 'reset', 'close']);
provide('emcd-menu', { size: 'm', role: 'listbox' });
const id = useId();
const t = computed(() => toISO(props.today ?? new Date()));
const inner = ref(normRange(model.value));
const r = computed(() => (model.value !== undefined ? normRange(model.value) : inner.value));
const setRange = (x) => { inner.value = x; model.value = x; };
const match = (x) => { const p = props.presetItems.find((q) => { const pr = presetRange(q, t.value); return pr && x.from && pr.from === x.from && pr.to === x.to; }); return p ? p.value : x.from ? 'custom' : undefined; };
const preset = defineModel('preset', { type: String, default: undefined });
const innerPre = ref(match(r.value));
const pre = computed(() => preset.value ?? innerPre.value);
const setPre = (v) => { innerPre.value = v; preset.value = v; };
const view = ref(monthStart(r.value.to || r.value.from || t.value));
const instant = computed(() => props.applyOnSelect ?? !props.presets);
const choose = (p) => { setPre(p.value); const pr = presetRange(p, t.value); if (pr) { setRange(pr); view.value = monthStart(pr.to); } };
const listKeys = (e) => {
  const d = e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0;
  if (!d) return;
  e.preventDefault(); const list = props.presetItems; const i = list.findIndex((p) => p.value === pre.value);
  choose(list[i < 0 ? (d > 0 ? 0 : list.length - 1) : (i + d + list.length) % list.length]);
};
const onCal = (x) => { setRange(x); setPre(match(x)); if (instant.value) emit('apply', x); };
const reset = () => { setRange({ from: null, to: null }); setPre(undefined); emit('reset'); };
const onEsc = (e) => { if (e.key === 'Escape') { e.stopPropagation(); emit('close', e); } };
</script>
<template>
  <div role="dialog" :aria-label="label" :class="['emcd-date-panel', !presets && 'emcd-date-panel--compact']" @keydown="onEsc">
    <div v-if="presets" role="listbox" :aria-label="presetsLabel" tabindex="0" class="emcd-date-panel__presets" :aria-activedescendant="pre != null ? `${id}-p-${pre}` : undefined" @keydown="listKeys">
      <DsMenuItem v-for="p in presetItems" :id="`${id}-p-${p.value}`" :key="p.value" :label="p.label" :selected="p.value === pre" @click="choose(p)" />
    </div>
    <div class="emcd-date-panel__column">
      <DsCalendar v-model:month="view" mode="range" plain :model-value="r" :today="t" :min="min" :max="max" :is-date-disabled="isDateDisabled" :locale="locale" :week-start="weekStart" @update:model-value="onCal" />
      <div class="emcd-date-panel__footer">
        <DsButton v-if="showReset" type="text" size="s" :label="resetLabel" class="emcd-date-panel__reset" :disabled="!r.from && !r.to" @click="reset" />
        <DsButton type="primary" size="s" :label="applyLabel" :disabled="!(r.from && r.to)" @click="emit('apply', r)" />
      </div>
    </div>
  </div>
</template>

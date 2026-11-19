<!-- Date range field — поле периода на базе Input M (подпись на рамке): «ДД.ММ.ГГ → ДД.ММ.ГГ» + иконка календаря. state: default | error | disabled | skeleton.
     Две схемы: панель продукта — событие open по нажатию, Enter, Space или ↓ (from / to — готовые строки дат); встроенная — panel (true или props DsDateRangePanel): поповер с DsDateRangePanel,
     v-model — применённый период { from, to } (ISO), v-model:open; формат — formatDate(iso) или локаль (дд.мм.гг). Esc и «Применить» закрывают и возвращают фокус на поле; клик вне — закрывает. Контракт: docs/components/date-range-field.md -->
<script setup>
import { computed, ref, watch, nextTick, onBeforeUnmount, useId } from 'vue';
import DsInput from './DsInput.vue';
import DsIcon from './DsIcon.vue';
import DsDateRangePanel from './DsDateRangePanel.vue';
import { normRange, shortDate } from './calendar.js';
const props = defineProps({
  label: { type: String, default: 'Период' },
  from: String,
  to: String,
  placeholder: { type: String, default: 'ДД.ММ.ГГ → ДД.ММ.ГГ' },
  hint: String,
  error: String,
  state: { type: String, default: 'default' },
  labelPosition: { type: String, default: 'on-border' },
  panel: { type: [Boolean, Object], default: false },
  formatDate: Function,
  locale: { type: String, default: 'ru' },
});
const model = defineModel({ type: Object, default: undefined });
const open = defineModel('open', { type: Boolean, default: false });
const emit = defineEmits(['open']);
const id = useId();
const inner = ref(normRange(model.value));
const r = computed(() => (model.value !== undefined ? normRange(model.value) : inner.value));
const fmt = (s) => (s ? (props.formatDate ? props.formatDate(s) : shortDate(s, props.locale)) : null);
const text = computed(() => {
  const f = props.from ?? (props.panel ? fmt(r.value.from) : null); const t = props.to ?? (props.panel ? fmt(r.value.to) : null);
  return f || t ? `${f || '…'} → ${t || '…'}` : '';
});
const off = computed(() => props.state === 'disabled' || props.state === 'skeleton');
const shown = computed(() => !!props.panel && open.value && !off.value);
const panelProps = computed(() => (props.panel === true ? {} : props.panel || {}));
const root = ref(null); const pop = ref(null);
const draft = ref(r.value); // черновик панели — до «Применить»
const focusField = () => { const el = root.value && root.value.querySelector('input'); if (el) el.focus(); };
const close = (refocus = true) => { open.value = false; if (refocus) focusField(); };
const trigger = (e) => { if (off.value) return; emit('open', e); if (props.panel) open.value = !open.value; };
const onKey = (e) => {
  if (off.value) return;
  if (e.key === 'Escape' && shown.value) { e.preventDefault(); close(); return; }
  if (['Enter', ' ', 'ArrowDown'].includes(e.key)) { e.preventDefault(); trigger(e); }
};
const apply = (x) => { inner.value = x; model.value = x; close(); };
const out = (e) => { if (root.value && !root.value.contains(e.target)) close(false); };
watch(shown, (v) => {
  if (typeof document === 'undefined') return;
  if (!v) { document.removeEventListener('mousedown', out); return; }
  draft.value = { ...r.value };
  document.addEventListener('mousedown', out);
  nextTick(() => {
    const p = pop.value; if (!p) return;
    p.classList.remove('emcd-date-range__popover--end');
    const pr = p.getBoundingClientRect(); if (pr.right > document.documentElement.clientWidth - 8 || pr.left < 8) p.classList.add('emcd-date-range__popover--end');
    const el = p.querySelector('[role="listbox"], [role="grid"] [tabindex="0"]'); if (el) el.focus();
  });
});
onBeforeUnmount(() => { if (typeof document !== 'undefined') document.removeEventListener('mousedown', out); });
</script>
<template>
  <div ref="root" role="group" :aria-label="label" :class="['emcd-date-range', shown && 'emcd-date-range--open']">
    <DsInput :model-value="text" :label="label" :label-position="labelPosition" :state="state" :hint="hint" :error="error" :placeholder="placeholder" readonly aria-haspopup="dialog"
      :aria-expanded="panel ? shown : undefined" :aria-controls="shown ? id : undefined" @click="trigger" @keydown="onKey">
      <template #trailing><DsIcon name="calendar" /></template>
    </DsInput>
    <div v-if="shown" ref="pop" class="emcd-date-range__popover">
      <DsDateRangePanel :id="id" :locale="locale" v-bind="panelProps" v-model="draft" @apply="apply" @close="close()" />
    </div>
  </div>
</template>

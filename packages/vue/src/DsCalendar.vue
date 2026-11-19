<!-- Calendar — выбор даты (mode single) или периода (mode range): шапка «Месяц ГГГГ» + стрелки, дни недели по локали (ru — с понедельника), сетка 6 × 7 из DsDateCell.
     v-model: single — ISO «ГГГГ-ММ-ДД»; range — { from, to } (событие — когда выбрана дата или обе даты периода; второй раньше первого — меняются местами). v-model:month — показанный месяц.
     today — «сегодня»; min / max / isDateDisabled(iso) — недоступные. Клавиатура (role=grid): стрелки, PageUp / PageDown (+ Shift — год), Home / End, Enter / Space, Esc — событие escape. RTL — сетка и стрелки зеркалятся.
     plain — без своей подложки (внутри DsDateRangePanel). Контракт: docs/components/calendar.md -->
<script setup>
import { computed, ref, nextTick } from 'vue';
import DsIconButton from './DsIconButton.vue';
import DsIcon from './DsIcon.vue';
import DsDateCell from './DsDateCell.vue';
import { toISO, addDays, addMonths, monthStart, weekday, weekStartOf, fullDate, normRange, weekdayNames, monthTitle, gridDays } from './calendar.js';
const props = defineProps({
  mode: { type: String, default: 'single' }, // single | range
  today: [String, Date],
  min: [String, Date],
  max: [String, Date],
  isDateDisabled: Function,
  locale: { type: String, default: 'ru' },
  weekStart: Number,
  prevLabel: { type: String, default: 'Предыдущий месяц' },
  nextLabel: { type: String, default: 'Следующий месяц' },
  selectedLabel: { type: String, default: 'выбрано' },
  plain: Boolean,
  label: String,
});
const model = defineModel({ type: [String, Date, Object], default: undefined });
const month = defineModel('month', { type: String, default: undefined });
const emit = defineEmits(['escape']);
const range = computed(() => props.mode === 'range');
const val = computed(() => (range.value ? normRange(model.value) : toISO(model.value)));
const t = computed(() => toISO(props.today ?? new Date()));
const off = (d) => { const lo = toISO(props.min); const hi = toISO(props.max); return !!((lo && d < lo) || (hi && d > hi) || (props.isDateDisabled && props.isDateDisabled(d))); };
const innerView = ref(monthStart((range.value ? val.value.to || val.value.from : val.value) || t.value));
const first = computed(() => monthStart(month.value ? toISO(month.value) : innerView.value));
const go = (d) => { innerView.value = monthStart(d); month.value = monthStart(d); };
const anchor = ref(null); const hover = ref(null); const focus = ref(null); const grid = ref(null);
const ws = computed(() => props.weekStart ?? weekStartOf(props.locale));
const days = computed(() => gridDays(first.value, ws.value));
const inView = (d) => !!d && d.slice(0, 7) === first.value.slice(0, 7);
const span = computed(() => {
  if (!range.value) return [null, null];
  let a = anchor.value || val.value.from; let b = anchor.value ? (hover.value && hover.value !== anchor.value ? hover.value : null) : val.value.to;
  if (a && b && b < a) [a, b] = [b, a];
  return [a, b];
});
const stateOf = (d) => {
  const [a, b] = span.value;
  if (range.value) {
    if (a && d === a) return b && b !== a ? 'range-start' : 'selected';
    if (b && d === b) return 'range-end';
    if (a && b && d > a && d < b) return 'range-middle';
  } else if (d === val.value) return 'selected';
  if (!inView(d)) return 'outside';
  return d === t.value ? 'today' : 'default';
};
const tab = computed(() => [focus.value, range.value ? anchor.value || val.value.from : val.value, t.value].find(inView) || first.value);
const select = (d) => {
  if (off(d)) return;
  focus.value = d; if (!inView(d)) go(d);
  if (!range.value) { model.value = d; return; }
  if (!anchor.value) { anchor.value = d; return; }
  const [from, to] = d < anchor.value ? [d, anchor.value] : [anchor.value, d];
  anchor.value = null; hover.value = null; model.value = { from, to };
};
const onKey = (e) => {
  if (e.key === 'Escape') { emit('escape', e); return; }
  const rtl = getComputedStyle(e.currentTarget).direction === 'rtl';
  const f = tab.value; const dow = (weekday(f) - ws.value + 7) % 7;
  const next = { ArrowLeft: addDays(f, rtl ? 1 : -1), ArrowRight: addDays(f, rtl ? -1 : 1), ArrowUp: addDays(f, -7), ArrowDown: addDays(f, 7),
    PageUp: addMonths(f, e.shiftKey ? -12 : -1), PageDown: addMonths(f, e.shiftKey ? 12 : 1), Home: addDays(f, -dow), End: addDays(f, 6 - dow) }[e.key];
  if (!next) return;
  e.preventDefault(); focus.value = next; if (!inView(next)) go(next); if (anchor.value) hover.value = next;
  nextTick(() => { const el = grid.value && grid.value.querySelector(`[data-date="${tab.value}"]`); if (el) el.focus(); });
};
const names = computed(() => weekdayNames(props.locale, ws.value));
const title = computed(() => monthTitle(first.value, props.locale));
const rows = computed(() => Array.from({ length: 6 }, (_, w) => days.value.slice(w * 7, w * 7 + 7)));
const isSel = (st) => st === 'selected' || st === 'range-start' || st === 'range-end';
</script>
<template>
  <div :class="['emcd-calendar', plain && 'emcd-calendar--plain']">
    <div class="emcd-calendar__head">
      <DsIconButton size="s" type="tertiary" :label="prevLabel" class="emcd-calendar__nav" @click="go(addMonths(first, -1))"><DsIcon name="chevron-left" /></DsIconButton>
      <span class="emcd-calendar__month" aria-live="polite">{{ title }}</span>
      <DsIconButton size="s" type="tertiary" :label="nextLabel" class="emcd-calendar__nav" @click="go(addMonths(first, 1))"><DsIcon name="chevron-right" /></DsIconButton>
    </div>
    <div ref="grid" role="grid" :aria-label="label ?? title" :aria-multiselectable="range || undefined" class="emcd-calendar__grid" @keydown="onKey" @mouseleave="hover = null">
      <div role="row" class="emcd-calendar__row emcd-calendar__weekdays"><span v-for="(nm, i) in names" :key="i" role="columnheader" class="emcd-calendar__weekday">{{ nm }}</span></div>
      <div v-for="(week, w) in rows" :key="w" role="row" class="emcd-calendar__row">
        <div v-for="d in week" :key="d" role="gridcell" :aria-selected="isSel(stateOf(d)) || undefined" class="emcd-calendar__cell">
          <DsDateCell :day="Number(d.slice(8))" :state="stateOf(d)" :disabled="off(d)" :data-date="d" :tabindex="d === tab ? 0 : -1"
            :label="fullDate(d, locale) + (isSel(stateOf(d)) ? `, ${selectedLabel}` : '')" :aria-current="d === t ? 'date' : undefined"
            @click="select(d)" @mouseenter="anchor && (hover = d)" @focus="focus = d" />
        </div>
      </div>
    </div>
  </div>
</template>

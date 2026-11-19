<!-- Select — поле выбора одного значения (5+ вариантов). v-model; options: [{ value, label, description, disabled }]. state: default | error | disabled | loading | skeleton. На Compact — Sheet (в продукте). Контракт: docs/components/select.md -->
<script setup>
import { computed, ref, useId, watch, onBeforeUnmount } from 'vue';
import DsMenu from './DsMenu.vue';
import DsMenuItem from './DsMenuItem.vue';
const props = defineProps({
  size: { type: String, default: 'm' },          // m | l — как у Input рядом (XL снят 17.11)
  label: String,
  labelPosition: { type: String, default: 'above' }, // above — формы; on-border — панели фильтров и калькуляторы (patterns.md 0, п. 12)
  hint: String,
  error: String,
  state: { type: String, default: 'default' },
  placeholder: { type: String, default: 'Выберите …' },
  options: { type: Array, default: () => [] },
  menuSize: { type: String, default: 'm' },
});
const model = defineModel({ type: [String, Number], default: undefined });
const open = defineModel('open', { type: Boolean, default: false });
const id = useId();
const root = ref(null);
const trigger = ref(null);
const active = ref(-1);
const isError = computed(() => props.state === 'error' || !!props.error);
const blocked = computed(() => props.state === 'disabled' || props.state === 'skeleton');
const msg = computed(() => props.error || props.hint);
const sel = computed(() => props.options.find((o) => o.value === model.value));
const enabled = computed(() => props.options.map((o, i) => (o.disabled ? -1 : i)).filter((i) => i >= 0));
const outside = (e) => { if (root.value && !root.value.contains(e.target)) open.value = false; };
watch(open, (v) => { if (typeof document === 'undefined') return; if (v) document.addEventListener('mousedown', outside); else document.removeEventListener('mousedown', outside); });
onBeforeUnmount(() => { if (typeof document !== 'undefined') document.removeEventListener('mousedown', outside); });
const openMenu = () => { open.value = true; const i = props.options.indexOf(sel.value); active.value = i >= 0 ? i : (enabled.value[0] ?? -1); };
const choose = (o) => { if (o.disabled) return; model.value = o.value; open.value = false; trigger.value?.focus(); };
const onKey = (e) => {
  if (blocked.value) return;
  if (!open.value) { if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) { e.preventDefault(); openMenu(); } return; }
  const en = enabled.value; const k = en.indexOf(active.value);
  if (e.key === 'Escape' || e.key === 'Tab') open.value = false;
  else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); active.value = en[(k + (e.key === 'ArrowDown' ? 1 : -1) + en.length) % en.length]; }
  else if (e.key === 'Home' || e.key === 'End') { e.preventDefault(); active.value = e.key === 'Home' ? en[0] : en[en.length - 1]; }
  else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); const o = props.options[active.value]; if (o) choose(o); }
};
</script>
<template>
  <div ref="root" :class="['emcd-field', size !== 'm' && `emcd-field--${size}`, labelPosition === 'on-border' && label && 'emcd-field--on-border', isError && 'emcd-field--error', state === 'disabled' && 'emcd-field--disabled', state === 'skeleton' && 'emcd-field--skeleton']" :aria-hidden="state === 'skeleton' || undefined">
    <span v-if="label" :id="`${id}-l`" class="emcd-field__label">{{ label }}</span>
    <div :class="['emcd-select', open && 'emcd-select--open']">
      <button ref="trigger" type="button" role="combobox" class="emcd-input emcd-select__trigger" :disabled="blocked" aria-haspopup="listbox" :aria-expanded="open" :aria-controls="`${id}-lb`"
        :aria-labelledby="label ? `${id}-l ${id}-v` : undefined" :aria-invalid="isError || undefined" :aria-describedby="msg ? `${id}-h` : undefined" :aria-busy="state === 'loading' || undefined"
        :aria-activedescendant="open && active >= 0 ? `${id}-o${active}` : undefined" @click="open ? (open = false) : openMenu()" @keydown="onKey">
        <span v-if="$slots.leading" class="emcd-input__leading"><slot name="leading" :option="sel" /></span>
        <span :id="`${id}-v`" :class="['emcd-select__value', !sel && 'emcd-select__value--placeholder']">{{ sel ? sel.label : placeholder }}</span>
        <svg v-if="state === 'loading'" class="emcd-field__spinner" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-opacity=".24" stroke-width="2"/><path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
        <span class="emcd-select__chevron"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></span>
      </button>
      <DsMenu v-if="open && !blocked" class="emcd-select__menu" :size="menuSize" role="listbox" :list-id="`${id}-lb`" :label="label">
        <div v-if="state === 'loading'" class="emcd-menu__empty">Загружаем варианты…</div>
        <template v-else>
          <DsMenuItem v-for="(o, i) in options" :id="`${id}-o${i}`" :key="o.value ?? i" :label="o.label" :description="o.description" :disabled="o.disabled" :selected="o.value === model"
            :data-active="i === active ? '' : undefined" @mousedown.prevent @mouseenter="active = i" @click="choose(o)" />
        </template>
      </DsMenu>
    </div>
    <span v-if="msg" class="emcd-field__row"><span :id="`${id}-h`" class="emcd-field__hint">{{ msg }}</span></span>
  </div>
</template>

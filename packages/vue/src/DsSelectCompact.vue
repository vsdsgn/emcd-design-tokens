<!-- Select compact — селектор «на месте» без лейбла («KAS ▾»): высота 36, ширина до 200. v-model — значение; options: [{ value, label, coin, disabled }] — список (Menu listbox);
     без options — только кнопка (v-model:open — свой Menu / Sheet). text — подпись (по умолчанию — выбранная опция); слот leading — Coin / Coin stack; label — что выбирается («Монета: KAS»). Контракт: docs/components/select-compact.md -->
<script setup>
import { computed, ref, useId, watch, onBeforeUnmount } from 'vue';
import DsIcon from './DsIcon.vue';
import DsCoin from './DsCoin.vue';
import DsMenu from './DsMenu.vue';
import DsMenuItem from './DsMenuItem.vue';
const props = defineProps({
  text: String,
  label: { type: String, default: 'Значение' },
  options: Array,
  showLeading: { type: Boolean, default: true },
  disabled: Boolean,
  menuSize: { type: String, default: 'm' },
});
const model = defineModel({ type: [String, Number], default: undefined });
const open = defineModel('open', { type: Boolean, default: false });
const id = useId();
const root = ref(null);
const trigger = ref(null);
const active = ref(-1);
const list = computed(() => props.options || []);
const sel = computed(() => list.value.find((o) => o.value === (model.value ?? list.value[0]?.value)));
const shown = computed(() => props.text ?? sel.value?.label ?? '');
const enabled = computed(() => list.value.map((o, i) => (o.disabled ? -1 : i)).filter((i) => i >= 0));
const outside = (e) => { if (root.value && !root.value.contains(e.target)) open.value = false; };
watch(open, (v) => { if (typeof document === 'undefined') return; if (v) document.addEventListener('mousedown', outside); else document.removeEventListener('mousedown', outside); });
onBeforeUnmount(() => { if (typeof document !== 'undefined') document.removeEventListener('mousedown', outside); });
const openMenu = () => { open.value = true; const i = list.value.indexOf(sel.value); active.value = i >= 0 ? i : (enabled.value[0] ?? -1); };
const choose = (o) => { if (o.disabled) return; model.value = o.value; open.value = false; trigger.value?.focus(); };
const onKey = (e) => {
  if (props.disabled) return;
  if (!open.value) { if (['ArrowDown', 'Enter', ' '].includes(e.key)) { e.preventDefault(); openMenu(); } return; }
  const en = enabled.value; const k = en.indexOf(active.value);
  if (e.key === 'Escape' || e.key === 'Tab') open.value = false;
  else if (!en.length) return;
  else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); active.value = en[(k + (e.key === 'ArrowDown' ? 1 : -1) + en.length) % en.length]; }
  else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); const o = list.value[active.value]; if (o) choose(o); }
};
</script>
<template>
  <div ref="root" :class="['emcd-select-compact', open && 'emcd-select-compact--open']">
    <button ref="trigger" type="button" class="emcd-select-compact__trigger" :disabled="disabled" aria-haspopup="listbox" :aria-expanded="open" :aria-controls="options ? `${id}-lb` : undefined"
      :aria-label="`${label}: ${shown}`" :aria-activedescendant="open && active >= 0 ? `${id}-o${active}` : undefined" @click="open ? (open = false) : openMenu()" @keydown="onKey">
      <span class="emcd-select-compact__value">
        <span v-if="showLeading && ($slots.leading || sel?.coin)" class="emcd-select-compact__leading"><slot name="leading" :option="sel"><DsCoin :coin="sel.coin" size="m" /></slot></span>
        <span class="emcd-select-compact__text">{{ shown }}</span>
      </span>
      <DsIcon name="chevron-down" size="sm" class="emcd-select-compact__chevron" />
    </button>
    <DsMenu v-if="open && options && !disabled" class="emcd-select-compact__menu" :size="menuSize" role="listbox" :list-id="`${id}-lb`" :label="label">
      <DsMenuItem v-for="(o, i) in list" :id="`${id}-o${i}`" :key="o.value ?? i" :label="o.label" :description="o.description" :disabled="o.disabled" :selected="o.value === sel?.value"
        :data-active="i === active ? '' : undefined" @mousedown.prevent @mouseenter="active = i" @click="choose(o)">
        <template v-if="o.coin" #leading><DsCoin :coin="o.coin" size="m" /></template>
      </DsMenuItem>
    </DsMenu>
  </div>
</template>

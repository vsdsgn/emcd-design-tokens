<!-- Tab bar — нижняя навигация Compact: 3–5 пунктов (порядок как в Sidebar), ровно один выбран; Action — одна, по центру (items[].type = 'action', событие action).
     items: [{ value, label, icon, badgeDot, href, type }] или дети DsTabBarItem; v-model — value выбранного раздела. safeArea (по умолчанию вкл.) — нижнее поле safe area. Контракт: docs/components/tab-bar.md -->
<script setup>
import { computed, ref } from 'vue';
import DsTabBarItem from './DsTabBarItem.vue';
const props = defineProps({
  items: Array,
  safeArea: { type: Boolean, default: true },
  label: { type: String, default: 'Основная навигация' },
});
const model = defineModel({ type: [String, Number], default: undefined });
const emit = defineEmits(['change', 'action']);
const key = (it) => it.value ?? it.label;
const first = (props.items || []).find((it) => it.type !== 'action');
const inner = ref(first ? key(first) : undefined);
const current = computed(() => (model.value !== undefined ? model.value : inner.value));
const shown = computed(() => (props.items || []).slice(0, 5));
const pick = (it) => {
  if (it.type === 'action') { emit('action', it); return; }
  inner.value = key(it); model.value = key(it); emit('change', key(it));
};
const bind = (it) => { const { value, ...rest } = it; return rest; };
</script>
<template>
  <nav :aria-label="label" :class="['emcd-tab-bar', !safeArea && 'emcd-tab-bar--no-safe-area']">
    <div class="emcd-tab-bar__items">
      <template v-if="items"><DsTabBarItem v-for="(it, i) in shown" :key="key(it) ?? i" v-bind="bind(it)" :selected="it.type !== 'action' && key(it) === current" @click="pick(it)" /></template>
      <slot v-else />
    </div>
  </nav>
</template>

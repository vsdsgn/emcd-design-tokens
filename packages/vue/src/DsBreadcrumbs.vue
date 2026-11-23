<!-- Breadcrumbs — путь к текущей странице (Web, над заголовком Page header). items: [{ label, href, disabled }] — последний = текущая страница (не ссылка, aria-current). Больше 4 уровней (или collapsed) — первый · «…» · два последних; «…» открывает Menu со скрытыми уровнями (Esc — закрыть). Событие navigate(item) — выбор в Menu. Контракт: docs/components/breadcrumbs.md -->
<script setup>
import { computed, ref, useId } from 'vue';
import DsMenu from './DsMenu.vue';
import DsMenuItem from './DsMenuItem.vue';
const props = defineProps({
  items: { type: Array, default: () => [] },
  collapsed: { type: Boolean, default: undefined },
  label: { type: String, default: 'Хлебные крошки' },
  moreLabel: { type: String, default: 'Показать скрытые уровни' },
});
const emit = defineEmits(['navigate']);
const open = ref(false);
const id = useId ? useId() : 'emcd-bc';
const fold = computed(() => (props.collapsed ?? props.items.length > 4) && props.items.length > 3);
const hidden = computed(() => (fold.value ? props.items.slice(1, -2) : []));
const shown = computed(() => (fold.value ? [props.items[0], null, ...props.items.slice(-2)] : props.items));
const last = computed(() => props.items[props.items.length - 1]);
const go = (it) => { open.value = false; emit('navigate', it); if (it.href && typeof window !== 'undefined') window.location.assign(it.href); };
</script>
<template>
  <nav class="emcd-breadcrumbs" :aria-label="label">
    <ol class="emcd-breadcrumbs__list">
      <li v-for="(it, i) in shown" :key="it ? i : 'more'">
        <button v-if="it === null" type="button" class="emcd-breadcrumbs__item" :aria-label="moreLabel" aria-haspopup="menu" :aria-expanded="open" :aria-controls="open ? id : undefined" @click="open = !open" @keydown.esc="open = false">…</button>
        <span v-else-if="it === last" class="emcd-breadcrumbs__item emcd-breadcrumbs__item--current" aria-current="page" :title="it.label">{{ it.label }}</span>
        <a v-else class="emcd-breadcrumbs__item" :href="it.disabled ? undefined : it.href" :aria-disabled="it.disabled || undefined" :title="it.label">{{ it.label }}</a>
      </li>
    </ol>
    <DsMenu v-if="open && hidden.length" class="emcd-breadcrumbs__menu" :list-id="id" :label="moreLabel" @keydown.esc="open = false">
      <DsMenuItem v-for="(it, i) in hidden" :key="i" :label="it.label" :disabled="it.disabled" @click="go(it)" />
    </DsMenu>
  </nav>
</template>

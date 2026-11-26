<!-- Avatar group (Person) — аватары внахлёст 20 %. people — [{ name, src, initials }]; size: xs (20) · s (24) · m (32) · l (40); count — 2–4; showMore + more — «+N». Контракт: docs/components/avatar-group.md -->
<script setup>
import { computed } from 'vue';
import DsAvatar from './DsAvatar.vue';
const props = defineProps({
  people: { type: Array, default: () => [] },
  size: { type: String, default: 'xs' },           // xs | s | m | l
  count: Number,                                    // 2 | 3 | 4; по умолчанию — все до 4
  showMore: { type: Boolean, default: undefined },  // по умолчанию — когда людей больше count
  more: String,                                     // «+N»
  label: String,                                    // имя группы для читалки
});
const shown = computed(() => props.people.slice(0, Math.max(1, Math.min(4, props.count ?? props.people.length))));
const hidden = computed(() => props.people.length - shown.value.length);
</script>
<template>
  <span :class="['emcd-avatar-group', size !== 'xs' && `emcd-avatar-group--${size}`]" :role="label ? 'group' : undefined" :aria-label="label">
    <DsAvatar v-for="(p, i) in shown" :key="i" :size="size" :name="p.name" :src="p.src" :alt="p.name || ''" :initials="p.initials" class="emcd-avatar-group__item" />
    <span v-if="showMore ?? hidden > 0" class="emcd-avatar-group__more" :aria-label="label ? `и ещё ${hidden}` : undefined">{{ more ?? `+${hidden}` }}</span>
  </span>
</template>

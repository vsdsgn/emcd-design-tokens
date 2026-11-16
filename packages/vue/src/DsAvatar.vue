<!-- Avatar — круг: инициал (text), иконка (icon) или фото (image); status — точка «в сети». Контракт: docs/components/avatar.md -->
<script setup>
import { computed } from 'vue';
const props = defineProps({
  size: { type: String, default: 'xs' }, // xs 20 | s 32 | m 40 | l 56
  type: String,                          // text | icon | image; по умолчанию — по данным
  initials: String,
  name: String,                          // доступное имя; первая буква — инициал
  src: String,
  alt: { type: String, default: '' },
  status: Boolean,
  skeleton: Boolean,
});
const kind = computed(() => props.type || (props.src ? 'image' : (props.initials || props.name) ? 'text' : 'icon'));
const letter = computed(() => (props.initials || (props.name ? props.name.trim()[0] : '') || '').slice(0, 1));
const labelled = computed(() => !!props.name && kind.value !== 'image');
</script>
<template>
  <span :class="['emcd-avatar', size !== 'xs' && `emcd-avatar--${size}`, kind === 'icon' && 'emcd-avatar--icon', skeleton && 'emcd-avatar--skeleton']"
    :role="labelled ? 'img' : undefined" :aria-label="labelled ? name : undefined" :aria-hidden="skeleton || undefined">
    <span class="emcd-avatar__circle">
      <img v-if="kind === 'image'" :src="src" :alt="alt" />
      <span v-else-if="kind === 'text'" aria-hidden="true">{{ letter }}</span>
      <slot v-else name="icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg></slot>
    </span>
    <span v-if="status && !skeleton" class="emcd-avatar__status" role="img" aria-label="В сети" />
  </span>
</template>

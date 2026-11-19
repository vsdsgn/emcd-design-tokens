<!-- Icon — иконка DS по имени (icons/svg; реестр icons.js генерирует scripts/icons-code.mjs). size: sm 16 · md 20 · lg 24 · xl 32; цвет — currentColor. label — смысловая (role=img), без label — декоративная. -->
<script setup>
import { computed } from 'vue';
import { ICONS } from './icons.js';
const props = defineProps({
  name: String,
  size: { type: String, default: 'md' }, // sm | md | lg | xl
  label: String,
});
const ic = computed(() => ICONS[props.name]);
</script>
<template>
  <svg :class="['emcd-icon', size !== 'md' && `emcd-icon--${size}`]" :viewBox="ic ? ic.viewBox : '0 0 20 20'" fill="none" :role="label ? 'img' : undefined" :aria-label="label"
    :aria-hidden="label ? undefined : 'true'" focusable="false" :data-icon="name" v-html="ic ? ic.body : ''" />
</template>

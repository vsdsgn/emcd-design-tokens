<!-- Skeleton — кирпич загрузки для текста и блоков без своего State=Skeleton. shape: text | title | circle | rect; width / height — по ожидаемому контенту (число — px). Декоративен (aria-hidden), aria-busy — у контейнера. Контракт: docs/components/skeleton.md -->
<script setup>
import { computed } from 'vue';
const props = defineProps({
  shape: { type: String, default: 'text' }, // text 12 | title 20 | circle | rect
  width: [Number, String],
  height: [Number, String],
});
const px = (v) => (typeof v === 'number' ? v + 'px' : v);
const style = computed(() => (props.width != null || props.height != null ? { width: px(props.width), height: px(props.height) } : undefined));
</script>
<template>
  <span :class="['emcd-skeleton', shape !== 'text' && `emcd-skeleton--${shape}`]" :style="style" aria-hidden="true" />
</template>

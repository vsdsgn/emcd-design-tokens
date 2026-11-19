<!-- Card — подложка: level по вложенности, radius, padding, border. Кликабельная — href или interactive (кнопка) на всю площадь. ambientLight — пятно света (19.11). Контракт: docs/components/card.md -->
<script setup>
import { computed } from 'vue';
const props = defineProps({
  level: { type: [Number, String], default: 1 },     // 1 | 2 | 3 | 0
  radius: { type: String, default: 'container' },    // container | surface | inner
  padding: { type: String, default: 's' },           // s 12 | m 16 | l 24
  border: { type: Boolean, default: true },
  ambientLight: Boolean,                             // пятно light/ambient справа сверху (Expressive; в Base прозрачное) — одна герой-карточка на экран
  href: String,
  interactive: Boolean,
  as: String,
});
const tag = computed(() => props.as || (props.href ? 'a' : props.interactive ? 'button' : 'div'));
</script>
<template>
  <component :is="tag" :href="href" :type="tag === 'button' ? 'button' : undefined"
    :class="['emcd-card', Number(level) !== 1 && `emcd-card--level-${level}`, radius !== 'container' && `emcd-card--radius-${radius}`, padding !== 's' && `emcd-card--padding-${padding}`, border && 'emcd-card--border', ambientLight && 'emcd-card--ambient', (href || interactive) && 'emcd-card--interactive']">
    <slot />
  </component>
</template>

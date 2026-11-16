<!-- Counter — число у таба, пункта меню, иконки. Не статус. Контракт: docs/components/counter.md -->
<script setup>
defineProps({
  size: { type: String, default: 's' },       // s 16 | m 20
  tone: { type: String, default: 'neutral' }, // neutral | accent | danger
  value: [String, Number],
});
</script>
<template>
  <span :class="['emcd-counter', size === 'm' && 'emcd-counter--m', tone !== 'neutral' && `emcd-counter--${tone}`]"><slot>{{ value }}</slot></span>
</template>

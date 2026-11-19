<!-- Key-value row — «название — значение» (dt + dd; ряд строк — в <dl class="emcd-kv-list">). label — название (Key в Figma: key занят во Vue и React). emphasis: default | total | muted; leader — точечная линия. Контракт: docs/components/key-value-row.md -->
<script setup>
defineProps({
  emphasis: { type: String, default: 'default' }, // default | total (итог, последней) | muted
  leader: Boolean,
  label: String,
  value: [String, Number],
});
</script>
<template>
  <div :class="['emcd-kv', emphasis !== 'default' && `emcd-kv--${emphasis}`, leader && 'emcd-kv--leader']">
    <dt class="emcd-kv__key"><span class="emcd-kv__key-text"><slot name="label">{{ label }}</slot></span></dt>
    <dd class="emcd-kv__value"><slot>{{ value }}</slot></dd>
  </div>
</template>

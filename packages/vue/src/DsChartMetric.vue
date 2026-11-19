<!-- Chart metric — показатель над графиком: подпись + крупное значение + единица. tone: default | danger | warning | success. icon — true (lightning) или имя иконки DS; слот icon — свой узел. Контракт: docs/components/chart-metric.md -->
<script setup>
import { computed } from 'vue';
import DsIcon from './DsIcon.vue';
const props = defineProps({
  tone: { type: String, default: 'default' },
  label: String,
  value: [String, Number],
  unit: String,
  showUnit: { type: Boolean, default: true },
  icon: { type: [Boolean, String], default: false },
});
const aria = computed(() => (props.label && props.value != null ? `${props.label}: ${props.value}${props.showUnit && props.unit ? ' ' + props.unit : ''}` : undefined));
</script>
<template>
  <div role="group" :aria-label="aria" :class="['emcd-chart-metric', tone !== 'default' && `emcd-chart-metric--${tone}`]">
    <span class="emcd-chart-metric__label" :title="label"><slot name="label">{{ label }}</slot></span>
    <span class="emcd-chart-metric__value-row" :aria-hidden="aria ? 'true' : undefined">
      <span v-if="icon || $slots.icon" class="emcd-chart-metric__icon"><slot name="icon"><DsIcon :name="icon === true ? 'lightning' : icon" /></slot></span>
      <span class="emcd-chart-metric__value"><slot>{{ value }}</slot></span>
      <span v-if="showUnit && unit != null" class="emcd-chart-metric__unit">{{ unit }}</span>
    </span>
  </div>
</template>

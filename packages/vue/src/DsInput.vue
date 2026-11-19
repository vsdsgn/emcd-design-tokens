<!-- Input — однострочное поле. v-model: string. state: default | error | disabled | readonly | loading | skeleton. Контракт: docs/components/input.md -->
<script setup>
import { computed, useId } from 'vue';
const model = defineModel({ type: [String, Number] });
const props = defineProps({
  size: { type: String, default: 'm' },                // m 40 | l 48 (XL снят 17.11)
  labelPosition: { type: String, default: 'on-border' }, // on-border — по умолчанию (короткая подпись) | above — длинные формы
  state: { type: String, default: 'default' },
  label: String,
  hint: String,
  error: String,
  counter: String,
  suffix: String,
});
const id = useId();
const isError = computed(() => props.state === 'error' || !!props.error);
const msg = computed(() => props.error || props.hint);
</script>
<template>
  <label :class="['emcd-field', size !== 'm' && `emcd-field--${size}`, labelPosition === 'on-border' && 'emcd-field--on-border', isError && 'emcd-field--error', state === 'disabled' && 'emcd-field--disabled', state === 'readonly' && 'emcd-field--readonly', state === 'skeleton' && 'emcd-field--skeleton']" :aria-hidden="state === 'skeleton' || undefined">
    <span v-if="label" class="emcd-field__label">{{ label }}</span>
    <span class="emcd-input">
      <span v-if="$slots.leading" class="emcd-input__leading"><slot name="leading" /></span>
      <input v-model="model" v-bind="$attrs" :disabled="state === 'disabled'" :readonly="state === 'readonly'" :aria-invalid="isError || undefined" :aria-describedby="msg ? id : undefined" :aria-busy="state === 'loading' || undefined" />
      <span v-if="suffix" class="emcd-input__suffix">{{ suffix }}</span>
      <span v-if="state === 'loading'" class="emcd-input__trailing"><svg class="emcd-field__spinner" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-opacity=".24" stroke-width="2"/><path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></span>
      <span v-else-if="$slots.trailing" class="emcd-input__trailing"><slot name="trailing" /></span>
    </span>
    <span v-if="msg || counter" class="emcd-field__row"><span v-if="msg" :id="id" class="emcd-field__hint">{{ msg }}</span><span v-if="counter" class="emcd-field__counter">{{ counter }}</span></span>
  </label>
</template>
<script>
export default { inheritAttrs: false };
</script>

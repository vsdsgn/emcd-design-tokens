<!-- Textarea — многострочное поле. v-model: string; maxlength → счётчик. Контракт: docs/components/textarea.md -->
<script setup>
import { computed, useId } from 'vue';
const model = defineModel({ type: String, default: '' });
const props = defineProps({
  size: { type: String, default: 'm' },        // m | l — шрифт и отступы; высота одинакова
  state: { type: String, default: 'default' }, // default | error | disabled | readonly
  label: String,
  hint: String,
  error: String,
  maxlength: Number,
});
const id = useId();
const isError = computed(() => props.state === 'error' || !!props.error);
const msg = computed(() => props.error || props.hint);
</script>
<template>
  <label :class="['emcd-field', size !== 'm' && `emcd-field--${size}`, isError && 'emcd-field--error', state === 'disabled' && 'emcd-field--disabled', state === 'readonly' && 'emcd-field--readonly']">
    <span v-if="label" class="emcd-field__label">{{ label }}</span>
    <textarea v-model="model" v-bind="$attrs" class="emcd-textarea" :maxlength="maxlength" :disabled="state === 'disabled'" :readonly="state === 'readonly'" :aria-invalid="isError || undefined" :aria-describedby="msg ? id : undefined"></textarea>
    <span v-if="msg || maxlength" class="emcd-field__row"><span v-if="msg" :id="id" class="emcd-field__hint">{{ msg }}</span><span v-if="maxlength" class="emcd-field__counter">{{ model.length }}/{{ maxlength }}</span></span>
  </label>
</template>
<script>
export default { inheritAttrs: false };
</script>

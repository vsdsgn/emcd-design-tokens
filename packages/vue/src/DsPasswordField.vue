<!-- Password field — поле пароля + «глаз» + требования (отмечаются по мере ввода). v-model; showRequirements=false — вход. Ошибку показывать после отправки. Контракт: docs/components/password-field.md -->
<script setup>
import { computed } from 'vue';
import DsInput from './DsInput.vue';
import DsIconButton from './DsIconButton.vue';
const props = defineProps({
  label: { type: String, default: 'Пароль' },
  placeholder: { type: String, default: 'Придумайте пароль' },
  showRequirements: { type: Boolean, default: true },
  requirements: { type: Array, default: () => [
    { label: 'Не короче 8 символов', test: (v) => v.length >= 8 },
    { label: 'Цифра', test: (v) => /\d/.test(v) },
    { label: 'Заглавная и строчная буквы', test: (v) => /\p{Lu}/u.test(v) && /\p{Ll}/u.test(v) },
    { label: 'Спецсимвол: ! @ # $ %', test: (v) => /[^\p{L}\p{N}\s]/u.test(v) },
  ] },
  state: { type: String, default: 'default' }, // default | error | disabled
  error: String,
  hint: String,
  size: { type: String, default: 'm' },
});
const model = defineModel({ type: String, default: '' });
const visible = defineModel('visible', { type: Boolean, default: false });
const met = computed(() => props.requirements.map((r) => !!r.test(model.value || '')));
</script>
<template>
  <div :class="['emcd-password', state === 'disabled' && 'emcd-password--disabled']">
    <DsInput v-model="model" :size="size" :label="label" :placeholder="placeholder" :state="state" :error="error" :hint="hint" :type="visible ? 'text' : 'password'"
      :autocomplete="showRequirements ? 'new-password' : 'current-password'">
      <template #trailing>
        <DsIconButton type="ghost" size="s" :label="visible ? 'Скрыть пароль' : 'Показать пароль'" :aria-pressed="visible" :disabled="state === 'disabled'" @click.prevent="visible = !visible">
          <svg v-if="visible" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.73 5.08A10.4 10.4 0 0 1 12 5c7 0 10 7 10 7a13.2 13.2 0 0 1-1.67 2.68M6.61 6.61A13.5 13.5 0 0 0 2 12s3 7 10 7a9.7 9.7 0 0 0 5.39-1.61M9.88 9.88a3 3 0 1 0 4.24 4.24M3 3l18 18"/></svg>
          <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2.06 12.35a1 1 0 0 1 0-.7 10.75 10.75 0 0 1 19.88 0 1 1 0 0 1 0 .7 10.75 10.75 0 0 1-19.88 0"/><circle cx="12" cy="12" r="3"/></svg>
        </DsIconButton>
      </template>
    </DsInput>
    <ul v-if="showRequirements" class="emcd-password__reqs" aria-label="Требования к паролю" aria-live="polite">
      <li v-for="(r, i) in requirements" :key="i" :class="['emcd-password__req', met[i] && 'emcd-password__req--met']">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="met[i] ? 'M5 12.5l4.5 4.5L19 7.5' : 'M7 12h10'"/></svg>
        <span>{{ r.label }}</span><span class="emcd-sr">{{ met[i] ? ' — выполнено' : ' — не выполнено' }}</span>
      </li>
    </ul>
  </div>
</template>

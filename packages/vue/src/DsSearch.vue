<!-- Search — поле поиска (draft): лупа, текст, «Очистить», когда введено. v-model: string. size: s 32 · m 40; text / placeholder — подсказка; Esc очищает (событие clear). Контракт: docs/components/search.md -->
<script setup>
import { computed } from 'vue';
import DsIcon from './DsIcon.vue';
import DsIconButton from './DsIconButton.vue';
const model = defineModel({ type: String, default: '' });
const props = defineProps({
  size: { type: String, default: 'm' }, // s | m
  text: String,
  placeholder: String,
  label: String,                        // доступное имя; по умолчанию — подсказка
  clearLabel: { type: String, default: 'Очистить' },
  disabled: Boolean,
});
const emit = defineEmits(['clear']);
const ph = computed(() => props.placeholder ?? props.text ?? 'Поиск');
const clear = (e) => { model.value = ''; emit('clear', e); };
</script>
<template>
  <div role="search" :class="['emcd-search', size === 's' && 'emcd-search--s', disabled && 'emcd-search--disabled']">
    <DsIcon name="search" class="emcd-search__icon" />
    <input v-model="model" v-bind="$attrs" type="search" class="emcd-search__input" :placeholder="ph" :aria-label="label ?? ph" :disabled="disabled"
      @keydown.esc="model && ($event.preventDefault(), clear($event))" />
    <DsIconButton v-if="model && !disabled" type="ghost" size="s" :label="clearLabel" class="emcd-search__clear" @click="clear"><DsIcon name="close" /></DsIconButton>
  </div>
</template>
<script>
export default { inheritAttrs: false };
</script>

<!-- Radio group — fieldset + legend вокруг DsRadio. -->
<script setup>
defineProps({ legend: String });
</script>
<template>
  <fieldset class="emcd-radio-group" role="radiogroup"><legend v-if="legend">{{ legend }}</legend><slot /></fieldset>
</template>

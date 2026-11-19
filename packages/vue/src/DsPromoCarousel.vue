<!-- Promo carousel (draft) — промо внизу мобильного дашборда: слайды (слот default — DsPromoCard size m) с прокруткой scroll-snap + Page indicator, синхронный с прокруткой. v-model:index — текущий слайд (с 0). Контракт: docs/components/promo-carousel.md -->
<script setup>
import { ref, computed, useSlots, onBeforeUnmount } from 'vue';
import DsPageIndicator from './DsPageIndicator.vue';
defineProps({ label: { type: String, default: 'Промо' } });
const index = defineModel('index', { type: Number, default: 0 });
const slots = useSlots();
// слайды — узлы слота default (v-for разворачивается во фрагмент)
const flat = (ns) => ns.flatMap((n) => (Array.isArray(n.children) && typeof n.type === 'symbol' ? flat(n.children) : [n]));
const slides = computed(() => (slots.default ? flat(slots.default()).filter((n) => typeof n.type !== 'symbol') : []));
const track = ref(null);
let raf = 0;
const go = (i) => { const t = track.value; const el = t && t.children[i]; if (el) t.scrollTo({ left: el.offsetLeft - t.firstElementChild.offsetLeft, behavior: 'smooth' }); };
const onScroll = () => {
  cancelAnimationFrame(raf);
  raf = requestAnimationFrame(() => {
    const t = track.value; if (!t || !t.children.length) return;
    const x0 = t.firstElementChild.offsetLeft; let best = 0; let dist = Infinity;
    [...t.children].forEach((el, i) => { const d = Math.abs(el.offsetLeft - x0 - t.scrollLeft); if (d < dist) { dist = d; best = i; } });
    if (best !== index.value) index.value = best;
  });
};
onBeforeUnmount(() => { if (typeof cancelAnimationFrame !== 'undefined') cancelAnimationFrame(raf); });
</script>
<template>
  <section class="emcd-promo-carousel" aria-roledescription="карусель" :aria-label="label">
    <div ref="track" class="emcd-promo-carousel__track" @scroll="onScroll">
      <div v-for="(s, i) in slides" :key="i" class="emcd-promo-carousel__slide" role="group" aria-roledescription="слайд" :aria-label="`${i + 1} из ${slides.length}`" @focusin="index = i">
        <component :is="s" />
      </div>
    </div>
    <DsPageIndicator v-if="slides.length > 1" :count="slides.length" :selected="index + 1" interactive class="emcd-promo-carousel__dots" @select="(k) => { index = k - 1; go(k - 1); }" />
  </section>
</template>

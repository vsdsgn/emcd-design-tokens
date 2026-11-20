# Promo carousel

🟡 Beta (20.11) — можно брать в макеты и код. Промо внизу мобильного дашборда: 2–5 Promo card M шириной 311 (следующая подглядывает) + Page indicator. Контракт — `docs/components/promo-carousel.md`.

**Состав (как в Figma «Promo carousel»):** дорожка с прокруткой scroll-snap (зазор 8) + Page indicator по центру (отступ 12), синхронный с прокруткой; точки кликабельны.

**Правила:** одна на экран, ниже рабочих блоков; один баннер — Promo card; Web — ряд Promo card.

**Доступность:** регион «Промо» (`aria-roledescription` «карусель»), слайд — группа «1 из 3»; фокус на слайде делает его текущим.

Классы: `emcd-promo-carousel`, `__track`, `__slide`, `__dots`.

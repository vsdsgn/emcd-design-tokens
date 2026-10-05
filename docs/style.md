# Style: Base и Expressive

Решение 2026-10-03. Структура и поведение компонента одни на всех, а «украшательства» включаются коллекцией **Style** (Foundations).

| Режим | Где | Что |
|---|---|---|
| **Base** (по умолчанию везде, откат для всего) | все продукты, кроме pool и Monitoring: Firmware, WL B2B, сайт, Geometria (бренд поверх Base), fallback для WL-клиентов | чистые плоские поверхности, обычные обводки, без свечения, стекла и тинтов |
| **Expressive** | EMCD mining pool (Web App, App) и Monitoring | стекло, световые пятна, брендовые тинты, градиентные обводки, свечение — как сейчас в pool, причёсано на токены |

Style не зависит от Brand: любое сочетание допустимо (EMCD + Base в Monitoring, WL Default + Base как fallback, EMCD + Expressive в pool). Geometria сейчас на Base и может включить Expressive (декор подхватит её бренд) или получить свой режим.

## Когда включается Expressive

Base — дефолт. Expressive включается явно и только если выполнены все условия:
1. продукт — pool или Monitoring;
2. устройство тянет рендер (стекло, background blur, прогрессивный блюр, пятна с layer blur): веб — нет `data-perf="low"` (его ставит перф-гард `build/js/perf.js` по сети, памяти и реальным кадрам — docs/performance.md) и есть `backdrop-filter`; Flutter — устройство не в списке слабых, по решению разработки;
3. современный движок (есть `backdrop-filter` без префикса: Chrome / Edge / Yandex 76+, Firefox 103+, Safari / iOS 18+). Старые движки (Safari ≤ 17 и т. п.) → Base. Снижение прозрачности учитываем там, где браузер его сообщает (Chromium 118+); Safari и Firefox его не сообщают — для них в продукте переключатель «Упрощённое оформление» (`data-style="base"`). Решение 2026-10-05 (заменило «Expressive только где видна настройка»).

Иначе — Base, даже в pool. CSS страхует сам: блок Expressive в `style-expressive.css` целиком внутри `@supports (backdrop-filter: blur(1px))` — в старых движках `data-style="expressive"` не срабатывает; `perf-low.css` при `[data-perf="low"]`, `prefers-reduced-transparency` и отсутствии `backdrop-filter` подставляет значения Base поверх Expressive. Flutter: по умолчанию `<brand>.<theme>.json` (Base), `<brand>.<theme>.<ios|android>.expressive.json` — только при выполнении условий.

Прогрессивный блюр у краёв прокрутки — декор: `material/edge-blur` (Base 0). В Base у края остаётся только фейд `fade/edge`.

## Токены

Роли — в `docs/visual-language.md` и на странице Foundations «🌗 Visual language» (Base / Expressive, тёмная и светлая). Style хранит: `decor/light|tint|material` (видимость декор-слоёв), `material/thin|regular|thick/fill|blur`, `material/scrim`, `light/ambient|accent/color|blur`, `light/status/*`, `light/tint`, `edge/hairline|accent|highlight`. Глубина (`Elevation/1–4`) одинакова в обоих режимах.

## Инвентаризация pool (Web App «Дашборд и подключение», App «Дашборд и подключение»)

- **Световые пятна**: layer blur 160 (×63 Web, ×14 App), 80, 15 — фиолетовые пятна на фоне. → `style/decor/glow` + `style/glow/blur`.
- **Тинт карточек**: линейный `#795efc` 15% → 0 (×36 / ×8). Цвет вне палитры → нормализован к violet/500 через `accent/tint`.
- **Свечение**: drop shadow r55 y10 `#8f42ff` @20, радиальный `#8f42ff` → 0. → `style/glow/color`.
- **Стекло**: background blur 80, inner shadow 0/0.33 белый @30. → `style/decor/glass`, `style/glass/blur`, `style/edge/highlight`.
- **Обводки**: волосок `#d0d0d0` @7 (×138 / ×16) → `border/glass`; градиент violet → `#2d2d2d` / → прозрачный 0.5 px (×50 / ×9) → `style/edge/accent`.
- **Фейды краёв** `#111` → 0 (×154 / ×40) — функциональные, не украшение: остаются в обоих режимах (`fade/edge`, см. effects.md).
- **Золотые многоточечные градиенты** — иконка монеты Luckycoin `ic_lucky_lky`. Логотипы монет — контент, одинаковы в Base и Expressive.
- **Кастомные иконки** — переменной не переключаются (instance swap не привязывается). Вариант: свойство набора у иконки или два набора с одинаковыми именами. Не решено.

## Правила

- Украшение — всегда отдельный слой внутри компонента, видимость привязана к `style/decor/*`. Основной слой компонента выглядит законченно в Base.
- В Base не должно оставаться «дыр»: если без декора теряется граница карточки — у неё есть `style/card/border`.
- Expressive уважает облегчённый режим: `[data-perf="low"]`, reduced transparency → стекло и блюр выключены (как в effects.md), декор-слои остаются, если не грузят GPU.

## Код

`data-style="base|expressive"` на `<html>` (по умолчанию base). CSS: `build/css/style-*.css`. Flutter: `build/json/<brand>.<theme>.json` (Base) и `<brand>.<theme>.expressive.json`.

## Инвентаризация legacy DS и Monitoring (2026-10-04)

**DS Web** (JNNaqYwsSSVYUZSwZHKc6q)
- `surface` (страница Surface) — единственный оформленный «декоративный» компонент: стеклянная карточка белый @5 + обводка, radius 12, под ней размытый (layer blur 250) градиентный эллипс 333×333 в цвете тона; `type` = neutral / attention / error / success / brand; слоты up / down / left / right. → в DS 2.0: Card с декор-слоем свечения, цвет свечения по тону, видимость `style/decor/glow`. Нужен `style/glow/*` по тонам (сейчас только бренд).
- `base Banner --2.0` — свечение layer blur 150 + лаймовая тень. → декор-слой баннера.
- Sidebar: `sidebar`, `sidebar / usa`, `sidebar / footer`, `Sidebar banner` — стекло (background blur 4–10), подсветки 15 / 160, фейды краёв. → стекло = `style/decor/glass`, пятна = `style/decor/glow`.
- Страница Card — концепты карточек (не компоненты): пятна 400, стекло 10–20, градиентные обводки violet → прозрачный, градиент #2c0754 → #8f42ff.
- Modals — только фейды футера (функциональные, остаются в Base).
- `icon-payment-card` (Payment Card, 7 вариантов) — иллюстрации карт с радиальными градиентами, это ассет, не компонент карты.
- Стили: `gradient` (#a363ff → #6800ff), `graf gradient` (заливка графиков), `skeleton`.

**DS App** (BPkXyq9M44BXOiUDCrmlJs)
- `Notification` (страница Card) — карточка уведомления с пятном layer blur 160.
- Есть страницы, которых нет в DS 2.0: Payment Card, Txn, Status screen, Search, Filter bottom sheet, Button float.

**Monitoring** (kY3VUdBinylsci3KoLWwLC, «главная страница»)
- Тот же словарь, что и pool: волосок #d0d0d0 @7 (×129), градиентная обводка violet → прозрачный (×25), пятна 160 / 15, стекло 10 / 32, градиент #d3b4ff → #8f42ff. → если Monitoring оставляет декор, ему подходит Expressive без отдельного режима (решено 2026-10-04: Monitoring = Expressive).
- Собственных компонентов в файле нет: собран на legacy DS Web (Sidebar item, tab item, baseButton, Badge, baseChip, Selector small, baseCheckbox). Уникальное — не компонентами, а фреймами на экранах (сканер/QR, устройства, канбан задач) → кандидаты в библиотеку Monitoring.

# Promo carousel — контракт (2026-11-20)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Promo carousel`. Status: beta. Level: unknown.
- Figma: Components, страница «Promo carousel» (`2310:2`), компонент `2310:3`. Платформы: Web, Mobile web, iOS, Android.
- Страница «Promo carousel», конструкция (`docs/patterns.md`, раздел 0.2); компонент без осей. Вложены Promo card (образец содержимого слота Slides) и Page indicator. Beta 20.11 по репо: Status в описании набора в Figma меняется отдельно.

## 2. Intent
- Промо-карусель Compact: слот Slides — 2–5 Promo card M шириной 311 (следующая подглядывает), под ней Page indicator.
- Когда использовать: промо и анонсы внизу мобильного дашборда.
- Когда нет: один баннер — Promo card; данные и рабочие блоки — не в карусели; Web — ряд Promo card.
- Правило выбора варианта:
  - Слайды — только Promo card M шириной 311; 2–5 слайдов (как Count у Page indicator).
  - Одна карусель на экран, ниже рабочих блоков.
  - Page indicator — по центру под дорожкой, отступ `space/12`; Count = число слайдов.
- Не делаем: больше 5 слайдов; данные, формы или рабочие блоки в слайдах; две карусели на экране; карусель на Web.

## 3. Anatomy
- Корень — вертикальный стек, зазор `space/12`; ширина образца 343 числом.
- Слот `Slides` — ряд слайдов, зазор `space/8`, горизонтальная прокрутка; следующий слайд подглядывает.
- `Promo card` — Promo card M (`surface/level-1`, `radius/surface`, отступ `space/24`, обводка `border/subtle`) — образец содержимого слота.
- `page indicator` — Page indicator, зазор точек `space/6`.
- Вложено: `Promo card` ×3, `Page indicator` ×1.
- Служебные слои (вариантов из 1): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент; интерактивны слайды (Promo card) и точки Page indicator.
- Оси State нет; текущий слайд — Selected у Page indicator. Состояния действия и закрытия — у Promo card.

## 5. Properties
Осей нет: один компонент.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Slides | слот | — | 1 из 1 |

- Slides — слот; содержимое — экземпляры Promo card M.

## 6. Content / slots
- Текст — у Promo card (заголовок до 2 строк, описание до 3, многоточие).
- RTL: порядок слайдов и точек зеркалится.

## 7. Events
- `update:index` (React `onIndexChange(index)`) — сменился текущий слайд: прокрутка, фокус на слайде или точка.
- Точки Page indicator — `click`: переход на слайд.

## 8. Behavior
- Свайп; слайд прилипает к началу дорожки (scroll-snap); Page indicator синхронен с прокруткой.
- Фокус на слайде делает его текущим.
- «Уменьшить движение» — переход к слайду без плавной прокрутки.

## 9. Accessibility
- Регион `section` с `aria-label` «Промо» и `aria-roledescription` «карусель».
- Слайд — группа «1 из 3» (`aria-roledescription` «слайд»); свайп дублируется фокусом: Tab по слайдам.
- Картинки в Promo card — пустой `alt`.

## 10. Tokens
- `корень`: интервал `space/12`.
- `Slides`: интервал `space/8`.
- `Promo card`: заливка / цвет `surface/level-1`; интервал `space/8`; отступы `space/24`; радиус `radius/surface`; обводка `border/subtle`; толщина обводки `border/width/default`.
- `page indicator`: интервал `space/6`.
- Значений без переменной: 1 (напр. `(root):w=343`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Compact — App и мобильный веб; Web — ряд Promo card, карусель не используется.
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Компонент `Promo carousel`; оси: нет.
- Борда: «Promo carousel — борда · шаблон v3», разделов 12.
- Описание: 810 знаков, разделы: Status: Level: Правила: Когда нет: A11y: Поиск: Beta (20.

## 13. Code projection
Код в репо: React `packages/react/src/index.js` (`PromoCarousel`), Vue `packages/vue/src/DsPromoCarousel.vue`, CSS `claude-ds/components/PromoCarousel/style.css`; проверка — `npm run test:code`. Прод (DSP / ui-emcd-web, Flutter) — сверка через `scripts/parity.mjs`, когда появится манифест кода.

- Vue: `<DsPromoCarousel>`; Flutter: `DsPromoCarousel`.
- Props: `slides`: string или слот.
- `slides` — массив узлов или `children`; `index` / `defaultIndex` / `onIndexChange` — текущий слайд с 0 (Vue — `v-model:index`); `label` — по умолчанию «Промо». При одном слайде Page indicator не рисуется.

## 14. Acceptance (2026-11-20)
- `audit.plugin.js` — не прогонялся: перевод в beta 20.11 по репо (код, README, `docs/patterns.md`); плагины — вместе с правкой описания набора в Figma.
- `variables-check.plugin.js` — не прогонялся: перевод в beta 20.11 по репо (код, README, `docs/patterns.md`); плагины — вместе с правкой описания набора в Figma.
- `audit-parity.plugin.js` — не прогонялся: перевод в beta 20.11 по репо (код, README, `docs/patterns.md`); плагины — вместе с правкой описания набора в Figma.
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props с кодом продукта — по манифесту кода, когда он будет; код в репо проверяет `npm run test:code`.
- Не проверено: стенд (Light / Dark × бренды × платформы × L0–L3, длинный текст, 6 языков, 200 %, RTL); код есть (React / Vue / CSS), манифеста кода нет — parity props пропущена.

## 15. Migration
- App «Дашборд» — баннеры-карусель с точками → Promo carousel (слайды — Promo card M).

Осталось доделать (после пакета правок beta 2026-11-13):
- Figma: Status в описании набора → beta; добавить раздел «Когда использовать:» (draft-audit DESC).
- Плагины audit / variables-check / audit-parity и стенд.

# Promo carousel — контракт · draft (2026-11-20)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Promo carousel`. Status: draft. Level: unknown.
- Figma: Components, страница «Promo carousel» (`2310:2`), компонент `2310:3`.

## 2. Intent
- Промо-карусель Compact: слот Slides (2–5 Promo card M шириной 311, следующая подглядывает), под ней Page indicator.
- Когда использовать: промо и анонсы внизу мобильного дашборда
- Когда нет: один баннер — Promo card; данные — не в карусели; Web — ряд Promo card
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `Slides`, `Promo card`, `page indicator`.
- Вложено: `Promo card` ×3, `Page indicator` ×1.
- Служебные слои (вариантов из 1): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Осей нет: один компонент.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Slides | слот | — | 1 из 1 |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- регион «Промо, слайд 1 из 3», свайп дублируется фокусом

## 10. Tokens
- `корень`: интервал `space/12`.
- `Slides`: интервал `space/8`.
- `Promo card`: заливка / цвет `surface/level-1`; интервал `space/8`; отступы `space/24`; радиус `radius/surface`; обводка `border/subtle`; толщина обводки `border/width/default`.
- `page indicator`: интервал `space/6`.
- Значений без переменной: 1 (напр. `(root):w=343`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Компонент `Promo carousel`; оси: нет.
- Борда: «Promo carousel — борда · шаблон v3», разделов 9.
- Описание: 729 знаков, разделы: Status: Level: Правила: Когда нет: A11y: Поиск:

## 13. Code projection
Код в репо: React `packages/react/src/index.js` (`PromoCarousel`), Vue `packages/vue/src/DsPromoCarousel.vue`, CSS `claude-ds/components/PromoCarousel/style.css`; проверка — `npm run test:code`. Прод (DSP / ui-emcd-web, Flutter) — сверка через `scripts/parity.mjs`, когда появится манифест кода.

- Vue: `<DsPromoCarousel>`; Flutter: `DsPromoCarousel`.
- Props: `slides`: string или слот.

## 14. Acceptance (2026-11-20)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - DESC: нет: Когда использовать:

## 15. Migration
- Legacy: App «Дашборд» — баннеры-карусель с точками

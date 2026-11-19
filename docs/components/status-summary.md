# Status summary — контракт · draft (2026-11-19)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Status summary`. Status: draft. Level: unknown.
- Figma: Components, страница «Status summary» (`2309:3033`), набор `2309:3299`.

## 2. Intent
- Сводка воркеров по статусам: три Stat card Align=Center (Отключённые · Нестабильные · Активные) с Link на «Воркеры» с фильтром. Layout: Column — Web (колонка справа от графика), Row — Compact (ряд + ссылка «Все воркеры»).
- Когда использовать: дашборд майнинга: сколько воркеров в каждом статусе
- Когда нет: App — List item × 3 с Counter; доли статусов — Progress + Legend item
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `tiles`, `tile · Отключённые`, `tile · Нестабильные`, `tile · Активные`, `all link`.
- Вложено: `Stat card` ×6, `Button` ×1.
- Служебные слои (вариантов из 2): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Layout | Column · Row | — |

Матрица полная: 2 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Show all link | булево | вкл | 1 из 2 |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- подпись всегда, статус не только цветом; плитка — ссылка «Отключённые, 9»

## 10. Tokens
- `корень`: интервал `space/12`, `space/8`.
- `tiles`: интервал `space/8`.
- `tile · Отключённые`: заливка / цвет `status/danger/subtle`; интервал `space/8`; отступы `card/padding`, `space/32`, `space/4`; радиус `radius/container`.
- `tile · Нестабильные`: заливка / цвет `status/warning/subtle`; интервал `space/8`; отступы `card/padding`, `space/32`, `space/4`; радиус `radius/container`.
- `tile · Активные`: заливка / цвет `surface/next`; интервал `space/8`; отступы `card/padding`, `space/32`, `space/4`; радиус `radius/container`; обводка `border/subtle`; толщина обводки `border/width/default`.
- `all link`: интервал `space/4`; мин. ширина `size/button/min`; радиус `radius/xs`.
- Значений без переменной: 2 (напр. `(root):w=160`, `(root):w=343`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Status summary`, вариантов 2 из 2; оси: Layout.
- Борда: шаблона v3 нет.
- Описание: 685 знаков, разделы: Status: Level: Layout: Правила: Когда нет: Поиск:

## 13. Code projection
Код в репо: React `packages/react/src/index.js` (`StatusSummary`), Vue `packages/vue/src/DsStatusSummary.vue`, CSS `claude-ds/components/StatusSummary/style.css`; проверка — `npm run test:code`. Прод (DSP / ui-emcd-web, Flutter) — сверка через `scripts/parity.mjs`, когда появится манифест кода.

- Vue: `<DsStatusSummary>`; Flutter: `DsStatusSummary`.
- Props: `layout`: column | row; `showAllLink`: boolean = true.

## 14. Acceptance (2026-11-19)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - DESC: нет: Когда использовать:, A11y:
  - BOARD: нет борды v3

## 15. Migration
- Legacy: Web App «Дашборд» — плитки статусов справа от графика; мобильный веб — ряд плиток

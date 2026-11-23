# Status summary — контракт (2026-11-23)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Status summary`. Status: beta. Level: unknown.
- Figma: Components, страница «Status summary» (`2309:3033`), набор `2309:3299`. Платформы: Web, Mobile web, iOS, Android.
- Страница «Status summary», конструкция (`docs/patterns.md`, раздел 0.2). Вложены Stat card (3 на вариант) и Button Text «Все воркеры» (Layout=Row). Beta 20.11 по репо: Status в описании набора в Figma меняется отдельно.

## 2. Intent
- Сводка воркеров по статусам: три плитки Stat card Align=Center — Отключённые · Нестабильные · Активные; плитка ведёт в «Воркеры» с фильтром.
- Когда использовать: дашборд майнинга: сколько воркеров в каждом статусе.
- Когда нет: App — List item × 3 с Counter; доли статусов — Progress + Legend item; одна метрика — Stat card.
- Правило выбора варианта:
  - Layout: Column — Web, колонка справа от графика, плитки делят высоту; Row — Compact (мобильный веб), три равные плитки в ряд + ссылка «Все воркеры».
  - Порядок фиксирован, проблемы первыми: Danger (Отключённые) → Warning (Нестабильные) → Neutral (Активные).
  - Плитка — Stat card Align=Center, Tone по статусу, Link=On (стрелка — «Воркеры» с фильтром статуса); Delta и Info выключены.
  - Show all link — только Row; по умолчанию On.
  - Загрузка — плитки Stat card State=Skeleton, Tone=Neutral (тон до данных неизвестен), та же высота; «Все воркеры» остаётся.
- Не делаем: другой порядок плиток; статус только цветом без подписи; Tone для украшения; Status summary в App.

## 3. Anatomy
- Корень — вертикальный стек, зазор `space/12` / `space/8`; ширина образца числом (Column 160, Row 343).
- `tiles` — плитки, зазор `space/8`: Column — колонкой, Row — рядом поровну.
- `tile · Отключённые` — Stat card Tone=Danger (`status/danger/subtle`); `tile · Нестабильные` — Warning (`status/warning/subtle`); `tile · Активные` — Neutral (`surface/next`, обводка `border/subtle`, `border/width/default`). У всех `radius/container`, отступы `card/padding` / `space/32` / `space/4` (у Center боковые поля `space/4`).
- `all link` — Button Text S «Все воркеры» со стрелкой: `radius/control-xs`, min-width `size/button/min`, зазор `space/4` (Row).
- Вложено: `Stat card` ×6, `Button` ×1.
- Служебные слои (вариантов из 2): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент; интерактивны вложенные Stat card (стрелка Link) и Button.
- Оси State нет: Hover / Pressed / Focus — у стрелки Stat card (Icon button XS) и Button Text.
- Skeleton — через вложенные Stat card State=Skeleton (в коде `skeleton`).

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Layout | Column · Row | Column |

Матрица полная: 2 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Show all link | булево | вкл | 1 из 2 |

- Show all link — по умолчанию On; привязано только к Layout=Row (1 из 2).
- Подписи и числа — у вложенных Stat card.

## 6. Content / slots
- Подписи фиксированы: «Отключённые», «Нестабильные», «Активные»; значение — число воркеров.
- Длинный текст и языки — по правилам Stat card (Label до 2 строк, Value одна строка ≤ 240); Row на 375 — три плитки без переноса подписи (Center, боковые поля `space/4`).
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет. Порядок плиток зеркалится, числа — нет.

## 7. Events
- `item` (React `onItem(item, e)`) — стрелка плитки: переход в «Воркеры» с фильтром статуса.
- `all` (React `onAllLink`) — «Все воркеры» (Row).

## 8. Behavior
- Статична; смена чисел — без анимации счётчика (по Stat card).
- Column — плитки делят высоту колонки у графика.

## 9. Accessibility
- Статус не только цветом: подпись всегда.
- Стрелка плитки — Icon button с именем «подпись, число» («Отключённые, 9»).
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`). Кольцо — у вложенных Icon button и Button.

## 10. Tokens
- `корень`: интервал `space/12`, `space/8`.
- `tiles`: интервал `space/8`.
- `tile · Отключённые`: заливка / цвет `status/danger/subtle`; интервал `space/8`; отступы `card/padding`, `space/32`, `space/4`; радиус `radius/container`.
- `tile · Нестабильные`: заливка / цвет `status/warning/subtle`; интервал `space/8`; отступы `card/padding`, `space/32`, `space/4`; радиус `radius/container`.
- `tile · Активные`: заливка / цвет `surface/next`; интервал `space/8`; отступы `card/padding`, `space/32`, `space/4`; радиус `radius/container`; обводка `border/subtle`; толщина обводки `border/width/default`.
- `all link`: интервал `space/4`; мин. ширина `size/button/min`; радиус `radius/xs`.
- Значений без переменной: 2 (напр. `(root):w=160`, `(root):w=343`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Column — Web (Large+); Row — мобильный веб (Compact). App — не используется: List item × 3 с Counter.
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Набор `Status summary`, вариантов 2 из 2; оси: Layout.
- Борда: «Status summary — борда · шаблон v3», разделов 12.
- Описание: 1060 знаков, разделы: Status: Level: Layout: Правила: Когда нет: Поиск: Когда использовать: A11y: Beta (20.

## 13. Code projection
Код в репо: React `packages/react/src/index.js` (`StatusSummary`), Vue `packages/vue/src/DsStatusSummary.vue`, CSS `claude-ds/components/StatusSummary/style.css`; проверка — `npm run test:code`. Прод (DSP / ui-emcd-web, Flutter) — сверка через `scripts/parity.mjs`, когда появится манифест кода.

- Vue: `<DsStatusSummary>`; Flutter: `DsStatusSummary`.
- Props: `layout`: column | row; `showAllLink`: boolean = true.
- `offline` / `unstable` / `active` — числа или `items: [{ tone, label, value }]`; `skeleton` — загрузка; `allLinkLabel` — по умолчанию «Все воркеры»; «Все воркеры» рисуется только при `layout="row"`.

## 14. Acceptance (2026-11-23)
- `audit.plugin.js` — не прогонялся: перевод в beta 20.11 по репо (код, README, `docs/patterns.md`); плагины — вместе с правкой описания набора в Figma.
- `variables-check.plugin.js` — не прогонялся: перевод в beta 20.11 по репо (код, README, `docs/patterns.md`); плагины — вместе с правкой описания набора в Figma.
- `audit-parity.plugin.js` — не прогонялся: перевод в beta 20.11 по репо (код, README, `docs/patterns.md`); плагины — вместе с правкой описания набора в Figma.
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props с кодом продукта — по манифесту кода, когда он будет; код в репо проверяет `npm run test:code`.
- Не проверено: стенд (Light / Dark × бренды × платформы × L0–L3, длинный текст, 6 языков, 200 %, RTL); код есть (React / Vue / CSS), манифеста кода нет — parity props пропущена.

## 15. Migration
- Web App «Дашборд» — плитки статусов справа от графика → Layout=Column; мобильный веб — ряд плиток → Layout=Row.

Осталось доделать (после пакета правок beta 2026-11-13):
- Figma: Status в описании набора → beta; добавить разделы «Когда использовать:» и «A11y:» (draft-audit DESC).
- Плагины audit / variables-check / audit-parity и стенд.

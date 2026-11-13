# Table cell / Star — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Table cell / Star`. Status: draft. Level: unknown.
- Figma: Components, страница «Table» (`367:42849`), набор `93:784`. Платформы: Web, Mobile web, iOS, Android.
- Страница «Table». Ячейка строки таблицы; вне Table row не используется.

## 2. Intent
- Ячейка таблицы с избранным: звезда (Icon button), которая добавляет строку в избранное и убирает из него.
- Когда использовать: избранное в строке таблицы.
- Когда нет: вне Table row; такие же данные в списке на Compact — List item.
- Правило выбора варианта:
  - Status: Off — не в избранном; On — в избранном (ось Status, как у контролов выбора).
  - State: Default — данные есть; Skeleton — данные строки загружаются; Disabled — изменить избранное нельзя.
  - Звезда — Icon button Ghost M, иконка 20.
  - Одна на строку, первой или последней колонкой. Высота — по строке (Table row): 48 или 80; ширина — по колонке; отступы и выравнивание — как у остальных ячеек колонки.
- Не делаем: две звезды в строке; звезда в середине строки.

## 3. Anatomy
- Корень — горизонтальный стек, отступы `space/8`, зазор `space/8`, высота `size/table/row-lg`, min-width `size/table-cell/min` (80).
- `star` — экземпляр Icon button (Type=Ghost, Size=M) с иконкой `icon/star` 20; Default и Disabled ячейки — State=Default / Disabled у Icon button. Кольцо фокуса, зоны нажатия и безопасное поле — у Icon button.
- `skeleton` — полоса `skeleton/base`, `radius/chip` (вместо звезды).
- Вложено: иконки ×6.
- Служебные слои (вариантов из 6): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): Плашка — у вложенного Icon button Ghost: подложка только слоем `state/layer` (Hover 6 % / Pressed 10 %, Pressed — масштаб 0.96); ось Status (Off | On) — как у контролов выбора; Skeleton — загрузка.
- Default × Off — контурная звезда; Default × On — звезда залита и обведена `icon/accent`.
- Hover / Pressed / Focus — у Icon button (State его набора). Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`).
- Skeleton — одна полоса вместо звезды, одинаковая у Off и On.
- Disabled — Icon button State=Disabled, не нажимается; On — заливка и контур `icon/disabled`.
- Hover строки — у Table row.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Status | Off · On | Off |
| State | Default · Skeleton · Disabled | Default |

Матрица полная: 6 вариантов.

## 6. Content / slots
- Текста нет: имя действия — в `aria-label` кнопки. Длинный текст и языки на раскладку не влияют.
- Текст 200 %: иконка не растёт.
- RTL: колонка избранного переезжает вместе с таблицей; звезда не зеркалится.

## 7. Events
- `click` → переключение Status Off ↔ On. У Disabled и Skeleton событий нет.

## 8. Behavior
- Отклик — у Icon button: Hover: слой 0 → 6 %, `motion/duration/feedback` (120 мс), `motion/easing/standard`. «Уменьшить движение»: длительности ≈ 0. Pressed — слой 10 % + масштаб 0.96, 120 мс.
- Skeleton — блик `Skeleton` (1.2 с; «Уменьшить движение» — пульсация прозрачности).

## 9. Accessibility
- `td` с кнопкой: `aria-pressed`; имя: Off — «В избранное», On — «Убрать из избранного».
- Клавиатура: Tab — фокус на кнопке, Enter / Пробел — переключить.
- Off и On различаются формой (контур / заливка), не только цветом.

## 10. Tokens
- `корень`: интервал `space/8`; высота `size/table/row-lg`; мин. ширина `size/table-cell/min`; отступы `space/8`.
- `skeleton`: заливка / цвет `skeleton/base`; радиус `radius/chip`.
- Min / max корня: minWidth 80 size/table-cell/min.
- Значений без переменной: 6 (напр. `(root):w=80`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Набор `Table cell / Star`, вариантов 6 из 6; оси: Status, State.
- Борда: «Table header cell — борда · шаблон v3», разделов 11.
- Описание: 585 знаков, разделы: Status: Level: Избранное в строке: Когда использовать: Правила: A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsTableCellStar>`; Flutter: `DsTableCellStar`.
- Props: `status`: boolean.
- Состояния (Default, Skeleton, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled`, `skeleton` — props.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %; текстовых и булевых свойств нет; RTL стенд не проверяет; звезда на Icon button и On `icon/accent` (правка 13.11) стендом не перепроверены; кода нет — parity props пропущена.

## 15. Migration
- DS Web `table / star` → Status=Off; `star active` → Status=On.

Осталось доделать (после пакета правок beta 2026-11-13):
- На решение: звезда прижата к началу ячейки (отступ `space/8`) — если колонка избранного по центру, выровнять.

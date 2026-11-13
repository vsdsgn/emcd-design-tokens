# Table cell / Toggle — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Table cell / Toggle`. Status: beta. Level: unknown.
- Figma: Components, страница «Table» (`367:42849`), набор `93:757`. Платформы: Web, Mobile web, iOS, Android.
- Страница «Table». Ячейка строки таблицы; вне Table row не используется.

## 2. Intent
- Ячейка таблицы с переключателем: Toggle S без подписи, включает или выключает объект строки сразу.
- Когда использовать: включить или выключить объект строки сразу (автовывод, уведомления).
- Когда нет: вне Table row; такие же данные в списке на Compact — List item; применение после «Сохранить» — Checkbox (правило Toggle).
- Правило выбора варианта:
  - Toggle S без подписи, по центру высоты; подпись — в заголовке колонки.
  - Положение (Off | On) и Hover / Pressed / Focus — у вложенного Toggle по его правилам.
  - State: Default — переключение доступно; Skeleton — данные строки загружаются; Disabled — переключение недоступно.
  - Высота — по строке (Table row): 48 или 80; ширина — по колонке; отступы и выравнивание — как у остальных ячеек колонки.
- Не делаем: подпись внутри ячейки; Toggle M; переключатель, который применяется не сразу.

## 3. Anatomy
- Корень — горизонтальный стек, высота `size/table/row-lg`, отступы `space/12`, зазор `space/8`, min-width `size/table-cell/min` (80).
- `toggle` — вложенный Toggle S без подписи, max-width `size/field/max`; кольцо фокуса и зоны нажатия — внутри экземпляра.
- `skeleton` — полоса `skeleton/base`, `radius/chip`.
- Вложено: `Toggle` ×3.
- Служебные слои (вариантов из 3): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): наследует вложенный Toggle: Контрол выбора: слой `state/layer` на глифе, выбранное — `control/checked`.
- Default — переключатель активен; Hover / Pressed / Focus — у вложенного Toggle.
- Skeleton — одна полоса вместо переключателя.
- Disabled — вложенный Toggle в своём Disabled, не нажимается.
- Hover строки — у Table row.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| State | Default · Skeleton · Disabled | Default |

Матрица полная: 3 вариантов.

- Своих свойств нет: положение — у вложенного Toggle.

## 6. Content / slots
- Текста нет: подпись — в заголовке колонки. Длинный текст, языки и 200 % на раскладку не влияют.
- RTL: ячейка выравнивается вместе с колонкой; положение ползунка — по правилам Toggle.

## 7. Events
- `change` (Off ↔ On) — у вложенного Toggle.

## 8. Behavior
- Применяется сразу, без «Сохранить»; неудача — откат положения + Toast (правило Toggle).
- Hover: слой 0 → 6 %, `motion/duration/feedback` (120 мс), `motion/easing/standard`. «Уменьшить движение»: длительности ≈ 0.
- Skeleton — блик 1.2 с (набор Skeleton); «Уменьшить движение» — пульсация прозрачности.

## 9. Accessibility
- `td`; у переключателя `role="switch"` и `aria-label` с именем объекта строки («Автовывод: rig-01»).
- Клавиатура: Tab — фокус на переключателе, Space — переключить.
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`). Кольцо и зоны нажатия — у вложенного Toggle, своих служебных слоёв у ячейки нет.

## 10. Tokens
- `корень`: интервал `space/8`; высота `size/table/row-lg`; мин. ширина `size/table-cell/min`; отступы `space/12`.
- `toggle`: maxw `size/field/max`.
- `skeleton`: заливка / цвет `skeleton/base`; радиус `radius/chip`.
- Min / max корня: minWidth 80 size/table-cell/min.
- Значений без переменной: 3 (напр. `(root):w=80`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Набор `Table cell / Toggle`, вариантов 3 из 3; оси: State.
- Борда: «Table header cell — борда · шаблон v3», разделов 11.
- Описание: 552 знаков, разделы: Status: Level: Когда использовать: Правила: A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsTableCellToggle>`; Flutter: `DsTableCellToggle`.
- Props: нет.
- Состояния (Default, Skeleton, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled`, `skeleton` — props.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %; текстовых и булевых свойств нет; вложенный Toggle на стенде только On; RTL стенд не проверяет; кода нет — parity props пропущена.

## 15. Migration
- DS Web `table / toggle` → Table cell / Toggle; положение — у вложенного Toggle.

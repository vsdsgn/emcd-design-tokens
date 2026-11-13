# Table cell / Icon — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Table cell / Icon`. Status: beta. Level: unknown.
- Figma: Components, страница «Table» (`367:42849`), набор `93:817`. Платформы: Web, Mobile web, iOS, Android.
- Страница «Table». Ячейка строки таблицы; вне Table row не используется.

## 2. Intent
- Ячейка таблицы с иконкой 24: признак строки (тип, канал). Не нажимается.
- Когда использовать: иконка-признак в ячейке (тип, канал).
- Когда нет: вне Table row; такие же данные в списке на Compact — List item; действие — Table cell / Buttons.
- Правило выбора варианта:
  - Иконка 24, одна на ячейку, не нажимается; действие иконкой — Table cell / Buttons.
  - Color: Primary — признак наравне с основным текстом строки; Secondary — вспомогательный признак, `icon/secondary`.
  - State: Default — данные есть; Skeleton — данные строки загружаются; Disabled — строка недоступна.
  - Icon · swap — иконка из набора Icons; на макете — `icon/copy`.
  - Высота — по строке (Table row): 48 или 80; ширина — по колонке; отступы и выравнивание — как у остальных ячеек колонки.
- Не делаем: две иконки в ячейке; нажатие по иконке; иконка без текстовой альтернативы.

## 3. Anatomy
- Корень — горизонтальный стек, высота `size/table/row-lg`, отступы `space/12`, зазор `space/8`, min-width `size/table-cell/min` (80).
- `icon` — иконка 24 (Icon · swap); цвет по оси Color, у Secondary — `icon/secondary`.
- `skeleton` — полоса `skeleton/base`, `radius/chip`.
- Вложено: иконки ×6.
- Служебные слои (вариантов из 6): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент; Skeleton — загрузка.
- Default — иконка в цвете оси Color.
- Skeleton — одна полоса вместо иконки, от Color не зависит.
- Disabled — иконка `icon/disabled`.
- Hover — у строки (Table row), не у ячейки.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Color | Primary · Secondary | Primary |
| State | Default · Skeleton · Disabled | Default |

Матрица полная: 6 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Icon · swap | замена экземпляра | `icon/copy` | 6 из 6 |

## 6. Content / slots
- Текста нет: смысл иконки — в заголовке колонки или `aria-label`. Длинный текст и языки на раскладку не влияют.
- Текст 200 %: иконка 24 с кеглем не растёт.
- RTL: ячейка выравнивается вместе с колонкой; иконка зеркалится, только если она направленная.

## 7. Events
- Нет. Нажатие и Hover — у Table row.

## 8. Behavior
- Статична. Skeleton — блик 1.2 с (набор Skeleton); «Уменьшить движение» — пульсация прозрачности.

## 9. Accessibility
- `td`; иконка с текстовой альтернативой (`aria-label`) или пояснение в заголовке колонки.

## 10. Tokens
- `корень`: интервал `space/8`; высота `size/table/row-lg`; мин. ширина `size/table-cell/min`; отступы `space/12`.
- `skeleton`: заливка / цвет `skeleton/base`; радиус `radius/chip`.
- Min / max корня: minWidth 80 size/table-cell/min.
- Значений без переменной: 6 (напр. `(root):w=80`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Набор `Table cell / Icon`, вариантов 6 из 6; оси: Color, State.
- Борда: «Table header cell — борда · шаблон v3», разделов 11.
- Описание: 561 знаков, разделы: Status: Level: Иконка 24 в ячейке. Когда использовать: Правила: A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsTableCellIcon>`; Flutter: `DsTableCellIcon`.
- Props: `color`: primary | secondary.
- Состояния (Default, Skeleton, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled`, `skeleton` — props.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %; текстовых и булевых свойств нет, Icon · swap не переключалось; цвет Secondary после правки стендом не перепроверен; RTL стенд не проверяет; кода нет — parity props пропущена.

## 15. Migration
- DS Web `table / icon` (icon color = secondary | primary) → Table cell / Icon: Color Secondary | Primary; иконка — Icon · swap.

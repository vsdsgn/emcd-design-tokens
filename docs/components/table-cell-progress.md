# Table cell / Progress — контракт (2026-11-14)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Table cell / Progress`. Status: beta. Level: unknown.
- Figma: Components, страница «Table cell» (`367:42849`), набор `92:770`. Платформы: Web, Mobile web, iOS, Android.
- Страница «Table». Ячейка строки таблицы; вне Table row не используется.

## 2. Intent
- Ячейка таблицы с долей выполнения: полоса Progress шириной 80 и процент справа.
- Когда использовать: доля выполнения в строке (заполнение, загрузка).
- Когда нет: вне Table row; такие же данные в списке на Compact — List item.
- Правило выбора варианта:
  - Состав один: Progress M без подписи шириной 80 и процент справа.
  - Percent — число со знаком «%», цифры табличные.
  - State: Default — данные есть; Skeleton — данные строки загружаются; Disabled — строка недоступна.
  - Высота — по строке (Table row): 48 или 80; ширина — по колонке; отступы и выравнивание — как у остальных ячеек колонки.
- Не делаем: подпись у полосы; текст вместо числа в Percent.

## 3. Anatomy
- Корень — горизонтальный стек, высота `size/table/row-lg`, отступы `space/12`, зазор `space/8`, min-width `size/table-cell/min` (80).
- `progress` — вложенный Progress (M, без подписи), ширина 80.
- `percent` — `text/secondary`, `type/label/md`, `font-weight/medium`.
- `skeleton` — полоса `skeleton/base`, `radius/chip`.
- Вложено: `Progress` ×3.
- Служебные слои (вариантов из 3): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент; Skeleton — загрузка.
- Default — полоса в цвете бренда, процент `text/secondary`.
- Skeleton — одна полоса вместо Progress и процента.
- Disabled — полоса погашена, процент `text/disabled`.
- Hover — у строки (Table row), не у ячейки.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| State | Default · Skeleton · Disabled | Default |

Матрица полная: 3 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Percent | текст | «25.42%» | 3 из 3 |

## 6. Content / slots
- Percent — число с «%» («25.42%»), формат — по локали; только число, не усекается и не переносится.
- Языки (стенд): de, ar, hi, th, ja, kk — по высоте не обрезано (в Percent в продукте только число).
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет. Заполнение полосы идёт от начала строки.
- Текст 200 %: полоса не растёт; процент выходит за корень 154 и наезжает на соседнюю ячейку (см. todo).

## 7. Events
- Нет. Нажатие и Hover — у Table row.

## 8. Behavior
- Статична; смена значения — по правилам Progress. Skeleton — блик 1.2 с (набор Skeleton); «Уменьшить движение» — пульсация прозрачности.

## 9. Accessibility
- `td`; у полосы `role="progressbar"` с `aria-valuenow`; процент — текстом.

## 10. Tokens
- `корень`: интервал `space/8`; высота `size/table/row-lg`; мин. ширина `size/table-cell/min`; отступы `space/12`.
- `progress`: интервал `space/8`.
- `percent`: заливка / цвет `text/disabled`, `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- `skeleton`: заливка / цвет `skeleton/base`; радиус `radius/chip`.
- Min / max корня: minWidth 80 size/table-cell/min.
- Значений без переменной: 3 (напр. `(root):w=154`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Набор `Table cell / Progress`, вариантов 3 из 3; оси: State.
- Борда: «Table cells — борда · шаблон v3», разделов 25.
- Описание: 570 знаков, разделы: Status: Level: Когда использовать: Правила: A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsTableCellProgress>`; Flutter: `DsTableCellProgress`.
- Props: `percent`: string или слот.
- Состояния (Default, Skeleton, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled`, `skeleton` — props.

## 14. Acceptance (2026-11-14)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %; булевых свойств нет; RTL стенд не проверяет; кода нет — parity props пропущена.

## 15. Migration
- DS Web `table / progress line` → Table cell / Progress; puller (процент) → свойство Percent.

Осталось доделать (после пакета правок beta 2026-11-13):
- Текст 200 %: процент выходит за корень (154) и наезжает на соседнюю ячейку — корень по содержимому.
- На решение: Dark L0 — погашенная полоса (Disabled) едва заметна.
- Ширина корня 154 числом (ширину задаёт колонка; min-width — `size/table-cell/min`).

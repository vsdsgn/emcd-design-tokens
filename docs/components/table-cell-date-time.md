# Table cell / Date time — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Table cell / Date time`. Status: beta. Level: unknown.
- Figma: Components, страница «Table» (`367:42849`), набор `92:619`. Платформы: Web, Mobile web, iOS, Android.
- Страница «Table». Ячейка строки таблицы; вне Table row не используется.

## 2. Intent
- Ячейка таблицы с датой и временем события: в строку или столбиком.
- Когда использовать: дата и время события в строке таблицы.
- Когда нет: вне Table row; такие же данные в списке на Compact — List item; произвольный текст — Table cell / Text.
- Правило выбора варианта:
  - Layout: Row — дата и время в строку (плотность строки 48); Column — столбиком (плотность 80).
  - Формат — по локали, цифры табличные.
  - State: Default — данные есть; Skeleton — данные строки загружаются; Disabled — строка недоступна.
  - Высота — по строке (Table row): 48 или 80; ширина — по колонке; отступы и выравнивание — как у остальных ячеек колонки.
- Не делаем: Column в строке 48; произвольный текст в Date и Time.

## 3. Anatomy
- Корень — высота `size/table/row-lg`, отступы `space/12`, min-width `size/table-cell/min` (80); `content` — дата и время с зазором `space/8`.
- `date` — `text/primary`, `type/label/lg`, `font-weight/medium`; `time` — `text/secondary`, тот же кегль. Тексты — Fill, одна строка.
- `skeleton` — полоса `skeleton/base`, `radius/chip`.
- Служебные слои (вариантов из 6): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент; Skeleton — загрузка.
- Default — `date` `text/primary`, `time` `text/secondary`.
- Skeleton — одна полоса вместо даты и времени.
- Disabled — дата и время `text/disabled`.
- Hover — у строки (Table row), не у ячейки.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Layout | Row · Column | Row |
| State | Default · Skeleton · Disabled | Default |

Матрица полная: 6 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Date | текст | «17 декабря» | 6 из 6 |
| Time | текст | «03:00» | 6 из 6 |

## 6. Content / slots
- Date — дата в формате локали («17 декабря»); Time — время («03:00»).
- Длинный текст: блок `content` и тексты — Fill, одна строка, усечение многоточием по ширине ячейки; полный текст — в `title` / тултипе.
- Языки (стенд): de, ar, hi, th, ja, kk — по высоте не обрезано.
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет. Порядок «дата → время» зеркалится вместе с таблицей.
- Текст 200 %: дата и время усекаются многоточием по ширине ячейки, за корень по ширине не выходят.

## 7. Events
- Нет. Нажатие и Hover — у Table row.

## 8. Behavior
- Статична. Skeleton — блик 1.2 с (набор Skeleton); «Уменьшить движение» — пульсация прозрачности.

## 9. Accessibility
- `td` с элементом `time` и машинным значением `datetime`.

## 10. Tokens
- `корень`: интервал `space/8`; высота `size/table/row-lg`; мин. ширина `size/table-cell/min`; отступы `space/12`.
- `content`: интервал `space/8`.
- `date`: заливка / цвет `text/disabled`, `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`.
- `time`: заливка / цвет `text/disabled`, `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`.
- `skeleton`: заливка / цвет `skeleton/base`; радиус `radius/chip`.
- Min / max корня: minWidth 80 size/table-cell/min.
- Значений без переменной: 6 (напр. `(root):w=180`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Набор `Table cell / Date time`, вариантов 6 из 6; оси: Layout, State.
- Борда: «Table header cell — борда · шаблон v3», разделов 11.
- Описание: 652 знаков, разделы: Status: Level: Дата и время: Когда использовать: Правила: Длинный текст: A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsTableCellDateTime>`; Flutter: `DsTableCellDateTime`.
- Props: `layout`: row | column; `date`: string или слот; `time`: string или слот.
- Состояния (Default, Skeleton, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled`, `skeleton` — props.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %; булевых свойств нет; RTL стенд не проверяет; усечение (правка 13.11) повторно не проверено; кода нет — parity props пропущена.

## 15. Migration
- DS Web `table / date time` (var = row / column) → Layout Row | Column; `table / line label text` → Layout=Row.

Осталось доделать (после пакета правок beta 2026-11-13):
- Ширина корня 180 числом (ширину задаёт колонка; min-width — `size/table-cell/min`).

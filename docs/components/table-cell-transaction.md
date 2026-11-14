# Table cell / Transaction — контракт (2026-11-14)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Table cell / Transaction`. Status: beta. Level: unknown.
- Figma: Components, страница «Table cell» (`367:42849`), набор `92:727`. Платформы: Web, Mobile web, iOS, Android.
- Страница «Table». Ячейка строки таблицы; вне Table row не используется.

## 2. Intent
- Ячейка таблицы с суммой операции: знак, число и единица. Выровнена по концу строки.
- Когда использовать: сумма операции со знаком.
- Когда нет: вне Table row; такие же данные в списке на Compact — List item; число без смысла операции — Table cell / Text (Align=End).
- Правило выбора варианта:
  - Direction: Unexpected — неожиданное списание не по воле пользователя: штраф, корректировка, chargeback («−», `text/danger`); Credit — зачисление («+», `text/success`); Neutral — обычное списание: вывод, перевод (`text/primary`); Neutral secondary — второстепенная сумма, комиссия (`text/secondary`).
  - Красный — только Unexpected; обычный вывод, перевод и комиссия — Neutral (`components.md`, «Цвет суммы»).
  - State: Default — данные есть; Skeleton — данные строки загружаются; Disabled — строка недоступна.
  - Выравнивание по концу строки. Высота — по строке (Table row): 48 или 80; ширина — по колонке; отступы и выравнивание — как у остальных ячеек колонки.
- Не делаем: красный для обычных списаний; цвет как единственный признак направления; выравнивание по началу.

## 3. Anatomy
- Корень — горизонтальный стек по концу строки, высота `size/table/row-lg`, отступы `space/12`, зазор `space/4`, min-width `size/table-cell/min` (80).
- `sign` — «−» / «+» (только у Unexpected и Credit); `value` — число, max-width 80; `unit` — единица, `text/secondary`. Кегль — `type/label/lg`, `font-weight/medium`.
- `skeleton` — полоса `skeleton/base`, `radius/chip`.
- Служебные слои (вариантов из 12): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент; Skeleton — загрузка.
- Default — цвет `sign` и `value` по Direction: `text/danger`, `text/success`, `text/primary`, `text/secondary`; `unit` — `text/secondary`.
- Skeleton — одна полоса у конца строки.
- Disabled — знак, число и единица `text/disabled`; знак остаётся.
- Hover — у строки (Table row), не у ячейки.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Direction | Unexpected · Credit · Neutral · Neutral secondary | Unexpected |
| State | Default · Skeleton · Disabled | Default |

Матрица полная: 12 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Value | текст | «1 234» | 12 из 12 |
| Unit | текст | «USDT» | 12 из 12 |

## 6. Content / slots
- Value — число в формате локали, цифры табличные; Unit — тикер или валюта.
- Длинный текст: сумму не обрезаем — ширину колонки задают по самой длинной сумме; цифры табличные.
- Языки (стенд): de, ar, hi, th, ja, kk — по высоте не обрезано.
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет. Ячейка остаётся у конца строки (логическая сторона).
- Текст 200 %: `value` усекается по 80 многоточием, знак и единица не срезаются.

## 7. Events
- Нет. Нажатие и Hover — у Table row.

## 8. Behavior
- Статична. Skeleton — блик 1.2 с (набор Skeleton); «Уменьшить движение» — пульсация прозрачности.

## 9. Accessibility
- `td`; знак и тип операции озвучиваются словами («зачисление», «списание»), не только цветом.

## 10. Tokens
- `корень`: интервал `space/4`; высота `size/table/row-lg`; мин. ширина `size/table-cell/min`; отступы `space/12`.
- `sign`: заливка / цвет `text/danger`, `text/disabled`, `text/success`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`.
- `value`: заливка / цвет `text/danger`, `text/disabled`, `text/primary`, `text/secondary`, `text/success`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`.
- `unit`: заливка / цвет `text/disabled`, `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`.
- `skeleton`: заливка / цвет `skeleton/base`; радиус `radius/chip`.
- Min / max корня: minWidth 80 size/table-cell/min.
- Значений без переменной: 12 (напр. `(root):w=132`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Набор `Table cell / Transaction`, вариантов 12 из 12; оси: Direction, State.
- Борда: «Table cells — борда · шаблон v3», разделов 25.
- Описание: 964 знаков, разделы: Status: Level: Сумма операции: Unexpected — Когда использовать: Правила: A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsTableCellTransaction>`; Flutter: `DsTableCellTransaction`.
- Props: `direction`: unexpected | credit | neutral | neutral-secondary; `value`: string или слот; `unit`: string или слот.
- Состояния (Default, Skeleton, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled`, `skeleton` — props.

## 14. Acceptance (2026-11-14)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — только реестр: maxWidth текстового слоя числом (value 80).
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %; булевых свойств нет; RTL стенд не проверяет; усечение `value` (правка 13.11) повторно не проверено; кода нет — parity props пропущена.

## 15. Migration
- DS Web `table / transaction` (var = debit / credit / neutral primary / neutral secondary) → Direction Unexpected | Credit | Neutral | Neutral secondary; debit → Unexpected только для неожиданных списаний, обычные списания — Neutral.

Осталось доделать (после пакета правок beta 2026-11-13):
- Первый вариант набора — Unexpected: поставить Neutral первым.
- На решение: у Neutral и Neutral secondary слоя `sign` нет, а по `components.md` у списания знак «−» есть всегда — добавить знак или правило «знак пишется в Value».
- Ширина корня 132 числом (ширину задаёт колонка; min-width — `size/table-cell/min`).

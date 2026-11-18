# Table cell — контракт (2026-11-18)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Table cell`. Status: beta. Level: unknown.
- Figma: Components, страница «Table cell» (`367:42849`), набор `92:592`. Платформы: Web, Mobile web, iOS, Android.
- Ячейка строки таблицы; вне Table row не используется.
- С 2026-11-15 — одна ячейка со слотом Content вместо 14 наборов `Table cell / *` (решение 16.10, п. 3 «Перепроверки 14.11»). Бывший `Table cell / Text` (ид. сохранён).

## 2. Intent
- Ячейка таблицы: выравнивание, отступы, состояние и слот Content. Содержимое — текст (основная + вторая строка) или атом DS.
- Когда использовать: любая ячейка в Table row.
- Когда нет: вне Table row; такие же данные в списке на Compact — List item; заголовок колонки — Table header cell.
- Правило выбора варианта:
  - Одна колонка — одно выравнивание и один тип содержимого.
  - Align: Start — текст, даты, монеты, имена; End — числа и суммы (Amount). Стороны логические: в RTL меняются местами.
  - Content (слот): по умолчанию — две строки текста (основная `text/primary` + вторая `text/secondary`, вторая необязательна). Иначе — атом DS: Coin с тикером, Avatar с именем, Amount (сумма со знаком), Badge, Status, Toggle S, Progress, Icon button Tertiary S (до трёх), Button. Своих вёрсток в слоте нет.
  - Действия строки (Icon button, «⋯» → Menu) — только последней колонкой, Align=End.
  - State: Default — данные есть; Skeleton — данные строки загружаются (одна полоса); Disabled — строка недоступна (атомы в слоте — тоже Disabled).
  - Высота — по строке (Table row): 48 или 64; ширина — по колонке.
- Не делаем: перенос текста на несколько строк; разное выравнивание или разные типы содержимого в одной колонке; действия не в последней колонке; произвольная вёрстка в слоте вместо атома DS.

## 3. Anatomy
- Корень — высота `size/row/lg` (64, с 16.11; было `size/table/row-lg` 80), отступы `space/12`, зазор `space/8`, min-width `size/table-cell/min` (80).
- Слот `Content`: по умолчанию `primary` — `text/primary`, `type/label/lg`, `font-weight/medium`; `secondary` — `text/secondary`, тот же кегль; обе строки — Fill, одна строка.
- `skeleton` — полоса `skeleton/base`, `radius/chip` (State=Skeleton).
- Служебные слои (вариантов из 6): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент; Skeleton — загрузка.
- Default — содержимое слота по его правилам.
- Skeleton — одна полоса вместо содержимого, со стороны Align.
- Disabled — текст `text/disabled`; атомы в слоте — State=Disabled.
- Hover — у строки (Table row), не у ячейки; интерактивные атомы в слоте (Toggle, Icon button) — свои состояния.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Align | Start · End | Start |
| State | Default · Skeleton · Disabled | Default |

Матрица полная: 6 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Content | слот | — | 6 из 6 |

## 6. Content / slots
- Длинный текст: строки слота — Fill, одна строка, усечение многоточием по ширине ячейки (End — выравнивание вправо); полный текст — в `title` / тултипе. Сумма (Amount) не усекается: ширина колонки — по самой длинной сумме.
- Языки (стенд, текст): de, ar, hi, th, ja, kk — по высоте не обрезано, строки не наезжают.
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет. Ячейка зеркалится вместе с таблицей.
- Текст 200 %: строки усекаются по ширине ячейки, на соседние ячейки не наезжают.

## 7. Events
- Своих нет. Нажатие и Hover — у Table row; события интерактивных атомов в слоте — их собственные.

## 8. Behavior
- Статична. Skeleton — блик 1.2 с (набор Skeleton); «Уменьшить движение» — пульсация прозрачности.

## 9. Accessibility
- `td`; обрезанный текст доступен полностью (`title` или тултип по фокусу).
- Атом в слоте — со своей доступностью (Icon button — `aria-label`, Toggle — `role="switch"`); Tab — по интерактивным ячейкам строки.

## 10. Tokens
- `корень`: интервал `space/8`; высота `size/row/lg`; мин. ширина `size/table-cell/min`; отступы `space/12`.
- `primary`: заливка / цвет `text/disabled`, `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`.
- `secondary`: заливка / цвет `text/disabled`, `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`.
- `skeleton`: заливка / цвет `skeleton/base`; радиус `radius/chip`.
- Min / max корня: minWidth 80 size/table-cell/min.
- Значений без переменной: 6 (напр. `(root):w=184`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Набор `Table cell`, вариантов 6 из 6; оси: Align, State.
- Борда: «Table cell — борда · шаблон v3», разделов 12.
- Описание: 1173 знаков, разделы: Status: Level: Ячейка таблицы — Align: Когда использовать: Правила: Длинный текст: A11y: Legacy:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsTableCell>`; Flutter: `DsTableCell`.
- Props: `align`: start | end; `content`: string или слот.
- Состояния (Default, Skeleton, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled`, `skeleton` — props.

## 14. Acceptance (2026-11-18)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13, до слияния в одну ячейку).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: после слияния 2026-11-15 плагины и стенд не перепрогонялись; полный крест 72 ячеек (на стенде 2026-11-13 просмотрены 24), содержимое слота каждым атомом, RTL; кода нет — parity props пропущена.

## 15. Migration
- MAJOR: 14 наборов `Table cell / *` → `Table cell` со слотом Content (2026-11-15); свойства Primary, Secondary, Show secondary удалены — текст и вторая строка в слоте.
- DS Web `table / label text`, `table / line label text`, `table / date time` → текст в слоте (дата и время — основная + вторая строка).
- DS Web `table / coin md | sm label text` → Coin с тикером; `table / avatar label text` → Avatar с именем; `table / image label text` → текст + медиа по согласованию (атома картинки в ячейке нет).
- DS Web `table / transaction` → Amount (знак и тон по правилам Amount), Align=End.
- DS Web `table / progress line` → Progress; `table / badge` → Badge; `table / toggle` → Toggle S; `table cell / status` → Status; `table / icon` → иконка в слоте.
- DS Web `table / small buttons`, `table / more button`, `table / star` → Icon button Tertiary S (до трёх, «⋯» открывает Menu), последней колонкой.

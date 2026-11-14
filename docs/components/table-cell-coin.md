# Table cell / Coin — контракт (2026-11-14)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Table cell / Coin`. Status: beta. Level: unknown.
- Figma: Components, страница «Table cell» (`367:42849`), набор `92:685`. Платформы: Web, Mobile web, iOS, Android.
- Страница «Table». Ячейка строки таблицы; вне Table row не используется.

## 2. Intent
- Ячейка таблицы с монетой или активом: символ монеты, тикер и название или сеть.
- Когда использовать: монета или актив в строке таблицы.
- Когда нет: вне Table row; такие же данные в списке на Compact — List item; монета без текста — Coin; сумма в монете — Table cell / Transaction.
- Правило выбора варианта:
  - Size: M — символ 40, тикер и название столбиком (плотность строки 80); S — символ 24, тикер и сеть в строку (плотность 48).
  - Сеть — второй строкой (M) или после тикера (S), в свойстве Name.
  - State: Default — данные есть; Skeleton — данные строки загружаются; Disabled — строка недоступна.
  - Высота — по строке (Table row): 48 или 80; ширина — по колонке; отступы и выравнивание — как у остальных ячеек колонки.
- Не делаем: Size=M в строке 48.

## 3. Anatomy
- Корень — горизонтальный стек, высота `size/table/row-lg`, отступы `space/12`, зазор `space/12` / `space/8` по Size, min-width `size/table-cell/min` (80).
- `coin` — вложенный атом Coin: 40 (`size/media/lg`) у M, 24 (`size/media/sm`) у S; монета — свойство Coin.
- `content`: `ticker` — `text/primary`, `type/label/lg`, `font-weight/medium`; `name` — `text/secondary`, тот же кегль. Блок и тексты — Fill, одна строка.
- `skeleton` — полоса `skeleton/base`, `radius/chip`.
- Вложено: `Coin` ×6.
- Служебные слои (вариантов из 6): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент; Skeleton — загрузка.
- Default — монета в цвете, `ticker` `text/primary`, `name` `text/secondary`.
- Skeleton — одна полоса вместо монеты и текста, одинаковая у M и S.
- Disabled — тексты `text/disabled`, монета — прозрачность 40 %.
- Hover — у строки (Table row), не у ячейки.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | M · S | M |
| State | Default · Skeleton · Disabled | Default |

Матрица полная: 6 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Ticker | текст | «BTC» | 6 из 6 |
| Name | текст | «Bitcoin» | 6 из 6 |

## 6. Content / slots
- Ticker — код монеты («BTC»); Name — название или сеть («Bitcoin»). Цвета монеты от темы и бренда не зависят.
- Длинный текст: блок `content` и тексты — Fill, одна строка, усечение многоточием по ширине ячейки; полный текст — в `title` / тултипе.
- Языки (стенд): de, ar, hi, th, ja, kk — по высоте не обрезано.
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет. Рисунок монеты не зеркалится.
- Текст 200 %: монета не растёт; тикер и название усекаются многоточием по ширине ячейки, за корень по ширине не выходят.

## 7. Events
- Нет. Нажатие и Hover — у Table row.

## 8. Behavior
- Статична. Skeleton — блик 1.2 с (набор Skeleton); «Уменьшить движение» — пульсация прозрачности.

## 9. Accessibility
- `td`; логотип монеты декоративен (`aria-hidden`), имя — текстом.

## 10. Tokens
- `корень`: интервал `space/12`, `space/8`; высота `size/table/row-lg`; мин. ширина `size/table-cell/min`; отступы `space/12`.
- `coin`: высота `size/media/lg`, `size/media/sm`; ширина `size/media/lg`, `size/media/sm`.
- `ticker`: заливка / цвет `text/disabled`, `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`.
- `name`: заливка / цвет `text/disabled`, `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`.
- `skeleton`: заливка / цвет `skeleton/base`; радиус `radius/chip`.
- Min / max корня: minWidth 80 size/table-cell/min.
- Значений без переменной: 6 (напр. `(root):w=161`, `(root):w=160`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Набор `Table cell / Coin`, вариантов 6 из 6; оси: Size, State.
- Борда: «Table cells — борда · шаблон v3», разделов 25.
- Описание: 713 знаков, разделы: Status: Level: Монета: Когда использовать: Правила: Длинный текст: A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsTableCellCoin>`; Flutter: `DsTableCellCoin`.
- Props: `size`: m | s; `ticker`: string или слот; `name`: string или слот.
- Состояния (Default, Skeleton, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled`, `skeleton` — props.

## 14. Acceptance (2026-11-14)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %; булевых свойств нет; RTL стенд не проверяет; усечение (правка 13.11) повторно не проверено; кода нет — parity props пропущена.

## 15. Migration
- DS Web `table / coin md label text` → Size=M; `table / coin sm label text` → Size=S.

Осталось доделать (после пакета правок beta 2026-11-13):
- На решение: Skeleton — одна полоса без круга монеты (40 / 24).
- Ширина корня 161 / 160 числом (ширину задаёт колонка; min-width — `size/table-cell/min`).

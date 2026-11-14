# Table cell / Text — контракт (2026-11-14)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Table cell / Text`. Status: beta. Level: unknown.
- Figma: Components, страница «Table cell» (`367:42849`), набор `92:592`. Платформы: Web, Mobile web, iOS, Android.
- Страница «Table». Ячейка строки таблицы; вне Table row не используется.

## 2. Intent
- Ячейка таблицы с текстом: основная строка и необязательная вторая строка.
- Когда использовать: текст в ячейке, при необходимости со второй строкой.
- Когда нет: вне Table row; такие же данные в списке на Compact — List item; дата и время — Table cell / Date time; монета — Table cell / Coin; сумма операции со знаком — Table cell / Transaction.
- Правило выбора варианта:
  - Align: Start — текст; End — числа и суммы. Стороны логические: в RTL меняются местами.
  - Show secondary: On — есть вторая строка (`text/secondary`); Off — одна строка.
  - State: Default — данные есть; Skeleton — данные строки загружаются; Disabled — строка недоступна.
  - Высота — по строке (Table row): 48 или 80; ширина — по колонке; отступы и выравнивание — как у остальных ячеек колонки.
- Не делаем: перенос текста на несколько строк; разное выравнивание в одной колонке.

## 3. Anatomy
- Корень — высота `size/table/row-lg`, отступы `space/12`, зазор `space/8`, min-width `size/table-cell/min` (80).
- `primary` — `text/primary`, `type/label/lg`, `font-weight/medium`; `secondary` — `text/secondary`, тот же кегль. Обе строки — Fill, одна строка.
- `skeleton` — полоса `skeleton/base`, `radius/chip`.
- Служебные слои (вариантов из 6): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент; Skeleton — загрузка.
- Default — `primary` `text/primary`, `secondary` `text/secondary`.
- Skeleton — одна полоса вместо текста, со стороны Align.
- Disabled — обе строки `text/disabled`.
- Hover — у строки (Table row), не у ячейки.

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
| Primary | текст | «userTableGuide» | 6 из 6 |
| Secondary | текст | «0 сделок» | 6 из 6 |
| Show secondary | булево | вкл | 6 из 6 |

## 6. Content / slots
- Длинный текст: `primary` и `secondary` — Fill, одна строка, усечение многоточием по ширине ячейки (End — выравнивание вправо); полный текст — в `title` / тултипе.
- Языки (стенд): de, ar, hi, th, ja, kk — по высоте не обрезано, строки не наезжают.
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет. Ячейка зеркалится вместе с таблицей.
- Текст 200 %: строки усекаются по ширине ячейки, на соседние ячейки не наезжают.

## 7. Events
- Нет. Нажатие и Hover — у Table row.

## 8. Behavior
- Статична. Skeleton — блик 1.2 с (набор Skeleton); «Уменьшить движение» — пульсация прозрачности.

## 9. Accessibility
- `td`; обрезанный текст доступен полностью (`title` или тултип по фокусу).

## 10. Tokens
- `корень`: интервал `space/8`; высота `size/table/row-lg`; мин. ширина `size/table-cell/min`; отступы `space/12`.
- `primary`: заливка / цвет `text/disabled`, `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`.
- `secondary`: заливка / цвет `text/disabled`, `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`.
- `skeleton`: заливка / цвет `skeleton/base`; радиус `radius/chip`.
- Min / max корня: minWidth 80 size/table-cell/min.
- Значений без переменной: 6 (напр. `(root):w=184`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Набор `Table cell / Text`, вариантов 6 из 6; оси: Align, State.
- Борда: «Table cells — борда · шаблон v3», разделов 25.
- Описание: 769 знаков, разделы: Status: Level: Ячейка: Когда использовать: Правила: Длинный текст: A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsTableCellText>`; Flutter: `DsTableCellText`.
- Props: `align`: start | end; `primary`: string или слот; `secondary`: string или слот; `showSecondary`: boolean = true.
- Состояния (Default, Skeleton, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled`, `skeleton` — props.

## 14. Acceptance (2026-11-14)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, Show secondary = Off; RTL стенд не проверяет; кода нет — parity props пропущена.

## 15. Migration
- DS Web `table / label text` → Table cell / Text: text → Show secondary; hover — у строки (Table row).

Осталось доделать (после пакета правок beta 2026-11-13):
- Ширина корня 184 числом (ширину задаёт колонка; min-width — `size/table-cell/min`).

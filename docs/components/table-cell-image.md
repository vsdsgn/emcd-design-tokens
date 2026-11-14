# Table cell / Image — контракт (2026-11-14)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Table cell / Image`. Status: beta. Level: unknown.
- Figma: Components, страница «Table cell» (`367:42849`), набор `92:744`. Платформы: Web, Mobile web, iOS, Android.
- Страница «Table». Ячейка строки таблицы; вне Table row не используется.

## 2. Intent
- Ячейка таблицы с картинкой 52 и двумя строками текста (устройство, площадка).
- Когда использовать: изображение объекта (устройство, площадка) с двумя строками текста.
- Когда нет: вне Table row; такие же данные в списке на Compact — List item; монета — Table cell / Coin; текст без картинки — Table cell / Text.
- Правило выбора варианта:
  - Только плотность строки 80.
  - Primary — название, одна строка с многоточием; Secondary — вторая строка.
  - State: Default — данные есть; Skeleton — данные строки загружаются; Disabled — строка недоступна.
  - Высота — по строке (Table row); ширина — по колонке; отступы и выравнивание — как у остальных ячеек колонки.
- Не делаем: строка плотности 48; перенос названия на вторую строку.

## 3. Anatomy
- Корень — горизонтальный стек, высота `size/table/row-lg`, отступы `space/12`, зазор `space/16`, min-width `size/table-cell/min` (80).
- `image` — 52 × 52, `radius/inner`, заглушка `action/secondary/default` под изображение.
- `content`: `primary` — `text/primary`, `type/label/lg`, `font-weight/medium`; `secondary` — `text/secondary`, тот же кегль. Блок и тексты — Fill, одна строка.
- `skeleton` — полоса `skeleton/base`, `radius/chip`.
- Служебные слои (вариантов из 3): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент; Skeleton — загрузка.
- Default — картинка, `primary` `text/primary`, `secondary` `text/secondary`.
- Skeleton — одна полоса вместо картинки и текста.
- Disabled — обе строки `text/disabled`; заглушка картинки не меняется.
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
| Primary | текст | «Layan green park» | 3 из 3 |
| Secondary | текст | «28-16 Jackson Ave» | 3 из 3 |

## 6. Content / slots
- Primary — название объекта; Secondary — пояснение (адрес, площадка).
- Длинный текст: блок `content` и тексты — Fill, одна строка, усечение многоточием по ширине ячейки; полный текст — в `title` / тултипе.
- Языки (стенд): de, ar, hi, th, ja, kk — по высоте не обрезано.
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет. Изображение не зеркалится.
- Текст 200 %: картинка не растёт; строки усекаются многоточием по ширине ячейки, за корень по ширине не выходят.

## 7. Events
- Нет. Нажатие и Hover — у Table row.

## 8. Behavior
- Статична. Skeleton — блик 1.2 с (набор Skeleton); «Уменьшить движение» — пульсация прозрачности.

## 9. Accessibility
- `td`; изображение с `alt` или декоративное, если название рядом.

## 10. Tokens
- `корень`: интервал `space/16`; высота `size/table/row-lg`; мин. ширина `size/table-cell/min`; отступы `space/12`.
- `image`: заливка / цвет `action/secondary/default`; радиус `radius/inner`.
- `primary`: заливка / цвет `text/disabled`, `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`.
- `secondary`: заливка / цвет `text/disabled`, `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`.
- `skeleton`: заливка / цвет `skeleton/base`; радиус `radius/chip`.
- Min / max корня: minWidth 80 size/table-cell/min.
- Значений без переменной: 3 (напр. `(root):w=300`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Набор `Table cell / Image`, вариантов 3 из 3; оси: State.
- Борда: «Table cells — борда · шаблон v3», разделов 25.
- Описание: 661 знаков, разделы: Status: Level: Когда использовать: Правила: Длинный текст: A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsTableCellImage>`; Flutter: `DsTableCellImage`.
- Props: `primary`: string или слот; `secondary`: string или слот.
- Состояния (Default, Skeleton, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled`, `skeleton` — props.

## 14. Acceptance (2026-11-14)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %; булевых свойств нет; RTL стенд не проверяет; усечение (правка 13.11) повторно не проверено; кода нет — parity props пропущена.

## 15. Migration
- DS Web `table / image label text` → Table cell / Image (Primary, Secondary).

Осталось доделать (после пакета правок beta 2026-11-13):
- Радиус картинки: в описании `radius/sm`, в наборе `radius/inner` — свести.
- На решение: Skeleton без квадрата картинки 52; заглушка картинки в Disabled не гаснет; свойства замены изображения нет.
- Ширина корня 300 числом (ширину задаёт колонка; min-width — `size/table-cell/min`).

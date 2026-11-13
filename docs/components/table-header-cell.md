# Table header cell — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Table header cell`. Status: beta. Level: unknown.
- Figma: Components, страница «Table» (`367:42849`), набор `62:67`. Платформы: Web, Mobile web, iOS, Android.
- Часть Table (страница «Table», молекула). Вне таблицы не используется.

## 2. Intent
- Заголовок колонки таблицы; у сортируемой колонки — кнопка сортировки со стрелкой.
- Когда использовать: заголовок колонки в Table.
- Когда нет: заголовок блока или карточки — текстовый стиль Heading; вне таблицы не используется.
- Правило выбора варианта:
  - Align: Start — текст, даты, статусы; End — числа и суммы (заголовок у конца строки, стрелка перед текстом). Start / End — логические стороны, в RTL зеркалятся.
  - Sort: None — колонка не отсортирована или не сортируется (`text/tertiary`); Ascending / Descending — активная сортировка (`text/primary` + стрелка).
  - Клик по сортируемому заголовку: None → Descending → Ascending.
  - Show filter — у колонки есть фильтр (иконка перед подписью, у End — перед стрелкой); Show info — у заголовка есть пояснение (иконка после подписи).
  - Ширина — по колонке.
- Не делаем: активная сортировка без стрелки; Align End для текстовых колонок; заголовок вне таблицы.

## 3. Anatomy
- Корень: высота `size/table/header`, отступы `space/12`, зазор `space/4`, min-width `size/table-cell/min`, ширина — по колонке.
- `label` — Fill, `type/label/lg/*`, `font-weight/medium`; стрелка сортировки, иконки фильтра и info (Show filter / Show info).
- Служебные: `state layer` (`state/layer` × `state/hover` / `state/pressed`), `focus ring` (внутри ячейки), зоны `hit area · web` / `· app`, `safe area · outer`; `skeleton` (`skeleton/base`, `radius/chip`).
- Вложено: иконки ×48.
- Служебные слои (вариантов из 20): кольцо фокуса 20 · зона Web 20 · зона касания 20 · безопасное поле 20.

## 4. States
- Группа модели состояний (`docs/components.md`): Плашка: слой `state/layer` × `state/hover` 6 % / `state/pressed` 10 %; Disabled — токены `*/disabled`; Skeleton — загрузка.
- Skeleton — полоса вместо текста, только при Sort=None (Start / End), отсюда 20 из 24.
- Default — покой; Hover — слой `state/hover`; Pressed — `state/pressed`; Hover и фокус — только у сортируемого заголовка.
- Disabled нет: несортируемая колонка — Sort=None без Hover.
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`). Кольцо — внутри ячейки, без смещения (исключение, `docs/exceptions.md`).

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Align | Start · End | Start |
| Sort | None · Ascending · Descending | None |
| State | Skeleton · Default · Hover · Pressed | Default |

Матрица: 20 из 24.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Label | текст | «Сумма» | 20 из 20 |
| Focus ring | булево | выкл | 20 из 20 · служебное |
| Show hit area | булево | выкл | 20 из 20 · служебное |
| Safe margin | булево | выкл | 20 из 20 · служебное |
| Show filter | булево | выкл | 18 из 20 |
| Show info | булево | выкл | 18 из 20 |

- Label — текст заголовка (по умолчанию «Сумма»); Focus ring, Show hit area, Safe margin — служебные; Show filter, Show info — нет у Skeleton.

## 6. Content / slots
- Длинный текст: `label` Fill по ширине колонки, одна строка, усечение многоточием; полный текст — в `title` / тултипе.
- Языки (de, ar, hi, th, ja, kk): по высоте не обрезаются.
- Текст 200 %: ячейка растёт по высоте, обрезки нет.
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет.

## 7. Events
- `click` по сортируемому заголовку — смена Sort (None → Descending → Ascending).

## 8. Behavior
- Hover: слой 0 → 6 %, `motion/duration/feedback` (120 мс), `motion/easing/standard`. «Уменьшить движение»: длительности ≈ 0.
- Зона нажатия ≥ `touch/min`: Web 24, касание 44 (слои `hit area · web` / `hit area · app`, проверка — Show hit area); безопасное поле — `control/safe-margin`.

## 9. Accessibility
- `th scope="col"` с `aria-sort`; сортировка — кнопка внутри `th`.
- Клавиатура: Tab — по сортируемым заголовкам, Enter / Space — сменить сортировку.

## 10. Tokens
- `корень`: интервал `space/4`; высота `size/table/header`; мин. ширина `size/table-cell/min`; отступы `space/12`.
- `label`: заливка / цвет `text/primary`, `text/tertiary`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`.
- `skeleton`: заливка / цвет `skeleton/base`; радиус `radius/chip`.
- Служебные слои (общие правила — `service-layers.md`): `focus ring`: обводка `border/focus-ring`; толщина обводки `border/width/focus-ring` · `hit area · web`: видимость `touch/is-fine` · `hit area · overlay`: заливка / цвет `status/danger/solid` · `hit area · app`: видимость `touch/is-coarse` · `safe area · outer`: обводка `status/success/solid`; толщина обводки `control/safe-margin` · `state layer`: заливка / цвет `state/layer`; прозрачность `state/hover`, `state/pressed`.
- Min / max корня: minWidth 80 size/table-cell/min.
- Значений без переменной: 60 (напр. `(root):w=160`, `hit area · web:w=160`, `hit area · web:h=44`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Набор `Table header cell`, вариантов 20 из 24; оси: Align, Sort, State.
- Борда: «Table header cell — борда · шаблон v3», разделов 11.
- Описание: 1110 знаков, разделы: Status: Level: Правила: Длинный текст: A11y: Часть Table. Поиск: Legacy: Когда использовать: Матрица:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsTableHeaderCell>`; Flutter: `DsTableHeaderCell`.
- Props: `align`: start | end; `sort`: none | ascending | descending; `label`: string или слот; `showFilter`: boolean = false; `showInfo`: boolean = false.
- Состояния (Skeleton, Default, Hover, Pressed) — не props: Hover / Pressed / Focus из платформы; `disabled`, `skeleton` — props.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; усечение подписи после правки стендом не перепроверено; RTL стенд не проверяет; кода нет — parity props пропущена.

## 15. Migration
- DS Web `.table` / column title → Table header cell (Align, Sort, State; Show filter, Show info).

Осталось доделать (после пакета правок beta 2026-11-13):
- Ширина корня 160 и `hit area · web` 160 × 44 — числом.
- Описание: «Label/SM» против `type/label/lg/*` у `label` — свести.
- Focus ring включается у Skeleton (скелетон не фокусируется).

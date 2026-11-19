# Table row — контракт (2026-11-19)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Table row`. Status: beta. Level: unknown.
- Figma: Components, страница «Table row» (`2093:1271`), набор `63:291`. Платформы: Web, Mobile web, iOS, Android.
- Страница «Table». Часть Table: отдельно от таблицы не используется.

## 2. Intent
- Строка таблицы: экземпляры Table cell со слотом Content в колонках фиксированной ширины и разделитель снизу (`border/subtle`).
- Когда использовать: строка данных в Table на Web.
- Когда нет: Compact — List item; пара «название — значение» — Key-value row.
- Правило выбора варианта:
  - Density: Compact 48 (`size/table/row-sm`) — одна строка в ячейке, плотные списки; Regular 64 (`size/row/lg`, 16.11 — по продукту Web App «Воркеры», было 80) — две строки и медиа. В одной таблице одна плотность.
  - State: Hover — только если строка открывает детали (Side panel); Pressed — нажатие на кликабельную строку.
  - Selected=On — строка выбрана (массовые действия, открыта в Side panel); у выбранной есть Hover / Pressed.
  - Колонки: одна колонка — одно выравнивание и один тип содержимого; текст и даты — у начала, числа и суммы — у конца; действия (Icon button Tertiary S, «⋯» → Menu) — последней колонкой.
  - Ячейки — только экземпляры Table cell; содержимое — в слоте Content (текст или атом DS, правила — `table-cell.md`); ширины колонок задаются в макете.
  - Действия строки — Icon button Tertiary S в последней колонке (16.11, по продукту: кнопки на подложке; было Ghost).
  - Без собственных боковых отступов (17.11): колонки начинаются от края таблицы, отступ — только у Table cell.
- Не делаем: две плотности в одной таблице; Hover у строки, которая ничего не открывает; произвольная вёрстка вместо Table cell и атома DS в слоте; действия не в последней колонке.

## 3. Anatomy
- Корень — горизонтальный ряд ячеек, высота `size/table/row-sm` (Compact 48) / `size/row/lg` (Regular 64), отступы `space/8`, обводка снизу `border/subtle`; Selected — заливка `accent/subtle`.
- На макете шесть ячеек — экземпляры Table cell со своим содержимым слота: `cell · Дата` (текст, две строки), `cell · Монета` (Coin с тикером), `cell · Сумма` (Amount, End), `cell · Адрес` (текст), `cell · Статус` (Status), `cell · ⋯` (Icon button, End); у каждой min-width `size/table-cell/min`.
- `state layer` — `state/layer` × `state/hover` / `state/pressed`.
- Служебные: `focus ring` (`border/focus-ring`, `border/width/focus-ring`, внутреннее), `hit area · web` / `hit area · app`, `safe area · outer` (`control/safe-margin`).
- Вложено: `Table cell` ×72, `_Hit area` ×24, `_Safe margin` ×12.
- Служебные слои (вариантов из 12): кольцо фокуса 12 · зона Web 12 · зона касания 12 · безопасное поле 12.

## 4. States
- Группа модели состояний (`docs/components.md`): Плашка: слой `state/layer` × `state/hover` 6 % / `state/pressed` 10 %; Selected=On — `accent/subtle`.
- Default — без подложки, разделитель снизу.
- Hover — слой `state/layer` × `state/hover`; только у строки, которая открывает детали.
- Selected=On — заливка `accent/subtle` (цвет бренда); Hover / Pressed выбранной — слой состояния поверх.
- Pressed — слой `state/layer` × `state/pressed`, темнее Hover.
- Focus — свойство Focus ring: внутреннее кольцо, не наезжает на соседние строки. Disabled у строки нет — гасятся ячейки (State=Disabled у Table cell).

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Density | Compact · Regular | Compact |
| Selected | Off · On | Off |
| State | Default · Hover · Pressed | Default |

Матрица полная: 12 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Focus ring | булево | выкл | 12 из 12 · служебное |
| Show hit area | булево | выкл | 12 из 12 · служебное |
| Safe margin | булево | выкл | 12 из 12 · служебное |

## 6. Content / slots
- Содержимое — у ячеек, по их правилам; ширина колонки фиксирована, текст ячейки не выходит за колонку.
- Длинный текст и языки: текст в ячейке — одна строка, усечение многоточием по ширине колонки (у End — выравнивание вправо); сумма (Amount) не усекается (ширина колонки — по самой длинной сумме); Status — одна строка с многоточием.
- Текст 200 %: высота строки 48 / 64 не растёт; текст усекается в пределах своей колонки, без наложения на соседние.
- RTL: порядок колонок зеркалится, текст и даты — у начала, числа — у конца; цифры, адреса и тикеры не зеркалятся.

## 7. Events
- `click` по строке — открыть детали (Side panel), если строка кликабельна.
- Выбор — чекбокс в первой колонке.

## 8. Behavior
- Hover: слой 0 → 6 %, `motion/duration/feedback` (120 мс), `motion/easing/standard`. «Уменьшить движение»: длительности ≈ 0.
- Selected держится, пока строка выбрана или открыта в Side panel.
- На Compact таблица превращается в List item.

## 9. Accessibility
- `tr`; кликабельная строка — ссылка или кнопка в первой ячейке, растянутая на строку.
- Выбор — чекбокс в первой колонке с `aria-label`.
- Клавиатура: Tab — по интерактивным ячейкам и строкам, Enter — открыть детали.
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`). Кольцо — внутреннее, чтобы не наезжать на соседние строки.
- Зона нажатия — вся строка: 48 / 64 (слои `hit area · web` / `hit area · app`, проверка — Show hit area); безопасное поле — `control/safe-margin`.

## 10. Tokens
- `корень`: заливка / цвет `accent/subtle`; высота `size/row/lg`, `size/table/row-sm`; обводка `border/subtle`.
- `cell · Дата`: интервал `space/8`; высота `size/row/lg`; мин. ширина `size/table-cell/min`; отступы `space/sm`.
- `cell · Монета`: интервал `space/sm`, `space/xs`; высота `size/row/lg`; мин. ширина `size/table-cell/min`; отступы `space/sm`.
- `cell · Сумма`: интервал `space/2xs`; высота `size/row/lg`; мин. ширина `size/table-cell/min`; отступы `space/sm`.
- `cell · Адрес`: интервал `space/8`; высота `size/row/lg`; мин. ширина `size/table-cell/min`; отступы `space/sm`.
- `cell · Статус`: интервал `space/8`; высота `size/row/lg`; мин. ширина `size/table-cell/min`; отступы `space/12`.
- `cell · ⋯`: интервал `space/8`; высота `size/row/lg`; мин. ширина `size/table-cell/min`; отступы `space/xs`.
- Служебные слои (общие правила — `service-layers.md`): `focus ring`: обводка `border/focus-ring`; толщина обводки `border/width/focus-ring` · `hit area · web`: видимость `touch/is-fine` · `hit area · overlay`: заливка / цвет `status/danger/solid` · `hit area · app`: видимость `touch/is-coarse` · `safe area · outer`: обводка `status/success/solid`; толщина обводки `control/safe-margin` · `state layer`: заливка / цвет `state/layer`; прозрачность `state/hover`, `state/pressed`.
- Значений без переменной: 24 (напр. `hit area · web:w=840`, `hit area · web:h=48`, `hit area · web:h=64`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Только Web: строка данных в Table; на Compact — List item.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Набор `Table row`, вариантов 12 из 12; оси: Density, Selected, State.
- Борда: «Table row — борда · шаблон v3», разделов 12.
- Описание: 1478 знаков, разделы: Status: Level: Строка таблицы: Density: State: Колонки: A11y: Часть Table. Поиск: Legacy: Когда использовать: Правила:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsTableRow>`; Flutter: `DsTableRow`.
- Props: `density`: compact | regular; `selected`: boolean.
- Состояния (Default, Hover, Pressed) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-19)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; строка 856 шире ячейки стенда — колонки Статус и «⋯» видны только на 200 % в Light; усечение в ячейках после правок стендом в строке не перепроверено; RTL стенд не проверяет; кода нет — parity props пропущена.

## 15. Migration
- DS Web `.table / raw` → Table row: Density Compact 48 | Regular 64 (Web App «Воркеры» — 66), Selected Off | On, State Default | Hover | Pressed; ячейки — Table cell со слотом Content (14 наборов `Table cell / *` слиты 2026-11-15).

# Chart plot — контракт (2026-11-19)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Chart plot`. Status: beta. Level: unknown.
- Figma: Components, страница «Chart plot» (`2093:1266`), набор `97:921`. Платформы: Web, Mobile web, iOS, Android.
- Organism; область графика внутри Chart card. Матрица 23 из 35: Skeleton, Empty и Disabled — только у базовых типов Bars, Line, Area. Вложены Chart crosshair и Chart tooltip (в Hover).

## 2. Intent
- Область графика: серии данных, сетка и состояния. В коде — библиотека графиков с теми же токенами (`data/1…8`, `border/subtle` для сетки, `text/tertiary` для подписей).
- Когда использовать: график внутри Chart card.
- Когда нет: таблица данных — Table; один показатель — Stat card.
- Правило выбора варианта:
  - Type: Bars — выплаты, начисления; Line — хешрейт; Area — хешрейт WL, мощность Monitoring; Line + Bars — хешрейт + реджекты на второй оси Y; Multi-line — несколько однородных рядов (температура плат); Dual area — две величины (хешрейт пула + курс монеты); Stacked bars — доли целого по статусам (пользователи WL Users).
  - State: Default — данные есть; Hover — выбрана точка (Chart crosshair + Chart tooltip); Skeleton — загрузка; Empty — данных за период нет; Disabled — график недоступен.
  - Составные типы (Line + Bars, Multi-line, Dual area, Stacked bars) имеют только Default и Hover; Skeleton / Empty / Disabled берутся у базового типа.
  - Ось X — по времени, не больше 6 меток; у столбцов нулевая база; цвета серий — `data/*`.
- Не делаем: ось X не по времени или больше 6 меток; столбцы без нулевой базы; серии только цветом, без штриха и маркера; свои цвета серий вместо `data/*`.

## 3. Anatomy
- Корень — зазор `space/4`; 473 × 140 числом.
- `grid` — `border/subtle` × `border/width/default`, пунктир.
- `bar` — `border/accent` (Line + Bars — `data/4`), `radius/2xs`; в Hover невыбранные столбцы с прозрачностью 0.35.
- `line` и `line 1` — штрих `border/accent` (серия 1 — бренд, 17.11), `line 2…4` — `data/2…4` × `chart/stroke`; `area` — `border/accent` / `data/4`, прозрачность 0.45; `segment 1…4` — `data/1…4`, `radius/2xs`.
- Skeleton — `skeleton/base`; Disabled — `action/disabled`; Empty — «Нет данных за период» (`type/body/md`, `text/tertiary`) на сетке.
- Hover — Chart crosshair (точка `border/accent`, кольцо `surface/current` × `border/width/focus`, ореол 0.24) + Chart tooltip.
- Вложено: `Chart crosshair` ×7, `Chart tooltip` ×7.
- Служебные слои (вариантов из 23): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): График: Hover — Chart crosshair + Chart tooltip; Skeleton — загрузка; Empty — нет данных; Disabled — `action/disabled`.
- Default — серии цветами `data/*`, сетка.
- Hover — перекрестие в выбранной точке и тултип со значениями серий; у Bars — подсветка столбца, Chart crosshair Target=Bar и тултип (исправлено 2026-11-15).
- Skeleton — заглушка `skeleton/base`: у Bars столбцы ровной «пилой» (не данные), у Line / Area — силуэт без сетки (исправлено 2026-11-15; токены разные — `skeleton/base` и `action/disabled`, в Light значения совпадают; визуально не разводим, различие — формой и сеткой, в коде — блик (решение Стефана 15.11)).
- Empty — сетка и «Нет данных за период» по центру.
- Disabled — серии `action/disabled`. Отличие от Skeleton — реальная форма данных и сетка.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Type | Bars · Line · Area · Line + Bars · Multi-line · Dual area · Stacked bars | Bars |
| State | Default · Hover · Skeleton · Empty · Disabled | Default |

Матрица: 23 из 35.

- Свойств нет; тексты — во вложенном Chart tooltip и в Empty.

## 6. Content / slots
- Подписи осей — вне плота (в Chart card); на плоте текст только в тултипе (Hover) и в Empty.
- Длинный текст и языки: у варианта по умолчанию (Bars · Default) текста нет — на стенде проверять нечего; правила тултипа — у Chart tooltip.
- RTL: ось времени не зеркалится. На стенде направление не переключается.
- Текст 200 %: «Нет данных за период» растёт без обрезки; тултип растёт по содержимому до `size/tooltip/max`, дата и серия — одна строка с многоточием (Chart tooltip, исправлено 15.11).

## 7. Events
- `pointermove` / тап по точке → Hover (перекрестие + тултип); уход указателя → Default.
- Стрелки — перемещение по точкам, Enter — зафиксировать точку.

## 8. Behavior
- Hover следует за указателем по точкам данных; тултип у края прижимается к границе графика.
- Skeleton → Default — по приходу данных; «Уменьшить движение» — без плавного движения перекрестия.

## 9. Accessibility
- `role=img` с `aria-label` — что показывает и за какой период; рядом доступна таблица данных.
- Фокус на графике; Стрелки — по точкам, Enter — фиксирует точку; значение точки озвучивается через Chart tooltip.
- Контраст серий с фоном не ниже 3:1; различимость не только цветом — штрих и маркер.
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`).

## 10. Tokens
- `корень`: интервал `space/4`.
- `bar`: заливка / цвет `action/disabled`, `border/accent`, `data/4`, `skeleton/base`; радиус `radius/2xs`.
- `grid`: обводка `border/subtle`; толщина обводки `border/width/default`.
- `line`: обводка `action/disabled`, `border/accent`, `skeleton/base`; толщина обводки `chart/stroke`.
- `area`: заливка / цвет `action/disabled`, `border/accent`, `data/4`, `skeleton/base`.
- `line 1`: обводка `border/accent`; толщина обводки `chart/stroke`.
- `line 2`: обводка `data/2`, `data/4`; толщина обводки `chart/stroke`.
- `line 3`: обводка `data/3`; толщина обводки `chart/stroke`.
- `line 4`: обводка `data/4`; толщина обводки `chart/stroke`.
- `segment 1`: заливка / цвет `border/accent`; радиус `radius/2xs`.
- `segment 2`: заливка / цвет `data/2`; радиус `radius/2xs`.
- `segment 3`: заливка / цвет `data/3`; радиус `radius/2xs`.
- `segment 4`: заливка / цвет `data/4`; радиус `radius/2xs`.
- `Chart tooltip`: эффект `shadow/ambient`, `shadow/key`; заливка / цвет `surface/raised`; интервал `space/6`; maxw `size/tooltip/max`; мин. ширина `size/chart-tooltip/min`; отступы `space/10`, `space/sm`; радиус `radius/sm`; обводка `border/default`; толщина обводки `border/width/default`.
- `halo`: заливка / цвет `border/accent`.
- `point`: заливка / цвет `border/accent`; обводка `surface/current`; толщина обводки `border/width/focus`.
- `Нет данных за период`: заливка / цвет `text/tertiary`; типографика `font-weight/regular`, `font/family/text`, `type/body/md`.
- Значений без переменной: 80 (напр. `(root):w=473`, `(root):h=140`, `area:o=0.45`, `bar:o=0.35`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — с указателем (Web); на касании — тап по точке, точка остаётся до тапа вне графика.

## 12. Figma projection
- Набор `Chart plot`, вариантов 23 из 35; оси: Type, State.
- Борда: «Chart plot — борда · шаблон v3», разделов 12.
- Описание: 1681 знаков, разделы: Status: Level: Область графика (в коде — Type — State: Legacy: Когда использовать: Правила: A11y: Матрица:

## 13. Code projection
Код в репо: React `packages/react/src/index.js` (`ChartPlot`), Vue `packages/vue/src/DsChartPlot.vue`, CSS `claude-ds/components/ChartPlot/style.css`; проверка — `npm run test:code`. Прод (DSP / ui-emcd-web, Flutter) — сверка через `scripts/parity.mjs`, когда появится манифест кода.

- Vue: `<DsChartPlot>`; Flutter: `DsChartPlot`.
- Props: `type`: bars | line | area | line-bars | multi-line | dual-area | stacked-bars.
- Состояния (Default, Hover, Skeleton, Empty, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled`, `skeleton` — props.

## 14. Acceptance (2026-11-19)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — размер корня 473 × 140 и прозрачности `area` 0.45 / `bar` 0.35 / `halo` 0.24 — числом.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-15 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web): полностью — EMCD Web L0–L3 в Light и Dark, длинный текст, 6 языков, 200 %; Geometria / WL — выборочно, iOS / Android — попиксельной сверкой с Web; у варианта по умолчанию текста нет; булевых свойств нет; RTL на стенде не зеркалится; кода нет — parity props пропущена.

## 15. Migration
- DS Web .graphics (state loading / default / hover / disabled / empty) и .charts (widget Graph, «Песочница графиков») → Chart plot (Type × State; loading → Skeleton).

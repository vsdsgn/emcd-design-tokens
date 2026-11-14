# Chart plot — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Chart plot`. Status: draft. Level: unknown.
- Figma: Components, страница «Chart» (`367:45869`), набор `97:921`.

## 2. Intent
- Не описано.
- Когда использовать: не описано
- Когда нет: не описано
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `bar`, `Нет данных за период`, `grid`, `line`, `halo`, `point`, `Chart tooltip`, `area`, `line 1`, `line 2`, `line 3`, `line 4`, `segment 1`, `segment 2`, `segment 3`, `segment 4`.
- Вложено: `Chart crosshair` ×6, `Chart tooltip` ×6.
- Служебные слои (вариантов из 23): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Ось State: Default · Hover · Loading · Empty · Disabled. Группа модели состояний (`docs/components.md`) — определить при переводе в beta.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Type | Bars · Line · Area · Line + Bars · Multi-line · Dual area · Stacked bars | — |
| State | Default · Hover · Loading · Empty · Disabled | — |

Матрица: 23 из 35.

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- Не описано: заполнить при переводе в beta.

## 10. Tokens
- `корень`: интервал `space/4`.
- `bar`: заливка / цвет `action/disabled`, `data/1`, `data/4`, `skeleton/base`; радиус `radius/2xs`.
- `Нет данных за период`: заливка / цвет `text/tertiary`; типографика `font-weight/regular`, `font/family/text`, `type/body/md`.
- `grid`: обводка `border/subtle`; толщина обводки `border/width/default`.
- `line`: обводка `action/disabled`, `data/1`, `skeleton/base`; толщина обводки `chart/stroke`.
- `halo`: заливка / цвет `data/1`.
- `point`: заливка / цвет `data/1`; обводка `surface/level-1`; толщина обводки `border/width/focus`.
- `Chart tooltip`: эффект `shadow/ambient`, `shadow/key`; заливка / цвет `surface/raised`; интервал `space/6`; maxw `size/tooltip/max`; мин. ширина `size/chart-tooltip/min`; отступы `space/10`, `space/sm`; радиус `radius/sm`; обводка `border/subtle`; толщина обводки `border/width/default`.
- `area`: заливка / цвет `action/disabled`, `data/1`, `data/4`, `skeleton/base`.
- `line 1`: обводка `data/1`; толщина обводки `chart/stroke`.
- `line 2`: обводка `data/2`, `data/4`; толщина обводки `chart/stroke`.
- `line 3`: обводка `data/3`; толщина обводки `chart/stroke`.
- `line 4`: обводка `data/4`; толщина обводки `chart/stroke`.
- `segment 1`: заливка / цвет `data/1`; радиус `radius/2xs`.
- `segment 2`: заливка / цвет `data/2`; радиус `radius/2xs`.
- `segment 3`: заливка / цвет `data/3`; радиус `radius/2xs`.
- `segment 4`: заливка / цвет `data/4`; радиус `radius/2xs`.
- Значений без переменной: 80 (напр. `(root):w=473`, `(root):h=140`, `bar:o=0.35`, `halo:o=0.24`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Chart plot`, вариантов 23 из 35; оси: Type, State.
- Борда: «Chart plot — борда · шаблон v3», разделов 9.
- Описание: 1629 знаков, разделы: Status: Level: Область графика (в коде — Type — State: Legacy: Когда использовать: Правила: A11y: Матрица:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsChartPlot>`; Flutter: `DsChartPlot`.
- Props: `type`: bars | line | area | line-bars | multi-line | dual-area | stacked-bars.
- Состояния (Default, Hover, Loading, Empty, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled`, `loading` — props.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечаний по манифесту нет.

## 15. Migration
- Legacy: DS Web `.graphics` state loading / default / hover / disabled / empty → State; типы — по песочнице DS Web и Firmware: хешрейт → Line, хешрейт WL / мощность Monitoring → Area, хешрейт + реджекты → Line + Bars, температура плат → Multi-line, пул + курс → Dual area, WL payouts → Stacked bars. Компонентов графиков в продуктах не было; нужен скрин прода.

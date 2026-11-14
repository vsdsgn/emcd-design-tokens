# Chart card — контракт · draft (2026-11-14)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Chart card`. Status: draft. Level: unknown.
- Figma: Components, страница «Chart card» (`367:45869`), набор `99:981`.

## 2. Intent
- Не описано.
- Когда использовать: не описано
- Когда нет: не описано
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `Top`, `stat`, `label`, `value`, `caption`, `Tabs`, `Content`, `Chart plot`, `Chart axis label`, `Bottom`, `legend`, `Legend item`, `sum`, `stacked bar`, `segment`, `track`, `fill`, `center`, `Badge`, `metrics`, `Chart metric`, `Segmented`, `plot row`, `x axis`.
- Вложено: `Tabs` ×1, `Chart plot` ×2, `Chart axis label` ×24, `Legend item` ×8, `Badge` ×1, `Chart metric` ×3, `Segmented` ×1.
- Служебные слои (вариантов из 4): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Type | Bars · Horizontal · Gauge · Line | — |

Матрица полная: 4 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Show bottom | булево | вкл | 2 из 4 |
| Top | SLOT | `undefined` | 4 из 4 |
| Content | SLOT | `undefined` | 4 из 4 |
| Bottom | SLOT | `undefined` | 2 из 4 |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- Не описано: заполнить при переводе в beta.

## 10. Tokens
- `корень`: заливка / цвет `surface/level-1`; интервал `space/16`, `space/20`; отступы `space/28`; радиус `radius/container`; обводка `border/subtle`; толщина обводки `border/width/default`.
- `Top`: интервал `space/16`, `space/32`.
- `stat`: интервал `space/4`.
- `label`: заливка / цвет `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`, `type/label/md`.
- `value`: заливка / цвет `text/primary`; типографика `font-weight/bold`, `font/family/display`, `type/display/md`.
- `caption`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/md`.
- `Tabs`: интервал `space/20`; обводка `border/subtle`.
- `Content`: интервал `space/8`.
- `Chart plot`: интервал `space/4`.
- `Chart axis label`: maxw `size/chart-axis-label/max`.
- `Bottom`: интервал `space/16`.
- `legend`: интервал `space/16`.
- `Legend item`: интервал `space/6`; maxw `size/legend-item/max`.
- `sum`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/md`.
- `stacked bar`: интервал `space/4`.
- `segment`: заливка / цвет `data/1`, `data/2`, `data/3`; радиус `radius/chip`.
- `track`: заливка / цвет `control/track`.
- `fill`: заливка / цвет `status/success/solid`.
- `center`: интервал `space/8`.
- `Badge`: заливка / цвет `status/success/subtle`; интервал `space/6`; высота `size/badge-height/md`; maxw `size/badge/max`; отступы `control/padding-x/sm`; радиус `radius/sm`.
- `metrics`: интервал `space/32`.
- `Chart metric`: интервал `space/2xs`; maxw `size/chart-metric/max`.
- `Segmented`: заливка / цвет `control/segment-track`; интервал `space/2`; отступы `space/4`; радиус `radius/control-sm`.
- `plot row`: интервал `space/8`.
- `x axis`: отступы `space/40`.
- Значений без переменной: 6 (напр. `(root):w=580`, `(root):w=343`, `track:w=220`, `track:h=220`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Chart card`, вариантов 4 из 4; оси: Type.
- Борда: «Chart card — борда · шаблон v3», разделов 9.
- Описание: 1577 знаков, разделы: Status: Level: Виджет графика: Type: Состояния графика — Когда использовать: A11y: Поиск: Legacy: Правила:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsChartCard>`; Flutter: `DsChartCard`.
- Props: `type`: bars | horizontal | gauge | line; `showBottom`: boolean = true; `top`: string или слот; `content`: string или слот; `bottom`: string или слот.

## 14. Acceptance (2026-11-14)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечаний по манифесту нет.

## 15. Migration
- Legacy: DS Web `bar widget` type vertical / horizont / circle → Type Bars / Horizontal / Gauge; `.layout / graphic` · `.layout / bar` (top / center / bottom) → слоты Top / Content / Bottom; `widget Graph` (песочница) → Type Line; Firmware «Chain's Hashrate / Power / Fans» → Type=Line + Segmented в Top. Нужен скрин прода (дашборд Web App, Firmware).

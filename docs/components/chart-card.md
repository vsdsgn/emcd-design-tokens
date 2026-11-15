# Chart card — контракт · draft (2026-11-15)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Chart card`. Status: draft. Level: unknown.
- Figma: Components, страница «Chart card» (`367:45869`), компонент `99:802`.

## 2. Intent
- Не описано.
- Когда использовать: не описано
- Когда нет: не описано
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `Top`, `stat`, `label`, `value`, `caption`, `Tabs`, `Content`, `Chart plot`, `axis label`, `Bottom`, `legend`, `Legend item`, `sum`.
- Вложено: `Tabs` ×1, `Chart plot` ×1, `Legend item` ×3.
- Служебные слои (вариантов из 1): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Осей нет: один компонент.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Show bottom | булево | вкл | 1 из 1 |
| Top | слот | — | 1 из 1 |
| Content | слот | — | 1 из 1 |
| Bottom | слот | — | 1 из 1 |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- Не описано: заполнить при переводе в beta.

## 10. Tokens
- `корень`: заливка / цвет `surface/level-1`; интервал `space/16`; отступы `space/28`; радиус `radius/container`; обводка `border/subtle`; толщина обводки `border/width/default`.
- `Top`: интервал `space/16`.
- `stat`: интервал `space/4`.
- `label`: заливка / цвет `text/primary`, `text/tertiary`; типографика `font-weight/medium`, `font-weight/regular`, `font/family/text`, `type/body/sm`, `type/label/md`.
- `value`: заливка / цвет `text/primary`; типографика `font-weight/bold`, `font/family/display`, `type/display/md`.
- `caption`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/md`.
- `Tabs`: интервал `space/20`; обводка `border/subtle`.
- `Content`: интервал `space/8`.
- `Chart plot`: интервал `space/4`.
- `axis label`: maxw `size/chart-axis-label/max`.
- `Bottom`: интервал `space/16`.
- `legend`: интервал `space/16`.
- `Legend item`: интервал `space/6`; maxw `size/legend-item/max`.
- `sum`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/md`.
- Значений без переменной: 1 (напр. `(root):w=580`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Компонент `Chart card`; оси: нет.
- Борда: «Chart card — борда · шаблон v3», разделов 6.
- Описание: 1133 знаков, разделы: Status: Level: Виджет графика: Состояния графика — Когда использовать: A11y: Поиск: Legacy: Правила:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsChartCard>`; Flutter: `DsChartCard`.
- Props: `showBottom`: boolean = true; `top`: string или слот; `content`: string или слот; `bottom`: string или слот.

## 14. Acceptance (2026-11-15)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечаний по манифесту нет.

## 15. Migration
- Legacy: DS Web `bar widget` type vertical / horizont / circle → форма графика — вложенный Chart plot в слоте Content (оси Type у Chart card нет с 2026-11-15); `.layout / graphic` · `.layout / bar` (top / center / bottom) → слоты Top / Content / Bottom; `widget Graph` (песочница) → Chart plot Line; Firmware «Chain's Hashrate / Power / Fans» → Chart plot Line + Segmented в Top. Нужен скрин прода (дашборд Web App, Firmware).

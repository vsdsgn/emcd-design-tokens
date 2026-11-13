# Legend item — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Legend item`. Status: draft. Level: molecule.
- Figma: Components, страница «Legend item» (`1012:20`), набор `84:613`.

## 2. Intent
- Элемент легенды графика: маркер серии (Legend swatch, вложен — выберите Marker и Series) + подпись (+ значение).
- Когда использовать: легенда графика; кликабельная — скрыть/показать серию. Серия никогда не только цветом: подпись обязательна.
- Когда нет: не описано
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `label`, `value`, `skeleton`.
- Вложено: `Legend swatch` ×3.
- Служебные слои (вариантов из 4): кольцо фокуса 4 · зона Web 4 · зона касания 4 · безопасное поле 4.

## 4. States
- Ось State: Default · Hover · Selected · Skeleton. Группа модели состояний (`docs/components.md`) — определить при переводе в beta.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| State | Default · Hover · Selected · Skeleton | — |

Матрица полная: 4 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Label | текст | «Хешрейт» | 3 из 4 |
| Value | текст | «124.5 TH/s» | 3 из 4 |
| Show value | булево | выкл | 3 из 4 |
| Focus ring | булево | выкл | 4 из 4 · служебное |
| Show hit area | булево | выкл | 4 из 4 · служебное |
| Safe margin | булево | выкл | 4 из 4 · служебное |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- список; цвет не единственный носитель — подпись обязательна.

## 10. Tokens
- `корень`: интервал `space/6`.
- `label`: заливка / цвет `text/primary`, `text/secondary`; типографика `font-weight/medium`, `font-weight/regular`, `font/family/text`, `type/body/sm`, `type/label/sm`.
- `value`: заливка / цвет `text/primary`; типографика `font-weight/regular`, `font/family/mono`, `type/body/sm`.
- `skeleton`: заливка / цвет `skeleton/base`; радиус `radius/chip`.
- Служебные слои (общие правила — `service-layers.md`): `focus ring`: радиус `radius/2xs`; обводка `border/focus-ring`; толщина обводки `border/width/focus-ring` · `hit area · web`: видимость `touch/is-fine` · `hit area · overlay`: заливка / цвет `status/danger/solid` · `hit area · app`: видимость `touch/is-coarse` · `safe area · outer`: обводка `status/success/solid`; толщина обводки `control/safe-margin`.
- Min / max корня: maxWidth 160 числом.
- Значений без переменной: 8 (напр. `hit area · web:w=68`, `hit area · web:h=24`, `hit area · web:w=69`, `hit area · web:w=64`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Legend item`, вариантов 4 из 4; оси: State.
- Борда: «Legend item — борда · шаблон v3», разделов 11.
- Описание: 969 знаков, разделы: Status: Level: Элемент легенды графика: State как у legacy . Правила: A11y: Когда использовать: Поиск: Legacy:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsLegendItem>`; Flutter: `DsLegendItem`.
- Props: `label`: string или слот; `value`: string или слот; `showValue`: boolean = false.
- Состояния (Default, Hover, Selected, Skeleton) — не props: Hover / Pressed / Focus из платформы; `disabled`, `skeleton` — props.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - PROPS: Label 3 из 4; Value 3 из 4; Show value 3 из 4
  - MINMAX: maxw=160
  - RAW: 8 (напр. `hit area · web:w=68`, `hit area · web:h=24`)
  - BOARD: нет разделов 07, 08

## 15. Migration
- Legacy: .legends (state=default/hover/active/skeleton) (DS Web widget Graph)

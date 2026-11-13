# Radio card — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Radio card`. Status: draft. Level: molecule.
- Figma: Components, страница «Radio card» (`1597:2`), набор `1597:106`.

## 2. Intent
- Выбираемая карточка: радио, подпись и необязательные детали, которые раскрываются у выбранной. Нажимается вся карточка.
- Когда использовать: выбор одного из нескольких вариантов с пояснением (расписание выгрузки, тариф, способ вывода).
- Когда нет: короткий выбор без пояснений — Radio group; 2–4 варианта-переключателя — Segmented.
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `header`, `radio`, `label`, `details`.
- Вложено: `Radio` ×8.
- Служебные слои (вариантов из 8): кольцо фокуса 8 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Ось State: Default · Hover · Disabled · Pressed. Группа модели состояний (`docs/components.md`) — определить при переводе в beta.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Status | Off · On | — |
| State | Default · Hover · Disabled · Pressed | — |

Матрица полная: 8 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Label | текст | «Раз в три месяца» | 8 из 8 |
| Details | текст | «День недели: 1-го числа квартала
Время отправки: 12:00
Период выгрузки: предыдущий квартал» | 8 из 8 |
| Show details | булево | вкл | 8 из 8 |
| Focus ring | булево | выкл | 8 из 8 · служебное |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- role="radiogroup" на группе карточек, у карточки role="radio" и aria-checked; Стрелки меняют выбор, Tab входит в группу один раз; детали связаны через aria-describedby.

## 10. Tokens
- `корень`: заливка / цвет `surface/level-2`; интервал `space/8`; отступы `space/16`; радиус `radius/surface`; обводка `border/accent`, `border/subtle`; толщина обводки `border/width/default`.
- `header`: интервал `space/12`.
- `radio`: maxw `size/field/max`.
- `label`: заливка / цвет `text/disabled`, `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`.
- `details`: заливка / цвет `text/disabled`, `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- Служебные слои (общие правила — `service-layers.md`): `focus ring`: радиус `radius/focus-ring-surface`; обводка `border/focus-ring`; толщина обводки `border/width/focus-ring` · `state layer`: заливка / цвет `state/layer`; прозрачность `state/hover`, `state/pressed`; радиус `radius/surface`.
- Значений без переменной: 8 (напр. `(root):w=400`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Radio card`, вариантов 8 из 8; оси: Status, State.
- Борда: «Radio card — борда · шаблон v3», разделов 10.
- Описание: 950 знаков, разделы: Status: Level: Выбираемая карточка: Когда использовать: Правила: A11y: Legacy: Токены:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsRadioCard>`; Flutter: `DsRadioCard`.
- Props: `status`: boolean; `label`: string или слот; `details`: string или слот; `showDetails`: boolean = true.
- Состояния (Default, Hover, Disabled, Pressed) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - AXES: `Status` — булева ось (Off | On)
  - RAW: 8 (напр. `(root):w=400`)
  - SERVICE: нет зоны нажатия, безопасного поля
  - BOARD: нет разделов 05, 07, 08

## 15. Migration
- Legacy: продукт «Выгрузка»: радио-карточки расписания.

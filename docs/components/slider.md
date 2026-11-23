# Slider — контракт · draft (2026-11-23)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Slider`. Status: draft. Level: unknown.
- Figma: Components, страница «Slider» (`367:192`), набор `107:1423`.

## 2. Intent
- Слайдер: Type=Single — значение из шкалы шагов (3 / 5 / 10: плечо, срок, доля реинвеста); Type=Range — диапазон «от–до» на непрерывной шкале, два ползунка, заливка между ними (фильтры: комиссия, хешрейт; вернули 23.11 по B2B Coins).
- Когда использовать: выбор значения или диапазона, когда важна наглядность шкалы и точность ±шаг; диапазон в фильтрах Side panel / Sheet — вместе с полями «от / до» или вместо них.
- Когда нет: точное число (сумма, адрес) — Input / Input amount; 2–4 варианта — Segmented.
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `label row`, `label`, `label text`, `value`, `bg`, `fill`, `step`, `thumb`, `step label`, `description`, `thumb · start`, `thumb · end`.
- Вложено: иконки ×28.
- Служебные слои (вариантов из 28): кольцо фокуса 28 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Ось State: Default · Disabled · Hover · Pressed. Группа модели состояний (`docs/components.md`) — определить при переводе в beta.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Type | Single · Range | — |
| Steps | 3 · 5 · 10 · Continuous | — |
| Labels | On · Off | — |
| State | Default · Disabled · Hover · Pressed | — |

Матрица: 28 из 64.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Label | текст | «Плечо» | 6 из 28 |
| Value | текст | «x3» | 6 из 28 |
| Description | текст | «Чем выше плечо, тем выше риск ликвидации» | 6 из 28 |
| Show label | булево | вкл | 6 из 28 |
| Show description | булево | вкл | 6 из 28 |
| Info icon | булево | вкл | 6 из 28 |
| Focus ring | булево | выкл | 6 из 28 · служебное |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- role=slider, aria-valuemin / max / now / valuetext; у Range два ползунка с именами «от» / «до»; ←/→ — шаг, Home / End — края.

## 10. Tokens
- `корень`: интервал `space/16`.
- `label row`: интервал `space/8`.
- `label`: интервал `space/4`.
- `label text`: заливка / цвет `text/disabled`, `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- `value`: заливка / цвет `text/disabled`, `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- `bg`: заливка / цвет `control/track`, `control/track-disabled`; радиус `radius/chip`.
- `fill`: заливка / цвет `control/checked`, `control/knob-disabled`; радиус `radius/chip`.
- `step`: заливка / цвет `control/knob-disabled`, `icon/on-accent`, `icon/tertiary`.
- `thumb`: заливка / цвет `control/knob`, `control/knob-disabled`; обводка `control/checked`.
- `step label`: заливка / цвет `text/disabled`, `text/tertiary`; типографика `font-weight/regular`, `font/family/text`, `type/body/sm`.
- `description`: заливка / цвет `text/disabled`, `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/sm`.
- `thumb · start`: заливка / цвет `control/knob`, `control/knob-disabled`; обводка `control/checked`.
- `thumb · end`: заливка / цвет `control/knob`, `control/knob-disabled`; обводка `control/checked`.
- Служебные слои (общие правила — `service-layers.md`): `focus ring`: радиус `radius/chip`; обводка `border/focus-ring`; толщина обводки `border/width/focus-ring` · `hit area · fine`: видимость `touch/is-fine` · `hit area · coarse`: видимость `touch/is-coarse` · `state layer`: заливка / цвет `state/layer`; прозрачность `state/hover`, `state/pressed`.
- Значений без переменной: 170 (напр. `(root):w=343`, `track:h=18`, `thumb:sw=3`, `thumb:w=18`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Slider`, вариантов 28 из 64; оси: Type, Steps, Labels, State.
- Борда: «Slider — борда · шаблон v3», разделов 9.
- Описание: 1162 знаков, разделы: Status: Level: Слайдер: Движение: A11y: Когда использовать: Хаптик: Поиск: Legacy:

## 13. Code projection
Код в репо: React `packages/react/src/index.js` (`Slider`), Vue `packages/vue/src/DsSlider.vue`, CSS `claude-ds/components/Slider/style.css`; проверка — `npm run test:code`. Прод (DSP / ui-emcd-web, Flutter) — сверка через `scripts/parity.mjs`, когда появится манифест кода.

- Vue: `<DsSlider>`; Flutter: `DsSlider`.
- Props: `type`: single | range; `steps`: 3 | 5 | 10 | continuous; `labels`: boolean; `label`: string или слот; `value`: string или слот; `description`: string или слот; `showLabel`: boolean = true; `showDescription`: boolean = true; `infoIcon`: boolean = true.
- Состояния (Default, Disabled, Hover, Pressed) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-23)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - DESC: нет: Правила:
  - MATRIX: 28 из 64
  - AXES: `Labels` — булева ось (On | Off)
  - RAW: `track:h=18`, `thumb:sw=3`, `thumb:w=18`, `thumb:h=18` и ещё 2
  - SERVICE: нет безопасного поля

## 15. Migration
- Legacy: base slider (var, with num, label, description, value in label, info icon) (DS Web)

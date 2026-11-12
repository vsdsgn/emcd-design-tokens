# Multiselect option — контракт · draft (2026-11-12)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Multiselect option`. Status: draft. Level: atom.
- Figma: Components, страница «Multiselect» (`355:3674`), набор `170:1565`.

## 2. Intent
- Строка списка выбора (Select, Multiselect, Menu): слева необязательный слот под монету, аватар или иконку, затем подпись с необязательным описанием, справа галочка выбранного.
- Когда использовать: пункты списка с множественным выбором (сети, монеты, воркеры).
- Когда нет: независимые переключатели в форме — Checkbox.
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `label`, `description`, `check`.
- Вложено: `smbl-bitcoin-btc` ×5, иконки ×5.
- Служебные слои (вариантов из 5): кольцо фокуса 5 · зона Web 5 · зона касания 5 · безопасное поле 5.

## 4. States
- Ось State: Default · Hover · Selected · Disabled · Pressed. Группа модели состояний (`docs/components.md`) — определить при переводе в beta.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| State | Default · Hover · Selected · Disabled · Pressed | — |

Матрица полная: 5 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Label | текст | «Bitcoin (BTC)» | 5 из 5 |
| Show hit area | булево | выкл | 5 из 5 · служебное |
| Safe margin | булево | выкл | 5 из 5 · служебное |
| Description | текст | «Описание» | 5 из 5 |
| Show description | булево | выкл | 5 из 5 |
| Leading | булево | выкл | 5 из 5 |
| Leading · swap | замена экземпляра | `smbl-bitcoin-btc` | 5 из 5 |
| Focus ring | булево | выкл | 5 из 5 · служебное |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- role="option", aria-selected; Пробел выбирает; выбранное озвучивается. |

## 10. Tokens
- `корень`: интервал `space/12`; отступы `space/12`, `space/8`; радиус `radius/inner`.
- `label`: заливка / цвет `text/disabled`, `text/primary`; типографика `font-weight/regular`, `font/family/text`, `type/body/md`.
- `description`: заливка / цвет `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/sm`.
- `check`: высота `icon/size/md`; ширина `icon/size/md`.
- Служебные слои (общие правила — `service-layers.md`): `hit area · web`: видимость `touch/is-fine` · `hit area · overlay`: заливка / цвет `status/danger/solid` · `hit area · app`: видимость `touch/is-coarse` · `safe area · outer`: обводка `status/success/solid`; толщина обводки `control/safe-margin` · `focus ring`: радиус `radius/focus-ring-inner`; обводка `border/focus-ring`; толщина обводки `border/width/focus-ring` · `state layer`: заливка / цвет `state/layer`; прозрачность `state/hover`, `state/pressed`; радиус `radius/inner`.
- Min / max корня: minHeight 40 числом.
- Значений без переменной: 20 (напр. `(root):w=280`, `content:gap=2`, `hit area · web:w=280`, `hit area · web:h=40`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Multiselect option`, вариантов 5 из 5; оси: State.
- Борда: «Multiselect option — борда · шаблон v3», разделов 12.
- Описание: 762 знаков, разделы: Status: Level: Когда использовать: Правила: A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsMultiselectOption>`; Flutter: `DsMultiselectOption`.
- Props: `label`: string или слот; `description`: string или слот; `showDescription`: boolean = false; `leading`: boolean = false.
- Состояния (Default, Hover, Selected, Disabled, Pressed) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-12)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - MINMAX: minh=40
  - RAW: 20 (напр. `(root):w=280`, `content:gap=2`)
  - BOARD: нет разделов 07, 08

## 15. Migration
- Legacy: не указано в описании набора — искать в `docs/migration/components.csv`, DS Web / App и продуктах

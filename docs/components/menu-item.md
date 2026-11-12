# Menu item — контракт · draft (2026-11-12)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Menu item`. Status: draft. Level: molecule.
- Figma: Components, страница «Menu item» (`1012:21`), набор `407:1987`.

## 2. Intent
- Пункт меню. Основа — legacy Dropdown item (44, отступы 10 / 12, слот слева, подпись 16 + описание 12, слот справа).
- Когда использовать: не описано
- Когда нет: не описано
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `checkbox`, `icon/plus`, `label`, `description`, `hint`, `selected`.
- Вложено: `Checkbox` ×16, иконки ×32.
- Служебные слои (вариантов из 16): кольцо фокуса 16 · зона Web 16 · зона касания 16 · безопасное поле 16.

## 4. States
- Ось State: Default · Hover · Pressed · Disabled. Группа модели состояний (`docs/components.md`) — определить при переводе в beta.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | M · L | — |
| Tone | Default · Danger | — |
| State | Default · Hover · Pressed · Disabled | — |

Матрица полная: 16 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Label | текст | «Добавить воркер» | 16 из 16 |
| Description | текст | «Описание» | 16 из 16 |
| Show description | булево | выкл | 16 из 16 |
| Selected | булево | выкл | 16 из 16 |
| Show leading | булево | вкл | 16 из 16 |
| Show trailing | булево | выкл | 16 из 16 |
| Focus ring | булево | выкл | 16 из 16 · служебное |
| Checkbox | булево | выкл | 16 из 16 |
| Leading | SLOT | `undefined` | 16 из 16 |
| Trailing | SLOT | `undefined` | 16 из 16 |
| Show hit area | булево | выкл | 16 из 16 · служебное |
| Safe margin | булево | выкл | 16 из 16 · служебное |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- |

## 10. Tokens
- `корень`: интервал `space/12`; отступы `space/10`, `space/12`, `space/16`; радиус `radius/sm`.
- `checkbox`: интервал `space/8`.
- `icon/plus`: высота `icon/size/md`; ширина `icon/size/md`.
- `label`: заливка / цвет `text/danger`, `text/disabled`, `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`.
- `description`: заливка / цвет `text/disabled`, `text/tertiary`; типографика `font-weight/medium`, `font/family/text`, `type/label/sm`.
- `hint`: заливка / цвет `text/disabled`, `text/tertiary`; типографика `font-weight/regular`, `font/family/text`, `type/body/md`.
- `selected`: высота `icon/size/md`; ширина `icon/size/md`.
- Служебные слои (общие правила — `service-layers.md`): `state layer`: заливка / цвет `state/layer`; прозрачность `state/hover`, `state/pressed`; радиус `radius/sm` · `focus ring`: радиус `radius/focus-ring-inner`; обводка `border/focus-ring`; толщина обводки `border/width/focus-ring` · `hit area · web`: видимость `touch/is-fine` · `hit area · overlay`: заливка / цвет `status/danger/solid` · `hit area · app`: видимость `touch/is-coarse` · `safe area · outer`: обводка `status/success/solid`; толщина обводки `control/safe-margin`.
- Значений без переменной: 48 (напр. `(root):w=290`, `hit area · web:w=290`, `hit area · web:h=44`, `hit area · web:h=56`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Menu item`, вариантов 16 из 16; оси: Size, Tone, State.
- Борда: «Menu item — борда · шаблон v3», разделов 10.
- Описание: 778 знаков, разделы: Status: Level: Пункт меню. • Leading — • Trailing — • M — • Checkbox — • Tone = Danger —

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsMenuItem>`; Flutter: `DsMenuItem`.
- Props: `size`: m | l; `tone`: default | danger; `label`: string или слот; `description`: string или слот; `showDescription`: boolean = false; `selected`: boolean = false; `showLeading`: boolean = true; `showTrailing`: boolean = false; `checkbox`: boolean = false; `leading`: string или слот; `trailing`: string или слот.
- Состояния (Default, Hover, Pressed, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-12)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - DESC: нет: Когда использовать:, Правила:, A11y:
  - RAW: 48 (напр. `(root):w=290`, `hit area · web:w=290`)
  - BOARD: нет разделов 05, 07, 08

## 15. Migration
- Legacy: не указано в описании набора — искать в `docs/migration/components.csv`, DS Web / App и продуктах

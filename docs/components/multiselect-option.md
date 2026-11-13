# Multiselect option — контракт · draft (2026-11-13)

Заготовка: собрана автоматически. Набор заменён на месте надстройкой над базой `_List row` (2026-11-13); свойства, слоты, токены и приёмка базы — `docs/components/list-row.md`. Status остаётся draft до ручного чеклиста и «ок» Стефана.
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
- Слои с токенами: `_List row`.
- Вложено: `_List row` ×4.
- Служебные слои (вариантов из 4): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Ось State: Default · Hover · Disabled · Pressed. Группа модели состояний (`docs/components.md`) — определить при переводе в beta.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| State | Default · Hover · Disabled · Pressed | — |

Матрица полная: 4 вариантов.

Свойства — на раскрытом экземпляре базы `_List row` (слой `_List row`): Label, Description, Show description, Subvalue, Show leading, Show trailing, слоты Leading и Trailing, Selected, Show selection, Selection control, Divider, Focus ring, Show hit area, Safe margin. Таблица — `docs/components/list-row.md`, раздел 5.

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- role="option", aria-selected; Пробел выбирает; выбранное озвучивается. |

## 10. Tokens
- `_List row`: интервал `space/12`; minh `size/row/min`; отступы `space/12`, `space/8`; радиус `radius/inner`.
- Значений без переменной: 4 (напр. `(root):w=280`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Multiselect option`, вариантов 4 из 4; оси: State.
- Борда: «Multiselect option — борда · шаблон v3», разделов 12.
- Описание: 1086 знаков, разделы: Status: Level: Когда использовать: Правила: A11y: Кольцо фокуса:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsMultiselectOption>`; Flutter: `DsMultiselectOption`.
- Props: нет.
- Состояния (Default, Hover, Disabled, Pressed) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` прогнаны после замены (2026-11-13): по набору 0; замечания базы — `docs/components/list-row.md`, раздел 14. Стенд — на пилоте базы.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - RAW: 4 (напр. `(root):w=280`)
  - BOARD: нет разделов 07, 08

## 15. Migration
- Legacy: не указано в описании набора — искать в `docs/migration/components.csv`, DS Web / App и продуктах

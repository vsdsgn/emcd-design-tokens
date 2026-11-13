# Multiselect — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Multiselect`. Status: draft. Level: molecule.
- Figma: Components, страница «Multiselect (контейнер)» (`1516:175`), набор `1516:1052`.

## 2. Intent
- Поле множественного выбора: Select + список Multiselect option в Menu; выбранное показывается строкой «Выбрано: N» (Count) или чипами под полем (Chips).
- Когда использовать: фильтры, выбор нескольких сетей, монет или воркеров.
- Когда нет: 2–4 варианта — Checkbox group; один вариант — Select.
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `Menu`, `Chip`.
- Вложено: `Select` ×8, `Menu` ×2, `Chip` ×12.
- Служебные слои (вариантов из 8): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Ось State: Default · Open · Error · Disabled. Группа модели состояний (`docs/components.md`) — определить при переводе в beta.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Display | Count · Chips | — |
| State | Default · Open · Error · Disabled | — |

Матрица полная: 8 вариантов.

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- role="combobox", список role="listbox" с aria-multiselectable; выбранное озвучивается как «Выбрано: 3»; Пробел отмечает пункт, Esc закрывает меню. |

## 10. Tokens
- `Menu`: эффект `material/thick/blur`, `shadow/ambient`, `shadow/key`; заливка / цвет `material/thick/fill`; интервал `space/4`; отступы `space/8`; радиус `radius/control`; обводка `border/subtle`; толщина обводки `border/width/default`.
- `Chip`: заливка / цвет `action/disabled`, `action/inverse/default`; интервал `space/6`; высота `control/height/sm`; отступы `control/padding-x/sm`; радиус `radius/control-sm`.
- Значений без переменной: 17 (напр. `(root):w=320`, `(root):gap=8`, `selected:gap=8`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Multiselect`, вариантов 8 из 8; оси: Display, State.
- Борда: «Multiselect — борда · шаблон v3», разделов 10.
- Описание: 767 знаков, разделы: Status: Level: Когда использовать: Правила: A11y: Legacy: Токены:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsMultiselect>`; Flutter: `DsMultiselect`.
- Props: `display`: count | chips.
- Состояния (Default, Open, Error, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - RAW: 17 (напр. `(root):w=320`, `(root):gap=8`)
  - BOARD: нет разделов 05, 07, 08

## 15. Migration
- Legacy: не указано в описании набора — искать в `docs/migration/components.csv`, DS Web / App и продуктах

# Select — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Select`. Status: draft. Level: molecule.
- Figma: Components, страница «Select» (`353:6`), набор `51:1753`.

## 2. Intent
- Select: выбор одного значения из списка (сеть вывода, кошелёк, монета, валюта). Поле как у Input (те же размеры, лейбл, helper, ошибка), справа шеврон.
- Когда использовать: 5+ вариантов или длинные названия.
- Когда нет: 2–4 варианта — Segmented/Radio; ввод с подсказками — Input + Menu (combobox); множественный выбор — Multiselect.
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `field`.
- Вложено: `Input` ×24.
- Служебные слои (вариантов из 24): кольцо фокуса 24 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Ось State: Default · Hover · Open · Filled · Error · Disabled · Loading · Skeleton. Группа модели состояний (`docs/components.md`) — определить при переводе в beta.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | M · L · XL | — |
| State | Default · Hover · Open · Filled · Error · Disabled · Loading · Skeleton | — |

Матрица полная: 24 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Focus ring | булево | выкл | 24 из 24 · служебное |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- role=combobox, aria-expanded, aria-controls → listbox; Enter/Space/↓ — открыть, ↑/↓ — выбор, Enter — подтвердить, Esc — закрыть; ввод букв — прыжок к пункту.

## 10. Tokens
- `корень`: мин. ширина `size/field/min`.
- `field`: мин. ширина `size/field/min`.
- Служебные слои (общие правила — `service-layers.md`): `focus ring`: радиус `radius/focus-ring-inner`, `radius/focus-ring-sm`; обводка `border/focus-ring`; толщина обводки `border/width/focus-ring`.
- Min / max корня: minWidth 160 size/field/min.

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Select`, вариантов 24 из 24; оси: Size, State.
- Борда: «Select — борда · шаблон v3», разделов 11.
- Описание: 1241 знаков, разделы: Status: Level: Select: Когда использовать: Правила: Состояния: A11y: Поиск: Legacy: Слот слева:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsSelect>`; Flutter: `DsSelect`.
- Props: `size`: m | l | xl.
- Состояния (Default, Hover, Open, Filled, Error, Disabled, Loading, Skeleton) — не props: Hover / Pressed / Focus из платформы; `disabled`, `loading`, `skeleton` — props.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - SERVICE: нет зоны нажатия, безопасного поля
  - BOARD: нет разделов 05, 07, 08

## 15. Migration
- Legacy: Selector small, Dropdown (Type=Net/Wallet/Coins…) (DS Web)

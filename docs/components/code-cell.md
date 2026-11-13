# Code cell — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Code cell`. Status: draft. Level: atom.
- Figma: Components, страница «Code cell» (`1012:6`), набор `111:1272`.

## 2. Intent
- Ячейка кода (одна цифра). Size L 64×68 — Web, 4 цифры (legacy 69×70 из «Подтверждение операции»); M 48×56 — 6 цифр и Compact.
- Когда использовать: не описано
- Когда нет: не описано
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `digit`, `caret`.
- Служебные слои (вариантов из 12): кольцо фокуса 12 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Ось State: Empty · Focus · Filled · Error · Success · Disabled. Группа модели состояний (`docs/components.md`) — определить при переводе в beta.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | L · M | — |
| State | Empty · Focus · Filled · Error · Success · Disabled | — |

Матрица полная: 12 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Digit | текст | «4» | 12 из 12 |
| Focus ring | булево | выкл | 12 из 12 · служебное |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- |

## 10. Tokens
- `корень`: заливка / цвет `control/surface/default`, `control/surface/disabled`; радиус `radius/control`; обводка `control/border/default`, `control/border/disabled`, `control/border/error`, `control/border/focus`, `status/success/solid`; толщина обводки `border/width/default`, `border/width/focus`.
- `digit`: заливка / цвет `text/disabled`, `text/primary`, `text/tertiary`; типографика `font-weight/bold`, `font/family/display`, `type/display/md`, `type/heading/lg`.
- `caret`: заливка / цвет `border/focus`.
- Служебные слои (общие правила — `service-layers.md`): `focus ring`: радиус `radius/focus-ring`; обводка `border/focus-ring`; толщина обводки `border/width/focus-ring`.
- Значений без переменной: 28 (напр. `(root):w=64`, `(root):h=68`, `digit:o=0.5`, `(root):w=48`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Code cell`, вариантов 12 из 12; оси: Size, State.
- Борда: «Code cell — борда · шаблон v3», разделов 8.
- Описание: 349 знаков, разделы: Status: Level: Ячейка кода (одна цифра). Только внутри Code input.

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsCodeCell>`; Flutter: `DsCodeCell`.
- Props: `size`: l | m; `digit`: string или слот.
- Состояния (Empty, Focus, Filled, Error, Success, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - DESC: нет: Когда использовать:, Правила:, A11y:
  - RAW: 28 (напр. `(root):w=64`, `(root):h=68`)
  - SERVICE: нет зоны нажатия, безопасного поля
  - BOARD: нет разделов 04, 05, 07, 12

## 15. Migration
- Legacy: не указано в описании набора — искать в `docs/migration/components.csv`, DS Web / App и продуктах

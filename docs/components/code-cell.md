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
- Вложено: `_Hit area` ×24, `_Safe margin` ×12.
- Служебные слои (вариантов из 12): кольцо фокуса 12 · зона Web 12 · зона касания 12 · безопасное поле 12.

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
| Show hit area | булево | выкл | 12 из 12 · служебное |
| Safe margin | булево | выкл | 12 из 12 · служебное |

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
- Служебные слои (общие правила — `service-layers.md`): `focus ring`: радиус `radius/focus-ring`; обводка `border/focus-ring`; толщина обводки `border/width/focus-ring` · `hit area · web`: видимость `touch/is-fine` · `hit area · overlay`: заливка / цвет `status/danger/solid` · `hit area · app`: видимость `touch/is-coarse` · `safe area · outer`: обводка `status/success/solid`; толщина обводки `control/safe-margin`.
- Значений без переменной: 52 (напр. `(root):w=64`, `(root):h=68`, `digit:o=0.5`, `hit area · web:w=64`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Code cell`, вариантов 12 из 12; оси: Size, State.
- Борда: «Code cell — борда · шаблон v3», разделов 9.
- Описание: 770 знаков, разделы: Status: Level: Ячейка кода (одна цифра). Только внутри Code input. Когда использовать: Правила: A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsCodeCell>`; Flutter: `DsCodeCell`.
- Props: `size`: l | m; `digit`: string или слот.
- Состояния (Empty, Focus, Filled, Error, Success, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечаний по манифесту нет.

## 15. Migration
- Legacy: не указано в описании набора — искать в `docs/migration/components.csv`, DS Web / App и продуктах

# Step trail — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Step trail`. Status: draft. Level: atom.
- Figma: Components, страница «Step trail» (`1012:12`), набор `108:1429`.

## 2. Intent
- Линия между шагами: Solid / Dotted × Default / Active / Success.
- Когда использовать: не описано
- Когда нет: не описано
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `line`.
- Служебные слои (вариантов из 6): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Ось State: Default · Current · Success. Группа модели состояний (`docs/components.md`) — определить при переводе в beta.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Border | Solid · Dotted | — |
| State | Default · Current · Success | — |

Матрица полная: 6 вариантов.

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- Не описано: заполнить при переводе в beta.

## 10. Tokens
- `line`: обводка `border/default`, `control/checked`, `status/success/solid`; толщина обводки `border/width/default`.
- Значений без переменной: 12 (напр. `(root):w=80`, `(root):h=24`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Step trail`, вариантов 6 из 6; оси: Border, State.
- Борда: «Step trail — борда · шаблон v3», разделов 9.
- Описание: 496 знаков, разделы: Status: Level: Линия между шагами: Когда использовать: Правила: A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsStepTrail>`; Flutter: `DsStepTrail`.
- Props: `border`: solid | dotted.
- Состояния (Default, Current, Success) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечаний по манифесту нет.

## 15. Migration
- Legacy: Step Trail (Border type, State).

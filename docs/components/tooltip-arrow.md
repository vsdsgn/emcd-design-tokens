# _Tooltip arrow — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `_Tooltip arrow`. Status: draft. Level: atom.
- Figma: Components, страница «Tooltip» (`317:33689`), набор `317:33693`.

## 2. Intent
- Служебный: уголок тултипа из legacy — вектор (+ обводка у Neutral) и маска 1 px на стыке, чтобы контур шёл одной линией. Остриё вниз; поворот — трансформацией инстанса.
- Когда использовать: не описано
- Когда нет: не описано
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `arrow`, `mask`.
- Служебные слои (вариантов из 2): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Tone | Neutral · Accent | — |

Матрица полная: 2 вариантов.

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- |

## 10. Tokens
- `arrow`: заливка / цвет `action/primary/default`, `surface/raised`; обводка `border/default`; толщина обводки `border/width/default`.
- `mask`: заливка / цвет `action/primary/default`, `surface/raised`.
- Значений без переменной: 4 (напр. `(root):w=26`, `(root):h=9`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `_Tooltip arrow`, вариантов 2 из 2; оси: Tone.
- Борда: «Tooltip — борда · шаблон v3», разделов 11.
- Описание: 206 знаков, разделы: Status: Level: Служебный:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsTooltipArrow>`; Flutter: `DsTooltipArrow`.
- Props: `tone`: neutral | accent.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - DESC: нет: Когда использовать:, Правила:, A11y:
  - RAW: 4 (напр. `(root):w=26`, `(root):h=9`)
  - BOARD: нет разделов 12

## 15. Migration
- Legacy: не указано в описании набора — искать в `docs/migration/components.csv`, DS Web / App и продуктах

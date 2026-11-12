# Card — контракт · draft (2026-11-12)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Card`. Status: не указан. Level: atom.
- Figma: Components, страница «Card» (`664:73890`), набор `664:73999`.

## 2. Intent
- Card — контейнер-подложка: уровень (Level 1–3 = surface/level-*), радиус (Surface 24 · Container 16 · Inner 8), отступ (S 12 · M 16 · L 24), обводка border/subtle.
- Когда использовать: не описано
- Когда нет: не описано
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: —.
- Служебные слои (вариантов из 72): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Level | 1 · 2 · 3 · 0 | — |
| Radius | Container · Surface · Inner | — |
| Padding | S · M · L | — |
| Border | On · Off | — |

Матрица полная: 72 вариантов.

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- |

## 10. Tokens
- `корень`: заливка / цвет `surface/level-0`, `surface/level-1`, `surface/level-2`, `surface/level-3`; отступы `space/12`, `space/16`, `space/24`; радиус `radius/container`, `radius/inner`, `radius/surface`; обводка `border/subtle`.
- Значений без переменной: 324 (напр. `(root):sw=1`, `(root):w=320`, `content:s=#808080`, `content:r=4`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Card`, вариантов 72 из 72; оси: Level, Radius, Padding, Border.
- Борда: «Card — борда · шаблон v3», разделов 7.
- Описание: 434 знаков, разделы: Card — Атом-шаблон: Level — Status: Level:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsCard>`; Flutter: `DsCard`.
- Props: `level`: 1 | 2 | 3 | 0; `radius`: container | surface | inner; `padding`: s | m | l; `border`: boolean.

## 14. Acceptance (2026-11-12)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - DESC: нет: Status: первой строкой, Когда использовать:, Правила:, A11y:
  - AXES: `Border` — булева ось (On | Off)
  - RAW: 324 (напр. `(root):sw=1`, `(root):w=320`)
  - BOARD: нет разделов 04, 05, 07, 08, 12

## 15. Migration
- Legacy: не указано в описании набора — искать в `docs/migration/components.csv`, DS Web / App и продуктах

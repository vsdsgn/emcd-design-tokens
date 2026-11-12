# Page dot — контракт · draft (2026-11-12)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Page dot`. Status: draft. Level: atom.
- Figma: Components, страница «Page dot» (`1012:14`), набор `149:1695`.

## 2. Intent
- Точка индикатора страниц. Часть Page indicator.
- Когда использовать: не описано
- Когда нет: не описано
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: —.
- Служебные слои (вариантов из 2): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Selected | Off · On | — |

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
- `корень`: заливка / цвет `icon/primary`, `icon/tertiary`; радиус `radius/chip`.
- Значений без переменной: 4 (напр. `(root):w=6`, `(root):h=6`, `(root):w=16`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Page dot`, вариантов 2 из 2; оси: Selected.
- Борда: «Page dot — борда · шаблон v3», разделов 8.
- Описание: 103 знаков, разделы: Status: Level: Точка индикатора страниц.

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsPageDot>`; Flutter: `DsPageDot`.
- Props: `selected`: boolean.

## 14. Acceptance (2026-11-12)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - DESC: нет: Когда использовать:, Правила:, A11y:
  - AXES: `Selected` — булева ось (Off | On)
  - RAW: 4 (напр. `(root):w=6`, `(root):h=6`)
  - BOARD: нет разделов 04, 05, 07, 12

## 15. Migration
- Legacy: не указано в описании набора — искать в `docs/migration/components.csv`, DS Web / App и продуктах

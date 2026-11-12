# Page indicator — контракт · draft (2026-11-12)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Page indicator`. Status: draft. Level: molecule.
- Figma: Components, страница «Page indicator» (`367:894`), набор `149:1764`.

## 2. Intent
- Индикатор страниц карусели (промо, онбординг, сторис-баннеры). Источник: legacy DS Web «base carousel indicator».
- Когда использовать: 2–5 слайдов.
- Когда нет: больше 5 — счётчик «3 / 12»; шаги процесса — Stepper / Step progress.
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `Page dot`.
- Вложено: `Page dot` ×54.
- Служебные слои (вариантов из 14): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Count | 2 · 3 · 4 · 5 | — |
| Selected | 1 · 2 · 3 · 4 · 5 | — |

Матрица: 14 из 20.

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- «Слайд 3 из 5»; точки кликабельны только если есть видимые стрелки или свайп — иначе декоративны. |

## 10. Tokens
- `корень`: интервал `space/6`.
- `Page dot`: заливка / цвет `icon/primary`, `icon/tertiary`; радиус `radius/chip`.

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Page indicator`, вариантов 14 из 20; оси: Count, Selected.
- Борда: «Page indicator — борда · шаблон v3», разделов 9.
- Описание: 488 знаков, разделы: Status: Level: Когда использовать: Активная — A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsPageIndicator>`; Flutter: `DsPageIndicator`.
- Props: `count`: 2 | 3 | 4 | 5; `selected`: 1 | 2 | 3 | 4 | 5.

## 14. Acceptance (2026-11-12)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - DESC: нет: Правила:
  - MATRIX: 14 из 20
  - BOARD: нет разделов 05, 07, 08, 12

## 15. Migration
- Legacy: не указано в описании набора — искать в `docs/migration/components.csv`, DS Web / App и продуктах

# Step progress — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Step progress`. Status: draft. Level: molecule.
- Figma: Components, страница «Step progress» (`367:994`), набор `149:1939`.

## 2. Intent
- Прогресс шагов в тултип-туре, онбординге, сторис. Источник: legacy «slider counter» (Tooltip tour, DS Web и DS App).
- Когда использовать: линейная последовательность 3–7 шагов без названий.
- Когда нет: шаги с названиями — Stepper.
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `Step segment`.
- Вложено: `Step segment` ×135.
- Служебные слои (вариантов из 25): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Count | 3 · 4 · 5 · 6 · 7 | — |
| Step | 1 · 2 · 3 · 4 · 5 · 6 · 7 | — |

Матрица: 25 из 35.

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- «Шаг 2 из 5» текстом рядом или для читалки. |

## 10. Tokens
- `корень`: интервал `space/4`.
- `Step segment`: заливка / цвет `border/default`, `icon/accent`; радиус `radius/chip`.
- Значений без переменной: 50 (напр. `(root):w=240`, `(root):h=4`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Step progress`, вариантов 25 из 35; оси: Count, Step.
- Борда: «Step progress — борда · шаблон v3», разделов 9.
- Описание: 559 знаков, разделы: Status: Level: Когда использовать: A11y: Правила: Матрица:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsStepProgress>`; Flutter: `DsStepProgress`.
- Props: `count`: 3 | 4 | 5 | 6 | 7; `step`: 1 | 2 | 3 | 4 | 5 | 6 | 7.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечаний по манифесту нет.

## 15. Migration
- Legacy: не указано в описании набора — искать в `docs/migration/components.csv`, DS Web / App и продуктах

# Legend swatch — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Legend swatch`. Status: draft. Level: atom.
- Figma: Components, страница «Legend swatch» (`1012:16`), набор `84:595`.

## 2. Intent
- Маркер серии для Legend item: Series 1–8 = data/1…8; Dot — столбцы/области/точки, Line — линии. Вложен в Legend item (exposed).
- Когда использовать: маркер серии в легенде и тултипе.
- Когда нет: индикатор статуса — Status.
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `marker`.
- Служебные слои (вариантов из 16): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Marker | Dot · Line | — |
| Series | 1 · 2 · 3 · 4 · 5 · 6 · 7 · 8 | — |

Матрица полная: 16 вариантов.

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- декоративен, название серии всегда рядом в тексте; контраст маркера с фоном не ниже 3:1.

## 10. Tokens
- `marker`: заливка / цвет `data/1`, `data/2`, `data/3`, `data/4`, `data/5`, `data/6`, `data/7`, `data/8`; радиус `radius/chip`.
- Значений без переменной: 32 (напр. `(root):w=12`, `(root):h=12`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Legend swatch`, вариантов 16 из 16; оси: Marker, Series.
- Борда: «Legend swatch — борда · шаблон v3», разделов 9.
- Описание: 600 знаков, разделы: Status: Level: Когда использовать: Правила: A11y: Legacy:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsLegendSwatch>`; Flutter: `DsLegendSwatch`.
- Props: `marker`: dot | line; `series`: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечаний по манифесту нет.

## 15. Migration
- Legacy: DS Web legend marker.

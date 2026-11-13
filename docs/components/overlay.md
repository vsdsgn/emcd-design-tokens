# Overlay — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Overlay`. Status: draft. Level: atom.
- Figma: Components, страница «Overlay» (`1661:354`), набор `1661:357`.

## 2. Intent
- Подложка за модальными слоями (Modal, Sheet, Side panel): полупрозрачная заливка surface/overlay на весь экран, при необходимости с размытием фона.
- Когда использовать: за Modal, Sheet и Side panel, под Dropdown panel на мобильном.
- Когда нет: внутри страницы, для выделения блока — Card.
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
| Blur | Off · On | — |

Матрица полная: 2 вариантов.

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- декоративна; фокус заперт внутри слоя, фон за подложкой получает aria-hidden и inert.

## 10. Tokens
- `корень`: эффект `effect/blur/backdrop`; заливка / цвет `surface/overlay`.
- Значений без переменной: 4 (напр. `(root):w=480`, `(root):h=320`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Overlay`, вариантов 2 из 2; оси: Blur.
- Борда: «Overlay — борда · шаблон v3», разделов 9.
- Описание: 744 знаков, разделы: Status: Level: Когда использовать: Правила: A11y: Legacy: Токены:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsOverlay>`; Flutter: `DsOverlay`.
- Props: `blur`: boolean.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечаний по манифесту нет.

## 15. Migration
- Legacy: DS Web Background / base overlay.

# Avatar group — контракт · draft (2026-11-12)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Avatar group`. Status: draft. Level: molecule.
- Figma: Components, страница «Avatar group» (`1012:5`), набор `108:1379`.

## 2. Intent
- Группа аватаров внахлёст (−20% размера) с обводкой surface/default; More — «+N».
- Когда использовать: не описано
- Когда нет: не описано
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `more`, `count`.
- Вложено: `Avatar` ×24.
- Служебные слои (вариантов из 6): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | XS · S · M | — |
| More | Off · On | — |

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
- `more`: заливка / цвет `action/secondary/default`, `surface/default`; радиус `radius/chip`; обводка `surface/default`; толщина обводки `border/width/focus`.
- `count`: заливка / цвет `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/sm`.
- Значений без переменной: 6 (напр. `(root):gap=-4`, `(root):gap=-6`, `(root):gap=-8`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Avatar group`, вариантов 6 из 6; оси: Size, More.
- Борда: «Avatar group — борда · шаблон v3», разделов 9.
- Описание: 220 знаков, разделы: Status: Level:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsAvatarGroup>`; Flutter: `DsAvatarGroup`.
- Props: `size`: xs | s | m; `more`: boolean.

## 14. Acceptance (2026-11-12)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - DESC: нет: Когда использовать:, Правила:, A11y:
  - AXES: `More` — булева ось (Off | On)
  - RAW: 6 (напр. `(root):gap=-4`, `(root):gap=-6`)
  - BOARD: нет разделов 05, 07, 08, 12

## 15. Migration
- Legacy: base avatar / group line (size, more, RTL — в коде направление по dir).

# Dot — контракт · draft (2026-11-12)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Dot`. Status: не указан. Level: atom.
- Figma: Components, страница «Status» (`366:101`), набор `720:75926`.

## 2. Intent
- Точка тона: Success · Warning · Danger · Info · Neutral; S 6 · M 8. Используется в Status, Tab bar item (badge dot), легендах.
- Когда использовать: не описано
- Когда нет: не описано
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `dot`.
- Служебные слои (вариантов из 10): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | S · M | — |
| Tone | Success · Warning · Danger · Info · Neutral | — |

Матрица полная: 10 вариантов.

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- |

## 10. Tokens
- `корень`: высота `size/dot/md`, `size/dot/sm`; ширина `size/dot/md`, `size/dot/sm`.
- `dot`: заливка / цвет `status/danger/solid`, `status/info/solid`, `status/neutral/solid`, `status/success/solid`, `status/warning/solid`; высота `size/dot/md`, `size/dot/sm`; ширина `size/dot/md`, `size/dot/sm`.

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Dot`, вариантов 10 из 10; оси: Size, Tone.
- Борда: «Status — борда · шаблон v3», разделов 9.
- Описание: 138 знаков, разделы: Level: Точка тона:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsDot>`; Flutter: `DsDot`.
- Props: `size`: s | m; `tone`: success | warning | danger | info | neutral.

## 14. Acceptance (2026-11-12)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - DESC: нет: Status: первой строкой, Когда использовать:, Правила:, A11y:
  - BOARD: нет разделов 05, 07

## 15. Migration
- Legacy: не указано в описании набора — искать в `docs/migration/components.csv`, DS Web / App и продуктах

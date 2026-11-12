# Tabs — контракт · draft (2026-11-12)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Tabs`. Status: draft. Level: molecule.
- Figma: Components, страница «Tabs» (`355:33524`), набор `45:250`.

## 2. Intent
- Бар табов. Внутри — инстансы Tab; первый выбран. Разделитель снизу — border/subtle на всю ширину контейнера (в макете растяните бар на ширину секции).
- Когда использовать: 2–7 разделов одного контекста.
- Когда нет: фильтры — Chip / Segmented; основная навигация — Nav item / Tab bar.
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `tab 1`, `tab 2`, `tab 3`, `tab 4`, `tab 5`, `tab 6`.
- Вложено: `Tab` ×24.
- Служебные слои (вариантов из 4): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | M · L · XL · S | — |

Матрица полная: 4 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Tab 3 | булево | вкл | 4 из 4 |
| Tab 4 | булево | вкл | 4 из 4 |
| Tab 5 | булево | выкл | 4 из 4 |
| Tab 6 | булево | выкл | 4 из 4 |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- Не описано: заполнить при переводе в beta.

## 10. Tokens
- `корень`: интервал `space/16`, `space/20`, `space/24`, `space/32`; обводка `border/subtle`.
- `tab 1`: интервал `space/6`, `space/8`; высота `control/height/2xl`, `control/height/lg`, `control/height/sm`, `control/height/xl`.
- `tab 2`: интервал `space/6`, `space/8`; высота `control/height/2xl`, `control/height/lg`, `control/height/sm`, `control/height/xl`.
- `tab 3`: интервал `space/6`, `space/8`; высота `control/height/2xl`, `control/height/lg`, `control/height/sm`, `control/height/xl`.
- `tab 4`: интервал `space/6`, `space/8`; высота `control/height/2xl`, `control/height/lg`, `control/height/sm`, `control/height/xl`.
- `tab 5`: интервал `space/6`, `space/8`; высота `control/height/2xl`, `control/height/lg`, `control/height/sm`, `control/height/xl`.
- `tab 6`: интервал `space/6`, `space/8`; высота `control/height/2xl`, `control/height/lg`, `control/height/sm`, `control/height/xl`.

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Tabs`, вариантов 4 из 4; оси: Size.
- Борда: «Tabs — борда · шаблон v3», разделов 9.
- Описание: 752 знаков, разделы: Status: Level: Бар табов. Правила: Когда использовать: Хаптик: Поиск: Legacy:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsTabs>`; Flutter: `DsTabs`.
- Props: `size`: m | l | xl | s; `tab3`: boolean = true; `tab4`: boolean = true; `tab5`: boolean = false; `tab6`: boolean = false.

## 14. Acceptance (2026-11-12)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - DESC: нет: A11y:
  - BOARD: нет разделов 05, 07, 08, 12

## 15. Migration
- Legacy: tabs, base tabbar (DS Web)

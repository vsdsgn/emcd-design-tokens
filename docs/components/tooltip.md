# Tooltip — контракт · draft (2026-11-12)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Tooltip`. Status: draft. Level: atom.
- Figma: Components, страница «Tooltip» (`317:33689`), набор `317:33734`.

## 2. Intent
- Подсказка к элементу на Web: что делает иконка, что значит термин, почему контрол неактивен, полный текст обрезанного значения. Без действий внутри. Форма — legacy «base tooltip».
- Когда использовать: не описано
- Когда нет: не описано
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `text`.
- Вложено: `_Tooltip arrow` ×24.
- Служебные слои (вариантов из 24): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Placement | Top · Bottom · Left · Right | — |
| Tone | Neutral · Accent | — |
| Arrow | Center · Start · End | — |

Матрица полная: 24 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Text | текст | «Комиссия сети списывается отдельно» | 8 из 24 |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- |

## 10. Tokens
- `корень`: эффект `shadow/ambient`, `shadow/key`; заливка / цвет `action/primary/default`, `surface/raised`; отступы `space/10`, `space/16`; радиус `radius/container`; обводка `border/default`; толщина обводки `border/width/default`.
- `text`: заливка / цвет `fixed/light`, `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- Min / max корня: minWidth 58 числом, maxWidth 320 числом, minHeight 58 числом.

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Tooltip`, вариантов 24 из 24; оси: Placement, Tone, Arrow.
- Борда: «Tooltip — борда · шаблон v3», разделов 11.
- Описание: 3464 знаков, разделы: Status: Level: • Пояснение термина: • Приложение и касание — • Ошибки формы — • Пузырь: • Neutral — • Placement — • Arrow — В коде — • Одновременно — • Появление —

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsTooltip>`; Flutter: `DsTooltip`.
- Props: `placement`: top | bottom | left | right; `tone`: neutral | accent; `arrow`: center | start | end; `text`: string или слот.

## 14. Acceptance (2026-11-12)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - DESC: нет: Когда использовать:, Правила:, A11y:
  - AXES: `Placement` — Left / Right вместо Start / End
  - PROPS: Text 8 из 24
  - MINMAX: minw=58, maxw=320, minh=58
  - BOARD: нет разделов 12

## 15. Migration
- Legacy: не указано в описании набора — искать в `docs/migration/components.csv`, DS Web / App и продуктах

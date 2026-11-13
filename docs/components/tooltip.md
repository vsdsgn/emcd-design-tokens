# Tooltip — контракт · draft (2026-11-13)

Заготовка: собрана автоматически. Набор заменён на месте (2026-11-13): фон, радиус и тень — слой `overlay surface`, нераскрытый экземпляр базы `_Overlay surface`; свойства набора не менялись. Поверхность, токены и приёмка базы — `docs/components/overlay-surface.md`. Status остаётся draft до ручного чеклиста и «ок» Стефана.
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
- Слои с токенами: `overlay surface`, `text`.
- Вложено: `_Overlay surface` ×24, `_Tooltip arrow` ×24.
- Служебные слои (вариантов из 24): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Placement | Top · Bottom · Start · End | — |
| Tone | Neutral · Accent | — |
| Arrow | Center · Start · End | — |

Матрица полная: 24 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Text | текст | «Комиссия сети списывается отдельно» | 24 из 24 |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- |

## 10. Tokens
- `корень`: maxw `size/tooltip/max`; minh `size/tooltip/min`; мин. ширина `size/tooltip/min`; отступы `space/10`, `space/16`; радиус `radius/container`; обводка `border/default`; толщина обводки `border/width/default`.
- `overlay surface`: эффект `shadow/ambient`, `shadow/key`; заливка / цвет `action/primary/default`, `surface/raised`; радиус `radius/container`.
- `text`: заливка / цвет `fixed/light`, `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- Min / max корня: minWidth 58 size/tooltip/min, maxWidth 320 size/tooltip/max, minHeight 58 size/tooltip/min.

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Tooltip`, вариантов 24 из 24; оси: Placement, Tone, Arrow.
- Борда: «Tooltip — борда · шаблон v3», разделов 12.
- Описание: 4198 знаков, разделы: Status: Level: Когда использовать: Правила: A11y: • Пояснение термина: • Приложение и касание — • Ошибки формы — • Пузырь: • Neutral — • Placement — • Arrow — В коде — • Одновременно — • Появление — Поверхность —

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsTooltip>`; Flutter: `DsTooltip`.
- Props: `placement`: top | bottom | start | end; `tone`: neutral | accent; `arrow`: center | start | end; `text`: string или слот.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` прогнаны после замены (2026-11-13): `audit` 0, OVERLAY и SERVICE 0; остаток (числа min / max и др.) — в замечаниях ниже и в `docs/components/overlay-surface.md`, раздел 14. Стенд — на пилоте базы.
- Замечаний по манифесту нет.

## 15. Migration
- Legacy: не указано в описании набора — искать в `docs/migration/components.csv`, DS Web / App и продуктах

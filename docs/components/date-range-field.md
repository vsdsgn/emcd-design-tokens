# Date range field — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Date range field`. Status: draft. Level: unknown.
- Figma: Components, страница «Date range field» (`1611:4`), набор `1611:115`.

## 2. Intent
- Поле выбора диапазона дат: подпись на рамке, значение «ДД.ММ.ГГ → ДД.ММ.ГГ», справа иконка календаря. По нажатию открывает панель с календарём (Calendar, Mode=Range) и пресетами периодов.
- Когда использовать: выгрузки, фильтры по периоду, отчёты.
- Когда нет: одна дата — Input с календарём; быстрый выбор («7 дней», «30 дней») — Chip или Segmented.
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `field`.
- Вложено: `Input` ×5.
- Служебные слои (вариантов из 5): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Ось State: Default · Focus · Filled · Error · Disabled. Группа модели состояний (`docs/components.md`) — определить при переводе в beta.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| State | Default · Focus · Filled · Error · Disabled | — |

Матрица полная: 5 вариантов.

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- role="group" с подписью; две даты — два связанных поля (начало и конец), панель — role="dialog"; Esc закрывает, фокус возвращается на поле.

## 10. Tokens
- `корень`: мин. ширина `size/field/min`.
- `field`: мин. ширина `size/field/min`.
- Min / max корня: minWidth 160 size/field/min.
- Значений без переменной: 5 (напр. `(root):w=320`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Date range field`, вариантов 5 из 5; оси: State.
- Борда: «Date range field — борда · шаблон v3», разделов 10.
- Описание: 938 знаков, разделы: Status: Level: Когда использовать: Правила: A11y: Legacy: Токены:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsDateRangeField>`; Flutter: `DsDateRangeField`.
- Props: нет.
- Состояния (Default, Focus, Filled, Error, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечаний по манифесту нет.

## 15. Migration
- Legacy: DS Web DateRange.Field.

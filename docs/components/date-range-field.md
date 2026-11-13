# Date range field — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Date range field`. Status: draft. Level: molecule.
- Figma: Components, страница «Date range field» (`1611:4`), набор `1611:115`.

## 2. Intent
- Поле выбора диапазона дат: подпись на рамке, значение «ДД.ММ.ГГ → ДД.ММ.ГГ», справа иконка календаря. По нажатию открывает панель с календарём (Calendar, Mode=Range) и пресетами периодов.
- Когда использовать: выгрузки, фильтры по периоду, отчёты.
- Когда нет: одна дата — Input с календарём; быстрый выбор («7 дней», «30 дней») — Chip или Segmented.
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `field`, `Leading`, `caret`, `value`, `Inline`, `Trailing`, `calendar`, `notch label`, `border gap`, `notch text`, `helper row`, `helper`, `counter`.
- Вложено: иконки ×5.
- Служебные слои (вариантов из 5): кольцо фокуса 5 · зона Web 5 · зона касания 5 · безопасное поле 5.

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
- `корень`: мин. ширина `size/field/min`; отступы `space/8`.
- `field`: заливка / цвет `control/surface/default`, `control/surface/disabled`; интервал `space/12`; высота `control/height/md`; отступы `control/padding-x/md`; радиус `radius/control-sm`; обводка `control/border/default`, `control/border/disabled`, `control/border/error`, `control/border/focus`; толщина обводки `border/width/default`.
- `Leading`: интервал `space/6`.
- `caret`: заливка / цвет `border/focus`.
- `value`: заливка / цвет `text/disabled`, `text/primary`, `text/tertiary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- `Inline`: интервал `space/6`.
- `Trailing`: интервал `space/8`.
- `calendar`: высота `icon/size/md`; ширина `icon/size/md`.
- `notch label`: отступы `space/2`.
- `border gap`: заливка / цвет `control/surface/default`, `control/surface/disabled`.
- `notch text`: заливка / цвет `text/disabled`, `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/sm`.
- `helper row`: интервал `space/8`; отступы `space/4`.
- `helper`: заливка / цвет `text/danger`, `text/disabled`, `text/tertiary`; типографика `font-weight/medium`, `font/family/text`, `type/label/sm`.
- `counter`: заливка / цвет `text/disabled`, `text/tertiary`; типографика `font-weight/medium`, `font/family/text`, `type/label/sm`.
- Служебные слои (общие правила — `service-layers.md`): `focus ring`: радиус `radius/focus-ring-sm`; обводка `border/focus-ring`; толщина обводки `border/width/focus-ring` · `hit area · web`: видимость `touch/is-fine` · `hit area · overlay`: заливка / цвет `status/danger/solid` · `hit area · app`: видимость `touch/is-coarse` · `safe area · outer`: обводка `status/success/solid`; толщина обводки `control/safe-margin`.
- Min / max корня: minWidth 160 size/field/min.
- Значений без переменной: 15 (напр. `(root):w=320`, `hit area · web:w=320`, `hit area · web:h=40`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Date range field`, вариантов 5 из 5; оси: State.
- Борда: «Date range field — борда · шаблон v3», разделов 10.
- Описание: 794 знаков, разделы: Status: Level: Когда использовать: Правила: A11y: Legacy: Токены:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsDateRangeField>`; Flutter: `DsDateRangeField`.
- Props: нет.
- Состояния (Default, Focus, Filled, Error, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - RAW: 15 (напр. `(root):w=320`, `hit area · web:w=320`)
  - BOARD: нет разделов 05, 07, 08

## 15. Migration
- Legacy: DS Web DateRange.Field.

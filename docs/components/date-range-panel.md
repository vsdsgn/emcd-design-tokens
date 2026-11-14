# Date range panel — контракт · draft (2026-11-14)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Date range panel`. Status: draft. Level: unknown.
- Figma: Components, страница «Date range panel» (`1663:6984`), набор `1663:8388`.

## 2. Intent
- Не описано.
- Когда использовать: не описано
- Когда нет: не описано
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `calendar column`, `calendar`, `footer`, `reset`, `apply`.
- Вложено: `Menu item` ×12, `Calendar` ×2, `Button` ×4.
- Служебные слои (вариантов из 2): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Presets | On · Off | — |

Матрица полная: 2 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Show reset | булево | вкл | 2 из 2 |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- Не описано: заполнить при переводе в beta.

## 10. Tokens
- `корень`: эффект `material/thick/blur`, `shadow/ambient`, `shadow/key`; заливка / цвет `material/thick/fill`; интервал `space/16`; отступы `space/12`; радиус `radius/control`; обводка `border/subtle`; толщина обводки `border/width/default`.
- `calendar column`: интервал `space/12`.
- `calendar`: эффект `shadow/ambient`, `shadow/key`; заливка / цвет `surface/raised`; интервал `space/12`; отступы `space/16`; радиус `radius/container`.
- `footer`: интервал `space/8`.
- `reset`: интервал `space/2`; мин. ширина `size/button/min`; отступы `space/4`; радиус `radius/xs`.
- `apply`: заливка / цвет `action/primary/default`; интервал `space/2`; высота `control/height/sm`; мин. ширина `size/button/min`; отступы `space/6`; радиус `radius/control-sm`.

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Date range panel`, вариантов 2 из 2; оси: Presets.
- Борда: «Date range panel — борда · шаблон v3», разделов 9.
- Описание: 1051 знаков, разделы: Status: Level: Панель выбора периода: Когда использовать: Правила: A11y: Legacy: Токены:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsDateRangePanel>`; Flutter: `DsDateRangePanel`.
- Props: `presets`: boolean; `showReset`: boolean = true.

## 14. Acceptance (2026-11-14)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечаний по манифесту нет.

## 15. Migration
- Legacy: DS Web `DateRange.Panel`, `PeriodPresets` → Date range panel (Calendar + пресеты + футер); DS App — нет.

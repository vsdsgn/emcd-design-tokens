# Circle timer — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Circle timer`. Status: draft. Level: atom.
- Figma: Components, страница «Circle timer» (`1661:328`), набор `1661:353`.

## 2. Intent
- Круглый таймер обратного отсчёта: кольцо-прогресс, убывает по часовой стрелке. Показывает, сколько осталось до автоскрытия Toast или до повторной отправки кода.
- Когда использовать: автоскрытие Toast, повторная отправка кода, ограничение по времени.
- Когда нет: загрузка без срока — Spinner; прогресс выполнения — Progress.
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `track`, `progress`.
- Служебные слои (вариантов из 8): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | S · M | — |
| Progress | 100 · 75 · 50 · 25 | — |

Матрица полная: 8 вариантов.

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- декоративен (aria-hidden), оставшееся время не озвучивается; при reduced motion — статичное кольцо без анимации.

## 10. Tokens
- `корень`: высота `icon/size/lg`, `icon/size/sm`; ширина `icon/size/lg`, `icon/size/sm`.
- `track`: высота `icon/size/lg`, `icon/size/sm`; обводка `border/default`; толщина обводки `border/width/strong`; ширина `icon/size/lg`, `icon/size/sm`.
- `progress`: обводка `icon/accent`; толщина обводки `border/width/strong`.

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Circle timer`, вариантов 8 из 8; оси: Size, Progress.
- Борда: «Circle timer — борда · шаблон v3», разделов 9.
- Описание: 709 знаков, разделы: Status: Level: Когда использовать: Правила: A11y: Legacy: Токены:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsCircleTimer>`; Flutter: `DsCircleTimer`.
- Props: `size`: s | m; `progress`: 100 | 75 | 50 | 25.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечаний по манифесту нет.

## 15. Migration
- Legacy: DS Web Toast / Circle timer.

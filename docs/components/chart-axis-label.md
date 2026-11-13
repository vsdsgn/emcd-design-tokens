# Chart axis label — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Chart axis label`. Status: draft. Level: molecule.
- Figma: Components, страница «Chart axis label» (`1012:17`), набор `97:818`.

## 2. Intent
- Подпись оси графика (время, дата, значение). Size S 12 / L 14. State: Default (text/tertiary), Hover / Active — подпись столбца под курсором / выбранного (text/primary), Skeleton.
- Когда использовать: подписи осей графиков (время, значение).
- Когда нет: значения данных на самом графике — Chart tooltip.
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `label`, `skeleton`.
- Служебные слои (вариантов из 8): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Ось State: Default · Hover · Active · Skeleton. Группа модели состояний (`docs/components.md`) — определить при переводе в beta.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | S · L | — |
| State | Default · Hover · Active · Skeleton | — |

Матрица полная: 8 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Label | текст | «14:00» | 6 из 8 |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- метки оси скрыты от экранных читалок (aria-hidden), данные доступны через aria-label графика и таблицу данных.

## 10. Tokens
- `корень`: maxw `size/chart-axis-label/max`.
- `label`: заливка / цвет `text/primary`, `text/tertiary`; типографика `font-weight/regular`, `font/family/text`, `type/body/md`, `type/body/sm`.
- `skeleton`: заливка / цвет `skeleton/base`; радиус `radius/chip`.
- Min / max корня: maxWidth 64 size/chart-axis-label/max.

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Chart axis label`, вариантов 8 из 8; оси: Size, State.
- Борда: «Chart axis label — борда · шаблон v3», разделов 9.
- Описание: 775 знаков, разделы: Status: Level: Когда использовать: Правила: A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsChartAxisLabel>`; Flutter: `DsChartAxisLabel`.
- Props: `size`: s | l; `label`: string или слот.
- Состояния (Default, Hover, Active, Skeleton) — не props: Hover / Pressed / Focus из платформы; `disabled`, `skeleton` — props.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечаний по манифесту нет.

## 15. Migration
- Legacy: .chart (size small/large, state default/hover/active/skeleton) — widget Graph.

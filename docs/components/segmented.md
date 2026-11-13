# Segmented — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Segmented`. Status: draft. Level: molecule.
- Figma: Components, страница «Segmented» (`355:33993`), набор `46:549`.

## 2. Intent
- Segmented: выбор одного значения из 2–4 взаимоисключающих, результат применяется сразу (период графика, Купить/Продать, вид список/сетка).
- Когда использовать: режим или фильтр-значение внутри карточки, виджета, формы.
- Когда нет: разделы экрана — Tabs; больше 4 вариантов или длинные подписи — Select; множественный выбор — Chip.
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `segment 1`, `segment 2`, `segment 3`, `segment 4`.
- Вложено: `Segment` ×36.
- Служебные слои (вариантов из 12): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | S · M · L · XL | — |
| Items | 2 · 3 · 4 | — |

Матрица полная: 12 вариантов.

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- role=radiogroup, сегмент role=radio + aria-checked; ←/→ — переход и выбор, Tab — выход.

## 10. Tokens
- `корень`: заливка / цвет `control/segment-track`; интервал `space/2`; отступы `space/4`; радиус `radius/control`, `radius/control-sm`.
- `segment 1`: заливка / цвет `control/segment`; интервал `space/6`; высота `control/height/lg`, `control/height/md`, `control/height/sm`, `control/height/xs`; отступы `control/padding-x/lg`, `control/padding-x/sm`, `control/padding-x/xl`, `space/12`; радиус `radius/sm`, `radius/xs`.
- `segment 2`: интервал `space/6`; высота `control/height/lg`, `control/height/md`, `control/height/sm`, `control/height/xs`; отступы `control/padding-x/lg`, `control/padding-x/sm`, `control/padding-x/xl`, `space/12`; радиус `radius/sm`, `radius/xs`.
- `segment 3`: интервал `space/6`; высота `control/height/lg`, `control/height/md`, `control/height/sm`, `control/height/xs`; отступы `control/padding-x/lg`, `control/padding-x/sm`, `control/padding-x/xl`, `space/12`; радиус `radius/sm`, `radius/xs`.
- `segment 4`: интервал `space/6`; высота `control/height/lg`, `control/height/md`, `control/height/sm`, `control/height/xs`; отступы `control/padding-x/lg`, `control/padding-x/sm`, `control/padding-x/xl`, `space/12`; радиус `radius/sm`, `radius/xs`.
- Значений без переменной: 12 (напр. `(root):w=240`, `(root):w=280`, `(root):w=320`, `(root):w=360`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Segmented`, вариантов 12 из 12; оси: Size, Items.
- Борда: «Segmented — борда · шаблон v3», разделов 9.
- Описание: 1070 знаков, разделы: Status: Level: Segmented: Когда использовать: Правила: Уровни: A11y: Поиск: Legacy:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsSegmented>`; Flutter: `DsSegmented`.
- Props: `size`: s | m | l | xl; `items`: 2 | 3 | 4.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечаний по манифесту нет.

## 15. Migration
- Legacy: base segmented picker group / text, / icon only (DS Web)

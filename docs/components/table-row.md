# Table row — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Table row`. Status: draft. Level: molecule.
- Figma: Components, страница «Table» (`367:42849`), набор `63:291`.

## 2. Intent
- Строка таблицы: набор ячеек в колонках фиксированной ширины + разделитель снизу (border/subtle).
- Когда использовать: не описано
- Когда нет: не описано
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `cell · Дата`, `cell · Монета`, `cell · Сумма`, `cell · Адрес`, `cell · Статус`, `cell · ⋯`.
- Вложено: `Table cell / Date time` ×8, `Table cell / Coin` ×8, `Table cell / Transaction` ×8, `Table cell / Text` ×8, `Table cell / Status` ×8, `Table cell / More` ×8, `_Hit area` ×16, `_Safe margin` ×8.
- Служебные слои (вариантов из 8): кольцо фокуса 8 · зона Web 8 · зона касания 8 · безопасное поле 8.

## 4. States
- Ось State: Default · Hover · Selected · Pressed. Группа модели состояний (`docs/components.md`) — определить при переводе в beta.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Density | Compact · Regular | — |
| State | Default · Hover · Selected · Pressed | — |

Матрица полная: 8 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Focus ring | булево | выкл | 8 из 8 · служебное |
| Show hit area | булево | выкл | 8 из 8 · служебное |
| Safe margin | булево | выкл | 8 из 8 · служебное |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- tr; если строка кликабельна — ссылка/кнопка в первой ячейке растягивается на строку; выбор — чекбокс в первой колонке с aria-label.

## 10. Tokens
- `корень`: заливка / цвет `accent/subtle`; высота `size/table/row-lg`, `size/table/row-sm`; отступы `space/8`; обводка `border/subtle`.
- `cell · Дата`: интервал `space/8`; высота `size/table/row-lg`; мин. ширина `size/table-cell/min`; отступы `space/sm`.
- `cell · Монета`: интервал `space/sm`, `space/xs`; высота `size/table/row-lg`; мин. ширина `size/table-cell/min`; отступы `space/sm`.
- `cell · Сумма`: интервал `space/2xs`; высота `size/table/row-lg`; мин. ширина `size/table-cell/min`; отступы `space/sm`.
- `cell · Адрес`: интервал `space/8`; высота `size/table/row-lg`; мин. ширина `size/table-cell/min`; отступы `space/sm`.
- `cell · Статус`: интервал `space/8`; высота `size/table/row-lg`; мин. ширина `size/table-cell/min`; отступы `space/12`.
- `cell · ⋯`: интервал `space/8`; высота `size/table/row-lg`; мин. ширина `size/table-cell/min`; отступы `space/xs`.
- Служебные слои (общие правила — `service-layers.md`): `focus ring`: обводка `border/focus-ring`; толщина обводки `border/width/focus-ring` · `hit area · web`: видимость `touch/is-fine` · `hit area · overlay`: заливка / цвет `status/danger/solid` · `hit area · app`: видимость `touch/is-coarse` · `safe area · outer`: обводка `status/success/solid`; толщина обводки `control/safe-margin` · `state layer`: заливка / цвет `state/layer`; прозрачность `state/hover`, `state/pressed`.
- Значений без переменной: 16 (напр. `hit area · web:w=856`, `hit area · web:h=48`, `hit area · web:h=80`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Table row`, вариантов 8 из 8; оси: Density, State.
- Борда: «Table header cell — борда · шаблон v3», разделов 11.
- Описание: 1479 знаков, разделы: Status: Level: Строка таблицы: Density: State: Колонки: A11y: Часть Table. Поиск: Legacy: Когда использовать: Правила:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsTableRow>`; Flutter: `DsTableRow`.
- Props: `density`: compact | regular.
- Состояния (Default, Hover, Selected, Pressed) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечаний по манифесту нет.

## 15. Migration
- Legacy: .table / raw (DS Web)

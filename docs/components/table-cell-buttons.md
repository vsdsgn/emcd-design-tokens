# Table cell / Buttons — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Table cell / Buttons`. Status: beta. Level: unknown.
- Figma: Components, страница «Table» (`367:42849`), набор `93:927`. Платформы: Web, Mobile web, iOS, Android.
- Страница «Table». Ячейка строки таблицы; вне Table row не используется.

## 2. Intent
- Ячейка таблицы с быстрыми действиями строки: до трёх Icon button Ghost S.
- Когда использовать: до трёх быстрых действий строки на Web.
- Когда нет: вне Table row; такие же данные в списке на Compact — List item; больше трёх действий — Table cell / More.
- Правило выбора варианта:
  - Icon button Ghost S, от одной до трёх; больше трёх действий — Table cell / More.
  - Button 2, Button 3 — вторая и третья кнопки; выключаются, когда действий меньше (оставшиеся сдвигаются без пустот).
  - Только последняя колонка таблицы.
  - State: Default — действия доступны; Skeleton — данные строки загружаются; Disabled — действия недоступны.
  - Высота — по строке (Table row): 48 или 80; ширина — по колонке; отступы и выравнивание — как у остальных ячеек колонки.
- Не делаем: четыре и более кнопок; кнопки с подписью; другой тип или размер кнопки; колонка действий не последней.

## 3. Anatomy
- Корень — горизонтальный стек, высота `size/table/row-lg`, отступы `space/12`, зазор `space/4`, min-width `size/table-cell/min` (80).
- `button 1`, `button 2`, `button 3` — квадрат `control/height/sm`, `radius/control-sm`, внутри иконка.
- `skeleton` — полоса `skeleton/base`, `radius/chip`.
- Вложено: иконки ×9.
- Служебные слои (вариантов из 3): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): наследует Icon button Ghost: Плашка: слой `state/layer` × `state/hover` 6 % / `state/pressed` 10 %; Disabled — токены `*/disabled`.
- Default — кнопки активны; Hover / Pressed / Focus — у каждой кнопки по правилам Icon button.
- Skeleton — одна полоса вместо всех кнопок, от Button 2 / Button 3 не зависит.
- Disabled — все кнопки погашены, не нажимаются.
- Hover строки — у Table row.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| State | Default · Skeleton · Disabled | Default |

Матрица полная: 3 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Button 2 | булево | вкл | 2 из 3 |
| Button 3 | булево | вкл | 2 из 3 |

## 6. Content / slots
- Текста нет: действие называют `aria-label` и тултип. Длинный текст, языки и 200 % на раскладку не влияют.
- RTL: порядок кнопок зеркалится вместе с колонкой; иконки — только направленные.

## 7. Events
- `click` по каждой кнопке — своё действие.

## 8. Behavior
- Hover: слой 0 → 6 %, `motion/duration/feedback` (120 мс), `motion/easing/standard`. «Уменьшить движение»: длительности ≈ 0.
- Skeleton — блик 1.2 с (набор Skeleton); «Уменьшить движение» — пульсация прозрачности.

## 9. Accessibility
- `td`; у каждой кнопки `aria-label` с действием и объектом («Удалить rig-01»).
- Клавиатура: Tab — по кнопкам по порядку, Enter / Space — действие.
- Кольцо фокуса и зона нажатия — у кнопки (правила Icon button); своих служебных слоёв у ячейки нет.

## 10. Tokens
- `корень`: интервал `space/4`; высота `size/table/row-lg`; мин. ширина `size/table-cell/min`; отступы `space/12`.
- `button 1`: интервал `space/6`; высота `control/height/sm`; радиус `radius/control-sm`; ширина `control/height/sm`.
- `button 2`: интервал `space/6`; высота `control/height/sm`; радиус `radius/control-sm`; ширина `control/height/sm`.
- `button 3`: интервал `space/6`; высота `control/height/sm`; радиус `radius/control-sm`; ширина `control/height/sm`.
- `skeleton`: заливка / цвет `skeleton/base`; радиус `radius/chip`.
- Min / max корня: minWidth 80 size/table-cell/min.
- Значений без переменной: 3 (напр. `(root):w=132`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Только Web: быстрые действия строки таблицы; на Compact — List item.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Набор `Table cell / Buttons`, вариантов 3 из 3; оси: State.
- Борда: «Table header cell — борда · шаблон v3», разделов 11.
- Описание: 599 знаков, разделы: Status: Level: Когда использовать: Правила: A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsTableCellButtons>`; Flutter: `DsTableCellButtons`.
- Props: `button2`: boolean = true; `button3`: boolean = true.
- Состояния (Default, Skeleton, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled`, `skeleton` — props.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; Hover / Pressed / Focus кнопок не показаны; RTL стенд не проверяет; кода нет — parity props пропущена.

## 15. Migration
- DS Web `table / small buttons` (button 2, button 3) → Table cell / Buttons: Button 2, Button 3.

Осталось доделать (после пакета правок beta 2026-11-13):
- Кнопки — слои `button 1…3`, не экземпляры Icon button Ghost S: нет Hover / Pressed / Focus и зон нажатия — заменить экземплярами.

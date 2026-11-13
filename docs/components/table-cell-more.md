# Table cell / More — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Table cell / More`. Status: beta. Level: unknown.
- Figma: Components, страница «Table» (`367:42849`), набор `93:978`. Платформы: Web, Mobile web, iOS, Android.
- Страница «Table». Ячейка строки таблицы; вне Table row не используется.

## 2. Intent
- Ячейка таблицы с кнопкой «⋯»: открывает меню действий строки (Menu).
- Когда использовать: меню действий строки.
- Когда нет: вне Table row; такие же данные в списке на Compact — List item; до трёх быстрых действий на Web — Table cell / Buttons.
- Правило выбора варианта:
  - Icon button Ghost S «⋯», одна на ячейку; открывает Menu.
  - Только последняя колонка таблицы.
  - Status — точка, если в меню есть важное; иначе выключен.
  - State: Default — меню доступно; Skeleton — данные строки загружаются; Disabled — действий нет.
  - Высота — по строке (Table row): 48 или 80; ширина — по колонке; отступы и выравнивание — как у остальных ячеек колонки.
- Не делаем: другая иконка вместо «⋯»; прямое действие без меню; точка Status как украшение; колонка не последней.

## 3. Anatomy
- Корень — горизонтальный стек, высота `size/table/row-lg`, отступы `space/8`, зазор `space/8`, min-width `size/table-cell/min` (80).
- `more` — квадрат `control/height/sm`, `radius/control-sm`, внутри иконка «⋯».
- `status` — точка `status/danger/solid` у правого верхнего угла кнопки (свойство Status).
- `skeleton` — полоса `skeleton/base`, `radius/chip`.
- Вложено: иконки ×3.
- Служебные слои (вариантов из 3): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): наследует Icon button Ghost: Плашка: слой `state/layer` × `state/hover` 6 % / `state/pressed` 10 %; Disabled — токены `*/disabled`.
- Default — кнопка активна; Hover / Pressed / Focus — по правилам Icon button.
- Skeleton — одна полоса вместо кнопки.
- Disabled — «⋯» погашено, меню не открывается.
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
| Status | булево | выкл | 3 из 3 |

## 6. Content / slots
- Текста нет: имя кнопки — в `aria-label`. Длинный текст, языки и 200 % на раскладку не влияют.
- RTL: ячейка выравнивается вместе с колонкой.

## 7. Events
- `click` — открыть Menu.

## 8. Behavior
- Меню — по правилам Menu.
- Hover: слой 0 → 6 %, `motion/duration/feedback` (120 мс), `motion/easing/standard`. «Уменьшить движение»: длительности ≈ 0.
- Skeleton — блик 1.2 с (набор Skeleton); «Уменьшить движение» — пульсация прозрачности.

## 9. Accessibility
- `td`; кнопка с `aria-haspopup="menu"` и именем «Действия: имя строки».
- Клавиатура: Tab — фокус на кнопке; Enter / Space / ↓ — открыть меню, ↑ / ↓ — выбор, Enter — подтвердить, Esc — закрыть.
- Кольцо фокуса и зона нажатия — у кнопки (правила Icon button); своих служебных слоёв у ячейки нет.

## 10. Tokens
- `корень`: интервал `space/8`; высота `size/table/row-lg`; мин. ширина `size/table-cell/min`; отступы `space/8`.
- `more`: интервал `space/6`; высота `control/height/sm`; радиус `radius/control-sm`; ширина `control/height/sm`.
- `status`: заливка / цвет `status/danger/solid`.
- `skeleton`: заливка / цвет `skeleton/base`; радиус `radius/chip`.
- Min / max корня: minWidth 80 size/table-cell/min.
- Значений без переменной: 3 (напр. `(root):w=80`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Набор `Table cell / More`, вариантов 3 из 3; оси: State.
- Борда: «Table header cell — борда · шаблон v3», разделов 11.
- Описание: 611 знаков, разделы: Status: Level: Кнопка «⋯» — Когда использовать: Правила: A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsTableCellMore>`; Flutter: `DsTableCellMore`.
- Props: `status`: boolean = false.
- Состояния (Default, Skeleton, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled`, `skeleton` — props.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; Status = On — только на L0 Light; Hover / Pressed / Focus кнопки не показаны; RTL стенд не проверяет; кода нет — parity props пропущена.

## 15. Migration
- DS Web `table / more button` (status, button hover) → Table cell / More: Status; hover — у кнопки.

Осталось доделать (после пакета правок beta 2026-11-13):
- Кнопка — слой `more`, не экземпляр Icon button Ghost S: нет Hover / Pressed / Focus и зон нажатия — заменить экземпляром.
- На решение: точка Status в Skeleton и Disabled остаётся яркой (скрывать в Skeleton, гасить в Disabled?).
- Отступ корня `space/8`, у остальных ячеек — `space/12`.

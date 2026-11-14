# Table cell / Status — контракт (2026-11-14)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Table cell / Status`. Status: beta. Level: unknown.
- Figma: Components, страница «Table cell» (`367:42849`), набор `1719:21483`. Платформы: Web, Mobile web, iOS, Android.
- Страница «Table». Ячейка строки таблицы; вне Table row не используется.

## 2. Intent
- Ячейка таблицы со статусом: точка и подпись («имя воркера · активен»). Подпись и тон — у вложенного Status.
- Когда использовать: колонка «Имя и статус», «Статус» в таблицах.
- Когда нет: значение-бейдж с фоном — Table cell / Badge; вне Table row.
- Правило выбора варианта:
  - Состояние объекта — Table cell / Status (точка и подпись); метка-свойство с фоном — Table cell / Badge.
  - Тон по смыслу: Success, Warning, Danger, Info, Neutral — задаётся у вложенного Status.
  - Подпись — одна строка, усекается.
  - State: Default — данные есть; Skeleton — данные строки загружаются; Disabled — строка недоступна.
- Не делаем: точка без подписи; цвет как единственный носитель смысла; перенос подписи на вторую строку; бейдж с фоном в этой ячейке.

## 3. Anatomy
- Корень — горизонтальный стек, высота `size/table/row-lg`, отступы `space/12`, зазор `space/8`, min-width `size/table-cell/min` (80).
- `status` — вложенный Status: точка тона и подпись.
- `skeleton` — полоса `skeleton/base`, `radius/chip`.
- Вложено: `Status` ×2, `Badge` ×1.
- Служебные слои (вариантов из 3): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент; Skeleton — загрузка.
- Default — точка в цвете тона, подпись основным цветом.
- Skeleton — одна полоса вместо статуса.
- Disabled — точка и подпись погашены.
- Hover — у строки (Table row), не у ячейки.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| State | Default · Skeleton · Disabled | Default |

Матрица полная: 3 вариантов.

- Своих свойств нет: подпись и тон — у вложенного Status.

## 6. Content / slots
- Длинный текст: одна строка, усечение многоточием, корень не ломается; полный текст — в `title` / тултипе.
- Языки (de, ar, hi, th, ja, kk): по высоте не обрезаются.
- Текст 200 %: подпись растёт без обрезки и не наезжает на соседей, точка не растёт.
- RTL: точка — со стороны начала строки (правило Status), ячейка выравнивается вместе с колонкой.

## 7. Events
- Нет. Нажатие и Hover — у Table row.

## 8. Behavior
- Статична; смена статуса — без анимации. Skeleton — блик 1.2 с (набор Skeleton); «Уменьшить движение» — пульсация прозрачности.

## 9. Accessibility
- Ячейка `role="cell"` (`td`); статус читается текстом подписи; цвет точки дублируется текстом.

## 10. Tokens
- `корень`: интервал `space/8`; высота `size/table/row-lg`; мин. ширина `size/table-cell/min`; отступы `space/12`.
- `status`: заливка / цвет `status/success/subtle`; интервал `space/6`, `space/8`; высота `size/badge-height/md`; maxw `size/badge/max`; отступы `control/padding-x/sm`; радиус `radius/sm`.
- `skeleton`: заливка / цвет `skeleton/base`; радиус `radius/chip`.
- Min / max корня: minWidth 80 size/table-cell/min.
- Значений без переменной: 3 (напр. `(root):w=160`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Набор `Table cell / Status`, вариантов 3 из 3; оси: State.
- Борда: «Table cells — борда · шаблон v3», разделов 25.
- Описание: 561 знаков, разделы: Status: Level: Когда использовать: Правила: A11y: Legacy:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsTableCellStatus>`; Flutter: `DsTableCellStatus`.
- Props: нет.
- Состояния (Default, Skeleton, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled`, `skeleton` — props.

## 14. Acceptance (2026-11-14)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %; булевых свойств нет; тон — только Success; RTL стенд не проверяет; кода нет — parity props пропущена.

## 15. Migration
- DS Web `table cell / status` → Table cell / Status; подпись и тон — у вложенного Status.

Осталось доделать (после пакета правок beta 2026-11-13):
- Среди вложенных — Badge (1 вариант), на слое `status` — токены бейджа; на стенде бейджа не видно — найти и убрать остаток.

# Table cell / Badge — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Table cell / Badge`. Status: beta. Level: unknown.
- Figma: Components, страница «Table» (`367:42849`), набор `93:725`. Платформы: Web, Mobile web, iOS, Android.
- Страница «Table». Ячейка строки таблицы; вне Table row не используется.

## 2. Intent
- Ячейка таблицы с бейджем: один Badge M, тон и текст — у вложенного экземпляра.
- Когда использовать: метка-свойство строки (тариф, тип).
- Когда нет: вне Table row; такие же данные в списке на Compact — List item; состояние объекта — Table cell / Status.
- Правило выбора варианта:
  - Badge M, один на ячейку; тон и текст задаются у вложенного экземпляра Badge по его правилам.
  - Метка-свойство — Table cell / Badge; состояние объекта — Table cell / Status.
  - State: Default — данные есть; Skeleton — данные строки загружаются; Disabled — строка недоступна.
  - Высота — по строке (Table row): 48 или 80; ширина — по колонке; отступы и выравнивание — как у остальных ячеек колонки.
- Не делаем: два бейджа в ячейке; другой размер Badge; бейдж для состояния объекта; цвет как единственный носитель смысла.

## 3. Anatomy
- Корень — горизонтальный стек, высота `size/table/row-lg`, отступы `space/12`, зазор `space/8`, min-width `size/table-cell/min` (80).
- `badge` — вложенный Badge M: высота `size/badge-height/md`, max-width `size/badge/max`, `radius/sm`; на макете — `status/success/subtle`.
- `skeleton` — полоса `skeleton/base`, `radius/chip`.
- Вложено: `Badge` ×3.
- Служебные слои (вариантов из 3): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент; Skeleton — загрузка.
- Default — бейдж в своём тоне.
- Skeleton — одна полоса вместо бейджа.
- Disabled — вложенный Badge погашен целиком (подложка и текст).
- Hover — у строки (Table row), не у ячейки.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| State | Default · Skeleton · Disabled | Default |

Матрица полная: 3 вариантов.

- Своих свойств нет: тон и текст — у вложенного Badge.

## 6. Content / slots
- Текст — у вложенного Badge. Длинный текст: одна строка, усечение многоточием по max-width `size/badge/max`, корень не ломается; полный текст — в `title` / тултипе.
- Языки (de, ar, hi, th, ja, kk): по высоте не обрезаются.
- Текст 200 %: высота бейджа не растёт, текст занимает её целиком без обрезки; за корень не выходит.
- RTL: ячейка выравнивается вместе с колонкой; содержимое бейджа — по правилам Badge.

## 7. Events
- Нет. Нажатие и Hover — у Table row.

## 8. Behavior
- Статична. Skeleton — блик 1.2 с (набор Skeleton); «Уменьшить движение» — пульсация прозрачности.

## 9. Accessibility
- `td`; смысл метки — в тексте, не только в цвете.

## 10. Tokens
- `корень`: интервал `space/8`; высота `size/table/row-lg`; мин. ширина `size/table-cell/min`; отступы `space/12`.
- `badge`: заливка / цвет `status/success/subtle`; интервал `space/6`; высота `size/badge-height/md`; maxw `size/badge/max`; отступы `control/padding-x/sm`; радиус `radius/sm`.
- `skeleton`: заливка / цвет `skeleton/base`; радиус `radius/chip`.
- Min / max корня: minWidth 80 size/table-cell/min.
- Значений без переменной: 3 (напр. `(root):w=160`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Набор `Table cell / Badge`, вариантов 3 из 3; оси: State.
- Борда: «Table header cell — борда · шаблон v3», разделов 11.
- Описание: 562 знаков, разделы: Status: Level: Когда использовать: Правила: A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsTableCellBadge>`; Flutter: `DsTableCellBadge`.
- Props: нет.
- Состояния (Default, Skeleton, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled`, `skeleton` — props.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %; булевых свойств нет; RTL стенд не проверяет; кода нет — parity props пропущена.

## 15. Migration
- DS Web `table / badge` → Table cell / Badge; тон и текст — у вложенного Badge.

Осталось доделать (после пакета правок beta 2026-11-13):
- На решение: Dark L0 — погашенный бейдж (Disabled) почти сливается с фоном.

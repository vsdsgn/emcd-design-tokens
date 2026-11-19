# Table

Таблица Web — паттерн, не набор Figma (patterns.md 3.5): шапка Table header cell + строки Table row. `columns` + `rows` или свои строки в `children`.

**Колонки:** `{ key, label, align, sortable, width, render(row) }`; ширины — `col width`, таблица на ширину карточки, не помещается — прокрутка обёртки. **Сортировка:** `sort` / `onSort` (`{ key, dir }`) — состояние заголовков; данные сортирует продукт.

**Правила:** действия строки — последней колонкой (Icon button Tertiary S); загрузка — `skeletonRows`; пустой результат — Empty state у продукта.

**Доступность:** `table` с `aria-label` или `caption`; заголовки — `th scope=col` + `aria-sort`.

Классы: `emcd-table-wrap`, `emcd-table`, `emcd-table__head`, `emcd-table__caption`. Набора в Figma нет — в Claude DS draft.

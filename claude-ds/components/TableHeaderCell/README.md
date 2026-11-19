# Table header cell

Заголовок колонки таблицы; у сортируемой — кнопка сортировки с иконкой перед подписью.

**Оси (как в Figma «🟡 Table header cell»):** Align Start · End × Sort None · Ascending · Descending × State; Sortable, Show filter, Show info. Высота 44, поля 12, label-md Medium: несортированная `text-tertiary`, отсортированная `text-primary`; иконки `sort` / `sort-line-down` / `sort-line-up` 16.

**Правила:** End — числа и суммы; клик: None → Descending → Ascending (`onSort`). Hover и фокус — только у сортируемой.

**Доступность:** `th scope="col"` с `aria-sort`; сортировка — кнопка внутри `th` (Tab, Enter / Space).

Классы: `emcd-th [emcd-th--end] [emcd-th--sorted] [emcd-th--skeleton]`, `emcd-th__button` / `emcd-th__content`, `__label`, `__sort`, `__filter`, `__info`, `__bone`.

# Chart card

Виджет графика: показатели + период + график + легенда.

**Состав (как в Figma «🟡 Chart card»):** Top — Chart metric × 1–3 и период — ряд Chip (выбранный — белый); Content — Chart plot; Bottom — Legend item + итог (Show bottom). Подложка `surface/next`, обводка `border-subtle`, `radius/container`, поля 28, зазор 16, min-width 280.

**Правила:** одна карточка — один график; период — всегда Chip (Web S справа, Compact M на всю ширину равными долями), не Segmented; Skeleton / Empty — у Chart plot. Легенда — снизу по контракту (на экранах Figma пока над графиком — вопрос в OPEN-QUESTIONS).

**Доступность:** `section` `role=group` с именем; период — группа Chip с `aria-pressed`.

Классы: `emcd-chart-card`, `__top`, `__metrics`, `__periods [--m]`, `__content`, `__bottom`, `__sum`; легенда — `emcd-legend`.

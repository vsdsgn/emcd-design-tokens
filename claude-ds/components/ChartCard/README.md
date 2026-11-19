# Chart card

Виджет графика: показатели + период + график + легенда.

**Состав (как в Figma «🟡 Chart card»):** Top — Chart metric × 1–3 и период — ряд Chip (выбранный — белый), в конце Top — легенда над графиком (Legend item; две серии на двух осях — по краям); Content — Chart plot; Bottom — итог за период (Show bottom). Подложка `surface/next`, обводка `border-subtle`, `radius/container`, поля 28, зазор 16, min-width 280.

**Правила:** одна карточка — один график; период — всегда Chip (Web S справа, Compact M на всю ширину равными долями), не Segmented; Skeleton / Empty и hover (Chart crosshair + Chart tooltip) — у Chart plot: карточка пропускает указатель и фокус, тултип не обрезается. Легенда — над графиком в конце Top (контракт 19.11, по продукту Web App и App), единицы в подписях («Хешрейт, TH/s»); Bottom — только итог за период.

**Доступность:** `section` `role=group` с именем; период — группа Chip с `aria-pressed`.

Классы: `emcd-chart-card`, `__head` (Top целиком), `__top`, `__metrics`, `__periods [--m]`, `__content`, `__bottom`, `__sum`; легенда — `emcd-legend emcd-chart-card__legend`.

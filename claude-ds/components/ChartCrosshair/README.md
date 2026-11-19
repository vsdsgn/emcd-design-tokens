# Chart crosshair

Перекрестие выбранной точки графика: вертикальная линия с точками серий (линии, области) или подсветка полосы столбца. Работает вместе с Chart tooltip; ставит его Chart plot.

**Ось (как в Figma «🟡 Chart crosshair»):** Target Line · Bar. Линия — `border/default`; точка — цвет серии (1 — `border/accent`, 2–8 — `data/N`), обводка `surface/current` (`border-width/focus`), ореол того же цвета 0.24; полоса — `status/neutral/subtle` под столбцами.

**Правила:** Line — линейные графики и области, Bar — столбцы; цвет линии всегда `border/default`. Нажатия не перехватывает, без анимации движения. В RTL не зеркалится — положение по точке данных.

**Код:** в Chart plot — сам (`interactive`, по умолчанию вкл.); отдельно — `<ChartCrosshair target="line" x={60} points={[{ y: 40, series: 1 }]} />` в позиционированной области графика (x — % ширины, y — % высоты).

**Доступность:** декоративен (`aria-hidden`); значение точки озвучивает Chart plot (`aria-live=polite`).

Классы: `emcd-chart-crosshair [--bar]`, `__line`, `__band`, `__point --s{1–8}`.

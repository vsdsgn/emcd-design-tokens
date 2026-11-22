# Legend swatch

> 22.11: в Figma набор «Marker» (Legend swatch и `_Dot` слиты): Legend swatch = Shape Dot · Line × Color=Series 1–8 × Size=L; точки статуса — Shape=Dot × Color=Success…Neutral × Size S 6 / M 8. Код — `LegendSwatch` (серии) и точка внутри Status / Chip / Tab.

Маркер серии графика в легенде и тултипе: точка или отрезок линии.

**Оси (как в Figma «🟡 Legend swatch»):** Marker Dot · Line × Series 1–8. 12 × 12 (`size/legend-swatch`); Series 1 — `border/accent` (основная серия — бренд, 17.11), 2–8 — `data/2…8`; линии серий 5–8 — пунктир (5 — 4/2, 6 — 2/2, 7 — 6/2/2/2, 8 — 1/2).

**Правила:** Dot — столбцы и области, Line — линии; цвет — тот же, что у серии на Chart plot. Не больше 8 серий.

**Доступность:** декоративен (`aria-hidden`), название серии — текстом рядом (Legend item).

Классы: `emcd-legend-swatch emcd-legend-swatch--s{1–8} [emcd-legend-swatch--line]`, `emcd-legend-swatch__dot`.

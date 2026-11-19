# Chart plot

Область графика: серии, сетка, подписи осей и состояния. В коде — свой лёгкий SVG (без библиотеки) на токенах DS.

**Оси (как в Figma «🟡 Chart plot»):** Type Bars · Line · Area · Line + Bars · Multi-line · Dual area · Stacked bars × State Default · Hover · Skeleton · Empty · Disabled. Серия 1 — `border/accent` (бренд), остальные — `data/2…8`; вторая ось Line + Bars / Dual area — `data/4`; сетка — пунктир `border-subtle`; подписи осей — моно label-sm `text-tertiary`.

**Правила:** ось X — по времени, не больше 6 меток (`xTicks`, мобильный — 3); у столбцов нулевая база; шкала Y — автоматические «круглые» деления или `yLeft` / `yRight`. Hover (Chart crosshair + Chart tooltip) в код ещё не перенесён.

**Доступность:** `role=img` + `aria-label` (что и за какой период); рядом — таблица данных или сводка. Линии серий 5–8 — пунктиром.

Классы: `emcd-chart-plot [--dual] [--skeleton] [--empty] [--disabled]`, `__axis`, `__tick`, `__area-box`, `__svg`, `__grid`, `__series--{1–8}`, `__bar`, `__line`, `__area`, `__x-row`, `__x`, `__empty`, `__bone`.

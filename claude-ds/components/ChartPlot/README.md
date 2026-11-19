# Chart plot

Область графика: серии, сетка, подписи осей и состояния. В коде — свой лёгкий SVG (без библиотеки) на токенах DS.

**Оси (как в Figma «🟡 Chart plot»):** Type Bars · Line · Area · Line + Bars · Multi-line · Dual area · Stacked bars × State Default · Hover · Skeleton · Empty · Disabled. Серия 1 — `border/accent` (бренд), остальные — `data/2…8`; вторая ось Line + Bars / Dual area — `data/4`; сетка — пунктир `border-subtle`; подписи осей — моно label-sm `text-tertiary`.

**Правила:** ось X — по времени, не больше 6 меток (`xTicks`, мобильный — 3); у столбцов нулевая база; шкала Y — автоматические «круглые» деления или `yLeft` / `yRight`.

**Hover (`interactive`, по умолчанию вкл.):** указатель или касание — ближайшая точка: Chart crosshair (линии — точки серий, столбцы — полоса) + Chart tooltip (дата — `dates` / `times` или `labels`, значения — `series[].unit` / `format`); тултип справа от перекрестия, у края — слева или прижат к границе. Касание — остаётся до тапа вне графика. `index` / `onIndexChange` — управляемая точка.

**Доступность:** без hover — `role=img` + `aria-label`; интерактивный — `role=group` «график», в фокусе (кольцо `border/focus-ring`): ← / → — по точкам, Home / End — края, Enter — закрепить, Esc — скрыть; точка озвучивается `aria-live=polite` («23.06, 14:00, Хешрейт 14.6 TH/s, …»). Рядом — таблица данных или сводка. Линии серий 5–8 — пунктиром.

Классы: `emcd-chart-plot [--dual] [--skeleton] [--empty] [--disabled]`, `__axis`, `__tick`, `__area-box`, `__svg`, `__grid`, `__series--{1–8}`, `__bar`, `__line`, `__area`, `__x-row`, `__x`, `__empty`, `__bone`; hover — `emcd-chart-plot--interactive`, `__tooltip`, `__live`.

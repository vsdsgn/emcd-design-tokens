# Status summary

Сводка воркеров по статусам на дашборде майнинга: Отключённые → Нестабильные → Активные, плитка ведёт в «Воркеры» с фильтром.

**Ось (как в Figma «🟠 Status summary»):** Layout Column (Web, колонка у графика) · Row (Compact, ряд + «Все воркеры»); Show all link. Плитки — Stat card Align=Center, Tone Danger / Warning / Neutral, Link — стрелка.

**Правила:** порядок — проблемы первыми; подпись всегда (статус не только цветом). App — List item × 3 с Counter.

**Доступность:** стрелка плитки — Icon button с именем «Отключённые, 9».

Классы: `emcd-status-summary [emcd-status-summary--row]`, `__tiles`, `__tile`, `__all`.

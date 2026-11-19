# Calendar

Календарь выбора даты или периода (Datepicker): шапка «Месяц ГГГГ» со стрелками, строка дней недели, сетка 6 × 7 из Date cell.

**Ось (как в Figma «🟡 Calendar»):** Mode Single · Range. Date cell (атом, только внутри Calendar): State Default · Today · Selected · Range start · Range middle · Range end · Outside · Disabled (+ Hover / Pressed из платформы).

**Правила:** сегодня — обводкой (`border/accent`), заливка — только выбранное (`action/primary/default`); середина периода — `accent/subtle` без скругления; дни соседних месяцев — `text-tertiary`; недоступные (будущие для истории) — зачёркнуты, не нажимаются. Неделя — по локали (ru — с понедельника). Range: первый выбор — начало, второй — конец, раньше начала — меняются местами. Не делаем два календаря для начала и конца.

**Размещение:** Web — в Dropdown panel или Date range panel (`plain` — без своей подложки); Compact — в Sheet; App без диапазона — системный пикер.

**Доступность:** `role=grid`; стрелки — дни (в RTL ← и → меняются), PageUp / PageDown — месяцы (+ Shift — годы), Home / End — неделя, Enter / Space — выбрать, Esc — `onEscape`. День — полная дата («14 октября 2026, выбрано»), сегодня — `aria-current="date"`; кнопки месяцев с именем. RTL: сетка справа налево, стрелки листания отражены, цифры — нет.

Классы: `emcd-calendar [--plain]`, `__head`, `__nav`, `__month`, `__grid`, `__row`, `__weekdays`, `__weekday`, `__cell`; день — `emcd-date-cell [--today|--selected|--range-start|--range-middle|--range-end|--outside|--disabled]`.

# Date range panel

Панель выбора периода: слева пресеты («Сегодня», «7 дней», «30 дней», «Квартал», «Год», «Свой период»), справа Calendar Mode=Range, внизу «Сбросить» и «Применить». Открывается из Date range field.

**Ось (как в Figma «🟡 Date range panel»):** Presets On · Off (`presets`), Show reset (`showReset`). Поверхность `material/thick`, обводка `border/subtle`, `radius/control`, поле 12, зазор 16; Calendar внутри — без своей подложки.

**Правила:** пресет подставляет диапазон в календарь, выбор в календаре вне пресетов — «Свой период». Web — применение только по «Применить»; мобильный (Presets Off, в Sheet) — сразу по второй дате (`applyOnSelect`). Недоступные даты — Date cell Disabled, ограничение — в подсказке поля.

**Код:** `<DateRangeField panel />` — поле с встроенным поповером; отдельно — `<DateRangePanel onApply={…} onClose={…} />`.

**Доступность:** `role=dialog` «Период»; пресеты — `listbox` (↑ / ↓); календарь — `grid`; Esc — закрыть без применения, фокус возвращается на поле. RTL: пресеты справа, кнопки футера меняются местами.

Классы: `emcd-date-panel [--compact]`, `__presets`, `__column`, `__footer`, `__reset`.

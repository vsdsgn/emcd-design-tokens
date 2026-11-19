# Legend item

Элемент легенды графика: маркер серии + подпись (+ значение). Кликабельный — скрыть / показать серию.

**Оси (как в Figma «🟡 Legend item»):** Selected × State Default · Hover · Skeleton; Label, Value, Show value. Подпись label-md Medium: Default — `text-secondary`, Hover и Selected — `text-primary`; max-width 160.

**Правила:** порядок серий — как на графике; легенда — список `ul.emcd-legend`, зазор 16, перенос строк.

**Доступность:** кликабельный — `button` с `aria-pressed`; цвет не единственный носитель — подпись обязательна.

Классы: `emcd-legend`, `emcd-legend-item [emcd-legend-item--selected] [emcd-legend-item--interactive] [emcd-legend-item--skeleton]`, `__label`, `__value`, `__bone`.

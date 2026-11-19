# Chart metric

Показатель над графиком: подпись и крупное значение с единицей, при необходимости иконка слева.

**Ось (как в Figma «🟡 Chart metric»):** Tone Default · Danger · Warning · Success; Label, Value, Icon (+ Icon · swap), Unit, Show unit. Подпись body-sm `text-tertiary`; значение — display, heading-lg Bold (цвет по Tone); единица того же кегля `text-tertiary`; иконка 20 цвета значения.

**Правила:** Tone — смысл значения, не оценка; длинное число продукт сокращает до K / M / T. Ряд показателей — над графиком (Chart card) или через Divider Vertical.

**Доступность:** `role=group` с `aria-label` «Текущий хешрейт: 30.15 TH/s».

Классы: `emcd-chart-metric [emcd-chart-metric--{danger|warning|success}]`, `__label`, `__value-row`, `__icon`, `__value`, `__unit`.

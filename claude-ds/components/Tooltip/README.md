# Tooltip

Короткая подсказка к элементу на Web: что делает иконка, что значит термин, почему контрол неактивен, полный текст обрезанного значения. Без действий внутри.

**Оси (как в Figma «🟡 Tooltip»):** Placement Top · Bottom · Start · End × Tone Neutral · Accent × Arrow Center · Start · End; свойство Text.

**Когда какой:** Top — по умолчанию; не помещается сверху — Bottom; у бокового края и в вертикальной навигации — Start / End (стороны логические, в RTL Start справа). Arrow Center — уголок по центру элемента; Start / End — элемент у края или широкий (уголок не ближе 16 к углу). Tone Neutral — по умолчанию (`surface-raised`, обводка `border-default`); Accent — бренд (`surface-accent`, текст `text-on-accent`). Placement и Arrow выбирает позиционирование в коде (Floating UI: flip → shift → сбоку), не автор макета.

**Когда нет:** приложение и касание — Sheet по тапу на «i»; действия, ссылки, текст длиннее 3 строк — Popover; точка графика — Chart tooltip; онбординг — Tooltip tour. У Icon button тултип встроен.

**Правила:** текст `label-md`, до 320 px, переносится; грань с уголком ≥ 58 px. Уголок 26 × 9 — одна SVG-форма с пузырём, остриё в 8 px от элемента (отступ 17).

**Состояния:** своих нет. Показ — по наведению (после 500 мс в продукте) и сразу по фокусу с клавиатуры; Escape скрывает.

**Доступность:** `role="tooltip"`, триггер ссылается `aria-describedby`; не единственный носитель важной информации.

**Код:** React `<Tooltip text="…"><button …/></Tooltip>` — оборачивает триггер; без children — сам пузырь. В пакете позиционирование CSS-ом относительно триггера (без flip / shift); в продукте — Floating UI (`offset 17`, `flip`, `shift`, `arrow`).

Классы: `emcd-tooltip emcd-tooltip--{top|bottom|start|end} [emcd-tooltip--accent] [emcd-tooltip--arrow-{start|end}]`, уголок `emcd-tooltip__arrow`; обёртка триггера `emcd-tooltip-anchor [data-open]`.

# Transaction

Строка операции в истории: вывод, пополнение, начисление, обмен. Нажимается целиком — открывает детали.

**Оси (как в Figma «🟡 Transaction»):** Type Withdrawal · Deposit · Reward · Exchange × Status Completed · Pending · Failed × State Default · Hover · Pressed (36 вариантов; база `_List row`, Size M, высота 64).

**Когда какой:** Withdrawal — вывод (стрелка вверх); Deposit — пополнение (стрелка вниз); Reward — начисление за майнинг (молния); Exchange — обмен (две стрелки). Completed (19.11) — Status не показываем: справа сумма и фиат «≈ $…» (`fiat`), как в App «История»; Status — только у незавершённых: Pending — «В обработке» (warning); Failed — «Отклонено» (danger).

**Когда нет:** таблица операций на Web — Table row (Amount в ячейке); детали операции — Side panel или Sheet по нажатию на строку.

**Правила:** Leading — плашка `status-neutral-subtle` с иконкой типа; Label — действие и монета («Вывод BTC», «Обмен BTC → USDT»), одна строка; Description — дата; Trailing — Amount S со знаком: у Completed с фиатом, у Pending / Failed — без фиата + Status S. Знак: «−» у вывода, «+» у пополнения и начислений; у Failed и у обмена — без знака (баланс не растёт и не убывает). Не делаем: статус только цветом, отдельную кнопку «Подробнее» — нажимается вся строка.

**Состояния:** Hover / Pressed — слой `state-layer` 6 % / 10 %; Status — данные операции, не состояние строки.

**Доступность:** строка — `<button>` (или `<a>`) целиком; статус — точкой и словом.

Классы: `emcd-list-item emcd-list-item--m emcd-list-item--interactive emcd-tx emcd-tx--{withdrawal|deposit|reward|exchange} emcd-tx--{completed|pending|failed}`; плашка `emcd-tx__icon`; в Trailing — Amount и Status.

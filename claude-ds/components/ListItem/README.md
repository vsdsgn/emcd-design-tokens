# List item

Строка списка данных: монета, кошелёк, воркер, настройка. Слот Leading слева, тексты по Content, слот Trailing справа.

**Оси (как в Figma «🟡 List item»):** Size L · M × Content Text first · Description first · Big value · Description only × State Default · Hover · Pressed · Disabled. Свойства базы `_List row`: Label, Description, Show description (по умолчанию On; Off — строка из одного названия), Subvalue, слоты Leading и Trailing, Divider.

**Когда какой:** L — Web (текст 16 / 14, высота 76); M — Compact (14 / 12, высота 60). Text first — название, под ним описание; Description first — описание над названием; Big value — описание над крупным значением с единицей (Subvalue); Description only — одна строка. Hover / Pressed — только если строка открывает детали (`href` / `onClick`).

**Когда нет:** сравнение по многим колонкам на Web — Table; пункт меню — Menu item; операция в истории — Transaction; уведомление — Notification.

**Inset (19.11):** список внутри Card — `inset={false}`: строки без боковых полей и мин. высоты, высота по содержимому (M в одну строку — 48), край текста совпадает с краем заголовка карточки. Отдельный список на экране — с полями (по умолчанию).

**Правила:** в одном списке один Size. Сумма — в Trailing справа (Amount, `align="end"`); длинный адрес — сокращение в середине. Карточный список — List item внутри Card (Style = Card удалён). Не делаем: сумму слева, Hover у строки, которая ничего не открывает.

**Состояния:** Default без подложки; Hover / Pressed — слой `state-layer` 6 % / 10 % во всю ширину, разделитель остаётся; Disabled — тексты `text-disabled`, Leading погашен.

**Доступность:** интерактивная строка — `<a>` или `<button>` целиком; Disabled — `disabled` / `aria-disabled`. Кольцо фокуса — внутри строки.

Классы: `emcd-list-item [emcd-list-item--m] [emcd-list-item--{description-first|big-value|description-only}] [emcd-list-item--interactive] [emcd-list-item--divider] [emcd-list-item--flush] [emcd-list-item--disabled]`; внутри `emcd-list-item__leading`, `emcd-list-item__content` (`__label`, `__desc`, `__value-row` → `__value`, `__subvalue`), `emcd-list-item__trailing`. Список — `emcd-list`.

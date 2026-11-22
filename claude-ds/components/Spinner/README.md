# Spinner

> 22.11: в Figma — Progress circle · Mode=Indeterminate (Spinner, Progress circle и Circle timer слиты); размеры XS 16 · S 20 · M 24. В коде — `Spinner`.

Индикатор загрузки: действие идёт, длительность неизвестна.

**Оси (как в Figma «🟡 Spinner»):** Size S · M · L.

**Когда какой:** размер — по соседней иконке или тексту: S `icon-size-sm`, M `icon-size-control` (как иконка в контроле), L `icon-size-lg`. В кнопке — свойство Loading у Button, ширина кнопки не меняется.

**Когда нет:** загрузка данных — Skeleton; известная доля — Progress; линия во всю ширину блока — Progress Mode = Indeterminate.

**Правила:** один спиннер на блок; цвет — от родителя (`currentColor`, по умолчанию `text-primary`): дорожка 20 %, дуга 100 %. Дольше 10 с — добавить текст, что происходит. Не делаем: несколько спиннеров в блоке, свой цвет.

**Состояния:** нет. «Уменьшить движение» — вращение медленнее.

**Доступность:** `role="status"` + `aria-label` («Загрузка»); у родителя — `aria-busy`.

Классы: `emcd-spinner [emcd-spinner--{m|l}]`.

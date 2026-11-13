# Radio

Выбор одного варианта из нескольких, когда все варианты видны.

**Оси (как в Figma «🟡 Radio»):** Status — Off · On; Tone — Default · Danger; Size — M · S; Control position — Start (по умолчанию) · End (в RTL зеркалится); State — Default · Hover · Pressed · Disabled. Свойства: Label, Description.

**Когда какой:** Size M — подпись 16/24 (формы, настройки); S — 14/20 (плотные списки); круг 20, точка 8 в обоих. Tone · Danger — в группе ничего не выбрано, а выбор обязателен; текст ошибки — под группой. Control position · End — строки настроек; в одной группе — одинаково.

**Когда нет:** несколько независимых вариантов — Checkbox; 2–4 режима в ряд — Segmented; вариантов больше семи — Select.

**Правила:** в группе всегда выбран один вариант, если выбор обязателен; порядок — от частого к редкому. Строка ≤ 480 px, подпись переносится.

**Состояния:** как у Checkbox — слой `state-layer` 6 % / 10 % на круге, Pressed — масштаб 0.96.

**Доступность:** группа — `<fieldset>` с `<legend>` или `role="radiogroup"` с именем; стрелки переключают внутри группы, Tab — выходит из неё; фокус — кольцо 2 px с зазором 2 px на круге.

Классы: строка — как у Checkbox, `emcd-check [emcd-check--s] [emcd-check--end] [emcd-check--danger]` с `<input type="radio">`; группа — `emcd-radio-group`.

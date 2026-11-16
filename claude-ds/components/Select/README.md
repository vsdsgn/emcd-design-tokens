# Select

Поле выбора одного значения из списка (сеть вывода, кошелёк, монета, валюта). Поле как у Input, справа шеврон; по нажатию — Menu под полем (на Compact — Sheet).

**Оси (как в Figma «🟡 Select»):** Size M · L · XL × State Default · Hover · Open · Filled · Error · Disabled · Loading · Skeleton; лейбл, helper, плейсхолдер, значение и Show leading — у вложенного Input.

**Когда какой:** Size = размер соседних полей формы (тот же, что у Input рядом). Default — пусто, плейсхолдер «Выберите …»; Filled — значение выбрано; Error — ошибка выбора, сообщение вместо helper; Loading — варианты грузятся (спиннер перед шевроном); Skeleton — форма грузится. Монета / сеть выбранного значения — в слот Leading (Coin).

**Когда нет:** 2–4 варианта — Segmented / Radio; ввод с подсказками — Input + Menu (combobox); множественный выбор — Multiselect.

**Правила:** 5+ вариантов или длинные названия. Лейбл всегда сверху. Ширина Menu = ширине поля; выбранный пункт — галочка. Не делаем: ввод текста в поле Select, множественный выбор, Menu уже или шире поля, лейбл сбоку или внутри.

**Состояния:** Hover — обводка `control-border-hover` + слой 6 %; Open — рамка `control-border-focus`, шеврон вверх; Error — `control-border-error`, helper `text-danger`; Disabled — фон `control-surface-disabled`, тексты и шеврон погашены; Skeleton — `skeleton-base`.

**Доступность:** кнопка `role="combobox"` + `aria-haspopup="listbox"`, `aria-expanded`, `aria-controls`; список `role="listbox"`, пункты `role="option"` + `aria-selected`; активный — `aria-activedescendant`. ↓ / ↑ / Enter / Пробел открывают, стрелки и Home / End двигают, Enter выбирает, Escape и Tab закрывают; клик вне — закрыть.

Классы: база поля Input — `emcd-field [emcd-field--{l|xl}] [emcd-field--{error|disabled|skeleton}]`, `emcd-field__label`, `emcd-field__hint`; `emcd-select [emcd-select--open]` → `emcd-input emcd-select__trigger` (`emcd-input__leading`, `emcd-select__value [emcd-select__value--placeholder]`, `emcd-select__chevron`) и Menu `emcd-select__menu`.

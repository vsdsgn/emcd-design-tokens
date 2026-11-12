# Input

Поле для одной строки текста или числа.

**Оси (как в Figma «🟡 Input»):** Size — M 40 · L 48 · XL 56; Label position — On border · Above; State — Default · Hover · Focus · Error · Disabled · Read-only · Loading · Skeleton. Свойства: Label, Value, Helper, Counter, слоты Leading · Inline · Trailing.

**Когда какой:** M — Web по умолчанию; L — App и мобильный веб; XL — онбординг, главный шаг. Рядом с кнопкой — тот же размер (Input M ↔ Button M). On border — короткая подпись в разрыве рамки, компактные формы; Above — подпись над полем, длинные подписи и формы с пояснениями. В одной форме — одно положение.

**Когда нет:** несколько строк — Textarea; выбор из списка — Select; сумма с валютой — Input amount; пароль — Password field.

**Слоты:** Leading — иконка или монета; Inline — суффикс, единица («USDT»); Trailing — действие (Icon button), «Max», спиннер. Значение — одна строка, обрезка многоточием.

**Правила:** подпись есть всегда, плейсхолдер её не заменяет. Helper — подсказка под полем, переносится; Counter — лимит символов, прижат к концу. Ошибка — текст в Helper: что не так и как исправить. Ширина 160–480 px.

**Состояния:** Hover — слой `state-layer` 6 %; Focus — рамка `control-border-focus`, с клавиатуры ещё кольцо 2 px с зазором 2 px; Error — рамка `control-border-error`, Helper `text-danger`; Disabled — фон `control-surface-disabled`, тексты `text-disabled`; Read-only — тот же фон, рамка `border-subtle`, значение читается и копируется; Loading — спиннер в конце; Skeleton — `skeleton-base`.

**Доступность:** нативный `<input>` с `<label>`; Error — `aria-invalid` и `aria-describedby` на Helper; `readonly` и `disabled` — нативные атрибуты; статус не только цветом.

Классы: `emcd-field [emcd-field--{l|xl}] [emcd-field--on-border] [emcd-field--{error|disabled|readonly|skeleton}]`; внутри — `emcd-field__label`, `emcd-input` (`emcd-input__leading`, `input`, `emcd-input__suffix`, `emcd-input__trailing`), `emcd-field__hint`, `emcd-field__counter` (вместе — в `emcd-field__row`).

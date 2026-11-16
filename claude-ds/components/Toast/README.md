# Toast

Краткое всплывающее сообщение поверх страницы — отклик на действие («Настройки сохранены», «Вывод создан»). Исчезает само.

**Оси (как в Figma «🟡 Toast»):** Layout Card · Informer × Tone Info · Success · Warning · Danger · Neutral; свойства Title, Show title, Description, Show description, Actions, Close, Icon, Timer, Safe area.

**Когда какой:** Card — Web, справа сверху: иконка тона, заголовок, необязательные описание и кнопки; Informer — App, сверху под статус-баром: полоса тона на всю ширину, заголовок и крестик. Success — выполнено; Info — справка о фоновой операции (цвет бренда); Warning — выполнено с оговоркой; Danger — не выполнено; Neutral — без оценки, у Card без иконки. Timer — Circle timer у крестика: сколько осталось до автоскрытия. Safe area — только Informer.

**Когда нет:** сообщение должно остаться на странице — Suggest; блокирующий вопрос — Modal; событие без участия пользователя — Notification.

**Правила:** не больше 3 Toast одновременно (стек `emcd-toast-stack`); Informer не используется на Web; описание и кнопки — только у Card; кнопки — Button S. Close по умолчанию включён.

**Состояния:** своих нет; появление, пауза при наведении и автоскрытие (`duration`) — поведение. Card — overlay surface (`surface-raised`, обводка `border-subtle`, тень Elevation/2); Informer — заливка `status-*-solid` (Info — `control-checked`, Neutral — `surface-inverse`), текст `text-on-accent` / `text-on-warning` / `text-inverse`.

**Доступность:** `role="status"` (`aria-live="polite"`); Danger — `role="alert"`. Крестик — Icon button с `aria-label`. Автоскрытие ставится на паузу при наведении; важное действие не прячется только в Toast.

Классы: `emcd-toast [emcd-toast--informer] [emcd-toast--{success|warning|danger|neutral}] [emcd-toast--safe-area]`; внутри `emcd-toast__icon`, `emcd-toast__content` (`emcd-toast__title`, `emcd-toast__desc`, `emcd-toast__actions`), `emcd-toast__tools` (`emcd-toast__timer`, `emcd-toast__close`); стек — `emcd-toast-stack`.

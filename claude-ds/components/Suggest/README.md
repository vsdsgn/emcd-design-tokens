# Suggest

Сообщение или предложение внутри страницы: карточка или полоса — иконка слева, заголовок, описание, 0–2 кнопки, крестик. Заменяет Alert и Banner.

**Оси (как в Figma «🟡 Suggest»):** Layout Card · Strip × Tone Neutral · Accent · Success · Warning · Danger; свойства Title, Show title, Description, Show description, Show leading, слот Leading, Primary action, Secondary action, Close.

**Когда какой:** Card — в колонке или карточке, кнопки под текстом; Strip — вверху страницы на всю ширину, кнопки в строку справа. Neutral — по умолчанию (`surface-raised`); Accent — предложение и информационное объявление (`accent-subtle`; тона Info нет — Info = цвет бренда); Success / Warning / Danger — системное объявление (`status-*-subtle`). Leading — по умолчанию иконка тона; можно логотип продукта или монету (Coin).

**Когда нет:** краткий отклик на действие — Toast; блокирующий вопрос — Modal; промо с картинкой — Promo card.

**Правила:** 0, 1 или 2 кнопки (Button S); вторая без первой не включается. Основная кнопка: на Neutral — Secondary, на Accent и тонах — Primary (на тонированной подложке Secondary сливается). Вторая — Tertiary outline. Хотя бы одно из Title / Description. Close — если сообщение можно скрыть. Не делаем: больше двух кнопок, автоскрытие по таймеру.

**Состояния:** своих нет: показан, пока причина не устранена, или скрыт крестиком. Hover / Pressed / Focus — у вложенных кнопок.

**Доступность:** `<section>`; крестик — Icon button с `aria-label`; тон дублируется иконкой и текстом.

Классы: `emcd-suggest [emcd-suggest--strip] [emcd-suggest--{accent|success|warning|danger}] [emcd-suggest--no-close]`; внутри `emcd-suggest__leading`, `emcd-suggest__content` (`emcd-suggest__text` → `emcd-suggest__title`, `emcd-suggest__desc`; `emcd-suggest__actions`), `emcd-suggest__close`.

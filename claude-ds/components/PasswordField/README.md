# Password field

Поле пароля с кнопкой показа символов («глаз») и списком требований, которые отмечаются по мере ввода.

**Оси (как в Figma «🟡 Password field»):** State Default · Hover · Focus · Filled · Error · Disabled; свойство Show requirements.

**Когда какой:** Show requirements On — создание и смена пароля; Off — вход (только поле и «Забыли пароль?»). Default — поле пустое, все требования с прочерком; Focus — ввод, выполненные отмечаются сразу; Filled — все выполнены; Error — пароль не прошёл проверку: только после отправки или ухода из поля, не на каждый символ; Disabled — ввод недоступен.

**Когда нет:** одноразовый код и PIN — Code input.

**Правила:** требования видны сразу, до ввода; «глаз» — всегда (Icon button Ghost S в слоте Trailing, `eye` ↔ `eye-off`). Ширина — `size-field-min` … `size-field-max`. Не делаем: ошибку на каждый символ, требования только после ошибки, запрет вставки и менеджеров паролей, «выполнено» только цветом.

**Состояния:** поле — как у Input (Hover — слой 6 %, Focus — рамка `control-border-focus`, Error — `control-border-error` и сообщение «Пароль не соответствует требованиям»); требование: прочерк + `text-secondary` → галочка + `text-success`; Disabled — `text-disabled` / `icon-disabled`.

**Доступность:** `autocomplete="new-password"` (создание) / `current-password` (вход); «глаз» — `aria-label` «Показать / Скрыть пароль» + `aria-pressed`; список требований — `aria-live="polite"`, у каждого скрытый текст «выполнено / не выполнено».

Классы: `emcd-password [emcd-password--disabled]` → поле Input (`emcd-field …`), `emcd-password__reqs` → `emcd-password__req [emcd-password__req--met]`; скрытый текст — `emcd-sr`.

# Avatar

> 22.11: в Figma Avatar включает монеты (Type=Coin) и одну шкалу Size: 2XS 16 · XS 20 · S 24 · M 32 · L 40 · XL 56 (прежние XS 20 · S 32 · M 40 · L 56 → XS · M · L · XL). В коде — `Avatar` (люди) и `Coin` (монеты).

Круглое изображение пользователя, субаккаунта или контрагента: инициал, иконка или фото.

**Оси (как в Figma «🟡 Avatar»):** Size XS 20 · S 32 · M 40 · L 56 × Type Text · Icon · Image × State Default · Skeleton; свойства Initials, Status.

**Когда какой:** Image — есть фото; Text — фото нет, известно имя (одна заглавная буква); Icon — нет ни фото, ни имени. XS — строки таблиц и чипы; S — списки и шапка; M — карточки; L — профиль. Status — точка «в сети» (`status-success-solid`), только где присутствие имеет смысл (чат поддержки, команда).

**Когда нет:** монета и сеть — Coin; устройство и раздел — Icon; несколько аватаров стопкой — Avatar group.

**Правила:** фон `status-neutral-subtle`, у Icon — `accent-subtle`; обводка точки — цветом текущей поверхности (`surface-current`). Не делаем: две буквы, цвет фона как носитель смысла, квадратную форму, нажатие без обёртки-кнопки.

**Состояния:** Default; Skeleton — круг `skeleton-base` того же размера. Нажимаемый аватар — внутри Button / Icon button / строки списка: фокус и зона нажатия у обёртки.

**Доступность:** фото — `alt`; инициал — `role="img"` + `aria-label` с именем; точка «в сети» — с подписью.

Классы: `emcd-avatar [emcd-avatar--{s|m|l}] [emcd-avatar--icon] [emcd-avatar--skeleton]`; внутри `emcd-avatar__circle`, `emcd-avatar__status`.

# EMCD DS 2.0 — design.md (2026-11-13)

Для агента, который собирает или проверяет интерфейс EMCD. Короткая выжимка правил; подробности — по ссылкам.
Собрано `scripts/agent-docs.mjs`: таблица выбора компонента — из манифеста Figma и контрактов, остальное — текст в скрипте. Править там, не здесь.

## 1. Принципы

1. **Система, а не UI kit.** Одна задача — один способ. У каждого варианта жёсткое правило применения; если правило не подходит — не изобретать вариант, а взять другой компонент.
2. **Только семантические токены.** Примитивы (`color/*`, `dimension/*`) приватны. Значение без токена — только из списка `docs/exceptions.md`.
3. **Оси вместо копий.** Brand (EMCD · Geometria · WL Default) × Theme (Light · Dark) × Platform (Web · Mobile web · iOS · Android) × Viewport (Compact … XLarge) × Style (Base · Expressive) + уровень поверхности L0–L3. Компонент один; разницу дают режимы токенов.
4. **Одна модель состояний** для всех компонентов (раздел 4). Hover / Pressed не подбираются цветом на глаз.
5. **Статус решает, можно ли брать.** beta — в макеты и разработку; draft — не брать; stable — сверен с кодом. Сейчас: beta 95, draft 22, stable 0.
6. **Доступность — часть компонента:** кольцо фокуса, зона нажатия ≥ `touch/min` (Web 24, касание 44), контраст WCAG 2.2 AA, статус — никогда только цветом.
7. **Style: Base по умолчанию.** Expressive (свечения, материалы, кромки) — только pool и Monitoring на мощных устройствах; правила — `docs/style.md`.

## 2. Роли цвета (коллекция Theme)

| Группа | Роль | Правило |
|---|---|---|
| `bg/*` | фон страницы | `bg/base` = L0 |
| `surface/level-0…3` | уровни поверхностей | уровни отделяются подложкой, не обводкой; контрол — на уровень выше подложки; `surface/current` — уровень под компонентом (`data-surface="0..3"`) |
| `surface/raised`, `surface/overlay` | плавающие поверхности | меню, поповеры, модалки — через `_Overlay surface` |
| `text/*`, `icon/*` | текст и иконки | primary — сплошной; secondary 72 %, tertiary 56 %, disabled 40 %; цветной текст (`text/accent`, `text/danger` …) — на L0–L2, на L3 не ставить |
| `border/*` | обводки и разделители | `subtle` · `default` · `strong` (≥ 3:1); фокус — `border/focus-ring`, нейтральный |
| `action/*` | заливки действий | primary · secondary · tertiary · danger · inverse · accent · disabled. Primary — на L0–L2, Secondary — на L0–L1 |
| `control/*` | поля и контролы выбора | `control/surface/*`, `control/border/*`, `control/checked` |
| `status/*` | success · warning · danger · info · neutral | `subtle` (плашка) · `border` · `solid` · `on-subtle` (текст); рядом всегда иконка или подпись |
| `accent/*`, `highlight/*` | бренд | акцент и супер-акцент; выбранное — `accent/subtle` + `text/accent` |
| `data/1–8` | серии графиков | не брать брендовые и статусные цвета для данных |
| `state/layer`, `state/layer-inverse` | слой состояния | см. раздел 4 |
| `skeleton/*`, `scrollbar/*`, `fade/*`, `shadow/*` | служебные | — |
| `fixed/*` | не зависит от темы | текст на изображениях, промо |
| `glow/*` и коллекция Style | декор Expressive | только там, где Style = Expressive |

Размеры, отступы, радиусы, типографика — коллекции Platform и Viewport: `control/height/*` (S 32 · M 40 · L 48 · XL 56), `space/*`, `radius/*` (по роли: `radius/control`, `radius/container`), `type/*`, `icon/size/*`.

## 3. Уровни поверхностей

L0 — страница; L1 — карточка / секция; L2 — вложенный блок; L3 — последний. Глубже L3 не вкладывать.
Обводки и плашки полупрозрачные: контраст к своему уровню одинаков на L0–L3 в обеих темах. Подробнее — `docs/components.md` «Уровни поверхностей».

## 4. Модель состояний

| Группа | Hover | Pressed | Disabled | Selected |
|---|---|---|---|---|
| Плашка (Button, Icon button, Chip, Segment, строки списков) | слой `state/layer` × `state/hover` 6 % | слой × `state/pressed` 10 %; у кнопок ещё масштаб 0.96 | токены `*/disabled`, без Hover | `accent/subtle` + `text/accent` |
| На тёмной или цветной плашке (Inverted, Primary, выбранный Chip) | слой `state/layer-inverse` | то же | как выше | — |
| Поле (Input, Textarea, Select …) | слой, обводка остаётся `control/border/default` | нет | как выше | Focus — `control/border/focus` + кольцо |
| Контрол выбора (Checkbox, Radio, Toggle) | слой на глифе 6 % | 10 % + 0.96 | 8 % / ползунок 40 % | `control/checked` |
| Навигация (Tab, Nav item, Tab bar item) | слой / цвет текста | — | `*/disabled` | индикатор `border/accent` |
| Текстовый (Text-кнопка, ссылка, Breadcrumb) | цвет текста | цвет текста | `text/disabled` | — |

- В коде слой — один `::before`: `background: var(--state-layer); opacity: var(--state-hover)` (в CSS `--state-hover: 0.06`, `--state-pressed: 0.1`; во Flutter-JSON — проценты 6 и 10).
- Движение: 120 мс `motion/duration/feedback`, `motion/easing/standard`; «уменьшить движение» — длительности ≈ 0, без масштаба. Кольцо фокуса — сразу, только с клавиатуры.
- Hover — только с указателем; на касании Hover нет, Pressed остаётся; хаптик `haptic/press` — iOS, Android, Mobile web.
- Загрузка: < 300 мс — ничего; до 1 с — Spinner на месте действия; дольше — Skeleton в форме контента; действие — кнопка в Loading.
- Источник: `docs/components.md` «Модель состояний», `docs/components/service-layers.md`, `docs/motion.md`.

## 5. Как выбрать компонент

Сначала задача, потом компонент:

- Запустить действие → **Button**; то же без подписи, узнаваемой иконкой → **Icon button**; действие внутри строки текста → Button Type=Text.
- Ввести строку → **Input**; несколько строк → **Textarea**; единица, «Max», шеврон, степпер внутри поля → **Input addon / …** в слоте поля.
- Выбрать несколько независимых → **Checkbox**; один из 2–5 → **Radio**; включить настройку сразу, без «Сохранить» → **Toggle**.
- Фильтр или вариант из видимого набора → **Chip**; режим или период из 2–4 → Segmented (элемент — **Segment**); разделы одного экрана → Tabs (элемент — **Tab**).
- Основные разделы продукта на Compact → Tab bar (элемент — **Tab bar item**); путь назад по уровням → Breadcrumbs (элемент — **Breadcrumb item**).
- Пометка-свойство («Новое», «Beta») → **Badge**; количество → **Counter**; состояние, которое обновляется само (online / offline) → **Status**.

Компоненты, которые можно брать (beta):

| Компонент | Что это | Когда | Когда нет |
|---|---|---|---|
| [Accordion](docs/components/accordion.md) | — | вторичная информация, FAQ, длинные настройки | основное содержимое экрана; один пункт — обычный блок |
| [Address](docs/components/address.md) | — | не описано | ввод адреса — Input с проверкой сети |
| [Amount](docs/components/amount.md) | Денежная сумма: число, тикер и необязательный фиатный эквивалент. Единый способ показать сумму в продукте | баланс, сумма операции, доход, цена — в карточках, строках списков и таблиц, шапках экранов | поле ввода суммы — Input amount; изменение в процентах — Badge или Chart metric; число без валюты — обычный текст |
| [Avatar](docs/components/avatar.md) | Круглое изображение пользователя, субаккаунта или контрагента: инициал, иконка или фото | пользователь, субаккаунт, контрагент — в шапке, списках, карточках | монета и сеть — Coin; устройство и раздел — Icon; несколько аватаров стопкой — Avatar group |
| [Avatar group](docs/components/avatar-group.md) | — | не описано | не описано |
| [Badge](docs/components/badge.md) | Неинтерактивная метка статуса или свойства («Активен», «Новое», «−5 %», монета). Нажать нельзя | статус строки или карточки, пометки «Новое», «Beta» | действие — Button / Chip; количество — Counter; длинный текст — Alert; состояние, которое обновляется само, — Status |
| [Counter](docs/components/counter.md) | Число рядом с табом, пунктом меню или иконкой (уведомления). Не статус | количество непрочитанного или элементов в разделе | суммы и проценты — текст или Badge; статус — Badge / Status |
| [Breadcrumb item](docs/components/breadcrumb-item.md) | Пункт хлебных крошек: ссылка на предыдущий уровень; Current — текущая страница, не ссылка | только внутри Breadcrumbs | переход между разделами — Nav item или Tabs; действие в тексте — Button Type=Text |
| [Breadcrumbs](docs/components/breadcrumbs.md) | — | 3+ уровня вложенности | плоская навигация, App и Compact — там «назад» в Top bar |
| [Button](docs/components/button.md) | Кнопка действия. Основа — legacy `baseButton` (DS Web + App), доведена до правил 2.0 | запуск действия: отправить, сохранить, отменить, удалить | переход на другую страницу в тексте — ссылка; действие иконкой без подписи — Icon button; выбор варианта — Chip / Segmented |
| [Card](docs/components/card.md) | — | не описано | не описано |
| [Chart axis label](docs/components/chart-axis-label.md) | — | подписи осей графиков (время, значение) | значения данных на самом графике — Chart tooltip |
| [Chart crosshair](docs/components/chart-crosshair.md) | — | линия или полоса выбранной точки при наведении или выборе стрелками | выделение столбца без перекрестия — Chart plot, состояние Hover |
| [Chart metric](docs/components/chart-metric.md) | — | ключевое значение над графиком (текущий хешрейт, прибыль) | список показателей — Key-value row; карточка с динамикой — Stat card |
| [Chart tooltip](docs/components/chart-tooltip.md) | — | значения серий в выбранной точке графика | пояснение элемента интерфейса — Tooltip |
| [Checkbox](docs/components/checkbox.md) | Множественный выбор, согласие с условиями, выбор строк таблицы. Основа — legacy `baseCheckbox` (коробочка 20, r 6, подпись через 12) | несколько независимых вариантов, согласие, «выбрать все» | мгновенное включение настройки — Toggle; один из нескольких — Radio |
| [Checkbox group](docs/components/checkbox-group.md) | — | не описано | не описано |
| [Chip](docs/components/chip.md) | Фильтр или выбор варианта из набора, который видно целиком (сроки «90 / 180 / 360 дней», монеты, статусы в фильтре) | несколько вариантов в ряд или с переносом, выбор одного или нескольких; выбранные фильтры с крестиком | режим или период из 2–4 — Segmented; разделы — Tabs; неинтерактивная метка — Badge |
| [Circle timer](docs/components/circle-timer.md) | — | автоскрытие Toast, повторная отправка кода, ограничение по времени | загрузка без срока — Spinner; прогресс выполнения — Progress |
| [Code cell](docs/components/code-cell.md) | — | не описано | не описано |
| [Code input](docs/components/code-input.md) | — | не описано | не описано |
| [Coin](docs/components/coin.md) | — | список монет, выбор монеты, суммы, история операций | иконка действия (icon/*) или фиатный знак |
| [Coin stack](docs/components/coin-stack.md) | — | несколько монет в одной строке (мультивыбор, майнинг нескольких монет) | одна монета — Coin |
| [Date cell](docs/components/date-cell.md) | — | не описано | не описано |
| [Date range field](docs/components/date-range-field.md) | — | выгрузки, фильтры по периоду, отчёты | одна дата — Input с календарём; быстрый выбор («7 дней», «30 дней») — Chip или Segmented |
| [Divider](docs/components/divider.md) | — | разделить группы без карточек | между каждой строкой списка — хватает отступов |
| [Floating button](docs/components/floating-button.md) | — | одно частое действие на экране-списке | на Web — Button в шапке страницы; больше одного действия; форма — кнопка внизу формы |
| [Icon button](docs/components/icon-button.md) | Кнопка-иконка: закрыть, «…», копировать, фильтр, обновить. Та же основа, что у Button | частое узнаваемое действие без подписи; тулбары, строки таблиц, шапки | действие, которое не читается по иконке, — Button с подписью |
| [Input](docs/components/input.md) | — | одна строка текста или числа | несколько строк — Textarea; выбор из списка — Select; сумма с валютой — Input amount; пароль — Password field |
| [Input addon / Unit](docs/components/input-addon-unit.md) | Единицы или валюта в suffix поля (USDT, TH/s, %, kW) | поле с числом, у которого единица фиксирована | выбор единицы — Select compact в trailing-слоте; подпись поля — Label у Input |
| [Input addon / Max](docs/components/input-addon-max.md) | Кнопка «Max» в suffix поля суммы: подставляет весь доступный остаток | поле суммы с известным максимумом (вывод, обмен, депозит) | любое другое действие в поле — Icon button в trailing-слоте |
| [Input addon / Chevron](docs/components/input-addon-chevron.md) | Шеврон для Select / Dropdown в trailing-слоте поля | поле, которое открывает список (Select) | раскрытие аккордеона или строки — своя иконка этих компонентов |
| [Input addon / Stepper](docs/components/input-addon-stepper.md) | Степпер − / + для числового поля | небольшое целое число с шагом (количество, проценты) | сумма с произвольным вводом — поле без степпера; диапазон — Slider |
| [Input addon / Counter](docs/components/input-addon-counter.md) | Счётчик «+N» в inline-слоте: сколько ещё значений выбрано в мультиселекте | мультиселект, в котором выбранные значения не помещаются в поле | количество в табах и меню — Counter; лимит символов — счётчик Textarea |
| [Input addon / Clear](docs/components/input-addon-clear.md) | — | не описано | не описано |
| [Input addon / Icon](docs/components/input-addon-icon.md) | — | не описано | не описано |
| [Input amount](docs/components/input-amount.md) | — | суммы вывода/перевода с монетой и Max | обычное число — Input |
| [Legend item](docs/components/legend-item.md) | — | легенда графика; кликабельная — скрыть/показать серию. Серия никогда не только цветом: подпись обязательна | не описано |
| [Legend swatch](docs/components/legend-swatch.md) | — | маркер серии в легенде и тултипе | индикатор статуса — Status |
| [Menu item](docs/components/menu-item.md) | — | не описано | не описано |
| [Multiselect option](docs/components/multiselect-option.md) | — | пункты списка с множественным выбором (сети, монеты, воркеры) | независимые переключатели в форме — Checkbox |
| [Multiselect](docs/components/multiselect.md) | — | фильтры, выбор нескольких сетей, монет или воркеров | 2–4 варианта — Checkbox group; один вариант — Select |
| [Nav item](docs/components/nav-item.md) | — | пункт основной навигации в сайдбаре (Web) | переключение внутри страницы — Tabs; в App и на Compact — Tab bar item |
| [Notification](docs/components/notification.md) | — | не описано | реакция на действие пользователя сейчас — Toast |
| [Overlay](docs/components/overlay.md) | — | за Modal, Sheet и Side panel, под Dropdown panel на мобильном | внутри страницы, для выделения блока — Card |
| [Page dot](docs/components/page-dot.md) | — | не описано | не описано |
| [Page indicator](docs/components/page-indicator.md) | — | 2–5 слайдов | больше 5 — счётчик «3 / 12»; шаги процесса — Stepper / Step progress |
| [Pagination](docs/components/pagination.md) | — | длинные таблицы на Web (воркеры, выплаты, устройства), когда важно знать позицию и прыгать по страницам | ленты на Compact — «Показать ещё» / бесконечная прокрутка; < 2 страниц — не показываем |
| [Pagination item](docs/components/pagination-item.md) | — | не описано | не описано |
| [Password field](docs/components/password-field.md) | — | не описано | вход в аккаунт — без требований, только поле и «Забыли пароль?» |
| [Key-value row](docs/components/key-value-row.md) | — | не описано | не описано |
| [Progress](docs/components/progress.md) | — | известно «сколько из скольких» | неизвестная длительность — Spinner; загрузка контента — Skeleton; шаги мастера — Stepper |
| [Progress circle](docs/components/progress-circle.md) | — | не описано | не описано |
| [Spinner](docs/components/spinner.md) | — | действие идёт, длительность неизвестна, короткое (в кнопке, в блоке) | загрузка данных — Skeleton |
| [Promo card](docs/components/promo-card.md) | — | предложение продукта или акции в сайдбаре и на экране («Нет оборудования? Получи каталог») | системное сообщение, объявление или предупреждение — Suggest; отклик на действие — Toast |
| [Radio](docs/components/radio.md) | Один вариант из нескольких (2–5). Основа — legacy `baseRadio` (круг 20, точка 8, подпись через 12) | один выбор из 2–5 видимых вариантов; всегда группой, один выбран по умолчанию, если это безопасно | больше вариантов — Select; переключение вида — Segmented; одиночное «да / нет» — Checkbox или Toggle |
| [Radio card](docs/components/radio-card.md) | — | выбор одного из нескольких вариантов с пояснением (расписание выгрузки, тариф, способ вывода) | короткий выбор без пояснений — Radio group; 2–4 варианта-переключателя — Segmented |
| [Radio group](docs/components/radio-group.md) | — | не описано | не описано |
| [Scrollbar](docs/components/scrollbar.md) | — | Web, где системный скроллбар ломает вид (тёмные панели, списки в оверлеях) | App и мобильный веб — системный оверлей-скроллбар; основная страница — системный |
| [Segment](docs/components/segment.md) | Элемент Segmented. Отдельно не используется | только внутри Segmented (режим или период из 2–4) | фильтры — Chip; разделы экрана — Tab |
| [Segmented](docs/components/segmented.md) | — | режим или фильтр-значение внутри карточки, виджета, формы | разделы экрана — Tabs; больше 4 вариантов или длинные подписи — Select; множественный выбор — Chip |
| [Select](docs/components/select.md) | — | 5+ вариантов или длинные названия | 2–4 варианта — Segmented/Radio; ввод с подсказками — Input + Menu (combobox); множественный выбор — Multiselect |
| [Select compact](docs/components/select-compact.md) | — | значение выбирается «на месте», рядом с суммой или заголовком | поле формы с лейблом и ошибкой — Select |
| [Skeleton](docs/components/skeleton.md) | — | загрузка данных, форма известна | идёт действие — Loading у кнопки |
| [Stat card](docs/components/stat-card.md) | — | одно ключевое число с подписью и динамикой (хешрейт, доход) | несколько чисел для сравнения — Table / List |
| [Status](docs/components/status.md) | Точка + подпись: состояние объекта (воркер, устройство, сервис, выплата) в строке таблицы, списке, шапке | состояние, которое обновляется само (online / offline) | метка-свойство или промо — Badge; сообщение — Alert / Toast |
| [Dot](docs/components/dot.md) | — | не описано | не описано |
| [Step progress](docs/components/step-progress.md) | — | линейная последовательность 3–7 шагов без названий | шаги с названиями — Stepper |
| [Step segment](docs/components/step-segment.md) | — | не описано | не описано |
| [Step symbol](docs/components/step-symbol.md) | — | не описано | не описано |
| [Step trail](docs/components/step-trail.md) | — | не описано | не описано |
| [Step](docs/components/step.md) | — | не описано | не описано |
| [Tab](docs/components/tab.md) | Переключение разделов одного экрана (История: Начисления / Выплаты / Воркеры). Выбранный — подчёркивание | 2–7 разделов одного уровня, контент меняется под табами | выбор значения или режима в форме — Segmented; фильтр списка — Chip; переход на другой экран — навигация |
| [Tab bar item](docs/components/tab-bar-item.md) | Пункт нижней навигации: иконка 24 + подпись. App и мобильный веб — одна схема | основные разделы продукта на Compact, 3–5 пунктов | подразделы экрана — Tabs; больше 5 разделов — пятый пункт «Ещё» со списком |
| [Table header cell](docs/components/table-header-cell.md) | — | не описано | не описано |
| [Table cell / Text](docs/components/table-cell-text.md) | — | не описано | не описано |
| [Table cell / Date time](docs/components/table-cell-date-time.md) | — | не описано | не описано |
| [Table cell / Coin](docs/components/table-cell-coin.md) | — | не описано | не описано |
| [Table cell / Transaction](docs/components/table-cell-transaction.md) | — | не описано | не описано |
| [Table cell / Image](docs/components/table-cell-image.md) | — | не описано | не описано |
| [Table cell / Progress](docs/components/table-cell-progress.md) | — | не описано | не описано |
| [Table cell / Avatar](docs/components/table-cell-avatar.md) | — | не описано | не описано |
| [Table cell / Badge](docs/components/table-cell-badge.md) | — | не описано | не описано |
| [Table cell / Toggle](docs/components/table-cell-toggle.md) | — | не описано | не описано |
| [Table cell / Icon](docs/components/table-cell-icon.md) | — | не описано | не описано |
| [Table cell / Buttons](docs/components/table-cell-buttons.md) | — | не описано | не описано |
| [Table cell / More](docs/components/table-cell-more.md) | — | не описано | не описано |
| [Table row](docs/components/table-row.md) | — | не описано | не описано |
| [Table cell / Status](docs/components/table-cell-status.md) | — | колонка «Имя и статус», «Статус» в таблицах | значение-бейдж с фоном — Table cell / Badge |
| [Tabs](docs/components/tabs.md) | — | 2–7 разделов одного контекста | фильтры — Chip / Segmented; основная навигация — Nav item / Tab bar |
| [Textarea](docs/components/textarea.md) | — | текст длиннее одной строки (комментарий, обращение) | одна строка — Input |
| [Toggle](docs/components/toggle.md) | Переключатель: мгновенно включает настройку, без «Сохранить». Основа — legacy `baseToggle` (дорожка 48×28 / 40×24, ползунок 20 / 16) | настройка применяется сразу (уведомления, автовывод, 2FA-подтверждения) | нужна кнопка «Сохранить» или отложенное применение — Checkbox; выбор одного из вариантов — Radio / Segmented |
| [Toggle group](docs/components/toggle-group.md) | — | не описано | не описано |
| [Tooltip tour](docs/components/tooltip-tour.md) | — | первый вход, новая функция, тур по нескольким элементам | короткая подсказка на hover или фокус — Tooltip; постоянное объяснение — Suggest |
| [Transaction](docs/components/transaction.md) | — | не описано | детали операции — Side panel / Sheet по нажатию на строку |

Правила выбора варианта (Type, Tone, Size …) — раздел «2. Intent» контракта компонента. Props — `docs/api.md`.
Остальные 22 наборов — draft: в макеты и код не брать (список — `llms.txt`). Если задача не закрывается beta-компонентом — не собирать свой из примитивов, а записать в `docs/OPEN-QUESTIONS.md`.

## 6. Устройство компонента

- **База + надстройки.** Общая конструкция живёт в базе, компонент — надстройка над ней: `_Field base` (поля), `_Selection control` (Checkbox / Radio / Toggle), `_List row` (строки списков и меню), `_Overlay surface` (плавающие поверхности). Базы в макетах напрямую не используются.
- **Служебные слои** у каждого интерактивного компонента: `_State layer`, `_Focus ring`, `_Hit area`, `_Safe margin` — `docs/components/service-layers.md`.
- **Контракт** — 15 разделов по `docs/component-contract.md`; контракт = описание в Figma = борда = манифест.
- **Свойства или слоты:** текст и булевы — свойства; произвольное содержимое — слот. Иконка — замена экземпляра, не вариант на иконку.
- **RTL:** leading ↔ trailing зеркалятся, смысловые стрелки отражаются, цифры и латиница — нет (`docs/rtl.md`). Длинные языки (de, kk): +35 % ширины.

## 7. Чего не делать

- Не использовать примитивы и hex; не подбирать Hover / Pressed цветом вместо слоя состояния.
- Не ставить две Primary рядом; Secondary — не глубже L1; Primary — не на L3 в тёмной теме.
- Не передавать статус только цветом; не убирать кольцо фокуса; не делать зону нажатия меньше `touch/min`.
- Не брать draft-наборы и не менять stable без deprecated + major.
- Не включать Expressive там, где он не разрешён; не вкладывать поверхности глубже L3.

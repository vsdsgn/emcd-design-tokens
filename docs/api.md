# Ожидаемый API компонентов — beta (2026-11-14)

Собрано `scripts/agent-docs.mjs` из `docs/ds-manifest.json` — править не здесь, а в Figma (потом манифест) или в `scripts/contract-data.mjs`.
Это **ожидаемый** API по правилам имён `scripts/parity.mjs`: кода (DSP, Vue `ui-emcd-web`, Flutter) в доступе нет (`docs/dsp-check-2026-11-12.md`). Когда появится манифест кода — `npm run parity` сверит.

Правила имён: набор → `Ds` + PascalCase; ось → camelCase prop, значения — kebab-case; `State` — не prop; служебные свойства (Focus ring, Show hit area, Safe margin) в код не идут.
Значение оси по умолчанию — по правилу из раздела «2. Intent» контракта (вариант по умолчанию в Figma у части наборов пока другой — `docs/OPEN-QUESTIONS.md`).
Планируемые переименования при замене наборов (MAJOR, `docs/dev-handoff-2026-11-12.md`): `iconLeft` / `iconRight` → `iconStart` / `iconEnd`; ось выбранности — одна на систему.

## Accordion

undefined · beta · Vue `<DsAccordion>` · Flutter `DsAccordion` · контракт `docs/components/accordion.md`

Вопрос или раздел, который раскрывается по нажатию на заголовок (FAQ, условия, детали расчёта). Контент — слот. Основа — legacy `baseAccordion --1.5`: пункт 64 (L), текст 16, круглый шеврон 24, разделитель.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `size` | l \| m | по правилу контракта | ось Size |
| `open` | off \| on | по правилу контракта | ось Open |
| `label` | string | — | свойство Label |
| `divider` | boolean | true | свойство Divider |
| `content` | slot | — | свойство Content |

Состояния в Figma: Default · Hover · Skeleton · Disabled · Pressed — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled`, `skeleton` — boolean props.

## Address

undefined · beta · Vue `<DsAddress>` · Flutter `DsAddress` · контракт `docs/components/address.md`

Адрес кошелька или хэш с копированием и QR: подпись, строка с адресом и двумя кнопками, статус «Адрес скопирован».

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `format` | short \| full | по правилу контракта | ось Format |

Состояния в Figma: Default · Copied — ось State в код не идёт: Hover / Pressed / Focus даёт платформа.

## Amount

undefined · beta · Vue `<DsAmount>` · Flutter `DsAmount` · контракт `docs/components/amount.md`

Денежная сумма: число, тикер и необязательный фиатный эквивалент. Единый способ показать сумму в продукте.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `size` | s \| m \| l \| xl | по правилу контракта | ось Size |
| `sign` | none \| positive \| negative | по правилу контракта | ось Sign |
| `value` | string | — | свойство Value |
| `ticker` | string | — | свойство Ticker |
| `fiat` | string | — | свойство Fiat |
| `showFiat` | boolean | true | свойство Show fiat |

## Avatar

undefined · beta · Vue `<DsAvatar>` · Flutter `DsAvatar` · контракт `docs/components/avatar.md`

Круглое изображение пользователя, субаккаунта или контрагента: инициал, иконка или фото.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `size` | xs \| s \| m \| l | по правилу контракта | ось Size |
| `type` | text \| icon \| image | по правилу контракта | ось Type |
| `initials` | string | — | свойство Initials |
| `status` | boolean | false | свойство Status |

Состояния в Figma: Default · Skeleton — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `skeleton` — boolean props.

## Avatar group

undefined · beta · Vue `<DsAvatarGroup>` · Flutter `DsAvatarGroup` · контракт `docs/components/avatar-group.md`

Несколько аватаров одним блоком внахлёст; лишние сворачиваются в круг «+N».

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `size` | xs \| s \| m | по правилу контракта | ось Size |
| `more` | off \| on | по правилу контракта | ось More |

## Badge

undefined · beta · Vue `<DsBadge>` · Flutter `DsBadge` · контракт `docs/components/badge.md`

Неинтерактивная метка статуса или свойства («Активен», «Новое», «−5 %», монета). Нажать нельзя.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `size` | s \| m \| l | по правилу контракта | ось Size |
| `tone` | neutral \| accent \| success \| warning \| danger \| info | по правилу контракта | ось Tone |
| `style` | subtle \| solid | по правилу контракта | ось Style |
| `label` | string | — | свойство Label |
| `icon` | boolean | false | свойство Icon |

Состояния в Figma: Skeleton · Default — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `skeleton` — boolean props.

Иконки (Icon) в коде — слот или имя иконки, а не boolean + swap.

## Breadcrumb item

undefined · beta · Vue `<DsBreadcrumbItem>` · Flutter `DsBreadcrumbItem` · контракт `docs/components/breadcrumb-item.md`

Пункт хлебных крошек: ссылка на предыдущий уровень; Current — текущая страница, не ссылка.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `label` | string | — | свойство Label |

Состояния в Figma: Default · Hover · Current · Pressed · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled` — boolean props.

## Breadcrumbs

undefined · beta · Vue `<DsBreadcrumbs>` · Flutter `DsBreadcrumbs` · контракт `docs/components/breadcrumbs.md`

Путь к текущей странице в глубокой иерархии (Web): «Главная / Воркеры / rig-01».

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `items` | 2 \| 3 \| 4 \| collapsed | по правилу контракта | ось Items |

## Button

undefined · beta · Vue `<DsButton>` · Flutter `DsButton` · контракт `docs/components/button.md`

Кнопка действия. Основа — legacy `baseButton` (DS Web + App), доведена до правил 2.0.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `type` | primary \| inverted \| tertiary \| tertiary-outline \| text \| secondary | по правилу контракта | ось Type |
| `tone` | default \| danger | по правилу контракта | ось Tone |
| `size` | s \| m \| l \| xl | по правилу контракта | ось Size |
| `label` | string | — | свойство Label |
| `iconLeft` | boolean | false | свойство Icon left |
| `iconRight` | boolean | false | свойство Icon right |
| `loading` | boolean | false | свойство Loading |

Состояния в Figma: Default · Hover · Pressed · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled` — boolean props.

Иконки (Icon left, Icon right) в коде — слот или имя иконки, а не boolean + swap.

## Card

undefined · beta · Vue `<DsCard>` · Flutter `DsCard` · контракт `docs/components/card.md`

Контейнер-подложка: уровень поверхности, радиус, внутренний отступ и обводка. Своего содержимого нет.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `level` | 1 \| 2 \| 3 \| 0 | по правилу контракта | ось Level |
| `radius` | container \| surface \| inner | по правилу контракта | ось Radius |
| `padding` | s \| m \| l | по правилу контракта | ось Padding |
| `border` | on \| off | по правилу контракта | ось Border |

## Chart axis label

undefined · beta · Vue `<DsChartAxisLabel>` · Flutter `DsChartAxisLabel` · контракт `docs/components/chart-axis-label.md`

Подпись оси графика: время, дата или значение. Одна короткая метка.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `size` | s \| l | по правилу контракта | ось Size |
| `label` | string | — | свойство Label |

Состояния в Figma: Default · Hover · Active · Skeleton — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `skeleton` — boolean props.

## Chart crosshair

undefined · beta · Vue `<DsChartCrosshair>` · Flutter `DsChartCrosshair` · контракт `docs/components/chart-crosshair.md`

Перекрестие под курсором на графике: вертикальная линия с точкой серии или подсветка полосы столбца. Работает вместе с Chart tooltip.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `target` | line \| bar | по правилу контракта | ось Target |

## Chart metric

undefined · beta · Vue `<DsChartMetric>` · Flutter `DsChartMetric` · контракт `docs/components/chart-metric.md`

Показатель над графиком: подпись и крупное значение, при необходимости иконка слева от значения.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `tone` | default \| danger \| warning \| success | по правилу контракта | ось Tone |
| `label` | string | — | свойство Label |
| `value` | string | — | свойство Value |
| `icon` | boolean | false | свойство Icon |

Иконки (Icon) в коде — слот или имя иконки, а не boolean + swap.

## Chart tooltip

undefined · beta · Vue `<DsChartTooltip>` · Flutter `DsChartTooltip` · контракт `docs/components/chart-tooltip.md`

Тултип точки графика: дата и время, под ними строки «маркер серии — название — значение».

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `rows` | 1 \| 2 \| 3 \| 4 | по правилу контракта | ось Rows |
| `showDate` | boolean | true | свойство Show date |

## Checkbox

undefined · beta · Vue `<DsCheckbox>` · Flutter `DsCheckbox` · контракт `docs/components/checkbox.md`

Множественный выбор, согласие с условиями, выбор строк таблицы. Основа — legacy `baseCheckbox` (коробочка 20, r 6, подпись через 12).

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `status` | off \| on \| indeterminate | по правилу контракта | ось Status |
| `tone` | default \| danger | по правилу контракта | ось Tone |
| `size` | m \| s | по правилу контракта | ось Size |
| `controlPosition` | start \| end | по правилу контракта | ось Control position |
| `label` | string | — | свойство Label (слой `_Selection control`, база `_Selection control`) |
| `showLabel` | boolean | true | свойство Show label (слой `_Selection control`, база `_Selection control`) |
| `description` | string | — | свойство Description (слой `_Selection control`, база `_Selection control`) |
| `showDescription` | boolean | false | свойство Show description (слой `_Selection control`, база `_Selection control`) |

Состояния в Figma: Default · Hover · Pressed · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled` — boolean props.

## Checkbox group

undefined · beta · Vue `<DsCheckboxGroup>` · Flutter `DsCheckboxGroup` · контракт `docs/components/checkbox-group.md`

Группа чекбоксов: подпись группы, варианты, под ними подсказка или ошибка.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `direction` | vertical \| horizontal | по правилу контракта | ось Direction |
| `size` | m \| s | по правилу контракта | ось Size |
| `showLabel` | boolean | true | свойство Show label |
| `showHelper` | boolean | true | свойство Show helper |
| `label` | string | — | свойство Label |
| `helper` | string | — | свойство Helper |

Состояния в Figma: Default · Error · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled`, `error` — boolean props.

## Chip

undefined · beta · Vue `<DsChip>` · Flutter `DsChip` · контракт `docs/components/chip.md`

Фильтр или выбор варианта из набора, который видно целиком (сроки «90 / 180 / 360 дней», монеты, статусы в фильтре).

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `size` | s \| m | по правилу контракта | ось Size |
| `selected` | off \| on | по правилу контракта | ось Selected |
| `label` | string | — | свойство Label |
| `meta` | boolean | false | свойство Meta |
| `metaText` | string | — | свойство Meta text |
| `icon` | boolean | false | свойство Icon |
| `remove` | boolean | false | свойство Remove |
| `trailingIcon` | boolean | false | свойство Trailing icon |

Состояния в Figma: Default · Hover · Pressed · Disabled · Skeleton — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled`, `skeleton` — boolean props.

Иконки (Icon, Trailing icon) в коде — слот или имя иконки, а не boolean + swap.

## Circle timer

undefined · beta · Vue `<DsCircleTimer>` · Flutter `DsCircleTimer` · контракт `docs/components/circle-timer.md`

Круглый таймер обратного отсчёта: кольцо-прогресс, убывает по часовой стрелке. Показывает, сколько осталось до автоскрытия Toast или до повторной отправки кода.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `size` | s \| m | по правилу контракта | ось Size |
| `progress` | 100 \| 75 \| 50 \| 25 | по правилу контракта | ось Progress |

## Code cell

undefined · beta · Vue `<DsCodeCell>` · Flutter `DsCodeCell` · контракт `docs/components/code-cell.md`

Ячейка кода: одна цифра кода подтверждения.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `size` | l \| m | по правилу контракта | ось Size |
| `digit` | string | — | свойство Digit |

Состояния в Figma: Empty · Focus · Filled · Error · Success · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled`, `error` — boolean props.

## Code input

undefined · beta · Vue `<DsCodeInput>` · Flutter `DsCodeInput` · контракт `docs/components/code-input.md`

Ввод одноразового кода: ряд из 4 или 6 ячеек Code cell и строка сообщения под ним. Подтверждение — автоматически, когда введена последняя цифра.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `length` | 4 \| 6 | по правилу контракта | ось Length |
| `message` | string | — | свойство Message |
| `showMessage` | boolean | true | свойство Show message |

Состояния в Figma: Default · Error · Success · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled`, `error` — boolean props.

## Coin

undefined · beta · Vue `<DsCoin>` · Flutter `DsCoin` · контракт `docs/components/coin.md`

Монета из библиотеки Symbols (`symbol/coin/*`) нужного размера, при необходимости с маленькой монетой сети в правом нижнем углу (USDT TRC-20, USDT ERC-20).

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `size` | xs \| s \| m \| l \| xl | по правилу контракта | ось Size |
| `network` | off \| on | по правилу контракта | ось Network |

Состояния в Figma: Default · Skeleton — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `skeleton` — boolean props.

Иконки (Coin, Network coin) в коде — слот или имя иконки, а не boolean + swap.

## Coin stack

undefined · beta · Vue `<DsCoinStack>` · Flutter `DsCoinStack` · контракт `docs/components/coin-stack.md`

Несколько монет внахлёст (стопка): пул из нескольких монет, пара для обмена, «Kaspa+1».

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `size` | s \| m \| l | по правилу контракта | ось Size |
| `count` | 2 \| 3 \| 4 | по правилу контракта | ось Count |
| `showMore` | boolean | false | свойство Show more |
| `more` | string | — | свойство More |

## Counter

undefined · beta · Vue `<DsCounter>` · Flutter `DsCounter` · контракт `docs/components/counter.md`

Число рядом с табом, пунктом меню или иконкой (уведомления). Не статус.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `size` | s \| m | по правилу контракта | ось Size |
| `tone` | neutral \| accent \| danger | по правилу контракта | ось Tone |
| `value` | string | — | свойство Value |

## Date cell

undefined · beta · Vue `<DsDateCell>` · Flutter `DsDateCell` · контракт `docs/components/date-cell.md`

Ячейка одного дня в сетке Calendar: число и одно смысловое состояние (сегодня, выбран, край или середина диапазона, соседний месяц, недоступен).

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `day` | string | — | свойство Day |

Состояния в Figma: Default · Hover · Today · Selected · Range start · Range middle · Range end · Outside · Disabled · Pressed — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled` — boolean props.

## Date range field

undefined · beta · Vue `<DsDateRangeField>` · Flutter `DsDateRangeField` · контракт `docs/components/date-range-field.md`

Поле выбора диапазона дат: подпись на рамке, значение «ДД.ММ.ГГ → ДД.ММ.ГГ», справа иконка календаря. По нажатию открывает панель с календарём (Calendar, Mode=Range) и пресетами периодов.

Props нет.

Состояния в Figma: Default · Focus · Filled · Error · Disabled · Hover · Skeleton — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled`, `error`, `skeleton` — boolean props.

## Divider

undefined · beta · Vue `<DsDivider>` · Flutter `DsDivider` · контракт `docs/components/divider.md`

Разделитель: линия 1 px между группами содержимого, с необязательной подписью «или».

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `orientation` | horizontal \| vertical | по правилу контракта | ось Orientation |
| `label` | off \| on | по правилу контракта | ось Label |
| `style` | solid \| dotted | по правилу контракта | ось Style |
| `labelText` | string | — | свойство Label text |

## Floating button

undefined · beta · Vue `<DsFloatingButton>` · Flutter `DsFloatingButton` · контракт `docs/components/floating-button.md`

Плавающая кнопка главного действия экрана на Compact (App, мобильный веб): «Добавить воркер», «Пополнить».

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `layout` | icon \| extended | по правилу контракта | ось Layout |
| `loading` | false \| true | по правилу контракта | ось Loading |

Состояния в Figma: Default · Hover · Pressed · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled` — boolean props.

## Icon button

undefined · beta · Vue `<DsIconButton>` · Flutter `DsIconButton` · контракт `docs/components/icon-button.md`

Кнопка-иконка: закрыть, «…», копировать, фильтр, обновить. Та же основа, что у Button.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `type` | primary \| secondary \| tertiary \| tertiary-outline \| ghost \| text \| inverted | по правилу контракта | ось Type |
| `tone` | default \| danger | по правилу контракта | ось Tone |
| `size` | s \| m \| l \| xl | по правилу контракта | ось Size |
| `loading` | false \| true | по правилу контракта | ось Loading |
| `label` | string | — | свойство Label |

Состояния в Figma: Default · Hover · Pressed · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled` — boolean props.

Иконки (Icon) в коде — слот или имя иконки, а не boolean + swap.

## Input

undefined · beta · Vue `<DsInput>` · Flutter `DsInput` · контракт `docs/components/input.md`

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `size` | m \| l \| xl | по правилу контракта | ось Size |
| `labelPosition` | on-border \| above | по правилу контракта | ось Label position |
| `label` | string | — | свойство Label (слой `Field`, база `_Field base`) |
| `showLabel` | boolean | true | свойство Show label (слой `Field`, база `_Field base`) |
| `value` | string | — | свойство Value (слой `Field`, база `_Field base`) |
| `helper` | string | — | свойство Helper (слой `Field`, база `_Field base`) |
| `showHelper` | boolean | false | свойство Show helper (слой `Field`, база `_Field base`) |
| `counter` | string | — | свойство Counter (слой `Field`, база `_Field base`) |
| `showCounter` | boolean | false | свойство Show counter (слой `Field`, база `_Field base`) |
| `showLeading` | boolean | false | свойство Show leading (слой `Field`, база `_Field base`) |
| `showInline` | boolean | false | свойство Show inline (слой `Field`, база `_Field base`) |
| `showTrailing` | boolean | false | свойство Show trailing (слой `Field`, база `_Field base`) |
| `leading` | slot | — | свойство Leading (слой `Field`, база `_Field base`) |
| `inline` | slot | — | свойство Inline (слой `Field`, база `_Field base`) |
| `trailing` | slot | — | свойство Trailing (слой `Field`, база `_Field base`) |

Состояния в Figma: Default · Hover · Focus · Filled · Error · Disabled · Read-only · Loading · Skeleton — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled`, `error`, `readonly`, `loading`, `skeleton` — boolean props.

## Input addon / Unit

undefined · beta · Vue `<DsInputAddonUnit>` · Flutter `DsInputAddonUnit` · контракт `docs/components/input-addon-unit.md`

Единицы или валюта в suffix поля (USDT, TH/s, %, kW).

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `text` | string | — | свойство Text |

## Input addon / Max

undefined · beta · Vue `<DsInputAddonMax>` · Flutter `DsInputAddonMax` · контракт `docs/components/input-addon-max.md`

Кнопка «Max» в suffix поля суммы: подставляет весь доступный остаток.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `text` | string | — | свойство Text |

## Input addon / Chevron

undefined · beta · Vue `<DsInputAddonChevron>` · Flutter `DsInputAddonChevron` · контракт `docs/components/input-addon-chevron.md`

Шеврон для Select / Dropdown в trailing-слоте поля.

Props нет.

## Input addon / Stepper

undefined · beta · Vue `<DsInputAddonStepper>` · Flutter `DsInputAddonStepper` · контракт `docs/components/input-addon-stepper.md`

Степпер − / + для числового поля.

Props нет.

## Input addon / Counter

undefined · beta · Vue `<DsInputAddonCounter>` · Flutter `DsInputAddonCounter` · контракт `docs/components/input-addon-counter.md`

Счётчик «+N» в inline-слоте: сколько ещё значений выбрано в мультиселекте.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `text` | string | — | свойство Text |

## Input addon / Clear

undefined · beta · Vue `<DsInputAddonClear>` · Flutter `DsInputAddonClear` · контракт `docs/components/input-addon-clear.md`

Кнопка очистки поля (форма legacy `ic-erase`): серый круг с крестиком. Ставится в Trailing.

Props нет.

## Input addon / Icon

undefined · beta · Vue `<DsInputAddonIcon>` · Flutter `DsInputAddonIcon` · контракт `docs/components/input-addon-icon.md`

Иконка в слоте поля: поиск, сеть, тип значения.

Props нет.

Иконки (Icon) в коде — слот или имя иконки, а не boolean + swap.

## Input amount

undefined · beta · Vue `<DsInputAmount>` · Flutter `DsInputAmount` · контракт `docs/components/input-amount.md`

Поле суммы для пополнения, вывода, обмена и депозита: подпись с иконкой info, баланс и «Макс», сумма крупно, описание лимитов, выбор монеты (Select compact). Ошибка — рамка `control/border/error` и сообщение снизу.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `filled` | false \| true | по правилу контракта | ось Filled |
| `label` | string | — | свойство Label |
| `value` | string | — | свойство Value |
| `description` | string | — | свойство Description |
| `balance` | string | — | свойство Balance |
| `infoIcon` | boolean | true | свойство Info icon |
| `showBalance` | boolean | true | свойство Show balance |
| `message` | string | — | свойство Message |
| `showCurrency` | boolean | true | свойство Show currency |

Состояния в Figma: Default · Focus · Error · Disabled · Hover · Skeleton — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled`, `error`, `skeleton` — boolean props.

## Key-value row

undefined · beta · Vue `<DsKeyValueRow>` · Flutter `DsKeyValueRow` · контракт `docs/components/key-value-row.md`

Строка «название — значение» в сводке: название в начале строки, значение в конце.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `emphasis` | default \| total \| muted | по правилу контракта | ось Emphasis |
| `leader` | off \| on | по правилу контракта | ось Leader |
| `key` | string | — | свойство Key |
| `value` | string | — | свойство Value |

## Legend item

undefined · beta · Vue `<DsLegendItem>` · Flutter `DsLegendItem` · контракт `docs/components/legend-item.md`

Элемент легенды графика: маркер серии (Legend swatch) + подпись и необязательное значение.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `selected` | off \| on | по правилу контракта | ось Selected |
| `label` | string | — | свойство Label |
| `value` | string | — | свойство Value |
| `showValue` | boolean | false | свойство Show value |

Состояния в Figma: Default · Hover · Skeleton — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `skeleton` — boolean props.

## Legend swatch

undefined · beta · Vue `<DsLegendSwatch>` · Flutter `DsLegendSwatch` · контракт `docs/components/legend-swatch.md`

Маркер серии графика: цветная точка или отрезок линии.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `marker` | dot \| line | по правилу контракта | ось Marker |
| `series` | 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8 | по правилу контракта | ось Series |

## Menu item

undefined · beta · Vue `<DsMenuItem>` · Flutter `DsMenuItem` · контракт `docs/components/menu-item.md`

Пункт меню: слева необязательный слот (иконка, монета, аватар, эмодзи), затем подпись с необязательным описанием, справа необязательный слот (Badge, Counter, значение, шеврон подменю, кнопка). Нажимается вся строка, одно действие на пункт.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `size` | m \| l | по правилу контракта | ось Size |
| `tone` | default \| danger | по правилу контракта | ось Tone |
| `label` | string | — | свойство Label (слой `_List row`, база `_List row`) |
| `description` | string | — | свойство Description (слой `_List row`, база `_List row`) |
| `showDescription` | boolean | false | свойство Show description (слой `_List row`, база `_List row`) |
| `subvalue` | string | — | свойство Subvalue (слой `_List row`, база `_List row`) |
| `showLeading` | boolean | true | свойство Show leading (слой `_List row`, база `_List row`) |
| `showTrailing` | boolean | false | свойство Show trailing (слой `_List row`, база `_List row`) |
| `leading` | slot | — | свойство Leading (слой `_List row`, база `_List row`) |
| `trailing` | slot | — | свойство Trailing (слой `_List row`, база `_List row`) |
| `selected` | boolean | false | свойство Selected (слой `_List row`, база `_List row`) |
| `showSelection` | boolean | false | свойство Show selection (слой `_List row`, база `_List row`) |
| `divider` | boolean | false | свойство Divider (слой `_List row`, база `_List row`) |

Состояния в Figma: Default · Hover · Pressed · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled` — boolean props.

## Multiselect

undefined · beta · Vue `<DsMultiselect>` · Flutter `DsMultiselect` · контракт `docs/components/multiselect.md`

Поле множественного выбора: Select + список Multiselect option в Menu. Выбранное показывается строкой «Выбрано: N» в поле (Count) или чипами под полем (Chips).

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `display` | count \| chips | по правилу контракта | ось Display |

Состояния в Figma: Default · Open · Error · Disabled · Hover · Skeleton — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled`, `error`, `skeleton` — boolean props.

## Multiselect option

undefined · beta · Vue `<DsMultiselectOption>` · Flutter `DsMultiselectOption` · контракт `docs/components/multiselect-option.md`

Строка списка выбора (Select, Multiselect, Menu): слева необязательный слот под монету, аватар или иконку, затем подпись с необязательным описанием, справа галочка выбранного. Это строка, а не чекбокс: нажимается вся строка.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `label` | string | — | свойство Label (слой `_List row`, база `_List row`) |
| `description` | string | — | свойство Description (слой `_List row`, база `_List row`) |
| `showDescription` | boolean | false | свойство Show description (слой `_List row`, база `_List row`) |
| `subvalue` | string | — | свойство Subvalue (слой `_List row`, база `_List row`) |
| `showLeading` | boolean | true | свойство Show leading (слой `_List row`, база `_List row`) |
| `showTrailing` | boolean | false | свойство Show trailing (слой `_List row`, база `_List row`) |
| `leading` | slot | — | свойство Leading (слой `_List row`, база `_List row`) |
| `trailing` | slot | — | свойство Trailing (слой `_List row`, база `_List row`) |
| `selected` | boolean | false | свойство Selected (слой `_List row`, база `_List row`) |
| `showSelection` | boolean | false | свойство Show selection (слой `_List row`, база `_List row`) |
| `divider` | boolean | false | свойство Divider (слой `_List row`, база `_List row`) |

Состояния в Figma: Default · Hover · Disabled · Pressed — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled` — boolean props.

## Nav item

undefined · beta · Vue `<DsNavItem>` · Flutter `DsNavItem` · контракт `docs/components/nav-item.md`

Пункт основной навигации в сайдбаре Web: иконка и подпись; в свёрнутом сайдбаре — только иконка.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `collapsed` | off \| on | по правилу контракта | ось Collapsed |
| `selected` | off \| on | по правилу контракта | ось Selected |
| `label` | string | — | свойство Label |
| `counter` | boolean | false | свойство Counter |

Состояния в Figma: Default · Hover · Pressed — ось State в код не идёт: Hover / Pressed / Focus даёт платформа.

Иконки (Icon) в коде — слот или имя иконки, а не boolean + swap.

## Notification

undefined · beta · Vue `<DsNotification>` · Flutter `DsNotification` · контракт `docs/components/notification.md`

Запись в центре уведомлений (колокольчик в шапке): иконка, заголовок, текст и время.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `status` | unread \| read | по правилу контракта | ось Status |
| `title` | string | — | свойство Title |
| `text` | string | — | свойство Text |
| `time` | string | — | свойство Time |

Состояния в Figma: Default · Hover · Pressed — ось State в код не идёт: Hover / Pressed / Focus даёт платформа.

## Overlay

undefined · beta · Vue `<DsOverlay>` · Flutter `DsOverlay` · контракт `docs/components/overlay.md`

Подложка за модальными слоями: полупрозрачная заливка `surface/overlay` на весь экран, при необходимости с размытием фона.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `blur` | off \| on | по правилу контракта | ось Blur |

## Page dot

undefined · beta · Vue `<DsPageDot>` · Flutter `DsPageDot` · контракт `docs/components/page-dot.md`

Точка индикатора страниц. Часть Page indicator.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `selected` | off \| on | по правилу контракта | ось Selected |

## Page indicator

undefined · beta · Vue `<DsPageIndicator>` · Flutter `DsPageIndicator` · контракт `docs/components/page-indicator.md`

Индикатор страниц карусели: ряд точек, текущая — вытянутая.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `count` | 2 \| 3 \| 4 \| 5 | по правилу контракта | ось Count |
| `selected` | 1 \| 2 \| 3 \| 4 \| 5 | по правилу контракта | ось Selected |

## Pagination

undefined · beta · Vue `<DsPagination>` · Flutter `DsPagination` · контракт `docs/components/pagination.md`

Пагинация таблиц и списков: номера страниц или диапазон со стрелками.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `type` | pages \| compact | по правилу контракта | ось Type |
| `size` | s \| m | по правилу контракта | ось Size |

## Pagination item

undefined · beta · Vue `<DsPaginationItem>` · Flutter `DsPaginationItem` · контракт `docs/components/pagination-item.md`

Номер страницы в Pagination. Отдельно не используется.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `size` | s \| m | по правилу контракта | ось Size |
| `selected` | off \| on | по правилу контракта | ось Selected |
| `page` | string | — | свойство Page |

Состояния в Figma: Default · Hover · Pressed · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled` — boolean props.

## Password field

undefined · beta · Vue `<DsPasswordField>` · Flutter `DsPasswordField` · контракт `docs/components/password-field.md`

Поле пароля с кнопкой показа символов («глаз») и списком требований, которые отмечаются по мере ввода.

Props нет.

Состояния в Figma: Error · Default · Focus · Filled · Hover · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled`, `error` — boolean props.

## Progress

undefined · beta · Vue `<DsProgress>` · Flutter `DsProgress` · контракт `docs/components/progress.md`

Линейный прогресс: доля выполненного, когда длительность или объём известны (лимит вывода, заполненность, шаг загрузки файла, срок до выплаты).

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `size` | s \| m | по правилу контракта | ось Size |
| `tone` | accent \| success \| warning \| danger | по правилу контракта | ось Tone |
| `label` | string | — | свойство Label |
| `value` | string | — | свойство Value |
| `showLabel` | boolean | true | свойство Show label |

## Progress circle

undefined · beta · Vue `<DsProgressCircle>` · Flutter `DsProgressCircle` · контракт `docs/components/progress-circle.md`

Круговой прогресс: известная доля, когда места мало или прогресс — главное на карточке (заполнение пула, выполнение задания).

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `size` | s \| m \| l | по правилу контракта | ось Size |
| `value` | string | — | свойство Value |

## Promo card

undefined · beta · Vue `<DsPromoCard>` · Flutter `DsPromoCard` · контракт `docs/components/promo-card.md`

Промо-карточка: заголовок, необязательные описание и действие, необязательная картинка справа.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `size` | s \| m | по правилу контракта | ось Size |
| `tone` | neutral \| accent | по правилу контракта | ось Tone |
| `title` | string | — | свойство Title |
| `description` | string | — | свойство Description |
| `showDescription` | boolean | true | свойство Show description |
| `showAction` | boolean | true | свойство Show action |
| `showMedia` | boolean | false | свойство Show media |

## Radio

undefined · beta · Vue `<DsRadio>` · Flutter `DsRadio` · контракт `docs/components/radio.md`

Один вариант из нескольких (2–5). Основа — legacy `baseRadio` (круг 20, точка 8, подпись через 12).

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `status` | off \| on | по правилу контракта | ось Status |
| `tone` | default \| danger | по правилу контракта | ось Tone |
| `size` | m \| s | по правилу контракта | ось Size |
| `controlPosition` | start \| end | по правилу контракта | ось Control position |
| `label` | string | — | свойство Label (слой `_Selection control`, база `_Selection control`) |
| `showLabel` | boolean | true | свойство Show label (слой `_Selection control`, база `_Selection control`) |
| `description` | string | — | свойство Description (слой `_Selection control`, база `_Selection control`) |
| `showDescription` | boolean | false | свойство Show description (слой `_Selection control`, база `_Selection control`) |

Состояния в Figma: Default · Hover · Pressed · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled` — boolean props.

## Radio card

undefined · beta · Vue `<DsRadioCard>` · Flutter `DsRadioCard` · контракт `docs/components/radio-card.md`

Выбираемая карточка: радио, подпись и необязательные детали, которые раскрываются у выбранной. Нажимается вся карточка.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `status` | off \| on | по правилу контракта | ось Status |
| `label` | string | — | свойство Label |
| `details` | string | — | свойство Details |
| `showDetails` | boolean | true | свойство Show details |

Состояния в Figma: Default · Hover · Disabled · Pressed — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled` — boolean props.

## Radio group

undefined · beta · Vue `<DsRadioGroup>` · Flutter `DsRadioGroup` · контракт `docs/components/radio-group.md`

Группа радио: подпись группы, варианты, под ними подсказка или ошибка.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `direction` | vertical \| horizontal | по правилу контракта | ось Direction |
| `size` | m \| s | по правилу контракта | ось Size |
| `showLabel` | boolean | true | свойство Show label |
| `showHelper` | boolean | true | свойство Show helper |
| `label` | string | — | свойство Label |
| `helper` | string | — | свойство Helper |

Состояния в Figma: Default · Error · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled`, `error` — boolean props.

## Scrollbar

undefined · beta · Vue `<DsScrollbar>` · Flutter `DsScrollbar` · контракт `docs/components/scrollbar.md`

Полоса прокрутки для своих скролл-контейнеров: выпадающие списки, панели, таблицы. Источник — legacy DS Web «Scrollbar» и сырой «Scroll» 4 px в продуктах.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `orientation` | vertical \| horizontal | по правилу контракта | ось Orientation |

Состояния в Figma: Default · Hover · Dragging — ось State в код не идёт: Hover / Pressed / Focus даёт платформа.

## Segment

undefined · beta · Vue `<DsSegment>` · Flutter `DsSegment` · контракт `docs/components/segment.md`

Элемент Segmented. Отдельно не используется.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `size` | s \| m \| l \| xl | по правилу контракта | ось Size |
| `selected` | off \| on | по правилу контракта | ось Selected |
| `tone` | neutral \| accent \| success \| danger | по правилу контракта | ось Tone |
| `label` | string | — | свойство Label |
| `showLabel` | boolean | true | свойство Show label |
| `icon` | boolean | false | свойство Icon |

Состояния в Figma: Default · Hover · Disabled · Pressed — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled` — boolean props.

Иконки (Icon) в коде — слот или имя иконки, а не boolean + swap.

## Segmented

undefined · beta · Vue `<DsSegmented>` · Flutter `DsSegmented` · контракт `docs/components/segmented.md`

Выбор одного значения из 2–4 взаимоисключающих; результат применяется сразу (период графика, Купить / Продать, вид список / сетка).

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `size` | s \| m \| l \| xl | по правилу контракта | ось Size |
| `items` | 2 \| 3 \| 4 | по правилу контракта | ось Items |

## Select

undefined · beta · Vue `<DsSelect>` · Flutter `DsSelect` · контракт `docs/components/select.md`

Поле выбора одного значения из списка (сеть вывода, кошелёк, монета, валюта). Поле как у Input (размеры, лейбл, helper, ошибка), справа шеврон; по нажатию открывает Menu (на Compact — Sheet).

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `size` | m \| l \| xl | по правилу контракта | ось Size |

Состояния в Figma: Default · Hover · Open · Filled · Error · Disabled · Loading · Skeleton — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled`, `error`, `loading`, `skeleton` — boolean props.

## Select compact

undefined · beta · Vue `<DsSelectCompact>` · Flutter `DsSelectCompact` · контракт `docs/components/select-compact.md`

Компактный селектор без лейбла: выбор монеты, сети, валюты внутри строки, карточки, шапки виджета («USDT ▾»). По нажатию открывает Menu, на Compact — Sheet.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `text` | string | — | свойство Text |
| `showLeading` | boolean | true | свойство Show leading |
| `leading` | slot | — | свойство Leading |

Состояния в Figma: Default · Hover · Open · Disabled · Pressed — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled` — boolean props.

## Skeleton

undefined · beta · Vue `<DsSkeleton>` · Flutter `DsSkeleton` · контракт `docs/components/skeleton.md`

Кирпичи скелетона: из них собираются Skeleton-состояния всех компонентов с данными (List item, Table row, Stat card, Chart card, Coin, Avatar).

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `shape` | text \| title \| circle \| rect \| button \| input \| chip | по правилу контракта | ось Shape |

## Spinner

undefined · beta · Vue `<DsSpinner>` · Flutter `DsSpinner` · контракт `docs/components/spinner.md`

Индикатор загрузки: действие идёт, длительность неизвестна.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `size` | s \| m \| l | по правилу контракта | ось Size |

## Stat card

undefined · beta · Vue `<DsStatCard>` · Flutter `DsStatCard` · контракт `docs/components/stat-card.md`

Один показатель с подписью: хешрейт, баланс, начислено за 24 ч, активные воркеры. Основа дашборда.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `label` | string | — | свойство Label |
| `value` | string | — | свойство Value |
| `unit` | string | — | свойство Unit |
| `info` | boolean | true | свойство Info |
| `delta` | boolean | true | свойство Delta |
| `deltaCaption` | string | — | свойство Delta caption |
| `showFooter` | boolean | false | свойство Show footer |
| `footer` | slot | — | свойство Footer |
| `ambientLight` | boolean | false | свойство Ambient light |

Состояния в Figma: Default · Skeleton — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `skeleton` — boolean props.

## Status

undefined · beta · Vue `<DsStatus>` · Flutter `DsStatus` · контракт `docs/components/status.md`

Точка + подпись: состояние объекта (воркер, устройство, сервис, выплата) в строке таблицы, списке, шапке.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `size` | s \| m | по правилу контракта | ось Size |
| `tone` | success \| warning \| danger \| info \| neutral | по правилу контракта | ось Tone |
| `label` | string | — | свойство Label |
| `showLabel` | boolean | true | свойство Show label |

## Dot

undefined · beta · Vue `<DsDot>` · Flutter `DsDot` · контракт `docs/components/dot.md`

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `size` | s \| m | по правилу контракта | ось Size |
| `tone` | success \| warning \| danger \| info \| neutral | по правилу контракта | ось Tone |

## Step

undefined · beta · Vue `<DsStep>` · Flutter `DsStep` · контракт `docs/components/step.md`

Один шаг в Stepper: символ (Step symbol) + подпись и необязательное описание.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `label` | string | — | свойство Label |
| `description` | string | — | свойство Description |
| `showDescription` | boolean | false | свойство Show description |

Состояния в Figma: Default · Current · Success — ось State в код не идёт: Hover / Pressed / Focus даёт платформа.

## Step progress

undefined · beta · Vue `<DsStepProgress>` · Flutter `DsStepProgress` · контракт `docs/components/step-progress.md`

Полоска из 3–7 равных сегментов: сколько шагов пройдено в линейной последовательности без названий. Источник — legacy «slider counter» (Tooltip tour, DS Web и DS App).

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `count` | 3 \| 4 \| 5 \| 6 \| 7 | по правилу контракта | ось Count |
| `step` | 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 | по правилу контракта | ось Step |

## Step segment

undefined · beta · Vue `<DsStepSegment>` · Flutter `DsStepSegment` · контракт `docs/components/step-segment.md`

Один сегмент полоски Step progress: шаг пройден, текущий или впереди.

Props нет.

Состояния в Figma: Done · Current · Upcoming — ось State в код не идёт: Hover / Pressed / Focus даёт платформа.

## Step symbol

undefined · beta · Vue `<DsStepSymbol>` · Flutter `DsStepSymbol` · контракт `docs/components/step-symbol.md`

Кружок шага в Step: номер, иконка, галочка или точка в одном из трёх состояний.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `type` | numbered \| icon \| checked \| bullet | по правилу контракта | ось Type |
| `number` | string | — | свойство Number |

Состояния в Figma: Default · Current · Success — ось State в код не идёт: Hover / Pressed / Focus даёт платформа.

## Step trail

undefined · beta · Vue `<DsStepTrail>` · Flutter `DsStepTrail` · контракт `docs/components/step-trail.md`

Линия между двумя шагами в Stepper: сплошная или пунктирная, в цвете состояния шага.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `border` | solid \| dotted | по правилу контракта | ось Border |

Состояния в Figma: Default · Current · Success — ось State в код не идёт: Hover / Pressed / Focus даёт платформа.

## Tab

undefined · beta · Vue `<DsTab>` · Flutter `DsTab` · контракт `docs/components/tab.md`

Переключение разделов одного экрана (История: Начисления / Выплаты / Воркеры). Выбранный — подчёркивание.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `size` | m \| l \| xl \| s | по правилу контракта | ось Size |
| `selected` | off \| on | по правилу контракта | ось Selected |
| `label` | string | — | свойство Label |
| `counter` | boolean | false | свойство Counter |
| `icon` | boolean | false | свойство Icon |

Состояния в Figma: Default · Hover · Pressed · Disabled · Skeleton — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled`, `skeleton` — boolean props.

Иконки (Icon) в коде — слот или имя иконки, а не boolean + swap.

## Tab bar item

undefined · beta · Vue `<DsTabBarItem>` · Flutter `DsTabBarItem` · контракт `docs/components/tab-bar-item.md`

Пункт нижней навигации: иконка 24 + подпись. App и мобильный веб — одна схема.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `selected` | off \| on | по правилу контракта | ось Selected |
| `label` | string | — | свойство Label |
| `badgeDot` | boolean | false | свойство Badge dot |

Состояния в Figma: Default · Pressed — ось State в код не идёт: Hover / Pressed / Focus даёт платформа.

Иконки (Icon) в коде — слот или имя иконки, а не boolean + swap.

## Table cell / Text

undefined · beta · Vue `<DsTableCellText>` · Flutter `DsTableCellText` · контракт `docs/components/table-cell-text.md`

Ячейка таблицы с текстом: основная строка и необязательная вторая строка.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `align` | start \| end | по правилу контракта | ось Align |
| `primary` | string | — | свойство Primary |
| `secondary` | string | — | свойство Secondary |
| `showSecondary` | boolean | true | свойство Show secondary |

Состояния в Figma: Default · Skeleton · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled`, `skeleton` — boolean props.

## Table cell / Date time

undefined · beta · Vue `<DsTableCellDateTime>` · Flutter `DsTableCellDateTime` · контракт `docs/components/table-cell-date-time.md`

Ячейка таблицы с датой и временем события: в строку или столбиком.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `layout` | row \| column | по правилу контракта | ось Layout |
| `date` | string | — | свойство Date |
| `time` | string | — | свойство Time |

Состояния в Figma: Default · Skeleton · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled`, `skeleton` — boolean props.

## Table cell / Coin

undefined · beta · Vue `<DsTableCellCoin>` · Flutter `DsTableCellCoin` · контракт `docs/components/table-cell-coin.md`

Ячейка таблицы с монетой или активом: символ монеты, тикер и название или сеть.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `size` | m \| s | по правилу контракта | ось Size |
| `ticker` | string | — | свойство Ticker |
| `name` | string | — | свойство Name |

Состояния в Figma: Default · Skeleton · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled`, `skeleton` — boolean props.

## Table cell / Transaction

undefined · beta · Vue `<DsTableCellTransaction>` · Flutter `DsTableCellTransaction` · контракт `docs/components/table-cell-transaction.md`

Ячейка таблицы с суммой операции: знак, число и единица. Выровнена по концу строки.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `direction` | unexpected \| credit \| neutral \| neutral-secondary | по правилу контракта | ось Direction |
| `value` | string | — | свойство Value |
| `unit` | string | — | свойство Unit |

Состояния в Figma: Default · Skeleton · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled`, `skeleton` — boolean props.

## Table cell / Image

undefined · beta · Vue `<DsTableCellImage>` · Flutter `DsTableCellImage` · контракт `docs/components/table-cell-image.md`

Ячейка таблицы с картинкой 52 и двумя строками текста (устройство, площадка).

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `primary` | string | — | свойство Primary |
| `secondary` | string | — | свойство Secondary |

Состояния в Figma: Default · Skeleton · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled`, `skeleton` — boolean props.

## Table cell / Progress

undefined · beta · Vue `<DsTableCellProgress>` · Flutter `DsTableCellProgress` · контракт `docs/components/table-cell-progress.md`

Ячейка таблицы с долей выполнения: полоса Progress шириной 80 и процент справа.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `percent` | string | — | свойство Percent |

Состояния в Figma: Default · Skeleton · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled`, `skeleton` — boolean props.

## Table cell / Avatar

undefined · beta · Vue `<DsTableCellAvatar>` · Flutter `DsTableCellAvatar` · контракт `docs/components/table-cell-avatar.md`

Ячейка таблицы с пользователем: аватар 40, имя со значками достижений и подпись второй строкой.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `name` | string | — | свойство Name |
| `caption` | string | — | свойство Caption |
| `achieves` | boolean | true | свойство Achieves |
| `starAchieve` | boolean | true | свойство Star achieve |
| `shieldAchieve` | boolean | true | свойство Shield achieve |

Состояния в Figma: Default · Skeleton · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled`, `skeleton` — boolean props.

## Table cell / Badge

undefined · beta · Vue `<DsTableCellBadge>` · Flutter `DsTableCellBadge` · контракт `docs/components/table-cell-badge.md`

Ячейка таблицы с бейджем: один Badge M, тон и текст — у вложенного экземпляра.

Props нет.

Состояния в Figma: Default · Skeleton · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled`, `skeleton` — boolean props.

## Table cell / Toggle

undefined · beta · Vue `<DsTableCellToggle>` · Flutter `DsTableCellToggle` · контракт `docs/components/table-cell-toggle.md`

Ячейка таблицы с переключателем: Toggle S без подписи, включает или выключает объект строки сразу.

Props нет.

Состояния в Figma: Default · Skeleton · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled`, `skeleton` — boolean props.

## Table cell / Star

undefined · beta · Vue `<DsTableCellStar>` · Flutter `DsTableCellStar` · контракт `docs/components/table-cell-star.md`

Ячейка таблицы с избранным: звезда (Icon button), которая добавляет строку в избранное и убирает из него.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `status` | off \| on | по правилу контракта | ось Status |

Состояния в Figma: Default · Skeleton · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled`, `skeleton` — boolean props.

## Table cell / Icon

undefined · beta · Vue `<DsTableCellIcon>` · Flutter `DsTableCellIcon` · контракт `docs/components/table-cell-icon.md`

Ячейка таблицы с иконкой 24: признак строки (тип, канал). Не нажимается.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `color` | primary \| secondary | по правилу контракта | ось Color |

Состояния в Figma: Default · Skeleton · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled`, `skeleton` — boolean props.

Иконки (Icon) в коде — слот или имя иконки, а не boolean + swap.

## Table cell / Buttons

undefined · beta · Vue `<DsTableCellButtons>` · Flutter `DsTableCellButtons` · контракт `docs/components/table-cell-buttons.md`

Ячейка таблицы с быстрыми действиями строки: до трёх Icon button Ghost S.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `button2` | boolean | true | свойство Button 2 |
| `button3` | boolean | true | свойство Button 3 |

Состояния в Figma: Default · Skeleton · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled`, `skeleton` — boolean props.

## Table cell / More

undefined · beta · Vue `<DsTableCellMore>` · Flutter `DsTableCellMore` · контракт `docs/components/table-cell-more.md`

Ячейка таблицы с кнопкой «⋯»: открывает меню действий строки (Menu).

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `status` | boolean | false | свойство Status |

Состояния в Figma: Default · Skeleton · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled`, `skeleton` — boolean props.

## Table cell / Status

undefined · beta · Vue `<DsTableCellStatus>` · Flutter `DsTableCellStatus` · контракт `docs/components/table-cell-status.md`

Ячейка таблицы со статусом: точка и подпись («имя воркера · активен»). Подпись и тон — у вложенного Status.

Props нет.

Состояния в Figma: Default · Skeleton · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled`, `skeleton` — boolean props.

## Table header cell

undefined · beta · Vue `<DsTableHeaderCell>` · Flutter `DsTableHeaderCell` · контракт `docs/components/table-header-cell.md`

Заголовок колонки таблицы; у сортируемой колонки — кнопка сортировки со стрелкой.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `align` | start \| end | по правилу контракта | ось Align |
| `sort` | none \| ascending \| descending | по правилу контракта | ось Sort |
| `label` | string | — | свойство Label |
| `showFilter` | boolean | false | свойство Show filter |
| `showInfo` | boolean | false | свойство Show info |

Состояния в Figma: Skeleton · Default · Hover · Pressed — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `skeleton` — boolean props.

## Table row

undefined · beta · Vue `<DsTableRow>` · Flutter `DsTableRow` · контракт `docs/components/table-row.md`

Строка таблицы: набор ячеек Table cell / … в колонках фиксированной ширины и разделитель снизу (`border/subtle`).

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `density` | compact \| regular | по правилу контракта | ось Density |
| `selected` | off \| on | по правилу контракта | ось Selected |

Состояния в Figma: Default · Hover · Pressed — ось State в код не идёт: Hover / Pressed / Focus даёт платформа.

## Tabs

undefined · beta · Vue `<DsTabs>` · Flutter `DsTabs` · контракт `docs/components/tabs.md`

Бар табов: переключение между разделами одного контекста. Внутри — экземпляры Tab, первый выбран; снизу разделитель `border/subtle` на всю ширину контейнера.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `size` | m \| l \| xl \| s | по правилу контракта | ось Size |
| `tab3` | boolean | true | свойство Tab 3 |
| `tab4` | boolean | true | свойство Tab 4 |
| `tab5` | boolean | false | свойство Tab 5 |
| `tab6` | boolean | false | свойство Tab 6 |

## Textarea

undefined · beta · Vue `<DsTextarea>` · Flutter `DsTextarea` · контракт `docs/components/textarea.md`

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `size` | m \| l \| xl | по правилу контракта | ось Size |
| `labelPosition` | above | по правилу контракта | ось Label position |
| `label` | string | — | свойство Label (слой `Field`, база `_Field base`) |
| `showLabel` | boolean | true | свойство Show label (слой `Field`, база `_Field base`) |
| `value` | string | — | свойство Value (слой `Field`, база `_Field base`) |
| `helper` | string | — | свойство Helper (слой `Field`, база `_Field base`) |
| `showHelper` | boolean | false | свойство Show helper (слой `Field`, база `_Field base`) |
| `counter` | string | — | свойство Counter (слой `Field`, база `_Field base`) |
| `showCounter` | boolean | false | свойство Show counter (слой `Field`, база `_Field base`) |
| `showLeading` | boolean | false | свойство Show leading (слой `Field`, база `_Field base`) |
| `showInline` | boolean | false | свойство Show inline (слой `Field`, база `_Field base`) |
| `showTrailing` | boolean | false | свойство Show trailing (слой `Field`, база `_Field base`) |
| `leading` | slot | — | свойство Leading (слой `Field`, база `_Field base`) |
| `inline` | slot | — | свойство Inline (слой `Field`, база `_Field base`) |
| `trailing` | slot | — | свойство Trailing (слой `Field`, база `_Field base`) |

Состояния в Figma: Default · Hover · Focus · Filled · Error · Disabled · Read-only · Loading · Skeleton — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled`, `error`, `readonly`, `loading`, `skeleton` — boolean props.

## Toggle

undefined · beta · Vue `<DsToggle>` · Flutter `DsToggle` · контракт `docs/components/toggle.md`

Переключатель: мгновенно включает настройку, без «Сохранить». Основа — legacy `baseToggle` (дорожка 48×28 / 40×24, ползунок 20 / 16).

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `status` | off \| on | по правилу контракта | ось Status |
| `size` | m \| s | по правилу контракта | ось Size |
| `controlPosition` | end \| start | по правилу контракта | ось Control position |
| `label` | string | — | свойство Label (слой `_Selection control`, база `_Selection control`) |
| `showLabel` | boolean | true | свойство Show label (слой `_Selection control`, база `_Selection control`) |
| `description` | string | — | свойство Description (слой `_Selection control`, база `_Selection control`) |
| `showDescription` | boolean | false | свойство Show description (слой `_Selection control`, база `_Selection control`) |

Состояния в Figma: Default · Hover · Pressed · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled` — boolean props.

## Toggle group

undefined · beta · Vue `<DsToggleGroup>` · Flutter `DsToggleGroup` · контракт `docs/components/toggle-group.md`

Группа переключателей: подпись группы, варианты, под ними подсказка.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `direction` | vertical | по правилу контракта | ось Direction |
| `size` | m \| s | по правилу контракта | ось Size |
| `showLabel` | boolean | true | свойство Show label |
| `showHelper` | boolean | true | свойство Show helper |
| `label` | string | — | свойство Label |
| `helper` | string | — | свойство Helper |

Состояния в Figma: Default · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled` — boolean props.

## Tooltip tour

undefined · beta · Vue `<DsTooltipTour>` · Flutter `DsTooltipTour` · контракт `docs/components/tooltip-tour.md`

Подсказка онбординга с шагами: номер шага, заголовок, пояснение и кнопки «Пропустить» и «Далее», стрелка на элемент. Для обучающих туров по экрану.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `placement` | top \| bottom | по правилу контракта | ось Placement |
| `tone` | neutral \| accent | по правилу контракта | ось Tone |
| `step` | string | — | свойство Step |
| `title` | string | — | свойство Title |
| `description` | string | — | свойство Description |
| `showStep` | boolean | true | свойство Show step |
| `showSkip` | boolean | true | свойство Show skip |

## Transaction

undefined · beta · Vue `<DsTransaction>` · Flutter `DsTransaction` · контракт `docs/components/transaction.md`

Строка операции в истории: вывод, пополнение, начисление, обмен. Нажимается целиком — открывает детали.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `type` | withdrawal \| deposit \| reward \| exchange | по правилу контракта | ось Type |
| `status` | completed \| pending \| failed | по правилу контракта | ось Status |

Состояния в Figma: Default · Hover · Pressed — ось State в код не идёт: Hover / Pressed / Focus даёт платформа.

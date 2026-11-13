# Ожидаемый API компонентов — beta (2026-11-13)

Собрано `scripts/agent-docs.mjs` из `docs/ds-manifest.json` — править не здесь, а в Figma (потом манифест) или в `scripts/contract-data.mjs`.
Это **ожидаемый** API по правилам имён `scripts/parity.mjs`: кода (DSP, Vue `ui-emcd-web`, Flutter) в доступе нет (`docs/dsp-check-2026-11-12.md`). Когда появится манифест кода — `npm run parity` сверит.

Правила имён: набор → `Ds` + PascalCase; ось → camelCase prop, значения — kebab-case; `State` — не prop; служебные свойства (Focus ring, Show hit area, Safe margin) в код не идут.
Значение оси по умолчанию — по правилу из раздела «2. Intent» контракта (вариант по умолчанию в Figma у части наборов пока другой — `docs/OPEN-QUESTIONS.md`).
Планируемые переименования при замене наборов (MAJOR, `docs/dev-handoff-2026-11-12.md`): `iconLeft` / `iconRight` → `iconStart` / `iconEnd`; ось выбранности — одна на систему.

## Accordion

undefined · beta · Vue `<DsAccordion>` · Flutter `DsAccordion` · контракт `docs/components/accordion.md`

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

## Avatar group

undefined · beta · Vue `<DsAvatarGroup>` · Flutter `DsAvatarGroup` · контракт `docs/components/avatar-group.md`

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
| `closeDeprecated` | boolean | false | свойство Close · deprecated |
| `chevronDeprecated` | boolean | false | свойство Chevron · deprecated |

Состояния в Figma: Skeleton · Default — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `skeleton` — boolean props.

Иконки (Icon) в коде — слот или имя иконки, а не boolean + swap.

## Counter

undefined · beta · Vue `<DsCounter>` · Flutter `DsCounter` · контракт `docs/components/counter.md`

Число рядом с табом, пунктом меню или иконкой (уведомления). Не статус.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `size` | s \| m | по правилу контракта | ось Size |
| `tone` | neutral \| accent \| danger | по правилу контракта | ось Tone |
| `value` | string | — | свойство Value |

## Breadcrumb item

undefined · beta · Vue `<DsBreadcrumbItem>` · Flutter `DsBreadcrumbItem` · контракт `docs/components/breadcrumb-item.md`

Пункт хлебных крошек: ссылка на предыдущий уровень; Current — текущая страница, не ссылка.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `label` | string | — | свойство Label |

Состояния в Figma: Default · Hover · Current · Pressed · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled` — boolean props.

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

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `level` | 1 \| 2 \| 3 \| 0 | по правилу контракта | ось Level |
| `radius` | container \| surface \| inner | по правилу контракта | ось Radius |
| `padding` | s \| m \| l | по правилу контракта | ось Padding |
| `border` | on \| off | по правилу контракта | ось Border |

## Chart axis label

undefined · beta · Vue `<DsChartAxisLabel>` · Flutter `DsChartAxisLabel` · контракт `docs/components/chart-axis-label.md`

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `size` | s \| l | по правилу контракта | ось Size |
| `label` | string | — | свойство Label |

Состояния в Figma: Default · Hover · Active · Skeleton — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `skeleton` — boolean props.

## Chart crosshair

undefined · beta · Vue `<DsChartCrosshair>` · Flutter `DsChartCrosshair` · контракт `docs/components/chart-crosshair.md`

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `target` | line \| bar | по правилу контракта | ось Target |

## Chart metric

undefined · beta · Vue `<DsChartMetric>` · Flutter `DsChartMetric` · контракт `docs/components/chart-metric.md`

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `tone` | default \| danger \| warning \| success | по правилу контракта | ось Tone |
| `label` | string | — | свойство Label |
| `value` | string | — | свойство Value |
| `icon` | boolean | false | свойство Icon |

Иконки (Icon) в коде — слот или имя иконки, а не boolean + swap.

## Chart tooltip

undefined · beta · Vue `<DsChartTooltip>` · Flutter `DsChartTooltip` · контракт `docs/components/chart-tooltip.md`

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

Состояния в Figma: Default · Hover · Pressed · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled` — boolean props.

Иконки (Icon, Trailing icon) в коде — слот или имя иконки, а не boolean + swap.

## Circle timer

undefined · beta · Vue `<DsCircleTimer>` · Flutter `DsCircleTimer` · контракт `docs/components/circle-timer.md`

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `size` | s \| m | по правилу контракта | ось Size |
| `progress` | 100 \| 75 \| 50 \| 25 | по правилу контракта | ось Progress |

## Code cell

undefined · beta · Vue `<DsCodeCell>` · Flutter `DsCodeCell` · контракт `docs/components/code-cell.md`

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `size` | l \| m | по правилу контракта | ось Size |
| `digit` | string | — | свойство Digit |

Состояния в Figma: Empty · Focus · Filled · Error · Success · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled`, `error` — boolean props.

## Code input

undefined · beta · Vue `<DsCodeInput>` · Flutter `DsCodeInput` · контракт `docs/components/code-input.md`

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `length` | 4 \| 6 | по правилу контракта | ось Length |
| `message` | string | — | свойство Message |
| `showMessage` | boolean | true | свойство Show message |

Состояния в Figma: Default · Error · Success · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled`, `error` — boolean props.

## Coin

undefined · beta · Vue `<DsCoin>` · Flutter `DsCoin` · контракт `docs/components/coin.md`

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `size` | xs \| s \| m \| l \| xl | по правилу контракта | ось Size |
| `network` | off \| on | по правилу контракта | ось Network |

Иконки (Coin, Network coin) в коде — слот или имя иконки, а не boolean + swap.

## Coin stack

undefined · beta · Vue `<DsCoinStack>` · Flutter `DsCoinStack` · контракт `docs/components/coin-stack.md`

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `size` | s \| m \| l | по правилу контракта | ось Size |
| `count` | 2 \| 3 \| 4 | по правилу контракта | ось Count |

## Date cell

undefined · beta · Vue `<DsDateCell>` · Flutter `DsDateCell` · контракт `docs/components/date-cell.md`

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `day` | string | — | свойство Day |

Состояния в Figma: Default · Hover · Today · Selected · Range start · Range middle · Range end · Outside · Disabled · Pressed — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled` — boolean props.

## Date range field

undefined · beta · Vue `<DsDateRangeField>` · Flutter `DsDateRangeField` · контракт `docs/components/date-range-field.md`

Props нет.

Состояния в Figma: Default · Focus · Filled · Error · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled`, `error` — boolean props.

## Divider

undefined · beta · Vue `<DsDivider>` · Flutter `DsDivider` · контракт `docs/components/divider.md`

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `orientation` | horizontal \| vertical | по правилу контракта | ось Orientation |
| `label` | off \| on | по правилу контракта | ось Label |
| `style` | solid \| dotted | по правилу контракта | ось Style |
| `labelText` | string | — | свойство Label text |

## Floating button

undefined · beta · Vue `<DsFloatingButton>` · Flutter `DsFloatingButton` · контракт `docs/components/floating-button.md`

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `layout` | icon \| extended | по правилу контракта | ось Layout |

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

Props нет.

## Input addon / Icon

undefined · beta · Vue `<DsInputAddonIcon>` · Flutter `DsInputAddonIcon` · контракт `docs/components/input-addon-icon.md`

Props нет.

Иконки (Icon) в коде — слот или имя иконки, а не boolean + swap.

## Input amount

undefined · beta · Vue `<DsInputAmount>` · Flutter `DsInputAmount` · контракт `docs/components/input-amount.md`

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

Состояния в Figma: Default · Focus · Error · Disabled · Hover — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled`, `error` — boolean props.

## Legend item

undefined · beta · Vue `<DsLegendItem>` · Flutter `DsLegendItem` · контракт `docs/components/legend-item.md`

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `label` | string | — | свойство Label |
| `value` | string | — | свойство Value |
| `showValue` | boolean | false | свойство Show value |

Состояния в Figma: Default · Hover · Selected · Skeleton — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `skeleton` — boolean props.

## Legend swatch

undefined · beta · Vue `<DsLegendSwatch>` · Flutter `DsLegendSwatch` · контракт `docs/components/legend-swatch.md`

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `marker` | dot \| line | по правилу контракта | ось Marker |
| `series` | 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 \| 8 | по правилу контракта | ось Series |

## Menu item

undefined · beta · Vue `<DsMenuItem>` · Flutter `DsMenuItem` · контракт `docs/components/menu-item.md`

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

## Multiselect option

undefined · beta · Vue `<DsMultiselectOption>` · Flutter `DsMultiselectOption` · контракт `docs/components/multiselect-option.md`

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

## Multiselect

undefined · beta · Vue `<DsMultiselect>` · Flutter `DsMultiselect` · контракт `docs/components/multiselect.md`

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `display` | count \| chips | по правилу контракта | ось Display |

Состояния в Figma: Default · Open · Error · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled`, `error` — boolean props.

## Nav item

undefined · beta · Vue `<DsNavItem>` · Flutter `DsNavItem` · контракт `docs/components/nav-item.md`

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `collapsed` | off \| on | по правилу контракта | ось Collapsed |
| `label` | string | — | свойство Label |
| `counter` | boolean | false | свойство Counter |

Состояния в Figma: Default · Hover · Selected · Pressed — ось State в код не идёт: Hover / Pressed / Focus даёт платформа.

Иконки (Icon) в коде — слот или имя иконки, а не boolean + swap.

## Overlay

undefined · beta · Vue `<DsOverlay>` · Flutter `DsOverlay` · контракт `docs/components/overlay.md`

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `blur` | off \| on | по правилу контракта | ось Blur |

## Page dot

undefined · beta · Vue `<DsPageDot>` · Flutter `DsPageDot` · контракт `docs/components/page-dot.md`

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `selected` | off \| on | по правилу контракта | ось Selected |

## Page indicator

undefined · beta · Vue `<DsPageIndicator>` · Flutter `DsPageIndicator` · контракт `docs/components/page-indicator.md`

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `count` | 2 \| 3 \| 4 \| 5 | по правилу контракта | ось Count |
| `selected` | 1 \| 2 \| 3 \| 4 \| 5 | по правилу контракта | ось Selected |

## Pagination

undefined · beta · Vue `<DsPagination>` · Flutter `DsPagination` · контракт `docs/components/pagination.md`

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `type` | pages \| compact | по правилу контракта | ось Type |
| `size` | s \| m | по правилу контракта | ось Size |

## Pagination item

undefined · beta · Vue `<DsPaginationItem>` · Flutter `DsPaginationItem` · контракт `docs/components/pagination-item.md`

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `size` | s \| m | по правилу контракта | ось Size |
| `page` | string | — | свойство Page |

Состояния в Figma: Default · Hover · Pressed · Selected · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled` — boolean props.

## Password field

undefined · beta · Vue `<DsPasswordField>` · Flutter `DsPasswordField` · контракт `docs/components/password-field.md`

Props нет.

Состояния в Figma: Empty · Typing · Valid · Error — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `error` — boolean props.

## Key-value row

undefined · beta · Vue `<DsKeyValueRow>` · Flutter `DsKeyValueRow` · контракт `docs/components/key-value-row.md`

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `emphasis` | default \| total \| muted | по правилу контракта | ось Emphasis |
| `key` | string | — | свойство Key |
| `value` | string | — | свойство Value |

## Progress

undefined · beta · Vue `<DsProgress>` · Flutter `DsProgress` · контракт `docs/components/progress.md`

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `size` | s \| m | по правилу контракта | ось Size |
| `tone` | accent \| success \| warning \| danger | по правилу контракта | ось Tone |
| `label` | string | — | свойство Label |
| `value` | string | — | свойство Value |
| `showLabel` | boolean | true | свойство Show label |

## Progress circle

undefined · beta · Vue `<DsProgressCircle>` · Flutter `DsProgressCircle` · контракт `docs/components/progress-circle.md`

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `size` | s \| m \| l | по правилу контракта | ось Size |
| `value` | string | — | свойство Value |

## Spinner

undefined · beta · Vue `<DsSpinner>` · Flutter `DsSpinner` · контракт `docs/components/spinner.md`

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `size` | s \| m \| l | по правилу контракта | ось Size |

## Promo card

undefined · beta · Vue `<DsPromoCard>` · Flutter `DsPromoCard` · контракт `docs/components/promo-card.md`

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

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `status` | off \| on | по правилу контракта | ось Status |
| `label` | string | — | свойство Label |
| `details` | string | — | свойство Details |
| `showDetails` | boolean | true | свойство Show details |

Состояния в Figma: Default · Hover · Disabled · Pressed — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled` — boolean props.

## Radio group

undefined · beta · Vue `<DsRadioGroup>` · Flutter `DsRadioGroup` · контракт `docs/components/radio-group.md`

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

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `size` | s \| m \| l \| xl | по правилу контракта | ось Size |
| `items` | 2 \| 3 \| 4 | по правилу контракта | ось Items |

## Select

undefined · beta · Vue `<DsSelect>` · Flutter `DsSelect` · контракт `docs/components/select.md`

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `size` | m \| l \| xl | по правилу контракта | ось Size |

Состояния в Figma: Default · Hover · Open · Filled · Error · Disabled · Loading · Skeleton — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled`, `error`, `loading`, `skeleton` — boolean props.

## Select compact

undefined · beta · Vue `<DsSelectCompact>` · Flutter `DsSelectCompact` · контракт `docs/components/select-compact.md`

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `text` | string | — | свойство Text |
| `showLeading` | boolean | true | свойство Show leading |
| `leading` | slot | — | свойство Leading |

Состояния в Figma: Default · Hover · Open · Disabled · Pressed — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled` — boolean props.

## Skeleton

undefined · beta · Vue `<DsSkeleton>` · Flutter `DsSkeleton` · контракт `docs/components/skeleton.md`

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `shape` | text \| title \| circle \| rect \| button \| input \| chip | по правилу контракта | ось Shape |

## Stat card

undefined · beta · Vue `<DsStatCard>` · Flutter `DsStatCard` · контракт `docs/components/stat-card.md`

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

## Step progress

undefined · beta · Vue `<DsStepProgress>` · Flutter `DsStepProgress` · контракт `docs/components/step-progress.md`

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `count` | 3 \| 4 \| 5 \| 6 \| 7 | по правилу контракта | ось Count |
| `step` | 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 7 | по правилу контракта | ось Step |

## Step segment

undefined · beta · Vue `<DsStepSegment>` · Flutter `DsStepSegment` · контракт `docs/components/step-segment.md`

Props нет.

Состояния в Figma: Done · Current · Upcoming — ось State в код не идёт: Hover / Pressed / Focus даёт платформа.

## Step symbol

undefined · beta · Vue `<DsStepSymbol>` · Flutter `DsStepSymbol` · контракт `docs/components/step-symbol.md`

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `type` | numbered \| icon \| checked \| bullet | по правилу контракта | ось Type |
| `number` | string | — | свойство Number |

Состояния в Figma: Default · Current · Success — ось State в код не идёт: Hover / Pressed / Focus даёт платформа.

## Step trail

undefined · beta · Vue `<DsStepTrail>` · Flutter `DsStepTrail` · контракт `docs/components/step-trail.md`

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `border` | solid \| dotted | по правилу контракта | ось Border |

Состояния в Figma: Default · Current · Success — ось State в код не идёт: Hover / Pressed / Focus даёт платформа.

## Step

undefined · beta · Vue `<DsStep>` · Flutter `DsStep` · контракт `docs/components/step.md`

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `label` | string | — | свойство Label |
| `description` | string | — | свойство Description |
| `showDescription` | boolean | false | свойство Show description |

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

## Table header cell

undefined · beta · Vue `<DsTableHeaderCell>` · Flutter `DsTableHeaderCell` · контракт `docs/components/table-header-cell.md`

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `align` | start \| end | по правилу контракта | ось Align |
| `sort` | none \| ascending \| descending | по правилу контракта | ось Sort |
| `label` | string | — | свойство Label |
| `showFilter` | boolean | false | свойство Show filter |
| `showInfo` | boolean | false | свойство Show info |

Состояния в Figma: Skeleton · Default · Hover · Pressed — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `skeleton` — boolean props.

## Table cell / Text

undefined · beta · Vue `<DsTableCellText>` · Flutter `DsTableCellText` · контракт `docs/components/table-cell-text.md`

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `align` | start \| end | по правилу контракта | ось Align |
| `primary` | string | — | свойство Primary |
| `secondary` | string | — | свойство Secondary |
| `showSecondary` | boolean | true | свойство Show secondary |

Состояния в Figma: Default · Skeleton · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled`, `skeleton` — boolean props.

## Table cell / Date time

undefined · beta · Vue `<DsTableCellDateTime>` · Flutter `DsTableCellDateTime` · контракт `docs/components/table-cell-date-time.md`

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `layout` | row \| column | по правилу контракта | ось Layout |
| `date` | string | — | свойство Date |
| `time` | string | — | свойство Time |

Состояния в Figma: Default · Skeleton · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled`, `skeleton` — boolean props.

## Table cell / Coin

undefined · beta · Vue `<DsTableCellCoin>` · Flutter `DsTableCellCoin` · контракт `docs/components/table-cell-coin.md`

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `size` | m \| s | по правилу контракта | ось Size |
| `ticker` | string | — | свойство Ticker |
| `name` | string | — | свойство Name |

Состояния в Figma: Default · Skeleton · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled`, `skeleton` — boolean props.

## Table cell / Transaction

undefined · beta · Vue `<DsTableCellTransaction>` · Flutter `DsTableCellTransaction` · контракт `docs/components/table-cell-transaction.md`

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `direction` | unexpected \| credit \| neutral \| neutral-secondary | по правилу контракта | ось Direction |
| `value` | string | — | свойство Value |
| `unit` | string | — | свойство Unit |

Состояния в Figma: Default · Skeleton · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled`, `skeleton` — boolean props.

## Table cell / Image

undefined · beta · Vue `<DsTableCellImage>` · Flutter `DsTableCellImage` · контракт `docs/components/table-cell-image.md`

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `primary` | string | — | свойство Primary |
| `secondary` | string | — | свойство Secondary |

Состояния в Figma: Default · Skeleton · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled`, `skeleton` — boolean props.

## Table cell / Progress

undefined · beta · Vue `<DsTableCellProgress>` · Flutter `DsTableCellProgress` · контракт `docs/components/table-cell-progress.md`

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `percent` | string | — | свойство Percent |

Состояния в Figma: Default · Skeleton · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled`, `skeleton` — boolean props.

## Table cell / Avatar

undefined · beta · Vue `<DsTableCellAvatar>` · Flutter `DsTableCellAvatar` · контракт `docs/components/table-cell-avatar.md`

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

Props нет.

Состояния в Figma: Default · Skeleton · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled`, `skeleton` — boolean props.

## Table cell / Toggle

undefined · beta · Vue `<DsTableCellToggle>` · Flutter `DsTableCellToggle` · контракт `docs/components/table-cell-toggle.md`

Props нет.

Состояния в Figma: Default · Skeleton · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled`, `skeleton` — boolean props.

## Table cell / Icon

undefined · beta · Vue `<DsTableCellIcon>` · Flutter `DsTableCellIcon` · контракт `docs/components/table-cell-icon.md`

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `color` | primary \| secondary | по правилу контракта | ось Color |

Состояния в Figma: Default · Skeleton · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled`, `skeleton` — boolean props.

Иконки (Icon) в коде — слот или имя иконки, а не boolean + swap.

## Table cell / Buttons

undefined · beta · Vue `<DsTableCellButtons>` · Flutter `DsTableCellButtons` · контракт `docs/components/table-cell-buttons.md`

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `button2` | boolean | true | свойство Button 2 |
| `button3` | boolean | true | свойство Button 3 |

Состояния в Figma: Default · Skeleton · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled`, `skeleton` — boolean props.

## Table cell / More

undefined · beta · Vue `<DsTableCellMore>` · Flutter `DsTableCellMore` · контракт `docs/components/table-cell-more.md`

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `status` | boolean | false | свойство Status |

Состояния в Figma: Default · Skeleton · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled`, `skeleton` — boolean props.

## Table row

undefined · beta · Vue `<DsTableRow>` · Flutter `DsTableRow` · контракт `docs/components/table-row.md`

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `density` | compact \| regular | по правилу контракта | ось Density |

Состояния в Figma: Default · Hover · Selected · Pressed — ось State в код не идёт: Hover / Pressed / Focus даёт платформа.

## Table cell / Status

undefined · beta · Vue `<DsTableCellStatus>` · Flutter `DsTableCellStatus` · контракт `docs/components/table-cell-status.md`

Props нет.

Состояния в Figma: Default · Skeleton · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled`, `skeleton` — boolean props.

## Tabs

undefined · beta · Vue `<DsTabs>` · Flutter `DsTabs` · контракт `docs/components/tabs.md`

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

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `placement` | top \| bottom | по правилу контракта | ось Placement |
| `tone` | neutral \| accent | по правилу контракта | ось Tone |
| `step` | string | — | свойство Step |
| `title` | string | — | свойство Title |
| `description` | string | — | свойство Description |
| `showStep` | boolean | true | свойство Show step |
| `showSkip` | boolean | true | свойство Show skip |

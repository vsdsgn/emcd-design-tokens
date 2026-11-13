# Ожидаемый API компонентов — beta (2026-11-13)

Собрано `scripts/agent-docs.mjs` из `docs/ds-manifest.json` — править не здесь, а в Figma (потом манифест) или в `scripts/contract-data.mjs`.
Это **ожидаемый** API по правилам имён `scripts/parity.mjs`: кода (DSP, Vue `ui-emcd-web`, Flutter) в доступе нет (`docs/dsp-check-2026-11-12.md`). Когда появится манифест кода — `npm run parity` сверит.

Правила имён: набор → `Ds` + PascalCase; ось → camelCase prop, значения — kebab-case; `State` — не prop; служебные свойства (Focus ring, Show hit area, Safe margin) в код не идут.
Значение оси по умолчанию — по правилу из раздела «2. Intent» контракта (вариант по умолчанию в Figma у части наборов пока другой — `docs/OPEN-QUESTIONS.md`).
Планируемые переименования при замене наборов (MAJOR, `docs/dev-handoff-2026-11-12.md`): `iconLeft` / `iconRight` → `iconStart` / `iconEnd`; ось выбранности — одна на систему.

## Amount

атом · beta · Vue `<DsAmount>` · Flutter `DsAmount` · контракт `docs/components/amount.md`

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

атом · beta · Vue `<DsAvatar>` · Flutter `DsAvatar` · контракт `docs/components/avatar.md`

Круглое изображение пользователя, субаккаунта или контрагента: инициал, иконка или фото.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `size` | xs \| s \| m \| l | по правилу контракта | ось Size |
| `type` | text \| icon \| image | по правилу контракта | ось Type |
| `initials` | string | — | свойство Initials |
| `status` | boolean | false | свойство Status |

## Badge

атом · beta · Vue `<DsBadge>` · Flutter `DsBadge` · контракт `docs/components/badge.md`

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

атом · beta · Vue `<DsCounter>` · Flutter `DsCounter` · контракт `docs/components/counter.md`

Число рядом с табом, пунктом меню или иконкой (уведомления). Не статус.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `size` | s \| m | по правилу контракта | ось Size |
| `tone` | neutral \| accent \| danger | по правилу контракта | ось Tone |
| `value` | string | — | свойство Value |

## Breadcrumb item

атом · beta · Vue `<DsBreadcrumbItem>` · Flutter `DsBreadcrumbItem` · контракт `docs/components/breadcrumb-item.md`

Пункт хлебных крошек: ссылка на предыдущий уровень; Current — текущая страница, не ссылка.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `label` | string | — | свойство Label |

Состояния в Figma: Default · Hover · Current · Pressed · Disabled — ось State в код не идёт: Hover / Pressed / Focus даёт платформа; `disabled` — boolean props.

## Button

атом · beta · Vue `<DsButton>` · Flutter `DsButton` · контракт `docs/components/button.md`

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

## Checkbox

атом · beta · Vue `<DsCheckbox>` · Flutter `DsCheckbox` · контракт `docs/components/checkbox.md`

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

## Chip

атом · beta · Vue `<DsChip>` · Flutter `DsChip` · контракт `docs/components/chip.md`

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

## Icon button

атом · beta · Vue `<DsIconButton>` · Flutter `DsIconButton` · контракт `docs/components/icon-button.md`

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

## Radio

атом · beta · Vue `<DsRadio>` · Flutter `DsRadio` · контракт `docs/components/radio.md`

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

## Segment

атом · beta · Vue `<DsSegment>` · Flutter `DsSegment` · контракт `docs/components/segment.md`

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

## Status

атом · beta · Vue `<DsStatus>` · Flutter `DsStatus` · контракт `docs/components/status.md`

Точка + подпись: состояние объекта (воркер, устройство, сервис, выплата) в строке таблицы, списке, шапке.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `size` | s \| m | по правилу контракта | ось Size |
| `tone` | success \| warning \| danger \| info \| neutral | по правилу контракта | ось Tone |
| `label` | string | — | свойство Label |
| `showLabel` | boolean | true | свойство Show label |

## Dot

атом · beta · Vue `<DsDot>` · Flutter `DsDot` · контракт `docs/components/dot.md`

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `size` | s \| m | по правилу контракта | ось Size |
| `tone` | success \| warning \| danger \| info \| neutral | по правилу контракта | ось Tone |

## Tab

атом · beta · Vue `<DsTab>` · Flutter `DsTab` · контракт `docs/components/tab.md`

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

## Toggle

атом · beta · Vue `<DsToggle>` · Flutter `DsToggle` · контракт `docs/components/toggle.md`

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

## Input

молекула · beta · Vue `<DsInput>` · Flutter `DsInput` · контракт `docs/components/input.md`

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

молекула · beta · Vue `<DsInputAddonUnit>` · Flutter `DsInputAddonUnit` · контракт `docs/components/input-addon-unit.md`

Единицы или валюта в suffix поля (USDT, TH/s, %, kW).

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `text` | string | — | свойство Text |

## Input addon / Max

молекула · beta · Vue `<DsInputAddonMax>` · Flutter `DsInputAddonMax` · контракт `docs/components/input-addon-max.md`

Кнопка «Max» в suffix поля суммы: подставляет весь доступный остаток.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `text` | string | — | свойство Text |

## Input addon / Chevron

молекула · beta · Vue `<DsInputAddonChevron>` · Flutter `DsInputAddonChevron` · контракт `docs/components/input-addon-chevron.md`

Шеврон для Select / Dropdown в trailing-слоте поля.

Props нет.

## Input addon / Stepper

молекула · beta · Vue `<DsInputAddonStepper>` · Flutter `DsInputAddonStepper` · контракт `docs/components/input-addon-stepper.md`

Степпер − / + для числового поля.

Props нет.

## Input addon / Counter

молекула · beta · Vue `<DsInputAddonCounter>` · Flutter `DsInputAddonCounter` · контракт `docs/components/input-addon-counter.md`

Счётчик «+N» в inline-слоте: сколько ещё значений выбрано в мультиселекте.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `text` | string | — | свойство Text |

## Textarea

молекула · beta · Vue `<DsTextarea>` · Flutter `DsTextarea` · контракт `docs/components/textarea.md`

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

## Tab bar item

организм · beta · Vue `<DsTabBarItem>` · Flutter `DsTabBarItem` · контракт `docs/components/tab-bar-item.md`

Пункт нижней навигации: иконка 24 + подпись. App и мобильный веб — одна схема.

| Prop | Тип / значения | По умолчанию | В Figma |
|---|---|---|---|
| `selected` | off \| on | по правилу контракта | ось Selected |
| `label` | string | — | свойство Label |
| `badgeDot` | boolean | false | свойство Badge dot |

Состояния в Figma: Default · Pressed — ось State в код не идёт: Hover / Pressed / Focus даёт платформа.

Иконки (Icon) в коде — слот или имя иконки, а не boolean + swap.

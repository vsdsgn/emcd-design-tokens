# Список изменений компонентов для DSP Export — 2026-11-06

Источники: журнал «🗄 Ночной проход · журнал (05–06.11)» и свойства компонентов в Figma (чтение 06.11), `docs/CHANGELOG-components.md`, `docs/HANDOFF.md`. Здесь только подтверждённое ими; чего там нет, не указано. Состояние на Components до публикации: статусы в Figma 🟡 beta 13, 🟢 stable 0. Статусы ниже — как в описании компонента в Figma на 06.11.

**SemVer.** Колонка «Версия» — класс изменения по правилам `CHANGELOG.md` (MAJOR — удалено или переименовано так, что ломает потребителя; MINOR — новое; PATCH — правка, не меняющая имена и структуру). Номер релиза библиотеки (сейчас `0.2.0`, одна версия на все библиотеки) назначает Стефан при Publish: в нём побеждает самое высокое изменение, то есть из-за пункта «Breaking» ниже это MAJOR-релиз.

## Breaking (MAJOR)

| Компонент | Что изменилось | Влияние на API | Версия |
|---|---|---|---|
| Alert, Banner → **Suggest** (🟠 draft, молекула) | один компонент сообщений внутри страницы (бывшие Alert и Banner, решение Стефана 2026-11-05). Свойства: `Layout` = Card \| Strip × `Tone` = Neutral \| Accent \| Info \| Success \| Warning \| Danger; булевы `Title`, `Description`, `Leading` (слот слева: иконка статуса `media/status/*`, логотип, монета), `Primary action`, `Secondary action`, `Close`; тексты `Title`, `Description`. Alert — 🗄 deprecated (Layout=Inline), страница в архиве; Banner отдельным компонентом не остаётся | удалить Alert и Banner, использовать Suggest; `Layout=Inline\|Toast\|Header` у Alert уходит: Inline → Suggest, Toast → Toast. Код: Alert, Banner → одна сущность с `layout: card\|strip`, `tone`, слот `leading`, 0–2 действия | MAJOR |
| **Toast** (🟠 draft, молекула), обновлено 2026-11-09 | отдельный компонент, поверх страницы, исчезает. `Layout` = Card \| Informer (Informer — мобильный, он же Header) × `Tone` = Info \| Success \| Warning \| Danger \| Neutral; булевы `Title`, `Description`, `Actions`, `Close`, `Icon`, `Timer`, `Safe area`. `Layout=Snack` и свойство `Snack action` удалены (решение Стефана 2026-11-09, Publish 09.11) | нет общих свойств с прежним Alert (`Layout=Toast`); `Snack` как значение `Layout` убрать. Решено 06.11: Success и Info 5 с, Warning 8 с, Danger не закрывается сам; стек ≤ 3, зазор 8; пауза при hover и фокусе; Web справа сверху, App сверху | MAJOR |
| **Snack** (🟠 draft, молекула), новый 2026-11-09 | отдельный компонент: `Tone` = Neutral \| Info \| Success \| Warning \| Danger; `Title`, `Icon`, `Action` (бывший `Snack action`); 343×48, тёмная плашка у нижнего края, без крестика, автоскрытие 4–5 с | новый компонент; действие `Action` перенесено из Toast | MINOR |
| **Badge и Counter** (🟡 beta, атомы, одна страница, два набора) | Counter — отдельный набор со своими свойствами: `Value` (текст), `Size` = S \| M, `Tone` = Neutral \| Accent \| Danger. Badge: `Label`, `Icon`, `Icon · swap`, `Close`, `Chevron`, `Focus ring`, `Size` = S \| M \| L, `Tone` = Neutral \| Accent \| Success \| Warning \| Danger \| Info, `Style` = Subtle \| Solid, `State` = Skeleton \| Default. Решение 19.10: Badge и Counter — разные компоненты; в Figma разведены | число и счётчик больше не варианты Badge: Counter — отдельный компонент; у Counter нет Success, Warning, Info, Style, Icon. Статус — Badge, число — Counter | MAJOR |
| **Button · ось Tone** (🟡 beta, атом; Icon button по тому же шаблону) | ось `Tone` = Default \| Danger на `Type` = Primary \| Secondary \| Tertiary \| Tertiary outline \| Text \| Inverted × `Size` = S \| M \| L \| XL × `State` = Default \| Hover \| Pressed \| Disabled. Было: Error, Secondary error, Text error (HANDOFF) | старые типы Error → `Primary` + `Tone=Danger`, Secondary error → `Secondary` + `Danger`, Text error → `Text` + `Danger`. Старый Button — «Button · deprecated» в архиве, удалить в следующей версии | MAJOR |
| **Table cell · Transaction** | `Direction` Debit → Unexpected (красный только для неожиданных списаний) | значение варианта переименовано | MAJOR |

## Новые компоненты (MINOR)

Статус у всех 🟠 draft, кроме отмеченных; борды v3 собраны.

| Компонент | Что это | Влияние на API | Версия |
|---|---|---|---|
| Coin (атом) | монета сети, `Size` XS–XL | новый | MINOR |
| Coin stack (молекула) | стопка монет, 2–4; в карте Figma значился «слить с Avatar group» (Type=Coin), решение не закрыто | новый | MINOR |
| Radio card | карточка-выбор с деталями; слой Hover / Pressed на всю высоту, Focus ring, Pressed | новый | MINOR |
| Date range field | поле диапазона дат | новый | MINOR |
| Date range panel (организм) | пресеты, календарь с диапазоном, «Сбросить», «Применить»; борда v3 | новый | MINOR |
| Dropdown panel (организм) | вкладки, поиск, «Сбросить всё», «Ничего не нашли» (`Content` = List \| Empty) | новый | MINOR |
| Circle timer (атом) | круговой таймер обратного отсчёта, `Size` = S \| M, `Progress` = 100 \| 75 \| 50 \| 25; используется свойством `Timer` у Toast | новый | MINOR |
| Overlay (атом) | подложка | новый | MINOR |
| Promo card (молекула) | промо-карточка (контент, не системное сообщение); `Size` S, M | новый | MINOR |
| Tooltip tour (молекула) | вне базы (решение 2026-11-06): расширение Tooltip вместе с тултипами графиков, не развивать | новый | MINOR |
| Multiselect (молекула) и Multiselect option | `Display` = Count \| Chips × `State` = Default \| Open \| Error \| Disabled; option — строка списка (Leading + swap, Description, check справа у Selected) | новый | MINOR |
| Suggest, Toast | см. выше (Breaking) | — | — |

## Изменения существующих (MINOR / PATCH)

| Компонент | Что изменилось | Влияние на API | Версия |
|---|---|---|---|
| Hover и Pressed по единому правилу (только слой `state/layer`, цвета не меняются) | Breadcrumb item, Tab, Chart axis label, Legend item, Input, Textarea, Input amount, Button Text; Slider (Hover, Pressed; Disabled — ползунок `control/knob`) | визуально; без смены свойств | PATCH |
| Tab bar item | ось `State` = Default \| Pressed | новая ось | MINOR |
| Floating button | Pressed без масштаба 0.98 (масштаб нажатия — только в коде); + Disabled; Focus ring | + значение State | MINOR |
| Radio card, Breadcrumb item | + Pressed (Radio card); + Pressed, Disabled (Breadcrumb item) | + значения State | MINOR |
| Focus ring (свойство) | Multiselect option, Floating button, Radio card, File upload | + булево свойство | MINOR |
| Disabled `text/disabled` | Input amount, Code input (message), Textarea (counter, helper) | визуально | PATCH |
| Spinner | `Size=L` 24 (было 20, как M) | значение размера | PATCH |
| Input | слоты Leading и Inline с содержимым по умолчанию; `Show inline` по умолчанию выключен | дефолты | PATCH |
| Select | поле отдаёт свойства вложенного поля наружу: `Show leading`, подмена слота на Coin / Coin stack | новые свойства | MINOR |
| Long text | max-width и перенос / многоточие: Checkbox, Radio, Toggle (480), группы (480), Code input (400), Chart metric (240), Legend item (160), Select compact (200), подпись оси (64), Step (160), Counter (40); Amount не усекаем | вёрстка | PATCH |
| Table row | «Адрес» шириной 150 во всех вариантах | вёрстка | PATCH |
| Table cell · Transaction | знак «−» / «+» вынесен в слой `sign`, число — в свойстве `Value` | свойство `Value` без знака | MINOR |
| Code input | `Message`: у Error и Success свои тексты | дефолты | PATCH |
| Table cell · Buttons | в Skeleton скрыты кнопки | вёрстка | PATCH |
| Skeleton | shimmer скрыт в мастерах; у Input и Textarea без «USDT», подсказки и счётчика | вёрстка | PATCH |
| Контролы (Button, Icon button, File upload) | `border/default` → `control/border/default` (этап 2) | токен | PATCH |
| Alert / Toast / Banner (до объединения) | глифы по тону, обводка `border/subtle` | вошло в Suggest и Toast | — |
| Icons | Symbols = 26 монет; флаги → `media/flag/*`, логотипы систем → `media/os/*`; `media/status/info\|success\|warning\|danger`, `media/profile-status-verified`; фиат в архиве | переименование путей иконок: `symbol/flag/*` → `media/flag/*`, `symbol/os/*` → `media/os/*` | MAJOR (пути иконок) |

## Ещё не решено и влияет на API

- Свойство «Show safe area» → «Safe margin» (`control/safe-margin`) и токены `os/safe-area/top|bottom|left|right` (решено 06.11, Figma ещё правит основной чат; в Button свойство пока `Show safe area`) — при выходе MAJOR для имени свойства.
- Слоты вложенных экземпляров: из кода не заполняются; Show filter, Show info, Show more у Table header cell / Table cell · Buttons — решение Стефана (вариант C).
- Beta у 13 компонентов — ждёт ответа Стефана; в Figma beta 13: Chip, Tab, Status, Tab bar item, Breadcrumb item, Checkbox, Radio, Toggle, Input, Textarea, Badge, Counter, Segment (+ Button, Icon button — с неотмеченным контрактом). Ready for dev на бордах beta ставит Стефан.
- Deprecated-токены (`action/tertiary/hover|pressed`, `surface/hover|active`, `control/segment-hover`, `action/secondary/hover`) — решение ждёт ответа; код их не использует после перехода на `state/layer`.

## Что проверить разработке до Export

DSP Export (окно, VPN) делает разработчик. Перед ним: опубликовать Components и Icons после ответов Стефана; сверить `Layout` у Toast; Code-колонка в описаниях (`HTML/CSS ✓ · Vue — · Flutter —`) показывает, что реализовано только в HTML/CSS демо.

## Обновление 2026-11-09

- **Toast:** `Layout` = Card \| Informer (Informer = Header, мобильный). **Snack — отдельный компонент** (решение Стефана 2026-11-09); значение `Layout=Snack` из Toast уходит (MAJOR для Toast), Snack — новый компонент (MINOR). В Figma вынос ещё не сделан; булево `Snack action` переезжает в Snack.
- Решено 2026-11-09 (см. `docs/OPEN-QUESTIONS.md`): beta у 13 остаётся; Deprecated-токены помечены; `os/safe-area/*` заведены; слоты и булевы Show filter / Show info / Show more — вариант C (в Figma ещё не сделано).

# Код компонентов EMCD DS 2.0 (пилот)

| Папка | Что |
|---|---|
| `styles/components.css` | общий CSS компонентов (классы `emcd-*`), генерируется `npm run code`; подключать после `build/css/index.css` |
| `react/` | React 18: `src/index.js` (без JSX), типы `index.d.ts` |
| `vue/` | Vue 3: `src/Ds*.vue`, `src/index.js` |

Пилот: Button, Icon button, Badge, Chip, Checkbox, Radio (+ Radio group), Toggle, Input, Textarea, Modal.
Пачка 2: Tabs (+ Tab), Segmented (+ Segment), Card, Stat card, Amount, Toast, Tooltip, Suggest, Status, Counter, Avatar, Divider, Spinner, Progress, List item, Transaction, Select, Menu (+ Menu item), Password field.
Пачка 3 (экраны майнинга): Icon, Coin, Coin stack, Nav item, Key-value row, Search, Select compact, Date range field, Page indicator, Legend swatch, Legend item, Chart metric, Table header cell, Table cell, Table row, Table (паттерн), Promo card, Sidebar, Chart plot, Chart card; конструкции (draft) — Top bar, Status summary, Promo carousel, Action bar.
Пачка 4 (19.11): Chart crosshair, Chart tooltip (hover Chart plot), Date cell, Calendar, Date range panel (встроенная панель Date range field).
Пачка 5 (19.11, App): Floating button, Tab bar item, Tab bar.
Top bar `platform` (19.11): mobile-web — логотип, аккаунт, баланс, «Меню»; app — Select compact аккаунта (без leading) · Select compact монеты (Coin stack: `coin` / `coins`) + Icon button Tertiary M «+» (`onAdd`, «Подключить»), высота 56, поля 8 / 16, зазор 8. Promo card: картинка — абсолютный фон справа снизу за текстом, колонку не сужает (текст 124 · 230 · 340, в узкой карточке — по колонке).
Пачка 6 (19.11, Калькулятор и Настройки): Section header (draft, новый); Amount `tone`; Card `ambientLight`; Page header (beta).
Загрузка (19.11, patterns 3.11a): Skeleton (кирпич Text · Title · Circle · Rect) + `skeleton` у Amount, Chart metric, Key-value row, Chip, Status summary; общий синхронный блик всех скелетонов (контракт Skeleton; «Уменьшить движение» — пульсация).
Иконки и монеты для кода — реестр `scripts/icons-code.mjs` (из `icons/svg` и `icons/symbols/coin`): блок `// @icons:begin` в `react/src/index.js` и `vue/src/icons.js`; `npm run code` запускает его перед `code-build`.
Контролы неуправляемые по умолчанию (без `value` / `v-model` — своё состояние; прототип кликается), с `value` + `onChange` — управляемые. Props — по контрактам `docs/components/*.md`. Тема, бренд и платформа — атрибуты `data-theme`, `data-brand`, `data-platform` на `<html>` (`build/css`).

```html
<html data-theme="dark" data-brand="emcd" data-platform="web">
<link rel="stylesheet" href="build/css/index.css">
<link rel="stylesheet" href="packages/styles/components.css">
```

React: `import { Button } from '…/packages/react/src/index.js'` → `<Button type="primary" label="Вывести" />`.
Vue: `import { DsButton } from '…/packages/vue/src'` → `<DsButton type="primary" label="Вывести" />`.

## Проверка — `npm run test:code`

Стенд `tests/code/` (свой `package.json`: react 18.3.1, react-dom, vue 3.5, @vue/server-renderer, @vue/compiler-sfc; корневые devDependencies не трогает):
- React — каждый экспорт `react/src/index.js` рендерится `renderToString` с представительными props (все значения осей + свойства 17–19.11) в Light и Dark; ошибка или предупреждение React — провал;
- Vue — каждый `vue/src/*.vue` компилируется `@vue/compiler-sfc` и рендерится `@vue/server-renderer`; предупреждение Vue — провал;
- классы — каждый `emcd-*` из разметки обоих фреймворков должен быть в `styles/components.css`.

Новый компонент — добавить представительные props в `tests/code/ssr.mjs` (без них стенд падает).

## Приведено к контрактам 17–19.11

| Набор | Что изменилось |
|---|---|
| Button | `size`: + `xs` 24 (только Web, без min-width); `xl` — только App (главный CTA внизу экрана); поля и зазор иконка — подпись по замеру Figma 19.11: XS 4 / 2, S 6 / 4, M 12 / 4, L 12 / 4, XL 16 / 4; min-width 64; иконки цвета подписи; Text — без отступов, `action-primary-default` |
| Icon button | `size`: `xs` · `s` · `m` · `l` (XL снят) |
| Badge | Subtle · Neutral — `status-neutral-subtle` + обводка `border-subtle`, текст `text-secondary` |
| Counter | квадрат `radius-sm`; Neutral — обводка `border-subtle`, цифра `text-secondary` |
| Chip | Selected — белая инверсная плашка, Meta `text-inverse-secondary`, слой состояний обычный; `statusDot` + `statusTone`; Disabled — без подложки |
| Tab / Tabs | `size`: `page` вместо `xl` (64, heading-md Medium); `statusDot` + `statusTone`; Counter — квадрат |
| Status | точка 6 у S и M; подпись Medium, `text-primary`; общая точка `.emcd-dot` для Tab и Chip |
| Amount | S 12 / M 14 — шрифт текста с табличными цифрами (моно снято); L — `heading-lg` (Web 24, Compact 20) Bold, тикер того же кегля Medium; фиат M — 14; XL — display; `align` start · end |
| Stat card | `tone` neutral · danger · warning · success; `align` start · center (поля 4 / 32); `link` + `onLink` (Icon button XS: Danger — Secondary Danger, иначе Tertiary); min-width снят |
| Suggest | Strip — `radius-inner`, без иконки (если не передан `leading`), заголовок label-md цвета тона, крестик в строке |
| List item | `showDescription` (по умолчанию true) |
| Segmented / Segment | `size`: `s` · `m` · `l` (XL снят); сегмент не уже 64 / 80 / 96; подпись S — label-sm |
| Input / Select / Textarea / Password field | `size`: `m` · `l` (XL снят); Input — `labelPosition` по умолчанию `on-border`; Hover — обводка `control-border-hover`; Textarea — `size` |
| Card | Padding L — 24 сверху и снизу, 32 по бокам |
| Progress | значение — шрифт текста (моно снято) |
| Modal | кнопки футера — Button L (было XL) |
| Select | `labelPosition`: `above` (по умолчанию) · `on-border` — панели фильтров (демо K4, 19.11) |
| Sidebar · Nav item | язык — Button Tertiary XS; шапка: brand с y 16, до первого пункта 24; иконка пункта 24 (по экранам Figma, демо K4) |
| Chart card | легенда над графиком (конец Top), Bottom — итог; Chip M периода на всю ширину только на Compact; hover — у Chart plot, карточка не обрезает тултип |
| Chart plot · Chart crosshair · Chart tooltip | `interactive` (по умолчанию вкл.): указатель / касание → ближайшая точка, перекрестие (линии — точки серий, столбцы — полоса) + тултип (`dates` / `times`, `series[].unit` / `format`); тултип справа, у края — слева или прижат к границе; фокус, ← / →, Home / End, Enter — закрепить, Esc — скрыть; `aria-live` озвучивает точку; `index` / `onIndexChange` (Vue `v-model:index`). Тултип — шрифт текста, моно только у осей |
| Calendar · Date cell | Mode single · range (начало → конец, обратный порядок меняется местами), сегодня — обводка, недоступные — `min` / `max` / `isDateDisabled`, неделя по локали (ru — Пн); клавиатура: стрелки, PageUp / PageDown (+ Shift — год), Home / End, Enter / Space, Esc; RTL — сетка и стрелки зеркалятся. Даты — ISO «ГГГГ-ММ-ДД» |
| Date range panel · Date range field | панель: пресеты (listbox) + Calendar Range + «Сбросить» / «Применить» (`presets=false` — мобильный, применение по второй дате); поле: `panel` — встроенный поповер, `value` / `onChange` (ISO), Esc и «Применить» возвращают фокус на поле; `onOpen` — по-прежнему для панели продукта |
| Table · Action bar | Compact: поля ячеек 6, шапка 12; Action bar снизу 24 или 16 + safe area |
| Floating button (новый) | `layout` icon (круг 56, только Primary L) · extended; `size` l 56 (поля 20, зазор 8, label-md) · m 40 (поля 16, зазор 6) и `type` primary · secondary (`action-secondary-default`, `text-primary`, `icon-primary`) — только у extended; `loading` — Spinner L |
| Tab bar · Tab bar item (новые) | 3–5 пунктов, иконка 24 + подпись overline 10 Medium; Selected — `icon-accent` + `text-accent` (по контракту), `aria-current`; Badge dot без числа (в доступном имени); `type: 'action'` — плашка 56 × 40 `action-secondary-default`, обводка `border-accent`, без подписи (`label` → `aria-label`), не выбирается (`onAction`); Safe area; стекло `material-thin`, reduced transparency — `surface-raised` |
| Transaction | Completed — без Status: сумма + фиат `fiat` «≈ $…»; Status — только у pending / failed |
| Action bar | `badge` + `badgeText` («A»): Badge S Neutral Subtle над последней кнопкой (top −высота / 2, конец −4); колонки — сеткой поровну |
| List item | `inset` (по умолчанию true): `false` — без боковых полей и мин. высоты (список внутри Card, M в одну строку — 48) |
| Chart tooltip | контракт «Код»: `rows` — массив (длина 1–4 ↔ ось Rows Figma) |
| Загрузка (State=Skeleton, 19.11) | та же высота, что после загрузки (проверка — `npm run demo:mining`, ±1 px). Amount `skeleton`: строка значения — плашка высотой строки размера (на доступную ширину, не шире S 96 · M 140 · L 200 · XL 280; S / M `radius/inner`, L / XL `radius/container`), фиат — короче, если `showFiat`; sign не применяется. Chart metric `skeleton`: подпись остаётся, значение — плашка 32 (`heading-lg`). Key-value row `skeleton`: ключ остаётся, значение — плашка высотой строки. Chip `skeleton`: плашка того же размера, `aria-hidden`. Stat card `skeleton`: строка дельты — только при `delta`, подвал — при `showFooter` (раньше дельта всегда: плитка статуса росла на 28). Status summary `skeleton`: плитки Skeleton, Tone=Neutral. Chart plot: Line + Bars в Skeleton — как Line (силуэт, колонки осей и строка X сохраняют место) |
| Section header (новый, draft) | `size` m — label/lg 16 Medium · s — label/md 14 Medium; `title` — настоящий заголовок `level` 2–4 (по умолчанию h3); `caption` — body/sm `text-secondary`; `trailing` (или children) — слот справа (Toggle, Button Text, Badge, Select compact), зазор 16, по центру; `showCaption` / `showTrailing` — по умолчанию по наличию содержимого |
| Page header (beta) | `size` large — Web, Heading/XL, сверху `space-8`, зазоры 16, действия справа (до двух: Secondary M + Primary M), табы через 24 · compact — под Top bar на корневых экранах App / мобильного веба, Heading/LG, поля 4 / 16 / 8, зазоры 12, действия рядом под заголовком с переносом, табы через 16; `title` — `h1` (`level` 1–3); `subtitle` — сводка одной строкой body/md `text-secondary`; слоты `breadcrumbs` (только вложенные страницы Web, в `nav` «Хлебные крошки»), `actions`, `tabs` (последним); `showSubtitle` / `showActions` / `showTabs` — по умолчанию по наличию содержимого. Фильтры (Select, Segmented) — не Actions |
| Amount | `tone`: default · success · danger — цвет значения и тикера без знака (только `sign="none"`; итог дохода — success); со знаком не применяется |
| Card | `ambientLight` — пятно `light-ambient-color` / `light-ambient-blur` справа сверху, обрезано радиусом (`overflow: hidden`), в Base прозрачное; одна герой-карточка на экран |
| Select | без лишнего по умолчанию: helper — только при `hint` / `error`, единицы нет (заглушки набора Figma «USDT», «Комиссия сети 1 USDT» не переносятся) |
| Checkbox · Toggle · Radio | узкая колонка (patterns 3.9a «Настройки → Вывод» Compact): строка Checkbox / Radio не шире контейнера (`max-width: min(480px, 100%)`), подпись и описание переносятся, в т. ч. длинное слово (`overflow-wrap: anywhere`); коробочка и дорожка Toggle не сжимаются (демо K4, 19.11) |
| Suggest | Strip: текст и кнопка в одну строку от ширины текста 160 (было 240) — колонка 400, экран 375 |
| Skeleton (новый) | `shape` text 12 · title 20 (`radius/inner`) · circle (`radius/full`) · rect (`radius/container`), `width` / `height`; inline-block по центру строки — строка текста сохраняет высоту; `aria-hidden`, `aria-busy` — у контейнера. Блик `emcd-skeleton-shimmer` (1.2 с, один градиент на экран через `background-attachment: fixed`) — общий для кирпича и State=Skeleton всех компонентов; `prefers-reduced-motion` — пульсация прозрачности `emcd-skeleton-pulse` (контракт Skeleton, решение 2026-10-31; правило 3.11a приведено 19.11) |

Пакеты пока не публикуются в npm: разработка забирает исходники; DSP / ui-emcd-web сверяет с ними свои компоненты.

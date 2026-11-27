# DS 2.0 — правки в Figma по итогам сборки компонентов в код

Сверка «◆ EMCD DS 2.0 — Components» на 26.11 при переносе beta-компонентов в Vue-библиотеку `ui-emcd-web` (0.7.0, 76 компонентов).
Сначала — что блокирует код, дальше — доступность, токены, расхождения описания со слоями и вопросы.

## 1. Блокирует код

**Используют устаревшие компоненты** — эти 4 компонента в код пока не перенесены:
- **Input amount** (`input row/currency`) и **Top bar** (`account`, `end/coin`) — внутри Select compact (deprecated 26.11).
- **`_List row`** → Trailing/amount — экземпляр Amount (deprecated); из-за этого стоят **List item** и **Transaction**.

**Свойство не привязано к слою у части вариантов** (слой есть, привязки нет):
- **`_List row`, Size S** (16 вариантов): из 15 свойств привязан только Focus ring — Label, Description, Leading, Trailing, Selected, Divider и др. в S не работают.
- **Sidebar, Layout=Fullscreen**: Header / Nav / Footer — обычные фреймы, не слоты; Promo не привязан.
- **Modal, Header=Coin**: Title, Header description, Show close, Divider, Body, Footer slot — не привязаны в 4–12 из 24 вариантов.
- **Progress, Mode=Indeterminate**: Label, Value, Show label.
- **Toast, Card · Neutral**: значок скрыт без привязки к Icon.
- **Button / Icon button, Primary S и XS · Disabled**: видимость `hit area · app` не привязана к переменной платформы (в остальных вариантах привязана).
- **Card**: Ambient light не работает — эллипс скрыт без привязки во всех 72 вариантах.
- **Avatar group**: «+N» задаётся дважды — ось More и свойство Show more; при More=On свойство не привязано.
- **Radio card**: Show details включён во всех 8 вариантах — детали видны и у невыбранных (противоречит «раскрываются у выбранной»).

**Структура:**
- **Select**: поле — отвязанная копия `_Field base` (фрейм, не экземпляр), правки основы до Select не дойдут; внутри 5 скрытых мёртвых слоёв. Плюс два кольца фокуса (у корня — только в Above, у поля — во всех состояниях без привязки).
- **Checkbox**: в 4 вариантах (Off · Default · Default) вложенный контрол называется `_Checkbox control`, в остальных 92 — `Control`.
- **Textarea**: во вложенном Field остались тексты Input («Сумма», «0.00»); **Dropdown panel**: во вложенном Input — тексты USDT.
- **Multiselect**: в Open смешаны «Multiselect option/Selected» (старая структура) и экземпляры набора Multiselect option.

## 2. Доступность и контраст

- **Segment, выбранный Accent**: фон `accent/subtle`, подпись `accent/on-subtle`, а иконка `icon/on-accent` (белая) — на светлой подложке почти не видна.
- **Floating button, Secondary · Loading**: спиннер `icon/on-accent` (белый) на светлой подложке — не виден.
- **Toast, Snack**: действие `text/link-inverse` на белой `surface/raised` — нет контраста.
- **Tooltip tour, Accent**: «Пропустить» — фиолетовый текст на акцентном фоне.
- **Checkbox Off**: обводка `border/subtle`, а в описании (и у Radio) — `border/strong` (≥ 3:1, WCAG 1.4.11).
- **Toggle Off**: ползунок залит `icon/disabled` (раньше `control/knob`) — включённый контрол выглядит отключённым.
- **Password field**: в описании подпись «глаза» меняется «Показать / Скрыть» — для кнопки-переключателя по WAI-ARIA подпись постоянная + состояние «нажата» (иначе читалка скажет «Скрыть пароль, нажата»). В коде сделано по WAI-ARIA.
- **Нет кольца фокуса**: точки Page indicator (кликабельные), значок «i» в Table header cell, переключатель профиля в Sidebar (нет и Hover).
- **Date cell**: в описании Disabled — зачёркнут, в слоях зачёркивания нет.

## 3. Токены

**Нет токенов:**
- слоя / z-index для всплывающих элементов («поверх всего») — нужен `layer/*`;
- размещения Toast: отступ от края экрана, промежуток между тостами;
- длительностей из описаний: Menu — закрытие 100 мс, Modal — 150 мс, Progress — 300 мс (есть 120 / 320); у Accordion в описании 320 / 200 мс, а токены enter / exit = 200 / 120.

**Значения числами вместо токенов** (самые заметные):
- размеры иконок: Badge 12 / 14 / 16, Chip 16, Tab 14 / 16, Segment 16, Tab bar item 24, Nav item 24 (есть `icon/size/lg`), Menu item L 24;
- `_Field base`: подпись на рамке сдвинута −8 / −12; каретка — радиус 1, ширина 2, высота 14 / 17;
- Toggle: обводка дорожки 1 px, ползунок 20 / 16; Checkbox: галочка 16;
- Tab: радиус индикатора 1 / 1.5, полоса скелетона; Badge Skeleton — ширина 48 / 56 / 56; размеры скелетонов у Accordion, Table cell, Table header cell, Legend item, Chart metric;
- Avatar: точка статуса, монета, бейдж сети (есть `size/dot`, `size/media`); у 2XS и S точка статуса не переставлена;
- Chart plot: сетка 1 px и пунктир 4 / 4, зазор 2 у Stacked, непрозрачность области 0.45, высота 140; Chart crosshair: линия 1, точка 8, ореол 16 и 0.24, полоса 24;
- Code cell: ширина 64 / 48, сдвиг каретки 44 / 36, межбуквенный −0.24 / −0.2; межбуквенный −0.24 / −0.2 также у Modal, Page header, Stat card, Empty state;
- разделители и границы 1 px: Tabs, Table row, Sidebar, Divider (Solid — высотой слоя), Notification;
- Legend item: гарнитура значения — строка «Roobert PRO» без токена.

## 4. Описание расходится со слоями

- **Матрицы в описаниях устарели**: Input «3×2×9 = 54» — вариантов 36; Textarea «27» — 18; Button «176 из 192» — 220; Badge «33 из 60» — 39; Chart plot «23» — 24.
- **Counter / Spinner упоминаются после слияния**: Badge («Когда нет: количество (Counter)» — противоречит Content=Number), Nav item, Menu item, Step symbol, `_Page dot`, Tab, Progress, Progress circle; у Badge ещё ссылка на Alert (в архиве).
- **Nav item**: Selected `action/secondary/default` (в описании `accent/subtle`); подпись 14 и высота 40 (в описании 16 и 36); слой состояния `radius/control-sm` при радиусе пункта 12.
- **Tab bar item Selected**: иконка `icon/primary`, в описании `icon/accent` + `text/accent`.
- **Toggle M**: подпись 14/20 переопределена в экземпляре, в основе `_Selection control` и описании — 16/24.
- **Tooltip**: Arrow по умолчанию Start (в описании Center); текст 14/20 (в описании 16/24); уголок выступает 8 (в описании 6); радиус корня `radius/control` vs поверхность `radius/container`.
- **Progress circle**: описание размеров «S 24 / M 48 / L 72» при шкале XS 16 · S 20 · M 24 · L 48 · XL 72.
- **Segmented**: описание про «Купить / Продать» и Success / Danger — у Segment эти тоны убраны 15.11.
- **Selection group**: у Toggle промежуток `space/16` в обоих размерах (в описании 12 / 8); заголовки «Radio group / Toggle group / Checkbox group:» после слияния 22.11.
- **Promo card**: описание требует «S — Text, M/L — Primary / Secondary», во всех 12 вариантах Button Text S. **Page header**: в описании Secondary M + Primary M, в слоях Tertiary + Primary. **Empty state**: «L — Primary + Secondary», в слоях Tertiary.
- **Stat card**: тип ссылки непоследовательный (Danger — Secondary · Danger, остальные Tertiary); у Center отступ снизу без ссылки.
- **Table row**: Regular — `size/row/lg` (64), в описании 80 (`size/table/row-lg`). **Table cell**: высота 64, в описании 48 / 80.
- **Toast**: Informer — то «мобильный веб», то «только App»; Snack — то «тёмный», то нейтральный; у Snack крестик за правым краем (−49 px), хотя «без крестика»; у Informer заливки из разных семейств (`action/*` у Danger / Success, `status/*/solid` у Info / Warning).
- **Suggest**: Strip «без иконки», а иконка видна; Show primary скрывает и вторую кнопку.
- **Address**: Short и Full оба моноширинные (в описании — только Full); Copy (Ghost) и Copied (Text) — разные типы кнопки на одном месте.
- **Action bar**: поля 16 / 16 / 32, в слоях снизу 24. **Status summary**: плитки разной высоты («Активные» выше на 2 px).
- **Step trail**: в описании Solid / Dotted × State, оси нет; **`_Step segment`**: Upcoming — `border/default` в описании, `control/track` в слоях. **Step** ссылается на контейнер Stepper, которого нет.
- **Calendar**: у Single между днями `space/2`, у Range — 0; у Range шапка 292 при сетке 280.

## 5. Вопросы — нужно решение

1. **Badge Number**: правило «99+» было только в описании Counter. Переносить в Badge?
2. **Date range panel**: «Квартал» и «Год» — скользящие 3 / 12 месяцев или календарные?
3. **Chart plot**: у Bars нет сетки, у остальных есть — так задумано? У второй области Dual area нижняя точка градиента `#F59E0B`, верхняя `data/4` — опечатка?
4. **Table header cell**: `Sortable` не привязан при Sort = Ascending / Descending — иконка там всегда видна? Что после Ascending — снова None? Show filter — индикатор или кнопка?
5. **Tooltip Accent** и **Tooltip tour Accent**: обводка та же серая `border/default` — так задумано?
6. **Chart tooltip**: «ещё N» (описание) или «+N» (правила)? Слоя для этой строки нет.
7. **Dropdown panel**: в A11y «dialog или listbox» — нужен один вариант.
8. **Sheet на Compact** описан у Select, Menu, Multiselect, но компонента Sheet нет.
9. **Empty state**: иллюстрация — растровый набор из файла Illustrations (draft); когда он станет частью DS?
10. **Логотип** `logo/Brand logo` для Sidebar и Top bar — нужен как компонент / ассет.

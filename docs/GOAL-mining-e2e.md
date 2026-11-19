# Цель: Майнинг на DS 2.0 — от Figma до кода (поставлена 2026-11-19)

**Цель.** 6 экранов майнинга (Web 1440 и мобильный веб 375: Дашборд, Воркеры, История; Dark) собраны в Figma только из Base и конструкций; каждый используемый компонент есть в коде репо (`packages/react`, `packages/vue`, общий CSS); те же экраны собраны из кода на демо-странице и совпадают с Figma.

Работаем без остановок до выполнения всех критериев. Publish библиотек — **один в конце** (правки компонентов копятся в Components; на экранах до Publish — допустимые override).

## Критерии готовности

| # | Критерий | Как проверяем | Статус |
|---|---|---|---|
| K1 | Экраны в Figma — только DS: каждый узел — экземпляр библиотеки, его потомок, раскладочный фрейм без заливки и обводки или разрешённый контент (картинка промо, логотип, данные графика) | скрипт-аудит кадров → 0 нарушений | [x] 19.11 |
| K2 | Покрытие: у каждого набора с экранов — статус beta+ (конструкции — draft допустим), контракт, борда, **код React и Vue** | инвентарь с экранов × `packages/*` → 100 % | [x] 19.11 (код 57 компонентов; борды 5 draft — 2560868) |
| K3 | Код = текущий контракт (правки 17–19.11: XL снят, Chip Selected белый + Status dot + meta `text/inverse-secondary`, Stat card Align / Link, Amount L 24 Bold, Button зазор, Tab Status dot, Table header Sortable, Nav item 16, Promo card Align, `text/secondary` 56 % и т. д.) | сверка props с `docs/api.md`, SSR-тесты | [x] 19.11 |
| K4 | Демо `demo/mining/` — 6 экранов из кода (React), Dark; скриншоты Playwright рядом с Figma | расхождения записаны и исправлены | [x] 19.11 (остаток — `demo/mining/README.md`: плотный List item, бейдж автовыгрузки; hover графика — в коде 19.11; Amount L / «Мониторинг» на экранах — после Publish) |
| K5 | Проверки зелёные: `contracts --check`, `parity`, `code --check`, `agent-docs --check`, `exceptions`, SSR React и Vue | вывод команд | [x] 19.11 |
| K6 | Один Publish Components в конце, экраны обновлены, HANDOFF и патчноут для разработки | — | [ ] |

## Очередь на Publish Components (правки после последнего Publish)
- Amount L — `type/heading/lg` (было xl).
- Promo card Align=Center — заголовок на всю ширину.
- Status summary Layout=Column — плитки тянутся по высоте.
- Action bar — низ `space/24` (высота 80 = 16 + 40 + 24, как на экранах), высота по содержимому.
- Sidebar — язык Button Tertiary XS (как на экранах).
- Action bar — свойство Badge (бейдж автодействия над последней кнопкой).
- Floating button — оси Size (L | M) и Type (Primary | Secondary) для Extended.
- Transaction — у Completed статус скрыт, показан фиат.
- Tab bar item — Type=Action (центральная «E» App).
- Amount, Chart metric, Key-value row — State=Skeleton (та же высота); Chart plot — Skeleton у Line + Bars.

- Card — Ambient light; Amount — ось Tone; новый Section header (draft).
- Top bar — Platform=App (аккаунт, монета, «+»).

## Журнал
- 19.11 — демо: +5 экранов (всего 15) — Выплаты Web и мобильный (3.6a: направление, «В Explorer» Button Text S / XS + `arrow-new-tab`, у Coinhold ссылки нет), Watcher-link мобильный (3.9a Compact: Suggest Accent, Page header Compact + Icon button Secondary «Фильтр», Card M столбиком, Floating button Extended L «Создать Watcher link» по центру снизу), Настройки → Уведомления мобильный (Segmented на всю ширину, Card L: Section header M, Select аккаунта с подсказкой, List item M с шевроном) и Настройки → Вывод мобильный (Select монеты с Coin, Card L «Куда выводить средства?»: Toggle × 2 с описанием, Select, Input Read-only, Checkbox с описанием, Divider, Promo card M Accent). Сравнения с экранами DS 2.0 (`reference/`). Компонент: Checkbox / Toggle в узкой колонке — строка не шире контейнера, подпись переносится (было: Checkbox 181 в колонке 96, слово Toggle вылезало). Проверки зелёные, консоль чистая.
- 19.11 — Page header в коде (beta): `size` large · compact (Heading/XL · Heading/LG), `title` — `h1` (`level` 1–3), `subtitle` + `showSubtitle`, слоты `breadcrumbs` (в `nav`, только вложенные страницы), `actions` (Large — справа, до двух; Compact — ряд под заголовком с переносом), `tabs` (последним). React, Vue, CSS, d.ts, Claude DS, SSR (68 компонентов); контракт — раздел «Код». Демо: заголовки «Калькулятор доходности» и «Мои Watcher link» — Page header Large (у Watcher-link 2 Select — фильтры, не Actions: остались в ряду меню вместе с «Создать»). Проверки зелёные, сравнения без сдвигов.
- 19.11 — код по решениям 19.11: новый Section header (draft; `size` m · s, `title` — заголовок `level` h2–h4, по умолчанию h3, `caption`, слот `trailing`), Amount `tone` default · success · danger (только при sign none), Card `ambientLight` (пятно `light-ambient-*` справа сверху, обрезано радиусом, в Base прозрачное — как у Stat card); Select — без лишнего по умолчанию (helper только при `hint` / `error`, единицы нет — заглушки набора «USDT», «Комиссия сети 1 USDT» в код не идут); Suggest Strip — текст и кнопка в ряд от 160 (колонка 400, 375); иконка `link`. React, Vue, CSS, d.ts, Claude DS (README / preview, status.json +SectionHeader), SSR (67 компонентов). Демо: +4 экрана — Калькулятор Web и мобильный (3.10a), Watcher-link и Настройки → Уведомления Web (3.9a), всего 10; сравнения с макетами DS 2.0 (макеты 1200 × 750 растягиваются до ширины страницы); остаток — README демо. Проверки зелёные.
- 19.11 — код загрузки (patterns 3.11a): `skeleton` у Amount (значение — плашка высотой строки, фиат — короче при `showFiat`, sign не применяется), Chart metric, Key-value row, Chip, Status summary (Tone=Neutral); Stat card Skeleton — строка дельты только при `delta` (плитка статуса была выше на 28); Chart plot Line + Bars Skeleton = Line; новый Skeleton (кирпич Text · Title · Circle · Rect) + общий синхронный пульс всех скелетонов, reduced motion — статично. React, Vue, CSS, d.ts, Claude DS (README / preview, status.json +Skeleton), SSR (66 компонентов). Демо: `?state=loading` у дашбордов Web и мобильного, скриншоты `out/*-loading.png`, проверка высот блоков (±1 px) в `shots.mjs` — совпадают. Проверки зелёные.
- 19.11 — код, пачка 5 (правки App 19.11 из очереди Publish): Floating button (`layout`, `size` l / m, `type` primary / secondary только у Extended), Tab bar + Tab bar item (`type: 'action'` — центральная «E»), Transaction Completed без Status (сумма + фиат), Action bar `badge` / `badgeText`, List item `inset`; контракт Chart tooltip — `rows` массивом. React, Vue, CSS, d.ts, Claude DS (README / preview), status.json (+TabBar, TabBarItem), SSR (65 компонентов). Демо: бейдж «A» над «Выгрузить» (мобильная История), строки монет «Истории» Web — `inset={false}` (48); две строки README демо закрыты. Проверки зелёные.
- 19.11 — код, пачка 4: hover графика — Chart crosshair + Chart tooltip, Chart plot `interactive` (указатель, касание, ← / →, Enter, Esc, aria-live; тултип у края — слева или прижат, шрифт текста); Calendar + Date cell, Date range panel, Date range field `panel` (встроенный поповер). React, Vue, CSS, d.ts, Claude DS, SSR (62 компонента). Демо: hover на дашбордах, скриншот `out/web-dashboard-hover.png`; «Период» в «Истории» Web открывает панель. Строка «hover графика» в README демо закрыта. Проверки зелёные.
- 19.11 — иконки переэкспортированы из Figma (115, хеши сверены), символы ETH / USDT; контракты Promo S (3 строки), Table cell 14, Select labelPosition, Nav item 24; манифест D37 (Action bar, Sidebar). Все проверки зелёные, демо пересобрано. K3–K5 выполнены. Дальше — K6: один Publish.
- 19.11 — цель поставлена. K1 выполнен (шапка Web — Divider вместо обводки, BTC — символ DS). Код, пачка A (c3f2f7c): стенд `npm run test:code` (SSR React / Vue, классы ↔ CSS), 29 наборов приведены к контрактам 17–19.11. Контракты: раздел «Код» показывает код в репо.
- 19.11 — код, пачка 3: все наборы экранов майнинга в React и Vue (+24, всего 57), конструкции draft; Button — поля по замеру Figma. K2 по коду закрыт; остаётся демо `demo/mining/` (K4).
- 19.11 — K3: Amount L → `heading/lg`, Chart card — легенда над графиком (Bottom — итог), Action bar — поле снизу. K4: `demo/mining/` — 6 экранов только из `window.EMCD` (React 18 UMD локально), `npm run demo:mining` → скриншоты Playwright и сравнения «макет | код | разница». Два раунда правок по сравнению: в компонентах — Nav item иконка 24, Sidebar (язык Tertiary, поля шапки), Stat card шеврон, Amount M фиат 14, Select `labelPosition`, Chip M периода на Web справа, Table на Compact (поля 6, шапка 12), Action bar снизу 24. Осталось (README демо): Amount L и Promo Center на экранах ждут Publish; вопросы — Promo S 3 строки, Table cell 14, иконки сортировки, плотный List item, hover графика.

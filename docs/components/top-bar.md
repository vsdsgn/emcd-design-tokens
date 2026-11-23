# Top bar — контракт (2026-11-23)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Top bar`. Status: beta. Level: unknown.
- Figma: Components, страница «Top bar» (`2312:2`), набор `2312:35`. Платформы: iOS, Android, Mobile web.
- Страница «Top bar», конструкция (`docs/patterns.md`, разделы 0.2, 1.4, 1.5). Вложены Logo (Mobile web · Root), Icon button M («Меню», «+», «Назад», действие) и Select compact (App · Root: аккаунт, монета с Coin stack). Platform App — 19.11, Level Inner — 20.11 (Publish 21.11). Beta 21.11 по репо: Status в описании набора в Figma меняется отдельно.

## 2. Intent
- Верхняя панель экранов Compact: на корневом экране — аккаунт и контекст раздела, на вложенном — «Назад» и заголовок по центру. Высота 56, подложка `surface/level-0`.
- Когда использовать: корневые экраны мобильного веба и App (над Tabs M раздела или листом Card L1); вложенные экраны (Калькулятор, детали, вывод) — Level=Inner.
- Когда нет: Web — Sidebar + Page header (глобального Top bar на Web нет, `docs/patterns.md` 0); заголовок раздела с действиями и табами — Page header Compact под Top bar; модальный поток — шапка Sheet.
- Правило выбора варианта:
  - Platform: Mobile web — мобильный веб пула; App — приложение (iOS / Android). Размеры одинаковые: высота 56, поля `space/8` / `space/16`.
  - Level: Root — корневой экран раздела; Inner — вложенный экран, куда пришли из раздела.
  - Mobile web · Root: слот Logo (по умолчанию Logo · Network=EMCD, Style=Mono, 24) → аккаунт (имя + шеврон) → баланс (Show balance, копейки `text/tertiary`) → Icon button Ghost M «Меню» в конце; зазор `space/12`.
  - App · Root: Select compact аккаунта (без leading) в начале → в конце Select compact монеты (leading — Coin stack) и Icon button Tertiary M «+» («Подключить»); без логотипа, баланса и меню; зазор `space/8`.
  - Inner (обе Platform): Icon button Ghost M «Назад» (`chevron-left`) → Title по центру (Label/LG Medium, одна строка) → место 40 под одно действие; зазор `space/8`.
  - Show action (Inner): Off по умолчанию; On — одно действие экрана, Icon button Ghost M. Место 40 справа остаётся и при Off — заголовок всегда по центру.
  - Show balance (Mobile web · Root): On по умолчанию.
- Не делаем: Top bar на Web; Tabs, поиск или фильтры внутри Top bar; больше одного действия справа на Inner; заголовок в две строки; логотип, баланс или «Меню» на App; «Назад» на корневом экране.

## 3. Anatomy
- Корень — ряд, выравнивание по центру, отступы `space/8` (верх / низ) / `space/16` (бока), зазор `space/12` (Mobile web · Root) / `space/8` (App, Inner), подложка `surface/level-0`; ширина 375 и высота 56 — числом (образец).
- Слот `Logo` (Mobile web · Root) — Logo EMCD Mono 24.
- `account` — Mobile web: кнопка-текст, `account name` (`type/label/lg`, Medium, `text/primary`) + шеврон 16, зазор `space/4`; App: Select compact (`size/row/compact`, `action/secondary/default`, `radius/control-sm`, max-width `size/select-compact/max`, отступ `space/8`).
- `balance` — сумма `type/label/lg`, `text/primary` + `cents` (`text/tertiary`) + шеврон, зазор `space/4`.
- `menu` — Icon button Ghost M (`control/height/md`, `radius/control`), прижат к концу.
- `end` (App · Root, зазор `space/8`): `coin` — Select compact с Coin stack (те же токены, что у `account` App); `add` — Icon button Tertiary M (`action/secondary/default`, `control/height/md`, `radius/control`).
- `back` — Icon button Ghost M (`control/height/md`, `radius/control`).
- `title` — `type/label/lg`, Medium, `text/primary`, по центру, занимает остаток ширины.
- `action` — место `control/height/md` (40) под Icon button Ghost M (Show action).
- Вложено: `Logo` ×1, иконки ×2, `Icon button` ×6, `Select compact` ×2.
- Служебные слои (вариантов из 4): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент; интерактивны вложенные Icon button, Select compact и кнопки аккаунта / баланса (Mobile web · Root).
- Оси State нет: Hover / Pressed / Focus / Disabled — у вложенных Icon button и Select compact.
- Аккаунт и баланс Mobile web — текстовые кнопки: кольцо фокуса у текста, подложки нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Platform | Mobile web · App | Mobile web |
| Level | Root · Inner | Root |

Матрица полная: 4 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Logo | слот | — | 1 из 4 |
| Account | текст | «Alexandrewang» | 1 из 4 |
| Balance | текст | «$123 456» | 1 из 4 |
| Cents | текст | «.78» | 1 из 4 |
| Show balance | булево | вкл | 1 из 4 |
| Title | текст | «Калькулятор» | 2 из 4 |
| Show action | булево | выкл | 2 из 4 |

- Mobile web · Root: Logo — слот; Account, Balance, Cents — текст; Show balance — по умолчанию On.
- Inner: Title — текст; Show action — по умолчанию Off. App · Root: текстовых свойств нет — подписи во вложенных Select compact.

## 6. Content / slots
- Title — одна строка, усечение многоточием; длинное имя аккаунта — многоточие (App — по max-width `size/select-compact/max`).
- Баланс не переносится, цифры табличные (`tabular-nums`); копейки — отдельным текстом Cents.
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет. «Назад» (`chevron-left`) отражается.

## 7. Events
- React: `onBack` (Inner), `onAccount`, `onBalance`, `onMenu` (Mobile web), `onAccountChange` / `onCoinChange` (со списком) или `onAccount` / `onCoin` (свой Sheet), `onAdd` (App).
- Vue: события `back`, `account`, `balance`, `menu`, `coin`, `add`.

## 8. Behavior
- Статична. Список аккаунтов / монет — Menu listbox Select compact (`accountOptions` / `coinOptions`) или свой Sheet экрана.
- «Назад» возвращает на предыдущий экран; навигацию делает экран.

## 9. Accessibility
- Корень — `header`; Inner: Title — `h1`.
- Icon button с именами: «Назад», «Меню», «Подключить» (`backLabel`, `menuLabel`, `addLabel`).
- Баланс озвучивается одной фразой («Баланс $123 456.78»); Select compact — «Аккаунт: …», «Монета: …»; логотип — «EMCD».
- Кнопки аккаунта и баланса: зона нажатия по высоте ≥ `touch/min`.
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`). Кольцо и зоны нажатия — у вложенных Icon button и Select compact.

## 10. Tokens
- `корень`: заливка / цвет `surface/level-0`; интервал `space/12`, `space/8`; отступы `space/16`, `space/8`.
- `account`: заливка / цвет `action/secondary/default`; интервал `space/16`, `space/4`; высота `size/row/compact`; maxw `size/select-compact/max`; отступы `space/8`; радиус `radius/control-sm`.
- `account name`: заливка / цвет `text/primary`; типографика `type/label/lg`.
- `balance`: заливка / цвет `text/primary`; типографика `type/label/lg`; интервал `space/4`.
- `cents`: заливка / цвет `text/tertiary`; типографика `type/label/lg`.
- `menu`: интервал `space/6`; высота `control/height/md`; радиус `radius/control`; ширина `control/height/md`.
- `end`: интервал `space/8`; высота `control/height/md`; ширина `control/height/md`.
- `coin`: заливка / цвет `action/secondary/default`; интервал `space/16`; высота `size/row/compact`; maxw `size/select-compact/max`; отступы `space/8`; радиус `radius/control-sm`.
- `add`: заливка / цвет `action/secondary/default`; интервал `space/6`; высота `control/height/md`; радиус `radius/control`; ширина `control/height/md`.
- `back`: интервал `space/6`; высота `control/height/md`; радиус `radius/control`; ширина `control/height/md`.
- `title`: заливка / цвет `text/primary`; типографика `type/label/lg`.
- `action`: интервал `space/6`; высота `control/height/md`; радиус `radius/control`; ширина `control/height/md`.
- Значений без переменной: 8 (напр. `(root):w=375`, `(root):h=56`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Только Compact: App (iOS, Android) и мобильный веб. Web — Sidebar + Page header.
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Набор `Top bar`, вариантов 4 из 4; оси: Platform, Level.
- Борда: «Top bar — борда · шаблон v3», разделов 9.
- Описание: 1829 знаков, разделы: Status: Level: Под ней — Platform: Правила: Поиск: Level (20. Когда использовать: A11y: Beta (21.

## 13. Code projection
Код в репо: React `packages/react/src/index.js` (`TopBar`), Vue `packages/vue/src/DsTopBar.vue`, CSS `claude-ds/components/TopBar/style.css`; проверка — `npm run test:code`. Прод (DSP / ui-emcd-web, Flutter) — сверка через `scripts/parity.mjs`, когда появится манифест кода.

- Vue: `<DsTopBar>`; Flutter: `DsTopBar`.
- Props: `platform`: mobile-web | app; `level`: root | inner; `logo`: string или слот; `account`: string или слот; `balance`: string или слот; `cents`: string или слот; `showBalance`: boolean = true; `title`: string или слот; `showAction`: boolean = false.
- `platform`: mobile-web (по умолчанию) | app; `level`: root (по умолчанию) | inner.
- Inner: `title`, `onBack`, `backLabel` (по умолчанию «Назад»), `action` — слот одного действия (Show action в Figma = наличие `action`).
- Mobile web: `logo` (по умолчанию знак EMCD, 24), `account`, `balance`, `cents`, `showBalance`, `onMenu`, `menuLabel` (по умолчанию «Меню»).
- App: `account` + `accountOptions` / `accountValue` / `onAccountChange`; `coin` + `coins` (тикеры Coin stack, по умолчанию `[coin]`) + `coinOptions` / `coinValue` / `onCoinChange`; `onAdd`, `addLabel` (по умолчанию «Подключить»).

## 14. Acceptance (2026-11-23)
- `audit.plugin.js` — не прогонялся: перевод в beta 21.11 по репо (код, README, `docs/patterns.md`); плагины — вместе с правкой описания набора в Figma.
- `variables-check.plugin.js` — не прогонялся (ширина 375 и высота 56 корня — числом, образец).
- `audit-parity.plugin.js` — не прогонялся: перевод в beta 21.11 по репо.
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props с кодом продукта — по манифесту кода, когда он будет; код в репо проверяет `npm run test:code`.
- Не проверено: стенд (Light / Dark × бренды × платформы, длинный текст, 6 языков, 200 %, RTL); код есть (React / Vue / CSS, демо майнинга App и мобильный веб), манифеста кода нет — parity props пропущена.

## 15. Migration
- Мобильный веб пула: шапка с логотипом, аккаунтом ▾, балансом ▾ и бургером (52 в проде) → Top bar Mobile web · Root (56).
- DS App шапка (`navigation bar`, ≈44 в проде: аккаунт ▾, монета ▾, настройки) → Top bar App · Root; «назад» + заголовок на вложенных экранах (и `Page header` Compact вместо него) → Top bar Level=Inner.

Осталось доделать (после пакета правок beta 2026-11-13):
- Figma: Status в описании набора → beta; добавить разделы «Когда использовать:» и «A11y:» (draft-audit DESC).
- Плагины audit / variables-check / audit-parity и стенд.
- Mobile web · Root держит «Меню», а решение 16.11 — бургер мобильного веба → Tab bar (`docs/patterns.md`): сверить, остаётся ли «Меню».
- Show balance = Off: случай применения не описан.
- RTL: отражение `chevron-left` в коде не проверено.

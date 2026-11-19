# Top bar

Верхняя панель корневых экранов. Над Tabs M разделов.

**Ось (как в Figma «🟠 Top bar»):** Platform Mobile web · App (19.11); Logo, Account, Balance, Cents, Show balance. Подложка `surface/level-0`, высота 56, поля 8 / 16.
- **Mobile web** (`platform="mobile-web"`, по умолчанию) — логотип, аккаунт и баланс (label-lg + шеврон 16, копейки `text-tertiary`), «Меню» — Icon button Ghost M; зазор 12.
- **App** (`platform="app"`) — в начале Select compact аккаунта (без leading), в конце Select compact монеты (leading — Coin stack) + Icon button Secondary M «+» («Подключить»); без логотипа, баланса и меню; зазор 8.

**Правила:** draft — только корневые экраны мобильного веба и App; Web — Sidebar.
App: `account` + `accountOptions` / `onAccountChange` (без списка — `onAccount`, свой Sheet); `coin` («BTC») + `coins` (тикеры Coin stack, по умолчанию `[coin]`) + `coinOptions` / `onCoinChange` (или `onCoin`); `onAdd`, `addLabel`.

**Доступность:** «Меню» и «+» — кнопки с подписью; баланс — одной фразой («Баланс $123 456.78»); Select compact — «Аккаунт: …», «Монета: …».

Классы: `emcd-top-bar`, `--app`, `__logo`, `__account`, `__name`, `__balance`, `__amount`, `__cents`, `__menu`, `__select`, `__end`, `__add`.

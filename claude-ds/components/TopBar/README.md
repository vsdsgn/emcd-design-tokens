# Top bar

🟡 Beta (21.11) — можно брать в макеты и код. Верхняя панель экранов Compact (App и мобильный веб): Root — аккаунт и контекст раздела над Tabs M, Inner — «Назад» и заголовок по центру. Контракт — `docs/components/top-bar.md`.

**Оси (как в Figma «Top bar»):** Platform Mobile web · App (19.11) × Level Root · Inner (20.11); Logo, Account, Balance, Cents, Show balance, Title, Show action. Подложка `surface/level-0`, высота 56, поля 8 / 16.
- **Mobile web** (`platform="mobile-web"`, по умолчанию) — логотип, аккаунт и баланс (label-lg + шеврон 16, копейки `text-tertiary`), «Меню» — Icon button Ghost M; зазор 12.
- **App** (`platform="app"`) — в начале Select compact аккаунта (без leading), в конце Select compact монеты (leading — Coin stack) + Icon button Tertiary M «+» («Подключить»); без логотипа, баланса и меню; зазор 8.
- **Level Inner** (`level="inner"`, обе платформы) — Icon button Ghost M «Назад» (`chevron-left`, `onBack`, `backLabel`) · заголовок по центру (`title`, label-lg Medium, одна строка, `h1`) · место 40 под одно действие (`action`, Icon button Ghost M) — держит заголовок по центру; зазор 8.

**Правила:** только Compact (мобильный веб и App); Web — Sidebar + Page header. Root — корневой экран раздела, Inner — вложенный (Калькулятор, детали); справа на Inner — не больше одного действия.
App: `account` + `accountOptions` / `onAccountChange` (без списка — `onAccount`, свой Sheet); `coin` («BTC») + `coins` (тикеры Coin stack, по умолчанию `[coin]`) + `coinOptions` / `onCoinChange` (или `onCoin`); `onAdd`, `addLabel`.

**Доступность:** «Меню», «+» и «Назад» — кнопки с подписью; баланс — одной фразой («Баланс $123 456.78»); Select compact — «Аккаунт: …», «Монета: …».

Классы: `emcd-top-bar`, `--app`, `__logo`, `__account`, `__name`, `__balance`, `__amount`, `__cents`, `__menu`, `__select`, `__end`, `__add`, `--inner`, `__back`, `__title`, `__slot`.

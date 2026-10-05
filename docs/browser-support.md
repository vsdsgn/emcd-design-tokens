# Браузеры: поддержка и проверка

Обновлено: 2026-10-05. Тесты: `npm run test:compat` (статический, по `browserslist`), `npm run test:browsers` (первый раз — `npx playwright install chromium firefox webkit`).

## Что проверяем

Фикстура `tests/xbrowser/fixture.html` (поверхности, стекло, фокус, статусы, скелетон, вложенные темы/бренды) + `probe.js`:

- все 715 токенов разрешаются во всех 48 комбинациях (3 бренда × 2 темы × 4 платформы × 2 стиля (нет пустых `var()`);
- движки дают одинаковые значения токенов;
- режимы ОС: повышенный контраст, снижение прозрачности, reduced motion, forced colors;
- ширины 320 → 2560 (шаги вьюпорта, fluid-кегли, масштаб корня);
- скриншоты dark/light × Base/Expressive → `tests/xbrowser/out/` (в git не идут).

## Результат прогона 2026-10-05

| Движок | Где | Итог |
|---|---|---|
| Chromium 131 (Chrome, Yandex, Edge, Samsung, Opera, WebView) | контейнер, headless | ✓ все проверки; эмуляция contrast / transparency / motion / forced colors |
| WebKit 2.52 (движок Safari, Linux-сборка) | контейнер, WebKitGTK | ✓ значения токенов 1:1 с Chromium, ширины ✓; режимы ОС не эмулируются |
| Firefox 155 (Gecko) | Mac, Playwright | ✓ все проверки; Expressive вкл |
| WebKit 26.6 (Safari) | Mac, Playwright | ✓ все проверки; Expressive вкл. Живой Safari / iOS — открыть фикстуру руками |
| Chromium 153 | Mac, Playwright | ✓ все проверки; Expressive вкл |
| Старые и «специфические» | статический анализ (caniuse, doiuse) | таблица ниже |

## Найдено и исправлено в сборке (build.mjs)

1. **Шрифт без запасного семейства.** `'Roobert PRO'` один: если веб-шрифт не загрузился (блокировщик, медленная сеть, Turbo/лайт-режимы), браузер рисует Times. Теперь у каждого семейства — системный стек ОС (Apple — SF, Windows — Segoe UI, Android — Roboto; это запасной вариант, сам интерфейсный шрифт меняем — OPEN-QUESTIONS п. 9) (`system-ui … sans-serif`, моно — `ui-monospace … monospace`). Flutter JSON не меняется.
2. **`prefers-contrast: more` склеивал обводки.** `--border-subtle: var(--border-default)` + `--border-default: var(--border-strong)` в одном правиле → subtle = default = strong (#7a7a7a). Теперь значения берутся из слоя темы по отдельности (subtle → 700/200, default → 500). Добавлено: `control/border/default` → strong (обводка инпута 8% белого была невидима в режиме контраста).
3. **Reduced motion не было в CSS**, хотя motion.md его обещал. Новый слой `motion-reduced.css`: `prefers-reduced-motion: reduce` и `[data-motion="reduced"]` → длительности 0.01 мс (не 0 — чтобы `transitionend` срабатывал), `scale/press` = 1.
4. **Forced colors (Windows «Контрастные темы»)**: `border/focus` и `border/focus-ring` → системный `Highlight`. Кольцо на `box-shadow` в этом режиме браузер убирает — у компонентов обязателен `outline: 2px solid transparent` (правило уже в components.md).
5. **Слои снижения прозрачности / perf-low / контраста не доходили до вложенных `[data-style]`** — теперь доходят.
6. **Fluid-кегли в старых движках** (Safari < 13.1, iOS 12): `clamp()` невалиден → кегль терялся целиком. Теперь fluid-слой под `@supports`, старые получают ступенчатые значения вьюпорта.

## Не исправлено — чиним в основном чате DS (OPEN-QUESTIONS, п. 8); до тех пор — правила

- **Скоуп = все атрибуты на одном элементе.** Вложенный `data-brand` без `data-theme` меняет только рампу бренда, а кнопки/обводки остаются от внешнего бренда (проверено: Geometria-карточка с фиолетовой Primary). Если внутри страницы другой бренд/тема (превью WL в админке, Storybook, доки) — на этом элементе ставить `data-brand` + `data-theme` + `data-platform` + `data-style`.
- **Вложенная тема заново задаёт `color` и фон.** Цвет текста наследуется уже вычисленным: в светлой карточке внутри тёмной страницы заголовок без своего `color` — белый на белом. На элементе-скоупе: `color: var(--text-primary); background: var(--bg-base | surface/*)`.
- **`:focus-visible`**: Safari < 15.4, Chrome < 86 его не знают → кольца нет совсем. Если нужны эти версии — дублировать через `:focus` + `:focus:not(:focus-visible)` для сброса.
- **`backdrop-filter`**: Safari ≤ 17 только с `-webkit-`; Firefox — с 103. Компоненты пишут оба свойства. Без поддержки токены сами уводят стекло в непрозрачное (`@supports not`).
- **`100dvh`**: Safari < 15.4, Chrome < 108, Firefox < 101 — сначала `100vh`, потом `100dvh`.
- **gap во flex**: Safari < 14.1, Chrome < 84 — для старых нужен отступ через margin.

## Поддержка: два уровня (решение 2026-10-05)

Источник: Baseline (web-platform-dx, `baseline-browser-mapping`, «Widely available» = 30 месяцев во всех core-браузерах) + statcounter по версиям iOS (июль 2026: iOS 26 и 18 — подавляющее большинство, хвост 16.x — около 3%).

| Уровень | Браузеры | Что гарантируем |
|---|---|---|
| **Полная** — Baseline Widely available | Chrome / Edge / Yandex / Opera / WebView 123+, Firefox 124+, Safari macOS / iOS 17.4+, Samsung 27+ | всё по дизайну; Expressive — где разрешено (ниже) |
| **Работает** — пол поддержки | Chrome / Edge 109+ (последний на Windows 7/8.1), Firefox 115+ (ESR), Safari / iOS 15.4+ (iPhone 7 и старше застряли на 15.x), Samsung 21+ | Base, без поломок; это `browserslist` в package.json, `npm run test:compat` валит сборку при выходе за пол |
| Не поддерживаем | ниже пола, Opera Mini, UC / QQ / Baidu / KaiOS старые | токены могут не работать (нет CSS-переменных / clamp) |

## Expressive: в современных движках (решение 2026-10-05)

Блок `style-expressive.css` целиком внутри `@supports (backdrop-filter: blur(1px))`. Без префикса `backdrop-filter` есть в Chrome / Edge / Yandex / Opera / WebView 76+, Firefox 103+, Safari и iOS 18+ — это и есть отсечка «не старый браузер». Safari ≤ 17 (iPhone до XS, старые Mac без обновлений) получает Base.

Снижение прозрачности: Chromium 118+ сообщает настройку → `perf-low.css` возвращает Base. Safari и Firefox её не сообщают, поэтому в продукте нужен переключатель «Упрощённое оформление» (`data-style="base"` или `data-perf="low"`). Повышенный контраст (`prefers-contrast: more`) снимает декор во всех трёх движках.

Mac, Playwright 2026-10-05: Chromium 153, Firefox 155, WebKit 26.6 — Expressive включён во всех, значения токенов совпадают 1:1 во всех 48 режимах (включая Expressive).

## Наблюдения по рендеру

- `light/ambient` = `filter: blur(160px)` на большом пятне: в WebKit без GPU видны полосы/тайлы; это и самый дорогой эффект экрана. Замена на `radial-gradient` — в основном чате (OPEN-QUESTIONS, п. 8).

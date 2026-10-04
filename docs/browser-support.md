# Браузеры: поддержка и проверка

Обновлено: 2026-10-05. Тест: `npm run test:browsers` (первый раз — `npx playwright install chromium firefox webkit`).

## Что проверяем

Фикстура `tests/xbrowser/fixture.html` (поверхности, стекло, фокус, статусы, скелетон, вложенные темы/бренды) + `probe.js`:

- все 715 токенов разрешаются во всех 64 комбинациях Brand × Theme × Platform × Style (нет пустых `var()`);
- движки дают одинаковые значения токенов;
- режимы ОС: повышенный контраст, снижение прозрачности, reduced motion, forced colors;
- ширины 320 → 2560 (шаги вьюпорта, fluid-кегли, масштаб корня);
- скриншоты dark/light × Base/Expressive → `tests/xbrowser/out/` (в git не идут).

## Результат прогона 2026-10-05

| Движок | Где | Итог |
|---|---|---|
| Chromium 131 (Chrome, Yandex, Edge, Samsung, Opera, WebView) | контейнер, headless | ✓ все проверки; эмуляция contrast / transparency / motion / forced colors |
| WebKit 2.52 (движок Safari, Linux-сборка) | контейнер, WebKitGTK | ✓ значения токенов 1:1 с Chromium, ширины ✓; режимы ОС не эмулируются |
| Firefox (Gecko) | — | реальный прогон не делали: в контейнере нет сборки. Запустить на Mac: `npm run test:browsers -- firefox` |
| Реальный Safari macOS / iOS | — | на Mac: `npm run test:browsers -- webkit` (Playwright WebKit) + ручная проверка в Safari |
| Старые и «специфические» | статический анализ (caniuse, doiuse) | таблица ниже |

## Найдено и исправлено в сборке (build.mjs)

1. **Шрифт без запасного семейства.** `'Roobert PRO'` один: если веб-шрифт не загрузился (блокировщик, медленная сеть, Turbo/лайт-режимы), браузер рисует Times. Теперь у каждого семейства — системный стек (`system-ui … sans-serif`, моно — `ui-monospace … monospace`). Flutter JSON не меняется.
2. **`prefers-contrast: more` склеивал обводки.** `--border-subtle: var(--border-default)` + `--border-default: var(--border-strong)` в одном правиле → subtle = default = strong (#7a7a7a). Теперь значения берутся из слоя темы по отдельности (subtle → 700/200, default → 500). Добавлено: `control/border/default` → strong (обводка инпута 8% белого была невидима в режиме контраста).
3. **Reduced motion не было в CSS**, хотя motion.md его обещал. Новый слой `motion-reduced.css`: `prefers-reduced-motion: reduce` и `[data-motion="reduced"]` → длительности 0.01 мс (не 0 — чтобы `transitionend` срабатывал), `scale/press` = 1.
4. **Forced colors (Windows «Контрастные темы»)**: `border/focus` и `border/focus-ring` → системный `Highlight`. Кольцо на `box-shadow` в этом режиме браузер убирает — у компонентов обязателен `outline: 2px solid transparent` (правило уже в components.md).
5. **Слои снижения прозрачности / perf-low / контраста не доходили до вложенных `[data-style]`** — теперь доходят.
6. **Fluid-кегли в старых движках** (Safari < 13.1, iOS 12): `clamp()` невалиден → кегль терялся целиком. Теперь fluid-слой под `@supports`, старые получают ступенчатые значения вьюпорта.

## Не исправлено — правила для разработки

- **Скоуп = все атрибуты на одном элементе.** Вложенный `data-brand` без `data-theme` меняет только рампу бренда, а кнопки/обводки остаются от внешнего бренда (проверено: Geometria-карточка с фиолетовой Primary). Если внутри страницы другой бренд/тема (превью WL в админке, Storybook, доки) — на этом элементе ставить `data-brand` + `data-theme` + `data-platform` + `data-style`.
- **Вложенная тема заново задаёт `color` и фон.** Цвет текста наследуется уже вычисленным: в светлой карточке внутри тёмной страницы заголовок без своего `color` — белый на белом. На элементе-скоупе: `color: var(--text-primary); background: var(--bg-base | surface/*)`.
- **`:focus-visible`**: Safari < 15.4, Chrome < 86 его не знают → кольца нет совсем. Если нужны эти версии — дублировать через `:focus` + `:focus:not(:focus-visible)` для сброса.
- **`backdrop-filter`**: Safari ≤ 17 только с `-webkit-`; Firefox — с 103. Компоненты пишут оба свойства. Без поддержки токены сами уводят стекло в непрозрачное (`@supports not`).
- **`100dvh`**: Safari < 15.4, Chrome < 108, Firefox < 101 — сначала `100vh`, потом `100dvh`.
- **gap во flex**: Safari < 14.1, Chrome < 84 — для старых нужен отступ через margin.

## Матрица поддержки (минимум для DS 2.0 веба)

| Браузер | Минимум | Что теряется ниже / на минимуме |
|---|---|---|
| Chrome / Edge / Yandex / Opera | 88 | — |
| Safari macOS / iOS | 15.4 | `prefers-reduced-transparency` не поддерживается вообще → Expressive-стекло остаётся у тех, кто включил «Понижение прозрачности» (см. вопрос в OPEN-QUESTIONS) |
| Firefox (вкл. ESR 115) | 103 | `prefers-reduced-transparency` нет |
| Samsung Internet | 16 | — |
| Android WebView | 88 | обновляется с Chrome; старые Huawei без GMS — проверять вручную |
| UC / QQ / Baidu / KaiOS | не целимся | работает Base без стекла, fluid-кегли и `:focus-visible` могут отсутствовать |
| Opera Mini, Android 4.4, IE | не поддерживаем | нет CSS-переменных — токены не работают |

Минимум — предложение по данным caniuse, не согласован с продуктом/аналитикой (вопрос в OPEN-QUESTIONS).

## Наблюдения по рендеру

- `light/ambient` = `filter: blur(160px)` на большом пятне: в WebKit без GPU видны полосы/тайлы; это и самый дорогой эффект экрана. Кандидат на замену `radial-gradient` (тот же вид, почти бесплатно) — в парковке, т. к. Expressive.

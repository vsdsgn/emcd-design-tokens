# Для разработки: выпуск 2026-11-20

Предыдущий — `docs/dev-handoff-2026-11-19.md`. Полный список правок — `docs/CHANGELOG-components.md`, ожидаемый API — `docs/api.md`, контракты — `docs/components/*.md`, правила экранов — `docs/patterns.md`.

## Коротко

- **Код:** 69 компонентов React 18 и Vue 3 на общем CSS (`packages/*`, `claude-ds/components/*`). Новое: **Sheet**, **Top bar `level="inner"`**, Tabs `fill`, Transaction `showLeading`, логотип `logo-emcd`.
- **Демо:** `npm run demo:mining` — 24 экрана майнинга из кода (Web 8, мобильный веб 8, App 9 — iOS, Dark) рядом с макетами Figma; разница — `demo/mining/out/compare-*.png`, остаток — `demo/mining/README.md`.
- **Каркас App** — `docs/patterns.md` 1.5: корневой раздел (Top bar App → лист Card L1 → Tab bar), вложенный экран (Top bar Inner → карточки → Action bar), модальный поток (Sheet во всю высоту). Формы App — поля L, подпись на рамке.

## Новые компоненты и свойства

| Что | API | Когда |
|---|---|---|
| **Sheet** (beta) | `title`, `showGrabber`, `showClose`, `onClose`, `headerActions`, `footer`, `fullHeight`, `scrim`, `children` | шторка Compact: детали, фильтры, короткие формы, поток «Выгрузить историю» (`fullHeight`) — вместо Modal на телефоне |
| **Top bar** `level` | `'root'` (по умолчанию) · `'inner'`: `title`, `onBack`, `backLabel`, `action` | `inner` — вложенный экран App и мобильного веба («‹ Калькулятор»), без Tabs |
| **Tabs** `fill` | boolean | только Compact: вкладки поровну, если помещаются; Web — по содержимому |
| **Transaction** | `showLeading` (по умолчанию true); сумма — Amount M | история начислений App — без плашки типа |
| **Icon** `logo-emcd` | — | знак EMCD (Top bar mobile-web по умолчанию, центр Tab bar App) |

## Изменения вида (PATCH)

- Tabs: зазор M — `space/16`, S — `space/20` (было наоборот, как в Figma).
- Button: снят `max-width: 280` (в контракте ограничения нет — растёт до контейнера, min 64).
- Top bar App: «+» — Icon button Tertiary (было Secondary).

## Ждёт Publish Components (дизайн)

Top bar — ось Level (Root | Inner). До Publish в Figma на экране App «Калькулятор» шапка временная.

## Как сверить

1. `npm ci && npm run all`; `npm run test:code` — SSR React / Vue без ошибок.
2. `npm run demo:mining` → `demo/mining/out/compare-app-*.png`.
3. Вёрстка макетов — `scripts/figma/layout-audit.plugin.js` (0 замечаний) + чеклист `docs/patterns.md` 0.3.

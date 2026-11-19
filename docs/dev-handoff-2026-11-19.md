# Для разработки: выпуск 2026-11-17 — 2026-11-19

Предыдущий документ — `docs/dev-handoff-2026-11-12.md`. Полный список правок по наборам — `docs/CHANGELOG-components.md` (раздел «2026-11-17 — 2026-11-19»). Ожидаемый API — `docs/api.md`, контракты — `docs/components/*.md`.

## Коротко

- **Новое:** код компонентов в репо дизайн-системы — эталон для `ui-emcd-web` (React 18 и Vue 3, общий CSS на токенах). 65 компонентов: все наборы экранов майнинга + Calendar, Date range panel, Tab bar, Floating button. Проверка — `npm run test:code`, живой пример — `npm run demo:mining` (6 экранов майнинга из кода рядом с Figma).
- **MAJOR:** снят размер XL у контролов; Tab / Tabs XL → Page; моно-шрифт только в осях графиков (подробно ниже).
- **Токены (PATCH по значению):** Theme Dark `text|icon/secondary` 72 → 56 %, `text|icon/tertiary` 56 → 48 %. Имена не менялись — нужна только пересборка токенов (DSP Export после Publish Foundations).

## Breaking (MAJOR)

| Набор | Было | Стало |
|---|---|---|
| Icon button, Segment / Segmented, Input, Select, Textarea, `_Field base` | Size XL | XL удалён → L |
| Tab, Tabs | Size XL | Size Page (табы-разделы страницы) |
| Modal | кнопки XL | кнопки L |
| Button | XL везде | XL — только App (одна главная кнопка экрана); на Web не использовать |
| Amount, Key-value row, Progress, Progress circle | `font/family/mono` | шрифт текста с табличными цифрами (`font-variant-numeric: tabular-nums`); Address — исключение |

## Новые свойства (минор)

- **Stat card:** `align` start | center, `link` (+ `linkLabel`, `onLink`), `tone` neutral | danger | warning | success.
- **Promo card:** `align` start | center; size s | m | l; tone neutral | accent; badge, close, media.
- **Tab, Chip:** `statusDot` + `statusTone`. **Table header cell:** `sortable`. **Button / Icon button:** size xs (24).
- **Floating button:** `size` l | m, `type` primary | secondary (только layout extended).
- **Tab bar item:** `type` item | action (центральная мультикнопка App).
- **Transaction:** у `completed` статус не показывается, справа сумма и `fiat`.
- **List item:** `showDescription`, `inset` (false — список внутри Card без боковых полей).
- **Action bar:** `badge`, `badgeText`. **Select:** `labelPosition` above | on-border. **Chart plot:** `interactive` (hover, клавиатура), `index` / `onIndexChange`.

## Новые компоненты (draft — конструкции)

Top bar (мобильный веб), Status summary, Promo carousel, Action bar — организмы экранов майнинга. API может меняться; правила — `docs/patterns.md`, раздел 0.2.

## Изменения вида без смены API

Chip Selected — инверсная белая плашка, счётчик `text/inverse-secondary`; Amount L — `type/heading/lg` Bold (Web 24, Compact 20); Nav item — подпись 16, иконка 24; Counter и Badge Subtle Neutral — квадрат / обводка `border/subtle`; серия 1 графиков — `border/accent`, легенда над графиком; Button — поля по Figma (XS 4, S 6, M 12, L 12, XL 16), зазор 4; Table cell — текст 14 на Web.

## Иконки

Иконки переэкспортированы из Figma 19.11 (115, хеши сверены): изменилась геометрия 110 иконок (в т. ч. `sort`, `sort-line-down`), добавлены `home`, `alert-circle`, `alert-triangle`, `check-circle`, `chart-bar`; удалены deprecated `social-*`, `store-*` (заменены набором Logo). Выгрузка отчёта — `icon/file-excel`.

## Как сверить

1. `npm ci && npm run all` — токены; `npm run test:code` — SSR React / Vue без ошибок и предупреждений.
2. `npm run demo:mining` → `demo/mining/out/compare-*.png` — макет | код | разница.
3. Расхождения кода продукта с контрактом — по `docs/api.md`; манифест кода (`docs/code-manifest.json`, формат — в шапке `scripts/parity.mjs`) нужен, чтобы `npm run parity` сверял props автоматически.

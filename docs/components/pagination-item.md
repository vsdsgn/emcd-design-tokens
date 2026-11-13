# Pagination item — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Pagination item`. Status: beta. Level: unknown.
- Figma: Components, страница «Pagination item» (`1012:13`), набор `148:1633`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Номер страницы в Pagination. Отдельно не используется.
- Когда использовать: только внутри Pagination — номер страницы или «…».
- Когда нет: отдельно в макете; переключение разделов — Tab или Segment.
- Правило выбора варианта:
  - Size: S 32 — плотные таблицы; M 40 — по умолчанию. В одной пагинации один размер.
  - State=Selected — текущая страница, ровно одна на пагинацию.
  - «…» — пропуск страниц, не нажимается.
- Не делаем: два выбранных номера; разные размеры в одной пагинации; нажимаемое «…».

## 3. Anatomy
- Корень: высота `control/height/sm` | `control/height/md`, ширина по содержимому, min-width = высота (`control/height/*`), отступы `space/8`, радиус `radius/control-sm` | `radius/control`.
- `page` — число (`font/family/text`, `type/label/md`, `font-weight/medium`, цифры табличные).
- Служебные: `state layer`, `focus ring`, `hit area · web` / `hit area · app`, `safe area · outer` (свойства Focus ring, Show hit area, Safe margin).
- Служебные слои (вариантов из 10): кольцо фокуса 10 · зона Web 10 · зона касания 10 · безопасное поле 10.

## 4. States
- Группа модели состояний (`docs/components.md`): Плашка: слой `state/layer` × `state/hover` 6 % / `state/pressed` 10 %; Disabled — токены `*/disabled`.
- Default — без подложки, `text/primary`; Hover / Pressed — слой `state/layer` × `state/hover` / `state/pressed`; Selected — `accent/subtle` + `text/accent`; Disabled — `text/disabled`, без подложки и без Hover.
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`).

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | S · M | S |
| State | Default · Hover · Pressed · Selected · Disabled | Default |

Матрица полная: 10 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Focus ring | булево | выкл | 10 из 10 · служебное |
| Page | текст | «1» | 10 из 10 |
| Show hit area | булево | выкл | 10 из 10 · служебное |
| Safe margin | булево | выкл | 10 из 10 · служебное |

## 6. Content / slots
- Page — число или «…»; ширина растёт с числом («1024» → 47), минимум — высота контрола.
- Цифры не переводятся и не зеркалятся; порядок номеров в RTL зеркалит Pagination. Строки de, ar, hi, th, ja, kk по высоте не обрезаны (стенд), но в Page передаётся только число.
- Текст 200 %: цифра растёт, высота плашки остаётся 32 / 40, обрезки нет (проверено на стенде).

## 7. Events
- `click` — переход на страницу; смену страницы испускает Pagination. «…» и Disabled событий не дают.

## 8. Behavior
- Hover: слой 0 → 6 %, `motion/duration/feedback` (120 мс), `motion/easing/standard`. «Уменьшить движение»: длительности ≈ 0.
- Зона нажатия ≥ `touch/min`: Web 24, касание 44 (слои `hit area · web` / `hit area · app`, проверка — Show hit area); безопасное поле — `control/safe-margin`.

## 9. Accessibility
- Кнопка, имя «Страница N»; у выбранной `aria-current="page"`.
- Tab — фокус, Enter / Пробел — переход.

## 10. Tokens
- `корень`: заливка / цвет `accent/subtle`; высота `control/height/md`, `control/height/sm`; мин. ширина `control/height/md`, `control/height/sm`; отступы `space/8`; радиус `radius/control`, `radius/control-sm`.
- `page`: заливка / цвет `text/accent`, `text/disabled`, `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- Служебные слои (общие правила — `service-layers.md`): `focus ring`: радиус `radius/focus-ring`, `radius/focus-ring-sm`; обводка `border/focus-ring`; толщина обводки `border/width/focus-ring` · `hit area · web`: видимость `touch/is-fine` · `hit area · overlay`: заливка / цвет `status/danger/solid` · `hit area · app`: видимость `touch/is-coarse` · `safe area · outer`: обводка `status/success/solid`; толщина обводки `control/safe-margin` · `state layer`: заливка / цвет `state/layer`; прозрачность `state/hover`, `state/pressed`; радиус `radius/control`, `radius/control-sm`.
- Min / max корня: minWidth 32 control/height/sm, minWidth 40 control/height/md.
- Значений без переменной: 20 (напр. `hit area · web:w=32`, `hit area · web:h=32`, `hit area · web:w=40`, `hit area · web:h=40`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Набор `Pagination item`, вариантов 10 из 10; оси: Size, State.
- Борда: «Pagination item — борда · шаблон v3», разделов 11.
- Описание: 667 знаков, разделы: Status: Level: A11y: Когда использовать: Правила:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsPaginationItem>`; Flutter: `DsPaginationItem`.
- Props: `size`: s | m; `page`: string или слот.
- Состояния (Default, Hover, Pressed, Selected, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; RTL стенд не проверяет; кода нет — parity props пропущена.

## 15. Migration
- В описании Figma строки Legacy нет.

Осталось доделать (после пакета правок beta 2026-11-13):
- Первый вариант набора — Size=S: поставить M первым (по описанию M — по умолчанию).
- «…»: в наборе нет варианта или свойства для ненажимаемого пропуска.
- `hit area · web` 32 × 32 / 40 × 40 — числом.
- В описании Figma нет строки Legacy.

# Modal — контракт (2026-11-23)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Modal`. Status: beta. Level: unknown.
- Figma: Components, страница «Modal» (`364:3195`), набор `81:829`. Платформы: Web, Mobile web, iOS, Android.
- Страница «Modal», организм. Собран из вложенных _Overlay surface (Kind=Modal), Icon button (крестик), Button (кнопки Footer) и монеты в Header=Coin; слоты Body и Footer slot; служебных слоёв у корня нет.

## 2. Intent
- Модальное окно (диалог): короткое действие или подтверждение, прерывающее поток. Шапка, слот Body, кнопки в слоте Footer slot; под окном — затемнение `surface/overlay`.
- Когда использовать: удалить, подтвердить вывод, 2FA, выбор из нескольких вариантов.
- Когда нет: детали объекта или длинная форма — Side panel / Sheet; сообщение без решения — Toast / Alert; на Compact — Sheet.
- Правило выбора варианта:
  - Header: Title — заголовок-действие; Coin — действие с монетой (монета 32 + название + описание, legacy coin / coin select); Empty — только крестик, когда заголовок есть в Body.
  - Footer: Single — одно действие; Stacked — два, главное сверху; Horizontal — два в ряд, отмена слева, главное справа; None — без кнопок (закрытие крестиком, Esc, фоном).
  - Divider — линия под шапкой, когда Body прокручивается или начинается со списка (legacy divider); иначе Off.
  - Show close — On по умолчанию; Off — только на необратимом шаге, где закрытие запрещено.
  - Header description — только у Header=Coin: строка «тикер · сеть»; Off — когда сеть не важна.
  - Ширина — `size/modal/sm`, `md`, `lg` по содержимому (ресайз экземпляра); одна задача и одно главное действие на окно.
  - На Compact модалка открывается как Sheet.
  - Детали объекта: Web — отдельная страница (Side panel — после выхода из парковки); Compact — Sheet; широкий Modal для деталей не используем (решение 2026-11-16).
- Не делаем: модал поверх модала; два главных действия; длинная форма или детали объекта в модалке; закрытие фоном и Esc на необратимом шаге; Header=Empty с Show close = Off.

## 3. Anatomy
- Корень — вертикальный стек, `radius/surface` (24), ширина `size/modal/md` (560; `sm` 400 / `lg` 720 — ресайз экземпляра); отступы шапки, Body и Footer slot — `space/32` (верх Body — `space/8`; с Divider после линии 24: линия + `space/16` + `space/8`).
- Поверхность — слой `overlay surface`, экземпляр _Overlay surface (Kind=Modal): `surface/level-1`, обводка `border/subtle` × `border/width/default`, тени `shadow/key` + `shadow/ambient` (Elevation/4).
- `header` (зазор `space/8`): `title` — Header=Title `font/family/display`, `type/display/md`, bold, `text/primary`; Header=Coin — монета 32 + `title group` (зазор `space/12`) с `type/heading/lg` и `header description` (`type/body/md`, `text/secondary`); `close` — Icon button `control/height/md`.
- `divider` — рамка с линией `border/subtle` и отступом снизу `space/16` (Divider, 2026-11-15).
- Слот Body (зазор `space/12`): образец — `type/body/lg`, `text/secondary`.
- Слот Footer slot (зазор `space/8` / `space/16`): Button L (`control/height/lg` 48) на всю ширину (до 2026-11-17 — XL 56); подпись под кнопками — текстом в слоте.
- Вложено: `_Overlay surface` ×12, `Icon button` ×12, `Button` ×15, `smbl-bitcoin-btc` ×4.
- Служебные слои (вариантов из 12): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент; интерактивны вложенные Button и Icon button.
- Оси State нет: Hover / Pressed / Focus / Disabled — у вложенных Button и Icon button.
- Header=Title — крупный заголовок; Coin — монета, заголовок `type/heading/lg` и описание; Empty — только крестик справа.
- Footer=Single / Stacked / Horizontal — 1–2 кнопки L; None — без Footer slot.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Header | Title · Coin · Empty | Title |
| Footer | Single · Stacked · Horizontal · None | Single |

Матрица полная: 12 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Title | текст | «Уменьшить риск» | 8 из 12 |
| Divider | булево | выкл | 12 из 12 |
| Show close | булево | вкл | 12 из 12 |
| Header description | булево | вкл | 4 из 12 |
| Body | слот | — | 12 из 12 |
| Footer slot | слот | — | 9 из 12 |

- Title — текст заголовка (у Header=Title и Coin); Divider — по умолчанию Off; Show close — On; Header description — On (только Header=Coin).
- Body и Footer slot — слоты: контент модалки и кнопки (у Footer=None слота нет).

## 6. Content / slots
- Заголовок переносится на несколько строк, правила числа строк нет; длинное слово (de) рвётся посреди.
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет. На стенде направление не переключается: ar проверен только на обрезку.
- Языки без обрезки по высоте на стенде: de, ar, hi, th, ja, kk. Ширина 560 больше текстовой ячейки 360 — крестик и конец строки при длинном тексте не проверены; Header=Coin с длинным заголовком не проверен.
- Текст 200 %: заголовок, описание и Body растут без обрезки; кнопки L 48 вмещают подпись.

## 7. Events
- `click` по главной кнопке — действие; по отмене / крестику — закрыть без действия.
- Esc и клик по затемнению — закрыть (кроме необратимых шагов).

## 8. Behavior
- Появление — fade + scale 0.96 → 1, 200 мс (App 320), standard; закрытие — 150 мс; затемнение — fade. «Уменьшить движение»: только fade.
- Фокус заперт в окне; после закрытия возвращается на триггер.
- Compact — Sheet.

## 9. Accessibility
- `role="dialog"`, `aria-modal="true"`, `aria-labelledby` на заголовок.
- Фокус заперт внутри; Esc закрывает (кроме необратимых шагов); фокус возвращается на триггер.
- Крестик — Icon button с именем («Закрыть»).
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`). Кольцо и зоны нажатия — у вложенных Button и Icon button.

## 10. Tokens
- `корень`: радиус `radius/surface`; ширина `size/modal/md`.
- `overlay surface`: эффект `shadow/ambient`, `shadow/key`; заливка / цвет `surface/level-1`; радиус `radius/surface`; обводка `border/subtle`; толщина обводки `border/width/default`.
- `header`: интервал `space/8`; отступы `space/16`, `space/24`, `space/32`.
- `title`: заливка / цвет `text/primary`; типографика `font-weight/bold`, `font/family/display`, `type/display/md`, `type/heading/lg`.
- `close`: интервал `space/6`; высота `control/height/md`; радиус `radius/control`; ширина `control/height/md`.
- `divider`: отступы `space/16`.
- `line`: заливка / цвет `border/subtle`.
- `Body`: интервал `space/12`; отступы `space/32`, `space/8`.
- `Контент модалки — в слот Body: текст, поля, список.`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/lg`.
- `Footer slot`: интервал `space/16`, `space/8`; отступы `space/24`, `space/32`.
- `Button`: заливка / цвет `action/primary/default`, `action/secondary/default`; интервал `space/2`; высота `control/height/lg`; мин. ширина `size/button/min`; отступы `space/12`; радиус `radius/control`.
- `title group`: интервал `space/12`.
- `header description`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/md`.

## 11. Platforms
- Web (Expanded / Medium); на Compact (App и мобильный веб) — Sheet.
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Набор `Modal`, вариантов 12 из 12; оси: Header, Footer.
- Борда: «Modal — борда · шаблон v3», разделов 11.
- Описание: 2072 знаков, разделы: Status: Level: Когда использовать: Header: Footer: Body и Footer — Когда нет: A11y: Поиск: Legacy: Motion: Тень:

## 13. Code projection
Код в репо: React `packages/react/src/index.js` (`Modal`), Vue `packages/vue/src/DsModal.vue`, CSS `claude-ds/components/Modal/style.css`; проверка — `npm run test:code`. Прод (DSP / ui-emcd-web, Flutter) — сверка через `scripts/parity.mjs`, когда появится манифест кода.

- Vue: `<DsModal>`; Flutter: `DsModal`.
- Props: `header`: title | coin | empty; `footer`: single | stacked | horizontal | none; `title`: string или слот; `divider`: boolean = false; `showClose`: boolean = true; `headerDescription`: boolean = true; `body`: string или слот; `footerSlot`: string или слот.

## 14. Acceptance (2026-11-23)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props с кодом продукта — по манифесту кода, когда он будет; код в репо проверяет `npm run test:code`.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-15 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; ширина 560 больше текстовой ячейки 360 — правый край не проверен; содержимое слотов не проверялось; RTL на стенде не зеркалится; код — HTML/CSS.

## 15. Migration
- DS Web base modal header (title, title select → Header=Title; coin, coin select → Header=Coin; empty → Header=Empty) и base modal footer (single button → Footer=Single; two buttons → Stacked / Horizontal; empty → None); divider → Divider.

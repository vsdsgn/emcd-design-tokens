# Sidebar — контракт (2026-11-17)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Sidebar`. Status: beta. Level: unknown.
- Figma: Components, страница «Navigation» (`366:3392`), набор `66:370`. Платформы: Web, Mobile web, iOS, Android.
- Страница «Navigation», организм. Слоты Header (логотип), Nav (Nav item), Footer (настройки, профиль); промо-карточка — вложенный Promo card (свойство Promo). Служебных слоёв у корня нет.

## 2. Intent
- Сайдбар: основная навигация Web на Expanded и шире. Плавающая панель L1 на `bg/base` с отступом 12 (как в продуктах).
- Когда использовать: основная навигация Web App, Monitoring, WL на Large+; на Medium — свёрнутая рейка.
- Когда нет: Compact — Tab bar + меню «Ещё» / меню профиля; подразделы экрана — Tabs.
- Правило выбора варианта:
  - Collapsed: Off (240) — Large+ по умолчанию; On (72) — Medium или по кнопке «свернуть», подписи пунктов — в Tooltip.
  - Все Nav item в сайдбаре — в одном значении Collapsed с корнем; Selected — ровно один пункт.
  - Promo: On — промо-карточка (Promo card) в развёрнутом сайдбаре; при Collapsed=On промо нет.
  - Header — логотип продукта / бренда (WL подставляет свой), опционально виджет баланса; Footer — настройки, профиль / аккаунт.
  - Порядок (16.11, по продукту Web App): Header → Nav → Promo card → Footer; промо стоит над профилем, Nav занимает оставшуюся высоту.
- Не делаем: сайдбар на Compact; развёрнутые и свёрнутые пункты в одном сайдбаре; два выбранных пункта; сайдбар на подложке L1–L3 (он сам — L1 на `bg/base`).

## 3. Anatomy
- Корень — вертикальный стек, отступ `space/12`, зазор `space/8`, `radius/container`; ширина `size/sidebar/expanded` / `collapsed` (240 / 72), высота 800 — числом (образец).
- Поверхность: Expressive — `material/regular/fill` + `material/regular/blur`, кромка `edge/hairline`; Base — непрозрачная поверхность без блюра.
- Header (отступ `space/12`): `logo (placeholder)` — `font/family/display`, `type/heading/lg`, `font-weight/bold`, `text/primary`.
- `promo` — Promo card: `surface/next`, `radius/surface`, отступ `space/16`, обводка `border/subtle` × `border/width/default`.
- Nav (зазор `space/4`): Nav item (`size/row/compact`, `radius/control`); `divider` — линия `border/subtle` между группами.
- Footer (зазор `space/4`): Nav item настроек и профиля, прижаты к низу.
- Вложено: `Nav item` ×16, `Promo card` ×1.
- Служебные слои (вариантов из 2): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): Контейнер: своих состояний нет; Hover / Pressed / Selected / Focus — у вложенных Nav item и Promo card.
- Collapsed=Off — иконка + подпись, промо-карточка, Counter справа.
- Collapsed=On — только иконки 36 × 36, Counter поверх иконки, логотип — монограмма; подпись — в Tooltip справа.
- Selected пункта — подложка и полоса слева (Nav item).

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Collapsed | Off · On | Off |

Матрица полная: 2 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Header | слот | — | 2 из 2 |
| Nav | слот | — | 2 из 2 |
| Footer | слот | — | 2 из 2 |
| Promo | булево | вкл | 1 из 2 |

- Header, Nav, Footer — слоты; Promo — по умолчанию On (привязано к Collapsed=Off).
- Текстовых свойств нет: тексты — во вложенных Nav item и Promo card.

## 6. Content / slots
- Пункты — по правилу Nav item: одна строка, многоточие; промо — по правилу Promo card (переносится, карточка растёт).
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет. На стенде направление не переключается: ar проверен только на обрезку.
- Языки без обрезки по высоте на стенде: de, ar, hi, th, ja, kk. Подпись действия промо — 1–2 слова; на стенде (все тексты подменены длинным образцом) режется краем. Иконка выбранного пункта — `icon/accent` в обоих Collapsed (переопределение в экземпляре снято 15.11).
- Текст 200 %: Nav на Fill с клипом (в коде — прокрутка), Header и Footer на месте (исправлено 2026-11-15).
- Promo card: подпись действия — 1–2 слова; длинная подпись в узком сайдбаре (215) режется.

## 7. Events
- `click` по Nav item → переход в раздел.
- `click` по кнопке «свернуть» → Collapsed Off ↔ On.
- `click` по промо → действие Promo card.

## 8. Behavior
- Высота — на всю высоту окна; не помещается — Nav прокручивается внутри, Header и Footer на месте.
- Collapsed=On: подпись пункта — в Tooltip при наведении / фокусе.
- Expressive: `material/regular`; свечение и кромка у активного пункта (`decor/light`).

## 9. Accessibility
- `nav` с `aria-label` «Основная навигация»; текущий пункт — `aria-current="page"`.
- Кнопка «свернуть» — `aria-expanded`.
- Collapsed=On: доступное имя пункта — подпись (не только Tooltip).
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`). Кольцо и зоны нажатия — у вложенных Nav item.

## 10. Tokens
- `корень`: эффект `material/regular/blur`; заливка / цвет `material/regular/fill`; интервал `space/8`; отступы `space/12`; радиус `radius/container`; обводка `edge/hairline`; ширина `size/sidebar/collapsed`, `size/sidebar/expanded`.
- `Header`: отступы `space/12`.
- `logo (placeholder)`: заливка / цвет `text/primary`; типографика `font-weight/bold`, `font/family/display`, `type/heading/lg`.
- `Nav`: интервал `space/4`.
- `Nav item`: заливка / цвет `action/secondary/default`; интервал `space/8`; высота `size/row/compact`; отступы `space/6`; радиус `radius/control`; ширина `size/row/compact`.
- `divider`: отступы `space/6`, `space/8`.
- `Rectangle`: заливка / цвет `border/subtle`.
- `promo`: заливка / цвет `surface/next`; интервал `space/8`; отступы `space/16`; радиус `radius/surface`; обводка `border/subtle`; толщина обводки `border/width/default`.
- `Footer`: интервал `space/4`.
- Значений без переменной: 2 (напр. `(root):h=800`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Только Web: Expanded и шире — Collapsed=Off, Medium — Collapsed=On.
- Compact (App, мобильный веб) — Tab bar.

## 12. Figma projection
- Набор `Sidebar`, вариантов 2 из 2; оси: Collapsed.
- Борда: «Sidebar — борда · шаблон v3», разделов 11.
- Описание: 1147 знаков, разделы: Status: Level: Сайдбар: Слоты: Правила: A11y: Когда использовать: Expressive: Поиск: Legacy: Expressive (привязано):

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsSidebar>`; Flutter: `DsSidebar`.
- Props: `collapsed`: boolean; `header`: string или слот; `nav`: string или слот; `footer`: string или слот; `promo`: boolean = true.

## 14. Acceptance (2026-11-17)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — высота 800 корня — числом (образец).
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-15 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; набор только Web — iOS / Android-ячейки для формы; Expressive не снят; RTL на стенде не зеркалится; кода нет — parity props пропущена.

## 15. Migration
- DS Web `sidebar / default` → Sidebar (Collapsed Off | On, слоты Header / Nav / Footer); `Sidebar banner` → Promo card в Sidebar (свойство Promo).

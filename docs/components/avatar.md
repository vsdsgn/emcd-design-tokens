# Avatar — контракт (2026-11-24)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Avatar`. Status: beta. Level: unknown.
- Figma: Components, страница «Avatar» (`367:265`), набор `108:1270`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Круглое медиа: пользователь, субаккаунт, контрагент (инициал, иконка, фото) или монета (Type=Coin, бывший набор Coin, 22.11).
- Когда использовать: пользователь, субаккаунт, контрагент — в шапке, списках, карточках.
- Когда нет: устройство и раздел — Icon; несколько аватаров или монет стопкой — Avatar group.
- Правило выбора варианта:
  - Type: Image — есть фото; Text — фото нет, известно имя (1 заглавная буква — первая буква имени); Icon — нет ни фото, ни имени.
  - Type=Coin — монета (свойство Coin) и бейдж сети (Network On + Network coin); от темы не зависит.
  - Size — одна шкала для людей и монет (22.11): 2XS 16 — монета в тексте и чипах; XS 20 — строки таблиц, Select compact; S 24 — списки App, поля; M 32 — списки и шапка; L 40 — карточки; XL 56 — профиль.
  - Status — точка «в сети» (`status/success/solid`); только там, где присутствие имеет смысл (чат поддержки, команда).
- Не делаем: две и более буквы в инициалах; цвет фона как носитель смысла; квадратная форма; нажатие без обёртки-кнопки.

## 3. Anatomy
- `circle` (обрезает содержимое, `radius/full`; фон `status/neutral/subtle`, у Icon — `accent/subtle`) → `initials` | `icon` (`icon/size/md`) | `image (заменить)` + `placeholder`.
- `status` — точка с обводкой `surface/current` (`border/width/strong`): на любой поверхности L0–L3 обводка совпадает с фоном.
- Вложено: иконки ×8, `symbol/coin/bitcoin-btc` ×18, `symbol/coin/tether-usdt` ×18.
- Служебные слои (вариантов из 42): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент; Skeleton — загрузка.
- Default; Skeleton — круг `skeleton/base` того же размера: данные грузятся.
- Нажимаемый аватар — внутри Button / Icon button / строки списка: фокус и зона нажатия — у обёртки.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | XS · M · L · XL · 2XS · S | XS |
| Type | Text · Icon · Image · Coin | Text |
| Network | Off · On | — |
| State | Default · Skeleton | Default |

Матрица: 42 из 96.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Initials | текст | «E» | 8 из 42 |
| Status | булево | выкл | 24 из 42 |
| Coin | замена экземпляра | `symbol/coin/bitcoin-btc` | 18 из 42 |
| Network coin | замена экземпляра | `symbol/coin/tether-usdt` | 18 из 42 |

## 6. Content / slots
- Initials — 1 буква; длиннее — обрезается кругом (проверено на стенде), поэтому усечение делает код до передачи.
- Изображение — заполняет круг (cover), центр кадра; не загрузилось — Type=Text или Icon.
- Текст 200 %: круг и инициал не растут — размер фиксирован осью Size.
- RTL: точка статуса — у конца строки (зеркалится), содержимое круга — нет.

## 7. Events
- Нет.

## 8. Behavior
- Статичен. Смена Type при загрузке фото — без анимации.
- Skeleton — блик `Skeleton` (1.2 с; «Уменьшить движение» — пульсация прозрачности).

## 9. Accessibility
- Рядом есть имя — `aria-hidden`; имени рядом нет — `alt` / доступное имя = имя пользователя.
- Status — в доступном имени («в сети»), не только цветом.

## 10. Tokens
- `корень`: заливка / цвет `skeleton/base`; высота `size/media/2xs`, `size/media/lg`, `size/media/md`, `size/media/sm`, `size/media/xl`, `size/media/xs`; радиус `radius/full`; ширина `size/media/2xs`, `size/media/lg`, `size/media/md`, `size/media/sm`, `size/media/xl`, `size/media/xs`.
- `circle`: заливка / цвет `accent/subtle`, `status/neutral/subtle`; высота `size/media/lg`, `size/media/md`, `size/media/xl`, `size/media/xs`; радиус `radius/full`; ширина `size/media/lg`, `size/media/md`, `size/media/xl`, `size/media/xs`.
- `initials`: заливка / цвет `accent/on-subtle`, `text/secondary`; типографика `font-weight/bold`, `font-weight/medium`, `font/family/display`, `font/family/text`, `type/heading/sm`, `type/label/md`, `type/label/sm`.
- `status`: заливка / цвет `status/success/solid`; обводка `surface/current`; толщина обводки `border/width/strong`.
- `icon`: высота `icon/size/md`; ширина `icon/size/md`.
- `image (заменить)`: заливка / цвет `accent/subtle`.
- `placeholder`: заливка / цвет `text/accent`; типографика `font-weight/medium`, `font/family/text`, `type/label/sm`.
- `network`: радиус `radius/full`; обводка `surface/current`; толщина обводки `border/width/strong`.
- Значений без переменной: 16 (напр. `circle:o=0`, `network:o=0`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Набор `Avatar`, вариантов 42 из 96; оси: Size, Type, Network, State.
- Борда: «Avatar — борда · шаблон v3», разделов 12.
- Описание: 1077 знаков, разделы: Status: Level: Type: Правила: Когда использовать: A11y: Поиск: Legacy:

## 13. Code projection
Код в репо: React `packages/react/src/index.js` (`Avatar`), Vue `packages/vue/src/DsAvatar.vue`, CSS `claude-ds/components/Avatar/style.css`; проверка — `npm run test:code`. Прод (DSP / ui-emcd-web, Flutter) — сверка через `scripts/parity.mjs`, когда появится манифест кода.

- Vue: `<DsAvatar>`; Flutter: `DsAvatar`.
- Props: `size`: xs | m | l | xl | 2xs | s; `type`: text | icon | image | coin; `network`: boolean; `initials`: string или слот; `status`: boolean = false.
- Состояния (Default, Skeleton) — не props: Hover / Pressed / Focus из платформы; `disabled`, `skeleton` — props.

## 14. Acceptance (2026-11-24)
- `audit.plugin.js` — 0 замечаний сверх реестра.
- `variables-check.plugin.js` — нет: корень — `size/media/xs` / `md` / `lg` / `xl` (привязано 2026-11-16).
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props с кодом продукта — по манифесту кода, когда он будет; код в репо проверяет `npm run test:code`.
- Не проверено: полный крест 72 ячейки — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, Status = On; кода нет — parity props пропущена.

## 15. Migration
- DS Web: avatar (status, size md / sm, state), base avatar / single → Avatar (Size XS–L, Type, Status); интерактивные state убраны — у обёртки; загрузка — State=Skeleton.

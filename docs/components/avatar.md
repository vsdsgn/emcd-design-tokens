# Avatar — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Avatar`. Status: beta. Level: unknown.
- Figma: Components, страница «Avatar» (`367:265`), набор `108:1270`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Круглое изображение пользователя, субаккаунта или контрагента: инициал, иконка или фото.
- Когда использовать: пользователь, субаккаунт, контрагент — в шапке, списках, карточках.
- Когда нет: монета и сеть — Coin; устройство и раздел — Icon; несколько аватаров стопкой — Avatar group.
- Правило выбора варианта:
  - Type: Image — есть фото; Text — фото нет, известно имя (1 заглавная буква — первая буква имени); Icon — нет ни фото, ни имени.
  - Size: XS 20 — строки таблиц и чипы; S 32 — списки и шапка; M 40 — карточки; L 56 — профиль.
  - Status — точка «в сети» (`status/success/solid`); только там, где присутствие имеет смысл (чат поддержки, команда).
- Не делаем: две и более буквы в инициалах; цвет фона как носитель смысла; квадратная форма; нажатие без обёртки-кнопки.

## 3. Anatomy
- `circle` (обрезает содержимое, `radius/full`; фон `action/secondary/default`, у Icon — `accent/subtle`) → `initials` | `icon` (`icon/size/md`) | `image (заменить)` + `placeholder`.
- `status` — точка с обводкой `surface/current` (`border/width/strong`): на любой поверхности L0–L3 обводка совпадает с фоном.
- Вложено: иконки ×4.
- Служебные слои (вариантов из 12): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент.
- Своих состояний нет. Нажимаемый аватар — внутри Button / Icon button / строки списка: фокус и зона нажатия — у обёртки.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | XS · S · M · L | XS |
| Type | Text · Icon · Image | Text |

Матрица полная: 12 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Initials | текст | «E» | 4 из 12 |
| Status | булево | выкл | 12 из 12 |

## 6. Content / slots
- Initials — 1 буква; длиннее — обрезается кругом (проверено на стенде), поэтому усечение делает код до передачи.
- Изображение — заполняет круг (cover), центр кадра; не загрузилось — Type=Text или Icon.
- Текст 200 %: круг и инициал не растут — размер фиксирован осью Size.
- RTL: точка статуса — у конца строки (зеркалится), содержимое круга — нет.

## 7. Events
- Нет.

## 8. Behavior
- Статичен. Смена Type при загрузке фото — без анимации.

## 9. Accessibility
- Рядом есть имя — `aria-hidden`; имени рядом нет — `alt` / доступное имя = имя пользователя.
- Status — в доступном имени («в сети»), не только цветом.

## 10. Tokens
- `корень`: высота `size/media/lg`, `size/media/md`, `size/media/xl`, `size/media/xs`; ширина `size/media/lg`, `size/media/md`, `size/media/xl`, `size/media/xs`.
- `circle`: заливка / цвет `accent/subtle`, `action/secondary/default`; высота `size/media/lg`, `size/media/md`, `size/media/xl`, `size/media/xs`; радиус `radius/full`; ширина `size/media/lg`, `size/media/md`, `size/media/xl`, `size/media/xs`.
- `initials`: заливка / цвет `text/secondary`; типографика `font-weight/bold`, `font-weight/medium`, `font/family/display`, `font/family/text`, `type/heading/sm`, `type/label/md`, `type/label/sm`.
- `status`: заливка / цвет `status/success/solid`; обводка `surface/current`; толщина обводки `border/width/strong`.
- `icon`: высота `icon/size/md`; ширина `icon/size/md`.
- `image (заменить)`: заливка / цвет `accent/subtle`.
- `placeholder`: заливка / цвет `text/accent`; типографика `font-weight/medium`, `font/family/text`, `type/label/sm`.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Набор `Avatar`, вариантов 12 из 12; оси: Size, Type.
- Борда: «Avatar — борда · шаблон v3», разделов 9.
- Описание: 823 знаков, разделы: Status: Level: Правила: Когда использовать: A11y: Поиск: Legacy:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsAvatar>`; Flutter: `DsAvatar`.
- Props: `size`: xs | s | m | l; `type`: text | icon | image; `initials`: string или слот; `status`: boolean = false.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний сверх реестра.
- `variables-check.plugin.js` — ширина и высота корня 20 / 32 / 40 / 56 числом — временная строка реестра до Publish `size/media/*`.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячейки — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, Status = On; кода нет — parity props пропущена.

## 15. Migration
- DS Web: avatar (status, size md / sm, state), base avatar / single → Avatar (Size XS–L, Type, Status); state убран — интерактивность у обёртки.

Осталось доделать (после пакета правок beta 2026-11-13):
- Корень — на `size/media/*` после Publish Foundations (`bind-dims.plugin.js`), затем снять строку реестра.

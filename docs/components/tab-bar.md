# Tab bar — контракт (2026-11-19)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Tab bar`. Status: beta. Level: unknown.
- Figma: Components, страница «Tab bar» (`366:4724`), компонент `66:371`. Платформы: iOS, Android, Mobile web.
- Страница «Tab bar», организм (один вариант, без осей). В слоте Items — 4–5 Tab bar item; служебный слой `safe area` с `home indicator`.

## 2. Intent
- Нижняя навигация на Compact: 4–5 основных разделов. App (iOS / Android) и мобильный веб — одна схема.
- Когда использовать: основная навигация на Compact, 3–5 разделов, порядок как в сайдбаре.
- Когда нет: Web Expanded+ — Sidebar; подразделы экрана — Tabs; больше 5 разделов — часть в «Профиль» / «Ещё».
- Правило выбора варианта:
  - Items: 4–5 Tab bar item, порядок как в Sidebar; остальное — в «Профиль» / «Ещё». Selected — ровно один пункт.
  - Safe area: On — по умолчанию, нижнее поле `os/safe-area/bottom` (iPhone с жестами — 34, в вебе — `env(safe-area-inset-bottom)`); Off — только если safe area уже отдал родитель.
  - Контент скроллится под таббаром; Toast — над таббаром.
- Не делаем: больше 5 пунктов; таббар на Web Expanded+; Disabled-пункты (недоступный раздел скрывается); таббар без safe area на устройстве с жестами.

## 3. Anatomy
- Корень — ширина экрана (на стенде 375 числом); линия сверху — кромка `edge/hairline` × `border/width/default`.
- Поверхность: Expressive — `material/thin/fill` + `material/thin/blur`; Base — непрозрачная поверхность без блюра.
- Items (отступ `space/8`): Tab bar item `size/tab-bar-item/width` × `control/height/xl`, зазор иконки и подписи `space/2`.
- `safe area` — в потоке под пунктами (было вынесено за низ абсолютом — исправлено 2026-11-15), высота `os/safe-area/bottom`; `home indicator` — `icon/primary`, `radius/chip`.
- Вложено: `Tab bar item` ×5.
- Служебные слои (вариантов из 1): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 1.

## 4. States
- Группа модели состояний (`docs/components.md`): Контейнер: своих состояний нет; Pressed / Selected / Focus — у вложенных Tab bar item.
- Оси State нет. Selected / Pressed — у Tab bar item: выбранный — `icon/accent` + `text/accent`, остальные — `text/secondary`; Badge dot — у пункта.

## 5. Properties
Осей нет: один компонент.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Safe area | булево | вкл | 1 из 1 |
| Items | слот | — | 1 из 1 |

- Items — слот (Tab bar item); Safe area — по умолчанию On.
- Текстовых свойств нет: подписи — во вложенных Tab bar item.

## 6. Content / slots
- Подписи — по правилу Tab bar item: одно слово, одна строка, многоточие по ширине пункта 72.
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет. Порядок пунктов зеркалится. На стенде направление не переключается: ar проверен только на обрезку.
- Языки без обрезки по высоте на стенде: de, ar, hi, th, ja, kk; подписи соседних пунктов стоят вплотную.
- Текст 200 %: подписи помещаются по высоте впритык, высота таббара не растёт, усечение по ширине.

## 7. Events
- `click` по Tab bar item → смена раздела; повторное нажатие на текущий — прокрутка к началу (App).

## 8. Behavior
- Закреплён у низа экрана; контент скроллится под ним.
- Смена раздела — без анимации таббара; Pressed и хаптик — у Tab bar item.
- Expressive: `material/thin` (стекло над контентом).

## 9. Accessibility
- `nav` с `aria-label` «Основная навигация»; текущий пункт — `aria-current="page"`.
- При reduced transparency — сплошная подложка `surface/raised` вместо стекла.
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`). Кольцо и зоны нажатия — у Tab bar item.

## 10. Tokens
- `корень`: эффект `material/thin/blur`; заливка / цвет `material/thin/fill`; обводка `edge/hairline`; толщина обводки `border/width/default`.
- `Items`: отступы `space/8`.
- `Tab bar item`: интервал `space/2`; высота `control/height/xl`; ширина `size/tab-bar-item/width`.
- `home indicator`: заливка / цвет `icon/primary`; радиус `radius/chip`.
- Служебные слои (общие правила — `service-layers.md`): `safe area`: высота `os/safe-area/bottom`.
- Значений без переменной: 1 (напр. `(root):w=375`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Только Compact: iOS, Android, Mobile web — одна схема.
- Нижний отступ — `os/safe-area/bottom` (iOS 34, Android 24, веб — `env(safe-area-inset-bottom)`).
- Web Expanded+ — Sidebar.

## 12. Figma projection
- Компонент `Tab bar`; оси: нет.
- Борда: «Tab bar — борда · шаблон v3», разделов 11.
- Описание: 1015 знаков, разделы: Status: Level: Правила: A11y: Когда использовать: Expressive: Поиск: Legacy: Expressive (привязано):

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsTabBar>`; Flutter: `DsTabBar`.
- Props: `safeArea`: boolean = true; `items`: string или слот.

## 14. Acceptance (2026-11-19)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — ширина корня 375 — числом.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-15 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; Expressive (стекло) не снят — только Base; RTL на стенде не зеркалится; кода нет — parity props пропущена.

## 15. Migration
- DS App: нижняя навигация → Tab bar (слот Items с Tab bar item, Safe area).
- Мобильный веб пула: меню-бургер → Tab bar, как в App и WL (решение 2026-11-16, `docs/patterns.md`).

Осталось доделать (после пакета правок beta 2026-11-13):
- Base-поверхность сверить с «`surface/raised`» в A11y (reduced transparency).

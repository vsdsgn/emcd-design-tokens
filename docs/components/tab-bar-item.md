# Tab bar item — контракт (2026-11-21)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Tab bar item`. Status: beta. Level: unknown.
- Figma: Components, страница «Tab bar item» (`2093:1272`), набор `65:105`. Платформы: iOS, Android, Mobile web.
- Страница «Tab bar» (уровень организма); сам пункт — атом, вне Tab bar не используется.

## 2. Intent
- Пункт нижней навигации: иконка 24 + подпись. App и мобильный веб — одна схема.
- Когда использовать: основные разделы продукта на Compact, 3–5 пунктов.
- Когда нет: подразделы экрана — Tabs; больше 5 разделов — пятый пункт «Ещё» со списком.
- Правило выбора варианта:
  - Знак Action (19.11): в Icon · swap — Logo · Network=EMCD, Style=Mono (в предпочтительных значениях свойства; по умолчанию у набора — dots-grid, общий для Item и Action). Цвет — `icon/primary`, на плашке `action/secondary/default`. В коде `type: 'action'` без `icon` — `logo-emcd`.
  - Type (19.11): Item — раздел; Action — центральная мультикнопка App («E» → шит быстрых действий): плашка 56 × 40 `action/secondary/default` с обводкой `border/accent`, иконка или логотип без подписи; одна на Tab bar, по центру, без Selected
  - Selected=On — текущий раздел (`icon/accent` + `text/accent`); Off — `text/secondary`.
  - Badge dot — в разделе есть то, что требует действия; число не показываем.
  - Подпись `type/overline` (10) — 17.11, по продукту App (системная норма iOS).
- Не делаем: Disabled (недоступный раздел скрывается); подпись в два слова; число в бейдже.

## 3. Anatomy
- Корень 72×56 (`size/tab-bar-item/width`, `control/height/xl`): `icon` (замена экземпляра) + `label` (Label/SM) + `badge dot`.
- Служебные: `state layer`, `focus ring`, зоны, `safe area · outer`.
- Вложено: иконки ×6.
- Служебные слои (вариантов из 6): кольцо фокуса 6 · зона Web 6 · зона касания 6 · безопасное поле 6.

## 4. States
- Группа модели состояний (`docs/components.md`): Навигация; Hover нет (касание), Pressed — слой `state/layer` × `state/pressed`.
- Default, Pressed × Selected Off | On. Disabled не используется.
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`). Для внешней клавиатуры и мобильного веба.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Selected | Off · On | Off |
| State | Default · Pressed | Default |
| Type | Item · Action | — |

Матрица: 6 из 8.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Label | текст | «Дашборд» | 6 из 6 |
| Icon · swap | замена экземпляра | `icon/dots-grid` | 6 из 6 |
| Badge dot | булево | выкл | 6 из 6 |
| Focus ring | булево | выкл | 6 из 6 · служебное |
| Show hit area | булево | выкл | 6 из 6 · служебное |
| Safe margin | булево | выкл | 6 из 6 · служебное |

## 6. Content / slots
- Подпись — одно слово, max-width 72, усечение многоточием; на 200 % текста подпись не переносится — проверить на стенде.
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет. Порядок пунктов зеркалится.

## 7. Events
- `click` → смена раздела (испускает Tab bar).

## 8. Behavior
- Pressed: слой 10 %, 120 мс. Хаптик `haptic/selection` при смене раздела.
- Повторное нажатие на текущий раздел — прокрутка к началу (в приложении).
- Цель нажатия — весь пункт (≥ 44).

## 9. Accessibility
- `nav`; пункт — ссылка с `aria-current="page"` у текущего.
- Badge dot — в доступном имени («Кошелёк, есть уведомления»).

## 10. Tokens
- `корень`: интервал `space/2`; высота `control/height/xl`; ширина `size/tab-bar-item/width`.
- `label`: заливка / цвет `text/accent`, `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/overline`.
- `badge dot`: заливка / цвет `status/danger/solid`.
- `plate`: заливка / цвет `action/secondary/default`; радиус `radius/control`; обводка `border/accent`; толщина обводки `border/width/default`.
- Служебные слои (общие правила — `service-layers.md`): `focus ring`: радиус `radius/2xs`; обводка `border/focus-ring`; толщина обводки `border/width/focus-ring` · `hit area · web`: видимость `touch/is-fine` · `hit area · overlay`: заливка / цвет `status/danger/solid` · `hit area · app`: видимость `touch/is-coarse` · `safe area · outer`: обводка `status/success/solid`; толщина обводки `control/safe-margin` · `state layer`: заливка / цвет `state/layer`; прозрачность `state/pressed`; радиус `radius/control`.
- Значений без переменной: 12 (напр. `hit area · web:w=72`, `hit area · web:h=56`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Только касание: iOS, Android, Mobile web. На Web (Large) навигация — Sidebar.
- Нижний отступ safe area — у Tab bar, не у пункта.

## 12. Figma projection
- Набор `Tab bar item`, вариантов 6 из 8; оси: Selected, State, Type.
- Борда: «Tab bar item — борда · шаблон v3», разделов 12.
- Описание: 1175 знаков, разделы: Status: Level: Правила: A11y: Когда использовать: Хаптик: Поиск: Legacy: Disabled не используется: Type (19.

## 13. Code projection
Код в репо: React `packages/react/src/index.js` (`TabBarItem`), Vue `packages/vue/src/DsTabBarItem.vue`, CSS `claude-ds/components/TabBarItem/style.css`; проверка — `npm run test:code`. Прод (DSP / ui-emcd-web, Flutter) — сверка через `scripts/parity.mjs`, когда появится манифест кода.

- Vue: `<DsTabBarItem>`; Flutter: `DsTabBarItem`.
- Props: `selected`: boolean; `type`: item | action; `label`: string или слот; `badgeDot`: boolean = false.
- Состояния (Default, Pressed) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.
- `type="action"` — плашка без подписи: `label` уходит в `aria-label` (обязателен), `selected` игнорируется; `badgeDot` добавляет к доступному имени `badgeLabel` («есть уведомления»).

## 14. Acceptance (2026-11-21)
- `audit.plugin.js` — `raw radius 12 @state layer` — радиус слоя состояния числом.
- `variables-check.plugin.js` — `maxWidth 72 @label` числом.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props с кодом продукта — по манифесту кода, когда он будет; код в репо проверяет `npm run test:code`.
- Не проверено: стенд Light / Dark × бренды × платформы × L0–L3, длинный текст, 6 языков, текст 200 % — снимаются при замене набора (фаза C, после точки отката).

## 15. Migration
- DS App: нижняя навигация, active → Selected Off | On; Badge dot и Focus ring — новые.

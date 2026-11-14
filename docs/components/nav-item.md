# Nav item — контракт (2026-11-14)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Nav item`. Status: beta. Level: unknown.
- Figma: Components, страница «Nav item» (`1012:23`), набор `65:82`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Пункт основной навигации в сайдбаре Web: иконка и подпись; в свёрнутом сайдбаре — только иконка.
- Когда использовать: пункт основной навигации в сайдбаре (Web, Large+).
- Когда нет: переключение внутри страницы — Tabs; в App и на Compact — Tab bar item.
- Правило выбора варианта:
  - Collapsed: Off — развёрнутый сайдбар (иконка + подпись); On — свёрнутый (только иконка, подпись — в Tooltip справа). Все пункты сайдбара — в одном значении.
  - Selected=On — текущий раздел, ровно один на сайдбар; у выбранного есть Hover / Pressed.
  - Icon · swap — обязательна, одна стилистика (Icons). Label — одно-два слова.
  - Counter — только для того, что требует действия (Danger), не для количества.
  - 5–8 пунктов верхнего уровня.
- Не делаем: пункт без иконки; два выбранных пункта; Counter как счётчик количества; развёрнутые и свёрнутые пункты в одном сайдбаре.

## 3. Anatomy
- Корень: высота `size/row/compact` (36), радиус `radius/control`, отступы `space/6`, зазор `space/8`; иконка 24 → `label` (`type/label/lg`, `font-weight/medium`) → `counter` (вложенный Counter, `status/danger/solid`).
- Collapsed=On: корень `size/row/compact` × `size/row/compact`, подписи нет, `counter` — в правом верхнем углу поверх иконки.
- Selected=On: плашка `action/secondary/default` (нейтральная, без тинта бренда) + `indicator` слева — `border/accent`, 2 × 20 (`size/tab-indicator/sm` × `icon/size/md`).
- `accent glow` — свечение за иконкой у Selected (`light/accent/color`, блюр `light/accent/blur`), только в Expressive (`decor/light`).
- Служебные: `state layer`, `focus ring`, `hit area · web` / `hit area · app`, `safe area · outer`.
- Вложено: иконки ×12, `Counter` ×12.
- Служебные слои (вариантов из 12): кольцо фокуса 12 · зона Web 12 · зона касания 12 · безопасное поле 12.

## 4. States
- Группа модели состояний (`docs/components.md`): Навигация: выбранное — нейтральная плашка + индикатор `border/accent`; Hover / Pressed — слой `state/layer` × `state/hover` / `state/pressed`; Disabled нет.
- Default — без подложки, подпись `text/secondary`; Hover — слой состояния, подпись `text/primary`; Pressed — слой состояния, подпись `text/primary`.
- Selected=On — плашка `action/secondary/default`, индикатор `border/accent` слева, подпись `text/primary`; Hover / Pressed выбранного — слой состояния поверх плашки.
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`).

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Collapsed | Off · On | Off |
| Selected | Off · On | Off |
| State | Default · Hover · Pressed | Default |

Матрица полная: 12 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Label | текст | «Дашборд» | 12 из 12 |
| Icon · swap | замена экземпляра | `icon/dots-grid` | 12 из 12 |
| Counter | булево | выкл | 12 из 12 |
| Focus ring | булево | выкл | 12 из 12 · служебное |
| Show hit area | булево | выкл | 12 из 12 · служебное |
| Safe margin | булево | выкл | 12 из 12 · служебное |

## 6. Content / slots
- Label — одно-два слова. Длинный текст: одна строка, усечение многоточием; ширина пункта от текста не растёт (218).
- Языки (de, hi, th, ja, kk) — одна строка, по высоте не обрезано; ar — см. todo.
- RTL: иконка и подпись меняются местами, Counter уходит к левому краю; Tooltip свёрнутого пункта — слева.
- Текст 200 %: подпись растёт, плашка остаётся 36, обрезки нет; Counter растёт по высоте вместе с цифрой.

## 7. Events
- `click` — переход в раздел (в коде это ссылка).

## 8. Behavior
- Hover: слой 0 → 6 %, `motion/duration/feedback` (120 мс), `motion/easing/standard`. «Уменьшить движение»: длительности ≈ 0.
- Collapsed=On: подпись — в Tooltip справа.
- Зона нажатия ≥ `touch/min`: Web 24, касание 44 (слои `hit area · web` / `hit area · app`, проверка — Show hit area); безопасное поле — `control/safe-margin`.

## 9. Accessibility
- `nav` → `a`; текущий пункт — `aria-current="page"`.
- Collapsed=On: `aria-label` = подпись.
- Tab — фокус, Enter — переход.

## 10. Tokens
- `корень`: заливка / цвет `action/secondary/default`; интервал `space/8`; высота `size/row/compact`; отступы `space/6`; радиус `radius/control`; ширина `size/row/compact`.
- `label`: заливка / цвет `text/primary`, `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`.
- `counter`: заливка / цвет `status/danger/solid`; maxw `size/counter/max`; minh `size/counter-height/sm`; мин. ширина `size/counter-height/sm`; отступы `space/2xs`; радиус `radius/full`.
- `indicator`: заливка / цвет `border/accent`; высота `icon/size/md`; радиус `radius/full`; ширина `size/tab-indicator/sm`.
- `accent glow`: эффект `light/accent/blur`; заливка / цвет `light/accent/color`; видимость `decor/light`.
- Служебные слои (общие правила — `service-layers.md`): `focus ring`: радиус `radius/focus-ring`; обводка `border/focus-ring`; толщина обводки `border/width/focus-ring` · `hit area · web`: видимость `touch/is-fine` · `hit area · overlay`: заливка / цвет `status/danger/solid` · `hit area · app`: видимость `touch/is-coarse` · `safe area · outer`: обводка `status/success/solid`; толщина обводки `control/safe-margin` · `state layer`: заливка / цвет `state/layer`; прозрачность `state/hover`, `state/pressed`; радиус `radius/control`.
- Значений без переменной: 30 (напр. `(root):w=218`, `hit area · web:w=218`, `hit area · web:h=36`, `hit area · web:w=36`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Только Web, сайдбар на Large+; в App и на Compact — Tab bar item.
- Hover — только с указателем.

## 12. Figma projection
- Набор `Nav item`, вариантов 12 из 12; оси: Collapsed, Selected, State.
- Борда: «Nav item — борда · шаблон v3», разделов 12.
- Описание: 1200 знаков, разделы: Status: Level: Правила: A11y: Когда использовать: Expressive: Поиск: Legacy: Expressive (привязано):

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsNavItem>`; Flutter: `DsNavItem`.
- Props: `collapsed`: boolean; `selected`: boolean; `label`: string или слот; `counter`: boolean = false.
- Состояния (Default, Hover, Pressed) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-14)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; RTL стенд не проверяет; Expressive (свечение) не проверен; Selected по модели «Навигация» (14.11) стендом не перепроверен; кода нет — parity props пропущена.

## 15. Migration
- DS Web `Navbar в sidebar / default` → Nav item: Collapsed Off | On, Selected Off | On, State Default | Hover | Pressed, Counter. Опора — Web App: выбранный пункт — нейтральная плашка + индикатор слева.

Осталось доделать (после пакета правок beta 2026-11-13):
- На проверку: ar — многоточие усечённой подписи вплотную к иконке (нет зазора `space/8`).
- Ширина корня 218 и размеры `hit area · web` (218 / 36 × 36) — числом.

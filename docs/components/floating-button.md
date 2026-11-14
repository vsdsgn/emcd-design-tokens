# Floating button — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Floating button`. Status: beta. Level: unknown.
- Figma: Components, страница «Floating button» (`366:6658`), набор `179:1295`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Плавающая кнопка главного действия экрана на Compact (App, мобильный веб): «Добавить воркер», «Пополнить».
- Когда использовать: одно частое действие на экране-списке.
- Когда нет: на Web — Button в шапке страницы; больше одного действия; форма — кнопка внизу формы.
- Правило выбора варианта:
  - Layout: Icon — `control/height/xl` (56), только с однозначной иконкой и доступной подписью; Extended — иконка + подпись до 20 знаков, при прокрутке вниз сворачивается в Icon.
  - Одна на экран. Позиция: справа снизу (в RTL — слева), над Tab bar и безопасной зоной, отступ `space-md`.
  - Не перекрывает последний элемент списка: у контента отступ снизу.
- Не делаем: на Web; две плавающие кнопки на экране; Icon с неоднозначной иконкой; подпись длиннее 20 знаков.

## 3. Anatomy
- Корень: капсула (`radius/chip`), заливка `action/primary/default`, тень Elevation/3 (`shadow/ambient` + `shadow/key`); Icon — квадрат `control/height/xl`, Extended — отступы `space/20`, зазор `space/8`.
- `icon/plus` (`icon/size/md`) + `label` (`type/label/md`, `text/on-accent`) — подпись только у Extended.
- Служебные: `state layer`, `focus ring`, `hit area · web` / `hit area · app`, `safe area · outer`.
- Вложено: иконки ×8.
- Служебные слои (вариантов из 8): кольцо фокуса 8 · зона Web 8 · зона касания 8 · безопасное поле 8.

## 4. States
- Группа модели состояний (`docs/components.md`): Плашка: слой `state/layer-inverse` × `state/hover` / `state/pressed`; Disabled — `action/disabled` и `text/disabled`.
- Default — акцентная заливка с тенью.
- Hover — слой `state/hover` поверх заливки (только с указателем).
- Pressed — слой `state/pressed`, заметнее Hover.
- Disabled — серая подложка `action/disabled`, иконка и подпись `text/disabled`, тени нет.
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`). Свойство Focus ring; кольцо повторяет скругление.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Layout | Icon · Extended | Icon |
| State | Default · Hover · Pressed · Disabled | Default |

Матрица полная: 8 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Show hit area | булево | выкл | 8 из 8 · служебное |
| Safe margin | булево | выкл | 8 из 8 · служебное |
| Focus ring | булево | выкл | 8 из 8 · служебное |

- Show hit area, Safe margin, Focus ring — служебные, по умолчанию Off.

## 6. Content / slots
- Подпись Extended — действие глаголом, до 20 знаков («Добавить воркер», «Пополнить»), одна строка; поведение при превышении в описании не задано.
- Icon — подпись только в доступном имени.
- RTL: кнопка — слева снизу, иконка и подпись меняются местами; «плюс» не зеркалится.
- Текст 200 %: подпись Extended растёт, кнопка расширяется, высота 56 сохраняется; иконка не масштабируется (стенд).

## 7. Events
- `click`; в Disabled не испускается.

## 8. Behavior
- Hover: слой 0 → 6 %, `motion/duration/feedback` (120 мс), `motion/easing/standard`. «Уменьшить движение»: длительности ≈ 0.
- Прокрутка списка вниз — Extended сворачивается в Icon.
- Хаптик `haptic/press` на касании.
- Зона нажатия ≥ `touch/min`: Web 24, касание 44 (слои `hit area · web` / `hit area · app`, проверка — Show hit area); безопасное поле — `control/safe-margin`.

## 9. Accessibility
- `<button>` с `aria-label` (у Icon — обязательно; у Extended имя — подпись); Enter и Пробел.
- Не перекрывает последний элемент списка: отступ снизу у контента.
- Disabled — `aria-disabled`.

## 10. Tokens
- `корень`: эффект `shadow/ambient`, `shadow/key`; заливка / цвет `action/disabled`, `action/primary/default`; интервал `space/8`; высота `control/height/xl`; отступы `space/20`; радиус `radius/chip`; ширина `control/height/xl`.
- `icon/plus`: высота `icon/size/md`; ширина `icon/size/md`.
- `label`: заливка / цвет `text/disabled`, `text/on-accent`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- Служебные слои (общие правила — `service-layers.md`): `hit area · web`: видимость `touch/is-fine` · `hit area · overlay`: заливка / цвет `status/danger/solid` · `hit area · app`: видимость `touch/is-coarse` · `safe area · outer`: обводка `status/success/solid`; толщина обводки `control/safe-margin` · `focus ring`: радиус `radius/chip`; обводка `border/focus-ring`; толщина обводки `border/width/focus-ring` · `state layer`: заливка / цвет `state/layer-inverse`; прозрачность `state/hover`, `state/pressed`; радиус `radius/chip`.
- Значений без переменной: 16 (напр. `hit area · web:w=56`, `hit area · web:h=56`, `hit area · web:w=183`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Только Compact: App (iOS, Android) и мобильный веб; на Web не используется — там Button в шапке страницы.
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Набор `Floating button`, вариантов 8 из 8; оси: Layout, State.
- Борда: «Floating button — борда · шаблон v3», разделов 10.
- Описание: 1055 знаков, разделы: Status: Level: Когда использовать: Icon — Позиция: A11y: Тень: Правила:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsFloatingButton>`; Flutter: `DsFloatingButton`.
- Props: `layout`: icon | extended.
- Состояния (Default, Hover, Pressed, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; длинный текст и языки — только Icon, подпись Extended не проверена; RTL стенд не проверяет; код — HTML/CSS.

## 15. Migration
- DS App `button float` (main | inside) → Floating button; DS Web — нет. Соответствие main / inside → Layout Icon | Extended не снято: размер 56, Extended и тень сверить с DS App.
- State Hover | Pressed | Disabled — новые.

Осталось доделать (после пакета правок beta 2026-11-13):
- Проверить Extended с длинной подписью и языками; записать поведение при подписи длиннее 20 знаков.
- `hit area · web` — числом (56 × 56, у Extended ширина 183): зона Extended не подстраивается под ширину кнопки.
- Порядок вариантов: оба Disabled в конце набора, а не в своих группах Layout.
- Строки Legacy в описании нет — добавить (или «нет аналога»).

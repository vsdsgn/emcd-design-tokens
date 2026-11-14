# Button — контракт (2026-11-14)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Button`. Status: beta. Level: unknown.
- Figma: Components, страница «Button» (`259:2`), набор `218:16966`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Кнопка действия. Основа — legacy `baseButton` (DS Web + App), доведена до правил 2.0.
- Когда использовать: запуск действия: отправить, сохранить, отменить, удалить.
- Когда нет: переход на другую страницу в тексте — ссылка; действие иконкой без подписи — Icon button; выбор варианта — Chip / Segmented.
- Правило выбора варианта:
  - Type: Primary — главное действие экрана или блока, одна на группу; Secondary — второе по важности (тонированная подложка), только на L0–L1; Tertiary — нейтральное (Отмена, Назад, Фильтры); Tertiary outline — нейтральное на L2–L3 или пёстрой подложке; Text — действие внутри строки, без подложки и отступов; Inverted — на тёмных, цветных и промо-подложках, на изображениях.
  - Tone: Default — цвет типа; Danger — разрушающее действие, есть у всех типов, кроме Inverted (отсюда 176 из 192).
  - Size: S 32 — таблицы, тулбары, фильтры; M 40 — по умолчанию в Web; L 48 — по умолчанию в App и мобильном вебе; XL 56 — главный CTA внизу на мобильном, онбординг, промо.
  - Кнопки в группе — одного размера; рядом с полем — размер поля (Input M ↔ Button M). Primary — на L0–L2.
- Не делаем: две Primary рядом; Tone=Danger для обычных действий; иконку без подписи; подпись в две строки.

## 3. Anatomy
- Корень: подложка, радиус, отступы, min-width 64.
- `icon left`, `label`, `icon right`; `Spinner` (Loading) — вместо содержимого, ширина не меняется; цвет спиннера — по тону кнопки (дорожка и дуга; у Danger — `text/danger` / `icon/danger`), Disabled — дуга `icon/disabled`.
- Служебные: `state layer`, `focus ring`, зоны `hit area · web` / `· app`, `safe area · outer`.
- Вложено: `Spinner` ×176, иконки ×352.
- Служебные слои (вариантов из 176): кольцо фокуса 176 · зона Web 176 · зона касания 176 · безопасное поле 176.

## 4. States
- Группа модели состояний (`docs/components.md`): Плашка: слой `state/layer` × `state/hover` 6 % / `state/pressed` 10 %; Disabled — токены `*/disabled`; Pressed — ещё масштаб 0.96; у Inverted — `state/layer-inverse`; у Type=Text меняется цвет текста.
- Default, Hover, Pressed, Disabled — ось State. Loading — свойство (спиннер, кнопка не нажимается).
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`).
- Disabled — не реагирует; причину объяснить рядом.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Type | Primary · Inverted · Tertiary · Tertiary outline · Text · Secondary | Primary |
| Tone | Default · Danger | Default |
| Size | S · M · L · XL | M |
| State | Default · Hover · Pressed · Disabled | Default |

Матрица: 176 из 192.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Label | текст | «Button» | 176 из 176 |
| Icon left | булево | выкл | 176 из 176 |
| Icon right | булево | выкл | 176 из 176 |
| Icon left · swap | замена экземпляра | `icon/plus` | 176 из 176 |
| Icon right · swap | замена экземпляра | `icon/arrow-right` | 176 из 176 |
| Focus ring | булево | выкл | 176 из 176 · служебное |
| Loading | булево | выкл | 176 из 176 |
| Show hit area | булево | выкл | 176 из 176 · служебное |
| Safe margin | булево | выкл | 176 из 176 · служебное |

## 6. Content / slots
- Подпись — одна строка, глагол действия. Длинная — усечение; ширина кнопки растёт до контейнера, min 64.
- Иконки слева и справа — через Icon left / Icon right + swap. RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет.
- Немецкий и казахский: закладывать +35 % ширины; не фиксировать ширину под русский текст.

## 7. Events
- `click`; при Loading и Disabled не испускается.

## 8. Behavior
- Hover: слой 0 → 6 %, `motion/duration/feedback` (120 мс), `motion/easing/standard`. «Уменьшить движение»: длительности ≈ 0.
- Pressed: слой → 10 % и масштаб `motion/scale/press` 0.96 от центра (transform, раскладка не меняется), 120 мс. В макете Pressed — только слой.
- Хаптик: `haptic/press` (light) на касании — iOS, Android, Mobile web; Web — нет.
- Loading — спиннер крутится непрерывно; повторное нажатие блокируется.
- Зона нажатия ≥ `touch/min`: Web 24, касание 44 (слои `hit area · web` / `hit area · app`, проверка — Show hit area); безопасное поле — `control/safe-margin`.

## 9. Accessibility
- Нативный `<button>`, имя из подписи; Enter и Пробел.
- Loading — `aria-busy`; Disabled — `aria-disabled`, фокус сохраняется.
- Контраст: белый текст на заливке ≥ 4.5:1; цветной текст (Text, Secondary) ≥ 4.5:1 на L0; Primary на L3 в тёмной теме < 3:1 — не ставить.

## 10. Tokens
- `корень`: заливка / цвет `action/accent/default`, `action/danger-subtle/default`, `action/danger/default`, `action/disabled`, `action/inverse/default`, `action/primary/default`, `action/secondary/default`, `action/tertiary/default`; интервал `space/2`; высота `control/height/lg`, `control/height/md`, `control/height/sm`, `control/height/xl`; мин. ширина `size/button/min`; отступы `space/12`, `space/16`, `space/4`, `space/6`, `space/8`; радиус `radius/container`, `radius/control`, `radius/control-sm`, `radius/xs`; обводка `control/border/default`, `control/border/error`; толщина обводки `border/width/default`.
- `spinner`: высота `icon/size/control`, `icon/size/inline`, `icon/size/lg`, `icon/size/sm`; ширина `icon/size/control`, `icon/size/inline`, `icon/size/lg`, `icon/size/sm`.
- `icon left`: высота `icon/size/control`, `icon/size/inline`, `icon/size/lg`, `icon/size/sm`; ширина `icon/size/control`, `icon/size/inline`, `icon/size/lg`, `icon/size/sm`.
- `pad L`: ширина `space/2`.
- `label`: заливка / цвет `fixed/light`, `text/accent`, `text/danger`, `text/disabled`, `text/inverse`, `text/on-accent`, `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`, `type/label/md`.
- `pad R`: ширина `space/2`.
- `icon right`: высота `icon/size/control`, `icon/size/inline`, `icon/size/lg`, `icon/size/sm`; ширина `icon/size/control`, `icon/size/inline`, `icon/size/lg`, `icon/size/sm`.
- Служебные слои (общие правила — `service-layers.md`): `state layer`: заливка / цвет `state/layer`, `state/layer-inverse`; прозрачность `state/hover`, `state/pressed`; радиус `radius/container`, `radius/control`, `radius/control-sm` · `hit area · web`: видимость `touch/is-fine` · `hit area · overlay`: заливка / цвет `status/danger/solid`; толщина обводки `border/width/default` · `hit area · app`: видимость `touch/is-coarse` · `focus ring`: радиус `radius/focus-ring`, `radius/focus-ring-lg`, `radius/focus-ring-sm`, `radius/focus-ring-xs`; обводка `border/focus-ring`; толщина обводки `border/width/focus-ring` · `safe area · content`: заливка / цвет `status/success/solid` · `safe area · outer`: обводка `status/success/solid`; толщина обводки `control/safe-margin`.
- Min / max корня: minWidth 64 size/button/min.
- Значений без переменной: 352 (напр. `hit area · web:w=69`, `hit area · web:h=40`, `hit area · web:w=65`, `hit area · web:h=32`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.
- Размер по умолчанию: Web — M, App и Mobile web — L.

## 12. Figma projection
- Набор `Button`, вариантов 176 из 192; оси: Type, Tone, Size, State.
- Борда: «Button — борда · шаблон v3», разделов 12.
- Описание: 4402 знаков, разделы: Status: Level: Кнопка действия. Когда использовать: Матрица: • Primary — • Secondary — • Tertiary — • Tertiary outline — • Text — • Inverted — • Default —

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsButton>`; Flutter: `DsButton`.
- Props: `type`: primary | inverted | tertiary | tertiary-outline | text | secondary; `tone`: default | danger; `size`: s | m | l | xl; `label`: string или слот; `iconLeft`: boolean = false; `iconRight`: boolean = false; `loading`: boolean = false.
- Состояния (Default, Hover, Pressed, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled`, `loading` — props.
- `iconLeft` / `iconRight` в коде — слоты, а не boolean + swap.
- Tone=Danger есть у Primary, Secondary, Tertiary, Tertiary outline, Text; сочетание Inverted + Danger отсекать типами.

## 14. Acceptance (2026-11-14)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний (min-width — `size/button/min` во всех вариантах).
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: стенд Light / Dark × бренды × платформы × L0–L3, длинный текст, 6 языков, текст 200 % — снимаются при замене набора (фаза C, после точки отката).

## 15. Migration
- DS Web `baseButton` Type: Primary → Primary; Secondary base → Tertiary; Secondary accent → Secondary; Stroke base → Tertiary outline; Text accent / Link → Text; Error → Primary + Tone=Danger; white → Inverted; Stroke accent, Success — не переносим.
- Size: Small 36 → S 32; Large 56 → XL 56; M 40 и L 48 — новые.
- Has left icon / Has right icon / Has text → Icon left / Icon right / Label; без текста → Icon button.
- Active No | Yes → State; Focus ring и Loading — новые.
- Строка Button в `docs/migration/components.csv` обновлена под эти типы 2026-11-12.

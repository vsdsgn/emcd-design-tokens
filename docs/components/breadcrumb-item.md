# Breadcrumb item — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Breadcrumb item`. Status: beta. Level: atom.
- Figma: Components, страница «Breadcrumb item» (`1012:10`), набор `168:10635`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Пункт хлебных крошек: ссылка на предыдущий уровень; Current — текущая страница, не ссылка.
- Когда использовать: только внутри Breadcrumbs.
- Когда нет: переход между разделами — Nav item или Tabs; действие в тексте — Button Type=Text.
- Правило выбора варианта:
  - State=Current — последний пункт; остальные — Default.

## 3. Anatomy
- Корень со слоем `label`; разделитель в элемент не входит (его ставит Breadcrumbs).
- Служебные слои (вариантов из 5): кольцо фокуса 5 · зона Web 5 · зона касания 5 · безопасное поле 5.

## 4. States
- Группа модели состояний (`docs/components.md`): Текстовый: Hover / Pressed меняют цвет текста, подложки нет.
- Default, Hover, Pressed, Disabled; Current — текущая страница (не интерактивен).
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`).

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| State | Default · Hover · Current · Pressed · Disabled | Default |

Матрица полная: 5 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Label | текст | «Воркеры» | 5 из 5 |
| Focus ring | булево | выкл | 5 из 5 · служебное |
| Show hit area | булево | выкл | 5 из 5 · служебное |
| Safe margin | булево | выкл | 5 из 5 · служебное |

## 6. Content / slots
- Длинный текст: одна строка, усечение многоточием по max-width 200; полный текст — в `title` / тултипе.
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет. Разделитель-шеврон отражается в Breadcrumbs.

## 7. Events
- `click` (переход по ссылке); у Current событий нет.

## 8. Behavior
- Hover: цвет текста, `motion/duration/feedback` (120 мс), `motion/easing/standard`. «Уменьшить движение»: длительности ≈ 0.
- Зона нажатия ≥ `touch/min`: Web 24, касание 44 (слои `hit area · web` / `hit area · app`, проверка — Show hit area); безопасное поле — `control/safe-margin`.

## 9. Accessibility
- Ссылка `<a>` внутри `nav` с `aria-label`; Current — `aria-current="page"`, не ссылка.
- Tab — по пунктам, Enter — переход.

## 10. Tokens
- `корень`: отступы `space/2`; радиус `radius/xs`.
- `label`: заливка / цвет `text/disabled`, `text/primary`, `text/secondary`; типографика `font-weight/medium`, `font-weight/regular`, `font/family/text`, `type/body/md`, `type/label/md`.
- Служебные слои (общие правила — `service-layers.md`): `focus ring`: радиус `radius/focus-ring-xs`; обводка `border/focus-ring`; толщина обводки `border/width/focus-ring` · `hit area · web`: видимость `touch/is-fine` · `hit area · overlay`: заливка / цвет `status/danger/solid` · `hit area · app`: видимость `touch/is-coarse` · `safe area · outer`: обводка `status/success/solid`; толщина обводки `control/safe-margin`.
- Значений без переменной: 10 (напр. `hit area · web:w=60`, `hit area · web:h=24`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Набор `Breadcrumb item`, вариантов 5 из 5; оси: State.
- Борда: «Breadcrumb item — борда · шаблон v3», разделов 11.
- Описание: 714 знаков, разделы: Status: Level: Пункт хлебных крошек. Когда использовать: Правила: A11y: Legacy:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsBreadcrumbItem>`; Flutter: `DsBreadcrumbItem`.
- Props: `label`: string или слот.
- Состояния (Default, Hover, Current, Pressed, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — `raw text: label` — текст без текстового стиля.
- `variables-check.plugin.js` — `maxWidth 200 @label` числом.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: стенд Light / Dark × бренды × платформы × L0–L3, длинный текст, 6 языков, текст 200 % — снимаются при замене набора (фаза C, после точки отката).

## 15. Migration
- DS Web breadcrumbs → Breadcrumb item + Breadcrumbs; состояния Hover / Pressed / Disabled — новые.

Осталось доделать (после пакета правок beta 2026-11-13):
- `label` — привязать текстовый стиль (у Current — свой вес).

# Accordion — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Accordion`. Status: beta. Level: unknown.
- Figma: Components, страница «Accordion» (`367:105`), набор `107:1266`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Вопрос или раздел, который раскрывается по нажатию на заголовок (FAQ, условия, детали расчёта). Контент — слот. Основа — legacy `baseAccordion --1.5`: пункт 64 (L), текст 16, круглый шеврон 24, разделитель.
- Когда использовать: вторичная информация, FAQ, длинные настройки — несколько пунктов списком.
- Когда нет: основное содержимое экрана — обычный блок; один пункт — обычный блок.
- Правило выбора варианта:
  - Size: L — Web; M — Compact (App и Mobile web, legacy mobile adaptive). В одном списке — один размер.
  - Open: Off — свёрнут (шеврон вниз); On — раскрыт (шеврон вверх). Несколько пунктов могут быть открыты одновременно; первый открыт по умолчанию только в FAQ.
  - State: Skeleton — пока грузится список; Disabled — пункт недоступен.
  - Заголовок `Label` — одна-две строки, шеврон всегда в конце строки. Content — слот: абзац `text` или своё содержимое.
  - Divider — разделитель под пунктом, по умолчанию On.
- Не делаем: вложенные аккордеоны; аккордеон из одного пункта; основное содержимое экрана под свёрнутым пунктом.

## 3. Anatomy
- Корень (ширина 400 числом): `header` (`label` + `chevron`; отступы `space/12` / `space/20`, зазор `space/4`, `radius/inner`) + `Content` (слот, по умолчанию `text`, `text/secondary`; отступы `space/12` / `space/20`, зазор `space/8`) + `divider` (`border/subtle`).
- `chevron` — круг 24 `action/secondary/default`, `radius/chip`, внутри иконка шеврона.
- L — `label` `type/label/lg`, `text` `type/body/md`; M — `type/label/md` и `type/body/sm`. Вложены только иконки шеврона.
- Служебные — на `header` (цель — заголовок, не весь раскрытый пункт; `header` без clip): `state layer` (`radius/inner`), `focus ring`, зоны `hit area · web` / `hit area · app`, `safe area · outer`. `skeleton` — полоса `skeleton/base`, `radius/chip`.
- Вложено: иконки ×16.
- Служебные слои (вариантов из 20): кольцо фокуса 20 · зона Web 20 · зона касания 20 · безопасное поле 20.

## 4. States
- Группа модели состояний (`docs/components.md`): Плашка: слой `state/layer` × `state/hover` 6 % / `state/pressed` 10 %; Disabled — токены `*/disabled` (только на `header`); Skeleton — загрузка.
- Default, Hover, Skeleton, Disabled, Pressed. Hover / Pressed — слой `state/hover` / `state/pressed` на `header`, `label` и шеврон с полем `space/12` от края слоя; Disabled — `label` и `text` — `text/disabled`; Skeleton — полоса `skeleton/base` вместо заголовка (высотой строки текста), контента нет, высота как у Default (отступы `header` те же).
- Каждое состояние × Open Off | On × Size L | M = 20 вариантов.
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`). Кольцо — вокруг `header`.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | L · M | L |
| Open | Off · On | Off |
| State | Default · Hover · Skeleton · Disabled · Pressed | Default |

Матрица полная: 20 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Label | текст | «Как начисляются выплаты?» | 16 из 20 |
| Divider | булево | вкл | 20 из 20 |
| Content | SLOT | `undefined` | 20 из 20 |
| Focus ring | булево | выкл | 20 из 20 · служебное |
| Show hit area | булево | выкл | 20 из 20 · служебное |
| Safe margin | булево | выкл | 20 из 20 · служебное |

## 6. Content / slots
- Label — вопрос или название раздела. Длинный текст: заголовок — до двух строк, дальше — многоточие; шеврон всегда в конце строки.
- Content — абзац `text` или своё содержимое слота; высота пункта растёт по контенту.
- Языки (стенд): de, ar, hi, th, ja, kk — перенос и кегль без обрезки по высоте. RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет. Шеврон — у конца строки.
- Текст 200 %: обрезки нет, заголовок переносится, шеврон 24 центрируется по высоте блока; Skeleton не растёт.

## 7. Events
- `click` по заголовку — переключение Open; у Disabled и Skeleton не испускается.

## 8. Behavior
- Hover: слой 0 → 6 %, `motion/duration/feedback` (120 мс), `motion/easing/standard`. «Уменьшить движение»: длительности ≈ 0.
- Раскрытие: высота + прозрачность контента, 320 мс; сворачивание — 200 мс; `motion/duration/enter`, `motion/easing/standard`. Шеврон поворачивается на 180° за то же время.
- «Уменьшить движение»: без анимации высоты.
- Зона нажатия ≥ `touch/min`: Web 24, касание 44 (слои `hit area · web` / `hit area · app`, проверка — Show hit area); безопасное поле — `control/safe-margin`. Зона — только на `header`; контент не нажимается.

## 9. Accessibility
- Заголовок — `<button>` с `aria-expanded` и `aria-controls` → панель контента; Enter / Пробел — раскрыть или свернуть.
- Disabled — `aria-disabled`; Skeleton — `aria-busy` у списка.
- Шеврон декоративен (`aria-hidden`): состояние передаёт `aria-expanded`.

## 10. Tokens
- `header`: интервал `space/4`; отступы `space/12`, `space/20`; радиус `radius/inner`.
- `label`: заливка / цвет `text/disabled`, `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`, `type/label/md`.
- `chevron`: заливка / цвет `action/secondary/default`; радиус `radius/chip`.
- `Content`: интервал `space/8`; отступы `space/12`, `space/20`.
- `text`: заливка / цвет `text/disabled`, `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/md`, `type/body/sm`.
- `divider`: заливка / цвет `border/subtle`.
- `skeleton`: заливка / цвет `skeleton/base`; радиус `radius/chip`.
- Служебные слои (общие правила — `service-layers.md`): `focus ring`: радиус `radius/2xs`; обводка `border/focus-ring`; толщина обводки `border/width/focus-ring` · `hit area · web`: видимость `touch/is-fine` · `hit area · overlay`: заливка / цвет `status/danger/solid` · `hit area · app`: видимость `touch/is-coarse` · `safe area · outer`: обводка `status/success/solid`; толщина обводки `control/safe-margin` · `state layer`: заливка / цвет `state/layer`; прозрачность `state/hover`, `state/pressed`; радиус `radius/inner`.
- Значений без переменной: 60 (напр. `(root):w=400`, `hit area · web:w=400`, `hit area · web:h=64`, `hit area · web:h=48`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размер не зависит от режима Platform: Web — L, Compact (App и Mobile web) — M; цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Набор `Accordion`, вариантов 20 из 20; оси: Size, Open, State.
- Борда: «Accordion — борда · шаблон v3», разделов 12.
- Описание: 1384 знаков, разделы: Status: Level: Аккордеон: Движение: A11y: Когда использовать: Motion: Поиск: Legacy: Правила: Длинный текст:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsAccordion>`; Flutter: `DsAccordion`.
- Props: `size`: l | m; `open`: boolean; `label`: string или слот; `divider`: boolean = true; `content`: string или слот.
- Состояния (Default, Hover, Skeleton, Disabled, Pressed) — не props: Hover / Pressed / Focus из платформы; `disabled`, `skeleton` — props.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; RTL стенд не проверяет; кода нет — parity props пропущена.

## 15. Migration
- DS Web `baseAccordion --1.5`: mobile adaptive → Size L | M; open → Open Off | On; state → State (Default, Hover, Skeleton, Disabled, Pressed); Divider, Focus ring, Show hit area, Safe margin — новые.

Осталось доделать (после пакета правок beta 2026-11-13):
- Корень `w=400` и `hit area · web` (400 × 64 / 48) числом — в узком контейнере (360) шеврон уходит за край; корень Fill / от контейнера.
- Порядок оси State: Skeleton, Disabled, Pressed в конце набора — на решение (Default, Hover, Pressed, Disabled, Skeleton).
- Skeleton при Open Off и On рисуется одинаково — на решение: один Skeleton на Size.

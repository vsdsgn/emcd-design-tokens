# Code cell — контракт (2026-11-14)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Code cell`. Status: beta. Level: unknown.
- Figma: Components, страница «Code cell» (`1012:6`), набор `111:1272`. Платформы: Web, Mobile web, iOS, Android.
- Только внутри Code input. Отдельно в макете не используется.

## 2. Intent
- Ячейка кода: одна цифра кода подтверждения.
- Когда использовать: только внутри Code input — одна цифра кода.
- Когда нет: отдельно в макете; ввод суммы или текста — Input.
- Правило выбора варианта:
  - Size: L 64 × 68 — 4 цифры на Web; M 48 × 56 — 6 цифр и Compact. В ряду все ячейки одного размера.
  - State: Empty — цифра не введена; Focus — ячейка, куда пойдёт ввод (только одна в ряду); Filled — цифра введена; Error / Success — результат проверки, ставятся всем ячейкам сразу; Disabled — ввод недоступен.
  - Digit — ровно одна цифра.

## 3. Anatomy
- Корень: подложка `control/surface/default`, рамка `control/border/default` (`border/width/default`), `radius/control`; высота `size/code-cell/lg` | `size/code-cell/md`.
- `digit` — цифра (`font/family/display`, `font-weight/bold`; L — `type/display/md`, M — `type/heading/lg`); `caret` — каретка `border/focus` (только Focus).
- Служебные: `focus ring`, `hit area · web` / `hit area · app`, `safe area · outer` (свойства Focus ring, Show hit area, Safe margin).
- Вложено: `_Hit area` ×24, `_Safe margin` ×12.
- Служебные слои (вариантов из 12): кольцо фокуса 12 · зона Web 12 · зона касания 12 · безопасное поле 12.

## 4. States
- Группа модели состояний (`docs/components.md`): Поле: состояние — цветом рамки (`control/border/*`), слоя `state/layer` нет; Disabled — токены `*/disabled`.
- Empty — цифра скрыта, ячейка пустая; Filled — цифра `text/primary`.
- Focus — цифра скрыта, рамка `control/border/focus` (`border/width/focus`) + каретка.
- Error — рамка `control/border/error`; Success — рамка `status/success/solid`; цифра `text/primary`.
- Disabled — `control/surface/disabled`, `control/border/disabled`, цифра `text/disabled`.
- Hover / Pressed нет.
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`).

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | L · M | L |
| State | Empty · Focus · Filled · Error · Success · Disabled | Empty |

Матрица полная: 12 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Digit | текст | «4» | 12 из 12 |
| Focus ring | булево | выкл | 12 из 12 · служебное |
| Show hit area | булево | выкл | 12 из 12 · служебное |
| Safe margin | булево | выкл | 12 из 12 · служебное |

## 6. Content / slots
- Digit — одна цифра 0–9. Длиннее — слой `digit` не ограничен и текст выходит за ячейку (стенд: long, de, ar, hi, th, ja, kk), поэтому длину ограничивает код.
- Цифры не переводятся и не зеркалятся.
- Текст 200 %: цифра растёт, ячейка — нет (размер фиксирован осью Size); цифра помещается, обрезки нет.

## 7. Events
- Собственных нет: ввод и проверку обрабатывает Code input.

## 8. Behavior
- Error и Success выставляются всему ряду одновременно; Focus — только у одной ячейки.
- Зона нажатия ≥ `touch/min`: Web 24, касание 44 (слои `hit area · web` / `hit area · app`, проверка — Show hit area); безопасное поле — `control/safe-margin`.

## 9. Accessibility
- Ячейка — `input` с `inputmode=numeric` и именем «Цифра N из M».
- Ошибка — `aria-invalid`; текст ошибки — у Code input.

## 10. Tokens
- `корень`: заливка / цвет `control/surface/default`, `control/surface/disabled`; высота `size/code-cell/lg`, `size/code-cell/md`; радиус `radius/control`; обводка `control/border/default`, `control/border/disabled`, `control/border/error`, `control/border/focus`, `status/success/solid`; толщина обводки `border/width/default`, `border/width/focus`.
- `digit`: заливка / цвет `text/disabled`, `text/primary`, `text/tertiary`; типографика `font-weight/bold`, `font/family/display`, `type/display/md`, `type/heading/lg`.
- `caret`: заливка / цвет `border/focus`.
- Служебные слои (общие правила — `service-layers.md`): `focus ring`: радиус `radius/focus-ring`; обводка `border/focus-ring`; толщина обводки `border/width/focus-ring` · `hit area · web`: видимость `touch/is-fine` · `hit area · overlay`: заливка / цвет `status/danger/solid` · `hit area · app`: видимость `touch/is-coarse` · `safe area · outer`: обводка `status/success/solid`; толщина обводки `control/safe-margin`.
- Значений без переменной: 36 (напр. `(root):w=64`, `hit area · web:w=64`, `hit area · web:h=68`, `(root):w=48`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Набор `Code cell`, вариантов 12 из 12; оси: Size, State.
- Борда: «Code cell — борда · шаблон v3», разделов 12.
- Описание: 769 знаков, разделы: Status: Level: Ячейка кода (одна цифра). Только внутри Code input. Когда использовать: Правила: A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsCodeCell>`; Flutter: `DsCodeCell`.
- Props: `size`: l | m; `digit`: string или слот.
- Состояния (Empty, Focus, Filled, Error, Success, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-14)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; RTL стенд не проверяет; зона `hit area · app` не проверена (ячейки Web); кода нет — parity props пропущена.

## 15. Migration
- DS Web: ячейка кода 69 × 70 из «Подтверждение операции» → Code cell Size=L (64 × 68); 6 цифр и Compact → Size=M (48 × 56); состояния → State Empty | Focus | Filled | Error | Success | Disabled.

Осталось доделать (после пакета правок beta 2026-11-13):
- Описание: Empty — «плейсхолдер 0», в наборе цифра скрыта — свести описание.
- Слой `digit` не ограничен: длинная строка выходит за ячейку — включить обрезку по корню.
- Ширина корня 64 / 48 и `hit area · web` 64 × 68 / 48 × 56 — числом.
- В описании Figma нет строки Legacy.

# Для разработки: что изменилось с 2026-11-09 по 2026-11-12

Предыдущий документ — `docs/dev-handoff-2026-11-06.md` (с обновлением 2026-11-09). Компоненты в Figma не публиковались: всё ниже либо уже в репо, либо ждёт Publish.
Ожидаемый API всех beta-наборов — `docs/api.md` (собирается из манифеста Figma). Кода (DSP, Vue `ui-emcd-web`, Flutter) в доступе у дизайна нет — `docs/dsp-check-2026-11-12.md`; сверка props включится, когда появится манифест кода (`npm run parity`).

## Коротко

- **Сломанного сейчас нет:** за 09–12.11 в Figma только добавления (базы, служебные слои, пилотные надстройки на отдельных досках). Действующие наборы не менялись — API кода тот же.
- **Одна правка сборки токенов (PATCH, исправление):** `--state-hover` и `--state-pressed` в CSS.
- **Впереди MAJOR** — при замене наборов на собранные от баз (после решений Стефана): список ниже, чтобы заложить заранее.

## Breaking (MAJOR)

Нет.

## Изменения в токенах

| Что | Было | Стало | Версия |
|---|---|---|---|
| CSS `--state-hover`, `--state-pressed` | `0.375rem`, `0.625rem` (проценты уходили как размер) | `0.06`, `0.1` — число для `opacity` | PATCH, исправление |
| Flutter-JSON `stateHover`, `statePressed` | `6`, `10` | без изменений (проценты) | — |

Слой состояния в коде: один `::before` с `background: var(--state-layer); opacity: var(--state-hover)`. Если где-то стояли свои числа (0.08 / 0.12 или 0.06 / 0.10 вручную) — заменить на переменные. Действуют **6 % / 10 %**.

**Ждут Publish Foundations и экспорта (21 токен, MINOR — только добавление):**
`control/height/xs`, `control/height/2xl`; `radius/focus-ring-xs`, `radius/focus-ring-inner`, `radius/focus-ring-surface`; `size/badge-height/sm|md|lg`; `size/counter-height/sm|md`; `size/dot/sm|md`; `size/toggle-width/sm|md`, `size/toggle-height/sm|md`; `size/tab-indicator/sm|lg`; `size/tab-bar-item/width`; `size/box`, `size/box-row`.
До экспорта их нет в `tokens/` и `build/` — в коде не использовать.

## Новое в Figma (аддитивно, в код пока не идёт)

- **Базы:** `_Field base` (Input, Textarea и вся семья полей), `_Selection control` (Checkbox, Radio, Toggle), `_List row` (Menu item, Multiselect option, List item), `_Overlay surface` (Tooltip, Menu, Dropdown panel, Toast, Modal, Sheet). Контракты — `docs/components/field-base.md`, `selection-control.md`, `list-row.md`, `overlay-surface.md`.
- **Служебные слои** — отдельные компоненты `_Focus ring`, `_State layer`, `_Hit area`, `_Safe margin` (`docs/components/service-layers.md`). В код не идут как компоненты: это фокус, слой состояния, зона нажатия и поле безопасности внутри каждого компонента.
- Имена с `_` — приватные: в DSP Export и в код как отдельные компоненты не попадают.

Смысл для кода: одна реализация поля / контрола выбора / строки списка / плавающей поверхности, компоненты — тонкие обёртки. Если в Vue и Flutter уже так — менять нечего.

## Планируемые MAJOR при замене наборов (в Figma ещё не сделано)

| Что | Сейчас | Будет | Статус |
|---|---|---|---|
| Сторона иконки и контрола | `Icon left` / `Icon right`, `Control = Left / Right`, `Align = Left / Right` | `Icon start` / `Icon end`, `Start` / `End` | решено 2026-11-09 |
| Ось выбранности | `Selected = Off / On` (Chip, Segment, Tab, Tab bar item) и `Status = Off / On / Indeterminate` (Checkbox, Radio, Toggle) | одна схема на систему | ждёт решения Стефана |
| Ошибка контрола | `Tone = Danger` (Checkbox, Radio) и `State = Error` (Input, Textarea) | одна схема | ждёт решения |
| Loading | булево `Loading` (Button) и значение `State = Loading` (Icon button, Input) | один способ | ждёт решения |
| Булевы видимости | `Icon`, `Close`, `Chevron`, `Remove`, `Counter` и `Show label`, `Show helper` | один префикс | ждёт решения |
| Вариант по умолчанию | у Button в Figma `Size = S` | `M` (Web), `L` (App, Mobile web) — в коде по умолчанию уже по правилу | правка описания и набора |

В коде уже сейчас стоит заложить: `disabled`, `loading`, `error`, `readonly` — boolean props, а не значение `state`; Hover / Pressed / Focus — от платформы; иконки — слот или имя, а не boolean + swap.

## Что сверить разработке

1. **Типы Button.** `Primary · Secondary · Tertiary · Tertiary outline · Text · Inverted` × `Tone = Default · Danger` (Danger — только у Primary, Secondary, Text). Соответствие legacy `baseButton`: Secondary base → Tertiary, Secondary accent → Secondary, Stroke base → Tertiary outline, Text accent / Link → Text, Error → Primary + Danger, white → Inverted; Stroke accent и Success не переносятся. Строка в `docs/migration/components.csv` обновлена 2026-11-12 — подтвердить, что в коде так же.
2. **Недопустимые сочетания** отсекать типами: `tone="danger"` у Inverted, Tertiary, Tertiary outline.
3. **Устаревшие имена** в коде и DSP: типы `Error`, `Secondary error`, `Text error` (→ `Tone = Danger`), `Show safe area` (→ `Safe margin`), масштаб нажатия `0.98` (→ `motion/scale/press` 0.96).
4. **Tab bar item:** радиус плашки 12 числом, токена нет — см. `docs/OPEN-QUESTIONS.md`.
5. **Манифест кода:** чтобы `npm run parity` сверял props автоматически, нужен файл со списком компонентов и props из Vue / Flutter — `docs/code-manifest.json`, формат описан в шапке `scripts/parity.mjs`.

## Проверки в CI репо токенов

`npm run exceptions` · `npm run parity` · `npm run contracts -- --check` · `npm run agent-docs -- --check` · `npm run a11y`.

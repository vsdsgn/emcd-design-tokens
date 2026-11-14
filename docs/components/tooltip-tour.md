# Tooltip tour — контракт (2026-11-14)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Tooltip tour`. Status: beta. Level: unknown.
- Figma: Components, страница «Tooltip tour» (`1662:1177`), набор `1662:1318`. Платформы: Web, Mobile web, iOS, Android.
- Вне базы (решение Стефана 2026-11-06): расширение Tooltip вместе с тултипами графиков; набор собран, не развивать.

## 2. Intent
- Подсказка онбординга с шагами: номер шага, заголовок, пояснение и кнопки «Пропустить» и «Далее», стрелка на элемент. Для обучающих туров по экрану.
- Когда использовать: первый вход, новая функция, тур по нескольким элементам.
- Когда нет: короткая подсказка на hover или фокус — Tooltip; постоянное объяснение — Suggest.
- Правило выбора варианта:
  - Placement: Top — подсказка над элементом (стрелка снизу); Bottom — под элементом (стрелка сверху). Выбирается по месту на экране.
  - Tone: Neutral — по умолчанию (`surface/raised`, обводка `border/default`); Accent — шаг, который надо выделить на нагруженном экране (`action/primary/default`, текст `text/on-accent`).
  - Один шаг — одна подсказка; ширина до 320 (`size/tooltip/max`).
  - Show step — номер шага («Шаг 1 из 4») в туре из 2 и более шагов; Off — одиночная подсказка.
  - «Пропустить» доступен на каждом шаге; Show skip = Off — только на последнем шаге, где «Далее» меняется на «Готово».
- Не делаем: больше одной подсказки тура на экране; Show skip = Off не на последнем шаге; повторный показ пройденного тура; подсказка без подложки Overlay.

## 3. Anatomy
- Корень: `surface/raised` (Accent — `action/primary/default`), обводка `border/default` / `border/width/default`, `radius/container`, тени `shadow/key` + `shadow/ambient`, отступы `space/16`, зазор `space/8`, ширина от `size/tooltip/min` до `size/tooltip/max`.
- `step` (`type/label/md`, `text/tertiary`, без прозрачности) → `title` (`type/label/lg`, `text/primary`) → `description` (`type/label/md`, `text/secondary`). В Accent весь текст — `text/on-accent`.
- `footer` (`space/8`): `skip` (вложенная Button, текстовая) — распорка — `next` (вложенная Button `control/height/sm`; Accent — `action/inverse/default`). «Далее» всегда у конца строки, в том числе при Show skip = Off.
- Стрелка — `_Tooltip arrow`.
- Вложено: `Button` ×8, `_Tooltip arrow` ×4.
- Служебные слои (вариантов из 4): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет у самой подсказки: неинтерактивна; «Пропустить» и «Далее» — вложенные Button со своими состояниями.
- Оси State нет. Шаги тура — смена текста (Step, Title, Description), не варианты.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Placement | Top · Bottom | Top |
| Tone | Neutral · Accent | Neutral |

Матрица полная: 4 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Step | текст | «Шаг 1 из 4» | 4 из 4 |
| Title | текст | «Подключи Watcher link» | 4 из 4 |
| Description | текст | «Дай доступ на просмотр статистики без права управления. Ссылку можно отозвать в любой момент.» | 4 из 4 |
| Show step | булево | вкл | 4 из 4 |
| Show skip | булево | вкл | 4 из 4 |

## 6. Content / slots
- Step — «Шаг N из M»; Title — что это, коротко; Description — зачем. Кнопка последнего шага — «Готово».
- Длинный текст: ширина держится 320, все три поля переносятся без предела строк, подсказка растёт по высоте; усечения нет.
- Языки (de, ar, hi, th, ja, kk): обрезки по высоте нет; de — длинное слово разбивается без дефиса.
- Текст 200 %: подсказка растёт, обрезки текста нет.
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет.

## 7. Events
- «Далее» — следующий шаг; на последнем «Готово» — тур завершён.
- «Пропустить» или Esc — тур закрыт.

## 8. Behavior
- Затемняет экран подложкой Overlay и подсвечивает элемент; стрелка указывает на него.
- Тур показывается один раз.

## 9. Accessibility
- `role="dialog"` с `aria-label`; фокус — на заголовке шага и заперт внутри подсказки.
- Клавиатура: Esc — пропустить тур; ← / → — предыдущий / следующий шаг; Tab — по кнопкам.
- Шаг озвучивается («Шаг 1 из 4»).
- Зоны нажатия и кольцо фокуса — у вложенных Button.

## 10. Tokens
- `корень`: эффект `shadow/ambient`, `shadow/key`; заливка / цвет `action/primary/default`, `surface/raised`; интервал `space/8`; maxw `size/tooltip/max`; мин. ширина `size/tooltip/min`; отступы `space/16`; радиус `radius/container`; обводка `border/default`; толщина обводки `border/width/default`.
- `step`: заливка / цвет `text/on-accent`, `text/tertiary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- `title`: заливка / цвет `text/on-accent`, `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`.
- `description`: заливка / цвет `text/on-accent`, `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- `footer`: интервал `space/8`.
- `skip`: интервал `space/2`; мин. ширина `size/button/min`; отступы `space/4`; радиус `radius/xs`.
- `next`: заливка / цвет `action/inverse/default`, `action/primary/default`; интервал `space/2`; высота `control/height/sm`; мин. ширина `size/button/min`; отступы `space/6`; радиус `radius/control-sm`.
- Min / max корня: minWidth 58 size/tooltip/min, maxWidth 320 size/tooltip/max.
- Значений без переменной: 4 (напр. `(root):w=320`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Набор `Tooltip tour`, вариантов 4 из 4; оси: Placement, Tone.
- Борда: «Tooltip tour — борда · шаблон v3», разделов 11.
- Описание: 936 знаков, разделы: Status: Level: Когда использовать: Правила: A11y: Legacy: Токены:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsTooltipTour>`; Flutter: `DsTooltipTour`.
- Props: `placement`: top | bottom; `tone`: neutral | accent; `step`: string или слот; `title`: string или слот; `description`: string или слот; `showStep`: boolean = true; `showSkip`: boolean = true.

## 14. Acceptance (2026-11-14)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; Show skip = Off после правки footer стендом не перепроверен; RTL стенд не проверяет; кода нет — parity props пропущена.

## 15. Migration
- DS Web Tooltip tour (color, neutral) → Tone Accent | Neutral; Placement Top | Bottom; степпер `.🔸 slider counter` → текст Step.

Осталось доделать (после пакета правок beta 2026-11-13):
- Текст 200 %: подпись «Далее» упирается в край кнопки фиксированной высоты — проверить у Button.
- На решение: предел строк для Title и Description.
- Ширина корня 320 числом.

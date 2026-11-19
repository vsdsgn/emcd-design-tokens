# Tooltip — контракт (2026-11-19)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Tooltip`. Status: beta. Level: unknown.
- Figma: Components, страница «Tooltip» (`317:33689`), набор `317:33734`. Платформы: Web.
- Панель на базе `_Overlay surface` (замена на месте 13.11): фон, радиус и тень — нераскрытый экземпляр `_Overlay surface` (слой `overlay surface`, Kind=Tooltip); уголок — `_Tooltip arrow`.

## 2. Intent
- Короткая подсказка к элементу на Web: что делает иконка, что значит термин, почему контрол неактивен, полный текст обрезанного значения. Без действий внутри. Форма — legacy `base tooltip`.
- Когда использовать: подпись к иконке без текста (в Icon button встроено); пояснение термина у иконки «i»; полный текст обрезанного значения (адрес, хэш, имя воркера); причина неактивного контрола.
- Когда нет: приложение и касание — Sheet по тапу на «i»; действия, ссылки или текст длиннее 3 строк — Popover; значение точки графика — Chart tooltip; онбординг с шагами — Tooltip tour.
- Правило выбора варианта:
  - Placement: Top — по умолчанию; не помещается сверху — Bottom; у бокового края или в вертикальной навигации (rail, сайдбар) — Start / End. Стороны логические: в RTL Start справа.
  - Arrow: Center — по умолчанию, уголок по центру элемента; Start / End — пузырь выровнен по началу / концу элемента (элемент у края, широкий элемент). Уголок не ближе 16 к углу пузыря.
  - Tone: Neutral — по умолчанию; Accent — бренд (`surface/accent`, текст `text/on-accent`).
  - Placement и Arrow выбирает позиционирование в коде, не автор макета: Top → Bottom → сдвиг от края (Start / End) → сбоку.
- Не делаем: действия и ссылки внутри; тултип в приложении и на касании.

## 3. Anatomy
- Корень: отступы `space/10` / `space/16`, радиус `radius/container`; min-ширина и min-высота `size/tooltip/min` (58), max-ширина `size/tooltip/max` (320).
- `overlay surface` — экземпляр `_Overlay surface` (Kind=Tooltip): Neutral — `surface/raised`, Accent — `surface/accent`; обводка `border/default` (`border/width/default`, перенесена с корня 13.11); тени `shadow/key` + `shadow/ambient`; радиус `radius/container`.
- `text` — свойство Text, `type/label/md`, `font-weight/medium`; Neutral — `text/primary`, Accent — `text/on-accent` (14.11).
- `_Tooltip arrow` — уголок 26 × 9, остриё в 8 от элемента. Грань с уголком не короче 58 (2 × 16 + 26) — отсюда min-ширина (Top / Bottom) и min-высота (Start / End).
- Вложено: `_Overlay surface` ×24, `_Tooltip arrow` ×24.
- Служебные слои (вариантов из 24): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент; показ и скрытие — по наведению / фокусу на триггере.
- Своих состояний нет: показан / скрыт — поведение триггера; Placement, Arrow и Tone — не состояния.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Placement | Top · Bottom · Start · End | Top |
| Tone | Neutral · Accent | Neutral |
| Arrow | Center · Start · End | Center |

Матрица полная: 24 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Text | текст | «Комиссия сети списывается отдельно» | 24 из 24 |

## 6. Content / slots
- Одна мысль, коротко; не дублирует видимую подпись элемента.
- Длинный текст: перенос по ширине 320; «до 3 строк» — правило контента (компонент строки не ограничивает: на стенде long — 4 строки), больше — Popover.
- Языки (de, ar, hi, th, ja, kk): обрезки нет, перенос по 320.
- Текст 200 %: все 24 варианта переносятся по 320, пузырь растёт по высоте, обрезки нет.
- RTL: Start / End и Arrow Start / End зеркалятся (логические стороны); стенд RTL не проверяет.
- Одна строка (высота 58): Arrow Start / End совпадают с Center — уголку некуда сдвигаться; в коде то же (Floating UI прижмёт уголок к центру).

## 7. Events
- Показ: наведение (через 500 мс; между соседними элементами за 300 мс — сразу), фокус с клавиатуры — сразу.
- Скрытие: уход курсора или фокуса, Esc.

## 8. Behavior
- Появление — `motion/duration/enter` (200 мс), скрытие — `motion/duration/exit` (120 мс).
- Поверх интерфейса; не перекрывает элемент, к которому относится.

## 9. Accessibility
- `role=tooltip`, у триггера `aria-describedby`.
- Появляется по фокусу с клавиатуры, Esc скрывает.

## 10. Tokens
- `корень`: maxw `size/tooltip/max`; minh `size/tooltip/min`; мин. ширина `size/tooltip/min`; отступы `space/10`, `space/16`; радиус `radius/container`.
- `overlay surface`: эффект `shadow/ambient`, `shadow/key`; заливка / цвет `surface/accent`, `surface/raised`; радиус `radius/container`; обводка `border/default`; толщина обводки `border/width/default`.
- `text`: заливка / цвет `text/on-accent`, `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- Min / max корня: minWidth 58 size/tooltip/min, maxWidth 320 size/tooltip/max, minHeight 58 size/tooltip/min.

## 11. Platforms
- Только Web (указатель и клавиатура); в приложении и на касании — Sheet по тапу на «i».
- Размеры от режима Platform не зависят (на стенде iOS / Android = Web).

## 12. Figma projection
- Набор `Tooltip`, вариантов 24 из 24; оси: Placement, Tone, Arrow.
- Борда: «Tooltip — борда · шаблон v3», разделов 11.
- Описание: 4197 знаков, разделы: Status: Level: Когда использовать: Правила: A11y: • Пояснение термина: • Приложение и касание — • Ошибки формы — • Пузырь: • Neutral — • Placement — • Arrow —

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsTooltip>`; Flutter: `DsTooltip`.
- Props: `placement`: top | bottom | start | end; `tone`: neutral | accent; `arrow`: center | start | end; `text`: string или слот.
- Позиционирование — Floating UI: `flip` (fallbackPlacements: bottom, end, start), `shift`, `arrow`; уголок в коде — одна SVG-форма с пузырём.

## 14. Acceptance (2026-11-19)
- `audit.plugin.js` — 0 после замены на месте 13.11 (OVERLAY и SERVICE 0); после правок 14.11 (Accent `text/on-accent`, обводка `border/default` на `overlay surface`) не перезапускался.
- `variables-check.plugin.js` — не перезапускался после привязки min / max к `size/tooltip/*` (13.11) и правок 14.11; по манифесту значений без переменной 0.
- `audit-parity.plugin.js` — 0 (13.11, прогон по страницам компонентов).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %; перепроверка Dark 15.11 пройдена (после принятия в Components `surface/raised` Dark → `neutral/700`): различим на L0–L2; на L3 приподнятая поверхность равна L3 и держится обводкой / тенью — правило, не дефект; булевых свойств нет; RTL стенд не проверяет; кода нет — parity props пропущена.

## 15. Migration
- DS Web `base tooltip` → Tooltip (Placement, Tone, Arrow): форма из legacy, токены и тень — DS 2.0. DS App `tooltip` → в App тултипа нет (Sheet по «i»).
- MAJOR 13.11: Placement Left / Right → Start / End.

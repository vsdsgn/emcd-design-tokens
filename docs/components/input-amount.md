# Input amount — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Input amount`. Status: beta. Level: unknown.
- Figma: Components, страница «Input amount» (`353:1785`), набор `106:1358`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Поле суммы для пополнения, вывода, обмена и депозита: подпись с иконкой info, баланс и «Макс», сумма крупно, описание лимитов, выбор монеты (Select compact). Ошибка — рамка `control/border/error` и сообщение снизу.
- Когда использовать: суммы вывода и перевода с монетой и «Макс».
- Когда нет: обычное число — Input.
- Правило выбора варианта:
  - State: Default — покой; Focus — идёт ввод; Error — сумма не прошла проверку (рамка, красное описание и сообщение снизу); Disabled — ввод недоступен; Hover — указатель над полем.
  - Filled: False — суммы нет, плейсхолдер (`text/tertiary`); True — сумма введена (`text/primary`).
  - «Макс» подставляет доступную сумму с учётом комиссии.
  - Сумма — Numeric в коде, разделители тысяч пробелом; ввод десятичных — по точности монеты.

## 3. Anatomy
- Корень: подложка `control/surface/default`, рамка `control/border/*`, `radius/control`, отступы `space/20`, зазор `space/16`; min-width `size/field/min` (160).
- `header` (`space/12`): `label` (`label text` + иконка info, Info icon) и `balance` (`balance value` + `max` цветом `text/link`; Show balance — оба вместе).
- `input row`: `amount` (`value` — `type/heading/lg`, `font/family/display`; под ним `description` — `type/label/sm`) и `currency` — Select compact (Show currency).
- `message` — текст ошибки (`text/danger`), виден в State=Error.
- Служебные слои: `state layer`, `focus ring`, `hit area · web` / `hit area · app`, `safe area · outer`.
- Вложено: иконки ×10, `Select compact` ×10, `_Hit area` ×20, `_Safe margin` ×10.
- Служебные слои (вариантов из 10): кольцо фокуса 10 · зона Web 10 · зона касания 10 · безопасное поле 10.

## 4. States
- Группа модели состояний (`docs/components.md`): Поле: Hover — слой `state/layer` × `state/hover`, обводка остаётся `control/border/default`; Pressed нет; Focus — `control/border/focus` + кольцо; Disabled — токены `*/disabled`.
- Default — рамка `control/border/default`; Filled=False — сумма цветом плейсхолдера, True — основным.
- Focus — рамка `control/border/focus`.
- Error — рамка `control/border/error`, описание красным (`text/danger`), снизу сообщение; поле выше на строку.
- Disabled — заливка `control/surface/disabled`, рамка `control/border/disabled`; подпись, баланс, «Макс», сумма и описание — `text/disabled`, иконка info — `icon/disabled`, Select compact — в Disabled.
- Hover — слой `state/layer` × `state/hover` поверх поля.
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`).

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Filled | False · True | False |
| State | Default · Focus · Error · Disabled · Hover | Default |

Матрица полная: 10 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Label | текст | «Пополняю» | 10 из 10 |
| Value | текст | «1 250.00» | 10 из 10 |
| Description | текст | «От 1000 USDT» | 10 из 10 |
| Balance | текст | «0.40004192» | 10 из 10 |
| Info icon | булево | вкл | 10 из 10 |
| Show balance | булево | вкл | 10 из 10 |
| Message | текст | «Недостаточно средств на балансе» | 10 из 10 |
| Show currency | булево | вкл | 10 из 10 |
| Focus ring | булево | выкл | 10 из 10 · служебное |
| Show hit area | булево | выкл | 10 из 10 · служебное |
| Safe margin | булево | выкл | 10 из 10 · служебное |

## 6. Content / slots
- Label — что делает сумма («Пополняю»); Value — число с разделителем тысяч пробелом; Description — лимит («От 1000 USDT»); Balance — доступная сумма; Message — причина ошибки («Недостаточно средств на балансе»).
- Длинный текст: подпись — одна строка ≤ 180, многоточие; Balance, Value и Description не усекаются (см. todo).
- Языки (стенд): de, ar, hi, th, ja, kk — по высоте не обрезаны. RTL: цифры суммы и тикер не зеркалятся.
- Текст 200 %: сумма, описание и Select compact помещаются; подпись усекается; Message в Error не переносится и выходит за рамку (см. todo).

## 7. Events
- `input` / `change` — ввод суммы; `focus` / `blur`.
- `click` по «Макс» — подставляет доступную сумму с учётом комиссии.
- Выбор монеты — события вложенного Select compact.

## 8. Behavior
- Hover: слой 0 → 6 %, `motion/duration/feedback` (120 мс), `motion/easing/standard`. «Уменьшить движение»: длительности ≈ 0.
- Проверка суммы — State=Error: рамка, красное описание, сообщение снизу.
- Хаптик: `haptic/error` при ошибке суммы.
- Зона нажатия ≥ `touch/min`: Web 24, касание 44 (слои `hit area · web` / `hit area · app`, проверка — Show hit area); безопасное поле — `control/safe-margin`.

## 9. Accessibility
- Label связан с полем; описание и ошибка — `aria-describedby`; ошибка различается не только цветом — текстом.
- «Макс» — кнопка с `aria-label` «Подставить максимальную сумму».

## 10. Tokens
- `корень`: заливка / цвет `control/surface/default`, `control/surface/disabled`; интервал `space/16`; мин. ширина `size/field/min`; отступы `space/20`; радиус `radius/control`; обводка `control/border/default`, `control/border/disabled`, `control/border/error`, `control/border/focus`; толщина обводки `border/width/default`, `border/width/focus`.
- `header`: интервал `space/12`.
- `label`: интервал `space/4`.
- `label text`: заливка / цвет `text/disabled`, `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- `balance`: интервал `space/8`.
- `balance value`: заливка / цвет `text/disabled`, `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- `max`: заливка / цвет `text/disabled`, `text/link`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- `input row`: интервал `space/8`.
- `amount`: интервал `space/4`.
- `value`: заливка / цвет `text/disabled`, `text/primary`, `text/tertiary`; типографика `font-weight/bold`, `font/family/display`, `type/heading/lg`.
- `description`: заливка / цвет `text/danger`, `text/disabled`, `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/sm`.
- `currency`: заливка / цвет `action/disabled`, `action/secondary/default`; интервал `space/16`; высота `size/row/compact`; maxw `size/select-compact/max`; отступы `space/8`; радиус `radius/control-sm`.
- `message`: заливка / цвет `text/danger`; типографика `font-weight/medium`, `font/family/text`, `type/label/sm`.
- Служебные слои (общие правила — `service-layers.md`): `focus ring`: радиус `radius/focus-ring`; обводка `border/focus-ring`; толщина обводки `border/width/focus-ring` · `hit area · web`: видимость `touch/is-fine` · `hit area · overlay`: заливка / цвет `status/danger/solid` · `hit area · app`: видимость `touch/is-coarse` · `safe area · outer`: обводка `status/success/solid`; толщина обводки `control/safe-margin` · `state layer`: заливка / цвет `state/layer`; прозрачность `state/hover`; радиус `radius/control-sm`.
- Min / max корня: minWidth 160 size/field/min.
- Значений без переменной: 30 (напр. `(root):w=395`, `hit area · web:w=395`, `hit area · web:h=126`, `hit area · web:h=160`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Набор `Input amount`, вариантов 10 из 10; оси: Filled, State.
- Борда: «Input amount — борда · шаблон v3», разделов 10.
- Описание: 1058 знаков, разделы: Status: Level: Правила: A11y: Когда использовать: Хаптик: Поиск: Legacy:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsInputAmount>`; Flutter: `DsInputAmount`.
- Props: `filled`: boolean; `label`: string или слот; `value`: string или слот; `description`: string или слот; `balance`: string или слот; `infoIcon`: boolean = true; `showBalance`: boolean = true; `message`: string или слот; `showCurrency`: boolean = true.
- Состояния (Default, Focus, Error, Disabled, Hover) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — только реестр: maxWidth текстового слоя числом (label text 180).
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; RTL стенд не проверяет; кода нет — parity props пропущена.

## 15. Migration
- DS Web widget `Input amount` (Info icon, Input message, State Default / Error / Focus, Filled) → Input amount: Info icon, Message, State Default | Focus | Error, Filled; Disabled и Hover — новые; Show balance, Show currency — новые свойства.

Осталось доделать (после пакета правок beta 2026-11-13):
- Balance не усекается: длинный баланс выталкивает «Макс» за край — усечение многоточием, «Макс» не сжимается.
- Value и Description обрезаются без многоточия — задать усечение или правило для суммы, которая не помещается.
- Текст 200 %: Message в Error не переносится и выходит за рамку — включить перенос.
- Ширина корня 395 и `hit area · web` 395 × 126 / 160 — числом.
- На решение: Focus — рамка 1 px, Error — 2 px; Disabled Filled=True неотличим от False; Hover на L1 почти сливается с подложкой.

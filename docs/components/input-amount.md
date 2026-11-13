# Input amount — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Input amount`. Status: draft. Level: molecule.
- Figma: Components, страница «Input amount» (`353:1785`), набор `106:1358`.

## 2. Intent
- Поле суммы (пополнение, вывод, обмен, депозит): подпись + info, баланс и «Макс», сумма крупно (Heading/LG), описание лимитов, выбор монеты (Select compact).
- Когда использовать: суммы вывода/перевода с монетой и Max.
- Когда нет: обычное число — Input.
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `header`, `label`, `label text`, `balance`, `balance value`, `max`, `input row`, `amount`, `value`, `description`, `currency`, `message`.
- Вложено: иконки ×10, `Select compact` ×10, `_Hit area` ×20, `_Safe margin` ×10.
- Служебные слои (вариантов из 10): кольцо фокуса 10 · зона Web 10 · зона касания 10 · безопасное поле 10.

## 4. States
- Ось State: Default · Focus · Error · Disabled · Hover. Группа модели состояний (`docs/components.md`) — определить при переводе в beta.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Filled | False · True | — |
| State | Default · Focus · Error · Disabled · Hover | — |

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
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- label связан с полем, описание и ошибка — aria-describedby; «Макс» — кнопка с aria-label «Подставить максимальную сумму».

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
- `currency`: заливка / цвет `action/secondary/default`; интервал `space/16`; отступы `space/8`; радиус `radius/control-sm`.
- `message`: заливка / цвет `text/danger`; типографика `font-weight/medium`, `font/family/text`, `type/label/sm`.
- Служебные слои (общие правила — `service-layers.md`): `focus ring`: радиус `radius/focus-ring`; обводка `border/focus-ring`; толщина обводки `border/width/focus-ring` · `hit area · web`: видимость `touch/is-fine` · `hit area · overlay`: заливка / цвет `status/danger/solid` · `hit area · app`: видимость `touch/is-coarse` · `safe area · outer`: обводка `status/success/solid`; толщина обводки `control/safe-margin` · `state layer`: заливка / цвет `state/layer`; прозрачность `state/hover`; радиус `radius/control-sm`.
- Min / max корня: minWidth 160 size/field/min.
- Значений без переменной: 30 (напр. `(root):w=395`, `hit area · web:w=395`, `hit area · web:h=126`, `hit area · web:h=160`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Input amount`, вариантов 10 из 10; оси: Filled, State.
- Борда: «Input amount — борда · шаблон v3», разделов 10.
- Описание: 1059 знаков, разделы: Status: Level: Правила: A11y: Когда использовать: Хаптик: Поиск: Legacy:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsInputAmount>`; Flutter: `DsInputAmount`.
- Props: `filled`: boolean; `label`: string или слот; `value`: string или слот; `description`: string или слот; `balance`: string или слот; `infoIcon`: boolean = true; `showBalance`: boolean = true; `message`: string или слот; `showCurrency`: boolean = true.
- Состояния (Default, Focus, Error, Disabled, Hover) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечаний по манифесту нет.

## 15. Migration
- Legacy: Input amount (Info icon, Input message, State Default/Error/Focus, Filled) (DS Web widget Input amount)

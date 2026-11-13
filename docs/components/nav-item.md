# Nav item — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Nav item`. Status: draft. Level: molecule.
- Figma: Components, страница «Nav item» (`1012:23`), набор `65:82`.

## 2. Intent
- Пункт навигации сайдбара (Large+). Collapsed=On — свёрнутый сайдбар (только иконка, подпись в Tooltip справа).
- Когда использовать: пункт основной навигации в сайдбаре (Web).
- Когда нет: переключение внутри страницы — Tabs; в App и на Compact — Tab bar item.
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `label`, `counter`, `accent glow`.
- Вложено: иконки ×8, `Counter` ×8.
- Служебные слои (вариантов из 8): кольцо фокуса 8 · зона Web 8 · зона касания 8 · безопасное поле 8.

## 4. States
- Ось State: Default · Hover · Selected · Pressed. Группа модели состояний (`docs/components.md`) — определить при переводе в beta.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Collapsed | Off · On | — |
| State | Default · Hover · Selected · Pressed | — |

Матрица полная: 8 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Label | текст | «Дашборд» | 8 из 8 |
| Icon · swap | замена экземпляра | `icon/dots-grid` | 8 из 8 |
| Counter | булево | выкл | 8 из 8 |
| Focus ring | булево | выкл | 8 из 8 · служебное |
| Show hit area | булево | выкл | 8 из 8 · служебное |
| Safe margin | булево | выкл | 8 из 8 · служебное |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- nav > a, текущий — aria-current="page"; в свёрнутом виде aria-label = подпись.

## 10. Tokens
- `корень`: заливка / цвет `accent/subtle`; интервал `space/8`; отступы `space/6`; радиус `radius/control`.
- `label`: заливка / цвет `text/primary`, `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`.
- `counter`: заливка / цвет `status/danger/solid`; высота `size/counter-height/sm`; maxw `size/counter/max`; мин. ширина `size/counter-height/sm`; отступы `space/2xs`; радиус `radius/full`.
- `accent glow`: эффект `light/accent/blur`; заливка / цвет `light/accent/color`; видимость `decor/light`.
- Служебные слои (общие правила — `service-layers.md`): `focus ring`: радиус `radius/focus-ring`; обводка `border/focus-ring`; толщина обводки `border/width/focus-ring` · `hit area · web`: видимость `touch/is-fine` · `hit area · overlay`: заливка / цвет `status/danger/solid` · `hit area · app`: видимость `touch/is-coarse` · `safe area · outer`: обводка `status/success/solid`; толщина обводки `control/safe-margin` · `state layer`: заливка / цвет `state/layer`; прозрачность `state/hover`, `state/pressed`; радиус `radius/control`.
- Значений без переменной: 32 (напр. `(root):w=218`, `(root):h=36`, `hit area · web:w=218`, `hit area · web:h=36`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Nav item`, вариантов 8 из 8; оси: Collapsed, State.
- Борда: «Nav item — борда · шаблон v3», разделов 11.
- Описание: 1322 знаков, разделы: Status: Level: Правила: A11y: Когда использовать: Expressive: Поиск: Legacy: Expressive (привязано):

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsNavItem>`; Flutter: `DsNavItem`.
- Props: `collapsed`: boolean; `label`: string или слот; `counter`: boolean = false.
- Состояния (Default, Hover, Selected, Pressed) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - AXES: `Collapsed` — булева ось (Off | On)
  - RAW: 32 (напр. `(root):w=218`, `(root):h=36`)
  - BOARD: нет разделов 07, 08

## 15. Migration
- Legacy: Navbar в sidebar / default (DS Web)

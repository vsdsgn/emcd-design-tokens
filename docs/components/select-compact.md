# Select compact — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Select compact`. Status: draft. Level: molecule.
- Figma: Components, страница «Select» (`353:6`), набор `75:1449`.

## 2. Intent
- Компактный селектор без лейбла — выбор монеты, сети, валюты внутри строки, карточки, шапки виджета («USDT ▾»). По нажатию — Menu (Compact — Sheet).
- Когда использовать: значение выбирается «на месте», рядом с суммой или заголовком.
- Когда нет: поле формы с лейблом и ошибкой — Select.
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `value`, `text`.
- Вложено: `smbl-bitcoin-btc` ×5, иконки ×5, `_Hit area` ×10, `_Safe margin` ×5.
- Служебные слои (вариантов из 5): кольцо фокуса 5 · зона Web 5 · зона касания 5 · безопасное поле 5.

## 4. States
- Ось State: Default · Hover · Open · Disabled · Pressed. Группа модели состояний (`docs/components.md`) — определить при переводе в beta.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| State | Default · Hover · Open · Disabled · Pressed | — |

Матрица полная: 5 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Text | текст | «USDT» | 5 из 5 |
| Show leading | булево | вкл | 5 из 5 |
| Leading | SLOT | `undefined` | 5 из 5 |
| Focus ring | булево | выкл | 5 из 5 · служебное |
| Show hit area | булево | выкл | 5 из 5 · служебное |
| Safe margin | булево | выкл | 5 из 5 · служебное |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- button с aria-haspopup=listbox, aria-expanded; доступное имя — «Монета: USDT».

## 10. Tokens
- `корень`: заливка / цвет `action/disabled`, `action/secondary/default`, `action/secondary/pressed`; интервал `space/16`; высота `size/row/compact`; maxw `size/select-compact/max`; отступы `space/8`; радиус `radius/control-sm`.
- `value`: интервал `space/6`.
- `text`: заливка / цвет `text/disabled`, `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- Служебные слои (общие правила — `service-layers.md`): `focus ring`: радиус `radius/focus-ring-sm`; обводка `border/focus-ring`; толщина обводки `border/width/focus-ring` · `hit area · web`: видимость `touch/is-fine` · `hit area · overlay`: заливка / цвет `status/danger/solid` · `hit area · app`: видимость `touch/is-coarse` · `safe area · outer`: обводка `status/success/solid`; толщина обводки `control/safe-margin` · `state layer`: заливка / цвет `state/layer`; прозрачность `state/hover`, `state/pressed`; радиус `radius/control-sm`.
- Min / max корня: maxWidth 200 size/select-compact/max.
- Значений без переменной: 10 (напр. `hit area · web:w=114`, `hit area · web:h=36`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Select compact`, вариантов 5 из 5; оси: State.
- Борда: «Select — борда · шаблон v3», разделов 11.
- Описание: 1006 знаков, разделы: Status: Level: Когда использовать: A11y: Поиск: Legacy: Правила:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsSelectCompact>`; Flutter: `DsSelectCompact`.
- Props: `text`: string или слот; `showLeading`: boolean = true; `leading`: string или слот.
- Состояния (Default, Hover, Open, Disabled, Pressed) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечаний по манифесту нет.

## 15. Migration
- Legacy: Selector small (Type=Default/Inactive) (DS Web)

# Accordion — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Accordion`. Status: draft. Level: molecule.
- Figma: Components, страница «Accordion» (`367:105`), набор `107:1266`.

## 2. Intent
- Аккордеон: вопрос/раздел, раскрывающийся по клику (FAQ, условия, детали расчёта). Контент — слот.
- Когда использовать: вторичная информация, FAQ, длинные настройки.
- Когда нет: основное содержимое экрана; один пункт — обычный блок.
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `header`, `label`, `chevron`, `Content`, `text`, `divider`, `skeleton`.
- Вложено: иконки ×16.
- Служебные слои (вариантов из 20): кольцо фокуса 20 · зона Web 20 · зона касания 20 · безопасное поле 20.

## 4. States
- Ось State: Default · Hover · Skeleton · Disabled · Pressed. Группа модели состояний (`docs/components.md`) — определить при переводе в beta.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | L · M | — |
| Open | Off · On | — |
| State | Default · Hover · Skeleton · Disabled · Pressed | — |

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
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- заголовок — button aria-expanded + aria-controls; Enter/Space — раскрыть.

## 10. Tokens
- `header`: интервал `space/4`; отступы `space/12`, `space/20`; радиус `radius/inner`.
- `label`: заливка / цвет `text/disabled`, `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`, `type/label/md`.
- `chevron`: заливка / цвет `action/secondary/default`; радиус `radius/chip`.
- `Content`: интервал `space/8`; отступы `space/12`, `space/20`.
- `text`: заливка / цвет `text/disabled`, `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/md`, `type/body/sm`.
- `divider`: заливка / цвет `border/subtle`.
- `skeleton`: заливка / цвет `skeleton/base`; радиус `radius/chip`.
- Служебные слои (общие правила — `service-layers.md`): `focus ring`: радиус `radius/2xs`; обводка `border/focus-ring`; толщина обводки `border/width/focus-ring` · `hit area · web`: видимость `touch/is-fine` · `hit area · overlay`: заливка / цвет `status/danger/solid` · `hit area · app`: видимость `touch/is-coarse` · `safe area · outer`: обводка `status/success/solid`; толщина обводки `control/safe-margin` · `state layer`: заливка / цвет `state/layer`; прозрачность `state/hover`, `state/pressed`; радиус `radius/inner`.
- Значений без переменной: 60 (напр. `(root):w=400`, `hit area · web:w=400`, `hit area · web:h=65`, `hit area · web:h=53`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Accordion`, вариантов 20 из 20; оси: Size, Open, State.
- Борда: «Accordion — борда · шаблон v3», разделов 12.
- Описание: 1327 знаков, разделы: Status: Level: Аккордеон: Движение: A11y: Когда использовать: Motion: Поиск: Legacy: Правила:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsAccordion>`; Flutter: `DsAccordion`.
- Props: `size`: l | m; `open`: boolean; `label`: string или слот; `divider`: boolean = true; `content`: string или слот.
- Состояния (Default, Hover, Skeleton, Disabled, Pressed) — не props: Hover / Pressed / Focus из платформы; `disabled`, `skeleton` — props.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечаний по манифесту нет.

## 15. Migration
- Legacy: baseAccordion --1.5 (mobile adaptive, open, state) (DS Web)

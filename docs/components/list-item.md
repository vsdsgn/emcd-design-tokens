# List item — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `List item`. Status: draft. Level: molecule.
- Figma: Components, страница «List item» (`367:6`), набор `82:891`.

## 2. Intent
- Строка списка: монета, кошелёк, воркер, транзакция, настройка.
- Когда использовать: строки списков на Compact, перечни монет, воркеров, операций.
- Когда нет: сравнение по многим колонкам на Web — Table.
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `title`, `description`, `1 250.00`, `≈ 1 250 $`, `divider`, `value row`, `subvalue`.
- Вложено: `smbl-bitcoin-btc` ×64.
- Служебные слои (вариантов из 64): кольцо фокуса 64 · зона Web 64 · зона касания 64 · безопасное поле 64.

## 4. States
- Ось State: Default · Hover · Pressed · Disabled. Группа модели состояний (`docs/components.md`) — определить при переводе в beta.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | L · M | — |
| Style | Plain · Card | — |
| Content | Text first · Description first · Big value · Description only | — |
| State | Default · Hover · Pressed · Disabled | — |

Матрица полная: 64 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Title | текст | «USDC» | 48 из 64 |
| Description | текст | «USD Coin» | 64 из 64 |
| Subvalue | текст | «USDT» | 16 из 64 |
| Show leading | булево | вкл | 64 из 64 |
| Show trailing | булево | вкл | 64 из 64 |
| Divider | булево | вкл | 32 из 64 |
| Leading | SLOT | `undefined` | 64 из 64 |
| Trailing | SLOT | `undefined` | 64 из 64 |
| Focus ring | булево | выкл | 64 из 64 · служебное |
| Show hit area | булево | выкл | 64 из 64 · служебное |
| Safe margin | булево | выкл | 64 из 64 · служебное |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- интерактивная строка — одна цель нажатия с полным именем; вложенные контролы — отдельные цели.

## 10. Tokens
- `корень`: заливка / цвет `surface/raised`; интервал `space/12`; отступы `control/padding-x/lg`, `space/12`, `space/16`; радиус `radius/control`.
- `title`: заливка / цвет `text/disabled`, `text/primary`; типографика `font-weight/bold`, `font-weight/medium`, `font/family/display`, `font/family/text`, `type/heading/lg`, `type/heading/xl`, `type/label/lg`, `type/label/md`.
- `description`: заливка / цвет `text/disabled`, `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`, `type/label/md`, `type/label/sm`.
- `1 250.00`: заливка / цвет `text/disabled`, `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`, `type/label/md`.
- `≈ 1 250 $`: заливка / цвет `text/disabled`, `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`, `type/label/sm`.
- `divider`: заливка / цвет `border/subtle`.
- `value row`: интервал `space/4`.
- `subvalue`: заливка / цвет `text/disabled`, `text/tertiary`; типографика `font-weight/bold`, `font/family/display`, `type/heading/lg`, `type/heading/xl`.
- Служебные слои (общие правила — `service-layers.md`): `focus ring`: радиус `radius/2xs`, `radius/focus-ring`; обводка `border/focus-ring`; толщина обводки `border/width/focus-ring` · `hit area · web`: видимость `touch/is-fine` · `hit area · overlay`: заливка / цвет `status/danger/solid` · `hit area · app`: видимость `touch/is-coarse` · `safe area · outer`: обводка `status/success/solid`; толщина обводки `control/safe-margin` · `state layer`: заливка / цвет `state/layer`; прозрачность `state/hover`, `state/pressed`; радиус `radius/control`.
- Значений без переменной: 192 (напр. `(root):w=375`, `hit area · web:w=375`, `hit area · web:h=76`, `hit area · web:h=84`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `List item`, вариантов 64 из 64; оси: Size, Style, Content, State.
- Борда: «List item — борда · шаблон v3», разделов 11.
- Описание: 1212 знаков, разделы: Status: Level: Строка списка: Size: Суммы — A11y: Когда использовать: Поиск: Legacy:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsListItem>`; Flutter: `DsListItem`.
- Props: `size`: l | m; `style`: plain | card; `content`: text-first | description-first | big-value | description-only; `title`: string или слот; `description`: string или слот; `subvalue`: string или слот; `showLeading`: boolean = true; `showTrailing`: boolean = true; `divider`: boolean = true; `leading`: string или слот; `trailing`: string или слот.
- Состояния (Default, Hover, Pressed, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - DESC: нет: Правила:
  - PROPS: Title 48 из 64; Subvalue 16 из 64; Divider 32 из 64
  - RAW: 192 (напр. `(root):w=375`, `hit area · web:w=375`)
  - BOARD: нет разделов 07, 08

## 15. Migration
- Legacy: List (Card, Desktop), Left, Content, Right (DS Web ?List)

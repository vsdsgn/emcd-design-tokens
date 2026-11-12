# Stat card — контракт · draft (2026-11-12)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Stat card`. Status: draft. Level: molecule.
- Figma: Components, страница «Stat card» (`367:1131`), набор `60:57`.

## 2. Intent
- Stat card: один показатель с подписью — хешрейт, баланс, начислено за 24 ч, активные воркеры. Основа дашборда.
- Когда использовать: одно ключевое число с подписью и динамикой (хешрейт, доход).
- Когда нет: несколько чисел для сравнения — Table / List.
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `ambient light`, `label row`, `label`, `value row`, `value`, `unit`, `delta row`, `Badge`, `delta caption`, `Skeleton`.
- Вложено: иконки ×1, `Badge` ×1, `Skeleton` ×3.
- Служебные слои (вариантов из 2): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Ось State: Default · Skeleton. Группа модели состояний (`docs/components.md`) — определить при переводе в beta.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| State | Default · Skeleton | — |

Матрица полная: 2 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Label | текст | «Хешрейт · 24 ч» | 1 из 2 |
| Value | текст | «124.5» | 1 из 2 |
| Unit | текст | «TH/s» | 1 из 2 |
| Info | булево | вкл | 1 из 2 |
| Delta | булево | вкл | 1 из 2 |
| Delta caption | текст | «к вчера» | 1 из 2 |
| Show footer | булево | выкл | 1 из 2 |
| Footer | SLOT | `undefined` | 1 из 2 |
| Ambient light | булево | выкл | 2 из 2 |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- карточка — группа с именем Label; дельта читается словами («рост на 2,4% к вчера»).

## 10. Tokens
- `корень`: заливка / цвет `surface/level-1`; интервал `space/8`; отступы `card/padding`; радиус `radius/container`; обводка `border/subtle`; толщина обводки `border/width/default`.
- `ambient light`: эффект `light/ambient/blur`; заливка / цвет `light/ambient/color`.
- `label row`: интервал `space/4`.
- `label`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/sm`.
- `value row`: интервал `space/6`.
- `value`: заливка / цвет `text/primary`; типографика `font-weight/bold`, `font/family/display`, `type/heading/xl`.
- `unit`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/md`.
- `delta row`: интервал `space/6`.
- `Badge`: заливка / цвет `status/success/subtle`; интервал `space/4`; высота `size/badge-height/sm`; отступы `space/xs`; радиус `radius/sm`.
- `delta caption`: заливка / цвет `text/tertiary`; типографика `font-weight/regular`, `font/family/text`, `type/body/sm`.
- `Skeleton`: заливка / цвет `skeleton/base`; радиус `radius/inner`.
- Min / max корня: minWidth 280 числом.
- Значений без переменной: 2 (напр. `(root):w=280`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Stat card`, вариантов 2 из 2; оси: State.
- Борда: «Stat card — борда · шаблон v3», разделов 10.
- Описание: 1239 знаков, разделы: Status: Level: Stat card: Правила: A11y: Когда использовать: Expressive: Поиск: Legacy: Motion: Expressive (привязано):

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsStatCard>`; Flutter: `DsStatCard`.
- Props: `label`: string или слот; `value`: string или слот; `unit`: string или слот; `info`: boolean = true; `delta`: boolean = true; `deltaCaption`: string или слот; `showFooter`: boolean = false; `footer`: string или слот; `ambientLight`: boolean = false.
- Состояния (Default, Skeleton) — не props: Hover / Pressed / Focus из платформы; `disabled`, `skeleton` — props.

## 14. Acceptance (2026-11-12)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - PROPS: Label 1 из 2; Value 1 из 2; Unit 1 из 2; Info 1 из 2; Delta 1 из 2; Delta caption 1 из 2; Show footer 1 из 2; Footer 1 из 2
  - MINMAX: minw=280
  - RAW: 2 (напр. `(root):w=280`)
  - BOARD: нет разделов 05, 07, 08

## 15. Migration
- Legacy: карточки дашборда Mining (Web App / App)

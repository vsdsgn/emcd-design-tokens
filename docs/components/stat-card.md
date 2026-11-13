# Stat card — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Stat card`. Status: beta. Level: unknown.
- Figma: Components, страница «Stat card» (`367:1131`), набор `60:57`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Один показатель с подписью: хешрейт, баланс, начислено за 24 ч, активные воркеры. Основа дашборда.
- Когда использовать: одно ключевое число с подписью и динамикой (хешрейт, доход).
- Когда нет: несколько чисел для сравнения — Table / List.
- Правило выбора варианта:
  - State: Default — данные есть; Skeleton — данные грузятся дольше 1 с.
  - Label — что и за какой период; Value — крупное число (Heading/XL); Unit — отдельным текстом рядом с числом.
  - Delta: On — есть сравнение с прошлым периодом: Badge S (Success — рост, Danger — падение, Neutral — без изменений) + Delta caption («к вчера»); Off — сравнения нет.
  - Info: On — у метрики есть определение (тултип).
  - Show footer: On — в слот Footer ставится спарклайн / мини-график или ссылка; по умолчанию Off.
  - Ambient light: On — только у одной герой-карточки на экран (Expressive); в Base пятно прозрачное.
  - В ряду карточки одной высоты.
- Не делаем: несколько чисел в одной карточке; анимация счётчика; больше одной карточки с Ambient light на экран.

## 3. Anatomy
- Корень: `surface/level-1`, обводка `border/subtle` (`border/width/default`), `radius/container`, отступ `card/padding`, зазор `space/8`, min-width `size/card/min`.
- `label row` (зазор `space/4`): `label` (`type/body/sm`, `text/secondary`) + иконка Info.
- `value row` (зазор `space/6`): `value` (`type/heading/xl`, `font-weight/bold`, `font/family/display`, `text/primary`; по содержимому, max-width 180) + `unit` (`type/body/md`, `text/secondary`; max-width 64) — единица сразу за числом.
- `delta row` (зазор `space/6`, max-width 248): Badge S + `delta caption` (`type/body/sm`, `text/tertiary`; max-width 160).
- Слот `Footer`; `ambient light` — `light/ambient/color` + `light/ambient/blur`.
- Skeleton — три вложенных Skeleton (`skeleton/base`, `radius/inner`) в строках высотой строки текста.
- Вложено: иконки ×1, `Badge` ×1, `Skeleton` ×3.
- Служебные слои (вариантов из 2): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент; Skeleton — загрузка.
- Default — подпись, число, единица, дельта.
- Skeleton — три полосы на месте подписи, числа и дельты; высота как у Default (118), без прыжка при загрузке.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| State | Default · Skeleton | Default |

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

- Label, Value, Unit, Info, Delta, Delta caption, Show footer, Footer привязаны только к Default; Ambient light — к обоим вариантам.

## 6. Content / slots
- Длинный текст: Label — до 2 строк, дальше многоточие; Value — одна строка ≤ 180, Unit — ≤ 64, обе с многоточием, единица стоит рядом с числом; Delta caption — одна строка ≤ 160 с многоточием.
- Языки (стенд): de, ar, hi, th, ja, kk — по высоте не обрезано.
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет. Числа, знак дельты и единицы не зеркалятся.
- Текст 200 %: карточка растёт по высоте, обрезки нет; число — в одну строку; иконка Info размер не меняет.

## 7. Events
- Нет у карточки. Info — открывает тултип с определением метрики; ссылка в Footer — свой `click`.

## 8. Behavior
- Смена числа — без анимации счётчика (точность важнее).
- Skeleton → Default — fade 200 мс; Skeleton показывается, если данные грузятся дольше 1 с.

## 9. Accessibility
- Карточка — группа с именем Label.
- Дельта читается словами: «рост на 2,4 % к вчера».

## 10. Tokens
- `корень`: заливка / цвет `surface/level-1`; интервал `space/8`; мин. ширина `size/card/min`; отступы `card/padding`; радиус `radius/container`; обводка `border/subtle`; толщина обводки `border/width/default`.
- `ambient light`: эффект `light/ambient/blur`; заливка / цвет `light/ambient/color`.
- `label row`: интервал `space/4`.
- `label`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/sm`.
- `value row`: интервал `space/6`.
- `value`: заливка / цвет `text/primary`; типографика `font-weight/bold`, `font/family/display`, `type/heading/xl`.
- `unit`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/md`.
- `delta row`: интервал `space/6`.
- `Badge`: заливка / цвет `status/success/subtle`; интервал `space/4`; высота `size/badge-height/sm`; maxw `size/badge/max`; отступы `space/xs`; радиус `radius/sm`.
- `delta caption`: заливка / цвет `text/tertiary`; типографика `font-weight/regular`, `font/family/text`, `type/body/sm`.
- `Skeleton`: заливка / цвет `skeleton/base`; радиус `radius/inner`.
- Min / max корня: minWidth 280 size/card/min.
- Значений без переменной: 2 (напр. `(root):w=280`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Набор `Stat card`, вариантов 2 из 2; оси: State.
- Борда: «Stat card — борда · шаблон v3», разделов 10.
- Описание: 1356 знаков, разделы: Status: Level: Stat card: Правила: Длинный текст: A11y: Когда использовать: Expressive: Поиск: Legacy: Motion: Expressive (привязано):

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsStatCard>`; Flutter: `DsStatCard`.
- Props: `label`: string или слот; `value`: string или слот; `unit`: string или слот; `info`: boolean = true; `delta`: boolean = true; `deltaCaption`: string или слот; `showFooter`: boolean = false; `footer`: string или слот; `ambientLight`: boolean = false.
- Состояния (Default, Skeleton) — не props: Hover / Pressed / Focus из платформы; `disabled`, `skeleton` — props.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — только реестр: maxWidth текстового слоя числом (value 180, unit 64, delta caption 160) и maxWidth 248 у delta row.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; RTL стенд не проверяет; Ambient light в Base не виден — проверять в Expressive; кода нет — parity props пропущена.

## 15. Migration
- Карточки дашборда Mining (Web App / App) → Stat card (Label, Value, Unit, Delta, Footer).

Осталось доделать (после пакета правок beta 2026-11-13):
- На решение: Light · L1 / Dark · L1 — заливка `surface/level-1` совпадает с подложкой, карточку держит только обводка.
- Ширина корня 280 числом (min-width — `size/card/min`).

# Stat card — контракт (2026-11-19)

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
  - Align (19.11): Start — по умолчанию (дашборд-сводки, ряд метрик); Center — плитки-счётчики статусов воркеров (Web и мобильный дашборд, как в продукте): подпись, число и дельта по центру
  - Link (18.11): Icon button XS со стрелкой в правом нижнем углу — плитка ведёт в список (статусы воркеров); Danger — Secondary Danger, остальные — Tertiary
  - State: Default — данные есть; Skeleton — данные грузятся дольше 1 с.
  - Label — что и за какой период; Value — крупное число (Heading/XL); Unit — отдельным текстом рядом с числом.
  - Delta: On — есть сравнение с прошлым периодом: Badge S (Success — рост, Danger — падение, Neutral — без изменений) + Delta caption («к вчера»); Off — сравнения нет.
  - Info: On — у метрики есть определение (тултип).
  - Show footer: On — в слот Footer ставится спарклайн / мини-график или ссылка; по умолчанию Off.
  - Ambient light: On — только у одной герой-карточки на экран (Expressive); в Base пятно прозрачное.
  - В ряду карточки одной высоты.
  - Tone (17.11): Neutral — по умолчанию; Danger / Warning / Success — плитки статусной сводки (Отключённые / Нестабильные / Активные): подложка `status/*/subtle`, значение `text/*`. Не для украшения.
- Не делаем: несколько чисел в одной карточке; анимация счётчика; больше одной карточки с Ambient light на экран.

## 3. Anatomy
- Корень: Tone=Neutral — `surface/next` (на уровень выше подложки, 15.11), обводка `border/subtle` (`border/width/default`); Danger / Warning / Success — `status/*/subtle` без обводки, значение `text/*`; `radius/container`, отступ `card/padding`, зазор `space/8` (min-width снят 17.11: плитки статусов дашборда 160 в колонке).
- `label row` (зазор `space/4`): `label` (`type/body/sm`, `text/secondary`) + иконка Info.
- `value row` (зазор `space/6`): `value` (`type/heading/xl`, `font-weight/bold`, `font/family/display`, `text/primary`; по содержимому, max-width 180) + `unit` (`type/body/md`, `text/secondary`; max-width 64) — единица сразу за числом.
- `delta row` (зазор `space/6`, max-width 248): Badge S + `delta caption` (`type/body/sm`, `text/tertiary`; max-width 160).
- Слот `Footer`; `ambient light` — `light/ambient/color` + `light/ambient/blur`.
- Skeleton — три вложенных Skeleton (`skeleton/base`, `radius/inner`) в строках высотой строки текста.
- Вложено: иконки ×8, `Badge` ×8, `Icon button` ×8, `Skeleton` ×6.
- Служебные слои (вариантов из 10): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент; Skeleton — загрузка.
- Default — подпись, число, единица, дельта.
- Skeleton — три полосы на месте подписи, числа и дельты; высота как у Default (118), без прыжка при загрузке.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| State | Default · Skeleton | Default |
| Tone | Neutral · Danger · Warning · Success | — |
| Align | Start · Center | — |

Матрица: 10 из 16.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Label | текст | «Хешрейт · 24 ч» | 8 из 10 |
| Value | текст | «124.5» | 8 из 10 |
| Unit | текст | «TH/s» | 8 из 10 |
| Info | булево | вкл | 8 из 10 |
| Delta | булево | вкл | 8 из 10 |
| Delta caption | текст | «к вчера» | 8 из 10 |
| Show footer | булево | выкл | 8 из 10 |
| Footer | слот | — | 8 из 10 |
| Ambient light | булево | выкл | 10 из 10 |
| Link | булево | выкл | 8 из 10 |

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
- `корень`: заливка / цвет `status/danger/subtle`, `status/success/subtle`, `status/warning/subtle`, `surface/next`; интервал `space/8`; отступы `card/padding`; радиус `radius/container`; обводка `border/subtle`; толщина обводки `border/width/default`.
- `ambient light`: эффект `light/ambient/blur`; заливка / цвет `light/ambient/color`.
- `label row`: интервал `space/4`.
- `label`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/sm`.
- `value row`: интервал `space/6`.
- `value`: заливка / цвет `text/danger`, `text/primary`, `text/success`, `text/warning`; типографика `font-weight/bold`, `font/family/display`, `type/heading/xl`.
- `unit`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/md`.
- `delta row`: интервал `space/6`.
- `Badge`: заливка / цвет `status/success/subtle`; интервал `space/4`; высота `size/badge-height/sm`; maxw `size/badge/max`; отступы `space/xs`; радиус `radius/sm`.
- `delta caption`: заливка / цвет `text/tertiary`; типографика `font-weight/regular`, `font/family/text`, `type/body/sm`.
- `link`: заливка / цвет `action/danger-subtle/default`, `action/secondary/default`; интервал `space/6`; высота `control/height/xs`; радиус `radius/control-sm`; ширина `control/height/xs`.
- `Skeleton`: заливка / цвет `skeleton/base`; радиус `radius/inner`.
- Значений без переменной: 10 (напр. `(root):w=280`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Набор `Stat card`, вариантов 10 из 16; оси: State, Tone, Align.
- Борда: «Stat card — борда · шаблон v3», разделов 11.
- Описание: 1734 знаков, разделы: Status: Level: Stat card: Правила: Длинный текст: A11y: Когда использовать: Expressive: Поиск: Legacy: Motion: Expressive (привязано):

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsStatCard>`; Flutter: `DsStatCard`.
- Props: `tone`: neutral | danger | warning | success; `align`: start | center; `label`: string или слот; `value`: string или слот; `unit`: string или слот; `info`: boolean = true; `delta`: boolean = true; `deltaCaption`: string или слот; `showFooter`: boolean = false; `footer`: string или слот; `ambientLight`: boolean = false; `link`: boolean = false.
- Состояния (Default, Skeleton) — не props: Hover / Pressed / Focus из платформы; `disabled`, `skeleton` — props.

## 14. Acceptance (2026-11-19)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — только реестр: maxWidth текстового слоя числом (value 180, unit 64, delta caption 160) и maxWidth 248 у delta row.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; RTL стенд не проверяет; Ambient light в Base не виден — проверять в Expressive; кода нет — parity props пропущена.

## 15. Migration
- DS Web `stat card` (widget Graph) → Stat card (Label, Value, Unit, Delta, Footer); DS App — нет. Опора — карточки дашборда Mining (Web App / App). Нужен скрин прода.

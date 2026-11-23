# Chart metric — контракт (2026-11-23)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Chart metric`. Status: beta. Level: unknown.
- Figma: Components, страница «Chart metric» (`1012:19`), набор `101:1011`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Показатель над графиком: подпись и крупное значение, при необходимости иконка слева от значения.
- Когда использовать: ключевое значение над графиком (текущий хешрейт, прибыль).
- Когда нет: список показателей — Key-value row; карточка с динамикой — Stat card.
- Правило выбора варианта:
  - State (19.11): Default | Skeleton — подпись остаётся, значение — плашка той же высоты; в загрузке Tone=Default
  - Подпись и единица — `text/tertiary` (18.11, Стефан: вторичное тише, как в продукте); значение — `text/primary`
  - Tone отражает смысл значения, а не оценку: Default — значение в норме; Danger — вне нормы, критично («Отключен»); Warning — вне нормы, требует внимания (реджекты выше нормы); Success — подтверждённо хорошее значение.
  - Icon: Off — по умолчанию; On — иконка слева от значения (Icon · swap — иконка из `icon/*`), цвет — как у значения по Tone (`text/primary`, `text/danger`, `text/warning`, `text/success`; 2026-11-16).
  - Value — число до 228 по ширине, длиннее — формат K / M / T; единицы отделяются тонким пробелом.
  - Unit (16.11): единица отдельным текстом `text/secondary` того же кегля, по базовой линии (TH/s, %); Show unit = Off — единица уже в значении или не нужна. Ряд показателей в карточке — Chart metric через Divider Vertical (сводка «Воркеры»).
- Не делаем: длинное число без формата K / M / T; цвет как единственный носитель тона.

## 3. Anatomy
- Корень — вертикальный стек (`space/4`), max-width `size/chart-metric/max`: `label` (`text/secondary`, `type/body/sm`) и `value row`.
- `value row` (`space/4`): `icon` (`icon/size/md`, свойства Icon и Icon · swap) + `value` (`font/family/display`, `type/heading/lg` — 24 на Web, 16.11 по продукту; было `type/heading/md`, `font-weight/bold`; цвет по Tone: `text/primary` / `text/danger` / `text/warning` / `text/success`).
- Вложено: иконки ×5, `Skeleton` ×1.
- Служебные слои (вариантов из 5): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент.
- Своих состояний нет. Tone — не состояние, а смысл значения. Загрузка — Skeleton у родителя.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Tone | Default · Danger · Warning · Success | Default |
| State | Default · Skeleton | — |

Матрица: 5 из 8.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Label | текст | «Текущий хешрейт» | 5 из 5 |
| Value | текст | «89.94» | 5 из 5 |
| Icon | булево | выкл | 5 из 5 |
| Icon · swap | замена экземпляра | `icon/lightning` | 5 из 5 |
| Unit | текст | «TH/s» | 5 из 5 |
| Show unit | булево | выкл | 5 из 5 |

## 6. Content / slots
- Label — короткое название показателя: одна строка, max-width 228, усечение многоточием; полный текст — в `title` / тултипе.
- Value — число с единицей, max-width 228; длиннее — продукт сокращает до K / M / T до передачи (многоточие в макете — только защита). Число — в формате локали.
- Языки (de, ar, hi, th, ja, kk): по высоте не обрезаются; длинное усекается по тем же правилам.
- RTL: число и единица не зеркалятся, блок выравнивается по началу строки, иконка — со стороны начала.
- Текст 200 %: блок растёт вместе с кеглем, обрезки и наложений нет.

## 7. Events
- Нет.

## 8. Behavior
- Статичен.

## 9. Accessibility
- Подпись и значение — один блок: `role="group"`, `aria-label` «Текущий хешрейт: 89,94 TH/s».
- Цвет не единственный носитель тона — рядом иконка или знак.

## 10. Tokens
- `корень`: интервал `space/4`; maxw `size/chart-metric/max`.
- `label`: заливка / цвет `text/tertiary`; типографика `font-weight/medium`, `font/family/text`, `type/body/sm`.
- `value row`: интервал `space/4`.
- `icon`: высота `icon/size/md`; ширина `icon/size/md`.
- `value`: заливка / цвет `text/danger`, `text/primary`, `text/success`, `text/warning`; типографика `font-weight/bold`, `font/family/display`, `type/heading/lg`.
- `unit`: заливка / цвет `text/tertiary`; типографика `font-weight/bold`, `font/family/display`, `type/heading/lg`.
- `skeleton · value`: заливка / цвет `skeleton/base`; радиус `radius/container`.
- Min / max корня: maxWidth 240 size/chart-metric/max.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Набор `Chart metric`, вариантов 5 из 8; оси: Tone, State.
- Борда: «Chart metric — борда · шаблон v3», разделов 11.
- Описание: 1114 знаков, разделы: Status: Level: Показатель: Когда использовать: Правила: A11y: Подпись и единица —

## 13. Code projection
Код в репо: React `packages/react/src/index.js` (`ChartMetric`), Vue `packages/vue/src/DsChartMetric.vue`, CSS `claude-ds/components/ChartMetric/style.css`; проверка — `npm run test:code`. Прод (DSP / ui-emcd-web, Flutter) — сверка через `scripts/parity.mjs`, когда появится манифест кода.

- Vue: `<DsChartMetric>`; Flutter: `DsChartMetric`.
- Props: `tone`: default | danger | warning | success; `label`: string или слот; `value`: string или слот; `icon`: boolean = false; `unit`: string или слот; `showUnit`: boolean = false.
- Состояния (Default, Skeleton) — не props: Hover / Pressed / Focus из платформы; `disabled`, `skeleton` — props.

## 14. Acceptance (2026-11-23)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — только реестр: maxWidth текстового слоя числом (label 228, value 228).
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props с кодом продукта — по манифесту кода, когда он будет; код в репо проверяет `npm run test:code`.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; RTL стенд не проверяет; кода нет — parity props пропущена.

## 15. Migration
- Песочница графиков: «Текущий хешрейт / Хешрейт за 1 день / Реджекты» (mining, WL), «Средняя температура / Плата N» (monitoring) → Label + Value; значение вне нормы → Tone Danger | Warning.

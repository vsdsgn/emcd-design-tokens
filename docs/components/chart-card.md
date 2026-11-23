# Chart card — контракт (2026-11-23)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Chart card`. Status: beta. Level: unknown.
- Figma: Components, страница «Chart card» (`367:45869`), компонент `99:802`. Платформы: Web, Mobile web, iOS, Android.
- Organism, один вариант без осей; слоты Top, Content, Bottom. Вложены Tabs, Chart plot и Legend item (3).

## 2. Intent
- Виджет графика: показатель + график + легенда. Сверху подпись, значение и итог с мини-табами, в центре Chart plot с подписями оси, снизу легенда и итог за период.
- Когда использовать: график с заголовком, периодом и метрикой.
- Когда нет: одно число без графика — Stat card; таблица данных — Table; несколько графиков в одной карточке.
- Правило выбора варианта:
  - Одна карточка — один график; форма графика — свойство Type вложенного Chart plot (оси Type у карточки нет, решение 2026-11-15).
  - Порядок (19.11, по продукту Web App и App): метрики и период сверху (Top), легенда — над графиком в конце Top (единицы в подписях: «Хешрейт, TH/s»), график по центру (Content); Bottom — итог за период, если нужен.
  - Show bottom: On — по умолчанию, легенда и итог за период; Off — серия одна и итог не нужен.
  - Мини-табы в Top — Tabs S; подписи оси — текстовым стилем в слоте Content.
  - Ширина — по колонке, минимум 280.
  - Skeleton и Empty — состояния вложенного Chart plot, у карточки своих нет.
- Не делаем: два графика в одной карточке; легенда сверху или сбоку от графика; своё состояние загрузки у карточки вместо Chart plot Skeleton.

## 3. Anatomy
- Корень — `surface/next` (на уровень выше подложки, 15.11), обводка `border/subtle` × `border/width/default`, `radius/container`, отступ `surface/padding/lg` (Web 24 / мобильный 16; 23.11, было 28), зазор `surface/gap`; ширина 580 числом, min-width `size/card/min` (280).
- Слот Top (зазор `space/16`): `stat` (`space/4`) — `label` (`type/label/md`, `text/primary`), `value` (`font/family/display`, `type/display/md`, bold, `text/primary`), `caption` (`type/body/md`, `text/secondary`); Tabs (зазор `space/20`, линия `border/subtle`).
- Слот Content (зазор `space/8`): Chart plot + подписи оси (max-width `size/chart-axis-label/max`, `type/body/sm`, `text/tertiary`).
- Слот Bottom (зазор `space/16`): `legend` — Legend item × 3 (зазор `space/6`, max-width `size/legend-item/max`) + `sum` (`type/body/md`, `text/secondary`).
- Служебных слоёв нет.
- Вложено: `Tabs` ×1, `Chart plot` ×1, `Legend item` ×3.
- Служебные слои (вариантов из 1): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент; интерактивны вложенные Tabs и Chart plot.
- Своих состояний нет: Hover / Skeleton / Empty / Disabled — у вложенного Chart plot, выбор вкладки — у Tabs.

## 5. Properties
Осей нет: один компонент.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Show bottom | булево | вкл | 1 из 1 |
| Top | слот | — | 1 из 1 |
| Content | слот | — | 1 из 1 |
| Bottom | слот | — | 1 из 1 |

- Show bottom — по умолчанию On, скрывает слот Bottom.
- Top, Content, Bottom — слоты; тексты правятся в экземпляре внутри слотов.

## 6. Content / slots
- Подпись — что и за какой период; значение — число с единицей; итог — сумма за период.
- Длинный текст: правила усечения в описании нет. Стенд 2026-11-15: карточка шириной 580 в ячейке 394 срезается — Top не проверен; в Bottom легенда переносится на следующую строку, итог — одна строка до 200 px с многоточием (исправлено 2026-11-15).
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет. На стенде направление не переключается.
- Языки (стенд): de, ar, hi, th, ja, kk — по высоте не обрезаны.
- Текст 200 %: Top растёт без обрезки; Tabs срезаются краем карточки; подписи оси усекаются «00:…»; Bottom — легенда переносится, итог усекается.

## 7. Events
- Нет у карточки. Tabs — `change` вкладки (смена данных графика); события графика — у Chart plot.

## 8. Behavior
- Смена вкладки — меняется график и значение, без анимации счётчика.
- Загрузка и пустые данные — состояния Chart plot (Skeleton / Empty), каркас карточки остаётся.

## 9. Accessibility
- Карточка — группа с именем по подписи.
- Текстовая альтернатива графика — краткая сводка (тренд, мин / макс) + доступ к таблице данных.
- Цвет не единственный носитель: подписи на графике, разные штрихи линий; легенда — текстом.
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`). Кольцо и зоны нажатия — у вложенных Tabs и Chart plot.

## 10. Tokens
- `корень`: заливка / цвет `surface/next`; интервал `space/16`; мин. ширина `size/card/min`; отступы `space/28`; радиус `radius/container`; обводка `border/subtle`; толщина обводки `border/width/default`.
- `Top`: интервал `space/16`.
- `stat`: интервал `space/4`.
- `label`: заливка / цвет `text/primary`, `text/tertiary`; типографика `font-weight/medium`, `font-weight/regular`, `font/family/text`, `type/body/sm`, `type/label/md`.
- `value`: заливка / цвет `text/primary`; типографика `font-weight/bold`, `font/family/display`, `type/display/md`.
- `caption`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/md`.
- `Tabs`: интервал `space/20`; обводка `border/subtle`.
- `Content`: интервал `space/8`.
- `Chart plot`: интервал `space/4`.
- `axis label`: maxw `size/chart-axis-label/max`.
- `Bottom`: интервал `space/16`.
- `legend`: интервал `space/16`.
- `Legend item`: интервал `space/6`; maxw `size/legend-item/max`.
- `sum`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/md`.
- Min / max корня: minWidth 280 size/card/min.
- Значений без переменной: 1 (напр. `(root):w=580`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Интерактивны вложенные Tabs и Chart plot — по их правилам (Hover только с указателем).

## 12. Figma projection
- Компонент `Chart card`; оси: нет.
- Борда: «Chart card — борда · шаблон v3», разделов 12.
- Описание: 1132 знаков, разделы: Status: Level: Виджет графика: Состояния графика — Когда использовать: A11y: Поиск: Legacy: Правила:

## 13. Code projection
Код в репо: React `packages/react/src/index.js` (`ChartCard`), Vue `packages/vue/src/DsChartCard.vue`, CSS `claude-ds/components/ChartCard/style.css`; проверка — `npm run test:code`. Прод (DSP / ui-emcd-web, Flutter) — сверка через `scripts/parity.mjs`, когда появится манифест кода.

- Vue: `<DsChartCard>`; Flutter: `DsChartCard`.
- Props: `showBottom`: boolean = true; `top`: string или слот; `content`: string или слот; `bottom`: string или слот.

## 14. Acceptance (2026-11-23)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — ширина корня 580 числом.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props с кодом продукта — по манифесту кода, когда он будет; код в репо проверяет `npm run test:code`.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-15 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; тексты в слотах — содержимое по умолчанию; Top на длинном тексте не проверен (карточка шире ячейки); RTL на стенде не зеркалится; кода нет — parity props пропущена.

## 15. Migration
- DS Web bar widget (type=horizont / vertical / circle) и widget Graph (.chart, .graphics, .legends, .dividers) → Chart card (слоты Top / Content / Bottom, Show bottom); форма графика → Type вложенного Chart plot.

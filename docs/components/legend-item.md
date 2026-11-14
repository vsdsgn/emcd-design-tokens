# Legend item — контракт (2026-11-14)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Legend item`. Status: beta. Level: unknown.
- Figma: Components, страница «Legend item» (`1012:20`), набор `84:613`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Элемент легенды графика: маркер серии (Legend swatch) + подпись и необязательное значение.
- Когда использовать: легенда графика; кликабельная — скрыть / показать серию.
- Когда нет: серия только цветом, без подписи; статус — Status; метка — Badge.
- Правило выбора варианта:
  - State: Default — серия в покое; Hover — наведение на серию; Skeleton — график грузится.
  - Selected=On — серия выбрана / закреплена; только State=Default (4 из 6).
  - Вложенный Legend swatch: Marker Dot — столбцы и области, Line — линии; Series 1–8 = `data/1`…`data/8`, порядок как на графике.
  - Show value — текущее значение серии рядом с подписью; по умолчанию выключено.
  - Легенда — над графиком слева, зазор между элементами 16, перенос на новую строку разрешён.
- Не делаем: элемент без подписи; порядок серий не как на графике; Focus ring у Skeleton.

## 3. Anatomy
- Корень — горизонтальный ряд, зазор `space/6`, max-width `size/legend-item/max` (160): Legend swatch (`size/legend-swatch`, вложен, exposed) → `label` → `value`.
- `label` — Body/SM Regular, `text/secondary` (Default) / `text/primary` (Hover); Selected=On — Label/SM Medium, `text/primary`.
- `value` — `font/family/mono`, Body/SM, `text/primary`.
- `skeleton` — полоса `skeleton/base`, `radius/chip`, высотой строки текста; корень той же высоты, что Default (16); маркера в Skeleton нет.
- Служебные: `focus ring` (`border/focus-ring`, `border/width/focus-ring`, `radius/2xs`), `hit area · web` / `hit area · app`, `safe area · outer`.
- Вложено: `Legend swatch` ×3.
- Служебные слои (вариантов из 4): кольцо фокуса 4 · зона Web 4 · зона касания 4 · безопасное поле 4.

## 4. States
- Группа модели состояний (`docs/components.md`): Текстовый: Hover / Pressed меняют цвет текста, подложки нет; Skeleton — загрузка.
- Default — подпись `text/secondary`.
- Hover — подпись `text/primary`: наведение на серию.
- Selected=On — подпись `text/primary`, Medium: серия выбрана / закреплена; Hover и Skeleton у выбранной нет.
- Skeleton — полоса вместо маркера и подписи: график грузится.
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`).

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Selected | Off · On | Off |
| State | Default · Hover · Skeleton | Default |

Матрица: 4 из 6.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Label | текст | «Хешрейт» | 3 из 4 |
| Value | текст | «124.5 TH/s» | 3 из 4 |
| Show value | булево | выкл | 3 из 4 |
| Focus ring | булево | выкл | 4 из 4 · служебное |
| Show hit area | булево | выкл | 4 из 4 · служебное |
| Safe margin | булево | выкл | 4 из 4 · служебное |

- Label, Value, Show value — у всех, кроме Skeleton; Focus ring, Show hit area, Safe margin — у всех четырёх.

## 6. Content / slots
- Label — название серии, обязательно; Value — значение с единицей («124.5 TH/s»).
- Длинный текст: одна строка, многоточие; подпись ≤ 148, корень ≤ `size/legend-item/max` (160).
- Языки (стенд): de, th, kk усекаются многоточием, hi, ja помещаются, обрезки по высоте нет.
- RTL: маркер — со стороны начала строки, значение — в конце; цифры и единицы не зеркалятся.
- Текст 200 %: подпись растёт, обрезки нет; маркер и полоса Skeleton не растут.

## 7. Events
- `click` — скрыть или показать серию (у кликабельной легенды).

## 8. Behavior
- Hover меняет цвет подписи.
- Skeleton — блик по правилам Skeleton.
- Зона нажатия ≥ `touch/min`: Web 24, касание 44 (слои `hit area · web` / `hit area · app`, проверка — Show hit area); безопасное поле — `control/safe-margin`.

## 9. Accessibility
- Легенда — список; элемент — пункт списка. Кликабельный — кнопка с именем из подписи; Enter и Пробел.
- Цвет не единственный носитель: подпись обязательна.

## 10. Tokens
- `корень`: интервал `space/6`; maxw `size/legend-item/max`.
- `swatch`: высота `size/legend-swatch`; ширина `size/legend-swatch`.
- `label`: заливка / цвет `text/primary`, `text/secondary`; типографика `font-weight/medium`, `font-weight/regular`, `font/family/text`, `type/body/sm`, `type/label/sm`.
- `value`: заливка / цвет `text/primary`; типографика `font-weight/regular`, `font/family/mono`, `type/body/sm`.
- `skeleton`: заливка / цвет `skeleton/base`; радиус `radius/chip`.
- Служебные слои (общие правила — `service-layers.md`): `focus ring`: радиус `radius/2xs`; обводка `border/focus-ring`; толщина обводки `border/width/focus-ring` · `hit area · web`: видимость `touch/is-fine` · `hit area · overlay`: заливка / цвет `status/danger/solid` · `hit area · app`: видимость `touch/is-coarse` · `safe area · outer`: обводка `status/success/solid`; толщина обводки `control/safe-margin`.
- Min / max корня: maxWidth 160 size/legend-item/max.
- Значений без переменной: 8 (напр. `hit area · web:w=68`, `hit area · web:h=24`, `hit area · web:w=69`, `hit area · web:w=64`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Набор `Legend item`, вариантов 4 из 6; оси: Selected, State.
- Борда: «Legend item — борда · шаблон v3», разделов 12.
- Описание: 1087 знаков, разделы: Status: Level: Элемент легенды графика: State как у legacy . Правила: A11y: Когда использовать: Поиск: Legacy: Матрица:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsLegendItem>`; Flutter: `DsLegendItem`.
- Props: `selected`: boolean; `label`: string или слот; `value`: string или слот; `showValue`: boolean = false.
- Состояния (Default, Hover, Skeleton) — не props: Hover / Pressed / Focus из платформы; `disabled`, `skeleton` — props.

## 14. Acceptance (2026-11-14)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — только реестр: maxWidth текстового слоя числом (label 148).
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; RTL стенд не проверяет; кода нет — parity props пропущена.

## 15. Migration
- DS Web widget Graph `.legends` (state=default | hover | active | skeleton) → State Default | Hover | Skeleton, active → Selected=On; маркер — вложенный Legend swatch (Marker, Series); значение — Show value + Value.

Осталось доделать (после пакета правок beta 2026-11-13):
- На решение: Focus ring у Skeleton включается — убрать слой из Skeleton или оставить запрет «не включать».
- ar: многоточие усечённой подписи вплотную к маркеру — проверить в RTL-раскладке.
- `hit area · web` — числом (68 / 69 / 64 × 24).

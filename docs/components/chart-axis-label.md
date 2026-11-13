# Chart axis label — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Chart axis label`. Status: beta. Level: unknown.
- Figma: Components, страница «Chart axis label» (`1012:17`), набор `97:818`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Подпись оси графика: время, дата или значение. Одна короткая метка.
- Когда использовать: подписи осей графиков (время, значение).
- Когда нет: значения данных на самом графике — Chart tooltip.
- Правило выбора варианта:
  - Size: S 12 — по умолчанию; L 14 — крупная подпись (legacy size small / large).
  - State: Default — обычная метка (`text/tertiary`); Hover — метка столбца под курсором; Active — метка выбранной точки (оба `text/primary`); Skeleton — график загружается.
  - Label — короткая метка до 8 символов, формат по локали; на узком графике метки ставятся через одну.
- Не делаем: заходить за границы плота; подложка под меткой.

## 3. Anatomy
- Корень — max-width `size/chart-axis-label/max` (64); `label` — текст (`font/family/text`, `font-weight/regular`; S — `type/body/sm`, L — `type/body/md`).
- `skeleton` — плашка `skeleton/base`, `radius/chip` (только State=Skeleton).
- Служебные слои (вариантов из 8): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): Текстовый: Hover / Pressed меняют цвет текста, подложки нет; Skeleton — загрузка.
- Default — `text/tertiary`; Hover и Active — `text/primary` (выглядят одинаково, различие по смыслу: под курсором / выбрана).
- Skeleton — плашка вместо текста, одна на размер. Focus и Disabled нет: метка не получает фокус.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | S · L | S |
| State | Default · Hover · Active · Skeleton | Default |

Матрица полная: 8 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Label | текст | «14:00» | 6 из 8 |

## 6. Content / slots
- Длинный текст: одна строка, усечение многоточием по max-width 64 (подпись 52); полный текст — в `title` / тултипе.
- Языки: de, hi, th, ja, kk усекаются многоточием, по высоте не обрезаны; ar усекается без видимого многоточия (проверено на стенде). Цифры и время в RTL не зеркалятся.
- Текст 200 %: max-width не растёт — «14:00» усекается до «14:…».

## 7. Events
- Собственных нет: Hover / Active выставляет график по положению курсора и выбранной точке.

## 8. Behavior
- Skeleton — блик `Skeleton` (1.2 с; «Уменьшить движение» — пульсация прозрачности).

## 9. Accessibility
- Метки оси скрыты от экранных читалок (`aria-hidden`); данные доступны через `aria-label` графика и таблицу данных.
- Фокус не получает.

## 10. Tokens
- `корень`: maxw `size/chart-axis-label/max`.
- `label`: заливка / цвет `text/primary`, `text/tertiary`; типографика `font-weight/regular`, `font/family/text`, `type/body/md`, `type/body/sm`.
- `skeleton`: заливка / цвет `skeleton/base`; радиус `radius/chip`.
- Min / max корня: maxWidth 64 size/chart-axis-label/max.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Набор `Chart axis label`, вариантов 8 из 8; оси: Size, State.
- Борда: «Chart axis label — борда · шаблон v3», разделов 9.
- Описание: 774 знаков, разделы: Status: Level: Когда использовать: Правила: A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsChartAxisLabel>`; Flutter: `DsChartAxisLabel`.
- Props: `size`: s | l; `label`: string или слот.
- Состояния (Default, Hover, Active, Skeleton) — не props: Hover / Pressed / Focus из платформы; `disabled`, `skeleton` — props.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — только реестр: maxWidth текстового слоя числом (label 52).
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; RTL стенд не проверяет; булевых свойств у набора нет; кода нет — parity props пропущена.

## 15. Migration
- DS Web `.chart` (widget Graph): size small | large → Size S | L; state default | hover | active | skeleton → State Default | Hover | Active | Skeleton.

Осталось доделать (после пакета правок beta 2026-11-13):
- Hover и Active неотличимы на вид — нужен ли Active отдельный признак; на решение.
- 200 %: «14:00» усекается до «14:…» — max-width по масштабу текста или прореживание меток; на решение.

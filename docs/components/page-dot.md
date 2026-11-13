# Page dot — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Page dot`. Status: beta. Level: unknown.
- Figma: Components, страница «Page dot» (`1012:14`), набор `149:1695`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Точка индикатора страниц. Часть Page indicator.
- Когда использовать: только внутри Page indicator — одна точка на страницу.
- Когда нет: статус объекта — Status / Dot; непрочитанное — Counter.
- Правило выбора варианта:
  - Selected: Off — остальные страницы, точка `size/dot/sm`; On — текущая страница, вытянутая точка 16 цвета акцента. В индикаторе выбрана ровно одна.
- Не делаем: две выбранные точки.

## 3. Anatomy
- Корень — капсула: `radius/chip`, высота `size/dot/sm`; Off — ширина `size/dot/sm`, заливка `icon/tertiary`; On — ширина 16, заливка `icon/accent`.
- Служебные слои (вариантов из 2): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент.
- Состояний нет; выбранность — ось Selected.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Selected | Off · On | Off |

Матрица полная: 2 вариантов.

## 6. Content / slots
- Текста нет: длинный текст, языки и 200 % не влияют (на стенде без изменений).
- RTL: точка симметрична; порядок точек зеркалит Page indicator.

## 7. Events
- Собственных нет. Кликабельные точки — `click` у обёртки-кнопки в Page indicator.

## 8. Behavior
- Статична.

## 9. Accessibility
- Декоративна; позицию озвучивает Page indicator («Слайд 3 из 5»).
- Кликабельные точки — кнопка с именем «Слайд N», у выбранной `aria-current`.

## 10. Tokens
- `корень`: заливка / цвет `icon/accent`, `icon/tertiary`; высота `size/dot/sm`; радиус `radius/chip`; ширина `size/dot/sm`.
- Значений без переменной: 1 (напр. `(root):w=16`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Набор `Page dot`, вариантов 2 из 2; оси: Selected.
- Борда: «Page dot — борда · шаблон v3», разделов 9.
- Описание: 510 знаков, разделы: Status: Level: Точка индикатора страниц. Когда использовать: Правила: A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsPageDot>`; Flutter: `DsPageDot`.
- Props: `selected`: boolean.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; RTL стенд не проверяет; текста и булевых свойств у набора нет; кода нет — parity props пропущена.

## 15. Migration
- В описании Figma строки Legacy нет.

Осталось доделать (после пакета правок beta 2026-11-13):
- Ширина выбранной точки 16 — числом.
- В описании Figma нет строки Legacy.

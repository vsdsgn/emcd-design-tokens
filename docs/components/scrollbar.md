# Scrollbar — контракт (2026-11-14)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Scrollbar`. Status: beta. Level: unknown.
- Figma: Components, страница «Scrollbar» (`367:1043`), набор `149:1690`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Полоса прокрутки для своих скролл-контейнеров: выпадающие списки, панели, таблицы. Источник — legacy DS Web «Scrollbar» и сырой «Scroll» 4 px в продуктах.
- Когда использовать: Web, где системный скроллбар ломает вид (тёмные панели, списки в оверлеях).
- Когда нет: App и мобильный веб — системный оверлей-скроллбар; основная страница — системный.
- Правило выбора варианта:
  - Orientation: Vertical — у правого (в RTL — левого) края контейнера; Horizontal — у нижнего.
  - State — не выбирается в макете, отражает взаимодействие: Default — покой, Hover — указатель над областью, Dragging — перетаскивание ползунка.
  - Длина ползунка — доля видимого содержимого, не меньше 48.
- Не делаем: занимать место в раскладке — лежит поверх содержимого; быть единственным способом прокрутки.

## 3. Anatomy
- Корень — область `size/scrollbar` (12); в Hover / Dragging — дорожка `action/secondary/default`, `radius/chip`.
- `thumb` — ползунок: Default — `size/track/sm` (4), `scrollbar/thumb`; Hover — `size/track/md` (8), `scrollbar/thumb-hover`; Dragging — `size/track/md`, `scrollbar/thumb-hover`.
- `state layer` — `state/layer` × `state/hover`, `radius/chip`.
- Служебные слои (вариантов из 6): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): Плашка: слой `state/layer` × `state/hover` на дорожке; свои состояния Default / Hover / Dragging, Disabled и фокуса нет.
- Default — тонкий ползунок 4, дорожки нет; виден при прокрутке и наведении, затем гаснет.
- Hover — ползунок 8 `scrollbar/thumb-hover` и дорожка.
- Dragging — ползунок 8 `scrollbar/thumb-hover` и дорожка.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Orientation | Vertical · Horizontal | Vertical |
| State | Default · Hover · Dragging | Default |

Матрица полная: 6 вариантов.

## 6. Content / slots
- Текста нет: длинный текст, языки и 200 % не применимы.
- RTL: Vertical переезжает к левому краю; Horizontal не меняется.

## 7. Events
- Своих нет: прокрутку ведёт контейнер.

## 8. Behavior
- Появляется при прокрутке и наведении, затем гаснет.
- Наведение / перетаскивание: ползунок 4 → 8, появляется дорожка.
- В коде: `scrollbar-width: thin`, `scrollbar-color` из токенов, кастом — через `::-webkit-scrollbar`.

## 9. Accessibility
- Прокрутка доступна колёсиком, клавишами и тачем — скроллбар не единственный способ.
- Своей роли и фокуса нет: это оформление прокрутки контейнера.

## 10. Tokens
- `корень`: заливка / цвет `action/secondary/default`; высота `size/scrollbar`; радиус `radius/chip`; ширина `size/scrollbar`.
- `thumb`: заливка / цвет `scrollbar/thumb`, `scrollbar/thumb-hover`; высота `size/track/md`, `size/track/sm`; радиус `radius/chip`, `radius/xs`; ширина `size/track/md`, `size/track/sm`.
- Служебные слои (общие правила — `service-layers.md`): `state layer`: заливка / цвет `state/layer`; прозрачность `state/hover`; радиус `radius/chip`.
- Значений без переменной: 12 (напр. `(root):h=120`, `thumb:h=48`, `(root):w=120`, `thumb:w=48`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Только Web с указателем. Mobile web, iOS, Android — системный оверлей-скроллбар, компонент не используется.

## 12. Figma projection
- Набор `Scrollbar`, вариантов 6 из 6; оси: Orientation, State.
- Борда: «Scrollbar — борда · шаблон v3», разделов 11.
- Описание: 1034 знаков, разделы: Status: Level: Когда использовать: Default — A11y: Правила:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsScrollbar>`; Flutter: `DsScrollbar`.
- Props: `orientation`: vertical | horizontal.
- Состояния (Default, Hover, Dragging) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-14)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web; iOS / Android формально — компонент только для Web); текста и булевых свойств нет — длинный текст, языки и 200 % не применимы; RTL стенд не проверяет; кода нет — parity props пропущена.

## 15. Migration
- DS Web `Scrollbar` (base scrollbar, scroll controller) и сырой `Scroll` 4 px в продуктах → Scrollbar (Orientation Vertical | Horizontal, State Default | Hover | Dragging).

Осталось доделать (после пакета правок beta 2026-11-13):
- Длина корня 120 (образец) и ползунка 48 — числом.
- Dark L0: дорожка Hover / Dragging едва видна — на решение.

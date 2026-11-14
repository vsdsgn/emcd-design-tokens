# Pagination — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Pagination`. Status: beta. Level: unknown.
- Figma: Components, страница «Pagination» (`367:629`), набор `148:10702`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Пагинация таблиц и списков: номера страниц или диапазон со стрелками.
- Когда использовать: длинные таблицы на Web (воркеры, выплаты, устройства), когда важно знать позицию и прыгать по страницам.
- Когда нет: ленты на Compact — «Показать ещё» / бесконечная прокрутка; меньше двух страниц — не показываем.
- Правило выбора варианта:
  - Type: Pages — Web: первая, последняя, текущая ± 1 и «…»; Compact — «21–40 из 340» и стрелки (Compact viewport, узкие колонки).
  - Size: S | M — как у контролов таблицы; в одной пагинации один размер.
  - Место: справа под таблицей (в RTL — слева).
  - Стрелки на первой / последней странице — Disabled.
- Не делаем: пагинация при одной странице; все номера подряд без «…»; два выбранных номера.

## 3. Anatomy
- Корень — ряд, зазор `space/4`, высота по содержимому: `previous` → номера (вложенные Pagination item) и `ellipsis` «…» (`type/label/md`, `text/secondary`) → `next`.
- Compact: `previous` → `range` (`type/label/md`, `font-weight/medium`, `text/secondary`, отступ `space/8`, ширина по содержимому) → `next`; высота `control/height/sm` | `control/height/md`.
- `previous` / `next` — стрелки как Icon button Ghost: `control/height/sm` | `control/height/md`, радиус `radius/control-sm` | `radius/control`.
- Pagination item — ширина по содержимому, min = высоте (`control/height/*`), отступы `space/8`.
- Вложено: иконки ×8, `Pagination item` ×12.
- Служебные слои (вариантов из 4): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): наследует вложенные: номера — Pagination item (плашка), стрелки — Icon button Ghost.
- Своей оси State нет. Текущая страница — Pagination item Selected (`accent/subtle`); стрелка на первой / последней странице — Disabled.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Type | Pages · Compact | Pages |
| Size | S · M | S |

Матрица полная: 4 вариантов.

- Свойств у набора нет: номера, текущая страница и текст диапазона задаются во вложенных экземплярах и слое `range`.

## 6. Content / slots
- Номера — числа; пункт растёт с числом («1024» — 47). Диапазон — «21–40 из 340», формат и слово «из» — по локали.
- Длинный текст и языки: своего текста, кроме `range`, нет; номера и диапазон не усекаются, ряд растёт по ширине.
- RTL: порядок зеркалится, стрелки отражаются, цифры — нет.
- Текст 200 %: по высоте не обрезано; двузначный номер расширяет пункт.

## 7. Events
- `change` (номер страницы) — по нажатию на номер или стрелку.

## 8. Behavior
- Hover / Pressed — у Pagination item и стрелок.
- Хаптик: `haptic/selection` при смене страницы (App).

## 9. Accessibility
- `nav` с `aria-label` «Пагинация»; текущая — `aria-current="page"`; стрелки — «Предыдущая страница» / «Следующая страница».
- Клавиатура: Tab по элементам, Enter / Space.
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`).

## 10. Tokens
- `корень`: интервал `space/4`.
- `previous`: интервал `space/6`; высота `control/height/md`, `control/height/sm`; радиус `radius/control`, `radius/control-sm`; ширина `control/height/md`, `control/height/sm`.
- `Pagination item`: заливка / цвет `accent/subtle`; высота `control/height/md`, `control/height/sm`; мин. ширина `control/height/md`, `control/height/sm`; отступы `space/8`; радиус `radius/control`, `radius/control-sm`.
- `ellipsis`: заливка / цвет `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- `next`: интервал `space/6`; высота `control/height/md`, `control/height/sm`; радиус `radius/control`, `radius/control-sm`; ширина `control/height/md`, `control/height/sm`.
- `range`: заливка / цвет `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`; отступы `space/8`.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Набор `Pagination`, вариантов 4 из 4; оси: Type, Size.
- Борда: «Pagination — борда · шаблон v3», разделов 9.
- Описание: 929 знаков, разделы: Status: Level: Когда использовать: Pages — Prev/next — A11y: Хаптик: Правила:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsPagination>`; Flutter: `DsPagination`.
- Props: `type`: pages | compact; `size`: s | m.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; RTL стенд не проверяет; длинный текст и языки — подменой подписей вложенных Pagination item; правки высоты Compact и ширины Pagination item 13.11 стендом не перепроверены; код — HTML/CSS.

## 15. Migration
- Legacy нет: в legacy и продуктах не найдена, нарисована в стиле 2.0 → Type Pages | Compact, Size S | M; Pagination item — State Default | Hover | Pressed | Selected | Disabled. Нужен скрин прода.

Осталось доделать (после пакета правок beta 2026-11-13):
- Стрелки Disabled на первой / последней странице в вариантах не показаны.
- Нет свойств для текущей страницы и числа страниц — на решение.

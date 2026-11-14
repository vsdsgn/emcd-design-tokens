# Overlay — контракт (2026-11-14)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Overlay`. Status: beta. Level: unknown.
- Figma: Components, страница «Overlay» (`1661:354`), набор `1661:357`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Подложка за модальными слоями: полупрозрачная заливка `surface/overlay` на весь экран, при необходимости с размытием фона.
- Когда использовать: за Modal, Sheet и Side panel; под Dropdown panel на мобильном.
- Когда нет: внутри страницы, для выделения блока — Card.
- Правило выбора варианта:
  - Blur: Off — по умолчанию; On — только там, где платформа поддерживает размытие (`os/material/blur`), иначе Off.
  - Растягивается на весь экран; две подложки друг в друга не вкладываем.
- Не делаем: подложка внутри страницы; две подложки одновременно; Blur=On без поддержки платформой.

## 3. Anatomy
- Корень — прямоугольник: заливка `surface/overlay`; у Blur=On — эффект `effect/blur/backdrop`. Растягивается на весь экран (constraints Scale).
- Служебные слои (вариантов из 2): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент.
- Состояний нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Blur | Off · On | Off |

Матрица полная: 2 вариантов.

## 6. Content / slots
- Текста нет: длинный текст, языки, RTL и 200 % не влияют.

## 7. Events
- Нажатие по подложке закрывает слой — кроме обязательных диалогов; закрытие выполняет родитель (Modal, Sheet, Side panel).

## 8. Behavior
- Растягивается на весь экран; появляется и исчезает вместе с родительским слоем.
- `prefers-reduced-transparency` — без размытия.

## 9. Accessibility
- Декоративна.
- Фокус заперт внутри слоя; фон за подложкой получает `aria-hidden` и `inert`.

## 10. Tokens
- `корень`: эффект `effect/blur/backdrop`; заливка / цвет `surface/overlay`.
- Значений без переменной: 4 (напр. `(root):w=480`, `(root):h=320`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Blur=On — только где платформа поддерживает размытие (`os/material/blur`).

## 12. Figma projection
- Набор `Overlay`, вариантов 2 из 2; оси: Blur.
- Борда: «Overlay — борда · шаблон v3», разделов 11.
- Описание: 743 знаков, разделы: Status: Level: Когда использовать: Правила: A11y: Legacy: Токены:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsOverlay>`; Flutter: `DsOverlay`.
- Props: `blur`: boolean.

## 14. Acceptance (2026-11-14)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; RTL стенд не проверяет; текста и булевых свойств нет; Blur=On не проверен — под подложкой нет содержимого; кода нет — parity props пропущена.

## 15. Migration
- DS Web `Background / base overlay` → Overlay (Blur Off | On).

Осталось доделать (после пакета правок beta 2026-11-13):
- Blur=On проверить поверх содержимого: на стенде размытие не видно.

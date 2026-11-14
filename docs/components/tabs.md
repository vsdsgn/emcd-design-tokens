# Tabs — контракт (2026-11-14)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Tabs`. Status: beta. Level: unknown.
- Figma: Components, страница «Tabs» (`355:33524`), набор `45:250`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Бар табов: переключение между разделами одного контекста. Внутри — экземпляры Tab, первый выбран; снизу разделитель `border/subtle` на всю ширину контейнера.
- Когда использовать: 2–6 разделов одного контекста.
- Когда нет: фильтры — Chip / Segmented; основная навигация — Nav item / Tab bar.
- Правило выбора варианта:
  - Size: S — мини-табы внутри виджета или карточки; M (зазор 16) — App и мобильный веб; L (зазор 24) — Web; XL — табы-заголовок страницы. В одном баре один размер.
  - Tab 3 – Tab 6: число вкладок 2–6, включать по порядку.
  - Выбрана одна вкладка; в макете — первая.
  - Бар растягивается на ширину секции; не помещается — горизонтальный скролл, вкладки не переносятся.
- Не делаем: перенос вкладок на вторую строку; табы как фильтр.

## 3. Anatomy
- Корень: ряд вкладок, зазор `space/16` – `space/32` по Size, разделитель снизу `border/subtle`.
- `tab 1` … `tab 6` — экземпляры Tab (высота `control/height/sm` / `lg` / `xl` / `2xl`, зазор `space/6` / `space/8`); у выбранной — индикатор `border/accent`.
- Подпись, счётчик и иконка открыты у вложенных Tab; у набора — только Tab 3 – Tab 6.
- Вложено: `Tab` ×24.
- Служебные слои (вариантов из 4): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): наследует Tab: навигация — индикатор `border/accent`, Hover / Pressed — слой состояния и цвет текста.
- Оси State у набора нет: Default, Hover, Pressed, Disabled × Selected Off | On и Skeleton — у вложенных Tab.
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`). Кольцо — у вложенного Tab.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | M · L · XL · S | M |

Матрица полная: 4 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Tab 3 | булево | вкл | 4 из 4 |
| Tab 4 | булево | вкл | 4 из 4 |
| Tab 5 | булево | выкл | 4 из 4 |
| Tab 6 | булево | выкл | 4 из 4 |

- Tab 3 и Tab 4 включены по умолчанию (4 вкладки), Tab 5 и Tab 6 — выключены. Подпись, счётчик и иконка — у вложенных Tab.

## 6. Content / slots
- Длинный текст: подпись вкладки — одна строка, многоточие по max-width 240 (Tab); бар не переносится, а уходит в скролл.
- Языки (стенд): de, ar, hi, th, ja, kk — по высоте не обрезано.
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет. Порядок табов и направление скролла зеркалятся.
- Текст 200 %: подписи не обрезаны, бар растёт по высоте; капсула Counter растёт вместе с цифрой (высота по содержимому, min — `size/counter-height/*`).

## 7. Events
- `change` / `update:modelValue` — выбрана другая вкладка.

## 8. Behavior
- Hover: слой 0 → 6 %, `motion/duration/feedback` (120 мс), `motion/easing/standard`. «Уменьшить движение»: длительности ≈ 0.
- Смена выбранного: индикатор переезжает.
- Бар скроллится по горизонтали; выбранная вкладка при открытии прокручивается в зону видимости.
- Хаптик `haptic/selection` (App).
- Зоны нажатия — у вложенных Tab.

## 9. Accessibility
- `role="tablist"`, вкладки — `role="tab"` с `aria-selected`, панель — `role="tabpanel"`.
- ← / → перемещают фокус между вкладками, Tab уходит в панель.
- Выбранная вкладка видна без прокрутки.

## 10. Tokens
- `корень`: интервал `space/16`, `space/20`, `space/24`, `space/32`; обводка `border/subtle`.
- `tab 1`: интервал `space/6`, `space/8`; высота `control/height/2xl`, `control/height/lg`, `control/height/sm`, `control/height/xl`.
- `tab 2`: интервал `space/6`, `space/8`; высота `control/height/2xl`, `control/height/lg`, `control/height/sm`, `control/height/xl`.
- `tab 3`: интервал `space/6`, `space/8`; высота `control/height/2xl`, `control/height/lg`, `control/height/sm`, `control/height/xl`.
- `tab 4`: интервал `space/6`, `space/8`; высота `control/height/2xl`, `control/height/lg`, `control/height/sm`, `control/height/xl`.
- `tab 5`: интервал `space/6`, `space/8`; высота `control/height/2xl`, `control/height/lg`, `control/height/sm`, `control/height/xl`.
- `tab 6`: интервал `space/6`, `space/8`; высота `control/height/2xl`, `control/height/lg`, `control/height/sm`, `control/height/xl`.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.
- Размер по умолчанию: Web — L, App и Mobile web — M.

## 12. Figma projection
- Набор `Tabs`, вариантов 4 из 4; оси: Size.
- Борда: «Tabs — борда · шаблон v3», разделов 12.
- Описание: 1113 знаков, разделы: Status: Level: Бар табов. Правила: Когда использовать: Хаптик: Поиск: Legacy: A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsTabs>`; Flutter: `DsTabs`.
- Props: `size`: m | l | xl | s; `tab3`: boolean = true; `tab4`: boolean = true; `tab5`: boolean = false; `tab6`: boolean = false.

## 14. Acceptance (2026-11-14)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; RTL стенд не проверяет; рост Counter при 200 % повторно не проверен; код — HTML/CSS.

## 15. Migration
- DS Web `tabs`, `base tabbar` → Tabs (Size; число вкладок — Tab 3 – Tab 6); подпись, счётчик, иконка — у вложенных Tab.

Осталось доделать (после пакета правок beta 2026-11-13):
- Порядок оси Size — M, L, XL, S; привести к S, M, L, XL — на решение (что по умолчанию).

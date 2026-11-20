# Action bar — контракт (2026-11-20)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Action bar`. Status: beta. Level: unknown.
- Figma: Components, страница «Action bar» (`2311:2`), набор `2311:70`. Платформы: Web, Mobile web, iOS, Android.
- Страница «Action bar», конструкция (`docs/patterns.md`, разделы 0.2 и 1.5). Вложены Button M (1–2) и Badge S (Badge=On). Beta 20.11 по репо: Status в описании набора в Figma меняется отдельно.

## 2. Intent
- Нижняя панель действий Compact: 1–2 Button M на всю ширину, подложка `surface/level-0`, прилипает к низу экрана.
- Когда использовать: «Подключить / Создать группу», «Фильтры / Выгрузить» на мобильном вебе; одна главная кнопка на вложенном экране App (Калькулятор).
- Когда нет: экраны с Tab bar; Web — действия в шапке (Page header) или тулбаре; модальный поток — футер Sheet.
- Правило выбора варианта:
  - Actions: 1 — одно главное действие, Button Primary M на всю ширину; 2 — два равных действия, Button Tertiary M поровну (зазор `space/8`).
  - Badge: On — бейдж автодействия (Badge S Neutral Subtle «A») над последней кнопкой, справа сверху: действие с автоматическим режимом («Выгрузить» с автовыгрузкой). По умолчанию Off.
  - Поля: `space/16` сверху и по бокам; снизу `space/24` или `space/16` + safe area — что больше (высота 80 = 16 + 40 + 24).
- Не делаем: больше двух кнопок; Action bar вместе с Tab bar; Action bar на Web; бейдж не над последней кнопкой.

## 3. Anatomy
- Корень — ряд, зазор `space/8`, отступы `space/16` / `space/24`, подложка `surface/level-0`; ширина образца 375 числом.
- `action 1` — Button M (`control/height/md`, `radius/control`, min-width `size/button/min`): Actions=1 — Primary (`action/primary/default`), Actions=2 — Tertiary (`action/secondary/default`).
- `action 2` — Button Tertiary M (`action/secondary/default`), только Actions=2.
- `badge` — Badge S (`size/badge-height/sm`, `status/neutral/subtle`, обводка `border/subtle`, `radius/sm`); Badge=On.
- Вложено: `Button` ×3, `Badge` ×2.
- Служебные слои (вариантов из 2): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент; интерактивны вложенные Button.
- Оси State нет: Hover / Pressed / Focus / Disabled / Loading — у вложенных Button.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Actions | 1 · 2 | 1 |

Матрица полная: 2 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Badge | булево | выкл | 2 из 2 |

- Badge — булево, по умолчанию Off; текст бейджа «A» (в коде `badgeText`).

## 6. Content / slots
- Подписи кнопок — глагол, 1–2 слова («Подключить», «Создать группу», «Фильтры», «Выгрузить»); длинная подпись — по правилам Button.
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет. Бейдж — у конца последней кнопки (`inset-inline-end`).

## 7. Events
- Своих нет: `click` — у кнопок (Vue — `action(i, event)`).

## 8. Behavior
- Прилипает к низу экрана (`position: sticky`) над safe area; контент прокручивается под панелью.

## 9. Accessibility
- Порядок фокуса — после контента экрана.
- Бейдж автодействия озвучивается (описание набора в Figma).
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`). Кольцо и зоны нажатия — у вложенных Button.

## 10. Tokens
- `корень`: заливка / цвет `surface/level-0`; интервал `space/8`; отступы `space/16`, `space/24`.
- `action 1`: заливка / цвет `action/primary/default`, `action/secondary/default`; интервал `space/4`; высота `control/height/md`; мин. ширина `size/button/min`; отступы `space/12`; радиус `radius/control`.
- `badge`: заливка / цвет `status/neutral/subtle`; интервал `space/4`; высота `size/badge-height/sm`; maxw `size/badge/max`; отступы `space/8`; радиус `radius/sm`; обводка `border/subtle`; толщина обводки `border/width/default`.
- `action 2`: заливка / цвет `action/secondary/default`; интервал `space/4`; высота `control/height/md`; мин. ширина `size/button/min`; отступы `space/12`; радиус `radius/control`.
- Значений без переменной: 2 (напр. `(root):w=375`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Compact: мобильный веб и вложенные экраны App без Tab bar. Web — не используется.
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Набор `Action bar`, вариантов 2 из 2; оси: Actions.
- Борда: «Action bar — борда · шаблон v3», разделов 9.
- Описание: 1338 знаков, разделы: Status: Level: Actions: Badge: Правила: Когда нет: Поиск: Когда использовать: A11y: Beta (20.

## 13. Code projection
Код в репо: React `packages/react/src/index.js` (`ActionBar`), Vue `packages/vue/src/DsActionBar.vue`, CSS `claude-ds/components/ActionBar/style.css`; проверка — `npm run test:code`. Прод (DSP / ui-emcd-web, Flutter) — сверка через `scripts/parity.mjs`, когда появится манифест кода.

- Vue: `<DsActionBar>`; Flutter: `DsActionBar`.
- Props: `actions`: 1 | 2; `badge`: boolean = false.
- `actions` — до двух `{ label, type, iconLeft, onClick }` (тип по умолчанию: одна — Primary, две — Tertiary) или свои Button в `children`; `badge` + `badgeText` (по умолчанию «A»), только с `actions`.

## 14. Acceptance (2026-11-20)
- `audit.plugin.js` — не прогонялся: перевод в beta 20.11 по репо (код, README, `docs/patterns.md`); плагины — вместе с правкой описания набора в Figma.
- `variables-check.plugin.js` — не прогонялся: перевод в beta 20.11 по репо (код, README, `docs/patterns.md`); плагины — вместе с правкой описания набора в Figma.
- `audit-parity.plugin.js` — не прогонялся: перевод в beta 20.11 по репо (код, README, `docs/patterns.md`); плагины — вместе с правкой описания набора в Figma.
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props с кодом продукта — по манифесту кода, когда он будет; код в репо проверяет `npm run test:code`.
- Не проверено: стенд (Light / Dark × бренды × платформы × L0–L3, длинный текст, 6 языков, 200 %, RTL); код есть (React / Vue / CSS), манифеста кода нет — parity props пропущена.

## 15. Migration
- Мобильный веб «Воркеры», «История» — нижние кнопки → Action bar Actions=2; вложенные экраны App (Калькулятор) — Actions=1.

Осталось доделать (после пакета правок beta 2026-11-13):
- Figma: Status в описании набора → beta; добавить разделы «Когда использовать:» и «A11y:» (draft-audit DESC).
- Озвучивание бейджа в коде не проверено: Badge рисуется текстом рядом с кнопкой, связи с её именем нет.
- Плагины audit / variables-check / audit-parity и стенд.

# Page header — контракт (2026-11-16)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Page header`. Status: beta. Level: unknown.
- Figma: Components, страница «Header» (`366:5290`), набор `67:410`. Платформы: Web, Mobile web, iOS, Android.
- Страница «Header», организм. Вложены Breadcrumbs, Button (слот Actions) и Tabs (слот Tabs); служебных слоёв у корня нет.

## 2. Intent
- Шапка страницы: заголовок раздела / объекта, подзаголовок-сводка, действия страницы, табы разделов.
- Когда использовать: заголовок страницы на Web с действиями справа; заголовок под Top bar на корневых экранах App / мобильного веба.
- Когда нет: вложенный экран на Compact — Top bar; описание раздела — текст в контенте, не подзаголовок.
- Правило выбора варианта:
  - Compact: Show actions по умолчанию On (свойство общее для Size); на корневых экранах App действия — в Top bar, в экземпляре Show actions = Off.
  - Size: Large — Web (Large+), Heading/XL, действия справа (до двух: Secondary M + Primary M); Compact — под Top bar на корневых экранах App / мобильного веба, Heading/LG, действия — в Top bar; если действие нужно на экране — ряд под заголовком (Show actions), кнопки переносятся.
  - Breadcrumbs: On — только на вложенных страницах Web (2+ уровня); иначе Off.
  - Show tabs: On — табы разделов; в слоте Tabs — Tabs того же размера, что шапка (L / M); табы — последним элементом, контент сразу под ними.
  - Show subtitle: подзаголовок — сводка одной строкой, не описание раздела.
- Не делаем: breadcrumbs на корневых страницах; больше двух действий; Tabs другого размера, чем шапка, или не последним элементом; описание раздела в подзаголовке.

## 3. Anatomy
- Корень — вертикальный стек, отступы `control/padding-x/lg` / `space/4` / `space/8`, зазоры `space/12` / `space/16`; ширина числом (Large 1120, Compact 375).
- `breadcrumbs` — Breadcrumbs, зазор `space/8` (Breadcrumbs = On).
- `title row` (зазор `space/12` / `space/16`): `text` (зазор `space/4`, min-width `size/page-header/text-min`) и слот Actions (Button `control/height/md`, зазор `space/8`).
- `title` — `font/family/display`, bold, `text/primary`: Large `type/heading/xl`, Compact `type/heading/lg`.
- `subtitle` — `type/body/md`, `text/secondary`.
- Слот Tabs — Tabs, линия `border/subtle`, зазоры `space/16` / `space/24`.
- Вложено: `Breadcrumbs` ×2, `Button` ×4, `Tabs` ×2.
- Служебные слои (вариантов из 2): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент; интерактивны вложенные Breadcrumbs, Button, Tabs.
- Оси State нет: Hover / Pressed / Focus / Disabled — у вложенных Breadcrumbs, Button и Tabs.
- Large — действия справа от заголовка; Compact — заголовок мельче, действия на стенде под текстом.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | Large · Compact | Large |

Матрица полная: 2 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Title | текст | «Воркеры» | 2 из 2 |
| Subtitle | текст | «12 активных из 14 · хешрейт 1.42 PH/s» | 2 из 2 |
| Show subtitle | булево | вкл | 2 из 2 |
| Breadcrumbs | булево | выкл | 2 из 2 |
| Show actions | булево | вкл | 2 из 2 |
| Show tabs | булево | выкл | 2 из 2 |
| Actions | слот | — | 2 из 2 |
| Tabs | слот | — | 2 из 2 |

- Title, Subtitle — текст; Show subtitle, Show actions — по умолчанию On; Breadcrumbs, Show tabs — Off.
- Actions, Tabs — слоты; текст стенда в содержимое слотов не попадает.

## 6. Content / slots
- Заголовок переносится, не усекается (long — 2 строки у Large); подзаголовок — одна строка, правило усечения не задано.
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет. На стенде направление не переключается: ar проверен только на обрезку.
- Языки без обрезки по высоте на стенде: de, ar, hi, th, ja, kk (Large 1120 шире ячейки 360 — видна часть).
- Текст 200 %: заголовок и подзаголовок растут, обрезки по высоте нет; у Compact ряд действий переносится на следующую строку (исправлено 2026-11-15).

## 7. Events
- Своих нет: `click` — у кнопок (Actions), крошек и табов.

## 8. Behavior
- Статична; смена таба — по правилам Tabs.
- Compact: табы шире корня — горизонтальный скролл (по Tabs).

## 9. Accessibility
- Заголовок — `h1`.
- Breadcrumbs — `nav` с `aria-label` «Хлебные крошки», текущий — `aria-current`.
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`). Кольцо и зоны нажатия — у вложенных Breadcrumbs, Button, Tabs.

## 10. Tokens
- `корень`: интервал `space/12`, `space/16`; отступы `control/padding-x/lg`, `space/4`, `space/8`.
- `breadcrumbs`: интервал `space/8`.
- `title row`: интервал `space/12`, `space/16`.
- `text`: интервал `space/4`; мин. ширина `size/page-header/text-min`.
- `title`: заливка / цвет `text/primary`; типографика `font-weight/bold`, `font/family/display`, `type/heading/lg`, `type/heading/xl`.
- `subtitle`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/md`.
- `Actions`: gap2 `space/8`; интервал `space/8`.
- `Button`: заливка / цвет `action/primary/default`, `action/secondary/default`; интервал `space/2`; высота `control/height/md`; мин. ширина `size/button/min`; отступы `space/8`; радиус `radius/control`.
- `Tabs`: интервал `space/16`, `space/24`; обводка `border/subtle`.
- Значений без переменной: 2 (напр. `(root):w=1120`, `(root):w=375`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Large — Web (Large+); Compact — App и мобильный веб, под Top bar на корневых экранах.
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Набор `Page header`, вариантов 2 из 2; оси: Size.
- Борда: «Page header — борда · шаблон v3», разделов 11.
- Описание: 1023 знаков, разделы: Status: Level: Шапка страницы: Size: Правила: A11y: Когда использовать: Поиск: Legacy:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsPageHeader>`; Flutter: `DsPageHeader`.
- Props: `size`: large | compact; `title`: string или слот; `subtitle`: string или слот; `showSubtitle`: boolean = true; `breadcrumbs`: boolean = false; `showActions`: boolean = true; `showTabs`: boolean = false; `actions`: string или слот; `tabs`: string или слот.

## 14. Acceptance (2026-11-16)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — ширина корня числом (1120 / 375).
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-15 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; Large шире ячеек стенда — действия видны только на листах 200 % и свойств, текст и языки — по видимой части; RTL на стенде не зеркалится; кода нет — parity props пропущена.

## 15. Migration
- DS Web widget Navigation header → Page header (Size Large / Compact; Breadcrumbs, Show subtitle, Show actions, Show tabs; слоты Actions, Tabs).

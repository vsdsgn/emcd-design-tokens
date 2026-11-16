# Menu — контракт (2026-11-16)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Menu`. Status: beta. Level: unknown.
- Figma: Components, страница «Menu» (`364:6`), набор `51:195`. Платформы: Web, Mobile web, iOS, Android.
- Страница «Menu», организм. Собран из вложенных _Overlay surface (Kind=Popover), Input (поиск) и Menu item в слоте Items; служебных слоёв у корня нет.

## 2. Intent
- Меню (Dropdown): всплывающий список действий или вариантов. В слоте Items — Menu item, подписи групп и разделители; сверху — необязательный поиск.
- Когда использовать: действия «⋯» у строки / карточки, выбор из списка у Select, переключатель аккаунта.
- Когда нет: 2–4 варианта на виду — Segmented / Chip; навигация по разделам — Tabs / навигация; длинный список с категориями и поиском — Dropdown panel.
- Правило выбора варианта:
  - Size: M — меню действий и выпадающие списки (Menu item M 44); L — выбор монеты, кошелька, сети и меню в Sheet на Compact (Menu item L 56). В одном меню — один размер пунктов.
  - Search: On — от 10 пунктов; меньше — Off.
  - Ширина ≥ ширины триггера (у Select — ширина поля), в пределах `size/menu/min` 160 … `size/menu/max` 320.
  - Max-height ~ 8 пунктов, дальше скролл.
  - Разрушающее действие — Menu item Tone=Danger последним, после разделителя.
  - На Compact (мобилка) меню открывается шторкой (Sheet) с Menu item размера L.
- Не делаем: поиск в меню короче 10 пунктов; разные размеры пунктов в одном меню; Danger не последним или без разделителя; меню уже триггера.

## 3. Anatomy
- Корень — вертикальный стек, отступ `space/8`, зазор `space/4`, `radius/control`, ширина `size/menu/min` … `size/menu/max` (на стенде 300 числом).
- Поверхность — слой `overlay surface`, экземпляр _Overlay surface (Kind=Popover): `material/thick/fill` + `material/thick/blur` (в Base — `surface/raised`), обводка `border/subtle` × `border/width/default`, тени `shadow/key` + `shadow/ambient` (Elevation/2).
- `search` — Input (min-width `size/field/min`), только при Search=On.
- Слот Items: `group label` (отступы `space/10` / `space/12`; текст `type/label/sm`, `text/secondary`) → Menu item → `line` — разделитель `border/subtle`.
- Вложено: `_Overlay surface` ×2, `Input` ×2, `Menu item` ×8.
- Служебные слои (вариантов из 2): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент; интерактивны вложенные Menu item и Input.
- Оси State нет: Hover / Pressed / Disabled / Focus — у вложенных Menu item и Input.
- Size=M — пункты 44; Size=L — пункты 56 с крупной иконкой.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | M · L | M |

Матрица полная: 2 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Items | слот | — | 2 из 2 |
| Search | булево | выкл | 2 из 2 |

- Items — слот (Menu item, подписи групп, разделители); Search — по умолчанию Off.

## 6. Content / slots
- Пункты — по правилу Menu item: до 2 строк, дальше многоточие. Подпись группы (`type/label/sm`, `text/secondary`) — одна строка с многоточием (исправлено 2026-11-15; в уже вставленных экземплярах слот хранит старую копию).
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет. На стенде направление не переключается: ar проверен только на обрезку.
- Языки без обрезки по высоте на стенде: de, ar, hi, th, ja, kk.
- Текст 200 %: пункты растут по высоте, обрезки нет; при ширине 300 слова рвутся посреди («Переименов / ать»).

## 7. Events
- `click` / Enter по пункту — действие или выбор; меню закрывается.
- `input` в поиске (Search=On) — фильтр пунктов.
- Esc — закрыть и вернуть фокус на триггер; Tab — закрыть.

## 8. Behavior
- Открытие: fade + scale 0.98 → 1 от точки вызова, 120 мс; закрытие 100 мс. «Уменьшить движение»: длительности ≈ 0.
- Больше ~8 пунктов — скролл внутри меню.
- Compact — Sheet с Menu item L.

## 9. Accessibility
- Триггер — `aria-haspopup` + `aria-expanded`; при открытии фокус на первый пункт.
- Esc — закрыть и вернуть фокус на триггер; Tab — закрыть.
- Пункты — `role="menuitem"` (Menu item).
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`). Кольцо и зоны нажатия — у вложенных Menu item и Input.

## 10. Tokens
- `корень`: интервал `space/4`; maxw `size/menu/max`; мин. ширина `size/menu/min`; отступы `space/8`; радиус `radius/control`.
- `overlay surface`: эффект `material/thick/blur`, `shadow/ambient`, `shadow/key`; заливка / цвет `material/thick/fill`; радиус `radius/control`; обводка `border/subtle`; толщина обводки `border/width/default`.
- `search`: мин. ширина `size/field/min`.
- `group label`: отступы `space/10`, `space/12`.
- `Воркеры`: заливка / цвет `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/sm`.
- `line`: заливка / цвет `border/subtle`.
- Min / max корня: minWidth 160 size/menu/min, maxWidth 320 size/menu/max.
- Значений без переменной: 2 (напр. `(root):w=300`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Набор `Menu`, вариантов 2 из 2; оси: Size.
- Борда: «Menu — борда · шаблон v3», разделов 12.
- Описание: 1258 знаков, разделы: Status: Level: Меню (Dropdown): Когда использовать: Правила: Цвета: A11y: Поиск: Legacy: Motion: Expressive (привязано): Тень:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsMenu>`; Flutter: `DsMenu`.
- Props: `size`: m | l; `items`: string или слот; `search`: boolean = false.

## 14. Acceptance (2026-11-16)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — ширина корня 300 — числом (min / max — токены).
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-15 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; скролл после ~8 пунктов не проверен (в меню 4 пункта); RTL на стенде не зеркалится; кода нет — parity props пропущена.

## 15. Migration
- DS Web Dropdown (Type=Menu / Multiselect / Coins / …) → Menu (Size, Search, пункты Menu item в слоте Items); разбор по типам в описании не дан.

Осталось доделать (после пакета правок beta 2026-11-13):
- Ширина корня 300 — числом; правило «ширина ≥ триггера» в наборе не выражено.
- Max-height → `size/menu/max-height` (320, ~8 пунктов) — привязать после Publish Foundations (заведён 2026-11-16).

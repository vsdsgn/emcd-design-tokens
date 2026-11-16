# Sheet — контракт (2026-11-16)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Sheet`. Status: beta. Level: unknown.
- Figma: Components, страница «Sheet» (`364:3332`), компонент `58:270`. Платформы: Web, Mobile web, iOS, Android.
- Страница «Sheet», организм, один вариант (осей нет; Type=Menu удалён 2026-11-15). Собран из вложенных _Overlay surface (Kind=Sheet), Icon button (крестик) и Button (кнопки Footer); слоты Header actions, Body, Footer (неиспользуемое свойство Items удалено 2026-11-15: меню действий — Menu item L в Body); служебных слоёв нет.

## 2. Intent
- Шторка на Compact (App и мобильный веб): панель от края до края — грабер, шапка с заголовком и крестиком, слот Body, кнопки L на всю ширину в слоте Footer. Меню действий — тот же Sheet с Menu item L в слоте Body.
- Когда использовать: детали объекта, фильтры, выбор, короткие формы и меню действий на Compact (вместо Modal).
- Когда нет: подтверждение опасного действия — Modal; на Web Expanded — Modal / Menu.
- Правило выбора варианта:
  - Show grabber — On, когда шторку можно закрыть свайпом вниз (по умолчанию); Off — на шаге, где свайп запрещён.
  - Show close — On по умолчанию; Off — когда закрытие только кнопкой в Footer или свайпом.
  - Show footer — On, когда есть действие (кнопки L в слоте Footer); Off — просмотр без действия и меню действий.
  - Show header actions — Off по умолчанию; On — дополнительные иконки-действия в шапке (слот Header actions).
  - Меню действий (legacy bottom sheet menu) — слот Body: Menu item L с описанием и разделители, Show footer=Off; отдельного типа и слота нет.
  - Высота по контенту до 90 % высоты экрана, дальше скролл; снизу — Safe area. Предел — доля экрана, а не токен px (решение 2026-11-16).
- Не делаем: подтверждение опасного действия в шторке; шторка на Web Expanded вместо Modal; шторка поверх шторки.

## 3. Anatomy
- Корень — вертикальный стек, зазор `space/16`, отступы `modal/padding` (Web 24, App 16) и `space/8` сверху, `radius/surface`; ширина 375 числом, max `size/sheet/max` (640).
- Поверхность — слой `overlay surface`, экземпляр _Overlay surface (Kind=Sheet): `material/thick/fill` + `material/thick/blur` (в Base — `surface/raised`), тени `shadow/key` + `shadow/ambient` (Elevation/4); обводки нет.
- `grabber` — `border/default`, `radius/chip`.
- `header` (зазор `space/12`): `title` — `font/family/display`, `type/heading/md`, bold, `text/primary`; слот Header actions (зазор `space/4`); `close` — Icon button `control/height/md`.
- Слот Body (зазор `space/12`): образец — `type/body/md`, `text/secondary`. Меню действий — Menu item L в Body.
- `safe area` — снизу, высота `os/safe-area/bottom` (iOS 34, Android 24, Web 0; добавлен 2026-11-15).
- Слот Footer (зазор `space/8`): Button L (`control/height/lg`) на всю ширину.
- Вложено: `_Overlay surface` ×1, `Icon button` ×1, `Button` ×2.
- Служебные слои (вариантов из 1): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 1.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент; интерактивны вложенные Button, Icon button и содержимое слотов.
- Состояний нет: Hover / Pressed / Focus / Disabled — у вложенных Button и Icon button.

## 5. Properties
Осей нет: один компонент.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Title | текст | «Детали выплаты» | 1 из 1 |
| Show grabber | булево | вкл | 1 из 1 |
| Show close | булево | вкл | 1 из 1 |
| Show footer | булево | вкл | 1 из 1 |
| Header actions | слот | — | 1 из 1 |
| Body | слот | — | 1 из 1 |
| Footer | слот | — | 1 из 1 |
| Show header actions | булево | выкл | 1 из 1 |

- Title — текст заголовка; Show grabber, Show close, Show footer — по умолчанию On; Show header actions — Off.
- Header actions, Body, Footer — слоты.

## 6. Content / slots
- Заголовок переносится без ограничения строк, крестик по центру шапки; длинное слово (de) рвётся посреди.
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет. На стенде направление не переключается: ar проверен только на обрезку.
- Языки без обрезки по высоте на стенде: de, ar, hi, th, ja, kk.
- Текст 200 %: заголовок — 2 строки, Body растёт, обрезки нет.

## 7. Events
- Свайп вниз за грабер, тап по затемнению, Назад (Android) или крестик — закрыть.
- `click` по кнопке Footer или пункту меню в Body — действие; шторка закрывается по решению экрана.

## 8. Behavior
- Выезд снизу — 320 мс (App) / 200 мс (Web), out-кривая; закрытие свайпом следует за пальцем. «Уменьшить движение»: fade.
- Высота по контенту до ~90 % экрана, дальше скролл Body; Safe area снизу.

## 9. Accessibility
- `role="dialog"`, `aria-modal="true"`, имя — заголовок; фокус заперт внутри, после закрытия — на триггер.
- Крестик — Icon button с именем («Закрыть»); закрытие доступно без свайпа (крестик, Назад, тап по фону).
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`). Кольцо и зоны нажатия — у вложенных Button и Icon button.

## 10. Tokens
- `корень`: интервал `space/16`; maxw `size/sheet/max`; отступы `modal/padding`, `space/8`; радиус `radius/surface`.
- `overlay surface`: эффект `material/thick/blur`, `shadow/ambient`, `shadow/key`; заливка / цвет `material/thick/fill`; радиус `radius/surface`.
- `grabber`: заливка / цвет `border/default`; радиус `radius/chip`.
- `header`: интервал `space/12`.
- `title`: заливка / цвет `text/primary`; типографика `font-weight/bold`, `font/family/display`, `type/heading/md`.
- `Header actions`: интервал `space/4`.
- `close`: интервал `space/6`; высота `control/height/md`; радиус `radius/control`; ширина `control/height/md`.
- `Body`: интервал `space/12`.
- `Сумма, сеть, адрес и статус транзакции. Контент — в слот Body.`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/md`.
- `Footer`: интервал `space/8`.
- `Button`: заливка / цвет `action/primary/default`, `action/secondary/default`; интервал `space/2`; высота `control/height/lg`; мин. ширина `size/button/min`; отступы `space/12`; радиус `radius/container`.
- Служебные слои (общие правила — `service-layers.md`): `safe area`: высота `os/safe-area/bottom`.
- Min / max корня: maxWidth 640 size/sheet/max.
- Значений без переменной: 1 (напр. `(root):w=375`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Compact: App (iOS, Android) и мобильный веб; на Web Expanded — Modal.
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Компонент `Sheet`; оси: нет.
- Борда: «Sheet — борда · шаблон v3», разделов 11.
- Описание: 1259 знаков, разделы: Status: Level: Правила: A11y: Когда использовать: Поиск: Legacy: Motion: Expressive (привязано): Тень: Поверхность —

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsSheet>`; Flutter: `DsSheet`.
- Props: `title`: string или слот; `showGrabber`: boolean = true; `showClose`: boolean = true; `showFooter`: boolean = true; `headerActions`: string или слот; `body`: string или слот; `footer`: string или слот; `showHeaderActions`: boolean = false.

## 14. Acceptance (2026-11-16)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — ширина корня 375 — числом (max — `size/sheet/max`).
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-15 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; Expressive (`material/thick`), слот Header actions и скролл после ~90 % не проверены; RTL на стенде не зеркалится; кода нет — parity props пропущена.

## 15. Migration
- DS App bottom sheet menu (var = more / send / top up / top up coinhold / exchange / coin change) → Sheet, Menu item L с описанием и разделители в слоте Body; разбор по var в описании не дан.

Осталось доделать (после пакета правок beta 2026-11-13):
- Край шторки без обводки: Light L0 и Dark L3 — только тень (в Dark не видна); вопрос в парковке OPEN-QUESTIONS.

# Toast — контракт (2026-11-24)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Toast`. Status: beta. Level: unknown.
- Figma: Components, страница «Toast» (`364:1389`), набор `1576:2`. Платформы: Web, Mobile web, iOS, Android.
- Панель на базе `_Overlay surface` (замена на месте 13.11): фон, радиус и тень — нераскрытый экземпляр `_Overlay surface` (слой `overlay surface`, Kind=Toast). Snack — отдельный набор, в парковке: в проде — Toast Card / Informer (`docs/migration/prod-refs-2026-11-14.md`).

## 2. Intent
- Краткое всплывающее сообщение поверх страницы — отклик на действие («Настройки сохранены», «Вывод создан»). Исчезает само.
- Когда использовать: подтверждение действия, результат фоновой операции.
- Когда нет: сообщение, которое должно остаться на странице, — Suggest; блокирующий вопрос — Modal; событие без участия пользователя в ленте — Notification.
- Правило выбора варианта:
  - Layout: Card — Web (справа сверху): карточка, иконка статуса, заголовок, необязательные описание и кнопки; Informer — App (сверху под статус-баром): цветная полоса на всю ширину, заголовок и крестик.
  - Tone: Success — выполнено; Info — справка о фоновой операции (цвет бренда — Info = Accent, 2026-11-16); Warning — выполнено с оговоркой; Danger — не выполнено; Neutral — без оценки, у Card без иконки (отличие от Info; 2026-11-16). У Card тон несёт иконка, у Informer — заливка полосы (`status/*/solid`, Neutral — `surface/inverse`).
  - Show description, Actions, Icon, Timer — только Card (привязаны в 5 вариантах из 10; Icon — в 4: у Neutral иконки нет). Timer — оставшееся время автоскрытия (Circle timer у крестика).
  - Safe area — только Informer: полоса под статус-баром (`os/safe-area/top`).
  - Snack (22.11, бывший набор Snack) — App, у нижнего края над Tab bar / Action bar: тёмная плашка 343, одна строка, линейная иконка цвета тона, необязательное действие (Button Text «Отменить»), без крестика и описания. Свойства: Title, Icon, Actions.
  - Close — по умолчанию вкл.
- Не делаем: Informer и Snack на Web; Snack с крестиком или в две строки; больше 3 Toast одновременно; Toast вместо сообщения, которое должно остаться на странице.

## 3. Anatomy
- Корень: зазор `space/12`, отступы `space/12` / `space/16` / `space/20` / `space/48`, радиус `radius/control`, min-ширина `size/toast/min` (280), ширина 400 (Card) / 375 (Informer) числом.
- `overlay surface` — экземпляр `_Overlay surface` (Kind=Toast): Card — `surface/raised`, обводка `border/subtle`, тени `shadow/key` + `shadow/ambient`; Informer — `status/*/solid` / `surface/inverse` (Neutral).
- Card: иконка `media/status/*` → `content` (`title` — `type/label/lg`, `text/primary`; `description` — `type/label/md`, `text/secondary`) → `actions` (вложенные Button, `control/height/sm`); `timer` (Circle timer, `icon/size/sm`) и `close` (Icon button, `control/height/sm`).
- Snack: корень `action/inverse/default`, отступы `space/12` / `space/16`, `radius/control`, тень `shadow/key` + `shadow/ambient`; `icon` 20 (Neutral — `icon/inverse`, остальные — `status/*/solid`) → `title` (`type/label/lg`, `text/inverse`, одна строка) → `action` (Button Text M).
- Informer: `safe area` (`os/safe-area/top`) → `row`: `title` (`text/on-accent`; Warning — `text/on-warning`; Neutral — `text/inverse`) и `close`.
- Вложено: `_Overlay surface` ×10, `media/status/danger` ×1, `Button` ×15, `Icon button` ×10, `Progress circle` ×5, `media/status/info` ×2, `media/status/success` ×1, `media/status/warning` ×1, иконки ×5.
- Служебные слои (вариантов из 15): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 5.

## 4. States
- Группа модели состояний (`docs/components.md`): нет у самого Toast: неинтерактивен; крестик и кнопки — вложенные Icon button / Button со своими состояниями.
- Оси State нет. Появление, пауза и автоскрытие — поведение, не варианты.
- Tone у Card меняет иконку (Neutral — без иконки, 2026-11-16); у Informer — заливку полосы и цвет текста и крестика.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Layout | Card · Informer · Snack | Card |
| Tone | Info · Success · Warning · Danger · Neutral | Info |

Матрица полная: 15 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Title | текст | «Вывод создан» | 15 из 15 |
| Show title | булево | вкл | 5 из 15 |
| Description | текст | «Средства поступят в течение 30 минут. Статус — в истории выплат.» | 5 из 15 |
| Actions | булево | выкл | 10 из 15 |
| Close | булево | вкл | 10 из 15 |
| Icon | булево | вкл | 9 из 15 |
| Show description | булево | вкл | 5 из 15 |
| Timer | булево | выкл | 5 из 15 |
| Safe area | булево | вкл | 5 из 15 |

## 6. Content / slots
- Title — короткий итог действия («Вывод создан»); Description — что дальше. У Card заголовок и описание переносятся, карточка растёт по высоте.
- Informer — только заголовок; при 200 % полоса растёт по высоте (правка 13.11).
- Языки (Card): de, ar, hi, th, ja, kk — перенос, обрезки по высоте нет.
- RTL: порядок зеркалится; стенд RTL не проверяет.

## 7. Events
- Крестик (Close) — Toast закрывается.
- Кнопка в `actions` (Actions) — действие по результату.
- Автоскрытие по таймеру.

## 8. Behavior
- Web — справа сверху, App — сверху под статус-баром; стек до 3, новые сверху, зазор 8.
- Автоскрытие: 5 с, с кнопкой — 8 с; Danger сам не закрывается (описание набора, 13.11). Пауза при наведении и фокусе.
- Фокус не забирает.

## 9. Accessibility
- `role="status"` (polite); для ошибок — `role="alert"`.
- Крестик — кнопка с `aria-label` «Закрыть». Фокус не забирает.
- Тон дублируется текстом и иконкой. Зоны нажатия и кольцо фокуса — у вложенных Button / Icon button.

## 10. Tokens
- `корень`: заливка / цвет `action/inverse/default`; интервал `space/12`; maxw `size/toast/max`; мин. ширина `size/toast/min`; отступы `space/12`, `space/16`, `space/20`, `space/48`; радиус `radius/control`.
- `overlay surface`: эффект `shadow/ambient`, `shadow/key`; заливка / цвет `status/danger/solid`, `status/info/solid`, `status/success/solid`, `status/warning/solid`, `surface/inverse`, `surface/raised`; радиус `radius/control`; обводка `border/subtle`; толщина обводки `border/width/default`.
- `content`: интервал `space/10`; отступы `space/2`.
- `title`: заливка / цвет `text/inverse`, `text/on-accent`, `text/on-warning`, `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`.
- `description`: заливка / цвет `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- `actions`: интервал `space/8`; отступы `space/8`.
- `Button`: заливка / цвет `action/tertiary/default`; интервал `space/4`; высота `control/height/sm`; мин. ширина `size/button/min`; отступы `space/6`; радиус `radius/sm`, `radius/xs`; обводка `control/border/default`; толщина обводки `border/width/default`.
- `close`: интервал `space/6`; высота `control/height/sm`; радиус `radius/sm`; ширина `control/height/sm`.
- `timer`: высота `icon/size/sm`; ширина `icon/size/sm`.
- `row`: интервал `space/12`; отступы `space/12`, `space/16`.
- `icon`: высота `icon/size/md`; ширина `icon/size/md`.
- `action`: интервал `space/4`; мин. ширина `size/button/min`; радиус `radius/xs`.
- Служебные слои (общие правила — `service-layers.md`): `safe area`: высота `os/safe-area/top`.
- Min / max корня: minWidth 280 size/toast/min, maxWidth 400 size/toast/max.
- Значений без переменной: 15 (напр. `(root):w=400`, `(root):w=375`, `(root):w=343`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Card — Web; Informer и Snack — App (iOS · Android). Высота `safe area` — `os/safe-area/top` (на Web 0).
- Пауза автоскрытия по наведению — только с указателем (Web).

## 12. Figma projection
- Набор `Toast`, вариантов 15 из 15; оси: Layout, Tone.
- Борда: «Toast — борда · шаблон v3», разделов 11.
- Описание: 1694 знаков, разделы: Status: Level: Layout: Когда использовать: Правила: A11y: Legacy: Токены: Поверхность —

## 13. Code projection
Код в репо: React `packages/react/src/index.js` (`Toast`), Vue `packages/vue/src/DsToast.vue`, CSS `claude-ds/components/Toast/style.css`; проверка — `npm run test:code`. Прод (DSP / ui-emcd-web, Flutter) — сверка через `scripts/parity.mjs`, когда появится манифест кода.

- Vue: `<DsToast>`; Flutter: `DsToast`.
- Props: `layout`: card | informer | snack; `tone`: info | success | warning | danger | neutral; `title`: string или слот; `showTitle`: boolean = true; `description`: string или слот; `actions`: boolean = false; `close`: boolean = true; `icon`: boolean = true; `showDescription`: boolean = true; `timer`: boolean = false; `safeArea`: boolean = true.

## 14. Acceptance (2026-11-24)
- `audit.plugin.js` — 0 после замены на месте 13.11 (OVERLAY и SERVICE 0); после правок 13.11 (ночь: крестик Informer Neutral `icon/inverse`, полоса Informer по высоте, ряд кнопок Card по центру) не перезапускался.
- `variables-check.plugin.js` — ширина корня 400 / 375 числом.
- `audit-parity.plugin.js` — 0 (13.11, прогон по страницам компонентов).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props с кодом продукта — по манифесту кода, когда он будет; код в репо проверяет `npm run test:code`.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; перепроверка Dark 15.11 пройдена (после принятия в Components `surface/raised` Dark → `neutral/700`): различим на L0–L2; на L3 приподнятая поверхность равна L3 и держится обводкой / тенью — правило, не дефект (Card; Informer — заливка `status/*/solid`); RTL стенд не проверяет; кода нет — parity props пропущена.

## 15. Migration
- DS Web Toast (`base notification`) → Layout=Card; App `informer` → Layout=Informer. Snack вынесен в отдельный набор 2026-11-09, слит обратно как Layout=Snack 2026-11-22 (экземпляры сохранены: варианты перенесены в набор Toast).

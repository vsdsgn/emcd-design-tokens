# Toast — контракт (2026-11-16)

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
  - Close — по умолчанию вкл.
- Не делаем: Informer на Web; больше 3 Toast одновременно; Toast вместо сообщения, которое должно остаться на странице.

## 3. Anatomy
- Корень: зазор `space/12`, отступы `space/12` / `space/16` / `space/20` / `space/48`, радиус `radius/control`, min-ширина `size/toast/min` (280), ширина 400 (Card) / 375 (Informer) числом.
- `overlay surface` — экземпляр `_Overlay surface` (Kind=Toast): Card — `surface/raised`, обводка `border/subtle`, тени `shadow/key` + `shadow/ambient`; Informer — `status/*/solid` / `surface/inverse` (Neutral).
- Card: иконка `media/status/*` → `content` (`title` — `type/label/lg`, `text/primary`; `description` — `type/label/md`, `text/secondary`) → `actions` (вложенные Button, `control/height/sm`); `timer` (Circle timer, `icon/size/sm`) и `close` (Icon button, `control/height/sm`).
- Informer: `safe area` (`os/safe-area/top`) → `row`: `title` (`text/on-accent`; Warning — `text/on-warning`; Neutral — `text/inverse`) и `close`.
- Вложено: `_Overlay surface` ×10, `media/status/info` ×2, `Button` ×10, `Icon button` ×10, `Circle timer` ×5, `media/status/success` ×1, `media/status/warning` ×1, `media/status/danger` ×1.
- Служебные слои (вариантов из 10): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 5.

## 4. States
- Группа модели состояний (`docs/components.md`): нет у самого Toast: неинтерактивен; крестик и кнопки — вложенные Icon button / Button со своими состояниями.
- Оси State нет. Появление, пауза и автоскрытие — поведение, не варианты.
- Tone у Card меняет иконку (Neutral — без иконки, 2026-11-16); у Informer — заливку полосы и цвет текста и крестика.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Layout | Card · Informer | Card |
| Tone | Info · Success · Warning · Danger · Neutral | Info |

Матрица полная: 10 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Title | текст | «Вывод создан» | 10 из 10 |
| Show title | булево | вкл | 5 из 10 |
| Description | текст | «Средства поступят в течение 30 минут. Статус — в истории выплат.» | 5 из 10 |
| Actions | булево | выкл | 5 из 10 |
| Close | булево | вкл | 10 из 10 |
| Icon | булево | вкл | 4 из 10 |
| Show description | булево | вкл | 5 из 10 |
| Timer | булево | выкл | 5 из 10 |
| Safe area | булево | вкл | 5 из 10 |

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
- `корень`: интервал `space/12`; maxw `size/toast/max`; мин. ширина `size/toast/min`; отступы `space/12`, `space/16`, `space/20`, `space/48`; радиус `radius/control`.
- `overlay surface`: эффект `shadow/ambient`, `shadow/key`; заливка / цвет `status/danger/solid`, `status/info/solid`, `status/success/solid`, `status/warning/solid`, `surface/inverse`, `surface/raised`; радиус `radius/control`; обводка `border/subtle`; толщина обводки `border/width/default`.
- `content`: интервал `space/10`; отступы `space/2`.
- `title`: заливка / цвет `text/inverse`, `text/on-accent`, `text/on-warning`, `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`.
- `description`: заливка / цвет `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- `actions`: интервал `space/8`; отступы `space/8`.
- `Button`: заливка / цвет `action/tertiary/default`; интервал `space/2`; высота `control/height/sm`; мин. ширина `size/button/min`; отступы `space/4`, `space/6`; радиус `radius/control-sm`, `radius/xs`; обводка `control/border/default`; толщина обводки `border/width/default`.
- `close`: интервал `space/6`; высота `control/height/sm`; радиус `radius/control-sm`; ширина `control/height/sm`.
- `timer`: высота `icon/size/sm`; ширина `icon/size/sm`.
- `row`: интервал `space/12`; отступы `space/12`, `space/16`.
- Служебные слои (общие правила — `service-layers.md`): `safe area`: высота `os/safe-area/top`.
- Min / max корня: minWidth 280 size/toast/min, maxWidth 400 size/toast/max.
- Значений без переменной: 10 (напр. `(root):w=400`, `(root):w=375`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Card — Web; Informer — App (iOS · Android). Высота `safe area` — `os/safe-area/top` (на Web 0).
- Пауза автоскрытия по наведению — только с указателем (Web).

## 12. Figma projection
- Набор `Toast`, вариантов 10 из 10; оси: Layout, Tone.
- Борда: «Toast — борда · шаблон v3», разделов 11.
- Описание: 1457 знаков, разделы: Status: Level: Когда использовать: Правила: A11y: Legacy: Токены: Поверхность —

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsToast>`; Flutter: `DsToast`.
- Props: `layout`: card | informer; `tone`: info | success | warning | danger | neutral; `title`: string или слот; `showTitle`: boolean = true; `description`: string или слот; `actions`: boolean = false; `close`: boolean = true; `icon`: boolean = true; `showDescription`: boolean = true; `timer`: boolean = false; `safeArea`: boolean = true.

## 14. Acceptance (2026-11-16)
- `audit.plugin.js` — 0 после замены на месте 13.11 (OVERLAY и SERVICE 0); после правок 13.11 (ночь: крестик Informer Neutral `icon/inverse`, полоса Informer по высоте, ряд кнопок Card по центру) не перезапускался.
- `variables-check.plugin.js` — ширина корня 400 / 375 числом.
- `audit-parity.plugin.js` — 0 (13.11, прогон по страницам компонентов).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; перепроверка Dark 15.11 пройдена (после принятия в Components `surface/raised` Dark → `neutral/700`): различим на L0–L2; на L3 приподнятая поверхность равна L3 и держится обводкой / тенью — правило, не дефект (Card; Informer — заливка `status/*/solid`); RTL стенд не проверяет; кода нет — parity props пропущена.

## 15. Migration
- DS Web Toast (`base notification`) → Layout=Card; App `informer` → Layout=Informer. Snack вынесен в отдельный набор 2026-11-09 и запаркован.

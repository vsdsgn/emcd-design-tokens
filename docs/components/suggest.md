# Suggest — контракт (2026-11-16)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Suggest`. Status: beta. Level: unknown.
- Figma: Components, страница «Suggest» (`366:2736`), набор `1577:3185`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Сообщение или предложение внутри страницы: карточка или полоса на всю ширину — иконка слева, заголовок, описание, 0–2 кнопки, крестик. Заменяет Alert и Banner.
- Когда использовать: предложение действия («Создай Watcher link»), объявление («Кошелёк теперь отдельный»), ограничение или предупреждение в контексте.
- Когда нет: краткий отклик на действие — Toast; блокирующий вопрос — Modal; промо-карточка с картинкой — Promo card.
- Правило выбора варианта:
  - Layout: Card — в колонке или карточке, кнопки под текстом; Strip — вверху страницы на всю ширину, кнопки в строку справа.
  - Tone: Neutral — по умолчанию (`surface/raised`); Accent — предложение и информационное объявление (`accent/subtle`; тона Info нет — Info = цвет бренда, 2026-11-16); Success, Warning, Danger — системное объявление (`status/*/subtle`).
  - Primary action / Secondary action: 0, 1 или 2 кнопки; Secondary action без Primary action не включается. Ряд кнопок скрывается вместе с Primary action (13.11).
  - Show title / Show description: хотя бы одно включено. Show leading — левый блок вкл / выкл; Leading — слот: по умолчанию иконка тона, можно логотип продукта или монету (Coin) (слот с 2026-11-16). Close — крестик, если сообщение можно скрыть.
  - Основная кнопка: на Neutral — Secondary, на Accent и тонах Success / Warning / Danger — Primary (на тонированной подложке Secondary сливается; решение 2026-11-16).
- Не делаем: больше двух кнопок; автоскрытие по таймеру (это Toast).

## 3. Anatomy
- Корень: подложка `surface/raised` (Neutral) / `accent/subtle` (Accent) / `status/*/subtle`, обводка `border/subtle` (`border/width/default`), `radius/surface`, отступы `space/16` / `space/12`, справа `space/48` под крестик, зазор `space/16`; ширина 480 (Card) / 960 (Strip) числом.
- Иконка `icon/size/md` по тону (`icon/info`, `icon/check-circle`, `icon/alert-triangle`, `icon/alert-circle`) → `content` (`space/12`): `text` (`space/4`; `title` — `type/label/lg`, `text/primary`; `description` — `type/label/md`, `text/secondary`) и `actions` (`space/8`).
- `primary` — вложенная Button `control/height/sm` (Neutral — Secondary, `action/accent/default`; Accent и тона Success / Warning / Danger — Primary `action/primary/default`, 2026-11-16); `secondary` — Button с обводкой (`action/tertiary/default`, `control/border/default`).
- `close` — Icon button `control/height/sm` в правом верхнем углу.
- Вложено: иконки ×10, `Button` ×20, `Icon button` ×10.
- Служебные слои (вариантов из 10): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет у контейнера: неинтерактивный; состояния — у вложенных Button и крестика.
- Своих состояний нет: показан, пока причина не устранена, или скрыт крестиком. Hover / Pressed / Focus / Disabled — у вложенных кнопок и крестика.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Layout | Card · Strip | Card |
| Tone | Neutral · Accent · Success · Warning · Danger | Neutral |

Матрица полная: 10 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Title | текст | «Кошелёк EMCD Coinhold Wallet — ранее Основной счёт» | 10 из 10 |
| Show title | булево | вкл | 10 из 10 |
| Description | текст | «Теперь у него отдельный адрес, и мы установили его автоматически, чтобы сохранить выплаты» | 10 из 10 |
| Show description | булево | вкл | 10 из 10 |
| Show leading | булево | вкл | 10 из 10 |
| Primary action | булево | вкл | 10 из 10 |
| Secondary action | булево | выкл | 10 из 10 |
| Close | булево | вкл | 10 из 10 |
| Leading | слот | — | 10 из 10 |

## 6. Content / slots
- Title — суть одной фразой; Description — что изменилось и что делать; подпись кнопки — глагол.
- Длинный текст: заголовок и описание переносятся по словам, блок растёт по высоте, усечения нет.
- Языки (de, ar, hi, th, ja, kk): переносы и высота строк без обрезки.
- Текст 200 %: текст переносится, блок растёт, обрезки нет; иконка, крестик и высота кнопок не масштабируются.
- RTL: иконка, текст и кнопки зеркалятся; стенд RTL не проверяет.

## 7. Events
- Primary action, Secondary action — нажатие кнопки.
- Close — нажатие крестика, Suggest скрывается.

## 8. Behavior
- Остаётся на странице, пока причина не устранена; сам не исчезает.
- Движение кнопок — как у Button.

## 9. Accessibility
- `role="region"` с `aria-label`; для Warning и Danger — `role="alert"`.
- Крестик — кнопка с `aria-label` «Закрыть»; иконка дублируется текстом.
- Кнопки достижимы по Tab в порядке чтения. Кольцо фокуса и зоны нажатия — у вложенных Button и крестика.

## 10. Tokens
- `корень`: заливка / цвет `accent/subtle`, `status/danger/subtle`, `status/success/subtle`, `status/warning/subtle`, `surface/raised`; интервал `space/16`; отступы `space/12`, `space/16`, `space/48`; радиус `radius/surface`; обводка `border/subtle`; толщина обводки `border/width/default`.
- `icon/info`: высота `icon/size/md`; ширина `icon/size/md`.
- `content`: интервал `space/12`.
- `text`: интервал `space/4`.
- `title`: заливка / цвет `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`.
- `description`: заливка / цвет `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- `actions`: интервал `space/8`.
- `primary`: заливка / цвет `action/accent/default`, `action/primary/default`; интервал `space/2`; высота `control/height/sm`; мин. ширина `size/button/min`; отступы `space/6`; радиус `radius/control-sm`.
- `secondary`: заливка / цвет `action/tertiary/default`; интервал `space/2`; высота `control/height/sm`; мин. ширина `size/button/min`; отступы `space/6`; радиус `radius/control-sm`; обводка `control/border/default`; толщина обводки `border/width/default`.
- `close`: интервал `space/6`; высота `control/height/sm`; радиус `radius/control-sm`; ширина `control/height/sm`.
- `icon/check-circle`: высота `icon/size/md`; ширина `icon/size/md`.
- `icon/alert-triangle`: высота `icon/size/md`; ширина `icon/size/md`.
- `icon/alert-circle`: высота `icon/size/md`; ширина `icon/size/md`.
- Значений без переменной: 10 (напр. `(root):w=480`, `(root):w=960`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Набор `Suggest`, вариантов 10 из 10; оси: Layout, Tone.
- Борда: «Suggest — борда · шаблон v3», разделов 11.
- Описание: 1510 знаков, разделы: Status: Level: Когда использовать: Правила: A11y: Legacy: Токены:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsSuggest>`; Flutter: `DsSuggest`.
- Props: `layout`: card | strip; `tone`: neutral | accent | success | warning | danger; `title`: string или слот; `showTitle`: boolean = true; `description`: string или слот; `showDescription`: boolean = true; `showLeading`: boolean = true; `primaryAction`: boolean = true; `secondaryAction`: boolean = false; `close`: boolean = true; `leading`: string или слот.

## 14. Acceptance (2026-11-16)
- `audit.plugin.js` — не перезапускался после правок 13.11 (ряд кнопок скрывается с Primary action) и 14.11 (Accent — Button Primary).
- `variables-check.plugin.js` — ширина корня 480 (Card) / 960 (Strip) числом.
- `audit-parity.plugin.js` — 0 (13.11, прогон по страницам компонентов).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; перепроверка Dark 15.11 пройдена (после принятия в Components `surface/raised` Dark → `neutral/700`): различим на L0–L2; на L3 приподнятая поверхность равна L3 и держится обводкой / тенью — правило, не дефект (Neutral; держит обводка `border/subtle`, тени у Suggest нет); Strip в кресте виден только левой частью (ячейка уже 960); RTL стенд не проверяет; кода нет — parity props пропущена.

## 15. Migration
- DS Web Banner, Alert → Suggest (Layout Card | Strip, Tone, Leading, Primary action, Secondary action, Close).
- MAJOR 2026-11-16: тон Info удалён (Info = цвет бренда) — экземпляры Info → Accent.
- MAJOR 2026-11-16: булево Leading → Show leading, иконка — в слоте Leading (оверрайды иконки в макетах сбросятся).
- Продукт: suggest, notifications, banner → Suggest.

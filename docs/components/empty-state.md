# Empty state — контракт (2026-11-19)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Empty state`. Status: beta. Level: unknown.
- Figma: Components, страница «Empty state» (`366:3230`), набор `55:426`. Платформы: Web, Mobile web, iOS, Android.
- Страница «Empty state», организм. Слоты Illustration (иллюстрация из Expressive) и Actions (Button / Link); служебных слоёв у корня нет. Матрица 5 из 6: Size=S только Vertical.

## 2. Intent
- Пустое состояние раздела, списка, таблицы или поиска: объясняет, почему пусто, и что сделать.
- Когда использовать: данных ещё нет (первый вход), всё удалено, фильтр / поиск ничего не нашёл.
- Когда нет: ошибка загрузки — Alert / Banner с «Повторить»; загрузка — Skeleton.
- Правило выбора варианта:
  - Size: L — страница / раздел целиком (иллюстрация, до двух кнопок: Primary M + Secondary M); M — внутри карточки / таблицы (иллюстрация 96, одна Secondary S); S — строка списка / поиска без иллюстрации (Link S «Сбросить фильтры»).
  - Layout: Vertical — по умолчанию; Horizontal — только L и M (у S нет) и только в широкой области (от 560: страница, таблица на всю ширину), где вертикальная заглушка оставляет пустые поля по бокам; в карточке, колонке и на Compact — Vertical (решение 2026-11-16).
  - Dashed background: On — пустая зона внутри страницы (пунктирная рамка); иначе Off.
  - Заголовок — что случилось; текст — что сделать, одно предложение.
  - Иллюстрация — только из Expressive в слот Illustration; кнопки — только в слот Actions.
- Не делаем: Empty state вместо ошибки загрузки или Skeleton; больше двух кнопок; в M — больше одной; иллюстрация в S; текст длиннее одного предложения.

## 3. Anatomy
- Корень — стек (Vertical / Horizontal), отступы `space/16` / `space/32` / `control/padding-x/lg`, зазоры `space/8` / `space/16` / `space/32`; ширина числом (L 560 / 720, M 320 / 520, S 280).
- `dashed background` — пунктир `border/default` × `border/width/default`, `radius/container` (Dashed background = On).
- Слот Illustration — иллюстрация (на стенде — `status/pending`).
- `column` (зазор `space/12` / `space/16`): `title` — `text/primary`, L `type/heading/lg`, M `type/heading/sm` (`font/family/display`, bold), S `type/label/md` (`font/family/text`, medium); `text` — `text/secondary`, `type/body/lg` / `md` / `sm` по размеру.
- Слот Actions — Button (Primary / Secondary, `control/height/md` / `sm`) или Link; зазор `space/8` … `space/16`.
- Вложено: `status/pending` ×4, `Button` ×7.
- Служебные слои (вариантов из 5): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент; интерактивны вложенные Button / Link.
- Оси State нет: Hover / Pressed / Focus / Disabled — у вложенных Button и Link.
- Size=L — крупная иллюстрация и две кнопки M; M — иллюстрация 96 и одна кнопка S; S — без иллюстрации, ссылка.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | L · M · S | L |
| Layout | Horizontal · Vertical | Vertical |

Матрица: 5 из 6.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Title | текст | «Воркеров пока нет» | 5 из 5 |
| Text | текст | «Подключите первое устройство — статистика появится здесь через 10 минут.» | 5 из 5 |
| Show text | булево | вкл | 5 из 5 |
| Show illustration | булево | вкл | 4 из 5 |
| Show actions | булево | вкл | 5 из 5 |
| Illustration | слот | — | 4 из 5 |
| Actions | слот | — | 5 из 5 |
| Dashed background | булево | выкл | 5 из 5 |

- Title, Text — текст; Show text, Show illustration (нет у S), Show actions — по умолчанию On; Dashed background — Off.
- Illustration, Actions — слоты; текст стенда в содержимое слотов не попадает.

## 6. Content / slots
- Заголовок и текст переносятся, не усекаются; в Vertical — по центру, в Horizontal — влево.
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет. На стенде направление не переключается: ar проверен только на обрезку.
- Языки без обрезки по высоте на стенде: de, ar, hi, th, ja, kk (вариант L · Vertical 560 шире ячейки 360 — видна часть).
- Текст 200 %: заголовок и текст растут и переносятся, обрезки по высоте нет; кнопки в слоте масштабируются вразнобой (? артефакт стенда).

## 7. Events
- Своих нет: `click` — у кнопок / ссылки в слоте Actions.

## 8. Behavior
- Статичен; появление вместо контента — без анимации.

## 9. Accessibility
- Заголовок — заголовок уровня раздела.
- Иллюстрация декоративная — `aria-hidden`.
- Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`). Кольцо и зоны нажатия — у вложенных Button / Link.

## 10. Tokens
- `корень`: интервал `space/16`, `space/32`, `space/8`; отступы `control/padding-x/lg`, `space/16`, `space/32`.
- `dashed background`: радиус `radius/container`; обводка `border/default`; толщина обводки `border/width/default`.
- `text`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/lg`, `type/body/md`, `type/body/sm`; интервал `space/4`, `space/8`.
- `title`: заливка / цвет `text/primary`; типографика `font-weight/bold`, `font-weight/medium`, `font/family/display`, `font/family/text`, `type/heading/lg`, `type/heading/sm`, `type/label/md`.
- `Actions`: интервал `space/12`, `space/16`, `space/8`; отступы `space/8`.
- `Button`: заливка / цвет `action/primary/default`, `action/secondary/default`; интервал `space/2`; высота `control/height/md`, `control/height/sm`; мин. ширина `size/button/min`; отступы `space/6`, `space/8`; радиус `radius/control`, `radius/control-sm`.
- `link`: интервал `space/2`; мин. ширина `size/button/min`; отступы `space/4`; радиус `radius/xs`.
- `column`: интервал `space/12`, `space/16`.
- Значений без переменной: 5 (напр. `(root):w=560`, `(root):w=320`, `(root):w=280`, `(root):w=720`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Набор `Empty state`, вариантов 5 из 6; оси: Size, Layout.
- Борда: «Empty state — борда · шаблон v3», разделов 11.
- Описание: 1286 знаков, разделы: Status: Level: Empty state: Когда использовать: Правила: A11y: Поиск: Legacy: Матрица:

## 13. Code projection
Кода в репо пока нет; прод (DSP / ui-emcd-web, Flutter) недоступен (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs`.

- Vue: `<DsEmptyState>`; Flutter: `DsEmptyState`.
- Props: `size`: l | m | s; `layout`: horizontal | vertical; `title`: string или слот; `text`: string или слот; `showText`: boolean = true; `showIllustration`: boolean = true; `showActions`: boolean = true; `illustration`: string или слот; `actions`: string или слот; `dashedBackground`: boolean = false.

## 14. Acceptance (2026-11-19)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — ширина корня числом (560 / 320 / 280 / 720 / 520).
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props с кодом продукта — по манифесту кода, когда он будет; код в репо проверяет `npm run test:code`.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-15 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; L шире ячеек стенда — текст и языки проверены по видимой части; RTL на стенде не зеркалится; кода нет — parity props пропущена.

## 15. Migration
- DS Web empty state (actions, picture slot, position, dashed background) → Empty state: Size L / M / S, Layout Vertical / Horizontal (legacy position), Dashed background, слоты Illustration и Actions.

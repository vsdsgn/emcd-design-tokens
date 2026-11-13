# Notification — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Notification`. Status: beta. Level: unknown.
- Figma: Components, страница «Notification» (`366:2939`), набор `179:620`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Запись в центре уведомлений (колокольчик в шапке): иконка, заголовок, текст и время.
- Когда использовать: событие произошло без участия пользователя — выплата, вход, новость.
- Когда нет: реакция на действие пользователя сейчас — Toast; сообщение в контексте страницы — Alert.
- Правило выбора варианта:
  - Status: Unread — не прочитано (фон + точка, не только цвет); Read — прочитано (без фона и точки). Нажатие помечает прочитанным.
  - State: Default · Hover · Pressed — отклик нажатия на всю запись.
  - Title — до 2 строк; Text — до 3 строк; Time — по локали.
  - Одно действие — вся запись одна цель: нажатие открывает связанный экран.
  - Ширина — `size/toast/min` … `size/toast/max`.
- Не делаем: кнопки и ссылки внутри записи; непрочитанное только цветом, без точки; заголовок длиннее 2 строк.

## 3. Anatomy
- Корень: радиус `radius/control`, отступы `space/12` / `space/16`, зазор `space/12`, max-width `size/toast/max`; у Unread — фон `accent/subtle`.
- `icon` — кружок `surface/raised` (`radius/chip`) с иконкой `icon/size/md` → `content` (зазор `space/4`): `title` (`type/label/md`, `font-weight/medium`, `text/primary`), `text` (`type/body/md`, `text/secondary`), `time` (`type/body/sm`, `text/secondary`) → `unread` — точка `action/primary/default`.
- Служебные: слой `state/layer`, кольцо фокуса, зоны нажатия web / app, безопасное поле — свойства Focus ring, Show hit area, Safe margin.
- Вложено: иконки ×6, `_Hit area` ×12, `_Safe margin` ×6.
- Служебные слои (вариантов из 6): кольцо фокуса 6 · зона Web 6 · зона касания 6 · безопасное поле 6.

## 4. States
- Группа модели состояний (`docs/components.md`): Плашка: слой `state/layer` × `state/hover` / `state/pressed` поверх фона записи; Disabled нет.
- Status: Unread — фон `accent/subtle` + точка справа сверху; Read — без фона и точки. Высота одинаковая.
- State: Default; Hover — слой × `state/hover`; Pressed — слой × `state/pressed`. Status и State независимы (6 вариантов).
- Focus ring — кольцо 2 px снаружи корня, радиус `radius/focus-ring`. Кольцо фокуса — только при навигации с клавиатуры, появляется сразу, без анимации (`service-layers.md`).

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Status | Unread · Read | Unread |
| State | Default · Hover · Pressed | Default |

Матрица полная: 6 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Title | текст | «Выплата отправлена» | 6 из 6 |
| Text | текст | «0,00500000 BTC ушли на адрес bc1q8c ••• x7k2pa» | 6 из 6 |
| Time | текст | «5 окт, 09:25» | 6 из 6 |
| Focus ring | булево | выкл | 6 из 6 · служебное |
| Show hit area | булево | выкл | 6 из 6 · служебное |
| Safe margin | булево | выкл | 6 из 6 · служебное |

## 6. Content / slots
- Длинный текст: заголовок — 2 строки, текст — 3 строки, дальше многоточие. Time — одна строка, короткое значение по локали; длинное обрезается без многоточия.
- Языки: de — длинные слова переносятся по словам, за запись не выходят; ar, hi, th, ja, kk — по высоте не обрезано.
- RTL: порядок слотов зеркалится (иконка ↔ точка), текст — по правому краю; суммы и адреса не зеркалятся.
- Текст 200 %: запись растёт по высоте, обрезки нет; иконка и точка размер не меняют.

## 7. Events
- `click` по записи — открывает связанный экран и помечает запись прочитанной (Unread → Read).

## 8. Behavior
- Hover: слой 0 → 6 %, `motion/duration/feedback` (120 мс), `motion/easing/standard`. «Уменьшить движение»: длительности ≈ 0.
- Pressed: слой → `state/pressed`.
- Unread → Read — по нажатию или по «Отметить все прочитанными» в шапке центра.
- Зоны нажатия web / app (проверка — Show hit area) и безопасное поле (Safe margin) — служебные слои.

## 9. Accessibility
- Список — `role="feed"` или `list`; непрочитанное озвучивается словом («непрочитано»), точка и фон его дублируют.
- Запись — одна цель (кнопка или ссылка); Tab — фокус, Enter (+ Пробел у кнопки) — открыть.
- «Отметить все прочитанными» — кнопка в шапке центра уведомлений.

## 10. Tokens
- `корень`: заливка / цвет `accent/subtle`; интервал `space/12`; maxw `size/toast/max`; отступы `space/12`, `space/16`; радиус `radius/control`.
- `icon`: заливка / цвет `surface/raised`; радиус `radius/chip`.
- `icon/bell-notifications`: высота `icon/size/md`; ширина `icon/size/md`.
- `content`: интервал `space/4`.
- `title`: заливка / цвет `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- `text`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/md`.
- `time`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/sm`.
- `unread`: заливка / цвет `action/primary/default`.
- Служебные слои (общие правила — `service-layers.md`): `focus ring`: радиус `radius/focus-ring`; обводка `border/focus-ring`; толщина обводки `border/width/focus-ring` · `hit area · web`: видимость `touch/is-fine` · `hit area · overlay`: заливка / цвет `status/danger/solid` · `hit area · app`: видимость `touch/is-coarse` · `safe area · outer`: обводка `status/success/solid`; толщина обводки `control/safe-margin` · `state layer`: заливка / цвет `state/layer`; прозрачность `state/hover`, `state/pressed`; радиус `radius/control`.
- Min / max корня: maxWidth 400 size/toast/max.
- Значений без переменной: 12 (напр. `hit area · web:w=400`, `hit area · web:h=108`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Набор `Notification`, вариантов 6 из 6; оси: Status, State.
- Борда: «Notification — борда · шаблон v3», разделов 10.
- Описание: 1119 знаков, разделы: Status: Level: Status: State: A11y: Когда использовать: Правила:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsNotification>`; Flutter: `DsNotification`.
- Props: `status`: unread | read; `title`: string или слот; `text`: string или слот; `time`: string или слот.
- Состояния (Default, Hover, Pressed) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; RTL стенд не проверяет; ось State (Hover / Pressed) и свойства Focus ring / Show hit area / Safe margin добавлены после стенда и им не проверены; код — HTML/CSS.

## 15. Migration
- В описании Figma строки Legacy нет.
- MAJOR: ось State (Unread | Read) → Status (Unread | Read) — в макетах переназначить экземпляры; State теперь — Default | Hover | Pressed. Focus ring, Show hit area, Safe margin — новые.

Осталось доделать (после пакета правок beta 2026-11-13):
- min-width: в описании `size/toast/min`, в наборе привязан только max.
- Кружок `surface/raised` у Read сливается с подложкой в Light · L0 и Dark · L1 — на решение (нужен ли кружок у Read; у Transaction плашка — `action/secondary/default`).
- Иконка одна (колокольчик), свойства замены иконки нет — на решение.

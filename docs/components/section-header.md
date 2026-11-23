# Section header — контракт (2026-11-23)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Section header`. Status: beta. Level: unknown.
- Figma: Components, страница «Section header» (`2342:1340`), набор `2342:1351`. Платформы: Web, Mobile web, iOS, Android.
- Страница «Section header»; новый набор 19.11 (Калькулятор и Настройки App). Вложенных наборов нет: контрол кладётся в слот Trailing. Beta 20.11 по репо: Status в описании набора в Figma меняется отдельно.

## 2. Intent
- Заголовок раздела страницы (L) или секции внутри карточки / формы (M, S): Title, необязательная Caption, слот Trailing справа.
- Когда использовать: разделы страницы на фоне над карточкой — Size L («Площадки», «Устройства» с «К площадкам»; Мониторинг 21.11); секции карточки («Переводить на Coinhold», «Типы уведомлений»), подсекции («Сколько переводить?», «Прогноз доходности»).
- Когда нет: заголовок страницы — Page header (L — на шаг ниже: heading/lg при heading/xl у страницы); шапка виджета — Card / Chart card; подпись поля — Label поля.
- Правило выбора варианта:
  - Size: L — `type/heading/lg`, шрифт заголовков (`font/family/display`), Bold: раздел страницы на фоне (21.11); M — `type/label/lg` (16) Medium: секция карточки; S — `type/label/md` (14) Medium: подсекция.
  - От L до содержимого раздела — `layout/gutter` (patterns 2.2, уровень 8); Trailing у L — Button Text «К разделу».
  - Show caption: On — пояснение под заголовком (`type/body/sm`, `text/secondary`); по умолчанию Off.
  - Show trailing: On — один контрол секции в слоте Trailing: Toggle, Button Text, Badge, Select compact; по умолчанию Off.
  - Своих отступов сверху / снизу нет — ставит родитель (зазор карточки).
- Не делаем: Section header как заголовок страницы или шапка виджета; L внутри карточки; свои отступы сверху / снизу; заголовок секции простым текстом там, где есть набор.

## 3. Anatomy
- Корень — ряд, зазор `space/16` между текстом и Trailing, Trailing по центру по высоте; ширина образца 360 числом.
- `text` — вертикальный стек: зазор `space/4` (M) / `space/2` (S); занимает остаток ширины.
- `title` — `text/primary`: L `font/family/display` Bold `type/heading/lg`; M / S `font/family/text` Medium `type/label/lg` / `type/label/md`.
- `caption` — `font/family/text`, `type/body/sm`, `text/secondary` (Show caption).
- Слот `Trailing` — зазор `space/12`, не сжимается (Show trailing).
- Служебные слои (вариантов из 3): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент; интерактивно содержимое Trailing.
- Оси State нет: состояния — у контрола в Trailing.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | M · S · L | M |

Матрица полная: 3 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Trailing | слот | — | 2 из 3 |
| Title | текст | «Прогноз доходности» | 2 из 3 |
| Caption | текст | «Расчёт по текущему курсу» | 2 из 3 |
| Show caption | булево | выкл | 2 из 3 |
| Show trailing | булево | выкл | 2 из 3 |

- Title, Caption — текст; Show caption, Show trailing — по умолчанию Off; Trailing — слот.

## 6. Content / slots
- Title и Caption переносятся, не усекаются (в коде `overflow-wrap: anywhere`); Trailing не сжимается.
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет.

## 7. Events
- Своих нет: события — у контрола в Trailing (Toggle, Button, Select compact).

## 8. Behavior
- Статичен.

## 9. Accessibility
- Title — настоящий заголовок `h2`–`h4` (`level`, по умолчанию `h3`): секции видны в навигации читалки по заголовкам.
- Контрол в Trailing подписан своим текстом (Toggle — с именем секции).

## 10. Tokens
- `корень`: интервал `space/16`.
- `text`: интервал `space/2`, `space/4`.
- `title`: заливка / цвет `text/primary`; типографика `font-weight/bold`, `font/family/display`, `font/family/text`, `type/heading/lg`, `type/label/lg`, `type/label/md`.
- `caption`: заливка / цвет `text/secondary`; типографика `font/family/text`, `type/body/sm`.
- `Trailing`: интервал `space/12`.
- Значений без переменной: 3 (напр. `(root):w=360`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Набор `Section header`, вариантов 3 из 3; оси: Size.
- Борда: «Section header — борда · шаблон v3», разделов 11.
- Описание: 1312 знаков, разделы: Status: Level: Size: Когда нет: Правила: A11y: Поиск: Когда использовать: Beta (20.

## 13. Code projection
Код в репо: React `packages/react/src/index.js` (`SectionHeader`), Vue `packages/vue/src/DsSectionHeader.vue`, CSS `claude-ds/components/SectionHeader/style.css`; проверка — `npm run test:code`. Прод (DSP / ui-emcd-web, Flutter) — сверка через `scripts/parity.mjs`, когда появится манифест кода.

- Vue: `<DsSectionHeader>`; Flutter: `DsSectionHeader`.
- Props: `size`: m | s | l; `trailing`: string или слот; `title`: string или слот; `caption`: string или слот; `showCaption`: boolean = false; `showTrailing`: boolean = false.
- `level` — уровень заголовка 2–4 (по умолчанию `h3`); `trailing` или `children` — слот; `showCaption` / `showTrailing` по умолчанию — есть ли содержимое.

## 14. Acceptance (2026-11-23)
- `audit.plugin.js` — не прогонялся: перевод в beta 20.11 по репо (код, README, `docs/patterns.md`); плагины — вместе с правкой описания набора в Figma.
- `variables-check.plugin.js` — не прогонялся: перевод в beta 20.11 по репо (код, README, `docs/patterns.md`); плагины — вместе с правкой описания набора в Figma.
- `audit-parity.plugin.js` — не прогонялся: перевод в beta 20.11 по репо (код, README, `docs/patterns.md`); плагины — вместе с правкой описания набора в Figma.
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props с кодом продукта — по манифесту кода, когда он будет; код в репо проверяет `npm run test:code`.
- Не проверено: стенд (Light / Dark × бренды × платформы × L0–L3, длинный текст, 6 языков, 200 %, RTL); код есть (React / Vue / CSS), манифеста кода нет — parity props пропущена.

## 15. Migration
- Legacy нет: новое 19.11 (Калькулятор, Настройки App). Заголовки секций текстом на `type/label/*` в экранах «Настройки · Уведомления», «Настройки · Вывод», «Watcher-link» — заменить на Section header после Publish (`docs/patterns.md`).

Осталось доделать (после пакета правок beta 2026-11-13):
- Figma: Status в описании набора → beta; добавить раздел «Когда использовать:» (draft-audit DESC).
- Плагины audit / variables-check / audit-parity и стенд.

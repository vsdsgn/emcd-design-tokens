# Progress — контракт (2026-11-19)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Progress`. Status: beta. Level: unknown.
- Figma: Components, страница «Progress» (`366:3115`), набор `56:376`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Линейный прогресс: доля выполненного, когда длительность или объём известны (лимит вывода, заполненность, шаг загрузки файла, срок до выплаты).
- Когда использовать: известно «сколько из скольких».
- Когда нет: неизвестная длительность в кнопке или небольшом блоке — Spinner (линия во всю ширину блока — Mode=Indeterminate); загрузка контента — Skeleton; шаги мастера — Stepper; мало места или прогресс — главное на карточке — Progress circle.
- Правило выбора варианта:
  - Size: S (дорожка 4) — внутри строк и карточек; M (дорожка 8) — отдельный блок.
  - Tone: Accent — нейтральный прогресс; Success — цель достигнута; Warning — близко к лимиту (≥ 80 %); Danger — лимит превышен.
  - Ширина `fill` = доля (в макете растянуть слой `fill`; constraints Scale).
  - Show label: On — подпись слева и значение справа над дорожкой; Off — только дорожка, когда подпись и значение уже есть у родителя.
  - Mode: Determinate — доля известна; Indeterminate — доля неизвестна: отрезок 40 % бежит по дорожке, значения нет; только Tone=Accent (матрица 10 из 16; добавлено 2026-11-16).

## 3. Anatomy
- Корень — вертикальный стек, зазор `space/8`.
- `label row` (`space/8`): `label` (`text/primary`, `type/label/md`, `font-weight/medium`) слева, `value` (`text/secondary`, `font/family/text` (табличные цифры; моно снято 17.11), `type/body/md`) справа.
- `track` — дорожка `control/track`, высота `size/track/sm` (S) / `size/track/md` (M), `radius/chip`; `fill` — заполнение той же высоты: Accent — `control/checked`, остальные — `status/{success|warning|danger}/solid`.
- Служебные слои (вариантов из 10): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент.
- Состояний нет. Смысл несёт Tone; доля — ширина `fill`.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | S · M | S |
| Tone | Accent · Success · Warning · Danger | Accent |
| Mode | Determinate · Indeterminate | — |

Матрица: 10 из 16.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Label | текст | «Лимит вывода» | 8 из 10 |
| Value | текст | «6 000 / 10 000 USDT» | 8 из 10 |
| Show label | булево | вкл | 8 из 10 |

## 6. Content / slots
- Label — что измеряем («Лимит вывода»); Value — «сколько из скольких» с единицей («6 000 / 10 000 USDT»).
- Длинный текст: `label` — одна строка, занимает остаток строки, усечение многоточием; `value` — по содержимому, max-width 200, усечение многоточием. Полный текст — в `title` / тултипе.
- Языки (de, ar, hi, th, ja, kk): по высоте строки не обрезаются; длинное слово усекается по тому же правилу.
- RTL: подпись и значение меняются местами, заполнение идёт справа налево; числа и тикер не зеркалятся.
- Текст 200 %: строка подписи растёт по высоте; подпись и значение усекаются, наложения нет.

## 7. Events
- Нет.

## 8. Behavior
- Изменение значения — 300 мс, standard.
- Неопределённый режим — бегущий отрезок 1.5 с; «Уменьшить движение» — статичный.

## 9. Accessibility
- `role="progressbar"`, `aria-valuenow` / `aria-valuemin` / `aria-valuemax`, `aria-label` = Label.
- Тон не единственный носитель смысла: значение стоит текстом в `label row`; при Show label = Off текст даёт родитель.
- Контраст заливки с дорожкой в Dark ниже 3:1 у всех тонов, кроме Warning (Success 2.5 / Accent 2.7 / Danger 2.7 на L0, на L3 — 1.7–1.9; замер 2026-11-16), с поверхностью ≥ 3:1 (Success на L3 — 2.9). Поэтому значение всегда дублируется текстом (подпись процента или `aria-valuenow` + видимый итог) — WCAG 1.4.11 выполняется через текст; Success на L3 не ставить.

## 10. Tokens
- `корень`: интервал `space/8`.
- `label row`: интервал `space/8`.
- `label`: заливка / цвет `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- `value`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/md`.
- `track`: заливка / цвет `control/track`; высота `size/track/md`, `size/track/sm`; радиус `radius/chip`.
- `fill`: заливка / цвет `control/checked`, `status/danger/solid`, `status/success/solid`, `status/warning/solid`; высота `size/track/md`, `size/track/sm`; радиус `radius/chip`.
- Значений без переменной: 10 (напр. `(root):w=320`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Набор `Progress`, вариантов 10 из 16; оси: Size, Tone, Mode.
- Борда: «Progress — борда · шаблон v3», разделов 11.
- Описание: 922 знаков, разделы: Status: Level: Progress: Когда использовать: Правила: A11y: Поиск: Legacy: Motion:

## 13. Code projection
Код в репо: React `packages/react/src/index.js` (`Progress`), Vue `packages/vue/src/DsProgress.vue`, CSS `claude-ds/components/Progress/style.css`; проверка — `npm run test:code`. Прод (DSP / ui-emcd-web, Flutter) — сверка через `scripts/parity.mjs`, когда появится манифест кода.

- Vue: `<DsProgress>`; Flutter: `DsProgress`.
- Props: `size`: s | m; `tone`: accent | success | warning | danger; `mode`: determinate | indeterminate; `label`: string или слот; `value`: string или слот; `showLabel`: boolean = true.

## 14. Acceptance (2026-11-19)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — только реестр: maxWidth текстового слоя числом (value 200).
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props с кодом продукта — по манифесту кода, когда он будет; код в репо проверяет `npm run test:code`.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; RTL стенд не проверяет; доля показана одна (60 %), 0 %, 100 % и неопределённый режим не показаны; кода нет — parity props пропущена.

## 15. Migration
- DS App `Progress` → Progress (линейный); DS Web — нет. Tone, Size, Label, Value, Show label — по набору 2.0; высоту дорожки и подписи сверить с DS App.

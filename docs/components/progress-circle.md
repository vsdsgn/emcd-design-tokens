# Progress circle — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Progress circle`. Status: beta. Level: unknown.
- Figma: Components, страница «Progress» (`366:3115`), набор `56:388`. Платформы: Web, Mobile web, iOS, Android.
- Лежит на странице Progress.

## 2. Intent
- Круговой прогресс: известная доля, когда места мало или прогресс — главное на карточке (заполнение пула, выполнение задания).
- Когда использовать: известная доля 0–100 % в тесном месте или как главный элемент карточки.
- Когда нет: длительность неизвестна — Spinner; есть место в ширину — Progress; загрузка данных — Skeleton.
- Правило выбора варианта:
  - Size: S 24 — без подписи, в строке рядом с текстом; M 48 и L 72 — с процентом в центре.
  - Цвет дуги — акцент; статусные цвета — только вместе с текстом статуса.
  - Значение 0–100 %.
- Не делаем: анимация «туда-обратно»; значение вне 0–100 %; подпись у S.

## 3. Anatomy
- Корень, `track` и `fill` — `size/progress-circle/sm` / `md` / `lg` по Size.
- `track` — кольцо `control/track`; `fill` — дуга `control/checked`, угол меняется в Arc (Ellipse → Arc, End).
- `value` — процент в центре (`text/primary`, `font/family/mono`; M — `type/body/sm`, L — `type/body/md`); у S нет.
- Служебные слои (вариантов из 3): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент.
- Состояний нет. Доля — угол дуги `fill`.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | S · M · L | S |

Матрица полная: 3 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Value | текст | «60%» | 2 из 3 |

- Value привязано у M и L; у S текста нет.

## 6. Content / slots
- Value — процент («60%»), от языка не зависит, не переводится и не зеркалится в RTL.
- Длинный текст не передаётся: значение — число 0–100 со знаком %.
- Текст 200 %: у L процент помещается впритык; у M налезает на кольцо (см. todo).

## 7. Events
- Нет.

## 8. Behavior
- Изменение значения — 300 мс, standard.

## 9. Accessibility
- `role="progressbar"`, `aria-valuenow`.
- S без подписи: значение текстом даёт соседняя строка.

## 10. Tokens
- `корень`: высота `size/progress-circle/lg`, `size/progress-circle/md`, `size/progress-circle/sm`; ширина `size/progress-circle/lg`, `size/progress-circle/md`, `size/progress-circle/sm`.
- `track`: заливка / цвет `control/track`; высота `size/progress-circle/lg`, `size/progress-circle/md`, `size/progress-circle/sm`; ширина `size/progress-circle/lg`, `size/progress-circle/md`, `size/progress-circle/sm`.
- `fill`: заливка / цвет `control/checked`; высота `size/progress-circle/lg`, `size/progress-circle/md`, `size/progress-circle/sm`; ширина `size/progress-circle/lg`, `size/progress-circle/md`, `size/progress-circle/sm`.
- `value`: заливка / цвет `text/primary`; типографика `font-weight/regular`, `font/family/mono`, `type/body/md`, `type/body/sm`.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Набор `Progress circle`, вариантов 3 из 3; оси: Size.
- Борда: «Progress — борда · шаблон v3», разделов 9.
- Описание: 958 знаков, разделы: Status: Level: Круговой прогресс: S 24 — A11y: Поиск: Legacy: Motion: Когда использовать: Правила:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsProgressCircle>`; Flutter: `DsProgressCircle`.
- Props: `size`: s | m | l; `value`: string или слот.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; RTL стенд не проверяет; длинный текст и языки — только на S (без текста), булевых свойств нет; кода нет — parity props пропущена.

## 15. Migration
- DS Web `CIrcle loader` → Progress circle (Size S | M | L, Value); для неизвестной длительности — Spinner.

Осталось доделать (после пакета правок beta 2026-11-13):
- Size=M при тексте 200 %: «60%» налезает на кольцо — правило (M → L при крупном тексте) или правка в Figma.

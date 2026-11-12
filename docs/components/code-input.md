# Code input — контракт · draft (2026-11-12)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Code input`. Status: draft. Level: molecule.
- Figma: Components, страница «Code input» (`353:2852`), набор `111:1379`.

## 2. Intent
- Ввод одноразового кода: 2FA при выводе и входе, код из пуш-уведомления, SMS, почты. Подтверждение — автоматически, когда введена последняя цифра (кнопка «Подтвердить» остаётся для…
- Когда использовать: не описано
- Когда нет: не описано
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `cells`, `Code cell`, `message`.
- Вложено: `Code cell` ×40.
- Служебные слои (вариантов из 8): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Ось State: Default · Error · Success · Disabled. Группа модели состояний (`docs/components.md`) — определить при переводе в beta.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Length | 4 · 6 | — |
| State | Default · Error · Success · Disabled | — |

Матрица полная: 8 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Message | текст | «Отправить код повторно через 0:45» | 8 из 8 |
| Show message | булево | вкл | 8 из 8 |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- role=group с подписью («Код из уведомления»), ячейки — «цифра N из M»; сообщение — aria-describedby, ошибка — role=alert.

## 10. Tokens
- `корень`: интервал `space/12`.
- `cells`: интервал `space/16`, `space/8`.
- `Code cell`: заливка / цвет `control/surface/default`, `control/surface/disabled`; радиус `radius/control`; обводка `control/border/default`, `control/border/disabled`, `control/border/error`, `control/border/focus`, `status/success/solid`; толщина обводки `border/width/default`, `border/width/focus`.
- `message`: заливка / цвет `text/danger`, `text/disabled`, `text/secondary`, `text/success`; типографика `font-weight/medium`, `font/family/text`, `type/label/sm`.
- Min / max корня: maxWidth 400 числом.

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Code input`, вариантов 8 из 8; оси: Length, State.
- Борда: «Code input — борда · шаблон v3», разделов 11.
- Описание: 1470 знаков, разделы: Status: Level: Ввод одноразового кода: Основа — Поведение (для кода): Движение: A11y: Motion: Поиск: Legacy:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsCodeInput>`; Flutter: `DsCodeInput`.
- Props: `length`: 4 | 6; `message`: string или слот; `showMessage`: boolean = true.
- Состояния (Default, Error, Success, Disabled) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-12)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - DESC: нет: Когда использовать:, Правила:
  - MINMAX: maxw=400
  - BOARD: нет разделов 05, 07

## 15. Migration
- Legacy: «Введи код из пуш уведомления» (Web App → ✅ Безопасность → Подтверждение операции).

# Section header — контракт · draft (2026-11-19)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Section header`. Status: draft. Level: unknown.
- Figma: Components, страница «Section header» (`2342:1340`), набор `2342:1351`.

## 2. Intent
- Заголовок секции внутри карточки или формы: Title, необязательная Caption, слот Trailing (Toggle, Button Text, Badge, Select compact). Size: M — label/lg 16; S — label/md 14.
- Когда использовать: секции карточки («Переводить на Coinhold», «Типы уведомлений»), подсекции («Сколько переводить?»)
- Когда нет: заголовок страницы — Page header; шапка виджета — Card / Chart card; подпись поля — Label
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `text`, `title`, `caption`, `Trailing`.
- Служебные слои (вариантов из 2): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | M · S | — |

Матрица полная: 2 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Trailing | слот | — | 2 из 2 |
| Title | текст | «Прогноз доходности» | 2 из 2 |
| Caption | текст | «Расчёт по текущему курсу» | 2 из 2 |
| Show caption | булево | выкл | 2 из 2 |
| Show trailing | булево | выкл | 2 из 2 |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- Title — заголовок уровня секции (h3 / h4)

## 10. Tokens
- `корень`: интервал `space/16`.
- `text`: интервал `space/2`, `space/4`.
- `title`: заливка / цвет `text/primary`; типографика `font/family/text`, `type/label/lg`, `type/label/md`.
- `caption`: заливка / цвет `text/secondary`; типографика `font/family/text`, `type/body/sm`.
- `Trailing`: интервал `space/12`.
- Значений без переменной: 2 (напр. `(root):w=360`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Section header`, вариантов 2 из 2; оси: Size.
- Борда: «Section header — борда · шаблон v3», разделов 8.
- Описание: 857 знаков, разделы: Status: Level: Size: Когда нет: Правила: A11y: Поиск:

## 13. Code projection
Код в репо: React `packages/react/src/index.js` (`SectionHeader`), Vue `packages/vue/src/DsSectionHeader.vue`, CSS `claude-ds/components/SectionHeader/style.css`; проверка — `npm run test:code`. Прод (DSP / ui-emcd-web, Flutter) — сверка через `scripts/parity.mjs`, когда появится манифест кода.

- Vue: `<DsSectionHeader>`; Flutter: `DsSectionHeader`.
- Props: `size`: m | s; `trailing`: string или слот; `title`: string или слот; `caption`: string или слот; `showCaption`: boolean = false; `showTrailing`: boolean = false.

## 14. Acceptance (2026-11-19)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - DESC: нет: Когда использовать:

## 15. Migration
- Legacy: — (новое 19.11, по Калькулятору и Настройкам)

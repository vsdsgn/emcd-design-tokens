# Top bar — контракт · draft (2026-11-20)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Top bar`. Status: draft. Level: unknown.
- Figma: Components, страница «Top bar» (`2312:2`), набор `2312:35`.

## 2. Intent
- Верхняя панель корневых экранов: Platform Mobile web — слот Logo (по умолчанию — Logo · Network=EMCD, Style=Mono, 24), аккаунт (имя + шеврон), баланс (копейки text/tertiary) и Icon button «Меню»; App (19.11) — Select compact аккаунта (без leading) в начале, Select compact монеты (Coin stack) и Icon button Tertiary M «+» («Подключить») в конце, без логотипа, баланса и меню; высота 56, поля 8 / 16, зазор App 8. Код: `platform` mobile-web · app; App — `account`, `coin` / `coins`, `onAdd`.
- Когда использовать: корневые экраны мобильного веба и App, над Tabs M разделов
- Когда нет: Web — Sidebar + шапка страницы
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `account`, `account name`, `balance`, `cents`, `menu`, `end`, `coin`, `add`.
- Вложено: `Logo` ×1, иконки ×2, `Icon button` ×2, `Select compact` ×2.
- Служебные слои (вариантов из 2): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Platform | Mobile web · App | — |

Матрица полная: 2 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Logo | слот | — | 1 из 2 |
| Account | текст | «Alexandrewang» | 1 из 2 |
| Balance | текст | «$123 456» | 1 из 2 |
| Cents | текст | «.78» | 1 из 2 |
| Show balance | булево | вкл | 1 из 2 |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- «Меню» — кнопка с подписью; баланс — одной фразой

## 10. Tokens
- `корень`: заливка / цвет `surface/level-0`; интервал `space/12`, `space/8`; отступы `space/16`, `space/8`.
- `account`: заливка / цвет `action/secondary/default`; интервал `space/16`, `space/4`; высота `size/row/compact`; maxw `size/select-compact/max`; отступы `space/8`; радиус `radius/control-sm`.
- `account name`: заливка / цвет `text/primary`; типографика `type/label/lg`.
- `balance`: заливка / цвет `text/primary`; типографика `type/label/lg`; интервал `space/4`.
- `cents`: заливка / цвет `text/tertiary`; типографика `type/label/lg`.
- `menu`: интервал `space/6`; высота `control/height/md`; радиус `radius/control`; ширина `control/height/md`.
- `end`: интервал `space/8`.
- `coin`: заливка / цвет `action/secondary/default`; интервал `space/16`; высота `size/row/compact`; maxw `size/select-compact/max`; отступы `space/8`; радиус `radius/control-sm`.
- `add`: заливка / цвет `action/secondary/default`; интервал `space/6`; высота `control/height/md`; радиус `radius/control`; ширина `control/height/md`.
- Значений без переменной: 4 (напр. `(root):w=375`, `(root):h=56`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Top bar`, вариантов 2 из 2; оси: Platform.
- Борда: «Top bar — борда · шаблон v3», разделов 9.
- Описание: 994 знаков, разделы: Status: Level: Под ней — Platform: Правила: Поиск:

## 13. Code projection
Код в репо: React `packages/react/src/index.js` (`TopBar`), Vue `packages/vue/src/DsTopBar.vue`, CSS `claude-ds/components/TopBar/style.css`; проверка — `npm run test:code`. Прод (DSP / ui-emcd-web, Flutter) — сверка через `scripts/parity.mjs`, когда появится манифест кода.

- Vue: `<DsTopBar>`; Flutter: `DsTopBar`.
- Props: `platform`: mobile-web | app; `logo`: string или слот; `account`: string или слот; `balance`: string или слот; `cents`: string или слот; `showBalance`: boolean = true.

## 14. Acceptance (2026-11-20)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - DESC: нет: Когда использовать:, A11y:

## 15. Migration
- Legacy: мобильный веб — шапка с балансом, аккаунтом и бургером

# Top bar — контракт · draft (2026-11-19)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Top bar`. Status: draft. Level: unknown.
- Figma: Components, страница «Top bar» (`2312:2`), набор `2312:35`.

## 2. Intent
- Верхняя панель мобильного веба: слот Logo, аккаунт (имя + шеврон), баланс (копейки text/tertiary) и Icon button «Меню». Platform: Mobile web (App — следующим вариантом).
- Когда использовать: корневые экраны мобильного веба, над Tabs M разделов
- Когда нет: Web — Sidebar + шапка страницы; App — Top bar App (план)
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `logo (placeholder)`, `account`, `account name`, `balance`, `cents`, `menu`.
- Вложено: иконки ×2, `Icon button` ×1.
- Служебные слои (вариантов из 1): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Platform | Mobile web | — |

Матрица полная: 1 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Logo | слот | — | 1 из 1 |
| Account | текст | «Alexandrewang» | 1 из 1 |
| Balance | текст | «$123 456» | 1 из 1 |
| Cents | текст | «.78» | 1 из 1 |
| Show balance | булево | вкл | 1 из 1 |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- «Меню» — кнопка с подписью; баланс — одной фразой

## 10. Tokens
- `корень`: заливка / цвет `surface/level-0`; интервал `space/12`; отступы `space/16`, `space/8`.
- `logo (placeholder)`: заливка / цвет `text/primary`; типографика `font-weight/bold`, `font/family/display`, `type/heading/lg`.
- `account`: интервал `space/4`.
- `account name`: заливка / цвет `text/primary`; типографика `type/label/lg`.
- `balance`: заливка / цвет `text/primary`; типографика `type/label/lg`; интервал `space/4`.
- `cents`: заливка / цвет `text/tertiary`; типографика `type/label/lg`.
- `menu`: интервал `space/6`; высота `control/height/md`; радиус `radius/control`; ширина `control/height/md`.
- Значений без переменной: 2 (напр. `(root):w=375`, `(root):h=56`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Top bar`, вариантов 1 из 1; оси: Platform.
- Борда: шаблона v3 нет.
- Описание: 846 знаков, разделы: Status: Level: Под ней — Platform: Правила: Поиск:

## 13. Code projection
Кода в репо пока нет; прод (DSP / ui-emcd-web, Flutter) недоступен (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs`.

- Vue: `<DsTopBar>`; Flutter: `DsTopBar`.
- Props: `platform`: mobile-web; `logo`: string или слот; `account`: string или слот; `balance`: string или слот; `cents`: string или слот; `showBalance`: boolean = true.

## 14. Acceptance (2026-11-19)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - DESC: нет: Когда использовать:, A11y:
  - BOARD: нет борды v3

## 15. Migration
- Legacy: мобильный веб — шапка с балансом, аккаунтом и бургером

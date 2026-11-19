# Action bar — контракт · draft (2026-11-19)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Action bar`. Status: draft. Level: unknown.
- Figma: Components, страница «Action bar» (`2311:2`), набор `2311:70`.

## 2. Intent
- Нижняя панель действий Compact: 1–2 Button M на всю ширину, подложка surface/level-0, прилипает к низу. Actions: 1 — главное действие; 2 — два равных.
- Когда использовать: «Подключить / Создать группу», «Фильтры / Выгрузить» на мобильном вебе
- Когда нет: экраны с Tab bar; Web — действия в шапке или тулбаре
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `action 1`, `action 2`.
- Вложено: `Button` ×3.
- Служебные слои (вариантов из 2): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Actions | 1 · 2 | — |

Матрица полная: 2 вариантов.

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- порядок фокуса после контента; бейдж автодействия озвучивается

## 10. Tokens
- `корень`: заливка / цвет `surface/level-0`; интервал `space/8`; отступы `space/16`, `space/32`.
- `action 1`: заливка / цвет `action/primary/default`, `action/secondary/default`; интервал `space/4`; высота `control/height/md`; мин. ширина `size/button/min`; отступы `space/12`; радиус `radius/control`.
- `action 2`: заливка / цвет `action/secondary/default`; интервал `space/4`; высота `control/height/md`; мин. ширина `size/button/min`; отступы `space/12`; радиус `radius/control`.
- Значений без переменной: 4 (напр. `(root):w=375`, `(root):h=80`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Action bar`, вариантов 2 из 2; оси: Actions.
- Борда: шаблона v3 нет.
- Описание: 839 знаков, разделы: Status: Level: Actions: Правила: Когда нет: Поиск:

## 13. Code projection
Код в репо: React `packages/react/src/index.js` (`ActionBar`), Vue `packages/vue/src/DsActionBar.vue`, CSS `claude-ds/components/ActionBar/style.css`; проверка — `npm run test:code`. Прод (DSP / ui-emcd-web, Flutter) — сверка через `scripts/parity.mjs`, когда появится манифест кода.

- Vue: `<DsActionBar>`; Flutter: `DsActionBar`.
- Props: `actions`: 1 | 2.

## 14. Acceptance (2026-11-19)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - DESC: нет: Когда использовать:, A11y:
  - BOARD: нет борды v3

## 15. Migration
- Legacy: мобильный веб «Воркеры», «История» — нижние кнопки

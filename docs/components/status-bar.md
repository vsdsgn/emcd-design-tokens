# Status bar — контракт · draft (2026-11-24)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Status bar`. Status: draft. Level: unknown.
- Figma: Components, страница «Status bar» (`2385:2`), компонент `2385:3`.

## 2. Intent
- Полоса статусов парка: подпись, дорожка из сегментов по статусам (Danger → Warning → Success → Neutral, ширина — доля, минимум 8; дорожка — слот Track, ширины задаются на экземпляре) и легенда «Status + число». Новый набор 21.11 (Мониторинг «Главная», B2B Analytics «Workers»).
- Когда использовать: сводка парка устройств / воркеров по статусам на дашборде; счётчики статусов у таблицы (только легенда).
- Когда нет: одна доля «занято / всего» — Progress; 2–3 статуса крупными числами с переходом — Status summary; динамика — Chart card.
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `caption`, `Track`, `segment · Danger`, `segment · Warning`, `segment · Success`, `segment · Neutral`, `legend`, `item · Danger`, `status · Danger`, `value`, `item · Warning`, `status · Warning`, `item · Success`, `status · Success`, `item · Neutral`, `status · Neutral`.
- Вложено: `Status` ×4.
- Служебные слои (вариантов из 1): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Осей нет: один компонент.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Caption | текст | «Статусы активных устройств» | 1 из 1 |
| Show caption | булево | вкл | 1 из 1 |
| Show legend | булево | вкл | 1 из 1 |
| Danger value | текст | «1 000» | 1 из 1 |
| Show danger | булево | вкл | 1 из 1 |
| Warning value | текст | «3 000» | 1 из 1 |
| Show warning | булево | вкл | 1 из 1 |
| Success value | текст | «16 500» | 1 из 1 |
| Show success | булево | вкл | 1 из 1 |
| Neutral value | текст | «61» | 1 из 1 |
| Show neutral | булево | вкл | 1 из 1 |
| Track | слот | — | 1 из 1 |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- дорожка — role=img с текстом всех статусов; легенда — текст, не только цвет.

## 10. Tokens
- `корень`: интервал `space/12`.
- `caption`: заливка / цвет `text/tertiary`; типографика `font/family/text`, `type/label/sm`.
- `Track`: интервал `space/4`.
- `segment · Danger`: заливка / цвет `status/danger/solid`.
- `segment · Warning`: заливка / цвет `status/warning/solid`.
- `segment · Success`: заливка / цвет `status/success/solid`.
- `segment · Neutral`: заливка / цвет `status/neutral/solid`.
- `legend`: gap2 `space/4`; интервал `space/16`.
- `item · Danger`: интервал `space/4`.
- `status · Danger`: интервал `space/6`.
- `value`: заливка / цвет `text/primary`; типографика `font/family/text`, `type/label/sm`.
- `item · Warning`: интервал `space/4`.
- `status · Warning`: интервал `space/6`.
- `item · Success`: интервал `space/4`.
- `status · Success`: интервал `space/6`.
- `item · Neutral`: интервал `space/4`.
- `status · Neutral`: интервал `space/6`.
- Значений без переменной: 5 (напр. `(root):w=480`, `segment · Danger:r=4`, `segment · Warning:r=4`, `segment · Success:r=4`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Компонент `Status bar`; оси: нет.
- Борда: шаблона v3 нет.
- Описание: 1109 знаков, разделы: Status: Level: Полоса статусов парка: Когда использовать: Когда нет: Правила: A11y:

## 13. Code projection
Код в репо: React `packages/react/src/index.js` (`StatusBar`), Vue `packages/vue/src/DsStatusBar.vue`, CSS `claude-ds/components/StatusBar/style.css`; проверка — `npm run test:code`. Прод (DSP / ui-emcd-web, Flutter) — сверка через `scripts/parity.mjs`, когда появится манифест кода.

- Vue: `<DsStatusBar>`; Flutter: `DsStatusBar`.
- Props: `caption`: string или слот; `showCaption`: boolean = true; `showLegend`: boolean = true; `dangerValue`: string или слот; `showDanger`: boolean = true; `warningValue`: string или слот; `showWarning`: boolean = true; `successValue`: string или слот; `showSuccess`: boolean = true; `neutralValue`: string или слот; `showNeutral`: boolean = true; `track`: string или слот.

## 14. Acceptance (2026-11-24)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - RAW: `segment · Danger:r=4`, `segment · Warning:r=4`, `segment · Success:r=4`, `segment · Neutral:r=4`
  - BOARD: нет борды v3

## 15. Migration
- Legacy: Мониторинг «Статусы активных устройств», B2B «Workers» (полоса + легенда).

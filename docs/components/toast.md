# Toast — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Toast`. Status: draft. Level: molecule.
- Figma: Components, страница «Toast» (`364:1389`), набор `1576:2`.

## 2. Intent
- Краткое всплывающее сообщение поверх страницы — отклик на действие («Настройки сохранены», «Вывод создан»).
- Когда использовать: подтверждение действия, результат фоновой операции.
- Когда нет: сообщение, которое должно остаться на странице (Suggest), блокирующий вопрос (Modal).
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `content`, `title`, `description`, `actions`, `Button`, `close`, `row`.
- Вложено: `media/status/info` ×2, `Button` ×10, иконки ×10, `Circle timer` ×5, `media/status/success` ×1, `media/status/warning` ×1, `media/status/danger` ×1.
- Служебные слои (вариантов из 10): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 5.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Layout | Card · Informer | — |
| Tone | Info · Success · Warning · Danger · Neutral | — |

Матрица полная: 10 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Title | текст | «Вывод создан» | 10 из 10 |
| Show title | булево | вкл | 10 из 10 |
| Description | текст | «Средства поступят в течение 30 минут. Статус — в истории выплат.» | 5 из 10 |
| Actions | булево | выкл | 5 из 10 |
| Close | булево | вкл | 10 из 10 |
| Icon | булево | вкл | 5 из 10 |
| Show description | булево | вкл | 5 из 10 |
| Timer | булево | выкл | 5 из 10 |
| Safe area | булево | вкл | 5 из 10 |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- role="status" (polite), для ошибок role="alert"; крестик с aria-label «Закрыть»; фокус не забирает.

## 10. Tokens
- `корень`: эффект `shadow/ambient`, `shadow/key`; заливка / цвет `action/inverse/default`, `status/danger/solid`, `status/info/solid`, `status/success/solid`, `status/warning/solid`, `surface/raised`; интервал `space/12`; отступы `space/12`, `space/16`, `space/20`, `space/48`; радиус `radius/control`; обводка `border/subtle`.
- `content`: интервал `space/10`; отступы `space/2`.
- `title`: заливка / цвет `text/inverse`, `text/on-accent`, `text/on-warning`, `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`.
- `description`: заливка / цвет `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- `actions`: интервал `space/8`; отступы `space/8`.
- `Button`: заливка / цвет `action/tertiary/default`; интервал `space/2`; высота `control/height/sm`; мин. ширина `size/button/min`; отступы `space/4`, `space/6`; радиус `radius/control-sm`, `radius/xs`; обводка `control/border/default`; толщина обводки `border/width/default`.
- `close`: интервал `space/6`; высота `control/height/sm`; радиус `radius/control-sm`; ширина `control/height/sm`.
- `row`: интервал `space/12`; отступы `space/12`, `space/16`.
- Служебные слои (общие правила — `service-layers.md`): `safe area`: высота `os/safe-area/top`.
- Min / max корня: minWidth 280 числом.
- Значений без переменной: 15 (напр. `(root):sw=1`, `(root):w=400`, `(root):w=375`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Toast`, вариантов 10 из 10; оси: Layout, Tone.
- Борда: «Toast — борда · шаблон v3», разделов 10.
- Описание: 1336 знаков, разделы: Status: Level: Когда использовать: Правила: A11y: Legacy: Токены:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsToast>`; Flutter: `DsToast`.
- Props: `layout`: card | informer; `tone`: info | success | warning | danger | neutral; `title`: string или слот; `showTitle`: boolean = true; `description`: string или слот; `actions`: boolean = false; `close`: boolean = true; `icon`: boolean = true; `showDescription`: boolean = true; `timer`: boolean = false; `safeArea`: boolean = true.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - PROPS: Description 5 из 10; Actions 5 из 10; Icon 5 из 10; Show description 5 из 10; Timer 5 из 10; Safe area 5 из 10
  - MINMAX: minw=280
  - RAW: 15 (напр. `(root):sw=1`, `(root):w=400`)
  - BOARD: нет разделов 05, 07, 08

## 15. Migration
- Legacy: DS Web Toast (base notification).

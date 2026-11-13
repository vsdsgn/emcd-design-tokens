# Suggest — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Suggest`. Status: draft. Level: molecule.
- Figma: Components, страница «Suggest» (`366:2736`), набор `1577:3185`.

## 2. Intent
- Сообщение или предложение внутри страницы: нейтральная карточка или полоса на всю ширину, слева слот (иконка статуса, логотип, монета), заголовок и описание, 0–2 кнопки, крестик…
- Когда использовать: предложение действия («Создай Watcher link»), объявление («Кошелёк теперь отдельный»), ограничение или предупреждение в контексте.
- Когда нет: краткий отклик на действие — Toast; блокирующий вопрос — Modal; промо-карточка с картинкой — Promo card.
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `icon/info`, `content`, `text`, `title`, `description`, `actions`, `primary`, `secondary`, `close`, `icon/check-circle`, `icon/alert-triangle`, `icon/alert-circle`.
- Вложено: иконки ×24, `Button` ×24.
- Служебные слои (вариантов из 12): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Layout | Card · Strip | — |
| Tone | Neutral · Accent · Info · Success · Warning · Danger | — |

Матрица полная: 12 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Title | текст | «Кошелёк EMCD Coinhold Wallet — ранее Основной счёт» | 12 из 12 |
| Show title | булево | вкл | 12 из 12 |
| Description | текст | «Теперь у него отдельный адрес, и мы установили его автоматически, чтобы сохранить выплаты» | 12 из 12 |
| Show description | булево | вкл | 12 из 12 |
| Leading | булево | вкл | 12 из 12 |
| Primary action | булево | вкл | 12 из 12 |
| Secondary action | булево | выкл | 12 из 12 |
| Close | булево | вкл | 12 из 12 |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- role="region" с aria-label, для Warning и Danger role="alert"; крестик с aria-label «Закрыть»; иконка дублируется текстом; кнопки достижимы по Tab в порядке чтения.

## 10. Tokens
- `корень`: заливка / цвет `accent/subtle`, `status/danger/subtle`, `status/info/subtle`, `status/success/subtle`, `status/warning/subtle`, `surface/raised`; интервал `space/16`; отступы `space/12`, `space/16`, `space/48`; радиус `radius/surface`; обводка `border/subtle`; толщина обводки `border/width/default`.
- `icon/info`: высота `icon/size/md`; ширина `icon/size/md`.
- `content`: интервал `space/12`.
- `text`: интервал `space/4`.
- `title`: заливка / цвет `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`.
- `description`: заливка / цвет `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- `actions`: интервал `space/8`.
- `primary`: заливка / цвет `action/accent/default`; интервал `space/2`; высота `control/height/sm`; мин. ширина `size/button/min`; отступы `space/6`; радиус `radius/control-sm`.
- `secondary`: заливка / цвет `action/tertiary/default`; интервал `space/2`; высота `control/height/sm`; мин. ширина `size/button/min`; отступы `space/6`; радиус `radius/control-sm`; обводка `control/border/default`; толщина обводки `border/width/default`.
- `close`: интервал `space/6`; высота `control/height/sm`; радиус `radius/control-sm`; ширина `control/height/sm`.
- `icon/check-circle`: высота `icon/size/md`; ширина `icon/size/md`.
- `icon/alert-triangle`: высота `icon/size/md`; ширина `icon/size/md`.
- `icon/alert-circle`: высота `icon/size/md`; ширина `icon/size/md`.
- Значений без переменной: 12 (напр. `(root):w=480`, `(root):w=960`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Suggest`, вариантов 12 из 12; оси: Layout, Tone.
- Борда: «Suggest — борда · шаблон v3», разделов 10.
- Описание: 1447 знаков, разделы: Status: Level: Когда использовать: Правила: A11y: Legacy: Токены:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsSuggest>`; Flutter: `DsSuggest`.
- Props: `layout`: card | strip; `tone`: neutral | accent | info | success | warning | danger; `title`: string или слот; `showTitle`: boolean = true; `description`: string или слот; `showDescription`: boolean = true; `leading`: boolean = true; `primaryAction`: boolean = true; `secondaryAction`: boolean = false; `close`: boolean = true.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечаний по манифесту нет.

## 15. Migration
- Legacy: DS Web Banner, Alert; продукт: suggest, notifications, banner.

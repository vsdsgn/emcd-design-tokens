# Promo card — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Promo card`. Status: draft. Level: molecule.
- Figma: Components, страница «Promo card» (`1662:1097`), набор `1662:1174`.

## 2. Intent
- Промо-карточка: заголовок, необязательные описание и действие, необязательная картинка справа. Размеры S (колонка, сайдбар, 222) и M (карточка на экране, 343).
- Когда использовать: предложение продукта или акции в сайдбаре и на экране («Нет оборудования? Получи каталог»).
- Когда нет: системное сообщение, объявление или предупреждение — Suggest; отклик на действие — Toast.
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `text`, `title`, `description`, `action`, `media`.
- Вложено: `Button` ×4.
- Служебные слои (вариантов из 4): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | S · M | — |
| Tone | Neutral · Accent | — |

Матрица полная: 4 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Title | текст | «Нет оборудования?» | 4 из 4 |
| Description | текст | «Получи каталог ASIC по выгодным ценам» | 4 из 4 |
| Show description | булево | вкл | 4 из 4 |
| Show action | булево | вкл | 4 из 4 |
| Show media | булево | выкл | 4 из 4 |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- role="region" с aria-label, вся карточка или кнопка — одна цель нажатия; картинка с пустым alt.

## 10. Tokens
- `корень`: заливка / цвет `accent/subtle`, `surface/level-1`; интервал `space/8`; отступы `space/16`; радиус `radius/surface`; обводка `border/subtle`; толщина обводки `border/width/default`.
- `text`: интервал `space/4`; отступы `space/64`.
- `title`: заливка / цвет `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`.
- `description`: заливка / цвет `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- `action`: заливка / цвет `action/accent/default`; интервал `space/2`; высота `control/height/sm`; мин. ширина `size/button/min`; отступы `space/4`, `space/6`; радиус `radius/control-sm`, `radius/xs`.
- `media`: заливка / цвет `surface/level-2`; радиус `radius/inner`.
- Значений без переменной: 6 (напр. `(root):w=222`, `(root):w=343`, `text:p=96`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Promo card`, вариантов 4 из 4; оси: Size, Tone.
- Борда: «Promo card — борда · шаблон v3», разделов 10.
- Описание: 854 знаков, разделы: Status: Level: Промо-карточка: Когда использовать: Правила: A11y: Legacy: Токены:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsPromoCard>`; Flutter: `DsPromoCard`.
- Props: `size`: s | m; `tone`: neutral | accent; `title`: string или слот; `description`: string или слот; `showDescription`: boolean = true; `showAction`: boolean = true; `showMedia`: boolean = false.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечаний по манифесту нет.

## 15. Migration
- Legacy: DS Web Sidebar banner; продукт: banner 343×152.

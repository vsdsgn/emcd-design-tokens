# Promo card — контракт (2026-11-14)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Promo card`. Status: beta. Level: unknown.
- Figma: Components, страница «Promo card» (`1662:1097`), набор `1662:1174`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Промо-карточка: заголовок, необязательные описание и действие, необязательная картинка справа.
- Когда использовать: предложение продукта или акции в сайдбаре и на экране («Нет оборудования? Получи каталог»).
- Когда нет: системное сообщение, объявление или предупреждение — Suggest; отклик на действие — Toast.
- Правило выбора варианта:
  - Size: S — колонка, сайдбар (ширина 222); M — карточка на экране (ширина 343).
  - Tone: Neutral — по умолчанию; Accent — только для главной акции экрана.
  - Show description — описание под заголовком; выключается, когда заголовок говорит всё.
  - Show action — действие, всегда одно; выключается, когда нажимается вся карточка.
  - Show media — картинка справа; только как дополнение к тексту.
  - Закрывается пользователем и не возвращается в сессии.
- Не делаем: больше одной промо-карточки на экран; два действия; картинка, несущая смысл без текста; возврат закрытой карточки в той же сессии.

## 3. Anatomy
- Корень: Neutral — заливка `surface/level-1` + обводка `border/subtle` (`border/width/default`, вне раскладки — высота как у Accent); Accent — заливка `accent/subtle`; `radius/surface`, отступы `space/16`.
- `body` — ряд `column` + `media` (зазор `space/8`); `column` — `text` и `action` (зазор `space/8`).
- `text` — `title` (`type/label/lg`, Medium, `text/primary`) и `description` (`type/label/md`, Medium, `text/secondary`), зазор `space/4`.
- `action` — вложенный Button (`control/height/sm`); у Tone=Accent — Button Primary (другой вид сливается с подложкой `accent/subtle`).
- `media` — картинка в потоке справа (`radius/inner`; плейсхолдер `surface/level-2`); при Show media = Off места под неё нет, текст — на всю ширину.
- Служебных слоёв нет.
- Вложено: `Button` ×4.
- Служебные слои (вариантов из 4): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент; интерактивно только действие (Button) или вся карточка как одна цель.
- Своих состояний нет. Hover / Pressed / Focus — у вложенного Button; если нажимается вся карточка — у обёртки в коде.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | S · M | S |
| Tone | Neutral · Accent | Neutral |

Матрица полная: 4 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Title | текст | «Нет оборудования?» | 4 из 4 |
| Description | текст | «Получи каталог ASIC по выгодным ценам» | 4 из 4 |
| Show description | булево | вкл | 4 из 4 |
| Show action | булево | вкл | 4 из 4 |
| Show media | булево | выкл | 4 из 4 |

- Title, Description — текст; Show description (вкл.), Show action (вкл.), Show media (выкл.).

## 6. Content / slots
- Title — короткий вопрос или выгода («Нет оборудования?»); Description — одна фраза («Получи каталог ASIC по выгодным ценам»); действие — глагол.
- Длинный текст: заголовок и описание переносятся, карточка растёт по высоте; усечения нет.
- Языки (de, ar, hi, th, ja, kk) — без обрезки по высоте.
- RTL: картинка переходит в начало, текст выравнивается по концу.
- Текст 200 %: карточка растёт по высоте, обрезки нет; высота кнопки не растёт.

## 7. Events
- `click` по действию или по всей карточке — переход к предложению.

## 8. Behavior
- Статична; движение — только у вложенного Button.
- Закрытая карточка в текущей сессии не показывается снова.

## 9. Accessibility
- `role=region` с `aria-label`.
- Вся карточка или кнопка — одна цель нажатия.
- Картинка — с пустым `alt`: смысла без текста не несёт.

## 10. Tokens
- `корень`: заливка / цвет `accent/subtle`, `surface/level-1`; интервал `space/8`; отступы `space/16`; радиус `radius/surface`; обводка `border/subtle`; толщина обводки `border/width/default`.
- `body`: интервал `space/8`.
- `column`: интервал `space/8`.
- `text`: интервал `space/4`.
- `title`: заливка / цвет `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`.
- `description`: заливка / цвет `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- `action`: заливка / цвет `action/accent/default`, `action/primary/default`; интервал `space/2`; высота `control/height/sm`; мин. ширина `size/button/min`; отступы `space/4`, `space/6`; радиус `radius/control-sm`, `radius/xs`.
- `media`: заливка / цвет `surface/level-2`; радиус `radius/inner`.
- Значений без переменной: 4 (напр. `(root):w=222`, `(root):w=343`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Набор `Promo card`, вариантов 4 из 4; оси: Size, Tone.
- Борда: «Promo card — борда · шаблон v3», разделов 12.
- Описание: 853 знаков, разделы: Status: Level: Промо-карточка: Когда использовать: Правила: A11y: Legacy: Токены:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsPromoCard>`; Flutter: `DsPromoCard`.
- Props: `size`: s | m; `tone`: neutral | accent; `title`: string или слот; `description`: string или слот; `showDescription`: boolean = true; `showAction`: boolean = true; `showMedia`: boolean = false.

## 14. Acceptance (2026-11-14)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; RTL стенд не проверяет; раскладка body и обводка после правки 13.11 стендом не перепроверены; кода нет — parity props пропущена.

## 15. Migration
- DS Web Sidebar banner → Promo card Size=S; продукт: banner 343×152 → Size=M; Tone, Show description, Show action, Show media — новые.

Осталось доделать (после пакета правок beta 2026-11-13):
- На решение: Neutral (`surface/level-1`) на L1 сливается с подложкой, в Dark на L2 / L3 темнее подложки — правило «Neutral только на L0» или заливка от уровня.
- На решение: действие в S и M разного вида (текстовая кнопка / кнопка с подложкой) — правило по Size или один вид.
- На решение: по правилу карточка закрывается пользователем, крестика в наборе нет.
- На решение: предел строк заголовка и описания (сейчас без ограничения).
- Ширина корня 222 / 343 — числом.

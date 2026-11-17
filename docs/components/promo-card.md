# Promo card — контракт (2026-11-17)

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
  - Size: S — сайдбар (ширина 222); M — экран мобильного веба и App (335); L — дашборд Web (545). По эталону Web App «Баннеры» (17.11).
  - Tone: Neutral — по умолчанию (обводка `border/subtle`, действие Button Secondary); Accent — главная акция экрана (градиентная обводка `border/accent` → `border/subtle`, свечение `action/primary/default`, действие Button Primary).
  - Show description — описание под заголовком; выключается, когда заголовок говорит всё.
  - Show action — действие, всегда одно; выключается, когда нажимается вся карточка.
  - Действие — Button S: в S — Text (ссылка), в M / L — Primary (Accent) или Secondary (Neutral); Show close — крестик Icon button Ghost S, по умолчанию On (промо закрывается пользователем); заголовок до 2 строк, описание до 3 (решение 2026-11-15).
  - Show media — картинка справа со свечением, выходит за край и обрезается карточкой; только как дополнение к тексту.
  - Show badge — Badge S Accent («Новое») рядом с заголовком: новое предложение или раздел.
  - Закрывается пользователем и не возвращается в сессии.
  - Реферальное и партнёрское предложение без картинки — Suggest; ряд из нескольких промо-карточек не делаем (решение 2026-11-16).
- Не делаем: больше одной промо-карточки на экран; два действия; картинка, несущая смысл без текста; возврат закрытой карточки в той же сессии.

## 3. Anatomy
- Корень (17.11, по баннерам Web App): заливка `surface/level-1`, обводка `border/width/default` — Neutral `border/subtle`, Accent — линейный градиент `border/accent` → `border/subtle`; радиус S `radius/container`, M / L `radius/surface`; обрезка по краю; отступы S `space/16`, M `space/24`, L `space/24` / `space/32`; мин. высота S 120 · M 178 · L 204.
- `body` — ряд `column` + `close`; `column` — `text` и `action` (зазор S `space/8`, M `space/16`, L `space/24`); `text` фиксированной ширины (S 124 · M 230 · L 340) — место под картинку.
- `text` — `title row` (`title` + `badge`, зазор `space/8`, перенос: длинный заголовок переносится в пределах ширины `text`, бейдж уходит на следующую строку) и `description` (`text/secondary`), зазор S `space/4`, M / L `space/8`; S — `type/label/sm` (12); M / L — заголовок `type/heading/md` (20, Medium), описание `type/body/md` (14).
- `action` — вложенный Button S (`control/height/sm`).
- `media` — абсолютный слой под содержимым: `glow` (эллипс: Accent — `action/primary/default`, Neutral — `surface/level-3`; размытие слоя 80 / 160) и `image` (плейсхолдер `surface/level-2`, в макете — заливка картинкой) — S 104 · M 172 · L 272.
- Служебных слоёв нет.
- Вложено: `Badge` ×6, `Button` ×6, `Icon button` ×6.
- Служебные слои (вариантов из 6): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент; интерактивно только действие (Button) или вся карточка как одна цель.
- Своих состояний нет. Hover / Pressed / Focus — у вложенного Button; если нажимается вся карточка — у обёртки в коде.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | S · M · L | S |
| Tone | Neutral · Accent | Neutral |

Матрица полная: 6 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Title | текст | «Нет оборудования?» | 6 из 6 |
| Description | текст | «Получи каталог ASIC по выгодным ценам» | 6 из 6 |
| Show description | булево | вкл | 6 из 6 |
| Show action | булево | вкл | 6 из 6 |
| Show media | булево | выкл | 6 из 6 |
| Show close | булево | вкл | 6 из 6 |
| Show badge | булево | выкл | 6 из 6 |

- Title, Description — текст; Show description (вкл.), Show action (вкл.), Show media (выкл.), Show close (вкл., 2026-11-15), Show badge (выкл., 2026-11-17).

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
- `корень`: заливка / цвет `surface/level-1`; интервал `space/8`; отступы `space/16`, `space/24`, `space/32`; радиус `radius/container`, `radius/surface`; обводка `border/accent`, `border/subtle`; толщина обводки `border/width/default`.
- `glow`: заливка / цвет `action/primary/default`, `surface/level-3`.
- `image`: заливка / цвет `surface/level-2`.
- `body`: интервал `space/8`.
- `column`: интервал `space/16`, `space/24`, `space/8`.
- `text`: интервал `space/4`, `space/8`.
- `title row`: gap2 `space/4`; интервал `space/8`.
- `title`: заливка / цвет `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/heading/md`, `type/label/sm`.
- `badge`: заливка / цвет `accent/subtle`; интервал `space/4`; высота `size/badge-height/sm`; maxw `size/badge/max`; отступы `space/8`; радиус `radius/sm`.
- `description`: заливка / цвет `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/body/md`, `type/label/sm`.
- `action`: заливка / цвет `action/accent/default`, `action/primary/default`; интервал `space/2`; высота `control/height/sm`; мин. ширина `size/button/min`; отступы `space/6`; радиус `radius/control-sm`, `radius/xs`.
- `close`: интервал `space/6`; высота `control/height/sm`; радиус `radius/control-sm`; ширина `control/height/sm`.
- Min / max корня: minHeight 120 числом, minHeight 178 числом, minHeight 204 числом.
- Значений без переменной: 9 (напр. `(root):w=222`, `(root):sw=1`, `(root):w=335`, `(root):w=545`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Набор `Promo card`, вариантов 6 из 6; оси: Size, Tone.
- Борда: «Promo card — борда · шаблон v3», разделов 12.
- Описание: 1071 знаков, разделы: Status: Level: Промо-карточка: Когда использовать: Правила: A11y: Legacy: Токены: Действие —

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsPromoCard>`; Flutter: `DsPromoCard`.
- Props: `size`: s | m | l; `tone`: neutral | accent; `title`: string или слот; `description`: string или слот; `showDescription`: boolean = true; `showAction`: boolean = true; `showMedia`: boolean = false; `showClose`: boolean = true; `showBadge`: boolean = false.

## 14. Acceptance (2026-11-17)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; RTL стенд не проверяет; раскладка body и обводка после правки 13.11 стендом не перепроверены; кода нет — parity props пропущена.

## 15. Migration
- DS Web Sidebar banner → Promo card Size=S; Web App «Баннеры»: 280–374 / 375+ → Size=M, 545 → Size=L (17.11); Tone, Show description, Show action, Show media — новые.

# Avatar group — контракт (2026-11-23)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Avatar group`. Status: beta. Level: unknown.
- Figma: Components, страница «Avatar group» (`1012:5`), набор `108:1379`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Несколько аватаров одним блоком внахлёст; лишние сворачиваются в круг «+N».
- Когда использовать: несколько участников одним блоком: рефералы, члены команды, получатели.
- Когда нет: один человек — Avatar; монеты — Coin stack.
- Правило выбора варианта:
  - Size: XS / S / M — по размеру Avatar в этом месте; в группе один размер.
  - More: Off — до 5 аватаров, все участники видны; On — участников больше: остальные сворачиваются в круг «+N».
  - Порядок — от первого к последнему по направлению письма; «+N» — последний.
- Не делаем: больше 5 аватаров в ряд; разные размеры в одной группе.

## 3. Anatomy
- Корень — горизонтальный ряд экземпляров Avatar (`size/media/*`) с отрицательным зазором: нахлёст 20 % размера — `size/overlap/xs` / `sm` / `md` (−4 / −6 / −8 у XS / S / M; привязано 2026-11-16).
- Каждый аватар и `more` — кольцо `surface/current` (`border/width/focus`, OUTSIDE): на любой поверхности L0–L3 совпадает с фоном и отделяет круг от соседа. Корни аватаров скруглены `radius/full`.
- `more` — круг «+N»: непрозрачная подложка `surface/next` + тон `status/neutral/subtle`, `radius/chip`; `count` — `text/primary`, `type/label/sm`, `font-weight/medium`.
- Вложено: `Avatar` ×24, `symbol/coin/bitcoin-btc` ×9, `symbol/coin/ethereum-eth` ×9, `symbol/coin/litecoin-ltc` ×6, `symbol/coin/tether-usdt` ×3.
- Служебные слои (вариантов из 15): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент.
- Своих состояний нет. Если группа открывает список участников — она целиком внутри кнопки: состояния, фокус и зона нажатия — у обёртки.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Type | Person · Coin | — |
| Size | XS · M · L · S | XS |
| Count | 4 · 2 · 3 | — |
| More | Off · On | Off |

Матрица: 15 из 48.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Show more | булево | выкл | 9 из 15 |
| More text | текст | «+2» | 9 из 15 |

## 6. Content / slots
- Своих текстовых свойств нет: инициалы — у вложенных Avatar (1 буква, длиннее — обрезается кругом), число — в `count` в виде «+N».
- Языки (стенд): de, ar, hi, th, ja, kk — инициалы вложенных Avatar обрезаются кругом, как у Avatar.
- Текст 200 %: круги и текст в них не масштабируются с системным размером (как иконки; в коде кегль в px). Стенд с удвоенным кеглем (буквы выходят за круг) — проверка Figma, не поведение кода (решение 15.11).
- RTL: порядок аватаров зеркалится (в коде — по `dir`), «+N» — у конца строки; цифры не зеркалятся.

## 7. Events
- Нет. Группа-кнопка — `click` у обёртки (открывает список участников).

## 8. Behavior
- Статична.

## 9. Accessibility
- Группа — список с именем («Участники, 8»); аватары — с alt-именами.
- «+N» озвучивается как «и ещё N».
- Если открывает список — кнопка: фокус и зона нажатия — у обёртки.

## 10. Tokens
- `корень`: интервал `size/overlap/lg`, `size/overlap/md`, `size/overlap/sm`, `size/overlap/xs`.
- `Avatar`: высота `size/media/lg`, `size/media/md`, `size/media/xs`; радиус `radius/full`; обводка `surface/current`; толщина обводки `border/width/focus`; ширина `size/media/lg`, `size/media/md`, `size/media/xs`.
- `more`: заливка / цвет `status/neutral/subtle`, `surface/next`; радиус `radius/chip`, `radius/full`; обводка `surface/current`; толщина обводки `border/width/focus`.
- `count`: заливка / цвет `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/sm`.
- `coin 1`: обводка `surface/current`.
- `coin 2`: обводка `surface/current`.
- `value`: заливка / цвет `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/sm`.
- `coin 3`: обводка `surface/current`.
- `coin 4`: обводка `surface/current`.

## 11. Platforms
- От режима Platform не зависит: на стенде iOS / Android совпадают с Web.

## 12. Figma projection
- Набор `Avatar group`, вариантов 15 из 48; оси: Type, Size, Count, More.
- Борда: «Avatar group — борда · шаблон v3», разделов 11.
- Описание: 874 знаков, разделы: Status: Level: Type: Когда использовать: Правила: A11y:

## 13. Code projection
Кода в репо пока нет; прод (DSP / ui-emcd-web, Flutter) недоступен (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs`.

- Vue: `<DsAvatarGroup>`; Flutter: `DsAvatarGroup`.
- Props: `type`: person | coin; `size`: xs | m | l | s; `count`: 4 | 2 | 3; `more`: boolean; `showMore`: boolean = false; `moreText`: string или слот.

## 14. Acceptance (2026-11-23)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — только реестр: отрицательный зазор −4 / −6 / −8 (нахлёст аватаров).
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props с кодом продукта — по манифесту кода, когда он будет; код в репо проверяет `npm run test:code`.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 % (длинный текст и языки — только на варианте XS · More Off); своих текстовых и булевых свойств нет; RTL стенд не проверяет; кода нет — parity props пропущена.

## 15. Migration
- DS Web base avatar / group line (size, more, RTL) → Avatar group: size → Size, more → More; RTL — в коде, направление по `dir`.

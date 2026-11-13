# Status — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Status`. Status: beta. Level: atom.
- Figma: Components, страница «Status» (`366:101`), набор `47:401`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Точка + подпись: состояние объекта (воркер, устройство, сервис, выплата) в строке таблицы, списке, шапке.
- Когда использовать: состояние, которое обновляется само (online / offline).
- Когда нет: метка-свойство или промо — Badge; сообщение — Alert / Toast.
- Правило выбора варианта:
  - Tone: Success — работает; Warning — нестабилен, требует внимания; Danger — не работает; Info — в процессе; Neutral — выключен, нет данных.
  - Size: S — таблицы; M — карточки и шапки.
  - Show label=false — только в ячейках под заголовком столбца «Статус» и в легенде графика (+ `aria-label`).

## 3. Anatomy
- Корень: вложенный `Dot` (точка) + `label`.
- Вложено: `Dot` ×10.
- Служебные слои (вариантов из 10): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент.
- Состояний нет; смена тона — это смена данных.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | S · M | S |
| Tone | Success · Warning · Danger · Info · Neutral | Success |

Матрица полная: 10 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Label | текст | «Активен» | 10 из 10 |
| Show label | булево | вкл | 10 из 10 |

## 6. Content / slots
- Длинный текст: одна строка, усечение многоточием по max-width 240 (подпись); полный текст — в `title` / тултипе.
- RTL: порядок слотов зеркалится (leading ↔ trailing), смысловые стрелки и шевроны отражаются, цифры и латиница — нет. Точка — со стороны начала строки.

## 7. Events
- Нет.

## 8. Behavior
- Статичен. Пульсации точки нет (Base); обновление — без анимации.

## 9. Accessibility
- Смысл — в тексте, не только в цвете.
- Обновление статуса — `aria-live="polite"`.

## 10. Tokens
- `корень`: интервал `space/6`, `space/8`.
- `dot`: высота `size/dot/md`, `size/dot/sm`; ширина `size/dot/md`, `size/dot/sm`.
- `label`: заливка / цвет `text/primary`; типографика `font-weight/regular`, `font/family/text`, `type/body/md`, `type/body/sm`.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Набор `Status`, вариантов 10 из 10; оси: Size, Tone.
- Борда: «Status — борда · шаблон v3», разделов 9.
- Описание: 818 знаков, разделы: Status: Level: Статус: Когда использовать: Правила тона: S — A11y: Поиск: Legacy:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsStatus>`; Flutter: `DsStatus`.
- Props: `size`: s | m; `tone`: success | warning | danger | info | neutral; `label`: string или слот; `showLabel`: boolean = true.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний (Status и Dot).
- `variables-check.plugin.js` — `maxWidth 240 @label` числом.
- `audit-parity.plugin.js` — Status — чисто; вложенный набор Dot: DESC — первая строка не «Status:», нет «Когда использовать», нет «A11y:».
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: стенд Light / Dark × бренды × платформы × L0–L3, длинный текст, 6 языков, текст 200 % — снимаются при замене набора (фаза C, после точки отката).

## 15. Migration
- DS Web: status dots в таблицах воркеров → Status; Tone Success | Warning | Danger | Info | Neutral, Size S | M; подпись обязательна.

Правки к замене набора (фаза C, после точки отката и «ок» Стефана):
- Dot: описание по шаблону (Status, «Когда использовать», A11y) и решение о статусе (служебный `_Dot` или draft).
- Мусор «cnfnec» в строке «Поиск».

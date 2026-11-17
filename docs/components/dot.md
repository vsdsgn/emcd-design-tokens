# _Dot — контракт (2026-11-17)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `_Dot`. Status: service. Level: unknown.
- Figma: Components, страница «Status» (`366:101`), набор `720:75926`. Платформы: Web, Mobile web, iOS, Android.
- Служебный набор (имя с «_», Status: service, с 2026-11-15): не публикуется, в макетах напрямую не используется — только внутри Status, Tab bar item (точка-бейдж) и легенд.

## 2. Intent
- Точка тона: Success · Warning · Danger · Info · Neutral; S 6 · M 8.
- Когда использовать: только внутри наборов DS: Status, Tab bar item, легенды.
- Когда нет: статус объекта в макете — Status (точка + подпись); непрочитанное — Counter; страница карусели — Page indicator.
- Правило выбора варианта:
  - Tone — по смыслу родителя (Status: Success — работает, Warning — внимание, Danger — не работает, Info — в процессе, Neutral — выключен).
  - Size: S 6 — таблицы и плотные списки; M 8 — карточки и шапки (как Size у Status).
- Не делаем: точка без подписи или `aria-label` у родителя; смысл только цветом.

## 3. Anatomy
- Корень `size/dot/sm` | `size/dot/md`; слой `dot` — круг, заливка `status/*/solid` по Tone.
- Служебные слои (вариантов из 10): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент.
- Состояний нет; смена тона — смена данных у родителя.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | S · M | S |
| Tone | Success · Warning · Danger · Info · Neutral | Success |

Матрица полная: 10 вариантов.

## 6. Content / slots
- Текста нет: длинный текст, языки и 200 % не влияют.
- RTL: точка симметрична; сторону задаёт родитель.

## 7. Events
- Нет.

## 8. Behavior
- Статична; пульсации нет.

## 9. Accessibility
- Декоративна (`aria-hidden`); смысл озвучивает родитель (подпись Status).

## 10. Tokens
- `корень`: высота `size/dot/md`, `size/dot/sm`; ширина `size/dot/md`, `size/dot/sm`.
- `dot`: заливка / цвет `status/danger/solid`, `status/info/solid`, `status/neutral/solid`, `status/success/solid`, `status/warning/solid`; высота `size/dot/md`, `size/dot/sm`; ширина `size/dot/md`, `size/dot/sm`.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Набор `_Dot`, вариантов 10 из 10; оси: Size, Tone.
- Борда: «Dot — борда · шаблон v3», разделов 12.
- Описание: 644 знаков, разделы: Status: Level: Точка тона: Когда использовать: Правила: A11y: Поиск: Legacy:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsDot>`; Flutter: `DsDot`.
- Служебный набор: в публичный API библиотеки не выходит — внутренняя часть родителя.
- Props: `size`: s | m; `tone`: success | warning | danger | info | neutral.

## 14. Acceptance (2026-11-17)
- `audit.plugin.js` — 0 замечаний (вместе со Status).
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13, вместе со Status).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: отдельный стенд не снимался — проверен в составе Status; кода нет — parity props пропущена.

## 15. Migration
- Был набор `Dot` (атом), 2026-11-15 → служебный `_Dot`: в макетах — Status, а не голая точка.

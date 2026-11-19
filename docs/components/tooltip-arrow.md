# _Tooltip arrow — контракт (2026-11-19)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `_Tooltip arrow`. Status: service. Level: unknown.
- Figma: Components, страница «Tooltip» (`317:33689`), набор `317:33693`. Платформы: по родителю (Tooltip — Web).
- Служебный набор (имя с «_», Status: service, с 2026-11-15): не публикуется, в макетах напрямую не используется — только внутри Tooltip (24 варианта), Tooltip tour и тултипа Icon button.

## 2. Intent
- Уголок тултипа из legacy: вектор (у Neutral — с обводкой) и маска 1 px на стыке с пузырём, чтобы контур шёл одной линией. Остриё вниз; ориентация — трансформацией экземпляра.
- Когда использовать: только внутри наборов DS: Tooltip, Tooltip tour, тултип Icon button.
- Когда нет: подсказка в макете — Tooltip (пузырь + уголок), а не голый уголок.
- Правило выбора варианта:
  - Tone — как у родителя: Neutral — `surface/raised` + обводка `border/default`; Accent — `surface/accent`, без обводки.
  - Отдельным компонентом, потому что булева форма «пузырь + уголок» в Figma при растяжении масштабирует уголок; в коде — одна SVG-форма с пузырём.
- Не делаем: уголок без пузыря; растягивать уголок (размер 26 × 9 постоянный).

## 3. Anatomy
- Корень 26 × 9 (числом).
- `arrow` — вектор: заливка `surface/raised` | `surface/accent`, обводка `border/default` (`border/width/default`).
- `mask` — полоса 1 px на стыке (заливка как у `arrow`), закрывает обводку пузыря под уголком.
- Служебные слои (вариантов из 2): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент.
- Состояний нет; Tone следует за родителем.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Tone | Neutral · Accent | Neutral |

Матрица полная: 2 вариантов.

## 6. Content / slots
- Текста нет: длинный текст, языки и 200 % не влияют.
- RTL: сторону и сдвиг уголка задаёт родитель (Placement / Arrow у Tooltip).

## 7. Events
- Нет.

## 8. Behavior
- Статичен; появляется и скрывается вместе с родителем.

## 9. Accessibility
- Декоративен (`aria-hidden`); смысл — у родителя (`role=tooltip`).

## 10. Tokens
- `arrow`: заливка / цвет `surface/accent`, `surface/raised`; обводка `border/default`; толщина обводки `border/width/default`.
- `mask`: заливка / цвет `surface/accent`, `surface/raised`.
- Значений без переменной: 4 (напр. `(root):w=26`, `(root):h=9`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- По родителю: Tooltip — только Web. Размеры от режима Platform не зависят (26 × 9 числом).

## 12. Figma projection
- Набор `_Tooltip arrow`, вариантов 2 из 2; оси: Tone.
- Борда: «Tooltip — борда · шаблон v3», разделов 11.
- Описание: 611 знаков, разделы: Status: Level: Служебный: Когда использовать: Правила: A11y: Legacy:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsTooltipArrow>`; Flutter: `DsTooltipArrow`.
- Служебный набор: в публичный API библиотеки не выходит — внутренняя часть родителя.
- Props: `tone`: neutral | accent.

## 14. Acceptance (2026-11-19)
- `audit.plugin.js` — отдельно не прогонялся — в составе Tooltip (прогон после замены на месте 13.11).
- `variables-check.plugin.js` — корень 26 × 9 числом (4 значения без переменной).
- `audit-parity.plugin.js` — отдельно не прогонялся — в составе Tooltip.
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: отдельный стенд не снимался — проверен в составе Tooltip на стенде 2026-11-13; кода нет — parity props пропущена.

## 15. Migration
- Legacy DS Web `tooltip arrow` (уголок `base tooltip`) → `_Tooltip arrow`.
- 2026-11-15: draft → service (служебный, не публикуется); в status.json не пишется.

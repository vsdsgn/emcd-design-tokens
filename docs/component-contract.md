# Контракт компонента — схема (2026-10-09)

Основа — схема из 15 разделов (Vault `future-ds-component-contract-schema-v0.1.md`, 2026-09-20). Здесь — та же схема, привязанная к тому, что уже есть в DS 2.0, и дополнения из брифа 2026-10-09. Второй схемы для AI не заводим: машиночитаемый `contract.json` — та же схема в JSON (ниже).

Компонент **ссылается** на системные правила, а не повторяет их: модель состояний, модель обводок, фокус, зоны — `components.md`; движение — `motion.md`; платформы — `platforms.md`; размеры — `sizing.md`.

## Разделы и где они живут

| # | Раздел | В Figma | В репо / коде | Сейчас |
|---|---|---|---|---|
| 1 | Identity: имя, статус, платформы, владелец | эмодзи страницы + `Status:` в описании | `claude-ds/status.json` | есть |
| 2 | Intent: когда использовать / когда нет / альтернативы | описание + борда «Правила» | README Claude DS | есть у большинства |
| 3 | Anatomy: части, обязательные / нет, приватные слои | борда «Анатомия» со схемой и замерами | — | есть у Button, Tooltip; добавить всем |
| 4 | States: группа модели состояний + свои состояния | матрица вариантов | `components.md` → «Модель состояний» | есть (ссылкой) |
| 5 | Properties: имя, тип, значения, default, Figma / код, алиасы, deprecated | свойства компонента | props | Figma есть, код — нет |
| 6 | Content / slots: слоты, ограничения текста (строки, min / max, обрезка) | слоты, `size/*` | — | частично |
| 7 | Events: что эмитит, когда, controlled / uncontrolled | — | emits | **нет** |
| 8 | Behavior: клавиатура, pointer / touch, dismissal, responsive, motion | борда «Движение», «Поведение» | `motion.md`, `platforms.md` | частично |
| 9 | Accessibility: роль, ARIA, подпись, фокус, клавиши, hit / safe area, контраст | слои зон + Show-свойства | `components.md` → «Доступность» | частично |
| 10 | Tokens: токены по ролям, компонентные токены | привязки переменных | `color-map.csv`, аудит | есть |
| 11 | Platforms: Web / Mobile web / iOS / Android — отличия, хаптики | режимы Platform | `os/*`, `haptic/*` | частично |
| 12 | Figma projection: набор, оси, свойства, приватные `_` | компонент | — | есть |
| 13 | Code projection: Vue / Flutter имя, props, slots, emits | — | DSP | **нет** |
| 14 | Testing / Acceptance: что проверить до «готово» | — | чеклист ниже | **нет** |
| 15 | Migration: legacy-компонент, отличия, breaking | — | `legacy-map.md`, `components.csv` | есть |

## Дополнения (бриф 2026-10-09)

Внутри разделов, без новых разделов:
- **2 Intent → Usage**: композиция — 1 / 2 / 3+ экземпляра, порядок, иерархия, горизонтально / вертикально, Web / Mobile, full-width; допустимые и запрещённые комбинации; **Do / Don't** картинками на борде.
- **3 Anatomy → Spacing, Safe zones, Hit areas** — схема с замерами (визуально обязательно).
- **6 Content → Content constraints, Edge cases**: длинный текст, 19 языков (RTL, тайский, CJK), пустое значение, 200 % текста, обрезка.
- **8 Behavior → Motion spec** (токены `motion/*`, reduced motion), **Responsive** (min / max по `size/*`, 320 px), **Composition rules** (что можно класть внутрь, с чем рядом).
- **14 Acceptance** — «готово» только когда: все варианты × оси × свойства переключаются и работают; Light / Dark × L0–L3; Web / касание (зоны); фокус и кольцо; контраст ≥ AA; Disabled вложенных; длинный текст; инстансы в Components не сломаны; описание = борда.

## Статусы и ворота

- Словарь статусов: draft · beta · stable · deprecated (не experimental).
- **beta** — заполнены 1–6, 9, 10, 12, 15 и пройден чеклист 14 в Figma.
- **stable** — всё, включая 7, 11, 13 и сверку с кодом (DSP).

## contract.json (для Claude Design и DSP)

Та же схема, ключи = разделы: `identity`, `intent`, `anatomy`, `states`, `properties`, `slots`, `events`, `behavior`, `a11y`, `tokens`, `platforms`, `figma`, `code`, `acceptance`, `migration`. Лежит в `claude-ds/components/<Comp>/contract.json`, README компонента в Claude DS собирается из него. Пилот — Button (этап 3).

# Input addon / Icon — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Input addon / Icon`. Status: beta. Level: unknown.
- Figma: Components, страница «Input» (`349:2`), компонент `402:47774`. Платформы: Web, Mobile web, iOS, Android (вместе с Input).
- Страница «Input» (уровень молекулы), сам элемент — атом слота поля. Отдельно от поля не используется.

## 2. Intent
- Иконка в слоте поля: поиск, сеть, тип значения.
- Когда использовать: иконка поясняет тип значения.
- Когда нет: действие по иконке — Icon button Ghost S в слоте.
- Правило выбора варианта:
  - Слот Leading или Trailing поля, одна иконка.
  - Размер — `icon/size/control`, цвет — `icon/tertiary`.
  - Не нажимается.
- Не делаем: две иконки в одном слоте; нажатие по иконке; смысл только в иконке без Label поля.

## 3. Anatomy
- Один экземпляр иконки `icon/size/control` (свойство Icon — замена экземпляра, по умолчанию `icon/info`).
- Служебных слоёв нет.
- Вложено: иконки ×1.
- Служебные слои (вариантов из 1): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): наследует состояние поля: Disabled / Read-only поля гасит аддон.
- Своих состояний нет; цвет `icon/tertiary` во всех состояниях поля, в Disabled поля — `icon/disabled` (оверрайд в экземпляре поля).

## 5. Properties
Осей нет: один компонент.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Icon | замена экземпляра | `icon/info` | 1 из 1 |

- Icon — замена экземпляра, по умолчанию `icon/info`.

## 6. Content / slots
- Текста нет: длинный текст, языки и 200 % на вид не влияют (стенд).
- RTL: слот зеркалится вместе с полем; направленные иконки отражаются, остальные — нет.

## 7. Events
- Нет.

## 8. Behavior
- Статичен.

## 9. Accessibility
- Декоративная: `aria-hidden`; смысл — в Label поля.

## 10. Tokens
- `icon/info`: высота `icon/size/control`; ширина `icon/size/control`.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Компонент `Input addon / Icon`; оси: нет.
- Борда: «Input — борда · шаблон v3», разделов 13.
- Описание: 446 знаков, разделы: Status: Level: Иконка в Leading: Когда использовать: A11y: Правила:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsInputAddonIcon>`; Flutter: `DsInputAddonIcon`.
- Props: нет.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 % (текста нет); булевых свойств нет, замена Icon не проверялась; RTL стенд не проверяет; кода нет — parity props пропущена.

## 15. Migration
- Legacy в описании не указан: иконка в начале поля DS Web `input` → Input addon / Icon в слоте Leading.

Осталось доделать (после пакета правок beta 2026-11-13):
- Цвет `icon/tertiary` в манифесте не виден (задан внутри экземпляра иконки) — сверить привязку.

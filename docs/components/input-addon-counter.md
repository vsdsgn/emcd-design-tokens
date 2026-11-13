# Input addon / Counter — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Input addon / Counter`. Status: beta. Level: molecule.
- Figma: Components, страница «Input» (`349:2`), компонент `31:694`. Платформы: Web, Mobile web, iOS, Android (вместе с Input).
- Страница «Input» (уровень молекулы), сам элемент — атом слота поля. Отдельно от поля не используется.

## 2. Intent
- Счётчик «+N» в inline-слоте: сколько ещё значений выбрано в мультиселекте.
- Когда использовать: мультиселект, в котором выбранные значения не помещаются в поле.
- Когда нет: количество в табах и меню — Counter; лимит символов — счётчик Textarea.

## 3. Anatomy
- Плашка (`action/secondary/default`, `radius/chip`) с текстом `text`.
- Служебные слои (вариантов из 1): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): наследует состояние поля: Disabled / Read-only поля гасит аддон.
- Своих состояний нет.

## 5. Properties
Осей нет: один компонент.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Text | текст | «+3» | 1 из 1 |

## 6. Content / slots
- Формат «+N»; больше 99 — «+99». RTL: знак и число не зеркалятся.

## 7. Events
- Нет.

## 8. Behavior
- Статичен; значение пересчитывается при изменении ширины поля.

## 9. Accessibility
- `aria-hidden`; полный список выбранного — в доступном имени поля.

## 10. Tokens
- `корень`: заливка / цвет `action/secondary/default`; отступы `space/2`, `space/8`; радиус `radius/chip`.
- `text`: заливка / цвет `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/sm`.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Компонент `Input addon / Counter`; оси: нет.
- Борда: «Input — борда · шаблон v3», разделов 13.
- Описание: 317 знаков, разделы: Status: Level: Когда использовать: A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsInputAddonCounter>`; Flutter: `DsInputAddonCounter`.
- Props: `text`: string или слот.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13; отдельные компоненты обходятся).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: стенд Light / Dark × бренды × платформы × L0–L3, длинный текст, 6 языков, текст 200 % — снимаются при замене набора (фаза C, после точки отката).

## 15. Migration
- DS Web: «+N» в `input` multi select → Input addon / Counter в слоте Inline.

Осталось доделать (после пакета правок beta 2026-11-13):
- Тот же смысл, что у Counter (Neutral): проверить, нужен ли отдельный компонент (парковка `OPEN-QUESTIONS`).

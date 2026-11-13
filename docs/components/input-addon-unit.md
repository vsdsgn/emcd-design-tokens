# Input addon / Unit — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Input addon / Unit`. Status: beta. Level: molecule.
- Figma: Components, страница «Input» (`349:2`), компонент `23:28`. Платформы: Web, Mobile web, iOS, Android (вместе с Input).
- Страница «Input» (уровень молекулы), сам элемент — атом слота поля. Отдельно от поля не используется.

## 2. Intent
- Единицы или валюта в suffix поля (USDT, TH/s, %, kW).
- Когда использовать: поле с числом, у которого единица фиксирована.
- Когда нет: выбор единицы — Select compact в trailing-слоте; подпись поля — Label у Input.

## 3. Anatomy
- Один текстовый слой `text`.
- Служебные слои (вариантов из 1): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): наследует состояние поля: Disabled / Read-only поля гасит аддон.
- Своих состояний нет; цвет `text/tertiary` во всех состояниях поля.

## 5. Properties
Осей нет: один компонент.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Text | текст | «USDT» | 1 из 1 |

## 6. Content / slots
- Короткое обозначение (до ~6 знаков), не переводится, не усекается.
- RTL: остаётся в конце поля; латиница и цифры не зеркалятся.

## 7. Events
- Нет.

## 8. Behavior
- Статичен.

## 9. Accessibility
- Входит в доступное описание поля (`aria-describedby`) — «0.5 USDT», а не отдельный элемент.

## 10. Tokens
- `text`: заливка / цвет `text/tertiary`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Компонент `Input addon / Unit`; оси: нет.
- Борда: «Input — борда · шаблон v3», разделов 13.
- Описание: 381 знаков, разделы: Status: Level: Когда использовать: A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsInputAddonUnit>`; Flutter: `DsInputAddonUnit`.
- Props: `text`: string или слот.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13; отдельные компоненты обходятся).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: стенд Light / Dark × бренды × платформы × L0–L3, длинный текст, 6 языков, текст 200 % — снимаются при замене набора (фаза C, после точки отката).

## 15. Migration
- DS Web: suffix в `input` → Input addon / Unit в слоте Trailing.

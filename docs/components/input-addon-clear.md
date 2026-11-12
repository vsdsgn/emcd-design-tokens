# Input addon / Clear — контракт · draft (2026-11-12)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Input addon / Clear`. Status: draft. Level: molecule.
- Figma: Components, страница «Input» (`349:2`), компонент `402:47767`.

## 2. Intent
- Кнопка очистки поля (форма legacy ic-erase). Ставится в Trailing. Показывать, когда в поле есть значение и оно в фокусе / заполнено. Касание — по умолчанию (зона 44).
- Когда использовать: не описано
- Когда нет: не описано
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `circle`, `glyph`.
- Служебные слои (вариантов из 1): кольцо фокуса 0 · зона Web 1 · зона касания 1 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Осей нет: один компонент.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Show hit area | булево | выкл | 1 из 1 · служебное |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- |

## 10. Tokens
- `circle`: заливка / цвет `control/track`.
- `glyph`: обводка `icon/secondary`.
- Служебные слои (общие правила — `service-layers.md`): `hit area · web`: видимость `touch/is-fine` · `hit area · overlay`: заливка / цвет `status/danger/solid` · `hit area · app`: видимость `touch/is-coarse`.
- Значений без переменной: 5 (напр. `(root):w=20`, `(root):h=20`, `glyph:sw=1.5`, `hit area · web:w=24`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Компонент `Input addon / Clear`; оси: нет.
- Борда: «Input — борда · шаблон v3», разделов 13.
- Описание: 255 знаков, разделы: Status:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsInputAddonClear>`; Flutter: `DsInputAddonClear`.
- Props: нет.

## 14. Acceptance (2026-11-12)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - DESC: нет: Когда использовать:, Правила:, A11y:
  - RAW: 5 (напр. `(root):w=20`, `(root):h=20`)

## 15. Migration
- Legacy: не указано в описании набора — искать в `docs/migration/components.csv`, DS Web / App и продуктах

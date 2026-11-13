# Input addon / Clear — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Input addon / Clear`. Status: beta. Level: unknown.
- Figma: Components, страница «Input» (`349:2`), компонент `402:47767`. Платформы: Web, Mobile web, iOS, Android (вместе с Input).
- Страница «Input» (уровень молекулы), сам элемент — атом слота поля. Отдельно от поля не используется.

## 2. Intent
- Кнопка очистки поля (форма legacy `ic-erase`): серый круг с крестиком. Ставится в Trailing.
- Когда использовать: в поле есть значение, и оно в фокусе или заполнено. Касание — по умолчанию (зона 44); Web — только поиск и фильтры.
- Когда нет: поле суммы и короткие поля — там стирают клавишей.
- Правило выбора варианта:
  - Только в слоте Trailing поля, один на поле; не ставится вместе с Stepper.
  - Скрыт, пока поле пустое.
  - Размер — `icon/size/control`.
- Не делаем: в пустом поле; вместе со Stepper; в поле суммы; вне поля.

## 3. Anatomy
- `circle` (`control/track`, `icon/size/control`) + `glyph` — крестик (`icon/secondary`, `icon/stroke/regular`).
- Служебные: `hit area · web` / `hit area · app` (Show hit area). Кольца фокуса и безопасного поля нет.
- Служебные слои (вариантов из 1): кольцо фокуса 0 · зона Web 1 · зона касания 1 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): наследует состояние поля: Disabled / Read-only поля гасит аддон.
- В наборе — одно состояние; Hover / Pressed / Focus в Figma нет. Disabled / Read-only — по состоянию поля.

## 5. Properties
Осей нет: один компонент.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Show hit area | булево | выкл | 1 из 1 · служебное |

- Show hit area — служебное, по умолчанию Off.

## 6. Content / slots
- Текста нет: длинный текст, языки и 200 % на вид не влияют (стенд).
- RTL: остаётся в конце поля (Trailing зеркалится вместе с полем); крестик не зеркалится.

## 7. Events
- `click` → значение поля очищается, аддон скрывается.

## 8. Behavior
- После нажатия фокус возвращается в поле.
- Зона нажатия ≥ `touch/min`: Web 24, касание 44 (слои `hit area · web` / `hit area · app`, проверка — Show hit area).

## 9. Accessibility
- `<button>` с `aria-label` «Очистить»; Enter и Пробел; после нажатия фокус возвращается в поле.

## 10. Tokens
- `корень`: высота `icon/size/control`; ширина `icon/size/control`.
- `circle`: заливка / цвет `control/track`; высота `icon/size/control`; ширина `icon/size/control`.
- `glyph`: обводка `icon/secondary`; толщина обводки `icon/stroke/regular`.
- Служебные слои (общие правила — `service-layers.md`): `hit area · web`: видимость `touch/is-fine` · `hit area · overlay`: заливка / цвет `status/danger/solid` · `hit area · app`: видимость `touch/is-coarse`.
- Значений без переменной: 2 (напр. `hit area · web:w=24`, `hit area · web:h=24`) — размеры слоёв зон и то, что перечислено в разделе 14.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.
- Hover — только с указателем (Web); на касании Hover нет, Pressed остаётся.

## 12. Figma projection
- Компонент `Input addon / Clear`; оси: нет.
- Борда: «Input — борда · шаблон v3», разделов 13.
- Описание: 548 знаков, разделы: Status: Level: Когда использовать: A11y: Правила:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsInputAddonClear>`; Flutter: `DsInputAddonClear`.
- Props: нет.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 % (текста нет), булевы свойства; зона касания 44 не показана; RTL стенд не проверяет; кода нет — parity props пропущена.

## 15. Migration
- DS Web / App: иконка `ic-erase` в поле → Input addon / Clear в слоте Trailing; зоны `hit area · web` / `hit area · app` — новые.

Осталось доделать (после пакета правок beta 2026-11-13):
- На решение: Hover / Pressed / Focus и кольца фокуса в Figma нет, хотя это кнопка — добавить или записать «только в коде».
- `hit area · web` — числом (24 × 24).

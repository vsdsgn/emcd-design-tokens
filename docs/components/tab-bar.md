# Tab bar — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Tab bar`. Status: draft. Level: unknown.
- Figma: Components, страница «Tab bar» (`366:4724`), компонент `66:371`.

## 2. Intent
- Не описано.
- Когда использовать: не описано
- Когда нет: не описано
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `Items`, `Tab bar item`, `home indicator`.
- Вложено: `Tab bar item` ×5.
- Служебные слои (вариантов из 1): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 1.

## 4. States
- Оси State нет.

## 5. Properties
Осей нет: один компонент.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Safe area | булево | вкл | 1 из 1 |
| Items | SLOT | `undefined` | 1 из 1 |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- Не описано: заполнить при переводе в beta.

## 10. Tokens
- `корень`: эффект `material/thin/blur`; заливка / цвет `material/thin/fill`; обводка `edge/hairline`; толщина обводки `border/width/default`.
- `Items`: отступы `space/8`.
- `Tab bar item`: интервал `space/2`; высота `control/height/xl`; ширина `size/tab-bar-item/width`.
- `home indicator`: заливка / цвет `icon/primary`; радиус `radius/chip`.
- Служебные слои (общие правила — `service-layers.md`): `safe area`: высота `os/safe-area/bottom`.
- Значений без переменной: 1 (напр. `(root):w=375`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Компонент `Tab bar`; оси: нет.
- Борда: «Tab bar item — борда · шаблон v3», разделов 13.
- Описание: 933 знаков, разделы: Status: Level: Правила: A11y: Когда использовать: Expressive: Поиск: Legacy: Expressive (привязано):

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsTabBar>`; Flutter: `DsTabBar`.
- Props: `safeArea`: boolean = true; `items`: string или слот.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечаний по манифесту нет.

## 15. Migration
- Legacy: DS App нижняя навигация (`tabbar`) → Tab bar + Safe area; `tabbar item` active → Tab bar item Selected; высота 91 → 57 + safe area. DS Web — нет; мобильный веб — та же схема.

# Password field — контракт · draft (2026-11-12)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Password field`. Status: draft. Level: molecule.
- Figma: Components, страница «Password field» (`355:6`), набор `178:1850`.

## 2. Intent
- Поле пароля с показом символов и требованиями.
- Когда использовать: не описано
- Когда нет: вход в аккаунт — без требований, только поле и «Забыли пароль?».
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `Input`, `show password`, `requirements`, `req`, `icon/minus`, `Минимум 8 символов`, `Цифра`, `Заглавная и строчная буквы`, `Спецсимвол: ! @ # $ %`, `icon/check`.
- Вложено: `Input` ×4, иконки ×20.
- Служебные слои (вариантов из 4): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Ось State: Empty · Typing · Valid · Error. Группа модели состояний (`docs/components.md`) — определить при переводе в beta.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| State | Empty · Typing · Valid · Error | — |

Матрица полная: 4 вариантов.

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- type="password", autocomplete="new-password" / "current-password"; список требований связан aria-describedby, изменения озвучиваются aria-live="polite". |

## 10. Tokens
- `корень`: интервал `space/10`.
- `Input`: интервал `space/6`.
- `show password`: интервал `space/6`; высота `control/height/sm`; радиус `radius/control-sm`; ширина `control/height/sm`.
- `requirements`: интервал `space/6`.
- `req`: интервал `space/6`.
- `icon/minus`: высота `icon/size/md`; ширина `icon/size/md`.
- `Минимум 8 символов`: заливка / цвет `text/secondary`, `text/success`; типографика `font-weight/regular`, `font/family/text`, `type/body/sm`.
- `Цифра`: заливка / цвет `text/secondary`, `text/success`; типографика `font-weight/regular`, `font/family/text`, `type/body/sm`.
- `Заглавная и строчная буквы`: заливка / цвет `text/secondary`, `text/success`; типографика `font-weight/regular`, `font/family/text`, `type/body/sm`.
- `Спецсимвол: ! @ # $ %`: заливка / цвет `text/secondary`, `text/success`; типографика `font-weight/regular`, `font/family/text`, `type/body/sm`.
- `icon/check`: высота `icon/size/md`; ширина `icon/size/md`.
- Min / max корня: minWidth 160 числом.
- Значений без переменной: 8 (напр. `(root):w=320`, `field:h=66`, `field:h=88`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Password field`, вариантов 4 из 4; оси: State.
- Борда: «Password field — борда · шаблон v3», разделов 10.
- Описание: 830 знаков, разделы: Status: Level: Когда нет: A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsPasswordField>`; Flutter: `DsPasswordField`.
- Props: нет.
- Состояния (Empty, Typing, Valid, Error) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-12)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - DESC: нет: Когда использовать:, Правила:
  - MINMAX: minw=160
  - RAW: 8 (напр. `(root):w=320`, `field:h=66`)
  - BOARD: нет разделов 05, 07, 08

## 15. Migration
- Legacy: не указано в описании набора — искать в `docs/migration/components.csv`, DS Web / App и продуктах

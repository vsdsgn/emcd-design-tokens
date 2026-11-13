# Breadcrumbs — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Breadcrumbs`. Status: draft. Level: molecule.
- Figma: Components, страница «Breadcrumbs» (`366:5621`), набор `168:10672`.

## 2. Intent
- Путь к текущей странице в глубокой иерархии (Web): Главная / Воркеры / rig-01.
- Когда использовать: 3+ уровня вложенности.
- Когда нет: плоская навигация, App и Compact — там «назад» в Top bar.
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `Breadcrumb item`, `separator`.
- Вложено: `Breadcrumb item` ×9.
- Служебные слои (вариантов из 3): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Items | 2 · 3 · 4 | — |

Матрица полная: 3 вариантов.

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- <nav aria-label="Хлебные крошки">, список <ol>, текущая — aria-current="page"; разделители скрыты от читалки. |

## 10. Tokens
- `корень`: интервал `space/8`.
- `Breadcrumb item`: отступы `space/2`; радиус `radius/xs`.
- `separator`: заливка / цвет `icon/tertiary`; типографика `font-weight/regular`, `font/family/text`, `type/body/md`.

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Breadcrumbs`, вариантов 3 из 3; оси: Items.
- Борда: «Breadcrumbs — борда · шаблон v3», разделов 10.
- Описание: 647 знаков, разделы: Status: Level: Когда использовать: Последний пункт — A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsBreadcrumbs>`; Flutter: `DsBreadcrumbs`.
- Props: `items`: 2 | 3 | 4.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечания по манифесту (`npm run draft-audit`) — что мешает перевести в beta:
  - DESC: нет: Правила:
  - BOARD: нет разделов 05, 07, 08

## 15. Migration
- Legacy: не указано в описании набора — искать в `docs/migration/components.csv`, DS Web / App и продуктах

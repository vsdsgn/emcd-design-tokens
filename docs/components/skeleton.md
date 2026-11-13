# Skeleton — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Skeleton`. Status: draft. Level: atom.
- Figma: Components, страница «Skeleton» (`366:3171`), набор `34:14`.

## 2. Intent
- Кирпичи скелетона: Text, Title, Circle, Rect, Button, Input, Chip. Из них собираются Skeleton-состояния всех компонентов с данными (List item, Table row, Stat card, Chart card, Coin…
- Когда использовать: загрузка данных, форма известна.
- Когда нет: идёт действие — Loading у кнопки.
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: —.
- Служебные слои (вариантов из 7): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Shape | Text · Title · Circle · Rect · Button · Input · Chip | — |

Матрица полная: 7 вариантов.

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- контейнер aria-busy="true", для читалки — «Загрузка…» (role=status); prefers-reduced-motion — блик не бежит, вместо него мягкая пульсация прозрачности. |

## 10. Tokens
- `корень`: заливка / цвет `skeleton/base`; радиус `radius/container`, `radius/control`, `radius/full`, `radius/inner`.
- Значений без переменной: 14 (напр. `(root):w=200`, `(root):h=12`, `(root):w=160`, `(root):h=20`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Skeleton`, вариантов 7 из 7; оси: Shape.
- Борда: «Skeleton — борда · шаблон v3», разделов 10.
- Описание: 1130 знаков, разделы: Status: Level: Кирпичи скелетона: Цвет — Правила: A11y: Когда использовать: Поиск: Motion: Shimmer:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsSkeleton>`; Flutter: `DsSkeleton`.
- Props: `shape`: text | title | circle | rect | button | input | chip.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечаний по манифесту нет.

## 15. Migration
- Legacy: не указано в описании набора — искать в `docs/migration/components.csv`, DS Web / App и продуктах

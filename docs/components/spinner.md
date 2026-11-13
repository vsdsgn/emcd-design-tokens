# Spinner — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Spinner`. Status: draft. Level: molecule.
- Figma: Components, страница «Progress» (`366:3115`), набор `4:20`.

## 2. Intent
- Индикатор загрузки. Цвет — от родителя (по умолчанию text/primary), размер — icon/size/* (Platform). Анимация вращения — в коде (в Figma статичен).
- Когда использовать: действие идёт, длительность неизвестна, короткое (в кнопке, в блоке).
- Когда нет: загрузка данных — Skeleton.
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `track`, `arc`.
- Служебные слои (вариантов из 3): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | S · M · L | — |

Матрица полная: 3 вариантов.

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- Не описано: заполнить при переводе в beta.

## 10. Tokens
- `корень`: высота `icon/size/control`, `icon/size/lg`, `icon/size/sm`; ширина `icon/size/control`, `icon/size/lg`, `icon/size/sm`.
- `track`: заливка / цвет `icon/primary`; высота `icon/size/lg`, `icon/size/md`, `icon/size/sm`; ширина `icon/size/lg`, `icon/size/md`, `icon/size/sm`.
- `arc`: заливка / цвет `icon/primary`.
- Значений без переменной: 3 (напр. `track:o=0.2`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Spinner`, вариантов 3 из 3; оси: Size.
- Борда: «Progress — борда · шаблон v3», разделов 9.
- Описание: 933 знаков, разделы: Status: Level: Индикатор загрузки. Когда использовать: Поиск: Legacy: Motion: Правила: A11y:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsSpinner>`; Flutter: `DsSpinner`.
- Props: `size`: s | m | l.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечаний по манифесту нет.

## 15. Migration
- Legacy: ic-loader

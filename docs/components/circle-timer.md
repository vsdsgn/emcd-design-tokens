# Circle timer — контракт (2026-11-13)

Схема разделов — `docs/component-contract.md`. Системные правила (состояния, фокус, зоны, движение) — ссылками, не повтором.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json` и `scripts/contract-data.mjs` — править там, не здесь.

## 1. Identity
- Набор: `Circle timer`. Status: beta. Level: unknown.
- Figma: Components, страница «Circle timer» (`1661:328`), набор `1661:353`. Платформы: Web, Mobile web, iOS, Android.

## 2. Intent
- Круглый таймер обратного отсчёта: кольцо-прогресс, убывает по часовой стрелке. Показывает, сколько осталось до автоскрытия Toast или до повторной отправки кода.
- Когда использовать: автоскрытие Toast, повторная отправка кода, ограничение по времени.
- Когда нет: загрузка без срока — Spinner; прогресс выполнения — Progress.
- Правило выбора варианта:
  - Size: S 16 (`icon/size/sm`) — в строке с текстом (повторная отправка кода); M 24 (`icon/size/lg`) — в Toast, на месте иконки.
  - Progress: 100 / 75 / 50 / 25 — доля оставшегося времени; в макете — ближайший кадр, в коде значение непрерывное от 100 до 0.

## 3. Anatomy
- `track` — полное кольцо, обводка `border/default`, `border/width/strong`; размер — по корню (`icon/size/sm` | `icon/size/lg`).
- `progress` — дуга поверх трека, обводка `icon/accent`, `border/width/strong`; масштабируется вместе с треком (constraints Scale), убывает по часовой стрелке.
- Служебные слои (вариантов из 8): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Группа модели состояний (`docs/components.md`): нет: неинтерактивный элемент.
- Состояний нет. Ось Progress — доля оставшегося времени, не состояние.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Size | S · M | S |
| Progress | 100 · 75 · 50 · 25 | 100 |

Матрица полная: 8 вариантов.

## 6. Content / slots
- Текста нет: длинный текст и языки не влияют. Размер фиксирован осью Size: при тексте 200 % не растёт (проверено на стенде).
- RTL: направление убывания не зеркалится.

## 7. Events
- Нет. Окончание отсчёта (автоскрытие, разблокировка повторной отправки) обрабатывает родитель.

## 8. Behavior
- Стартует с 100 и убывает до 0 за время показа.
- Пауза при фокусе или наведении на родителя: Toast не скрывается.
- «Уменьшить движение»: статичное кольцо без анимации.

## 9. Accessibility
- Декоративен (`aria-hidden`), оставшееся время не озвучивается.
- Срок сообщает родитель: текст «Отправить повторно через N с» или Toast (`role="status"`).

## 10. Tokens
- `корень`: высота `icon/size/lg`, `icon/size/sm`; ширина `icon/size/lg`, `icon/size/sm`.
- `track`: высота `icon/size/lg`, `icon/size/sm`; обводка `border/default`; толщина обводки `border/width/strong`; ширина `icon/size/lg`, `icon/size/sm`.
- `progress`: обводка `icon/accent`; толщина обводки `border/width/strong`.

## 11. Platforms
- Размеры и плотность — из режима Platform (Web · Mobile web · iOS · Android); цвета от платформы не зависят.

## 12. Figma projection
- Набор `Circle timer`, вариантов 8 из 8; оси: Size, Progress.
- Борда: «Circle timer — борда · шаблон v3», разделов 9.
- Описание: 708 знаков, разделы: Status: Level: Когда использовать: Правила: A11y: Legacy: Токены:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsCircleTimer>`; Flutter: `DsCircleTimer`.
- Props: `size`: s | m; `progress`: 100 | 75 | 50 | 25.

## 14. Acceptance (2026-11-13)
- `audit.plugin.js` — 0 замечаний.
- `variables-check.plugin.js` — 0 замечаний.
- `audit-parity.plugin.js` — 0 (2026-11-13).
- `npm run parity` — токены набора есть в репо или ждут Publish (`docs/parity-baseline.json`); сверка props пропущена: кода нет.
- Не проверено: полный крест 72 ячеек — на стенде 2026-11-13 просмотрены 24 (Light / Dark × EMCD / Geometria / WL × Web / iOS / Android на L0 и L1–L3 для EMCD Web), длинный текст, 6 языков, 200 %, булевы свойства; RTL стенд не проверяет; текстовых и булевых свойств у набора нет — текстовые ячейки совпадают с умолчанием; кода нет — parity props пропущена.

## 15. Migration
- DS Web Toast / Circle timer → Circle timer (Size S | M, Progress 100 | 75 | 50 | 25).

Осталось доделать (после пакета правок beta 2026-11-13):
- Нет варианта Progress=0 (конец отсчёта, пустой трек) — на решение.

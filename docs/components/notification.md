# Notification — контракт · draft (2026-11-13)

Заготовка: собрана автоматически, набор в Figma не менялся и по критерию «Готово» не проверялся. В макеты и код не брать.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Notification`. Status: draft. Level: unknown.
- Figma: Components, страница «Notification» (`366:2939`), набор `179:620`.

## 2. Intent
- Уведомление в центре уведомлений (колокольчик в шапке).
- Когда использовать: не описано
- Когда нет: реакция на действие пользователя сейчас — Toast.
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `icon`, `icon/bell-notifications`, `content`, `title`, `text`, `time`, `unread`.
- Вложено: иконки ×2.
- Служебные слои (вариантов из 2): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 0.

## 4. States
- Ось State: Unread · Read. Группа модели состояний (`docs/components.md`) — определить при переводе в beta.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| State | Unread · Read | — |

Матрица полная: 2 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Title | текст | «Выплата отправлена» | 2 из 2 |
| Text | текст | «0,00500000 BTC ушли на адрес bc1q8c ••• x7k2pa» | 2 из 2 |
| Time | текст | «5 окт, 09:25» | 2 из 2 |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- список role="feed" или list; непрочитанное озвучивается («непрочитано»); «Отметить все прочитанными» — кнопка в шапке центра. |

## 10. Tokens
- `корень`: заливка / цвет `accent/subtle`; интервал `space/12`; maxw `size/toast/max`; отступы `space/12`, `space/16`; радиус `radius/control`.
- `icon`: заливка / цвет `surface/raised`; радиус `radius/chip`.
- `icon/bell-notifications`: высота `icon/size/md`; ширина `icon/size/md`.
- `content`: интервал `space/4`.
- `title`: заливка / цвет `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- `text`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/md`.
- `time`: заливка / цвет `text/secondary`; типографика `font-weight/regular`, `font/family/text`, `type/body/sm`.
- `unread`: заливка / цвет `action/primary/default`.
- Min / max корня: maxWidth 400 size/toast/max.

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Notification`, вариантов 2 из 2; оси: State.
- Борда: «Notification — борда · шаблон v3», разделов 10.
- Описание: 894 знаков, разделы: Status: Level: Unread — A11y: Когда использовать: Правила:

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsNotification>`; Flutter: `DsNotification`.
- Props: `title`: string или слот; `text`: string или слот; `time`: string или слот.
- Состояния (Unread, Read) — не props: Hover / Pressed / Focus из платформы; `disabled` — props.

## 14. Acceptance (2026-11-13)
- Плагины `audit`, `variables-check`, `audit-parity` и стенд не прогонялись: набор draft.
- Замечаний по манифесту нет.

## 15. Migration
- Legacy: не указано в описании набора — искать в `docs/migration/components.csv`, DS Web / App и продуктах

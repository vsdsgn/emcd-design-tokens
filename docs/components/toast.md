# Toast — контракт · draft (2026-11-14)

Заготовка: собрана автоматически. Набор заменён на месте (2026-11-13): фон, радиус и тень — слой `overlay surface`, нераскрытый экземпляр базы `_Overlay surface`; свойства набора не менялись. Поверхность, токены и приёмка базы — `docs/components/overlay-surface.md`. Status остаётся draft до ручного чеклиста и «ок» Стефана.
Собрано `scripts/contract-build.mjs` из `docs/ds-manifest.json`, `scripts/contract-draft-data.txt` (выжимка описания набора в Figma) и `scripts/draft-findings.mjs` — править там, не здесь.
При переводе в beta: запись в `scripts/contract-data.mjs` (разделы 2–4, 6–9, 11, 15), правки из раздела 14, плагины и стенд. Схема — `docs/component-contract.md`.

## 1. Identity
- Набор: `Toast`. Status: draft. Level: unknown.
- Figma: Components, страница «Toast» (`364:1389`), набор `1576:2`.

## 2. Intent
- Краткое всплывающее сообщение поверх страницы — отклик на действие («Настройки сохранены», «Вывод создан»).
- Когда использовать: подтверждение действия, результат фоновой операции.
- Когда нет: сообщение, которое должно остаться на странице (Suggest), блокирующий вопрос (Modal).
- Правило выбора варианта: не описано — заполнить при переводе в beta.

## 3. Anatomy
- Слои с токенами: `overlay surface`, `content`, `title`, `description`, `actions`, `Button`, `close`, `timer`, `row`.
- Вложено: `_Overlay surface` ×10, `media/status/info` ×2, `Button` ×10, `Icon button` ×10, `Circle timer` ×5, `media/status/success` ×1, `media/status/warning` ×1, `media/status/danger` ×1.
- Служебные слои (вариантов из 10): кольцо фокуса 0 · зона Web 0 · зона касания 0 · безопасное поле 5.

## 4. States
- Оси State нет.

## 5. Properties
Оси (варианты):

| Ось | Значения | По умолчанию |
|---|---|---|
| Layout | Card · Informer | — |
| Tone | Info · Success · Warning · Danger · Neutral | — |

Матрица полная: 10 вариантов.

Свойства:

| Свойство | Тип | По умолчанию | Привязано в вариантах |
|---|---|---|---|
| Title | текст | «Вывод создан» | 10 из 10 |
| Show title | булево | вкл | 10 из 10 |
| Description | текст | «Средства поступят в течение 30 минут. Статус — в истории выплат.» | 5 из 10 |
| Actions | булево | выкл | 5 из 10 |
| Close | булево | вкл | 10 из 10 |
| Icon | булево | вкл | 5 из 10 |
| Show description | булево | вкл | 5 из 10 |
| Timer | булево | выкл | 5 из 10 |
| Safe area | булево | вкл | 5 из 10 |

## 6. Content / slots
- Не описано: заполнить при переводе в beta.

## 7. Events
- Не описано: заполнить при переводе в beta.

## 8. Behavior
- Не описано: заполнить при переводе в beta.

## 9. Accessibility
- role="status" (polite), для ошибок role="alert"; крестик с aria-label «Закрыть»; фокус не забирает.

## 10. Tokens
- `корень`: интервал `space/12`; мин. ширина `size/toast/min`; отступы `space/12`, `space/16`, `space/20`, `space/48`; радиус `radius/control`.
- `overlay surface`: эффект `shadow/ambient`, `shadow/key`; заливка / цвет `action/inverse/default`, `status/danger/solid`, `status/info/solid`, `status/success/solid`, `status/warning/solid`, `surface/raised`; радиус `radius/control`; обводка `border/subtle`; толщина обводки `border/width/default`.
- `content`: интервал `space/10`; отступы `space/2`.
- `title`: заливка / цвет `text/inverse`, `text/on-accent`, `text/on-warning`, `text/primary`; типографика `font-weight/medium`, `font/family/text`, `type/label/lg`.
- `description`: заливка / цвет `text/secondary`; типографика `font-weight/medium`, `font/family/text`, `type/label/md`.
- `actions`: интервал `space/8`; отступы `space/8`.
- `Button`: заливка / цвет `action/tertiary/default`; интервал `space/2`; высота `control/height/sm`; мин. ширина `size/button/min`; отступы `space/4`, `space/6`; радиус `radius/control-sm`, `radius/xs`; обводка `control/border/default`; толщина обводки `border/width/default`.
- `close`: интервал `space/6`; высота `control/height/sm`; радиус `radius/control-sm`; ширина `control/height/sm`.
- `timer`: высота `icon/size/sm`; ширина `icon/size/sm`.
- `row`: интервал `space/12`; отступы `space/12`, `space/16`.
- Служебные слои (общие правила — `service-layers.md`): `safe area`: высота `os/safe-area/top`.
- Min / max корня: minWidth 280 size/toast/min.
- Значений без переменной: 10 (напр. `(root):w=400`, `(root):w=375`).

## 11. Platforms
- Не описано: заполнить при переводе в beta.

## 12. Figma projection
- Набор `Toast`, вариантов 10 из 10; оси: Layout, Tone.
- Борда: «Toast — борда · шаблон v3», разделов 10.
- Описание: 1458 знаков, разделы: Status: Level: Когда использовать: Правила: A11y: Legacy: Токены: Поверхность —

## 13. Code projection
Кода нет: DSP, Vue и Flutter недоступны (`docs/dsp-check-2026-11-12.md`). Ожидаемый API по правилам имён `scripts/parity.mjs` — сверить, когда появится манифест кода.

- Vue: `<DsToast>`; Flutter: `DsToast`.
- Props: `layout`: card | informer; `tone`: info | success | warning | danger | neutral; `title`: string или слот; `showTitle`: boolean = true; `description`: string или слот; `actions`: boolean = false; `close`: boolean = true; `icon`: boolean = true; `showDescription`: boolean = true; `timer`: boolean = false; `safeArea`: boolean = true.

## 14. Acceptance (2026-11-14)
- Плагины `audit`, `variables-check`, `audit-parity` прогнаны после замены (2026-11-13): `audit` 0, OVERLAY и SERVICE 0; остаток (числа min / max и др.) — в замечаниях ниже и в `docs/components/overlay-surface.md`, раздел 14. Стенд — на пилоте базы.
- Замечаний по манифесту нет.

## 15. Migration
- Legacy: DS Web Toast (base notification). Опора — App: `base notification` → Layout=Card, `informer` → Layout=Informer (`docs/migration/prod-refs-2026-11-14.md`).

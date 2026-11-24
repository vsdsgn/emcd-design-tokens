# План: старые цвета и компоненты → токены DS 2.0 (с 2026-11-24)

Приоритет Стефана: 1) миграция старых цветов на новую систему токенов; 2) переезд существующих компонентов (Storybook текущей DS) на новые токены; дальше — всё остальное (Цель 3).

## Доски (24.11, Web Migration test)
- «🧭 Миграция токенов» — 181 legacy-токен по источникам: было (Dark · Light) → токен DS 2.0 живой переменной, ΔE, действие, статус, места. Докрутить — 38: Δ открыто 16 (главное — зелёный и красный статусов), значения не сняты 9, роль подтвердить 6, этап 2 — 7.
- «🧭 Миграция компонентов» — 93 набора: production ↔ DS 2.0 (39 с парой), системные отличия, докрутить — 20: решение 4, сверить и починить 5, ждёт Publish 5, draft → beta 6.
- Скрипты: `scripts/figma/token-migration-board.plugin.js`, `component-migration-board.plugin.js`; данные компонентов — `docs/migration/component-migration-board.json`.

## Этап 1 — цвета
Карта `docs/migration/color-map.csv` (181 строка) закрыта 14–16.10 (OPEN-QUESTIONS «Этап 1»). Осталось:
- [x] Пилот перепривязки в Figma (24.11): Web Migration test, страница «🧪 Миграция цветов · пилот» — production «История» до / после. 129 привязок старых переменных (Color, theme, Basic color) → Theme DS 2.0; визуально 0,5 % пикселей отличаются (сдвиг уровней D-levels). Найдено и исправлено правило: `status/*/solid` на тексте → `text/*`.
- [x] Скрипт: `scripts/figma/color-swap.plugin.js` + сборка `python3 scripts/color-swap-build.py --src=<id> [--dry]` → `build/figma/color-swap.js`.
- [x] Прогон на 6 production-экранах Web App (24.11, страница «🧪 Миграция цветов · Web App», пары до / после): 1003 привязки, цели найдены все, неверных ролей глазами — 0. Отличия > 24 по яркости — 0,07–1,3 % пикселей (рамки карточек и полей стали видимыми, уровни L0–L3, тинты статусов) — все системные. Сырые hex (12–102 на экран) не трогали. Скрипт хранится в файле: скрытый текст «⚑ builder · color-swap» на странице теста.
- [x] App (24.11, App Migration test, «🧪 Миграция цветов · App», 6 экранов 375): переменные — ~180 привязок; в App почти всё сырым hex (56–185 на экран). Часть Theme-переменных в файле App импортируется нестабильно (`surface/level-0/1` — 9 мест не перепривязаны): в файле App принять последнее обновление Foundations.
- [x] Сырые hex — `scripts/figma/raw-hex-swap.plugin.js` (24.11): только точные совпадения с legacy-палитрой (текст → `text/*`, иконки в слоях ic-/icon → `icon/*`, фоны → уровни, обводки → `border/*`); иллюстрации, монеты, логотипы и полупрозрачные заливки не трогает. App — 404 привязки, Web — 226. Картинка: App «Ручной вывод» — отличие только у плашки-предупреждения (тинт `status/warning/subtle`). Заметка: неактивные иконки сайдбара Web в production `#4d4d4d` → `icon/disabled` по значению — уйдёт с заменой сайдбара на Nav item.
- [ ] Сырые hex (в пилоте 136 заливок без переменной) — привязка по роли и значению, отдельным проходом.
- [x] 24.11: значения Core-алиасов сняты (6 из 9; «Text/Color secondary» = #7a7a7a → text/tertiary), роли WL gray 300 / 400 подтверждены, 8 «Δ открыто» → системная ступень (D-step), обводка полей → control/border/default. Осталось: статусы зелёный / красный (9 строк, решение Стефана).
- [ ] ~~Открытые строки карты:~~ Core-алиасы «значение не снято» (9), WL B2B «роль подтвердить» (3), `Brand disable` в бейджах → `accent/subtle` (ждёт ок 16.10), Monitoring `Color › border` 68 из 255 не сверены, Rebind (7) — по роли.
- [ ] Код: слой совместимости `legacy-alias.css` (старая CSS-переменная → новая) + кодмод + линтер. **Нужны имена старых CSS-переменных** — Storybook (`ds-playground`) отсюда недоступен (403, VPN).
- [ ] Продуктовые Figma-файлы — только после ок Стефана.

## Этап 2 — компоненты
**Тест в Figma (24.11, Web Migration test, «🧪 Миграция компонентов · Web App»):** 6 production-экранов после перевода цветов → замена legacy-экземпляров скриптом `scripts/figma/component-swap.plugin.js` (размер — по реальной высоте, подпись, иконки, состояние, у Menu item — описание и слоты Leading / Trailing). Заменено: Button ×21, Menu item ×19, Tab ×4, Badge ×1; отличия от «только цвета» — 0,03–1,65 % пикселей (системные: высоты по шкале, плашка наведения). Найдено и исправлено: у Avatar Type=Text не было 2XS 16 и S 24 (в production — буквенные аватары монет) — добавлены (ждут Publish); инициалы были `accent/on-subtle` → `text/tertiary`, как legacy; в коде шкала Avatar была старой (S 32 · M 40 · L 56) → 2XS 16 · XS 20 · S 24 · M 32 · L 40 · XL 56.
24.11, вторая волна: + Icon button (baseButton без подписи), Search, Selector + Input → Select (значение = Filled, подпись на рамке, размер по высоте), DateRange.Field → Date range field (размер поля как у соседей, без подсказки), segmented picker → Segmented (подписи и выбранный сегмент); DS App: Period selector item → Chip, Selector small / dropdown → Select compact (монета в слот Leading), Badge (Size / Color / style) → Badge, Button Invert → Inverted, XL 56 — только App. После замены — `resetOverrides()`: заливки legacy-корня не переносятся (иначе выбранный Chip получал `surface/level-3` и тёмную подпись).
Итог теста: Web — Button 21, Menu item 19, Tab 4, Select 2, Segmented 2, Search, Date range field, Icon button, Badge; App — Button 8, Select compact 5, Chip 4, Select 2, Badge. Не покрыто: radio / toggle без подписи (в DS только с подписью — строки App собираются из List item + Trailing), List / Content / Left (строки App) → List item, avatar group line, tabs App, sidebar / tabbar / navigation bar (организмы).
На решение: выбранный Chip — в DS инверсия (белая плашка), в production App — тёмно-серый `#232323` с белым текстом. В production Web App таблицы, карточки и строки собраны вёрсткой, не экземплярами — их переводит этап «экраны».

### Storybook
**Принцип шага 1 (Стефан 24.11):** компонент максимально похож на оригинал (форма, размеры, логика); отличия — только системные улучшения DS 2.0: градации цветов (уровни L0–L3, альфа-текст, слой состояний 6/10 %, disabled 8/40 %), шкала размеров и скруглений, кольцо фокуса, контраст ≥ 4.5. Любое другое отличие от оригинала — ошибка. Редизайн — позже, отдельным шагом.

1. Инвентарь Storybook ↔ `docs/migration/components-inventory.csv` (114 строк). Нужен доступ к Storybook / репо.
2. Шаг A — перекраска без смены API: внутри компонента цвета, отступы, радиусы, типографика → токены. Сверка: скриншоты историй до / после, parity с Figma.
3. Шаг B — API по контракту DS 2.0, старое — deprecated до major (правило DSP).
4. Порядок: Button (пилот) → Icon button, Input, Select, Tabs, Badge, Chip → Table, Modal, Toast, Menu, Sidebar → остальное ядро → слияния / разбиения.
5. Готово по компоненту: 0 старых переменных, Light / Dark, все варианты в Storybook, parity 0, скриншоты сверены.

## Вопросы
- Доступ к Storybook / его репо (или выгрузка `index.json`). 24.11 повторно: Storybook и GitLab отвечают nginx 403 с сервера агента — нужен allowlist IP сервера или выгрузка.
- Где код компонентов: `ui-emcd-web`, который генерирует DSP, или отдельная библиотека.

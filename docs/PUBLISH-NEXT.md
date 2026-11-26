# Следующий Publish — что нажать (готовит агент, публикует Стефан)

Обновлять после каждой правки библиотек. Строка — в диалог Publish Figma как есть; детали — CHANGELOG «Unreleased».

## ~~Components — опубликовано 24.11~~ `v0.3.x — Avatar 2XS/S, Amount XL Display/SM, Tooltip 16, Modal / Chart card / Code cell Heading/XL`
- Avatar — Type=Text: Size 2XS 16 и S 24 (Default, Skeleton); инициалы `text/tertiary` (как legacy).
- Amount — XL: стиль Display/SM (32 на всех ширинах).
- Tooltip — текст Label/LG 16, `text/secondary` (как production).
- Modal — заголовок Size=MD: Heading/XL (было Display/MD, 48 на 1440).
- Chart card — значение Heading/XL. Code cell — L: Heading/XL.

После Publish: в Web Migration test принять обновление библиотеки; агент повторит замену аватаров на «🧪 Миграция компонентов · Web App».

## ~~Foundations~~ (опубликовано 24.11) — `v0.3.x — статусы как production: success #43a047, danger #e53935`
- `status/success/solid` → green/500, `status/danger/solid` → red/500, `action/success/default` → green/650.

## ~~Components~~ (опубликовано 24.11) — `v0.3.x — Badge Solid и Toast Informer: фон action/success|danger`
- Badge Solid Success / Danger, Toast Informer Success / Danger → `action/success|danger/default`.

## Icons — `v0.x — icon/home: исправлен контур (дверь была у верхнего края)`
- `icon/home` — глиф пересобран по Lucide house в тех же границах 15 × 15.8, привязки обводки (цвет, толщина) сохранены. Было видно как «лист с загнутым углом» в Tab bar App и Sidebar.
- Код: `icons/svg/home.svg` исправлен тем же контуром (уже в репо).

После Publish: в файлах Migration test принять обновление Icons.
- **Components · Segmented** (26.11): корень фиксированной ширины, сегменты Fill — растянутый экземпляр делит ширину поровну (контракт). Существующие экземпляры с HUG станут фиксированной ширины по умолчанию варианта.
- **Components · Password field** (26.11): вложенный Input открыт (exposed) — Size и Label position ставятся как у соседних полей формы (GOAL-4 M6).
- **Components · Avatar group** (26.11): Type=Person — Count 2 / 3 / 4 и Size S (было только Count=4, XS / M / L); +18 вариантов. После Publish — заменить `avatar group line` на экранах (component-swap-2, строка AvatarGroup включить).
- **Icons · Media** (26.11): логотипы EMCD вынесены из `Logo` (соцсети и магазины) в отдельный набор **Brand logo** — Brand=EMCD × Type=Mark (знак 24) | Wordmark (65×18); ключи компонентов сохранены (Tab bar «E», Top bar mobile web — связи не рвутся). У `Logo` снова только Network × Style (Mono / Color), сетка выровнена, слои Google Color названы.
- **Icons — уборка структуры** (26.11):
  - Icons: интерфейсные иконки (116) — секция «icon · интерфейс 20»; `icon/social/*`, `icon/store/*` (8) — отдельная секция «дубли набора Logo» (в Components не используются; VK есть только здесь) — на удаление по «ок» Стефана.
  - Symbols: монеты — секция «symbol/coin · 32»; маски свёрнуты (mapsme, bch, lucky), подряд идущие одноцветные векторы склеены (309 → 236 слоёв), junkcoin 34 → 32, lucky 33 → 32, слои `part` / `fill` / `mask`.
  - Media: секции по семействам; имена без суффиксов (`media/flag/russia`, `media/os/hiveos` …), `media/profile-status-verified` → `media/badge/verified`; маски флагов свёрнуты (11); `media/os/sm` 25 → 24; лишний экземпляр флага на странице удалён; `media/status/*` → набор **media/status** (Tone: Info / Success / Warning / Danger). Ключи компонентов сохранены.
- **Illustrations** (26.11): `status/pending | warning | attention | error | success` → один набор **status** (State × Product); `security/2fa`, `security/api-keys` — отдельные наборы, ось `product` → `Product`; секции. Ключи вариантов сохранены (Theme demo — связи целы).
- Правило (HOW-IT-WORKS): варианты — свойство одного объекта (тон, размер, стиль, продукт); другой объект (страна, ОС, монета, иконка) — отдельный компонент, выбор — instance swap.


# Coin

> 22.11: в Figma — Avatar · Type=Coin (Avatar и Coin слиты; общая шкала 2XS 16 · XS 20 · S 24 · M 32 · L 40 · XL 56). В коде — `Coin`, размеры прежние (xs 16 … xl 40).

Монета из Symbols (`symbol/coin/*`): списки монет, суммы, выбор монеты, история. Цвета монет от темы и бренда не зависят.

**Оси (как в Figma «🟡 Coin»):** Size XS 16 · S 20 · M 24 · L 32 · XL 40 (`size/media/*`) × Network Off · On × State Default · Skeleton. Network — монета сети 45 % в правом нижнем углу с кольцом `surface/current` (у XS нет: неразличима); выступает за корень — родителю без обрезки.

**Когда какой:** размер — по высоте строки или контрола. `coin` — тикер (btc, kas, ltc, doge) или имя файла Symbols; монеты нет в репо — нейтральный круг `status/neutral/subtle` с первой буквой тикера (до экспорта Symbols).

**Доступность:** декоративна (`aria-hidden`), название монеты — текстом рядом; без текста рядом — `label`.

Классы: `emcd-coin [emcd-coin--{s|m|l|xl}] [emcd-coin--skeleton]`, `emcd-coin__glyph`, `emcd-coin__fallback`, `emcd-coin__network`.

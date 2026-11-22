# Coin stack

> 22.11: в Figma — Avatar group · Type=Coin (Coin stack слит в Avatar group). В коде — `CoinStack`.

Несколько монет внахлёст: пул из нескольких монет, «KAS + 1», «Litecoin + 6». Первая — главная.

**Оси (как в Figma «🟡 Coin stack»):** Size S · M · L (монеты 24 / 32 / 40, нахлёст `size/overlap` −6 / −8 / −10) × Count 2 · 3 · 4; Show more + More — кружок «+N» (`status/neutral/subtle` поверх `surface/next`, label-sm Medium `text-secondary`).

**Правила:** кольцо каждой монеты — цвет подложки (`surface/current`): на L0–L3 совпадает с фоном. `coins` — тикеры по значимости; `count` — сколько показать (по умолчанию до 4); скрытые — «+N» автоматически. Не делаем: больше 4 монет без «+N».

**Доступность:** декоративна; список монет — текстом рядом (или `label`).

Классы: `emcd-coin-stack [emcd-coin-stack--{m|l}]`, `emcd-coin-stack__coin`, `emcd-coin-stack__more`.

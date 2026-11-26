# Avatar group (Person)

Несколько людей одним блоком: рефералы, участники, получатели. Контракт: `docs/components/avatar-group.md`. Монеты — `CoinStack` (Type=Coin).

- `people` — `[{ name, src?, initials? }]` по порядку; `size`: `xs` 20 · `s` 24 · `m` 32 · `l` 40; `count` — сколько показать (2–4, по умолчанию до 4); `showMore` / `more` — «+N».
- `label` — имя группы для читалки («Участники, 8»); без него группа декоративна.

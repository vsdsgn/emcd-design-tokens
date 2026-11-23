# Sparkline (draft, 23.11)

Мини-график тренда без осей и сетки — в строке таблицы (B2B Coins, хешрейт по монетам), в плитке, в List item. Типы — все виды Chart plot. Декоративный рядом с числом — `aria-hidden`; если несёт смысл — передайте `label` («Хешрейт за 7 дней: рост на 12 %»).

```jsx
<Sparkline type="line" data={[3, 5, 4, 7, 6, 9]} />
<Sparkline type="stacked-bars" series={[{ data: [1, 2, 3] }, { data: [2, 1, 2] }]} width={96} label="Доход за неделю" />
```

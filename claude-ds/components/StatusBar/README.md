# Status bar (draft, 21.11)

Полоса статусов парка: подпись, дорожка из сегментов по статусам и легенда «Status + число». Мониторинг «Главная» (статусы активных устройств), B2B Analytics «Workers».

- Когда нет: один показатель «занято / всего» — Progress; 2–3 статуса крупными числами с переходом — Status summary; динамика — Chart card.
- Правила: порядок Danger → Warning → Success → Neutral; ширина сегмента — доля (минимум 8); статус с нулём — сегмента нет, пункт легенды остаётся «—».
- A11y: дорожка — `role="img"` с текстом всех статусов; легенда — текст (не только цвет).

```jsx
<StatusBar caption="Статусы активных устройств" segments={[
  { tone: 'danger', label: 'Сбой', count: 1000, value: '1 000' },
  { tone: 'warning', label: 'Риск', count: 3000, value: '3 000' },
  { tone: 'success', label: 'Норма', count: 16500, value: '16 500' },
  { tone: 'neutral', label: 'Выкл', count: 61 },
]} />
```

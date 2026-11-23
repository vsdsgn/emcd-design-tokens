# Slider (draft, вернули 23.11)

Type=Single — значение из шкалы шагов (плечо, срок, доля реинвеста); Type=Range — диапазон «от–до» на непрерывной шкале (фильтры: комиссия, хешрейт). Нативные `input[type=range]`: клавиатура ←/→, Home/End и `aria-valuenow` — из коробки; у Range два ползунка с подписями «от» / «до».

```jsx
<Slider label="Плечо" min={1} max={5} steps={5} labels defaultValue={3} />
<Slider type="range" label="Pool fee" min={0} max={3} step={0.1} defaultValue={[1.1, 1.5]} format={(v) => v.toFixed(1) + ' %'} />
```

# Breadcrumbs (beta, 23.11)

Путь к текущей странице на Web: над заголовком `PageHeader` вложенных страниц (2+ уровня). В App и Compact — «назад» в Top bar, крошек нет. Последний пункт — текущая страница (`aria-current="page"`, не ссылка). Больше 4 уровней — сворачивается: первый · «…» (Menu со скрытыми уровнями) · два последних.

```jsx
<PageHeader title="Bitmain Antminer Z15 Pro 840" breadcrumbs={[{ label: 'Устройства', href: '/devices' }, { label: 'Активные', href: '/devices?s=active' }, { label: 'Bitmain Antminer Z15 Pro 840' }]} />
<Breadcrumbs items={[{ label: 'Users', href: '/users' }, { label: 'Alexandrewang' }]} />
```

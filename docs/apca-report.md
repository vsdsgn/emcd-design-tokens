# APCA-отчёт по токенам

Сгенерировано `scripts/apca-check.py` из `build/json`. Вторая метрика рядом с WCAG (`a11y-check.py`): WCAG 2.2 остаётся базой, APCA ловит то, что WCAG пропускает (светлый серый текст в тёмной теме, тонкий текст на средних тонах). Уровни по |Lc|: 90 желательно для основного текста, 75 минимум для основного, 60 для вторичного, 45 для крупного текста, иконок и графики, 30 для placeholder и disabled.

## Сводка

| Набор | Пар | Ниже по APCA | Ниже по WCAG | WCAG ok, APCA ниже | APCA ok, WCAG ниже |
|---|---|---|---|---|---|
| emcd.dark.android | 79 | 52 | 0 | 52 | 0 |
| emcd.light.android | 79 | 10 | 0 | 10 | 0 |
| geometria.dark.android | 79 | 52 | 0 | 52 | 0 |
| geometria.light.android | 79 | 10 | 0 | 10 | 0 |
| wl-default.dark.android | 79 | 52 | 0 | 52 | 0 |
| wl-default.light.android | 79 | 10 | 0 | 10 | 0 |

## emcd.dark.android

| Роль | Фон | Lc | Нужно | WCAG | Нужно | Итог |
|---|---|---|---|---|---|---|
| textSecondary | surfaceLevel0 | 65 | 75 | 10.29 | 4.5 | WCAG ok, APCA ниже |
| textTertiary | surfaceLevel0 | 44 | 60 | 6.48 | 4.5 | WCAG ok, APCA ниже |
| textAccent | surfaceLevel0 | 40 | 75 | 5.66 | 4.5 | WCAG ok, APCA ниже |
| textLink | surfaceLevel0 | 40 | 75 | 5.66 | 4.5 | WCAG ok, APCA ниже |
| textDanger | surfaceLevel0 | 43 | 75 | 6.20 | 4.5 | WCAG ok, APCA ниже |
| textSuccess | surfaceLevel0 | 41 | 75 | 5.99 | 4.5 | WCAG ok, APCA ниже |
| textWarning | surfaceLevel0 | 60 | 75 | 9.22 | 4.5 | WCAG ok, APCA ниже |
| textInfo | surfaceLevel0 | 48 | 75 | 6.98 | 4.5 | WCAG ok, APCA ниже |
| iconTertiary | surfaceLevel0 | 44 | 45 | 6.48 | 3 | WCAG ok, APCA ниже |
| iconAccent | surfaceLevel0 | 40 | 45 | 5.66 | 3 | WCAG ok, APCA ниже |
| iconDanger | surfaceLevel0 | 43 | 45 | 6.20 | 3 | WCAG ok, APCA ниже |
| iconSuccess | surfaceLevel0 | 41 | 45 | 5.99 | 3 | WCAG ok, APCA ниже |
| borderStrong | surfaceLevel0 | 25 | 45 | 3.77 | 3 | WCAG ok, APCA ниже |
| borderFocus | surfaceLevel0 | 44 | 45 | 6.48 | 3 | WCAG ok, APCA ниже |
| textSecondary | surfaceLevel1 | 67 | 75 | 9.49 | 4.5 | WCAG ok, APCA ниже |
| textTertiary | surfaceLevel1 | 47 | 60 | 6.22 | 4.5 | WCAG ok, APCA ниже |
| textAccent | surfaceLevel1 | 38 | 75 | 4.98 | 4.5 | WCAG ok, APCA ниже |
| textLink | surfaceLevel1 | 38 | 75 | 4.98 | 4.5 | WCAG ok, APCA ниже |
| textDanger | surfaceLevel1 | 42 | 75 | 5.45 | 4.5 | WCAG ok, APCA ниже |
| textSuccess | surfaceLevel1 | 40 | 75 | 5.27 | 4.5 | WCAG ok, APCA ниже |
| textWarning | surfaceLevel1 | 59 | 75 | 8.10 | 4.5 | WCAG ok, APCA ниже |
| textInfo | surfaceLevel1 | 46 | 75 | 6.13 | 4.5 | WCAG ok, APCA ниже |
| iconAccent | surfaceLevel1 | 38 | 45 | 4.98 | 3 | WCAG ok, APCA ниже |
| iconDanger | surfaceLevel1 | 42 | 45 | 5.45 | 3 | WCAG ok, APCA ниже |
| iconSuccess | surfaceLevel1 | 40 | 45 | 5.27 | 3 | WCAG ok, APCA ниже |
| borderStrong | surfaceLevel1 | 29 | 45 | 3.81 | 3 | WCAG ok, APCA ниже |
| textSecondary | surfaceLevel2 | 67 | 75 | 9.04 | 4.5 | WCAG ok, APCA ниже |
| textTertiary | surfaceLevel2 | 47 | 60 | 6.01 | 4.5 | WCAG ok, APCA ниже |
| textAccent | surfaceLevel2 | 38 | 75 | 4.66 | 4.5 | WCAG ok, APCA ниже |
| textLink | surfaceLevel2 | 38 | 75 | 4.66 | 4.5 | WCAG ok, APCA ниже |
| textDanger | surfaceLevel2 | 41 | 75 | 5.10 | 4.5 | WCAG ok, APCA ниже |
| textSuccess | surfaceLevel2 | 39 | 75 | 4.93 | 4.5 | WCAG ok, APCA ниже |
| textWarning | surfaceLevel2 | 58 | 75 | 7.59 | 4.5 | WCAG ok, APCA ниже |
| textInfo | surfaceLevel2 | 46 | 75 | 5.74 | 4.5 | WCAG ok, APCA ниже |
| iconAccent | surfaceLevel2 | 38 | 45 | 4.66 | 3 | WCAG ok, APCA ниже |
| iconDanger | surfaceLevel2 | 41 | 45 | 5.10 | 3 | WCAG ok, APCA ниже |
| iconSuccess | surfaceLevel2 | 39 | 45 | 4.93 | 3 | WCAG ok, APCA ниже |
| borderStrong | surfaceLevel2 | 29 | 45 | 3.75 | 3 | WCAG ok, APCA ниже |
| textSecondary | surfaceLevel3 | 67 | 75 | 8.55 | 4.5 | WCAG ok, APCA ниже |
| textTertiary | surfaceLevel3 | 48 | 60 | 5.77 | 4.5 | WCAG ok, APCA ниже |
| textSecondary | surfaceRaised | 67 | 75 | 9.49 | 4.5 | WCAG ok, APCA ниже |
| textTertiary | surfaceRaised | 47 | 60 | 6.22 | 4.5 | WCAG ok, APCA ниже |
| textAccent | surfaceRaised | 38 | 75 | 4.98 | 4.5 | WCAG ok, APCA ниже |
| textLink | surfaceRaised | 38 | 75 | 4.98 | 4.5 | WCAG ok, APCA ниже |
| textDanger | surfaceRaised | 42 | 75 | 5.45 | 4.5 | WCAG ok, APCA ниже |
| textSuccess | surfaceRaised | 40 | 75 | 5.27 | 4.5 | WCAG ok, APCA ниже |
| textWarning | surfaceRaised | 59 | 75 | 8.10 | 4.5 | WCAG ok, APCA ниже |
| textInfo | surfaceRaised | 46 | 75 | 6.13 | 4.5 | WCAG ok, APCA ниже |
| iconAccent | surfaceRaised | 38 | 45 | 4.98 | 3 | WCAG ok, APCA ниже |
| iconDanger | surfaceRaised | 42 | 45 | 5.45 | 3 | WCAG ok, APCA ниже |
| iconSuccess | surfaceRaised | 40 | 45 | 5.27 | 3 | WCAG ok, APCA ниже |
| borderStrong | surfaceRaised | 29 | 45 | 3.81 | 3 | WCAG ok, APCA ниже |

## emcd.light.android

| Роль | Фон | Lc | Нужно | WCAG | Нужно | Итог |
|---|---|---|---|---|---|---|
| textAccent | surfaceLevel1 | 74 | 75 | 5.64 | 4.5 | WCAG ok, APCA ниже |
| textLink | surfaceLevel1 | 74 | 75 | 5.64 | 4.5 | WCAG ok, APCA ниже |
| textDanger | surfaceLevel1 | 70 | 75 | 5.06 | 4.5 | WCAG ok, APCA ниже |
| textSuccess | surfaceLevel1 | 75 | 75 | 5.71 | 4.5 | WCAG ok, APCA ниже |
| textAccent | surfaceLevel2 | 68 | 75 | 5.20 | 4.5 | WCAG ok, APCA ниже |
| textLink | surfaceLevel2 | 68 | 75 | 5.20 | 4.5 | WCAG ok, APCA ниже |
| textDanger | surfaceLevel2 | 65 | 75 | 4.67 | 4.5 | WCAG ok, APCA ниже |
| textSuccess | surfaceLevel2 | 69 | 75 | 5.27 | 4.5 | WCAG ok, APCA ниже |
| textWarning | surfaceLevel2 | 74 | 75 | 6.21 | 4.5 | WCAG ok, APCA ниже |
| textInfo | surfaceLevel2 | 72 | 75 | 5.72 | 4.5 | WCAG ok, APCA ниже |

## geometria.dark.android

| Роль | Фон | Lc | Нужно | WCAG | Нужно | Итог |
|---|---|---|---|---|---|---|
| textSecondary | surfaceLevel0 | 65 | 75 | 10.29 | 4.5 | WCAG ok, APCA ниже |
| textTertiary | surfaceLevel0 | 44 | 60 | 6.48 | 4.5 | WCAG ok, APCA ниже |
| textAccent | surfaceLevel0 | 43 | 75 | 6.13 | 4.5 | WCAG ok, APCA ниже |
| textLink | surfaceLevel0 | 43 | 75 | 6.13 | 4.5 | WCAG ok, APCA ниже |
| textDanger | surfaceLevel0 | 43 | 75 | 6.20 | 4.5 | WCAG ok, APCA ниже |
| textSuccess | surfaceLevel0 | 41 | 75 | 5.99 | 4.5 | WCAG ok, APCA ниже |
| textWarning | surfaceLevel0 | 60 | 75 | 9.22 | 4.5 | WCAG ok, APCA ниже |
| textInfo | surfaceLevel0 | 48 | 75 | 6.98 | 4.5 | WCAG ok, APCA ниже |
| iconTertiary | surfaceLevel0 | 44 | 45 | 6.48 | 3 | WCAG ok, APCA ниже |
| iconAccent | surfaceLevel0 | 43 | 45 | 6.13 | 3 | WCAG ok, APCA ниже |
| iconDanger | surfaceLevel0 | 43 | 45 | 6.20 | 3 | WCAG ok, APCA ниже |
| iconSuccess | surfaceLevel0 | 41 | 45 | 5.99 | 3 | WCAG ok, APCA ниже |
| borderStrong | surfaceLevel0 | 25 | 45 | 3.77 | 3 | WCAG ok, APCA ниже |
| borderFocus | surfaceLevel0 | 44 | 45 | 6.48 | 3 | WCAG ok, APCA ниже |
| textSecondary | surfaceLevel1 | 67 | 75 | 9.49 | 4.5 | WCAG ok, APCA ниже |
| textTertiary | surfaceLevel1 | 47 | 60 | 6.22 | 4.5 | WCAG ok, APCA ниже |
| textAccent | surfaceLevel1 | 41 | 75 | 5.39 | 4.5 | WCAG ok, APCA ниже |
| textLink | surfaceLevel1 | 41 | 75 | 5.39 | 4.5 | WCAG ok, APCA ниже |
| textDanger | surfaceLevel1 | 42 | 75 | 5.45 | 4.5 | WCAG ok, APCA ниже |
| textSuccess | surfaceLevel1 | 40 | 75 | 5.27 | 4.5 | WCAG ok, APCA ниже |
| textWarning | surfaceLevel1 | 59 | 75 | 8.10 | 4.5 | WCAG ok, APCA ниже |
| textInfo | surfaceLevel1 | 46 | 75 | 6.13 | 4.5 | WCAG ok, APCA ниже |
| iconAccent | surfaceLevel1 | 41 | 45 | 5.39 | 3 | WCAG ok, APCA ниже |
| iconDanger | surfaceLevel1 | 42 | 45 | 5.45 | 3 | WCAG ok, APCA ниже |
| iconSuccess | surfaceLevel1 | 40 | 45 | 5.27 | 3 | WCAG ok, APCA ниже |
| borderStrong | surfaceLevel1 | 29 | 45 | 3.81 | 3 | WCAG ok, APCA ниже |
| textSecondary | surfaceLevel2 | 67 | 75 | 9.04 | 4.5 | WCAG ok, APCA ниже |
| textTertiary | surfaceLevel2 | 47 | 60 | 6.01 | 4.5 | WCAG ok, APCA ниже |
| textAccent | surfaceLevel2 | 41 | 75 | 5.05 | 4.5 | WCAG ok, APCA ниже |
| textLink | surfaceLevel2 | 41 | 75 | 5.05 | 4.5 | WCAG ok, APCA ниже |
| textDanger | surfaceLevel2 | 41 | 75 | 5.10 | 4.5 | WCAG ok, APCA ниже |
| textSuccess | surfaceLevel2 | 39 | 75 | 4.93 | 4.5 | WCAG ok, APCA ниже |
| textWarning | surfaceLevel2 | 58 | 75 | 7.59 | 4.5 | WCAG ok, APCA ниже |
| textInfo | surfaceLevel2 | 46 | 75 | 5.74 | 4.5 | WCAG ok, APCA ниже |
| iconAccent | surfaceLevel2 | 41 | 45 | 5.05 | 3 | WCAG ok, APCA ниже |
| iconDanger | surfaceLevel2 | 41 | 45 | 5.10 | 3 | WCAG ok, APCA ниже |
| iconSuccess | surfaceLevel2 | 39 | 45 | 4.93 | 3 | WCAG ok, APCA ниже |
| borderStrong | surfaceLevel2 | 29 | 45 | 3.75 | 3 | WCAG ok, APCA ниже |
| textSecondary | surfaceLevel3 | 67 | 75 | 8.55 | 4.5 | WCAG ok, APCA ниже |
| textTertiary | surfaceLevel3 | 48 | 60 | 5.77 | 4.5 | WCAG ok, APCA ниже |
| textSecondary | surfaceRaised | 67 | 75 | 9.49 | 4.5 | WCAG ok, APCA ниже |
| textTertiary | surfaceRaised | 47 | 60 | 6.22 | 4.5 | WCAG ok, APCA ниже |
| textAccent | surfaceRaised | 41 | 75 | 5.39 | 4.5 | WCAG ok, APCA ниже |
| textLink | surfaceRaised | 41 | 75 | 5.39 | 4.5 | WCAG ok, APCA ниже |
| textDanger | surfaceRaised | 42 | 75 | 5.45 | 4.5 | WCAG ok, APCA ниже |
| textSuccess | surfaceRaised | 40 | 75 | 5.27 | 4.5 | WCAG ok, APCA ниже |
| textWarning | surfaceRaised | 59 | 75 | 8.10 | 4.5 | WCAG ok, APCA ниже |
| textInfo | surfaceRaised | 46 | 75 | 6.13 | 4.5 | WCAG ok, APCA ниже |
| iconAccent | surfaceRaised | 41 | 45 | 5.39 | 3 | WCAG ok, APCA ниже |
| iconDanger | surfaceRaised | 42 | 45 | 5.45 | 3 | WCAG ok, APCA ниже |
| iconSuccess | surfaceRaised | 40 | 45 | 5.27 | 3 | WCAG ok, APCA ниже |
| borderStrong | surfaceRaised | 29 | 45 | 3.81 | 3 | WCAG ok, APCA ниже |

## geometria.light.android

| Роль | Фон | Lc | Нужно | WCAG | Нужно | Итог |
|---|---|---|---|---|---|---|
| textAccent | surfaceLevel1 | 72 | 75 | 5.23 | 4.5 | WCAG ok, APCA ниже |
| textLink | surfaceLevel1 | 72 | 75 | 5.23 | 4.5 | WCAG ok, APCA ниже |
| textDanger | surfaceLevel1 | 70 | 75 | 5.06 | 4.5 | WCAG ok, APCA ниже |
| textSuccess | surfaceLevel1 | 75 | 75 | 5.71 | 4.5 | WCAG ok, APCA ниже |
| textAccent | surfaceLevel2 | 66 | 75 | 4.83 | 4.5 | WCAG ok, APCA ниже |
| textLink | surfaceLevel2 | 66 | 75 | 4.83 | 4.5 | WCAG ok, APCA ниже |
| textDanger | surfaceLevel2 | 65 | 75 | 4.67 | 4.5 | WCAG ok, APCA ниже |
| textSuccess | surfaceLevel2 | 69 | 75 | 5.27 | 4.5 | WCAG ok, APCA ниже |
| textWarning | surfaceLevel2 | 74 | 75 | 6.21 | 4.5 | WCAG ok, APCA ниже |
| textInfo | surfaceLevel2 | 72 | 75 | 5.72 | 4.5 | WCAG ok, APCA ниже |

## wl-default.dark.android

| Роль | Фон | Lc | Нужно | WCAG | Нужно | Итог |
|---|---|---|---|---|---|---|
| textSecondary | surfaceLevel0 | 65 | 75 | 10.29 | 4.5 | WCAG ok, APCA ниже |
| textTertiary | surfaceLevel0 | 44 | 60 | 6.48 | 4.5 | WCAG ok, APCA ниже |
| textAccent | surfaceLevel0 | 40 | 75 | 5.66 | 4.5 | WCAG ok, APCA ниже |
| textLink | surfaceLevel0 | 40 | 75 | 5.66 | 4.5 | WCAG ok, APCA ниже |
| textDanger | surfaceLevel0 | 43 | 75 | 6.20 | 4.5 | WCAG ok, APCA ниже |
| textSuccess | surfaceLevel0 | 41 | 75 | 5.99 | 4.5 | WCAG ok, APCA ниже |
| textWarning | surfaceLevel0 | 60 | 75 | 9.22 | 4.5 | WCAG ok, APCA ниже |
| textInfo | surfaceLevel0 | 48 | 75 | 6.98 | 4.5 | WCAG ok, APCA ниже |
| iconTertiary | surfaceLevel0 | 44 | 45 | 6.48 | 3 | WCAG ok, APCA ниже |
| iconAccent | surfaceLevel0 | 40 | 45 | 5.66 | 3 | WCAG ok, APCA ниже |
| iconDanger | surfaceLevel0 | 43 | 45 | 6.20 | 3 | WCAG ok, APCA ниже |
| iconSuccess | surfaceLevel0 | 41 | 45 | 5.99 | 3 | WCAG ok, APCA ниже |
| borderStrong | surfaceLevel0 | 25 | 45 | 3.77 | 3 | WCAG ok, APCA ниже |
| borderFocus | surfaceLevel0 | 44 | 45 | 6.48 | 3 | WCAG ok, APCA ниже |
| textSecondary | surfaceLevel1 | 67 | 75 | 9.49 | 4.5 | WCAG ok, APCA ниже |
| textTertiary | surfaceLevel1 | 47 | 60 | 6.22 | 4.5 | WCAG ok, APCA ниже |
| textAccent | surfaceLevel1 | 38 | 75 | 4.98 | 4.5 | WCAG ok, APCA ниже |
| textLink | surfaceLevel1 | 38 | 75 | 4.98 | 4.5 | WCAG ok, APCA ниже |
| textDanger | surfaceLevel1 | 42 | 75 | 5.45 | 4.5 | WCAG ok, APCA ниже |
| textSuccess | surfaceLevel1 | 40 | 75 | 5.27 | 4.5 | WCAG ok, APCA ниже |
| textWarning | surfaceLevel1 | 59 | 75 | 8.10 | 4.5 | WCAG ok, APCA ниже |
| textInfo | surfaceLevel1 | 46 | 75 | 6.13 | 4.5 | WCAG ok, APCA ниже |
| iconAccent | surfaceLevel1 | 38 | 45 | 4.98 | 3 | WCAG ok, APCA ниже |
| iconDanger | surfaceLevel1 | 42 | 45 | 5.45 | 3 | WCAG ok, APCA ниже |
| iconSuccess | surfaceLevel1 | 40 | 45 | 5.27 | 3 | WCAG ok, APCA ниже |
| borderStrong | surfaceLevel1 | 29 | 45 | 3.81 | 3 | WCAG ok, APCA ниже |
| textSecondary | surfaceLevel2 | 67 | 75 | 9.04 | 4.5 | WCAG ok, APCA ниже |
| textTertiary | surfaceLevel2 | 47 | 60 | 6.01 | 4.5 | WCAG ok, APCA ниже |
| textAccent | surfaceLevel2 | 38 | 75 | 4.66 | 4.5 | WCAG ok, APCA ниже |
| textLink | surfaceLevel2 | 38 | 75 | 4.66 | 4.5 | WCAG ok, APCA ниже |
| textDanger | surfaceLevel2 | 41 | 75 | 5.10 | 4.5 | WCAG ok, APCA ниже |
| textSuccess | surfaceLevel2 | 39 | 75 | 4.93 | 4.5 | WCAG ok, APCA ниже |
| textWarning | surfaceLevel2 | 58 | 75 | 7.59 | 4.5 | WCAG ok, APCA ниже |
| textInfo | surfaceLevel2 | 46 | 75 | 5.74 | 4.5 | WCAG ok, APCA ниже |
| iconAccent | surfaceLevel2 | 38 | 45 | 4.66 | 3 | WCAG ok, APCA ниже |
| iconDanger | surfaceLevel2 | 41 | 45 | 5.10 | 3 | WCAG ok, APCA ниже |
| iconSuccess | surfaceLevel2 | 39 | 45 | 4.93 | 3 | WCAG ok, APCA ниже |
| borderStrong | surfaceLevel2 | 29 | 45 | 3.75 | 3 | WCAG ok, APCA ниже |
| textSecondary | surfaceLevel3 | 67 | 75 | 8.55 | 4.5 | WCAG ok, APCA ниже |
| textTertiary | surfaceLevel3 | 48 | 60 | 5.77 | 4.5 | WCAG ok, APCA ниже |
| textSecondary | surfaceRaised | 67 | 75 | 9.49 | 4.5 | WCAG ok, APCA ниже |
| textTertiary | surfaceRaised | 47 | 60 | 6.22 | 4.5 | WCAG ok, APCA ниже |
| textAccent | surfaceRaised | 38 | 75 | 4.98 | 4.5 | WCAG ok, APCA ниже |
| textLink | surfaceRaised | 38 | 75 | 4.98 | 4.5 | WCAG ok, APCA ниже |
| textDanger | surfaceRaised | 42 | 75 | 5.45 | 4.5 | WCAG ok, APCA ниже |
| textSuccess | surfaceRaised | 40 | 75 | 5.27 | 4.5 | WCAG ok, APCA ниже |
| textWarning | surfaceRaised | 59 | 75 | 8.10 | 4.5 | WCAG ok, APCA ниже |
| textInfo | surfaceRaised | 46 | 75 | 6.13 | 4.5 | WCAG ok, APCA ниже |
| iconAccent | surfaceRaised | 38 | 45 | 4.98 | 3 | WCAG ok, APCA ниже |
| iconDanger | surfaceRaised | 42 | 45 | 5.45 | 3 | WCAG ok, APCA ниже |
| iconSuccess | surfaceRaised | 40 | 45 | 5.27 | 3 | WCAG ok, APCA ниже |
| borderStrong | surfaceRaised | 29 | 45 | 3.81 | 3 | WCAG ok, APCA ниже |

## wl-default.light.android

| Роль | Фон | Lc | Нужно | WCAG | Нужно | Итог |
|---|---|---|---|---|---|---|
| textAccent | surfaceLevel1 | 74 | 75 | 5.64 | 4.5 | WCAG ok, APCA ниже |
| textLink | surfaceLevel1 | 74 | 75 | 5.64 | 4.5 | WCAG ok, APCA ниже |
| textDanger | surfaceLevel1 | 70 | 75 | 5.06 | 4.5 | WCAG ok, APCA ниже |
| textSuccess | surfaceLevel1 | 75 | 75 | 5.71 | 4.5 | WCAG ok, APCA ниже |
| textAccent | surfaceLevel2 | 68 | 75 | 5.20 | 4.5 | WCAG ok, APCA ниже |
| textLink | surfaceLevel2 | 68 | 75 | 5.20 | 4.5 | WCAG ok, APCA ниже |
| textDanger | surfaceLevel2 | 65 | 75 | 4.67 | 4.5 | WCAG ok, APCA ниже |
| textSuccess | surfaceLevel2 | 69 | 75 | 5.27 | 4.5 | WCAG ok, APCA ниже |
| textWarning | surfaceLevel2 | 74 | 75 | 6.21 | 4.5 | WCAG ok, APCA ниже |
| textInfo | surfaceLevel2 | 72 | 75 | 5.72 | 4.5 | WCAG ok, APCA ниже |

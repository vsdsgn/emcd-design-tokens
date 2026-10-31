# APCA-отчёт по токенам

Сгенерировано `scripts/apca-check.py` из `build/json`. Вторая метрика рядом с WCAG (`a11y-check.py`): WCAG 2.2 остаётся базой, APCA ловит то, что WCAG пропускает (светлый серый текст в тёмной теме, тонкий текст на средних тонах). Уровни по |Lc|: 90 желательно для основного текста, 75 минимум для основного, 60 для вторичного, 45 для крупного текста, иконок и графики, 30 для placeholder и disabled.

## Сводка

| Набор | Пар | Ниже по APCA | Ниже по WCAG | WCAG ok, APCA ниже | APCA ok, WCAG ниже |
|---|---|---|---|---|---|
| emcd.dark.android | 79 | 44 | 0 | 44 | 0 |
| emcd.light.android | 79 | 10 | 0 | 10 | 0 |
| geometria.dark.android | 79 | 41 | 0 | 41 | 0 |
| geometria.light.android | 79 | 10 | 0 | 10 | 0 |
| wl-default.dark.android | 79 | 44 | 0 | 44 | 0 |
| wl-default.light.android | 79 | 10 | 0 | 10 | 0 |

## emcd.dark.android

| Роль | Фон | Lc | Нужно | WCAG | Нужно | Итог |
|---|---|---|---|---|---|---|
| textSecondary | surfaceLevel0 | 65 | 75 | 10.29 | 4.5 | WCAG ok, APCA ниже |
| textTertiary | surfaceLevel0 | 44 | 60 | 6.48 | 4.5 | WCAG ok, APCA ниже |
| textAccent | surfaceLevel0 | 46 | 75 | 6.69 | 4.5 | WCAG ok, APCA ниже |
| textLink | surfaceLevel0 | 46 | 75 | 6.69 | 4.5 | WCAG ok, APCA ниже |
| textDanger | surfaceLevel0 | 49 | 75 | 7.20 | 4.5 | WCAG ok, APCA ниже |
| textSuccess | surfaceLevel0 | 46 | 75 | 6.78 | 4.5 | WCAG ok, APCA ниже |
| textWarning | surfaceLevel0 | 64 | 75 | 9.90 | 4.5 | WCAG ok, APCA ниже |
| textInfo | surfaceLevel0 | 53 | 75 | 7.98 | 4.5 | WCAG ok, APCA ниже |
| iconTertiary | surfaceLevel0 | 44 | 45 | 6.48 | 3 | WCAG ok, APCA ниже |
| borderStrong | surfaceLevel0 | 25 | 45 | 3.77 | 3 | WCAG ok, APCA ниже |
| borderFocus | surfaceLevel0 | 44 | 45 | 6.48 | 3 | WCAG ok, APCA ниже |
| textSecondary | surfaceLevel1 | 67 | 75 | 9.49 | 4.5 | WCAG ok, APCA ниже |
| textTertiary | surfaceLevel1 | 47 | 60 | 6.22 | 4.5 | WCAG ok, APCA ниже |
| textAccent | surfaceLevel1 | 45 | 75 | 5.88 | 4.5 | WCAG ok, APCA ниже |
| textLink | surfaceLevel1 | 45 | 75 | 5.88 | 4.5 | WCAG ok, APCA ниже |
| textDanger | surfaceLevel1 | 48 | 75 | 6.33 | 4.5 | WCAG ok, APCA ниже |
| textSuccess | surfaceLevel1 | 45 | 75 | 5.96 | 4.5 | WCAG ok, APCA ниже |
| textWarning | surfaceLevel1 | 63 | 75 | 8.70 | 4.5 | WCAG ok, APCA ниже |
| textInfo | surfaceLevel1 | 52 | 75 | 7.01 | 4.5 | WCAG ok, APCA ниже |
| iconAccent | surfaceLevel1 | 45 | 45 | 5.88 | 3 | WCAG ok, APCA ниже |
| borderStrong | surfaceLevel1 | 29 | 45 | 3.81 | 3 | WCAG ok, APCA ниже |
| textSecondary | surfaceLevel2 | 67 | 75 | 9.04 | 4.5 | WCAG ok, APCA ниже |
| textTertiary | surfaceLevel2 | 47 | 60 | 6.01 | 4.5 | WCAG ok, APCA ниже |
| textAccent | surfaceLevel2 | 44 | 75 | 5.50 | 4.5 | WCAG ok, APCA ниже |
| textLink | surfaceLevel2 | 44 | 75 | 5.50 | 4.5 | WCAG ok, APCA ниже |
| textDanger | surfaceLevel2 | 47 | 75 | 5.92 | 4.5 | WCAG ok, APCA ниже |
| textSuccess | surfaceLevel2 | 44 | 75 | 5.58 | 4.5 | WCAG ok, APCA ниже |
| textWarning | surfaceLevel2 | 62 | 75 | 8.15 | 4.5 | WCAG ok, APCA ниже |
| textInfo | surfaceLevel2 | 51 | 75 | 6.57 | 4.5 | WCAG ok, APCA ниже |
| iconAccent | surfaceLevel2 | 44 | 45 | 5.50 | 3 | WCAG ok, APCA ниже |
| iconSuccess | surfaceLevel2 | 44 | 45 | 5.58 | 3 | WCAG ok, APCA ниже |
| borderStrong | surfaceLevel2 | 29 | 45 | 3.75 | 3 | WCAG ok, APCA ниже |
| textSecondary | surfaceLevel3 | 67 | 75 | 8.55 | 4.5 | WCAG ok, APCA ниже |
| textTertiary | surfaceLevel3 | 48 | 60 | 5.77 | 4.5 | WCAG ok, APCA ниже |
| textSecondary | surfaceRaised | 67 | 75 | 9.49 | 4.5 | WCAG ok, APCA ниже |
| textTertiary | surfaceRaised | 47 | 60 | 6.22 | 4.5 | WCAG ok, APCA ниже |
| textAccent | surfaceRaised | 45 | 75 | 5.88 | 4.5 | WCAG ok, APCA ниже |
| textLink | surfaceRaised | 45 | 75 | 5.88 | 4.5 | WCAG ok, APCA ниже |
| textDanger | surfaceRaised | 48 | 75 | 6.33 | 4.5 | WCAG ok, APCA ниже |
| textSuccess | surfaceRaised | 45 | 75 | 5.96 | 4.5 | WCAG ok, APCA ниже |
| textWarning | surfaceRaised | 63 | 75 | 8.70 | 4.5 | WCAG ok, APCA ниже |
| textInfo | surfaceRaised | 52 | 75 | 7.01 | 4.5 | WCAG ok, APCA ниже |
| iconAccent | surfaceRaised | 45 | 45 | 5.88 | 3 | WCAG ok, APCA ниже |
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
| textAccent | surfaceLevel0 | 49 | 75 | 7.15 | 4.5 | WCAG ok, APCA ниже |
| textLink | surfaceLevel0 | 49 | 75 | 7.15 | 4.5 | WCAG ok, APCA ниже |
| textDanger | surfaceLevel0 | 49 | 75 | 7.20 | 4.5 | WCAG ok, APCA ниже |
| textSuccess | surfaceLevel0 | 46 | 75 | 6.78 | 4.5 | WCAG ok, APCA ниже |
| textWarning | surfaceLevel0 | 64 | 75 | 9.90 | 4.5 | WCAG ok, APCA ниже |
| textInfo | surfaceLevel0 | 53 | 75 | 7.98 | 4.5 | WCAG ok, APCA ниже |
| iconTertiary | surfaceLevel0 | 44 | 45 | 6.48 | 3 | WCAG ok, APCA ниже |
| borderStrong | surfaceLevel0 | 25 | 45 | 3.77 | 3 | WCAG ok, APCA ниже |
| borderFocus | surfaceLevel0 | 44 | 45 | 6.48 | 3 | WCAG ok, APCA ниже |
| textSecondary | surfaceLevel1 | 67 | 75 | 9.49 | 4.5 | WCAG ok, APCA ниже |
| textTertiary | surfaceLevel1 | 47 | 60 | 6.22 | 4.5 | WCAG ok, APCA ниже |
| textAccent | surfaceLevel1 | 47 | 75 | 6.29 | 4.5 | WCAG ok, APCA ниже |
| textLink | surfaceLevel1 | 47 | 75 | 6.29 | 4.5 | WCAG ok, APCA ниже |
| textDanger | surfaceLevel1 | 48 | 75 | 6.33 | 4.5 | WCAG ok, APCA ниже |
| textSuccess | surfaceLevel1 | 45 | 75 | 5.96 | 4.5 | WCAG ok, APCA ниже |
| textWarning | surfaceLevel1 | 63 | 75 | 8.70 | 4.5 | WCAG ok, APCA ниже |
| textInfo | surfaceLevel1 | 52 | 75 | 7.01 | 4.5 | WCAG ok, APCA ниже |
| borderStrong | surfaceLevel1 | 29 | 45 | 3.81 | 3 | WCAG ok, APCA ниже |
| textSecondary | surfaceLevel2 | 67 | 75 | 9.04 | 4.5 | WCAG ok, APCA ниже |
| textTertiary | surfaceLevel2 | 47 | 60 | 6.01 | 4.5 | WCAG ok, APCA ниже |
| textAccent | surfaceLevel2 | 47 | 75 | 5.89 | 4.5 | WCAG ok, APCA ниже |
| textLink | surfaceLevel2 | 47 | 75 | 5.89 | 4.5 | WCAG ok, APCA ниже |
| textDanger | surfaceLevel2 | 47 | 75 | 5.92 | 4.5 | WCAG ok, APCA ниже |
| textSuccess | surfaceLevel2 | 44 | 75 | 5.58 | 4.5 | WCAG ok, APCA ниже |
| textWarning | surfaceLevel2 | 62 | 75 | 8.15 | 4.5 | WCAG ok, APCA ниже |
| textInfo | surfaceLevel2 | 51 | 75 | 6.57 | 4.5 | WCAG ok, APCA ниже |
| iconSuccess | surfaceLevel2 | 44 | 45 | 5.58 | 3 | WCAG ok, APCA ниже |
| borderStrong | surfaceLevel2 | 29 | 45 | 3.75 | 3 | WCAG ok, APCA ниже |
| textSecondary | surfaceLevel3 | 67 | 75 | 8.55 | 4.5 | WCAG ok, APCA ниже |
| textTertiary | surfaceLevel3 | 48 | 60 | 5.77 | 4.5 | WCAG ok, APCA ниже |
| textSecondary | surfaceRaised | 67 | 75 | 9.49 | 4.5 | WCAG ok, APCA ниже |
| textTertiary | surfaceRaised | 47 | 60 | 6.22 | 4.5 | WCAG ok, APCA ниже |
| textAccent | surfaceRaised | 47 | 75 | 6.29 | 4.5 | WCAG ok, APCA ниже |
| textLink | surfaceRaised | 47 | 75 | 6.29 | 4.5 | WCAG ok, APCA ниже |
| textDanger | surfaceRaised | 48 | 75 | 6.33 | 4.5 | WCAG ok, APCA ниже |
| textSuccess | surfaceRaised | 45 | 75 | 5.96 | 4.5 | WCAG ok, APCA ниже |
| textWarning | surfaceRaised | 63 | 75 | 8.70 | 4.5 | WCAG ok, APCA ниже |
| textInfo | surfaceRaised | 52 | 75 | 7.01 | 4.5 | WCAG ok, APCA ниже |
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
| textAccent | surfaceLevel0 | 46 | 75 | 6.69 | 4.5 | WCAG ok, APCA ниже |
| textLink | surfaceLevel0 | 46 | 75 | 6.69 | 4.5 | WCAG ok, APCA ниже |
| textDanger | surfaceLevel0 | 49 | 75 | 7.20 | 4.5 | WCAG ok, APCA ниже |
| textSuccess | surfaceLevel0 | 46 | 75 | 6.78 | 4.5 | WCAG ok, APCA ниже |
| textWarning | surfaceLevel0 | 64 | 75 | 9.90 | 4.5 | WCAG ok, APCA ниже |
| textInfo | surfaceLevel0 | 53 | 75 | 7.98 | 4.5 | WCAG ok, APCA ниже |
| iconTertiary | surfaceLevel0 | 44 | 45 | 6.48 | 3 | WCAG ok, APCA ниже |
| borderStrong | surfaceLevel0 | 25 | 45 | 3.77 | 3 | WCAG ok, APCA ниже |
| borderFocus | surfaceLevel0 | 44 | 45 | 6.48 | 3 | WCAG ok, APCA ниже |
| textSecondary | surfaceLevel1 | 67 | 75 | 9.49 | 4.5 | WCAG ok, APCA ниже |
| textTertiary | surfaceLevel1 | 47 | 60 | 6.22 | 4.5 | WCAG ok, APCA ниже |
| textAccent | surfaceLevel1 | 45 | 75 | 5.88 | 4.5 | WCAG ok, APCA ниже |
| textLink | surfaceLevel1 | 45 | 75 | 5.88 | 4.5 | WCAG ok, APCA ниже |
| textDanger | surfaceLevel1 | 48 | 75 | 6.33 | 4.5 | WCAG ok, APCA ниже |
| textSuccess | surfaceLevel1 | 45 | 75 | 5.96 | 4.5 | WCAG ok, APCA ниже |
| textWarning | surfaceLevel1 | 63 | 75 | 8.70 | 4.5 | WCAG ok, APCA ниже |
| textInfo | surfaceLevel1 | 52 | 75 | 7.01 | 4.5 | WCAG ok, APCA ниже |
| iconAccent | surfaceLevel1 | 45 | 45 | 5.88 | 3 | WCAG ok, APCA ниже |
| borderStrong | surfaceLevel1 | 29 | 45 | 3.81 | 3 | WCAG ok, APCA ниже |
| textSecondary | surfaceLevel2 | 67 | 75 | 9.04 | 4.5 | WCAG ok, APCA ниже |
| textTertiary | surfaceLevel2 | 47 | 60 | 6.01 | 4.5 | WCAG ok, APCA ниже |
| textAccent | surfaceLevel2 | 44 | 75 | 5.50 | 4.5 | WCAG ok, APCA ниже |
| textLink | surfaceLevel2 | 44 | 75 | 5.50 | 4.5 | WCAG ok, APCA ниже |
| textDanger | surfaceLevel2 | 47 | 75 | 5.92 | 4.5 | WCAG ok, APCA ниже |
| textSuccess | surfaceLevel2 | 44 | 75 | 5.58 | 4.5 | WCAG ok, APCA ниже |
| textWarning | surfaceLevel2 | 62 | 75 | 8.15 | 4.5 | WCAG ok, APCA ниже |
| textInfo | surfaceLevel2 | 51 | 75 | 6.57 | 4.5 | WCAG ok, APCA ниже |
| iconAccent | surfaceLevel2 | 44 | 45 | 5.50 | 3 | WCAG ok, APCA ниже |
| iconSuccess | surfaceLevel2 | 44 | 45 | 5.58 | 3 | WCAG ok, APCA ниже |
| borderStrong | surfaceLevel2 | 29 | 45 | 3.75 | 3 | WCAG ok, APCA ниже |
| textSecondary | surfaceLevel3 | 67 | 75 | 8.55 | 4.5 | WCAG ok, APCA ниже |
| textTertiary | surfaceLevel3 | 48 | 60 | 5.77 | 4.5 | WCAG ok, APCA ниже |
| textSecondary | surfaceRaised | 67 | 75 | 9.49 | 4.5 | WCAG ok, APCA ниже |
| textTertiary | surfaceRaised | 47 | 60 | 6.22 | 4.5 | WCAG ok, APCA ниже |
| textAccent | surfaceRaised | 45 | 75 | 5.88 | 4.5 | WCAG ok, APCA ниже |
| textLink | surfaceRaised | 45 | 75 | 5.88 | 4.5 | WCAG ok, APCA ниже |
| textDanger | surfaceRaised | 48 | 75 | 6.33 | 4.5 | WCAG ok, APCA ниже |
| textSuccess | surfaceRaised | 45 | 75 | 5.96 | 4.5 | WCAG ok, APCA ниже |
| textWarning | surfaceRaised | 63 | 75 | 8.70 | 4.5 | WCAG ok, APCA ниже |
| textInfo | surfaceRaised | 52 | 75 | 7.01 | 4.5 | WCAG ok, APCA ниже |
| iconAccent | surfaceRaised | 45 | 45 | 5.88 | 3 | WCAG ok, APCA ниже |
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

"""APCA check over built tokens (APCA-W3, SAPC 0.98G-4g). Same pairs as scripts/a11y-check.py, second metric.
Writes docs/apca-report.md. WCAG 2.2 stays the baseline (a11y-check.py); APCA is the perceptual second check.

Lc levels (public APCA guidance, |Lc|):
  90  preferred for body text            75  minimum for body text (<= 18 px / 400)
  60  content / secondary text           45  large text, icons, essential graphics
  30  spot text (placeholder, disabled)  15  absolute minimum, non-essential
"""
import json, glob, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def rgb(h):
    h = h.lstrip('#'); a = int(h[6:8], 16) / 255 if len(h) == 8 else 1
    return [int(h[i:i + 2], 16) for i in (0, 2, 4)], a

def over(fg, bg):
    (c, a), (b, _) = rgb(fg), rgb(bg)
    return [c[i] * a + b[i] * (1 - a) for i in range(3)]

def lin(c):
    r, g, b = [(x / 255) ** 2.4 for x in c]
    y = r * 0.2126729 + g * 0.7151522 + b * 0.0721750
    return y if y >= 0.022 else y + (0.022 - y) ** 1.414

def apca(txt, bg):
    yt, yb = lin(txt), lin(bg)
    if abs(yb - yt) < 0.0005: return 0.0
    if yb > yt:
        s = (yb ** 0.56 - yt ** 0.57) * 1.14; o = 0 if s < 0.1 else s - 0.027
    else:
        s = (yb ** 0.65 - yt ** 0.62) * 1.14; o = 0 if s > -0.1 else s + 0.027
    return o * 100

def wcag(fg, bg):
    f = over(fg, bg); b = rgb(bg)[0]
    def l(c):
        def t(x): x /= 255; return x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4
        r, g, bl = map(t, c); return 0.2126 * r + 0.7152 * g + 0.0722 * bl
    a, c = sorted([l(f), l(b)], reverse=True); return (a + 0.05) / (c + 0.05)

# role -> (APCA minimum, preferred, WCAG minimum)
LEVEL = {
    'textPrimary': (75, 90, 4.5), 'textSecondary': (75, 75, 4.5), 'textTertiary': (60, 60, 4.5),
    'textAccent': (75, 75, 4.5), 'textLink': (75, 75, 4.5), 'textDanger': (75, 75, 4.5),
    'textSuccess': (75, 75, 4.5), 'textWarning': (75, 75, 4.5), 'textInfo': (75, 75, 4.5),
    'iconPrimary': (45, 60, 3), 'iconSecondary': (45, 45, 3), 'iconTertiary': (45, 45, 3), 'iconAccent': (45, 45, 3),
    'iconDanger': (45, 45, 3), 'iconSuccess': (45, 45, 3), 'iconWarning': (45, 45, 3), 'iconInfo': (45, 45, 3),
    'borderStrong': (45, 45, 3), 'borderFocus': (45, 45, 3),
}
BGS = ['surfaceLevel0', 'surfaceLevel1', 'surfaceLevel2', 'surfaceLevel3', 'surfaceRaised']

out = ['# APCA-отчёт по токенам', '',
       'Сгенерировано `scripts/apca-check.py` из `build/json`. Вторая метрика рядом с WCAG (`a11y-check.py`): WCAG 2.2 остаётся базой, APCA ловит то, что WCAG пропускает (светлый серый текст в тёмной теме, тонкий текст на средних тонах). Уровни по |Lc|: 90 желательно для основного текста, 75 минимум для основного, 60 для вторичного, 45 для крупного текста, иконок и графики, 30 для placeholder и disabled.', '']
STRICT = '--strict' in sys.argv  # exit 1 if text/* |Lc| < 45 or icon/*, border/strong, border/focus |Lc| < 30
HARD = lambda role: 45 if role.startswith('text') else 30
strict_fail = []
summary = []; details = {}
for f in sorted(glob.glob(f'{ROOT}/build/json/*.json')):
    name = os.path.basename(f)[:-5]
    if name.startswith('os.') or name == 'perf-tiers' or name.endswith('.expressive'): continue
    if not name.endswith('.android'): continue  # платформы дают одинаковые цвета, считаем один раз на бренд и тему
    d = json.load(open(f)); rows = []; n = 0; apca_fail = 0; wcag_fail = 0; only_apca = 0; only_wcag = 0
    for bg in BGS:
        if bg not in d: continue
        for role, (mn, pref, wmin) in LEVEL.items():
            if role not in d: continue
            if bg == 'surfaceLevel3' and role not in ('textPrimary', 'textSecondary', 'textTertiary'): continue
            fgc = d[role]; bgc = d[bg]
            lc = abs(apca(over(fgc, bgc), rgb(bgc)[0])); cr = wcag(fgc, bgc); n += 1
            ap = lc >= mn; wc = cr >= wmin
            if lc < HARD(role): strict_fail.append((name, role, bg, round(lc)))
            apca_fail += not ap; wcag_fail += not wc; only_apca += (not ap and wc); only_wcag += (ap and not wc)
            if not ap or not wc:
                rows.append((role, bg, lc, mn, cr, wmin, 'WCAG ok, APCA ниже' if (wc and not ap) else ('APCA ok, WCAG ниже' if ap else 'оба ниже')))
    summary.append((name, n, apca_fail, wcag_fail, only_apca, only_wcag)); details[name] = rows
out += ['## Сводка', '', '| Набор | Пар | Ниже по APCA | Ниже по WCAG | WCAG ok, APCA ниже | APCA ok, WCAG ниже |', '|---|---|---|---|---|---|']
for s in summary: out.append('| ' + ' | '.join(map(str, s)) + ' |')
for name, rows in details.items():
    out += ['', f'## {name}', '']
    if not rows: out.append('Всё проходит по обеим метрикам.'); continue
    out += ['| Роль | Фон | Lc | Нужно | WCAG | Нужно | Итог |', '|---|---|---|---|---|---|---|']
    for r in rows: out.append(f'| {r[0]} | {r[1]} | {r[2]:.0f} | {r[3]} | {r[4]:.2f} | {r[5]} | {r[6]} |')
open(f'{ROOT}/docs/apca-report.md', 'w', encoding='utf-8').write('\n'.join(out) + '\n')
print(f'docs/apca-report.md: {len(summary)} наборов; ниже жёсткого порога (--strict): {len(strict_fail)}')
if STRICT and strict_fail:
    for s in strict_fail: print('STRICT', *s)
    sys.exit(1)

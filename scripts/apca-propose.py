"""Proposal of token changes that bring APCA pairs up to the role minimum (docs/a11y-contrast-standard.md).
Reads figma/export-*.json (semantic aliases) and build/json (resolved colours), changes nothing: writes docs/apca-token-proposal.md.
Order of attempts per failing token: (1) another step of the same scale / alpha ramp / brand accent ramp (primitives untouched),
(2) a new colour: OKLCH lightness in 0.005 steps, hue and chroma kept, |dL| <= 0.12.
Checks per proposal: WCAG stays >= 4.5 (text) / 3 (icons, borders); text roles keep dE(OKLab x100) >= 8 to each other;
colour-vision-deficiency distance to the other text roles (Machado 2009) is not worse unless it stays >= 15."""
import json, glob, os, re, math, itertools

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = open(f'{ROOT}/scripts/apca-check.py').read()
ns = {}
exec(src[src.index('def rgb'):src.index('out = [')], ns)  # rgb, over, lin, apca, wcag, LEVEL, BGS
rgb, over, apca, wcag, LEVEL, BGS = (ns[k] for k in ('rgb', 'over', 'apca', 'wcag', 'LEVEL', 'BGS'))

# ---- Figma export -> aliases
cols = {}
for f in sorted(glob.glob(f'{ROOT}/figma/export-*.json')):
    for c in json.load(open(f)): cols.setdefault(c['c'], []).append(c)
PC = {v[0]: v[2] for c in cols['PC'] for v in c['v']}
T = {v[0]: v[2] for c in cols['T'] for v in c['v']}
B = {v[0]: v[2] for c in cols['B'] for v in c['v']}
BRANDS = ['emcd', 'geometria', 'wl-default']
THEMES = ['light', 'dark']

def camel(n):
    p = re.split(r'[/-]', n); return p[0] + ''.join(x.capitalize() for x in p[1:])
ROLES = {camel(k): k for k in ('text/primary', 'text/secondary', 'text/tertiary', 'text/accent', 'text/link', 'text/danger', 'text/success',
                              'text/warning', 'text/info', 'icon/primary', 'icon/secondary', 'icon/tertiary', 'icon/accent', 'icon/danger',
                              'icon/success', 'icon/warning', 'icon/info', 'border/strong', 'border/focus')}
TEXT5 = ['textAccent', 'textDanger', 'textSuccess', 'textWarning', 'textInfo']

def hex8(c, a=1.0):
    return '#%02x%02x%02x' % tuple(round(max(0, min(255, x))) for x in c) + ('' if a >= 0.999 else '%02x' % round(a * 255))

# ---- colour maths (OKLab / OKLCH)
def s2l(x): x /= 255; return x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4
def l2s(x): x = 12.92 * x if x <= 0.0031308 else 1.055 * x ** (1 / 2.4) - 0.055; return x * 255
def oklab(c):
    r, g, b = map(s2l, c)
    l = (0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b) ** (1 / 3); m = (0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b) ** (1 / 3); s = (0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b) ** (1 / 3)
    return (0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s, 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s)
def from_oklab(L, a, b):
    l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3; m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3; s = (L - 0.0894841775 * a - 1.2914855480 * b) ** 3
    return [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s]
def de(c1, c2): return 100 * math.dist(oklab(c1), oklab(c2))
M = {'протанопия': [[0.152286, 1.052583, -0.204868], [0.114503, 0.786281, 0.099216], [-0.003882, -0.048116, 1.051998]],
     'дейтеранопия': [[0.367322, 0.860646, -0.227968], [0.280085, 0.672501, 0.047413], [-0.011820, 0.042940, 0.968881]],
     'тританопия': [[1.255528, -0.076749, -0.178779], [-0.078411, 0.930809, 0.147602], [0.004733, 0.691367, 0.303900]]}
def sim(c, m):
    l = [s2l(x) for x in c]; o = [max(0, min(1, sum(m[i][j] * l[j] for j in range(3)))) for i in range(3)]
    return [l2s(x) for x in o]

def new_hex(cur_hex, direction, need):
    """Step OKLCH lightness (0.005) away from the background side until need(hex) holds; returns (hex, dL, clipped) or None."""
    c, a = rgb(cur_hex); L, A, Bv = oklab(c); ch = math.hypot(A, Bv); h = math.atan2(Bv, A)
    for i in range(1, 25):
        L2 = L + direction * 0.005 * i
        lin = from_oklab(L2, ch * math.cos(h), ch * math.sin(h))
        clipped = any(x < -0.0005 or x > 1.0005 for x in lin)
        c2 = [l2s(max(0, min(1, x))) for x in lin]
        hx = hex8(c2, a)
        if need(hx): return hx, 0.005 * i, clipped
    return None

# ---- per set
out_rows = []; summary = []; unresolved = []
for brand_i, brand in enumerate(BRANDS):
    for theme_i, theme in enumerate(THEMES):
        name = f'{brand}.{theme}'
        d = json.load(open(f'{ROOT}/build/json/{name}.android.json'))
        dark = theme == 'dark'; direction = 1 if dark else -1  # dark: lighter text, light: darker text
        def bgs_for(role): return [b for b in BGS if b in d and (b != 'surfaceLevel3' or role in ('textPrimary', 'textSecondary', 'textTertiary'))]
        def measure(role, hx):
            mn, pref, wmin = LEVEL[role]; res = []
            for b in bgs_for(role):
                res.append((b, abs(apca(over(hx, d[b]), rgb(d[b])[0])), wcag(hx, d[b])))
            return res
        def ok(role, hx):
            mn, pref, wmin = LEVEL[role]; r = measure(role, hx)
            return all(lc >= mn - 1e-9 and w >= wmin for _, lc, w in r)
        def okg(role, hx, kind):  # accent fg token is shared by text/accent, text/link, icon/accent: all must pass
            return all(ok(r, hx) for r in (['textAccent', 'textLink', 'iconAccent'] if kind[0] == 'accent' else [role]))
        def flat(role, hx): return over(hx, d['surfaceLevel0'])
        def distinct(role, hx):
            if role not in TEXT5: return [], None, None
            cur = {r: d[r] for r in TEXT5}; cur[role] = hx; fl = []; worst = {}
            for o in TEXT5:
                if o == role: continue
                x = de(flat(role, hx), flat(o, cur[o]))
                if x < 8: fl.append(f'ΔE {role[4:]}↔{o[4:]} = {x:.1f} < 8' + (' (было и раньше)' if de(flat(role, d[role]), flat(o, d[o])) < 8 else ''))
            before = {}; after = {}
            for mname, m in M.items():
                for o in TEXT5:
                    if o == role: continue
                    before[(mname, o)] = de(sim(flat(role, d[role]), m), sim(flat(o, d[o]), m))
                    after[(mname, o)] = de(sim(flat(role, hx), m), sim(flat(o, d[o]), m))
            bmin, amin = min(before.values()), min(after.values())
            if amin < bmin - 0.5 and amin < 15: fl.append(f'CVD хуже: мин. ΔE {bmin:.1f} → {amin:.1f}')
            return fl, bmin, amin
        for role, tname in ROLES.items():
            if role not in d or role not in LEVEL: continue
            before = measure(role, d[role])
            if ok(role, d[role]): continue
            # current alias
            alias = T[tname][theme_i]; kind = None; cands = []
            if alias.startswith('@B:accent/'):
                bkey = alias[3:]; balias = B[bkey][brand_i]  # e.g. @B:accent/400
                m = re.match(r'@B:accent/(\d+)', balias); cur_step = int(m.group(1)); fam = re.match(r'@PC:color/([a-z-]+)/', B[f'accent/{cur_step}'][brand_i]).group(1)
                steps = sorted({int(k.split('/')[-1]) for k in PC if re.fullmatch(rf'color/{fam}/\d+', k)})
                kind = ('accent', fam, cur_step, bkey)
            else:
                m = re.match(r'@PC:color/(alpha/)?([a-z-]+)/(\d+)', alias); fam = (m.group(1) or '') + m.group(2); cur_step = int(m.group(3))
                steps = sorted({int(k.split('/')[-1]) for k in PC if re.fullmatch(rf'color/{fam}/\d+', k)})
                kind = ('alpha' if m.group(1) else 'scale', fam, cur_step, None)
            order = [s for s in steps if (s < cur_step if (dark and kind[0] != 'alpha') else s > cur_step)] if kind[0] != 'alpha' else [s for s in steps if s > cur_step]
            if kind[0] != 'alpha' and dark: order = sorted(order, reverse=True)
            prop = None; flags = []; tried = []
            for s in order:
                hx = PC[f'color/{fam}/{s}']
                if not okg(role, hx, kind): continue
                fl, b0, a0 = distinct('textAccent' if kind[0] == 'accent' else role, hx)
                if fl and not all('было и раньше' in x for x in fl): tried.append((s, hx, fl)); continue
                prop = (f'`{fam}/{s}`' if kind[0] != 'accent' else f'accent/{s} (`{fam}/{s}`)', hx, f'шаг шкалы {cur_step} → {s}', fl, a0, b0); break
            if prop is None and tried:
                s, hx, fl = tried[0]; prop = (f'`{fam}/{s}`' if kind[0] != 'accent' else f'accent/{s} (`{fam}/{s}`)', hx, f'шаг шкалы {cur_step} → {s}', fl + ['пара сливается с соседней ролью — нужно решение дизайнера'], None, None)
            if prop is None:
                if kind[0] == 'alpha':
                    unresolved.append((name, tname, 'шкала alpha кончилась (88 %) — нужен новый базовый цвет или иной подход'))
                    out_rows.append((name, tname, f'{alias[4:]}', '—', before, None, ['нужно решение дизайнера: на шкале нет шага с нужным Lc']))
                    continue
                r = new_hex(d[role], direction, lambda h: okg(role, h, kind))
                if r is None:
                    unresolved.append((name, tname, 'ΔL > 0.12'))
                    out_rows.append((name, tname, alias[4:], '—', before, None, ['нужно решение дизайнера: ΔL > 0.12']))
                    continue
                hx, dl, clipped = r; fl, b0, a0 = distinct('textAccent' if kind[0] == 'accent' else role, hx)
                prop = (f'новое `{hx}`', hx, f'OKLCH ΔL {dl:+.3f}' if direction > 0 else f'OKLCH ΔL {-dl:+.3f}', fl + (['вышли за гамут sRGB'] if clipped else []), a0, b0)
            label, hx, how, fl, a0, b0 = prop
            dl_act = abs(oklab(flat(role, hx))[0] - oklab(flat(role, d[role]))[0])
            if dl_act > 0.12 + 1e-6:
                extra = ''
                if kind[0] != 'alpha':  # what a shift limited to dL 0.12 would reach
                    c0, a_ = rgb(d[role]); L0_, A_, B_ = oklab(c0); ch_ = math.hypot(A_, B_); h_ = math.atan2(B_, A_)
                    lin_ = from_oklab(L0_ + direction * 0.12, ch_ * math.cos(h_), ch_ * math.sin(h_)); capx = hex8([l2s(max(0, min(1, x))) for x in lin_], a_)
                    extra = f'; в пределах ΔL 0.12 (`{capx}`) достигается Lc {min(lc for _, lc, _ in measure(role, capx)):.0f} из {LEVEL[role][0]}'
                fl = fl + [f'большой сдвиг ΔL {dl_act:.2f} > 0.12 — нужен взгляд дизайнера{extra}']
            out_rows.append((name, tname, f'{alias[4:] if alias.startswith("@PC:") else alias[3:]}', f'{label} — {how}', before, measure(role, hx), fl))
# ---- write
def fmt(ms): return ' / '.join(f'{lc:.0f}' for _, lc, _ in ms)
def wmin(ms): return f'{min(w for _, _, w in ms):.2f}'
by = {}
for r in out_rows: by.setdefault(r[0], []).append(r)
closed = {}; left = {}
lines = ['# Предложение по токенам: APCA', '',
         'Сгенерировано `scripts/apca-propose.py`. **Токены не менялись**: применение — отдельным шагом в Figma Foundations (Claude / Стефан), потом экспорт и `npm run all`. Цель — APCA-минимум роли из `docs/a11y-contrast-standard.md` на худшем из фонов L0, L1, L2, raised (L3 только для text/primary, secondary, tertiary). Порядок попыток: другой шаг существующей шкалы (примитивы не трогаем), затем новое значение (OKLCH, ΔL шагом 0.005, оттенок и хрома сохранены, лимит ΔL ≤ 0.12). Проверки: WCAG не ниже 4.5 (текст) / 3 (иконки, границы); ΔE OKLab×100 между text/accent, danger, success, warning, info ≥ 8; дальтонизм (Machado 2009) не хуже, если мин. ΔE остаётся ≥ 15. Прочерк в «Флагах» = все проверки пройдены. Шаг шкалы с ΔL > 0.12 — это сильное изменение характера цвета (например, тёмный accent 400 → 150 почти белый): его утверждает дизайнер, в таблице показано, что достигается в пределах ΔL 0.12.', '']
tot_pairs = tot_closed = tot_big = 0; body = []
for name, rows in by.items():
    n_fail = 0; n_closed = 0; n_big = 0
    body += ['', f'## {name}', '', '| Токен | Сейчас → предлагается | Lc до → после (L0 / L1 / L2 / raised[ / L3]) | WCAG мин до → после | Флаги |', '|---|---|---|---|---|']
    for _, tname, cur, prop, before, after, fl in rows:
        role = camel(tname); mn = LEVEL[role][0]
        nf = sum(1 for _, lc, _ in before if lc < mn); n_fail += nf
        if after is not None and all(lc >= mn - 1e-9 for _, lc, _ in after):
            n_closed += nf
            if any('большой сдвиг' in x for x in fl): n_big += nf
        body.append(f'| `{tname}` | `{cur}` → {prop} | {fmt(before)} → {fmt(after) if after else "—"} (нужно {mn}) | {wmin(before)} → {wmin(after) if after else "—"} | {"; ".join(fl) if fl else "—"} |')
    closed[name] = (n_fail, n_closed, n_big); tot_pairs += n_fail; tot_closed += n_closed; tot_big += n_big
lines += [f'**Итого:** пар ниже уровня {tot_pairs}, закрывается предложением {tot_closed}, из них со сдвигом ΔL > 0.12 (нужен взгляд дизайнера) {tot_big}, без решения {tot_pairs - tot_closed}.', '',
          '| Набор | Пар ниже уровня | Закрывается | из них сдвиг ΔL > 0.12 | Без решения |', '|---|---|---|---|---|'] + [f'| {k} | {a} | {b} | {c} | {a - b} |' for k, (a, b, c) in closed.items()]
if unresolved: lines += ['', '**Без решения (нужен дизайнер):** ' + '; '.join(f'{n} · `{t}`: {w}' for n, t, w in unresolved)]
open(f'{ROOT}/docs/apca-token-proposal.md', 'w', encoding='utf-8').write('\n'.join(lines + body) + '\n')
print(f'docs/apca-token-proposal.md: пар ниже уровня {tot_pairs}, закрывается {tot_closed}')

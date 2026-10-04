import json, itertools, math, sys
sys.path.insert(0, 'scripts')
from importlib.machinery import SourceFileLoader
a = SourceFileLoader('a', 'scripts/a11y-check.py').load_module() if False else None
P = json.load(open('tokens/primitives/color.json'))['color']
def hexv(h, s): return P[h][s]['$value']
def rgb(h): h = h.lstrip('#'); return [int(h[i:i+2], 16)/255 for i in (0, 2, 4)]
def lin(x): return x/12.92 if x <= 0.04045 else ((x+0.055)/1.055)**2.4
M = {'n': None,
 'p': [[0.152286,1.052583,-0.204868],[0.114503,0.786281,0.099216],[-0.003882,-0.048116,1.051998]],
 'd': [[0.367322,0.860646,-0.227968],[0.280085,0.672501,0.047413],[-0.011820,0.042940,0.968881]],
 't': [[1.255528,-0.076749,-0.178779],[-0.078411,0.930809,0.147602],[0.004733,0.691367,0.303900]]}
def sim(c, m):
    if m is None: return c
    l = [lin(x) for x in c]; o = [max(0, min(1, sum(m[i][j]*l[j] for j in range(3)))) for i in range(3)]
    return [12.92*x if x <= 0.0031308 else 1.055*x**(1/2.4)-0.055 for x in o]
def ok(c):
    r, g, b = map(lin, c)
    l = (0.4122214708*r+0.5363325363*g+0.0514459929*b)**(1/3); m = (0.2119034982*r+0.6806995451*g+0.1073969566*b)**(1/3); s = (0.0883024619*r+0.2817188376*g+0.6299787005*b)**(1/3)
    return (0.2104542553*l+0.7936177850*m-0.0040720468*s, 1.9779984951*l-2.4285922050*m+0.4505937099*s, 0.0259040371*l+0.7827717662*m-0.8086757660*s)
def de(x, y): return 100*math.dist(ok(x), ok(y))
HUES = ['violet', 'blue', 'emerald', 'amber', 'fuchsia', 'cyan', 'rose', 'orange', 'teal', 'indigo', 'pink', 'yellow', 'green', 'red', 'lime']
LIGHT, DARK = '600', '300'
def cols(h): return [rgb(hexv(h, LIGHT)), rgb(hexv(h, DARK))]
def worst(seq):
    w = 999
    for a, b in itertools.combinations(seq, 2):
        for t in (0, 1):
            for m in M.values(): w = min(w, de(sim(cols(a)[t], m), sim(cols(b)[t], m)))
    return w
order = ['violet']
while len(order) < 8:
    best = max((h for h in HUES if h not in order), key=lambda h: worst(order + [h]))
    order.append(best); print(len(order), best, round(worst(order), 1))
print('ORDER', order)

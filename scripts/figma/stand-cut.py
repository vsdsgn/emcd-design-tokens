# cut.py <stand.json> <shots dir> <sheets dir>: режет скриншоты секций на листы (полки шириной W, высотой до H)
import json, sys, os, re
from PIL import Image
src, shots, outd = sys.argv[1:4]
W, H, G = 1220, 1500, 8
d = json.load(open(src))
for s in d['out']:
    slug = re.sub(r'[\/ ]+', '_', s['set'])
    p = os.path.join(shots, s['section'].replace(':', '-') + '.png')
    if not os.path.exists(p): print('no shot', s['set']); continue
    im = Image.open(p).convert('RGB'); k = im.width / s['w']
    crops = []
    for name, x, y, w, h in s['cells']:
        c = im.crop((int(x*k), int(y*k), int((x+w)*k), min(im.height, int((y+h)*k))))
        while c.width > W:  # слишком широкая ячейка (200 %) — режем пополам по ширине не будем, уменьшаем
            c = c.resize((W, int(c.height * W / c.width)))
        crops.append(c)
    sheets, cur, x, y, rowh = [], [], 0, 0, 0
    def flush():
        global cur, x, y, rowh
        if cur:
            hh = max(py + c.height for c, px, py in cur)
            sh = Image.new('RGB', (W, hh), (255, 0, 255))
            for c, px, py in cur: sh.paste(c, (px, py))
            sheets.append(sh)
        cur, x, y, rowh = [], 0, 0, 0
    for c in crops:
        if c.height > H:  # высокая ячейка — режем на куски по H
            flush()
            for t in range(0, c.height, H): sheets.append(c.crop((0, t, c.width, min(c.height, t + H))))
            continue
        if x + c.width > W: x, y, rowh = 0, y + rowh + G, 0
        if y + c.height > H: flush()
        cur.append((c, x, y)); x += c.width + G; rowh = max(rowh, c.height)
    flush()
    for i, sh in enumerate(sheets): sh.save(os.path.join(outd, f'{slug}__{i+1:02d}.png'))
    print(s['set'], len(s['cells']), 'cells ->', len(sheets), 'sheets')

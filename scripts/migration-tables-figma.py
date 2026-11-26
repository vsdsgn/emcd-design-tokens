#!/usr/bin/env python3
"""Таблицы миграции → Figma: чанки use_figma-кода (данные + scripts/figma/migration-tables.plugin.js).
Чтение ответов обратно: см. scripts/figma/migration-tables-read.plugin.js → docs/migration/how-figma.json."""
import csv, json, sys, pathlib
R = pathlib.Path(__file__).resolve().parent.parent
B = (R / 'scripts/figma/migration-tables.plugin.js').read_text()
if len(sys.argv) > 2 and sys.argv[1] == '--merge':  # ответы из Figma → колонка «Как сделать» в CSV
    J = json.load(open(sys.argv[2]))
    for key, csvp in (('colors', 'docs/migration/table-colors.csv'), ('components', 'docs/migration/table-components.csv')):
        rows = list(csv.DictReader(open(R / csvp))); f = list(rows[0].keys())
        for n, t in J.get(key, {}).items(): rows[int(n) - 1]['Как сделать'] = t
        w = csv.DictWriter(open(R / csvp, 'w', newline=''), fieldnames=f); w.writeheader(); w.writerows(rows); print(csvp, len(J.get(key, {})))
    sys.exit()
out = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else '/tmp/mt'); out.mkdir(parents=True, exist_ok=True)
TC = [('Legacy', 200, 't', 'Legacy'), ('Роль', 140, 't', 'Роль'), ('Light до', 120, 's', 'Light до'), ('Light после', 120, 's', 'Light после'),
      ('Dark до', 120, 's', 'Dark до'), ('Dark после', 120, 's', 'Dark после'), ('Токен DS 2.0', 200, 't', 'Токен DS 2.0'), ('Действие', 90, 't', 'Действие'),
      ('Как сделать', 300, 'h', 'Как сделать'), ('ΔE L / D', 70, 't', 'ΔE (L / D)'), ('Статус', 56, 't', 'Статус'), ('Решение', 180, 't', 'Решение'),
      ('Примечание', 260, 't', 'Примечание'), ('Где используется', 280, 't', 'Где используется'), ('Источник', 80, 't', 'Источник')]
P = ['Mining Web', 'Mining App', 'Monitoring', 'WL B2B', 'WL B2C', 'Geometria Web', 'Geometria App', 'Mining US', 'Firmware']
# визуальные примеры (26.11): s:<ключ набора> · c:<ключ компонента> · n:<id узла в общем файле — клон живого legacy-примера>
LEG = {1:'s:be710aba6b2e6641ede2545754e0691b1f6c1f05',4:'s:d441805ae7edec3bd7900a963b35c65eb6928224',5:'s:20f2c1b04f5d1e8af6fd741ff892f61494f305ce',6:'s:599bdc14934d65492318b9c9478b6a2f32ccebe4',
 7:'s:d8ad8748f3bdf9b5c7216bcf8fde638b0da4409d',8:'s:d0b63d66d7e6a1bea09206a12fdb46f6d4a4969a',9:'s:1630298b593c69f68a3b5a03f0fbc29656ed4b29',10:'s:25ced4dacc680b72b80ce5c35800baf3fd819459',
 11:'s:227fea9f497702a5e42405541aced0c8500709f1',12:'s:1df3a0b8d0640623593231739ea9e3ab01a4ec5b',13:'n:I1:244495;49880:72852',14:'c:6f7c16b80b0b78a76c62a47490fbf3ec8bf07957',
 15:'s:fa06476740366297d6c131fd0a957a81126067fc',16:'s:0205471574392d0318cd30d82f2bf5149b4ff3e7',17:'s:761526188cf229006d99def49a31c2998493887e',18:'s:df56f00645c7742497f1e9a47dd4760f0f8079f2',
 19:'s:39328db8292c5846a593d67ee6027c954f0d165f',20:'s:190a1f293ba5bd640d63e1df5d04a0efe38a6b27',21:'c:05c8c034a27093b3cb3d2fc5a6817638178085e6',22:'n:I1:158393;6562:2101',
 23:'c:1408421231ba8f11023ea968c29b01a31602f471',24:'s:9cccf83467640ebd4c4304522a25e9a6cc5b94ff',25:'n:1:161969',26:'n:1:169245',27:'n:1:169382',31:'n:1:157874',32:'n:1:100681',
 33:'n:1:246311',34:'n:1:98027',36:'n:1:212248',37:'n:1:160882',38:'n:I1:157891;28148:13422',39:'n:1:216479',41:'s:cf15c1fb90bbe0d30834cca64b6714cf5fa9d627',43:'n:1:160507',
 45:'n:I1:213979;87917:34014',46:'n:1:244495',47:'n:I1:212251;2233:879',48:'n:1:216765',49:'n:1:238215',50:'n:1:212150',
 51:'s:fd286b4104bf7ab6e6e63c1bf1c91f0584e3a0a8',52:'s:773c278bdbf2e790e91dd17efceae078b506c2fc',55:'s:7285c761e9bfeca208d5ee56cf65a543f68a8c6a',56:'s:531c8c769c8d71fb61c87fa2ccf2d59d10eeea88',
 58:'s:0e80114ff004058988e6e47e3e45e43b4c3d53a7',59:'s:dcae70488416c47c98e6d583e5d6a939e4ee126b',60:'s:608d1ee2c8ccde2a385513d0009212c18d78721b',61:'s:512d3223e12e5d827cc4a7ef9d6c2a4f149eb0f1',62:'c:0aa1f06d0467845a72618821800c077e580df055',74:'n:1:238215'}
DS = {1:'s:2be8e84200d3048665f4264661a03d47dc58a2b6',2:'s:2be8e84200d3048665f4264661a03d47dc58a2b6',3:'s:2be8e84200d3048665f4264661a03d47dc58a2b6',4:'s:8b8e47935737e95ffcef6087d42c4d13dfa0c647',
 5:'s:8b8e47935737e95ffcef6087d42c4d13dfa0c647',6:'s:b04c86bfec329f25e938fb1eefcfed55f318fc2d',7:'s:386edb1b1f62d7bddb44a840d85340436d5637ba',8:'s:cae4941d0d68609ffb3903e0a49e5781654a71b8',
 9:'s:905bee526f44521ca81e5662693788344b1b2efe',10:'s:0862e584abdf9f0102f5703fb4fce8fa62f5fd18',11:'s:3f74c25f9995add339d0ee560df0f6d00addc344',12:'s:9994f20a363a6e6084adc63705d2f424c7d3e0d5',
 13:'s:819e4a209e67a1aa47225a785f8ac73c5e38cf26',14:'s:a935454f75dba75fec4f039820de48de05c031d7',15:'s:2be8e84200d3048665f4264661a03d47dc58a2b6',16:'s:8cf45c072502f201cf3ec6e9dc10d4860162b98a',
 17:'s:84502ef42addbd0d44b96ac3c74ea04554340dd6',18:'s:01ca57db2ff92035c73494aedc78e70f428c510f',19:'s:d219dfa85a2a534d7ed87b994e8426d078c22a93',20:'s:14c90ff773ffa6f1b721ada334d6e8a0bc533943',
 21:'s:7c56f6d48a90d21d1761e3670432817039773bdf',22:'s:2663ccdd7adbf5bca76c0e6703952656ca387001',23:'c:2606a27f1a8b448f3dc310bd05c843758a78b926',24:'s:e8fdae48a852a165c866feab5df051e5d7324519',
 25:'s:7888491bce9f0e35fb6290533e029cf2de842f1b',26:'s:d219dfa85a2a534d7ed87b994e8426d078c22a93',27:'s:8b8e47935737e95ffcef6087d42c4d13dfa0c647',28:'s:5631d9a4e1522562313febaff5b90bfbe76e8b76',
 29:'s:50a11b331e10e688dc8267294b136960bbacb458',30:'s:d219dfa85a2a534d7ed87b994e8426d078c22a93',31:'s:e1c30fe6a1b5a223c4448f0d258794513020a2fa',32:'s:844bd81ca4c5880e8c8eb318803cb54ecfa911f7',
 33:'s:689a84125f5845235370f55f1da0152c28b5f261',34:'s:87b601902664fec651c0ba2de6127de541b7e477',35:'s:c59adbb6a07177e8a57233fd64dfa8377a838bfd',36:'s:8cf45c072502f201cf3ec6e9dc10d4860162b98a',
 37:'s:7c56f6d48a90d21d1761e3670432817039773bdf',38:'s:f1cde5025c18aab7b58aba16e72e07b17cbb5d76',39:'s:2663ccdd7adbf5bca76c0e6703952656ca387001',40:'s:a0708cf9bc5c52f030230b3ddc52b0c8510312de',
 41:'s:6dddc8162af403306d12f07053cf3dd1b4a43c35',42:'c:3acdc5313bf6f0355e40040c1f25f28153cdcd06',43:'s:5cec8a2df2c55e04291ce80508405d8beb055ecb',45:'s:d27b9ede1847b38611ff946004962f015ae7b21a',
 46:'s:fbdfd6a39e896e6166f91bf25436fc43cd86a3fe',47:'c:2606a27f1a8b448f3dc310bd05c843758a78b926',48:'c:9fb75b5681e3f1e7bd0e07ee90267c841070b7fe',
 51:'s:1b5ce9b8be8948df58d402bfaedf38ecd4d5b295',52:'c:c85e121b84b065bd98e7f9146ae23782acdeb775',53:'s:64f8147d4d9c32b1b8145016e012772cb39a2bb5',54:'s:e3b979f5cef78dbec1b98591858230873c295d52',
 55:'s:cf912ddf0462b0827c7d3dd3bf51dcee195e9360',56:'s:16ef938da370042ec4847e4ab8f755e038be8988',57:'s:cdd647538b386c42df4fd32809e5e2e93d7ca2ca',58:'s:05b4d2ad087869ea72a440149af07be7ff9c4586',
 59:'s:89fd58fa12bfa8e4041a720ca540251359c2a73f',60:'s:bdb196adee2abae5153dafcbd0c60539783a274a',61:'s:5d01bdd0db1531cb00d74f0dd11cd1acf752a76c',62:'s:ea08feed4b925d1ea6d4a17171eec3c0bc4a245c',
 63:'s:23f6ca934a0ea40edc5e7655287a22efe47c61d6',64:'s:c90631c17830307ba1e167d569c2c66895e34544',65:'s:a0316d1f4ae6b4c8dc6e27f0fc3883865f9f1ff1',66:'s:70a5cd08ada56b580e0d473f90350a8f1456212f',
 67:'s:56e40a1cf6f25a4b64c5f0759fdd7fcb85ac7332',68:'s:ffd8b90c27a1aafa56d21b51e82acd72d73265fb',69:'s:96b2eb6cff9f4f49a90309665d23bade8194e502',70:'s:976e86e82f2adfd7fd4bf4e28da42f8a6d7d7b26',
 71:'s:aec5102936c3888bce1f0f8d9c8831557898b0e5',72:'s:a64bc23a4c635deb48c06af9434b5496d602217b',73:'s:6cc7ef0ffffd465f6904265b241cb8ec40935834',74:'c:bb4adb9139707a524923806550f3948c598d48ef'}
CC = [('Уровень', 90, 't', 'Уровень'), ('Production (legacy)', 220, 't', 'Production (legacy)'), ('Было', 240, 'v', 'LEG'), ('DS 2.0', 180, 't', 'DS 2.0'), ('Стало', 240, 'v', 'DS'), ('Статус', 110, 't', 'Статус'),
      ('Как сделать', 320, 'h', 'Как сделать'), ('Всего', 64, 't', 'Всего'), ('Правило / отличие от production', 380, 't', 'Правило / отличие от production')] + [(p, 76, 't', p) for p in P]
NOTE = 'Жёлтая колонка «Как сделать» — твой вариант. Пусто («…») — оставляем как есть. Пиши прямо в ячейку, я считаю текст обратно в CSV.'
def chunks(name, cols, csvp, idf, x, n):
    rows = list(csv.DictReader(open(R / csvp)))
    V = {'LEG': LEG, 'DS': DS}
    rs = [{'id': idf(i, r), 'c': [V[k].get(i + 1, '') if k in V else r[k] for _, _, _, k in cols]} for i, r in enumerate(rows)]
    for j in range(0, len(rs), n):
        D = {'t': name, 'x': x, 'note': NOTE, 'cols': [[l, w, k] for l, w, k, _ in cols], 'rows': rs[j:j + n]}
        p = out / f'{name[:6]}-{j // n:02d}.js'; p.write_text('const D = ' + json.dumps(D, ensure_ascii=False, separators=(',', ':')) + ';\n' + B)
        print(p, len(p.read_text()))
chunks('Цвета → токены', TC, 'docs/migration/table-colors.csv', lambda i, r: f"{i + 1:03d} {r['Legacy']}", 0, 55)
chunks('Компоненты prod → DS 2.0', CC, 'docs/migration/table-components.csv', lambda i, r: f"{i + 1:02d} {r['Production (legacy)'][:40]}", 2600, 25)

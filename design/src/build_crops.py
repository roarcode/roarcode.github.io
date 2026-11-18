"""Crops of OUR OWN art (art/*-raw.jpg, 1280x720) for cards/tiles. Pure crops + CSS tint; no third-party artwork."""
import pathlib
from PIL import Image
D = pathlib.Path(__file__).resolve().parent.parent
A, O = D/'art', D/'img'
# name: (source, (x0,y0,x1,y1)) ; wide crops 16:10 -> 640x400 ; tall crops 3:4 -> 480x640
WIDE = {'skyline': ('hero', (330,120,1130,620)), 'palms': ('hero', (0,0,800,500)), 'boat': ('cat-missions', (420,220,1220,720)),
        'water': ('cat-missions', (0,110,800,610)), 'car': ('cat-vehicles', (60,170,860,670)), 'cash': ('cat-money', (400,160,1200,660)),
        'window': ('cat-money', (0,0,800,500)), 'map': ('cat-collectibles', (240,40,1040,540))}
TALL = {'boat': ('cat-missions', (440,0,1040,720)), 'car': ('cat-vehicles', (90,0,690,720)), 'cash': ('cat-money', (680,0,1280,720)),
        'map': ('cat-collectibles', (320,0,920,720)), 'palms': ('hero', (0,0,540,720)), 'skyline': ('hero', (520,0,1120,720))}
def crop(src, box, size, out, q):
    im = Image.open(A/f'{src}-raw.jpg').convert('RGB').crop(box).resize(size, Image.LANCZOS)
    im.save(O/out, 'WEBP', quality=q, method=6); print(out, (O/out).stat().st_size//1024, 'KB')
for k,(s,b) in WIDE.items(): crop(s, b, (640,400), f'crop-{k}.webp', 70)
for k,(s,b) in TALL.items(): crop(s, tuple(b), (480,640), f'tall-{k}.webp', 68)
# LCP variants (small!)
for src,out in (('hero','hero-768'),('cat-missions','cat-missions-768')):
    im = Image.open(A/f'{src}-raw.jpg').convert('RGB').resize((768,432), Image.LANCZOS)
    im.save(O/f'{out}.webp','WEBP',quality=52,method=6)
    try: im.save(O/f'{out}.avif','AVIF',quality=40)
    except Exception as e: print('avif skipped', e)
    print(out, (O/f'{out}.webp').stat().st_size//1024, 'KB')

"""Export responsive WebP + AVIF from art/*-raw.jpg  ->  img/.  Usage: python src/build_images.py
Each file must stay < 150 KB; quality is stepped down until it fits. Also writes img/lqip.json
(dominant colour + 24px blurred base64 WebP placeholder for each image)."""
import json, base64, io, pathlib
from PIL import Image, ImageFilter
D = pathlib.Path(__file__).resolve().parent.parent
ART, OUT = D/'art', D/'img'; OUT.mkdir(exist_ok=True)
LIMIT = 150*1024
JOBS = {'hero': [1920,1280,768], 'cat-missions':[1280,640], 'cat-money':[1280,640],
        'cat-vehicles':[1280,640], 'cat-collectibles':[1280,640]}
def save(im, path, fmt):
    for q in (80,74,68,62,56,50,44,38,32):
        kw = dict(quality=q, method=6) if fmt=='WEBP' else dict(quality=q, speed=6)
        im.save(path, fmt, **kw)
        if path.stat().st_size <= LIMIT: return q
    return None
lq = {}
for name, widths in JOBS.items():
    src = Image.open(ART/f'{name}-raw.jpg').convert('RGB')
    for w in widths:
        h = round(w*src.height/src.width)
        im = src.resize((w,h), Image.LANCZOS)
        for ext, fmt in (('webp','WEBP'),('avif','AVIF')):
            p = OUT/f'{name}-{w}.{ext}'; q = save(im, p, fmt)
            print(p.name, p.stat().st_size//1024, 'KB q', q)
    tiny = src.resize((24, round(24*src.height/src.width)), Image.LANCZOS).filter(ImageFilter.GaussianBlur(1))
    b = io.BytesIO(); tiny.save(b,'WEBP',quality=40)
    avg = src.resize((1,1), Image.BOX).getpixel((0,0))
    lq[name] = {'color':'#%02x%02x%02x'%avg, 'lqip':'data:image/webp;base64,'+base64.b64encode(b.getvalue()).decode(),
                'w':src.width,'h':src.height}
(OUT/'lqip.json').write_text(json.dumps(lq, indent=1))

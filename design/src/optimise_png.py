import glob, os
from PIL import Image
D='/workspace/gta6-guides/design/article-assets/png/diagrams/'
for f in glob.glob(D+'*.png'):
    im=Image.open(f).convert('RGBA'); im.save(f.replace('.png','.webp'),'WEBP',quality=88,method=6); im.quantize(256).save(f,optimize=True)

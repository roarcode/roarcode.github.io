"""Regenerate logos, favicons, manifest, OG templates + og-default.png.
   Edit ../brand.json (name/tagline/disclaimer) then:  .venv/bin/python src/build_assets.py
   Needs: fonttools, cairosvg, pillow (venv), and node + @resvg/resvg-js for the OG PNG (src/render_og.mjs)."""
import json, base64, io, pathlib, subprocess
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
import cairosvg
from PIL import Image

D = pathlib.Path(__file__).resolve().parent.parent
B = json.loads((D/'brand.json').read_text())
SYNE = TTFont(D/'fonts/Syne-ExtraBold-static.ttf')
INTER = TTFont(D/'fonts/Inter-SemiBold-static.ttf')

def text_path(font, text, size, x=0, y=0, track=0.0):
    """Return (svg path d, advance width). Text converted to outlines: no font needed at render time."""
    gs = font.getGlyphSet(); cmap = font.getBestCmap(); upm = font['head'].unitsPerEm
    s = size/upm; pen = SVGPathPen(gs); cx = x
    for ch in text:
        gn = cmap.get(ord(ch))
        if gn is None: continue
        tp = TransformPen(pen, (s,0,0,-s,cx,y)); gs[gn].draw(tp)
        cx += gs[gn].width*s + track*size
    return pen.getCommands(), cx - x - track*size

PINK, ORANGE, YELLOW, CYAN, VIOLET = '#FF2E93', '#FF8A3D', '#FFC857', '#19E3F5', '#8B5CF6'
BG0, BG1, TXT = '#07060C', '#0D0B16', '#F4F1FA'

DEFS = f'''<linearGradient id="sun" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{YELLOW}"/><stop offset=".45" stop-color="{ORANGE}"/><stop offset="1" stop-color="{PINK}"/></linearGradient>
<linearGradient id="word" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="{ORANGE}"/><stop offset="1" stop-color="{PINK}"/></linearGradient>
<linearGradient id="tile" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1A1530"/><stop offset="1" stop-color="{BG0}"/></linearGradient>'''

def icon_group(detail=True, ox=0, oy=0, scale=1.0, uid='a'):
    """Sun disc (+slats) with an outlined 'L' monogram. Drawn in a 512 box."""
    ldim, lw = text_path(SYNE, B['main'][0], 290, 0, 0)
    # centre the L glyph
    from fontTools.pens.boundsPen import BoundsPen
    bp = BoundsPen(SYNE.getGlyphSet()); SYNE.getGlyphSet()[SYNE.getBestCmap()[ord(B['main'][0])]].draw(bp)
    xmin,ymin,xmax,ymax = bp.bounds; k = 290/SYNE['head'].unitsPerEm
    gw, gh = (xmax-xmin)*k, (ymax-ymin)*k
    lx = 256 - gw/2 - xmin*k; ly = 256 + gh/2 + ymin*k + 6
    d,_ = text_path(SYNE, B['main'][0], 290, lx, ly)
    slats = ''
    if detail:
        y = 268; h = 7
        while y < 400:
            slats += f'<rect x="90" y="{y:.0f}" width="332" height="{h:.0f}" fill="#0D0B16"/>'; y += h+14; h += 2.6
    g = f'''<g transform="translate({ox} {oy}) scale({scale})">
<mask id="m{uid}"><rect width="512" height="512" fill="#fff"/>{''.join(f'<rect x="60" y="{268+i*21+ i*i*0.9:.0f}" width="392" height="{6+i*2.4:.0f}" fill="#000"/>' for i in range(6)) if detail else ''}</mask>
<circle cx="256" cy="250" r="168" fill="url(#sun)" mask="url(#m{uid})"/>
<path d="{d}" transform="translate(-9 9)" fill="none" stroke="{CYAN}" stroke-width="{10 if detail else 16}" stroke-linejoin="round"/>
<path d="{d}" fill="{TXT}" stroke="{BG0}" stroke-width="6" paint-order="stroke" stroke-linejoin="round"/>
</g>'''
    return g

def svg(w,h,body,extra=''):
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" {extra}><defs>{DEFS}</defs>{body}</svg>'

def tile(detail=True, rounded=True, pad=0.0, uid='t'):
    r = 112 if rounded else 0
    sc = 1-2*pad; off = 256*pad*1.0*2/2
    return f'<rect width="512" height="512" rx="{r}" fill="url(#tile)"/>' \
           + icon_group(detail, 256*(1-sc), 256*(1-sc), sc, uid) \
           + (f'<rect x="3" y="3" width="506" height="506" rx="{r-3}" fill="none" stroke="{PINK}" stroke-opacity=".35" stroke-width="3"/>' if rounded else '')

(D/'logo').mkdir(exist_ok=True)
# ---- square icon / monogram
(D/'logo/icon.svg').write_text(svg(512,512,tile(True,True,0.0,'i')))
(D/'logo/monogram-sun.svg').write_text(svg(512,512,icon_group(True,0,0,1,'s')))   # no tile
(D/'favicon.svg').write_text(svg(512,512,tile(False,True,0.04,'f')))

# ---- horizontal + stacked wordmarks (text -> paths)
main, sub = B['main'], B['sub']
dm, wm = text_path(SYNE, main, 96, 0, 0, 0.02)
ds, ws = text_path(INTER, sub, 30, 0, 0, 0.42)
H_W = 96+24+max(wm, ws)+8
hx = 96+24
dm, wm = text_path(SYNE, main, 96, hx, 84, 0.02)
ds, ws = text_path(INTER, sub, 30, hx+4, 122, 0.42)
rule_w = wm
body = f'''<g transform="translate(0 16) scale({96/512})">{tile(True,True,0.0,'h')}</g>
<path d="{dm}" fill="{TXT}"/><path d="{ds}" fill="url(#word)"/>
<rect x="{hx+4+ws+16:.0f}" y="110" width="{max(0,wm-ws-20):.0f}" height="3" rx="1.5" fill="{CYAN}" opacity=".9"/>'''
(D/'logo/wordmark-horizontal.svg').write_text(svg(round(hx+wm+8),132,body))
# stacked
dm2, wm2 = text_path(SYNE, main, 88, 0, 0, 0.02); ds2, ws2 = text_path(INTER, sub, 28, 0, 0, 0.5)
W = max(wm2, 200)+40; cx = W/2
dm2,_ = text_path(SYNE, main, 88, cx-wm2/2, 250, 0.02); ds2,_ = text_path(INTER, sub, 28, cx-ws2/2, 298, 0.5)
body = f'''<g transform="translate({cx-70} 10) scale({140/512})">{tile(True,True,0.0,'s2')}</g>
<path d="{dm2}" fill="{TXT}"/><path d="{ds2}" fill="url(#word)"/>'''
(D/'logo/wordmark-stacked.svg').write_text(svg(round(W),318,body))

# ---- favicons & manifest (in design/)
def png(svgfile, out, size):
    cairosvg.svg2png(url=str(svgfile), write_to=str(out), output_width=size, output_height=size)
icon_full = svg(512,512,tile(True,False,0.12,'ic'))            # full-bleed, safe zone for maskable
small = svg(512,512,tile(False,True,0.03,'sm'))
(D/'src/_icon_full.svg').write_text(icon_full); (D/'src/_icon_small.svg').write_text(small)
png(D/'src/_icon_small.svg', D/'favicon-32.png', 32)
png(D/'src/_icon_full.svg', D/'apple-touch-icon-180.png', 180)
png(D/'src/_icon_full.svg', D/'icon-192.png', 192)
png(D/'src/_icon_full.svg', D/'icon-512.png', 512)
ims=[]
for s in (16,32,48):
    p=D/f'src/_f{s}.png'; png(D/'src/_icon_small.svg', p, s); ims.append(Image.open(p).convert('RGBA'))
ims[2].save(D/'favicon.ico', sizes=[(16,16),(32,32),(48,48)], append_images=ims[:2])
(D/'site.webmanifest').write_text(json.dumps({
  "name": B['name'], "short_name": B['name'].split()[0],
  "description": "Unofficial fan site — guides, tips and walkthroughs. Not affiliated with Rockstar Games.",
  "start_url": "/", "display": "standalone", "background_color": BG0, "theme_color": BG0,
  "icons": [{"src":"/icon-192.png","sizes":"192x192","type":"image/png","purpose":"any maskable"},
            {"src":"/icon-512.png","sizes":"512x512","type":"image/png","purpose":"any maskable"}]}, indent=2))

# ---- OG templates (1200x630)
bg = Image.open(D/'art/og-bg-raw.jpg').convert('RGB')
sc = 1200/bg.width; bg = bg.resize((1200, round(bg.height*sc)), Image.LANCZOS)
top = (bg.height-630)//2; bg = bg.crop((0,top,1200,top+630))
b = io.BytesIO(); bg.save(b,'JPEG',quality=78,optimize=True)
bg64 = base64.b64encode(b.getvalue()).decode()
disc, dw = text_path(INTER, B['disclaimer'], 24, 0, 0, 0.0)
pw = dw+64
def og(title_block, lockup=True):
    dmx, wmx = text_path(SYNE, main, 56, 64+64+20, 98, 0.02); dsx,_ = text_path(INTER, sub, 20, 64+64+24, 126, 0.42)
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
<defs>{DEFS}
<linearGradient id="shade" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="{BG0}" stop-opacity=".9"/><stop offset=".55" stop-color="{BG0}" stop-opacity=".6"/><stop offset="1" stop-color="{BG0}" stop-opacity=".12"/></linearGradient>
<linearGradient id="shadeb" x1="0" y1="0" x2="0" y2="1"><stop offset=".6" stop-color="{BG0}" stop-opacity="0"/><stop offset="1" stop-color="{BG0}" stop-opacity=".9"/></linearGradient></defs>
<image href="data:image/jpeg;base64,{bg64}" x="0" y="0" width="1200" height="630" preserveAspectRatio="xMidYMid slice"/>
<rect width="1200" height="630" fill="url(#shade)"/><rect width="1200" height="630" fill="url(#shadeb)"/>
{(f'<g transform="translate(64 40) scale({84/512})">{tile(True,True,0.0,"og")}</g><path d="{dmx}" fill="{TXT}"/><path d="{dsx}" fill="url(#word)"/>') if lockup else ''}
{title_block}
<rect x="64" y="540" width="{pw:.0f}" height="48" rx="24" fill="{BG0}" fill-opacity=".82" stroke="{PINK}" stroke-opacity=".6"/>
<circle cx="88" cy="564" r="6" fill="{CYAN}"/>
<path d="{text_path(INTER, B['disclaimer'], 24, 106, 573)[0]}" fill="{TXT}"/>
</svg>'''
TS = 'font-family="Syne, sans-serif" font-weight="800" fill="#F4F1FA"'
cat_t = '<rect x="64" y="{cy}" width="10" height="10" fill="PINKC"/><text x="86" y="{cty}" font-family="Inter, sans-serif" font-weight="600" font-size="24" letter-spacing="3" fill="CYANC">{{category}}</text>'.replace('PINKC',PINK).replace('CYANC',CYAN)
one = cat_t.replace('{cy}','232').replace('{cty}','243') + f'<text x="64" y="330" font-size="50" {TS}>{{{{title}}}}</text>'
two = cat_t.replace('{cy}','192').replace('{cty}','203') + f'<text x="64" y="290" font-size="50" {TS}>{{{{title_line1}}}}</text><text x="64" y="364" font-size="50" {TS}>{{{{title_line2}}}}</text>'
(D/'og/og-template.svg').write_text(og(one))
(D/'og/og-template-2line.svg').write_text(og(two))
# default: tagline instead of a title
dt, dtw = text_path(SYNE, main, 118, 64, 270, 0.02); dts,_ = text_path(INTER, sub, 46, 68, 340, 0.5)
tag = f'<path d="{dt}" fill="{TXT}"/><path d="{dts}" fill="url(#word)"/><text x="66" y="414" font-family="Inter, sans-serif" font-weight="600" font-size="30" fill="#D8D2EC">{B["tagline"]}</text>'
d_svg = og(tag, lockup=False).replace('<text x="86" y="243"','<text x="0" y="0"')
(D/'og/og-default.svg').write_text(d_svg)
print('assets ok')

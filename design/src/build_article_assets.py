"""Generate article-assets/*.svg (+ PNG fallbacks).  Original geometry; text converted to outlines.
   run: .venv/bin/python src/build_article_assets.py && node src/render_article_png.mjs"""
import pathlib, json
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

D = pathlib.Path(__file__).resolve().parent.parent / 'article-assets'
SYNE = TTFont(D.parent/'fonts/Syne-ExtraBold-static.ttf'); INTER = TTFont(D.parent/'fonts/Inter-SemiBold-static.ttf')
C = dict(bg0='#07060C', bg1='#0D0B16', bg2='#151226', bg3='#1E1A36', line='#3B3462', txt='#F4F1FA', txt2='#C4BDDA', txt3='#9189AE',
         pink='#FF2E93', cyan='#19E3F5', orange='#FF8A3D', yellow='#FFC857',
         missions='#FF4FA3', money='#4ADE80', collect='#C084FC', vehicle='#4DA3FF', weapon='#FF6B3D', danger='#FF6B6B', start='#19E3F5', finish='#F4F1FA')

def tpath(font, text, size, cx, cy, track=0.0, anchor='mid'):
    """outline path of text, optically centred on (cx, cy) using real glyph bounds"""
    gs = font.getGlyphSet(); cmap = font.getBestCmap(); s = size/font['head'].unitsPerEm
    # measure
    x = 0; bounds = None; items = []
    for ch in text:
        gn = cmap.get(ord(ch));
        if gn is None: continue
        bp = BoundsPen(gs); gs[gn].draw(bp)
        if bp.bounds:
            b = bp.bounds; lo, hi = x + b[0]*s, x + b[2]*s
            bounds = (min(bounds[0], lo), max(bounds[1], hi), min(bounds[2], b[1]*s), max(bounds[3], b[3]*s)) if bounds else (lo, hi, b[1]*s, b[3]*s)
        items.append((gn, x)); x += gs[gn].width*s + track*size
    if not bounds: return ''
    ox = cx - (bounds[0]+bounds[1])/2 if anchor == 'mid' else cx
    oy = cy + (bounds[2]+bounds[3])/2
    pen = SVGPathPen(gs)
    for gn, gx in items: gs[gn].draw(TransformPen(pen, (s,0,0,-s,ox+gx,oy)))
    return pen.getCommands()

def svg(w, h, body, title='', defs=''):
    t = f'<title>{title}</title>' if title else ''
    return f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img">{t}<defs>{defs}</defs>{body}</svg>\n'
def w(path, s): (D/path).write_text(s)

SUN = f'<linearGradient id="sun" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="{C["yellow"]}"/><stop offset=".5" stop-color="{C["orange"]}"/><stop offset="1" stop-color="{C["pink"]}"/></linearGradient>'

# ---------------- STEPS 1-20 ----------------
for n in range(1, 21):
    p = tpath(SYNE, str(n), 44 if n < 10 else 38, 48, 48)
    body = f'<circle cx="48" cy="48" r="44" fill="{C["bg1"]}" stroke="url(#sun)" stroke-width="5"/><circle cx="48" cy="48" r="35" fill="{C["bg3"]}"/><path d="{p}" fill="{C["txt"]}"/>'
    w(f'steps/step-{n:02d}.svg', svg(96, 96, body, f'Step {n}', SUN))
    # solid variant for use on busy backgrounds / images
    body2 = f'<circle cx="48" cy="48" r="44" fill="url(#sun)"/><circle cx="48" cy="48" r="44" fill="none" stroke="{C["bg0"]}" stroke-opacity=".5" stroke-width="2"/><path d="{p}" fill="{C["bg0"]}"/>'
    w(f'steps/step-{n:02d}-solid.svg', svg(96, 96, body2, f'Step {n}', SUN))

# ---------------- PINS ----------------
PIN = 'M24 62 C24 62 4 38 4 22 A20 20 0 0 1 44 22 C44 38 24 62 24 62Z'
def glyph(kind, col):
    cx, cy = 24, 22
    if kind == 'missions': return f'<path d="M24 11 L27.4 18.6 L35.6 19.4 L29.4 24.8 L31.3 33 L24 28.7 L16.7 33 L18.6 24.8 L12.4 19.4 L20.6 18.6Z" fill="{col}"/>'
    if kind == 'money': return f'<path d="{tpath(SYNE, "$", 24, cx, cy)}" fill="{col}"/>'
    if kind == 'collect': return f'<path d="M24 11 L35 22 L24 33 L13 22Z" fill="{col}"/><path d="M24 17 L29 22 L24 27 L19 22Z" fill="{C["bg0"]}"/>'
    if kind == 'vehicle': return f'<path d="M12 25 L14.5 18.5 Q15.2 17 17 17 H31 Q32.8 17 33.5 18.5 L36 25 V30 H32.5 V28 H15.5 V30 H12Z" fill="{col}"/><circle cx="17" cy="24.5" r="1.8" fill="{C["bg0"]}"/><circle cx="31" cy="24.5" r="1.8" fill="{C["bg0"]}"/>'
    if kind == 'weapon': return f'<circle cx="24" cy="22" r="8.5" fill="none" stroke="{col}" stroke-width="2.6"/><path d="M24 9v7M24 28v7M11 22h7M30 22h7" stroke="{col}" stroke-width="2.6" stroke-linecap="round"/>'
    if kind == 'danger': return f'<path d="M24 10.5 L36 31 H12Z" fill="{col}"/><path d="M24 17.5v7" stroke="{C["bg0"]}" stroke-width="2.8" stroke-linecap="round"/><circle cx="24" cy="28" r="1.7" fill="{C["bg0"]}"/>'
    if kind == 'start': return f'<path d="M19 13 L34 22 L19 31Z" fill="{col}"/>'
    if kind == 'finish': return ''.join(f'<rect x="{14+i*7}" y="{12+j*7}" width="7" height="7" fill="{col if (i+j)%2==0 else C["bg0"]}" {"" if (i+j)%2==0 else ""}/>' for i in range(3) for j in range(3)).replace('<rect x="14"','<rect rx="1" x="14"',1)
def pin(kind, inner=None, label=''):
    col = C[kind if kind in C else 'missions']
    inner = glyph(kind, col) if inner is None else inner
    return svg(48, 68, f'<ellipse cx="24" cy="65" rx="9" ry="2.5" fill="#000" fill-opacity=".45"/><path d="{PIN}" fill="{col}" stroke="{C["bg0"]}" stroke-width="2.5" stroke-linejoin="round"/><circle cx="24" cy="22" r="14.5" fill="{C["bg0"]}"/>{inner}', f'{label or kind} pin')
KINDS = ['missions','money','collect','vehicle','weapon','danger','start','finish']
for k in KINDS: w(f'pins/pin-{k}.svg', pin(k, label={'collect':'Collectible','missions':'Mission'}.get(k, k.title())))
for n in range(1, 11):
    col = C['pink']; p = tpath(INTER, str(n), 19 if n < 10 else 16, 24, 22.5)
    w(f'pins/pin-number-{n:02d}.svg', pin('missions', f'<path d="{p}" fill="{col}"/>', f'Pin {n}'))
# legend sheet
LEG = [('missions','Mission'),('money','Money'),('collect','Collectible'),('vehicle','Vehicle'),('weapon','Weapon'),('danger','Danger'),('start','Start'),('finish','Finish')]
body = f'<rect width="480" height="140" rx="14" fill="{C["bg2"]}" stroke="{C["line"]}"/>'
for i, (k, lab) in enumerate(LEG):
    x = 20 + (i % 4)*116; y = 14 + (i//4)*62
    col = C[k]
    body += f'<circle cx="{x+9}" cy="{y+22}" r="8" fill="{col}" stroke="{C["bg0"]}" stroke-width="2"/><path d="{tpath(INTER, lab, 15, x+24, y+22, anchor="left").replace("","")}" fill="{C["txt2"]}" transform="translate(0 0)"/>'
w('pins/legend-sheet.svg', svg(480, 140, body, 'Map legend'))
# single legend item (dot + label)
for k, lab in LEG:
    col = C[k]; lp = tpath(INTER, lab, 15, 26, 12, anchor='left')
    w(f'pins/legend-{k}.svg', svg(120, 24, f'<circle cx="10" cy="12" r="7" fill="{col}" stroke="{C["bg0"]}" stroke-width="2"/><path d="{lp}" fill="{C["txt2"]}"/>', f'Legend: {lab}'))

# ---------------- CONTROLLER BUTTONS ----------------
RING = C['cyan']
def disc(inner, title, size=64):
    return svg(size, size, f'<circle cx="32" cy="32" r="28" fill="{C["bg2"]}" stroke="{RING}" stroke-width="3"/><circle cx="32" cy="32" r="22.5" fill="none" stroke="{C["line"]}" stroke-width="1.5"/>{inner}', title)
def pill(label, title, wd=88, ht=44, icon=None, trig=False):
    if trig:   # trigger: taller, one side curved
        shape = f'<path d="M6 {ht-6} Q6 8 22 8 H{wd-6} Q{wd-2} 8 {wd-2} 14 V{ht-6} Q{wd-2} {ht} {wd-8} {ht} H12 Q6 {ht} 6 {ht-6}Z"/>'
    else:
        shape = f'<rect x="4" y="{ht/2-14}" width="{wd-8}" height="28" rx="14"/>'
    inner = icon if icon else f'<path d="{tpath(INTER, label, 17 if len(label)<3 else 15, wd/2, ht/2 + (2 if trig else 0), 0.03)}" fill="{C["txt"]}"/>'
    return svg(wd, ht, f'<g fill="{C["bg2"]}" stroke="{RING}" stroke-width="3" stroke-linejoin="round">{shape}</g>{inner}', title)
G = C['txt']
PS_SHAPES = {
 'triangle': f'<path d="M32 18 L45 40 H19Z" fill="none" stroke="{G}" stroke-width="3.4" stroke-linejoin="round"/>',
 'circle': f'<circle cx="32" cy="32" r="12" fill="none" stroke="{G}" stroke-width="3.4"/>',
 'cross': f'<path d="M21 21 L43 43 M43 21 L21 43" stroke="{G}" stroke-width="3.6" stroke-linecap="round"/>',
 'square': f'<rect x="21" y="21" width="22" height="22" rx="2" fill="none" stroke="{G}" stroke-width="3.4" stroke-linejoin="round"/>'}
for k, v in PS_SHAPES.items(): w(f'buttons/ps-{k}.svg', disc(v, f'{k.title()} button (generic)'))
for b in ('L1','R1'): w(f'buttons/ps-{b.lower()}.svg', pill(b, f'{b} button (generic)'))
for b in ('L2','R2'): w(f'buttons/ps-{b.lower()}.svg', pill(b, f'{b} trigger (generic)', trig=True))
for b in ('L3','R3'): w(f'buttons/ps-{b.lower()}.svg', disc(f'<circle cx="32" cy="32" r="14" fill="{C["bg3"]}"/><path d="{tpath(INTER, b, 15, 32, 32.5)}" fill="{G}"/>', f'{b} (stick press, generic)'))
menu = f'<path d="M26 26h20M26 32h20M26 38h20" stroke="{G}" stroke-width="3.2" stroke-linecap="round"/>'
w('buttons/ps-options.svg', svg(88, 44, f'<rect x="4" y="8" width="80" height="28" rx="14" fill="{C["bg2"]}" stroke="{RING}" stroke-width="3"/><path d="M34 17.5h20M34 22h20M34 26.5h20" stroke="{G}" stroke-width="3" stroke-linecap="round"/>', 'Options button (generic)'))
w('buttons/ps-touchpad.svg', svg(104, 56, f'<path d="M8 10 Q8 6 12 6 H92 Q96 6 96 10 V38 Q96 50 84 50 H20 Q8 50 8 38Z" fill="{C["bg2"]}" stroke="{RING}" stroke-width="3" stroke-linejoin="round"/><path d="M52 16 V40" stroke="{C["line"]}" stroke-width="2.4" stroke-linecap="round"/>', 'Touchpad (generic)'))
for k in 'ABXY': w(f'buttons/xbox-{k.lower()}.svg', disc(f'<path d="{tpath(INTER, k, 26, 32, 32.5)}" fill="{G}"/>', f'{k} button (generic)'))
for b in ('LB','RB'): w(f'buttons/xbox-{b.lower()}.svg', pill(b, f'{b} button (generic)'))
for b in ('LT','RT'): w(f'buttons/xbox-{b.lower()}.svg', pill(b, f'{b} trigger (generic)', trig=True))
for b in ('LS','RS'): w(f'buttons/xbox-{b.lower()}.svg', disc(f'<circle cx="32" cy="32" r="14" fill="{C["bg3"]}"/><path d="{tpath(INTER, b, 15, 32, 32.5)}" fill="{G}"/>', f'{b} (stick press, generic)'))
w('buttons/xbox-menu.svg', disc(menu, 'Menu button (generic)'))
w('buttons/xbox-view.svg', disc(f'<rect x="20" y="25" width="17" height="14" rx="2" fill="none" stroke="{G}" stroke-width="3"/><rect x="27" y="21" width="17" height="14" rx="2" fill="{C["bg2"]}" stroke="{G}" stroke-width="3"/>', 'View button (generic)'))
# shared: d-pad + sticks
def dpad(active=None):
    arms = {'up':'M26 8 H38 V24 H26Z','down':'M26 40 H38 V56 H26Z','left':'M8 26 H24 V38 H8Z','right':'M40 26 H56 V38 H40Z'}
    s = f'<path d="M26 8 H38 V26 H56 V38 H38 V56 H26 V38 H8 V26 H26Z" fill="{C["bg2"]}" stroke="{RING}" stroke-width="3" stroke-linejoin="round"/>'
    tri = {'up':'M32 13 L37 21 H27Z','down':'M32 51 L37 43 H27Z','left':'M13 32 L21 27 V37Z','right':'M51 32 L43 27 V37Z'}
    for k, d in tri.items(): s += f'<path d="{d}" fill="{C["cyan"] if k == active else C["txt3"]}"/>'
    if active: s = s.replace('<path d="M26 8 H38 V26', f'<path d="{arms[active]}" fill="{C["cyan"]}" fill-opacity=".25"/><path d="M26 8 H38 V26', 1) if False else s
    return s
w('buttons/dpad.svg', svg(64, 64, dpad(), 'D-pad'))
for k in ('up','down','left','right'): w(f'buttons/dpad-{k}.svg', svg(64, 64, dpad(k), f'D-pad {k}'))
def stick(side, motion=None):
    col = C['cyan']
    arrows = ''
    if motion: arrows = {'rotate': f'<path d="M14 24 A21 21 0 0 1 50 24" fill="none" stroke="{col}" stroke-width="2.6" stroke-linecap="round"/><path d="M50 24 l-1 -8 M50 24 l-8 1" stroke="{col}" stroke-width="2.6" stroke-linecap="round"/>', 'up': ''}.get(motion, '')
    return svg(64, 64, f'<circle cx="32" cy="32" r="28" fill="{C["bg2"]}" stroke="{RING}" stroke-width="3"/><circle cx="32" cy="32" r="16" fill="{C["bg3"]}" stroke="{C["line"]}" stroke-width="2"/><circle cx="32" cy="32" r="9" fill="none" stroke="{C["line"]}" stroke-width="2"/><path d="{tpath(INTER, side.upper(), 12, 32, 32.5)}" fill="{C["txt2"]}"/>{arrows}', f'{side.title()} stick')
w('buttons/stick-left.svg', stick('l')); w('buttons/stick-right.svg', stick('r'))
w('buttons/stick-left-rotate.svg', stick('l','rotate')); w('buttons/stick-right-rotate.svg', stick('r','rotate'))

# ---------------- DIAGRAM TEMPLATES (1200x675) ----------------
FONT = 'font-family="Inter, system-ui, sans-serif"'; DISP = 'font-family="Syne, Inter, sans-serif" font-weight="800"'
def frame(body, title, defs=''):
    return svg(1200, 675, f'<rect width="1200" height="675" rx="28" fill="{C["bg1"]}"/><rect x="1.5" y="1.5" width="1197" height="672" rx="27" fill="none" stroke="{C["line"]}" stroke-width="3"/><rect x="0" y="0" width="1200" height="8" rx="4" fill="url(#bar)"/>{body}', title,
               defs + f'<linearGradient id="bar" x1="0" x2="1"><stop offset="0" stop-color="{C["orange"]}"/><stop offset="1" stop-color="{C["pink"]}"/></linearGradient>' + f'<marker id="arr" viewBox="0 0 12 12" refX="8" refY="6" markerUnits="userSpaceOnUse" markerWidth="26" markerHeight="26" orient="auto-start-reverse"><path d="M1 1 L10 6 L1 11Z" fill="{C["cyan"]}"/></marker>')
T = lambda x, y, s, fill, txt, extra='': f'<text x="{x}" y="{y}" font-size="{s}" fill="{fill}" {FONT} {"" if "font-weight" in extra else "font-weight=\"600\""} {extra}>{txt}</text>'
# route arrow
pinsm = lambda x, y, col: f'<g transform="translate({x} {y}) scale(1.1)"><path d="{PIN}" fill="{col}" stroke="{C["bg0"]}" stroke-width="2.5"/><circle cx="24" cy="22" r="10" fill="{C["bg0"]}"/></g>'
body = f'<text x="60" y="84" font-size="40" fill="{C["txt"]}" {DISP}>{{{{title}}}}</text>' \
  + f'<rect x="60" y="120" width="1080" height="500" rx="18" fill="{C["bg2"]}"/>' \
  + ''.join(f'<path d="M{60+i*60} 120 V620" stroke="#fff" stroke-opacity=".04"/>' for i in range(1,18)) \
  + f'<path d="M190 520 C 330 520 330 330 480 330 S 700 250 760 380 S 940 470 1010 250" fill="none" stroke="{C["cyan"]}" stroke-width="7" stroke-dasharray="4 16" stroke-linecap="round" marker-end="url(#arr)"/>' \
  + pinsm(166, 480, C['start']) + pinsm(986, 190, C['finish']) \
  + ''.join(f'<circle cx="{x}" cy="{y}" r="22" fill="{C["bg0"]}" stroke="{C["pink"]}" stroke-width="4"/><text x="{x}" y="{y+8}" text-anchor="middle" font-size="26" fill="{C["txt"]}" {DISP}>{n}</text>' for n, x, y in [(1,420,372),(2,640,282),(3,830,430)]) \
  + T(60, 650, 22, C['txt3'], '{{caption}}')
w('diagrams/route-arrow.svg', frame(body, 'Route arrow template'))
# before / after
def panel(x, label, col):
    return f'<rect x="{x}" y="130" width="520" height="400" rx="18" fill="{C["bg2"]}" stroke="{C["line"]}" stroke-width="2"/><path d="M{x+40} 470 L{x+160} 330 L{x+240} 410 L{x+330} 290 L{x+480} 470Z" fill="{col}" fill-opacity=".22"/><circle cx="{x+390}" cy="210" r="34" fill="{col}" fill-opacity=".35"/><rect x="{x+24}" y="24" width="170" height="44" rx="22" fill="{C["bg0"]}" stroke="{col}" stroke-width="3" transform="translate(0 130)"/><text x="{x+109}" y="183" text-anchor="middle" font-size="22" fill="{col}" {FONT} font-weight="700" letter-spacing="3">{label}</text>'
body = f'<text x="60" y="84" font-size="40" fill="{C["txt"]}" {DISP}>{{{{title}}}}</text>' + panel(60, 'BEFORE', C['danger']) + panel(620, 'AFTER', C['money']) \
  + f'<circle cx="600" cy="330" r="34" fill="{C["bg0"]}" stroke="{C["cyan"]}" stroke-width="4"/><path d="M586 330 H612 M603 319 L614 330 L603 341" fill="none" stroke="{C["cyan"]}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>' \
  + T(60, 580, 26, C['txt2'], '{{before_caption}}') + T(620, 580, 26, C['txt2'], '{{after_caption}}') + T(60, 640, 20, C['txt3'], '{{credit}}')
w('diagrams/before-after.svg', frame(body, 'Before and after template'))
# flowchart
def box(x, y, wd, ht, txt, col, rx=14):
    return f'<rect x="{x}" y="{y}" width="{wd}" height="{ht}" rx="{rx}" fill="{C["bg2"]}" stroke="{col}" stroke-width="3"/>' + T(x+wd/2, y+ht/2+8, 24, C['txt'], txt, 'text-anchor="middle"')
arrow = lambda d: f'<path d="{d}" fill="none" stroke="{C["cyan"]}" stroke-width="4" stroke-linecap="round" marker-end="url(#arr)"/>'
body = f'<text x="60" y="84" font-size="40" fill="{C["txt"]}" {DISP}>{{{{title}}}}</text>' \
  + box(60, 290, 200, 90, '{{start}}', C['cyan'], 45) + arrow('M262 335 H340') \
  + f'<path d="M500 235 L640 335 L500 435 L360 335Z" fill="{C["bg2"]}" stroke="{C["orange"]}" stroke-width="3"/>' + T(500, 343, 24, C['txt'], '{{question}}', 'text-anchor="middle"') \
  + arrow('M642 335 H760') + T(690, 318, 20, C['money'], 'YES', 'text-anchor="middle"') + box(762, 290, 240, 90, '{{yes_action}}', C['money']) \
  + arrow('M500 437 V540 H760') + T(520, 500, 20, C['danger'], 'NO') + box(762, 495, 240, 90, '{{no_action}}', C['danger']) \
  + arrow('M1004 335 H1060') + f'<circle cx="1100" cy="335" r="36" fill="{C["bg0"]}" stroke="{C["pink"]}" stroke-width="4"/>' + T(1100, 343, 22, C['txt'], 'END', 'text-anchor="middle"')
w('diagrams/flowchart.svg', frame(body, 'Flow chart template'))
# timer / cooldown (ring 70%)
import math
r = 150; cx, cy = 330, 380; frac = .7; ang = 2*math.pi*frac
x2 = cx + r*math.sin(ang); y2 = cy - r*math.cos(ang)
body = f'<text x="60" y="84" font-size="40" fill="{C["txt"]}" {DISP}>{{{{title}}}}</text>' \
  + f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{C["bg3"]}" stroke-width="30"/>' \
  + f'<path d="M{cx} {cy-r} A{r} {r} 0 1 1 {x2:.1f} {y2:.1f}" fill="none" stroke="url(#ring)" stroke-width="30" stroke-linecap="round"/>' \
  + f'<text x="{cx}" y="{cy+20}" text-anchor="middle" font-size="58" fill="{C["txt"]}" {DISP}>{{{{time}}}}</text>' + T(cx, cy+66, 24, C['txt3'], '{{unit}}', 'text-anchor="middle" letter-spacing="4"') \
  + T(640, 250, 26, C['cyan'], 'COOLDOWN', 'letter-spacing="5"') + T(640, 310, 34, C['txt'], '{{event}}', 'font-weight="700"') + T(640, 360, 24, C['txt2'], '{{note}}') \
  + f'<rect x="640" y="440" width="480" height="18" rx="9" fill="{C["bg3"]}"/><rect x="640" y="440" width="336" height="18" rx="9" fill="url(#ring)"/>' \
  + ''.join(f'<path d="M{640+i*120} 470 v14" stroke="{C["txt3"]}" stroke-width="3"/>' for i in range(5)) \
  + T(640, 520, 20, C['txt3'], '0') + T(1100, 520, 20, C['txt3'], '{{max}}', 'text-anchor="end"')
w('diagrams/timer-cooldown.svg', frame(body, 'Timer / cooldown template', f'<linearGradient id="ring" x1="0" x2="1" y1="1" y2="0"><stop offset="0" stop-color="{C["orange"]}"/><stop offset="1" stop-color="{C["pink"]}"/></linearGradient>'))
# do / don't
def col(x, ok):
    c = C['money'] if ok else C['danger']; head = 'DO' if ok else "DON'T"
    ic = f'<path d="M{x+40} 188 l16 16 l30 -34" fill="none" stroke="{c}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>' if ok else f'<path d="M{x+42} 170 l38 38 M{x+80} 170 l-38 38" stroke="{c}" stroke-width="8" stroke-linecap="round"/>'
    s = f'<rect x="{x}" y="130" width="520" height="470" rx="20" fill="{C["bg2"]}" stroke="{c}" stroke-width="3"/><circle cx="{x+61}" cy="190" r="34" fill="{c}" fill-opacity=".14" stroke="{c}" stroke-width="3"/>{ic}' + f'<text x="{x+116}" y="204" font-size="40" fill="{c}" {DISP}>{head}</text>'
    for i in range(3): s += f'<circle cx="{x+44}" cy="{290+i*90}" r="7" fill="{c}"/>' + T(x+68, 299+i*90, 28, C['txt'], '{{%s_%d}}' % ('do' if ok else 'dont', i+1))
    return s
w('diagrams/do-dont.svg', frame(f'<text x="60" y="84" font-size="40" fill="{C["txt"]}" {DISP}>{{{{title}}}}</text>' + col(60, True) + col(620, False), "Do and don't template"))
print('article assets ok')

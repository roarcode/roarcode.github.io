"""Rebuild logo/wordmark-horizontal.svg and logo/wordmark-stacked.svg in Anton.
Text is converted to outlines (fontTools SVGPathPen) so the SVGs don't depend on fonts.
Styled like the site header wordmark: Anton all-caps, letter-spacing .035em,
LEONIDA in --text-1 (#F4F1FA), GUIDES in the sunset gradient (#FF8A3D → #FF2E93).
The sun-and-L icon is reused from logo/icon.svg (the mark itself is unchanged).
"""
from __future__ import annotations
import re
import pathlib
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen

D = pathlib.Path(__file__).resolve().parent.parent
ANTON = TTFont(D / "fonts/Anton-Regular-static.ttf")
TRACK = 0.035  # matches .site-header__wordmark { letter-spacing: .035em }

PINK, ORANGE, YELLOW, CYAN = "#FF2E93", "#FF8A3D", "#FFC857", "#19E3F5"
BG0, TXT = "#07060C", "#F4F1FA"

DEFS = f'''<linearGradient id="sun" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="{YELLOW}"/><stop offset=".45" stop-color="{ORANGE}"/><stop offset="1" stop-color="{PINK}"/></linearGradient>
<linearGradient id="word" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="{ORANGE}"/><stop offset="1" stop-color="{PINK}"/></linearGradient>
<linearGradient id="tile" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1A1530"/><stop offset="1" stop-color="{BG0}"/></linearGradient>'''


def text_path(font, text, size, x=0, y=0, track=TRACK):
    """Return (svg path d, ink width including tracking between letters)."""
    gs = font.getGlyphSet()
    cmap = font.getBestCmap()
    upm = font["head"].unitsPerEm
    s = size / upm
    pen = SVGPathPen(gs)
    cx = x
    for i, ch in enumerate(text):
        gn = cmap.get(ord(ch))
        if gn is None:
            continue
        tp = TransformPen(pen, (s, 0, 0, -s, cx, y))
        gs[gn].draw(tp)
        adv = gs[gn].width * s
        if i < len(text) - 1:
            cx += adv + track * size
        else:
            cx += adv
    return pen.getCommands(), cx - x


def icon_group_from_existing():
    """Reuse the 512×512 tiled sun+L mark from logo/icon.svg, minus outer svg/defs."""
    raw = (D / "logo/icon.svg").read_text()
    # drop xml/svg wrapper and defs — we inject shared defs on the wordmark
    body = re.sub(r"^.*?</defs>", "", raw, count=1, flags=re.S)
    body = re.sub(r"</svg>\s*$", "", body).strip()
    return body


def svg(w, h, body):
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">'
        f"<defs>{DEFS}</defs>{body}</svg>\n"
    )


ICON = icon_group_from_existing()

# ---- horizontal: [icon] LEONIDA GUIDES on one line, like the site header ----
# Original lockup was 869×132 (Syne + Inter tagline). Anton is narrower, so width shrinks.
ICON_PX = 96
PAD = 16
GAP = 20  # space between icon and wordmark
Y_BASE = 84  # baseline inside the 132-tall frame (optical centre with icon)
SIZE = 72  # slightly under icon height so caps sit comfortably in the 132 frame

d_leo, w_leo = text_path(ANTON, "LEONIDA", SIZE, 0, 0)
d_gui, w_gui = text_path(ANTON, "GUIDES", SIZE, 0, 0)
SPACE = text_path(ANTON, "I", SIZE, 0, 0)[1] * 0.42  # word space ~ a tight Anton gap, not a full em

# measure a real space glyph if present, else use the heuristic
space_adv = ANTON.getGlyphSet()[ANTON.getBestCmap().get(ord(" "), "space")].width if ANTON.getBestCmap().get(ord(" ")) else None
if space_adv:
    SPACE = space_adv * (SIZE / ANTON["head"].unitsPerEm) + TRACK * SIZE

hx = PAD + ICON_PX + GAP
d_leo, w_leo = text_path(ANTON, "LEONIDA", SIZE, hx, Y_BASE)
gui_x = hx + w_leo + SPACE
d_gui, w_gui = text_path(ANTON, "GUIDES", SIZE, gui_x, Y_BASE)
W = round(gui_x + w_gui + PAD)
H = 132
icon_scale = ICON_PX / 512
icon_y = (H - ICON_PX) / 2
body = (
    f'<g transform="translate({PAD} {icon_y:.2f}) scale({icon_scale})">{ICON}</g>'
    f'<path d="{d_leo}" fill="{TXT}"/>'
    f'<path d="{d_gui}" fill="url(#word)"/>'
)
(D / "logo/wordmark-horizontal.svg").write_text(svg(W, H, body))
print(f"horizontal {W}x{H} (was 869x132) leo={w_leo:.1f} guides={w_gui:.1f} space={SPACE:.1f}")

# ---- stacked: icon on top, LEONIDA, GUIDES (gradient), all Anton ----
# Original was 719×318. Shrink width to the text + side pad.
SIZE2 = 88
d_leo2, w_leo2 = text_path(ANTON, "LEONIDA", SIZE2, 0, 0)
d_gui2, w_gui2 = text_path(ANTON, "GUIDES", SIZE2, 0, 0)
icon_px2 = 140
side = 28
W2 = round(max(w_leo2, w_gui2, icon_px2) + side * 2)
cx = W2 / 2
# vertical rhythm: icon, then LEONIDA, then GUIDES
icon_y2 = 16
leo_base = icon_y2 + icon_px2 + 36
gui_base = leo_base + 76
H2 = round(gui_base + 28)
d_leo2, _ = text_path(ANTON, "LEONIDA", SIZE2, cx - w_leo2 / 2, leo_base)
d_gui2, _ = text_path(ANTON, "GUIDES", SIZE2, cx - w_gui2 / 2, gui_base)
icon_s2 = icon_px2 / 512
body2 = (
    f'<g transform="translate({cx - icon_px2 / 2:.2f} {icon_y2}) scale({icon_s2})">{ICON}</g>'
    f'<path d="{d_leo2}" fill="{TXT}"/>'
    f'<path d="{d_gui2}" fill="url(#word)"/>'
)
(D / "logo/wordmark-stacked.svg").write_text(svg(W2, H2, body2))
print(f"stacked {W2}x{H2} (was 719x318) leo={w_leo2:.1f} guides={w_gui2:.1f}")

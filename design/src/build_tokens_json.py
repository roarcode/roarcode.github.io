"""tokens.css -> tokens.json (flat + grouped). tokens.css stays the source of truth."""
import re, json, pathlib
D = pathlib.Path(__file__).resolve().parent.parent
css = (D/'tokens.css').read_text(); root = css.split(':root {',1)[1].split('\n}',1)[0]
flat = {m.group(1): m.group(2).strip() for m in re.finditer(r'--([\w-]+):\s*([^;]+);', re.sub(r'/\*.*?\*/', '', root, flags=re.S))}
groups = {}
for k, v in flat.items():
    g = k.split('-')[0]; groups.setdefault({'bg':'surface','line':'surface','text':'text','brand':'brand','accent':'accent','status':'status','gradient':'gradient','overlay':'gradient','fs':'fontSize','lh':'lineHeight','ls':'letterSpacing','fw':'fontWeight','font':'fontFamily','space':'spacing','radius':'radius','shadow':'shadow','glow':'shadow','z':'zIndex','bp':'breakpoint','dur':'motion','ease':'motion'}.get(g, 'other'), {})[k] = v
brand = json.loads((D/'brand.json').read_text())
(D/'tokens.json').write_text(json.dumps({'$comment': 'Generated from tokens.css. Unofficial fan site — not affiliated with Rockstar Games.', 'brand': brand, 'tokens': groups, 'flat': flat}, indent=1, ensure_ascii=False))
print(len(flat), 'tokens')

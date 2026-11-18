# Font licences
Both fonts are free and open-licensed under the SIL Open Font License 1.1 (https://openfontlicense.org), obtained from Google Fonts. Free for commercial use, self-hosting and subsetting allowed; they may not be sold on their own.

| Font | Use | File | Source | Licence |
|---|---|---|---|---|
| Anton (Vernon Adams) | display / headlines / wordmark — ALL CAPS, one weight (400) | `Anton-Regular.woff2` (≈18 KB) | https://fonts.google.com/specimen/Anton | OFL 1.1 |
| Inter (Rasmus Andersson) | UI + body — variable 400–800, opsz pinned to 14 | `Inter-Variable.woff2` (≈31 KB) | https://fonts.google.com/specimen/Inter | OFL 1.1 |

Subset (fonttools `pyftsubset`) to Basic Latin, Latin-1, **Latin Extended-A (č š ž ć đ)** and general punctuation, woff2. Preload **only** Anton. `*-static.ttf` files in this folder are legacy single-weight instances for the OG/article renderers (resvg) and still carry the old Syne/Inter faces — re-point them to Anton. The old `Syne-var`, `Inter-var`, `SpaceMono-*` woff2 files stay next to these only until the live `01-fonts.css` is ported (do not ship in the redesign). None of these resembles Pricedown or any Rockstar typeface.

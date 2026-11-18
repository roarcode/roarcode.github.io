# Image slots report

Scanned `/workspace/gta6-guides/content` — 51 files, 42 slots. Renderer 84f3fb45b5.

| rendered | up-to-date | no spec | error | orphan specs |
|---|---|---|---|---|
| 34 | 0 | 8 | 0 | 0 |

## Slots
| slot | in file | status | spec | suggested type | hint / note |
|---|---|---|---|---|---|
| `beginner-tips-step-1` | beginner-tips.md | rendered | sidecar | needs-screenshot | 52 KB |
| `beginner-tips-step-2` | beginner-tips.md | rendered | sidecar | step-card | 35 KB |
| `beginner-tips-step-3` | beginner-tips.md | rendered | sidecar | map-annotate | 42 KB |
| `editions-prices-step-1` | editions-prices.md | rendered | sidecar | step-card | 49 KB |
| `editions-prices-step-2` | editions-prices.md | no-spec (needs real screenshot or an original diagram) | — | needs-screenshot | step screenshot, PS5: PlayStation Store GTA VI page showing Standard and Ultimate |
| `editions-prices-step-3` | editions-prices.md | rendered | sidecar | needs-screenshot | 47 KB |
| `gta-6-online-step-1` | gta-6-online.md | rendered | sidecar | step-card | 32 KB |
| `gta-6-online-step-2` | gta-6-online.md | rendered | sidecar | step-card | 35 KB |
| `gta-6-online-step-3` | gta-6-online.md | rendered | sidecar | step-card | 41 KB |
| `jason-lucia-step-1` | jason-lucia.md | no-spec (needs real screenshot or an original diagram) | — | needs-screenshot | menu screen, only after launch: the character switch prompt; before launch use Designer's own art of two silhouettes |
| `jason-lucia-step-2` | jason-lucia.md | rendered | sidecar | step-card | 37 KB |
| `jason-lucia-step-3` | jason-lucia.md | rendered | sidecar | step-card | 42 KB |
| `launch-night-checklist-step-1` | launch-night-checklist.md | rendered | sidecar | needs-screenshot | 49 KB |
| `launch-night-checklist-step-2` | launch-night-checklist.md | rendered | sidecar | needs-screenshot | 53 KB |
| `launch-night-checklist-step-3` | launch-night-checklist.md | rendered | sidecar | needs-screenshot | 58 KB |
| `launch-night-checklist-step-4` | launch-night-checklist.md | rendered | sidecar | step-card | 40 KB |
| `leonida-step-1` | leonida.md | rendered | sidecar | step-card | 46 KB |
| `leonida-step-2` | leonida.md | rendered | sidecar | map-annotate | 47 KB |
| `leonida-step-3` | leonida.md | rendered | sidecar | step-card | 45 KB |
| `map-step-1` | map.md | no-spec (needs real screenshot or an original diagram) | — | needs-screenshot | step screenshot (own screenshot, credit Rockstar |
| `map-step-2` | map.md | rendered | sidecar | step-card | 45 KB |
| `map-step-3` | map.md | rendered | sidecar | map-annotate | 39 KB |
| `platforms-step-1` | platforms.md | rendered | sidecar | step-card | 50 KB |
| `platforms-step-2` | platforms.md | no-spec (needs real screenshot or an original diagram) | — | needs-screenshot | menu screen, Xbox: GTA VI in My games & apps with the cloud-play option |
| `platforms-step-3` | platforms.md | rendered | sidecar | step-card | 53 KB |
| `preload-size-step-1` | preload-size.md | rendered | sidecar | needs-screenshot | 40 KB |
| `preload-size-step-2` | preload-size.md | rendered | sidecar | needs-screenshot | 47 KB |
| `preload-size-step-3` | preload-size.md | no-spec (needs real screenshot or an original diagram) | — | needs-screenshot | step screenshot, PS5: GTA VI page with the Download button highlighted |
| `preload-size-step-4` | preload-size.md | rendered | sidecar | needs-screenshot | 59 KB |
| `ps5-settings-step-1` | ps5-settings.md | rendered | sidecar | step-card | 42 KB |
| `ps5-settings-step-2` | ps5-settings.md | rendered | sidecar | needs-screenshot | 34 KB |
| `ps5-settings-step-3` | ps5-settings.md | rendered | sidecar | step-card | 44 KB |
| `radio-stations-step-1` | radio-stations.md | rendered | sidecar | step-card | 53 KB |
| `radio-stations-step-2` | radio-stations.md | rendered | sidecar | step-card | 38 KB |
| `radio-stations-step-3` | radio-stations.md | rendered | sidecar | step-card | 31 KB |
| `release-time-step-1` | release-time.md | rendered | sidecar | map-annotate | 73 KB |
| `release-time-step-2` | release-time.md | no-spec (needs real screenshot or an original diagram) | — | needs-screenshot | menu screen, PS5: Game Library with the GTA VI tile selected and the locked/countdown text visible |
| `release-time-step-3` | release-time.md | no-spec (needs real screenshot or an original diagram) | — | needs-screenshot | menu screen, Xbox: My games & apps > Full library with GTA VI selected |
| `release-time-step-4` | release-time.md | rendered | sidecar | step-card | 53 KB |
| `vintage-vice-city-pack-step-1` | vintage-vice-city-pack.md | rendered | sidecar | step-card | 47 KB |
| `vintage-vice-city-pack-step-2` | vintage-vice-city-pack.md | no-spec (needs real screenshot or an original diagram) | — | needs-screenshot | step screenshot, PS5: GTA VI page "Editions" listing with Vintage Vice City Pack |
| `vintage-vice-city-pack-step-3` | vintage-vice-city-pack.md | rendered | sidecar | needs-screenshot | 45 KB |

## To fix the "no spec" slots
Create `content/images/<slot>.json` (or an `images:` map in the guide's front matter). Skeletons:

```json
{
 "step-card": {
  "type": "step-card",
  "alt": "",
  "data": {
   "step": 1,
   "of": 3,
   "category": "money",
   "title": "Short step title",
   "body": "One or two sentences. Max ~5 lines.",
   "keys": [],
   "tip": ""
  }
 },
 "compare-table": {
  "type": "compare-table",
  "alt": "",
  "data": {
   "category": "money",
   "title": "Table title",
   "columns": [
    "Option",
    "Col A",
    "Col B"
   ],
   "rows": [
    [
     "Row 1",
     "yes",
     "no"
    ],
    [
     "Row 2",
     "partial",
     "yes"
    ]
   ],
   "highlightColumn": 0,
   "note": ""
  }
 },
 "map-annotate": {
  "type": "map-annotate",
  "alt": "",
  "data": {
   "category": "collectibles",
   "title": "Map title",
   "pins": [
    {
     "x": 30,
     "y": 40,
     "kind": "collect",
     "label": "Label"
    }
   ],
   "route": [],
   "credit": ""
  }
 },
 "og-thumb": {
  "type": "og-thumb",
  "alt": "",
  "data": {
   "title": "Guide title",
   "category": "money"
  }
 }
}
```

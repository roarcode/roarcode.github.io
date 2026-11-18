#!/usr/bin/env bash
# Regenerate everything. Needs: venv (fonttools cairosvg pillow brotli) + node with @resvg/resvg-js, playwright-core, google-chrome.
set -e; cd "$(dirname "$0")/.."; PY=${PY:-python3}
$PY src/build_images.py; $PY src/build_assets.py; node src/render_og.mjs
$PY src/build_article_assets.py; node src/render_article_png.mjs; $PY src/optimise_png.py
$PY src/build_pages.py; node src/shoot.mjs; node src/shoot_sheet.mjs

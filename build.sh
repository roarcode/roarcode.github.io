#!/usr/bin/env bash
# One-shot build wrapper: installs deps if missing, then clean build + Pagefind index.
#   SITE_URL=https://example.com ./build.sh
set -euo pipefail
cd "$(dirname "$0")"
[ -d node_modules ] || npm ci --no-audit --no-fund || npm install --no-audit --no-fund
npm run build --silent
echo "Built -> $(pwd)/_site  (SITE_URL=${SITE_URL:-<unset: placeholder + noindex>})"

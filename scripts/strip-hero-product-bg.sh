#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
if [[ -x .venv-rembg/bin/python ]]; then
  exec .venv-rembg/bin/python scripts/strip-hero-product-bg.py
fi
exec python3 scripts/strip-hero-product-bg.py

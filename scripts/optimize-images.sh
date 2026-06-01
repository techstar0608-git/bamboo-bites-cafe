#!/usr/bin/env bash
#
# Convert all raster assets under src/assets/Bambu to responsive WebP.
# For each PNG/JPG/JPEG it emits <name>-768w.webp, -1280w.webp, -2560w.webp
# (skipping any width larger than the source — never upscales) plus a
# full-size <name>.webp capped at 2560px wide.
#
# Requires: cwebp (brew install webp). Run from anywhere:
#   bash scripts/optimize-images.sh
#
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SRC_DIR="$ROOT/src/assets/Bambu"
WIDTHS=(768 1280 2560)
QUALITY=80

command -v cwebp >/dev/null || { echo "❌ cwebp not found. Run: brew install webp"; exit 1; }
command -v sips  >/dev/null || { echo "❌ sips not found (macOS only)."; exit 1; }

shopt -s nullglob nocaseglob

count=0; saved_before=0; saved_after=0

while IFS= read -r -d '' img; do
  dir="$(dirname "$img")"
  base="$(basename "$img")"
  name="${base%.*}"

  # Source width (px)
  srcw="$(sips -g pixelWidth "$img" 2>/dev/null | awk '/pixelWidth/{print $2}')"
  [ -z "${srcw:-}" ] && { echo "⚠️  skip (no width): $img"; continue; }

  before="$(wc -c < "$img")"
  saved_before=$((saved_before + before))

  for w in "${WIDTHS[@]}"; do
    [ "$w" -gt "$srcw" ] && continue          # never upscale
    out="$dir/$name-${w}w.webp"
    cwebp -quiet -q "$QUALITY" -resize "$w" 0 "$img" -o "$out"
    saved_after=$((saved_after + $(wc -c < "$out")))
  done

  # Full-size copy, capped at 2560px wide
  cap=$srcw; [ "$cap" -gt 2560 ] && cap=2560
  full="$dir/$name.webp"
  cwebp -quiet -q "$QUALITY" -resize "$cap" 0 "$img" -o "$full"
  saved_after=$((saved_after + $(wc -c < "$full")))

  count=$((count + 1))
  printf '✓ %-55s %sw → webp\n' "$name" "$srcw"
done < <(find "$SRC_DIR" -type f \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.jpeg' \) -print0)

echo "──────────────────────────────────────────────"
echo "Processed $count images"
awk -v b="$saved_before" -v a="$saved_after" 'BEGIN{
  printf "Originals: %.1f MB → WebP (all sizes): %.1f MB\n", b/1048576, a/1048576
}'

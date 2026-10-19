#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."

# Maintenance only: CI serves the checked-in WebP files without ImageMagick.
# Keep source PNGs, dimensions and atlas quadrants intact.
for image in public/images/products/*.png; do
  magick "$image" -strip -quality 84 -define webp:method=6 "${image%.png}.webp"
done

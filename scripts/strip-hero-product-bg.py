#!/usr/bin/env python3
"""Re-run background removal on hero product PNGs + site logo (transparent alpha).

Requires: `.venv-rembg` with rembg installed, or equivalent `python3` + rembg."""
from pathlib import Path

from rembg import remove

ROOT = Path(__file__).resolve().parent.parent


def main() -> None:
    assets: tuple[Path, ...] = tuple(
        ROOT / "src" / "assets" / f"hero-slide-product-{name}.png"
        for name in ("welcome", "coffee", "food", "che")
    ) + (ROOT / "src" / "assets" / "logo-bambu.png",)

    for p in assets:
        if not p.is_file():
            raise SystemExit(f"Missing asset: {p}")
        print(f"Stripping background: {p.name} …", flush=True)
        p.write_bytes(remove(p.read_bytes()))
        print("done.", flush=True)


if __name__ == "__main__":
    main()

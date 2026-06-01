#!/usr/bin/env python3
"""Uber Menu → src/data/uber-menu.generated.ts

Source of truth: `uber-menu-prod.xlsx` in repo root.
- Sheet `uber-menu-prod` (consolidated) holds every category in a `section` column.
- Canley foods live in their own sheet `13.CANLEY FOODS` (different layout).

Commands:
  python3 scripts/export_uber_menu.py
      Reads uber-menu-prod.xlsx → writes TS. (No-op if the workbook is missing.)

  python3 scripts/export_uber_menu.py --init-prod-xlsx
      Rebuilds a flat workbook from the current generated TS (migration helper).

Install: pip install openpyxl
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

try:
    import openpyxl
    from openpyxl.styles import Font
except ImportError:
    print("Install openpyxl: pip install openpyxl", file=sys.stderr)
    sys.exit(1)

ROOT = Path(__file__).resolve().parents[1]
XLSX_FLAT = ROOT / "uber-menu-prod.xlsx"
OUT = ROOT / "src" / "data" / "uber-menu.generated.ts"

CONSOLIDATED_SHEET = "uber-menu-prod"
CANLEY_SHEET = "13.CANLEY FOODS"

FLAT_HEADERS = [
    "section",
    "stt",
    "productID",
    "nameVi",
    "nameEn",
    "nameUber",
    "size",
    "pricePickup",
    "priceUber",
    "description",
    "photoStt",
    "notes",
    "priceLine",
]

# Each menu category → the TS const it is emitted as.
# `raw` matches the workbook `section` column (compared case-insensitively,
# whitespace-collapsed). Order here is the order consts appear in the TS file.
SECTION_SPECS = [
    {"raw": "1.Sweet Dessert", "const": "SWEET_DESSERT"},
    {"raw": "9.Fruit Bowls & Dessert", "const": "FRUIT_BOWLS_DESSERT"},
    {"raw": "2.Fruit Drinks - Tea", "const": "FRUIT_DRINKS_TEA"},
    {"raw": "3.Fresh Juice", "const": "FRESH_JUICE"},
    {"raw": "4.Smoothies", "const": "SMOOTHIES"},
    {"raw": "5.Pennywort Drinks", "const": "PENNYWORT"},
    {"raw": "6.Iced Coffee", "const": "ICED_COFFEE"},
    {"raw": "7.Espresso (Hot)", "const": "ESPRESSO_HOT"},
    {"raw": "8.Ice Blended", "const": "ICE_BLENDED"},
    {"raw": "10.Matcha Drinks", "const": "MATCHA"},
    {"raw": "11.New drink", "const": "NEW_DRINK"},
    {"raw": "12.CABRA FOODS", "const": "FOOD_CABRAMATTA"},
    {"raw": "13.CANLEY FOODS", "const": "FOOD_CANLEY_HEIGHTS"},
]

ALL_CONSTS = [s["const"] for s in SECTION_SPECS]


def _norm_key(s) -> str:
    return re.sub(r"\s+", " ", str(s).strip()).lower()


RAW_TO_CONST = {_norm_key(s["raw"]): s["const"] for s in SECTION_SPECS}


def ts_str(s: str | None) -> str:
    if s is None:
        return "null"
    s = str(s).replace("\\", "\\\\").replace("'", "\\'")
    s = s.replace("\r\n", " ").replace("\n", " ").replace("\r", " ")
    s = re.sub(r"[\x00-\x08\x0b\x0c\x0e-\x1f]", "", s)
    return "'" + s + "'"


def ts_num(n: float | int | None) -> str:
    if n is None:
        return "null"
    if isinstance(n, float) and n == int(n):
        return str(int(n))
    return str(round(n, 2))


def apply_photo_hyperlink(rec: dict, ws, *, excel_row: int, photo_col_0based: int) -> None:
    if not rec:
        return
    c = ws.cell(row=excel_row, column=photo_col_0based + 1)
    hyp = getattr(c, "hyperlink", None)
    if hyp is None:
        return
    target = getattr(hyp, "target", None)
    if not target:
        return
    t = str(target).strip()
    if t.lower().startswith(("http://", "https://")):
        rec["photoStt"] = t


def cell_str(v) -> str | None:
    if v is None:
        return None
    if isinstance(v, float) and v == int(v):
        v = int(v)
    s = str(v).strip()
    return s if s else None


def cell_float(v) -> float | None:
    if v is None:
        return None
    if isinstance(v, (int, float)):
        return float(v)
    try:
        return float(str(v).strip().replace(",", ""))
    except (TypeError, ValueError):
        return None


def cell_stt(v) -> int | None:
    if v is None:
        return None
    if isinstance(v, (int, float)):
        try:
            return int(v) if v == int(v) else int(float(v))
        except (TypeError, ValueError):
            return None
    s = str(v).strip()
    if not s:
        return None
    try:
        return int(float(s))
    except (TypeError, ValueError):
        return None


def cell_photo(v) -> int | str | None:
    if v is None:
        return None
    if isinstance(v, (int, float)):
        return int(v) if v == int(v) else v
    s = str(v).strip()
    return s if s else None


def header_map(ws) -> dict[str, int]:
    row = next(ws.iter_rows(min_row=1, max_row=1, values_only=True))
    m: dict[str, int] = {}
    for i, h in enumerate(row):
        if h is None:
            continue
        m[str(h).strip().lower()] = i
    return m


def find_stt_header_row(ws) -> int | None:
    for i, row in enumerate(ws.iter_rows(values_only=True)):
        if row and len(row) > 2 and row[1] == "STT":
            return i
    return None


def parse_canley_sheet(ws) -> list[dict]:
    """Canley foods sheet: stt in col1, names col2/3, uber col4, size col5,
    pickup col6, uber col7, photo col8, desc col9."""
    hr = find_stt_header_row(ws)
    start = hr + 1 if hr is not None else 0
    recs: list[dict] = []
    for i, row in enumerate(ws.iter_rows(values_only=True)):
        if i < start or not row or len(row) < 8:
            continue
        stt = cell_stt(row[1])
        if stt is None:
            continue
        vi, en = row[2], row[3]
        if vi is None and en is None:
            continue
        name_vi = cell_str(vi) or ""
        name_en = cell_str(en) or ""
        if not name_vi and not name_en:
            continue
        rec = {
            "stt": stt,
            "nameVi": name_vi,
            "nameEn": name_en,
            "nameUber": cell_str(row[4]) if len(row) > 4 else None,
            "size": cell_str(row[5]) if len(row) > 5 else None,
            "pricePickup": cell_float(row[6]) if len(row) > 6 else None,
            "priceUber": cell_float(row[7]) if len(row) > 7 else None,
            "description": cell_str(row[9]) if len(row) > 9 else None,
            "photoStt": cell_photo(row[8]) if len(row) > 8 else None,
            "notes": None,
        }
        apply_photo_hyperlink(rec, ws, excel_row=i + 1, photo_col_0based=8)
        recs.append(rec)
    return recs


def parse_consolidated(ws) -> dict[str, list[dict]]:
    col = header_map(ws)
    expected = {h.lower() for h in FLAT_HEADERS}
    missing = sorted(expected - set(col.keys()))
    if missing:
        raise SystemExit(f"{XLSX_FLAT}: missing columns {missing}. Expected: {FLAT_HEADERS}")

    buckets: dict[str, list[dict]] = {c: [] for c in ALL_CONSTS}

    def get(cells, key):
        idx = col.get(key)
        return cells[idx] if idx is not None and idx < len(cells) else None

    for r_i, row in enumerate(ws.iter_rows(min_row=2, values_only=True), start=2):
        cells = list(row)
        raw = get(cells, "section")
        if raw is None or not str(raw).strip():
            continue
        const = RAW_TO_CONST.get(_norm_key(raw))
        if const is None:
            print(f"Warning: row {r_i} unknown section {raw!r}, skipped", file=sys.stderr)
            continue
        rec = {
            "stt": cell_stt(get(cells, "stt")),
            "nameVi": cell_str(get(cells, "namevi")) or "",
            "nameEn": cell_str(get(cells, "nameen")) or "",
            "nameUber": cell_str(get(cells, "nameuber")),
            "size": cell_str(get(cells, "size")),
            "pricePickup": cell_float(get(cells, "pricepickup")),
            "priceUber": cell_float(get(cells, "priceuber")),
            "description": cell_str(get(cells, "description")),
            "photoStt": cell_photo(get(cells, "photostt")),
            "notes": cell_str(get(cells, "notes")),
        }
        if not rec["nameVi"] and not rec["nameEn"]:
            continue
        apply_photo_hyperlink(rec, ws, excel_row=r_i, photo_col_0based=col["photostt"])
        buckets[const].append(rec)

    return buckets


def parse_flat_workbook(path: Path) -> dict[str, list[dict]]:
    wb = openpyxl.load_workbook(path, read_only=False, data_only=True)
    try:
        sheet = CONSOLIDATED_SHEET if CONSOLIDATED_SHEET in wb.sheetnames else wb.sheetnames[0]
        buckets = parse_consolidated(wb[sheet])
        # Canley foods come from their own sheet when absent from the consolidated one.
        if not buckets.get("FOOD_CANLEY_HEIGHTS") and CANLEY_SHEET in wb.sheetnames:
            buckets["FOOD_CANLEY_HEIGHTS"] = parse_canley_sheet(wb[CANLEY_SHEET])
    finally:
        wb.close()
    return buckets


def emit_ts(buckets: dict[str, list[dict]], *, source_note: str) -> str:
    def emit_list(name: str, rows: list[dict]) -> str:
        lines = [f"export const {name}: UberMenuRow[] = ["]
        for r in rows:
            photo = r.get("photoStt")
            if isinstance(photo, str):
                photo_ts = ts_str(photo)
            elif photo is None:
                photo_ts = "null"
            else:
                photo_ts = ts_num(photo)
            lines.append(
                "  {"
                + f"stt: {ts_num(r.get('stt'))}, "
                + f"nameVi: {ts_str(r.get('nameVi'))}, "
                + f"nameEn: {ts_str(r.get('nameEn'))}, "
                + f"nameUber: {ts_str(r.get('nameUber')) if r.get('nameUber') else 'null'}, "
                + f"size: {ts_str(r.get('size')) if r.get('size') else 'null'}, "
                + f"pricePickup: {ts_num(r.get('pricePickup'))}, "
                + f"priceUber: {ts_num(r.get('priceUber'))}, "
                + f"description: {ts_str(r.get('description')) if r.get('description') else 'null'}, "
                + f"photoStt: {photo_ts}, "
                + f"notes: {ts_str(r.get('notes')) if r.get('notes') else 'null'}, "
                + "},"
            )
        lines.append("];")
        return "\n".join(lines)

    header = f"""/**
 * AUTO-GENERATED from `{source_note}`
 * Do not edit by hand — run: `bun run export-menu` (or `python3 scripts/export_uber_menu.py`)
 */

export type UberMenuRow = {{
  stt: number | null;
  nameVi: string;
  nameEn: string;
  nameUber: string | null;
  size: string | null;
  pricePickup: number | null;
  priceUber: number | null;
  description: string | null;
  photoStt: number | string | null;
  notes: string | null;
}};

export type IcedCoffeeExtra = {{
  nameVi: string;
  nameEn: string;
  priceLine: string;
}};

"""

    parts = [header]
    for const in ALL_CONSTS:
        parts.append(emit_list(const, buckets.get(const, [])))
        parts.append("\n")
    # Kept for backward compatibility with any importers of the extras list.
    parts.append("export const ICED_COFFEE_EXTRAS: IcedCoffeeExtra[] = [];")
    parts.append("\n")
    return "\n".join(parts)


# ── migration helper: generated TS → flat workbook ──────────────────────────


def write_flat_workbook(path: Path, buckets: dict[str, list[dict]]) -> None:
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = CONSOLIDATED_SHEET
    ws.append(FLAT_HEADERS)
    for c in ws[1]:
        c.font = Font(bold=True)
    ws.freeze_panes = "A2"
    const_to_raw = {s["const"]: s["raw"] for s in SECTION_SPECS}
    for const in ALL_CONSTS:
        for r in buckets.get(const, []):
            ws.append([
                const_to_raw[const],
                r.get("stt"),
                None,  # productID
                r.get("nameVi") or "",
                r.get("nameEn") or "",
                r.get("nameUber"),
                r.get("size"),
                r.get("pricePickup"),
                r.get("priceUber"),
                r.get("description"),
                r.get("photoStt"),
                r.get("notes"),
                None,  # priceLine
            ])
    path.parent.mkdir(parents=True, exist_ok=True)
    wb.save(path)
    wb.close()


def unquote_ts_str(raw: str) -> str:
    return raw.replace("\\'", "'").replace("\\\\", "\\")


def parse_generated_ts(path: Path) -> dict[str, list[dict]]:
    text = path.read_text(encoding="utf-8")

    def extract_block(name: str) -> str:
        needle = f"export const {name}: UberMenuRow[] = ["
        i = text.find(needle)
        if i < 0:
            return ""
        j = i + len(needle)
        depth = 1
        k = j
        while k < len(text) and depth:
            if text[k] == "[":
                depth += 1
            elif text[k] == "]":
                depth -= 1
            k += 1
        return text[j : k - 1]

    def split_objects(block: str) -> list[str]:
        objs, depth, start = [], 0, 0
        for i, c in enumerate(block):
            if c == "{":
                if depth == 0:
                    start = i
                depth += 1
            elif c == "}":
                depth -= 1
                if depth == 0:
                    objs.append(block[start : i + 1])
        return objs

    def sfield(line, field):
        m = re.search(rf"{field}:\s*'((?:\\.|[^'\\])*)'", line)
        if m:
            return unquote_ts_str(m.group(1))
        return None

    def nfield(line, field):
        if re.search(rf"{field}:\s*null\b", line):
            return None
        m = re.search(rf"{field}:\s*([-+]?\d+(?:\.\d+)?)", line)
        return float(m.group(1)) if m else None

    def pfield(line):
        if re.search(r"photoStt:\s*null\b", line):
            return None
        m = re.search(r"photoStt:\s*'((?:\\.|[^'\\])*)'", line)
        if m:
            return unquote_ts_str(m.group(1))
        m = re.search(r"photoStt:\s*([-+]?\d+(?:\.\d+)?)\b", line)
        return float(m.group(1)) if m else None

    buckets: dict[str, list[dict]] = {}
    for const in ALL_CONSTS:
        rows = []
        for obj in split_objects(extract_block(const)):
            line = obj.replace("\n", " ")
            rows.append({
                "stt": nfield(line, "stt"),
                "nameVi": sfield(line, "nameVi") or "",
                "nameEn": sfield(line, "nameEn") or "",
                "nameUber": sfield(line, "nameUber"),
                "size": sfield(line, "size"),
                "pricePickup": nfield(line, "pricePickup"),
                "priceUber": nfield(line, "priceUber"),
                "description": sfield(line, "description"),
                "photoStt": pfield(line),
                "notes": sfield(line, "notes"),
            })
        buckets[const] = rows
    return buckets


def main() -> None:
    args = [a for a in sys.argv[1:] if a]
    if "--init-prod-xlsx" in args:
        if not OUT.exists():
            print(f"Missing {OUT}", file=sys.stderr)
            sys.exit(1)
        write_flat_workbook(XLSX_FLAT, parse_generated_ts(OUT))
        print(f"Wrote {XLSX_FLAT} (from {OUT.name})")
        return

    if XLSX_FLAT.exists():
        buckets = parse_flat_workbook(XLSX_FLAT)
        OUT.parent.mkdir(parents=True, exist_ok=True)
        OUT.write_text(emit_ts(buckets, source_note=XLSX_FLAT.name), encoding="utf-8")
        counts = ", ".join(f"{len(buckets.get(c, []))} {c}" for c in ALL_CONSTS)
        print(f"Wrote {OUT} from {XLSX_FLAT.name}\n  {counts}")
        return

    print(f"No {XLSX_FLAT.name} — skipped export (keeping {OUT.name}).")


if __name__ == "__main__":
    main()

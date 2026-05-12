#!/usr/bin/env python3
"""Uber Menu → src/data/uber-menu.generated.ts

Source of truth (recommended): single-sheet `uber-menu-prod.xlsx` in repo root.
Edit one worksheet, add/remove rows, then run export (or `bun run build`).

Commands:
  python3 scripts/export_uber_menu.py
      If uber-menu-prod.xlsx exists → writes TS. Else keeps existing TS (no-op).

  python3 scripts/export_uber_menu.py --init-prod-xlsx
      Builds uber-menu-prod.xlsx from the current uber-menu.generated.ts (migration).

  python3 scripts/export_uber_menu.py --legacy
      Old multi-sheet workbook → TS (needs `Bambu _ Uber Menu 19.04.2026.xlsx`).

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
LEGACY_XLSX = ROOT / "Bambu _ Uber Menu 19.04.2026.xlsx"
OUT = ROOT / "src" / "data" / "uber-menu.generated.ts"

FLAT_HEADERS = [
    "section",
    "stt",
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

SECTIONS_ORDER = [
    "SWEET_DESSERT",
    "FRUIT_BOWLS_DESSERT",
    "ICED_COFFEE",
    "ICED_COFFEE_EXTRA",
    "FOOD_CABRAMATTA",
    "FOOD_CANLEY_HEIGHTS",
]


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


def find_stt_header_row(ws) -> int | None:
    for i, row in enumerate(ws.iter_rows(values_only=True)):
        if row and len(row) > 2 and row[1] == "STT":
            return i
    return None


def row_to_record(
    row: tuple,
    *,
    has_type_col: bool = False,
    photo_col: int = 9,
    desc_col: int = 8,
    notes_col: int | None = None,
) -> dict | None:
    if not row or len(row) < 8:
        return None
    stt = row[1]
    if stt is None:
        return None
    if isinstance(stt, str) and stt.strip().upper() in ("STT", "GHI CHÚ", "ADD", "EXTRA", "BINGSU"):
        return None
    vi, en = row[2], row[3]
    if vi is None and en is None:
        return None
    name_vi = str(vi).strip() if vi else ""
    name_en = str(en).strip() if en else ""
    if not name_vi and not name_en:
        return None
    if str(name_vi).upper().startswith("GHI CHÚ") or str(name_en).upper().startswith("SẢN PHẨM"):
        return None

    uber = row[4] if len(row) > 4 else None
    idx = 5
    type_or_size = None
    if has_type_col:
        type_or_size = row[idx]
        idx += 1
    size = row[idx] if not has_type_col else type_or_size
    pickup = row[idx + 1] if len(row) > idx + 1 else None
    uber_price = row[idx + 2] if len(row) > idx + 2 else None

    desc = row[desc_col] if len(row) > desc_col else None
    photo = row[photo_col] if len(row) > photo_col else None
    nc = notes_col if notes_col is not None else photo_col + 1
    notes = row[nc] if len(row) > nc else None

    stt_out: int | None
    try:
        stt_out = int(float(stt)) if stt is not None else None
    except (TypeError, ValueError):
        stt_out = None

    def nnum(x):
        if x is None:
            return None
        if isinstance(x, (int, float)):
            return float(x)
        try:
            return float(x)
        except (TypeError, ValueError):
            return None

    photo_out = None
    if photo is not None:
        if isinstance(photo, (int, float)):
            photo_out = int(photo) if photo == int(photo) else photo
        else:
            ps = str(photo).strip()
            photo_out = ps if ps else None

    return {
        "stt": stt_out,
        "nameVi": name_vi or "",
        "nameEn": name_en or "",
        "nameUber": str(uber).strip() if uber else None,
        "size": str(size).strip() if size else None,
        "pricePickup": nnum(pickup),
        "priceUber": nnum(uber_price),
        "description": str(desc).strip() if desc else None,
        "photoStt": photo_out,
        "notes": str(notes).strip() if notes else None,
    }


def parse_foods_sheet(ws) -> list[dict]:
    hr = find_stt_header_row(ws)

    def food_row(r: tuple) -> dict | None:
        if not r or len(r) < 8:
            return None
        stt_raw = r[1]
        if stt_raw is None:
            return None
        try:
            stt = int(float(stt_raw))
        except (TypeError, ValueError):
            return None
        vi, en = r[2], r[3]
        if vi is None and en is None:
            return None
        uber = r[4] if len(r) > 4 else None
        portion = r[5] if len(r) > 5 else None
        pickup = r[6] if len(r) > 6 else None
        uber_p = r[7] if len(r) > 7 else None
        photo = r[8] if len(r) > 8 else None
        desc = r[9] if len(r) > 9 else None

        def nnum(x):
            if x is None:
                return None
            if isinstance(x, (int, float)):
                return float(x)
            try:
                return float(x)
            except (TypeError, ValueError):
                return None

        photo_out = None
        if photo is not None:
            if isinstance(photo, (int, float)):
                photo_out = int(photo) if photo == int(photo) else photo
            else:
                ps = str(photo).strip()
                photo_out = ps if ps else None

        return {
            "stt": stt,
            "nameVi": str(vi).strip() if vi else "",
            "nameEn": str(en).strip() if en else "",
            "nameUber": str(uber).strip() if uber else None,
            "size": str(portion).strip() if portion else None,
            "pricePickup": nnum(pickup),
            "priceUber": nnum(uber_p),
            "description": str(desc).strip() if desc else None,
            "photoStt": photo_out,
            "notes": None,
        }

    recs: list[dict] = []
    start = hr + 1 if hr is not None else 0
    for i, row in enumerate(ws.iter_rows(values_only=True)):
        if i < start:
            continue
        rec = food_row(row)
        if rec:
            apply_photo_hyperlink(rec, ws, excel_row=i + 1, photo_col_0based=8)
            recs.append(rec)
    return recs


def parse_standard_menu_sheet(ws, *, has_type: bool, iced_coffee_photo: bool = False, desc_photo_swap: bool = False) -> list[dict]:
    hr = find_stt_header_row(ws)
    if hr is None:
        return []
    recs: list[dict] = []
    for i, row in enumerate(ws.iter_rows(values_only=True)):
        if i <= hr:
            continue
        if desc_photo_swap:
            desc_col, photo_col = 9, 8
        elif iced_coffee_photo:
            desc_col, photo_col = 8, 9
        else:
            desc_col, photo_col = 8, 9
        rec = row_to_record(
            row,
            has_type_col=has_type,
            photo_col=photo_col,
            desc_col=desc_col,
            notes_col=10,
        )
        if rec:
            apply_photo_hyperlink(rec, ws, excel_row=i + 1, photo_col_0based=photo_col)
            recs.append(rec)
    return recs


def parse_iced_extras(ws) -> list[dict]:
    extras: list[dict] = []
    in_extra = False
    for row in ws.iter_rows(values_only=True):
        if not row:
            continue
        if row[1] == "Extra" or (row[1] and str(row[1]).strip() == "Extra"):
            in_extra = True
            continue
        if in_extra:
            if row[1] == "GHI CHÚ" or (row[1] and str(row[1]).strip() == "GHI CHÚ"):
                break
            vi, en = row[2], row[3]
            if vi is None and en is None:
                continue
            name_vi = str(vi).strip() if vi else ""
            name_en = str(en).strip() if en else ""
            if "Sản phẩm" in name_vi or "size:" in name_vi.lower():
                continue
            p6 = row[6] if len(row) > 6 else None
            p7 = row[7] if len(row) > 7 else None
            p8 = row[8] if len(row) > 8 else None
            prices = []
            for p in (p6, p7, p8):
                if p is not None and isinstance(p, (int, float)):
                    prices.append(f"${p}")
            extras.append(
                {
                    "nameVi": str(vi).strip() if vi else "",
                    "nameEn": str(en).strip() if en else "",
                    "priceLine": " / ".join(prices) if prices else "",
                }
            )
    return extras


def norm_section(val) -> str | None:
    if val is None or (isinstance(val, str) and not str(val).strip()):
        return None
    s = str(val).strip().upper().replace(" ", "_").replace("-", "_")
    aliases = {
        "FRUIT_BOWLS": "FRUIT_BOWLS_DESSERT",
        "FRUIT_BOWLS_DESSERT": "FRUIT_BOWLS_DESSERT",
        "CANLEY": "FOOD_CANLEY_HEIGHTS",
        "FOOD_CANLEY": "FOOD_CANLEY_HEIGHTS",
        "CABRA": "FOOD_CABRAMATTA",
        "CABRAMATTA": "FOOD_CABRAMATTA",
        "ICED_EXTRA": "ICED_COFFEE_EXTRA",
        "EXTRAS": "ICED_COFFEE_EXTRA",
    }
    return aliases.get(s, s)


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
        key = str(h).strip().lower()
        m[key] = i
    return m


def parse_flat_workbook(path: Path) -> tuple[list, list, list, list, list, list]:
    wb = openpyxl.load_workbook(path, read_only=False, data_only=True)
    try:
        ws = wb["Menu"] if "Menu" in wb.sheetnames else wb[wb.sheetnames[0]]
        col = header_map(ws)
        expected_lower = {str(h).strip().lower() for h in FLAT_HEADERS}
        missing_lower = sorted(expected_lower - set(col.keys()))
        if missing_lower:
            raise SystemExit(f"{path}: missing columns: {missing_lower}. Expected headers: {FLAT_HEADERS}")

        sweet: list[dict] = []
        fruit: list[dict] = []
        iced: list[dict] = []
        iced_extras: list[dict] = []
        cabra: list[dict] = []
        canley: list[dict] = []

        for r_i, row in enumerate(ws.iter_rows(min_row=2, values_only=True), start=2):
            cells = list(row)
            sec = norm_section(cells[col["section"]] if col["section"] < len(cells) else None)
            if sec is None:
                continue
            if sec not in SECTIONS_ORDER:
                print(f"Warning: row {r_i} unknown section {cells[col['section']]!r}, skipped", file=sys.stderr)
                continue

            if sec == "ICED_COFFEE_EXTRA":
                name_vi = cell_str(cells[col["namevi"]]) if col["namevi"] < len(cells) else None
                name_en = cell_str(cells[col["nameen"]]) if col["nameen"] < len(cells) else None
                pl = cell_str(cells[col["priceline"]]) if col["priceline"] < len(cells) else None
                if not name_vi and not name_en:
                    continue
                iced_extras.append({"nameVi": name_vi or "", "nameEn": name_en or "", "priceLine": pl or ""})
                continue

            rec = {
                "stt": cell_stt(cells[col["stt"]] if col["stt"] < len(cells) else None),
                "nameVi": cell_str(cells[col["namevi"]] if col["namevi"] < len(cells) else None) or "",
                "nameEn": cell_str(cells[col["nameen"]] if col["nameen"] < len(cells) else None) or "",
                "nameUber": cell_str(cells[col["nameuber"]] if col["nameuber"] < len(cells) else None),
                "size": cell_str(cells[col["size"]] if col["size"] < len(cells) else None),
                "pricePickup": cell_float(cells[col["pricepickup"]] if col["pricepickup"] < len(cells) else None),
                "priceUber": cell_float(cells[col["priceuber"]] if col["priceuber"] < len(cells) else None),
                "description": cell_str(cells[col["description"]] if col["description"] < len(cells) else None),
                "photoStt": cell_photo(cells[col["photostt"]] if col["photostt"] < len(cells) else None),
                "notes": cell_str(cells[col["notes"]] if col["notes"] < len(cells) else None),
            }
            if not rec["nameVi"] and not rec["nameEn"]:
                continue
            apply_photo_hyperlink(rec, ws, excel_row=r_i, photo_col_0based=col["photostt"])

            if sec == "SWEET_DESSERT":
                sweet.append(rec)
            elif sec == "FRUIT_BOWLS_DESSERT":
                fruit.append(rec)
            elif sec == "ICED_COFFEE":
                iced.append(rec)
            elif sec == "FOOD_CABRAMATTA":
                cabra.append(rec)
            elif sec == "FOOD_CANLEY_HEIGHTS":
                canley.append(rec)
    finally:
        wb.close()

    return sweet, fruit, iced, iced_extras, cabra, canley


def write_flat_workbook(
    path: Path,
    sweet: list,
    fruit: list,
    iced: list,
    iced_extras: list,
    cabra: list,
    canley: list,
) -> None:
    wb = openpyxl.Workbook()
    ws = wb.active
    ws.title = "Menu"
    ws.append(FLAT_HEADERS)
    for c in ws[1]:
        c.font = Font(bold=True)
    ws.freeze_panes = "A2"

    def append_rows(section: str, rows: list[dict]) -> None:
        for r in rows:
            ws.append(
                [
                    section,
                    r.get("stt"),
                    r.get("nameVi") or "",
                    r.get("nameEn") or "",
                    r.get("nameUber"),
                    r.get("size"),
                    r.get("pricePickup"),
                    r.get("priceUber"),
                    r.get("description"),
                    r.get("photoStt"),
                    r.get("notes"),
                    None,
                ]
            )

    append_rows("SWEET_DESSERT", sweet)
    append_rows("FRUIT_BOWLS_DESSERT", fruit)
    append_rows("ICED_COFFEE", iced)
    for e in iced_extras:
        ws.append(
            [
                "ICED_COFFEE_EXTRA",
                None,
                e.get("nameVi") or "",
                e.get("nameEn") or "",
                None,
                None,
                None,
                None,
                None,
                None,
                None,
                e.get("priceLine") or "",
            ]
        )
    append_rows("FOOD_CABRAMATTA", cabra)
    append_rows("FOOD_CANLEY_HEIGHTS", canley)
    path.parent.mkdir(parents=True, exist_ok=True)
    wb.save(path)
    wb.close()


def unquote_ts_str(raw: str) -> str:
    return raw.replace("\\'", "'").replace("\\\\", "\\")


def ts_str_field(line: str, field: str) -> str | None:
    m = re.search(rf"{field}:\s*'((?:\\\\.|[^'\\\\])*)'", line)
    if m:
        return unquote_ts_str(m.group(1))
    if re.search(rf"{field}:\s*null\b", line):
        return None
    raise ValueError(f"Cannot parse {field} in: {line[:120]}...")


def ts_optional_str_field(line: str, field: str) -> str | None:
    try:
        return ts_str_field(line, field)
    except ValueError:
        if re.search(rf"{field}:\s*null\b", line):
            return None
        raise


def ts_num_field(line: str, field: str) -> float | int | None:
    m = re.search(rf"{field}:\s*null\b", line)
    if m:
        return None
    m = re.search(rf"{field}:\s*([-+]?\d+(?:\.\d+)?)", line)
    if m:
        v = float(m.group(1))
        return int(v) if v == int(v) else round(v, 6)
    raise ValueError(f"Cannot parse {field} number in: {line[:120]}...")


def ts_stt_field(line: str) -> int | None:
    return ts_num_field(line, "stt")


def ts_photo_field(line: str) -> int | str | None:
    if re.search(r"photoStt:\s*null\b", line):
        return None
    m = re.search(r"photoStt:\s*'((?:\\\\.|[^'\\\\])*)'", line)
    if m:
        return unquote_ts_str(m.group(1))
    m = re.search(r"photoStt:\s*([-+]?\d+(?:\.\d+)?)\b", line)
    if m:
        v = float(m.group(1))
        return int(v) if v == int(v) else v
    raise ValueError(f"Cannot parse photoStt in: {line[:120]}...")


def parse_generated_ts(path: Path) -> tuple[list, list, list, list, list, list]:
    text = path.read_text(encoding="utf-8")

    def extract_block(name: str, kind: str) -> str:
        needle = f"export const {name}: {kind} = ["
        i = text.find(needle)
        if i < 0:
            raise SystemExit(f"Missing {name} in {path}")
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
        objs: list[str] = []
        depth = 0
        start = 0
        i = 0
        while i < len(block):
            c = block[i]
            if c == "{":
                if depth == 0:
                    start = i
                depth += 1
            elif c == "}":
                depth -= 1
                if depth == 0:
                    objs.append(block[start : i + 1])
            i += 1
        return objs

    def parse_menu_objects(block: str) -> list[dict]:
        out: list[dict] = []
        for obj in split_objects(block):
            line = obj.replace("\n", " ")
            out.append(
                {
                    "stt": ts_stt_field(line),
                    "nameVi": ts_optional_str_field(line, "nameVi") or "",
                    "nameEn": ts_optional_str_field(line, "nameEn") or "",
                    "nameUber": ts_optional_str_field(line, "nameUber"),
                    "size": ts_optional_str_field(line, "size"),
                    "pricePickup": ts_num_field(line, "pricePickup"),
                    "priceUber": ts_num_field(line, "priceUber"),
                    "description": ts_optional_str_field(line, "description"),
                    "photoStt": ts_photo_field(line),
                    "notes": ts_optional_str_field(line, "notes"),
                }
            )
        return out

    def parse_extras(block: str) -> list[dict]:
        out: list[dict] = []
        for obj in split_objects(block):
            line = obj.replace("\n", " ")
            out.append(
                {
                    "nameVi": ts_str_field(line, "nameVi"),
                    "nameEn": ts_str_field(line, "nameEn"),
                    "priceLine": ts_str_field(line, "priceLine"),
                }
            )
        return out

    sweet = parse_menu_objects(extract_block("SWEET_DESSERT", "UberMenuRow[]"))
    fruit = parse_menu_objects(extract_block("FRUIT_BOWLS_DESSERT", "UberMenuRow[]"))
    iced = parse_menu_objects(extract_block("ICED_COFFEE", "UberMenuRow[]"))
    iced_extras = parse_extras(extract_block("ICED_COFFEE_EXTRAS", "IcedCoffeeExtra[]"))
    cabra = parse_menu_objects(extract_block("FOOD_CABRAMATTA", "UberMenuRow[]"))
    canley = parse_menu_objects(extract_block("FOOD_CANLEY_HEIGHTS", "UberMenuRow[]"))
    return sweet, fruit, iced, iced_extras, cabra, canley


def emit_ts(
    sweet: list,
    fruit_bowls: list,
    iced: list,
    iced_extras: list,
    cabra: list,
    canley: list,
    *,
    source_note: str,
) -> str:
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

    def emit_extras() -> str:
        lines = ["export const ICED_COFFEE_EXTRAS: IcedCoffeeExtra[] = ["]
        for r in iced_extras:
            lines.append(
                "  {"
                + f"nameVi: {ts_str(r.get('nameVi'))}, "
                + f"nameEn: {ts_str(r.get('nameEn'))}, "
                + f"priceLine: {ts_str(r.get('priceLine'))}, "
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
    parts = [
        header,
        emit_list("SWEET_DESSERT", sweet),
        "\n",
        emit_list("FRUIT_BOWLS_DESSERT", fruit_bowls),
        "\n",
        emit_list("ICED_COFFEE", iced),
        "\n",
        emit_extras(),
        "\n",
        emit_list("FOOD_CABRAMATTA", cabra),
        "\n",
        emit_list("FOOD_CANLEY_HEIGHTS", canley),
        "\n",
    ]
    return "\n".join(parts)


def export_from_legacy() -> None:
    if not LEGACY_XLSX.exists():
        print(f"Missing {LEGACY_XLSX}", file=sys.stderr)
        sys.exit(1)
    wb = openpyxl.load_workbook(LEGACY_XLSX, read_only=False, data_only=True)
    try:
        sweet = parse_standard_menu_sheet(wb["1.Sweet Dessert"], has_type=False)
        fruit = parse_standard_menu_sheet(wb["9.Fruit Bowls & Dessert "], has_type=False, desc_photo_swap=True)
        iced = parse_standard_menu_sheet(wb["6.Iced Coffee"], has_type=False, iced_coffee_photo=True)
        iced_extras = parse_iced_extras(wb["6.Iced Coffee"])
        cabra = parse_foods_sheet(wb["12.CABRA FOODS"])
        canley = parse_foods_sheet(wb["13.CANLEY FOODS"])
    finally:
        wb.close()
    OUT.parent.mkdir(parents=True, exist_ok=True)
    note = LEGACY_XLSX.name
    OUT.write_text(emit_ts(sweet, fruit, iced, iced_extras, cabra, canley, source_note=note), encoding="utf-8")
    print(f"Wrote {OUT} from legacy workbook ({len(sweet)} sweet, {len(fruit)} bowls, ...)")


def main() -> None:
    args = [a for a in sys.argv[1:] if a]
    if "--legacy" in args:
        export_from_legacy()
        return
    if "--init-prod-xlsx" in args:
        if not OUT.exists():
            print(f"Missing {OUT}", file=sys.stderr)
            sys.exit(1)
        data = parse_generated_ts(OUT)
        write_flat_workbook(XLSX_FLAT, *data)
        print(f"Wrote {XLSX_FLAT} (from {OUT.name})")
        return

    if XLSX_FLAT.exists():
        sweet, fruit, iced, iced_extras, cabra, canley = parse_flat_workbook(XLSX_FLAT)
        OUT.parent.mkdir(parents=True, exist_ok=True)
        OUT.write_text(
            emit_ts(sweet, fruit, iced, iced_extras, cabra, canley, source_note=XLSX_FLAT.name),
            encoding="utf-8",
        )
        print(
            f"Wrote {OUT} from {XLSX_FLAT.name} ({len(sweet)} sweet, {len(fruit)} bowls, "
            f"{len(iced)} iced, {len(iced_extras)} iced extras, {len(cabra)} cabra, {len(canley)} canley)"
        )
        return

    print(f"No {XLSX_FLAT.name} — skipped export (keeping {OUT.name}). Create it with: python3 scripts/export_uber_menu.py --init-prod-xlsx")


if __name__ == "__main__":
    main()

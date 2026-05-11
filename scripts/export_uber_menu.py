#!/usr/bin/env python3
"""Parse Bambu Uber Menu xlsx → src/data/uber-menu.generated.ts. Run from repo root with:
   python3 -m venv .venv-xlsx && . .venv-xlsx/bin/activate && pip install openpyxl && python3 scripts/export_uber_menu.py
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

try:
    import openpyxl
except ImportError:
    print("Install openpyxl: pip install openpyxl", file=sys.stderr)
    sys.exit(1)

ROOT = Path(__file__).resolve().parents[1]
XLSX = ROOT / "Bambu _ Uber Menu 19.04.2026.xlsx"
OUT = ROOT / "src" / "data" / "uber-menu.generated.ts"


def ts_str(s: str | None) -> str:
    if s is None:
        return "null"
    s = str(s).replace("\\", "\\\\").replace("'", "\\'")
    s = s.replace("\r\n", " ").replace("\n", " ").replace("\r", " ")
    s = re.sub(r"[\x00-\x08\x0b\x0c\x0e-\x1f]", "", s)
    return "'"[:0] + "'" + s + "'"


def ts_num(n: float | int | None) -> str:
    if n is None:
        return "null"
    if isinstance(n, float) and n == int(n):
        return str(int(n))
    return str(round(n, 2))


def apply_photo_hyperlink(rec: dict, ws, *, excel_row: int, photo_col_0based: int) -> None:
    """If STT ảnh cell has an http(s) hyperlink, use that URL in `photoStt` (display text may differ)."""
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
    """Expected: col1 STT (number or skip), col2 vi, col3 en, col4 uber, optional type/size, prices..."""
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
        notes_col = 10 if len(row) > 10 else photo_col + 1
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


def emit_ts(
    sweet: list,
    fruit_bowls: list,
    iced: list,
    iced_extras: list,
    cabra: list,
    canley: list,
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

    header = """/**
 * AUTO-GENERATED from `Bambu _ Uber Menu 19.04.2026.xlsx`
 * Do not edit by hand — run: `python3 scripts/export_uber_menu.py`
 */

export type UberMenuRow = {
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
};

export type IcedCoffeeExtra = {
  nameVi: string;
  nameEn: string;
  priceLine: string;
};

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


def main():
    if not XLSX.exists():
        print(f"Missing {XLSX}", file=sys.stderr)
        sys.exit(1)
    wb = openpyxl.load_workbook(XLSX, read_only=False, data_only=True)
    sweet = parse_standard_menu_sheet(wb["1.Sweet Dessert"], has_type=False)
    fruit = parse_standard_menu_sheet(wb["9.Fruit Bowls & Dessert "], has_type=False, desc_photo_swap=True)
    iced = parse_standard_menu_sheet(wb["6.Iced Coffee"], has_type=False, iced_coffee_photo=True)
    iced_extras = parse_iced_extras(wb["6.Iced Coffee"])
    cabra = parse_foods_sheet(wb["12.CABRA FOODS"])
    canley = parse_foods_sheet(wb["13.CANLEY FOODS"])
    wb.close()

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(emit_ts(sweet, fruit, iced, iced_extras, cabra, canley), encoding="utf-8")
    print(f"Wrote {OUT} ({len(sweet)} sweet, {len(fruit)} bowls, {len(iced)} iced, {len(cabra)} cabra food, {len(canley)} canley food)")


if __name__ == "__main__":
    main()

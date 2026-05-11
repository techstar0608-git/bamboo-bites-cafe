import type { UberMenuRow } from "@/data/uber-menu.generated";

/** Order sizes for display and default selection */
const SIZE_RANK: Record<string, number> = {
  XS: -2,
  S: 0,
  R: 1,
  REGULAR: 1,
  M: 2,
  L: 3,
  XL: 4,
};

export function sizeSortKey(size: string | null): number {
  if (size == null) return 99;
  const u = size.trim().toUpperCase();
  if (SIZE_RANK[u] !== undefined) return SIZE_RANK[u];
  const leading = /^\s*(\d+)/.exec(size);
  if (leading) {
    const n = parseInt(leading[1]!, 10);
    return 40 + n / 100;
  }
  return 50;
}

/** Rows that share the same Uber listing name (and usually differ only by size). */
export function groupMenuRowsByProductKey(items: UberMenuRow[]): UberMenuRow[][] {
  const map = new Map<string, UberMenuRow[]>();
  const order: string[] = [];

  for (const row of items) {
    const key = row.nameUber ?? `${row.nameEn}\0${row.nameVi}`;
    if (!map.has(key)) {
      map.set(key, []);
      order.push(key);
    }
    map.get(key)!.push(row);
  }

  for (const variants of map.values()) {
    variants.sort((a, b) => sizeSortKey(a.size) - sizeSortKey(b.size));
  }

  return order.map((k) => map.get(k)!);
}

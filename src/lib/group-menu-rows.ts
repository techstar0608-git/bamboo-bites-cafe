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

/** One purchasable variant of a product — a size and/or hot/cold type with its price. */
export type MenuVariant = {
  size: string | null;
  type: string | null;
  pricePickup: number | null;
  priceUber: number | null;
};

/** A menu product: all rows sharing a Product ID collapsed into one entry. */
export type MenuProduct = {
  /** Stable key — the Product ID, or the name when the workbook left it blank. */
  key: string;
  productId: string | null;
  nameEn: string;
  nameVi: string;
  nameUber: string | null;
  description: string | null;
  photoStt: number | string | null;
  /** STT of the first row — used for local image fallback. */
  stt: number | null;
  tag: string | null;
  note: string | null;
  variants: MenuVariant[];
  /** The single type shared by every variant (e.g. "Cold"), else null. */
  uniformType: string | null;
};

function variantKey(v: MenuVariant): string {
  return `${v.type ?? ""}\0${v.size ?? ""}\0${v.pricePickup ?? ""}\0${v.priceUber ?? ""}`;
}

/**
 * Collapse rows that share a Product ID into a single product. Each remaining
 * row becomes a size/type variant; description, image, note and tag are taken
 * from the first row that carries them.
 */
export function groupRowsByProductId(items: readonly UberMenuRow[]): MenuProduct[] {
  const map = new Map<string, MenuProduct>();
  const order: string[] = [];
  const seenVariant = new Map<string, Set<string>>();

  for (const row of items) {
    const name = row.nameEn || row.nameVi || "Menu item";
    const key = row.productId ?? row.nameUber ?? `${row.nameEn}\0${row.nameVi}`;

    let product = map.get(key);
    if (!product) {
      product = {
        key,
        productId: row.productId,
        nameEn: row.nameEn || name,
        nameVi: row.nameVi,
        nameUber: row.nameUber,
        description: row.description,
        photoStt: row.photoStt,
        stt: row.stt,
        tag: row.tag,
        note: row.notes,
        variants: [],
        uniformType: null,
      };
      map.set(key, product);
      seenVariant.set(key, new Set());
      order.push(key);
    } else {
      product.description ??= row.description;
      product.photoStt ??= row.photoStt;
      product.tag ??= row.tag;
      product.note ??= row.notes;
    }

    const variant: MenuVariant = {
      size: row.size,
      type: row.type,
      pricePickup: row.pricePickup,
      priceUber: row.priceUber,
    };
    const seen = seenVariant.get(key)!;
    const vk = variantKey(variant);
    if (!seen.has(vk)) {
      seen.add(vk);
      product.variants.push(variant);
    }
  }

  for (const product of map.values()) {
    product.variants.sort((a, b) => sizeSortKey(a.size) - sizeSortKey(b.size));
    const types = new Set(
      product.variants.map((v) => v.type).filter((t): t is string => t != null),
    );
    product.uniformType =
      types.size === 1 && product.variants.every((v) => v.type != null) ? [...types][0]! : null;
  }

  return order.map((k) => map.get(k)!);
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

/**
 * Resolves workbook `photoStt` (STT ảnh) and local Bambu product assets:
 * - Local files under `src/assets/Bambu/Ảnh sản phẩm/` named like `Bản sao của 46.png`
 * - `http(s)://...` → used when no local match (Google Drive links rewritten for embedding)
 * - Legacy flat folders `src/assets/products/` / `src/assets/coffes/` by numeric stem
 */

export type BambuProductSection =
  | "sweet-dessert"
  | "smashed-fruit"
  | "fruit-drinks"
  | "fresh-juice"
  | "smoothies"
  | "over-ice"
  | "espresso-hot"
  | "ice-blended"
  | "matcha"
  | "bambu-special"
  | "food"
  | "breakfast";

type ProductImageOptions = {
  section?: BambuProductSection;
  /** Row STT within the menu section (matches filename number for sweet/food) */
  rowStt?: number | null;
  /** Zero-based index in the rendered list (for fruit bowls etc.) */
  rowIndex?: number;
};

const legacyGlobs = import.meta.glob<string>(
  [
    "../assets/products/**/*.png",
    "../assets/products/**/*.jpg",
    "../assets/products/**/*.jpeg",
    "../assets/products/**/*.webp",
    "../assets/coffes/**/*.png",
    "../assets/coffes/**/*.jpg",
    "../assets/coffes/**/*.jpeg",
    "../assets/coffes/**/*.webp",
  ],
  { eager: true, import: "default" },
);

const bambuGlobs = import.meta.glob<string>(
  ["../assets/Bambu/Ảnh sản phẩm/**/*.{png,jpg,jpeg,webp}"],
  { eager: true, import: "default" },
);

// Legacy local-asset folders (old category layout) → current section keys.
// Remote Drive links now win over local assets, so this only backs items with
// no image URL; folders map to the nearest current section.
const FOLDER_TO_SECTION: Record<string, BambuProductSection> = {
  "1.Sweet Dessert": "sweet-dessert",
  "2.Fruit Drinks - Tea": "fruit-drinks",
  "3.Fresh Juice": "fresh-juice",
  "4.Smoothies": "smoothies",
  "5.Pennywort Drinks": "fresh-juice",
  "6.Iced Coffee": "over-ice",
  "7.Espresso (Hot)": "espresso-hot",
  "8.Ice Blended": "ice-blended",
  "9.Fruit Bowls & Dessert ": "smashed-fruit",
  "10.Matcha Drinks": "matcha",
  "11.New drink": "bambu-special",
  "12. FOOD": "food",
};

const byBaseName: Record<string, string> = {};
const bySectionRow: Record<string, string> = {};
const bySectionIndex: Partial<Record<BambuProductSection, string[]>> = {};

type IndexedAsset = { num: number; url: string };
const sectionBuckets: Partial<Record<BambuProductSection, IndexedAsset[]>> = {};

function stripExt(name: string): string {
  return name.replace(/\.(png|jpe?g|webp)$/i, "");
}

function extractCatalogNumber(filename: string): number | null {
  const base = stripExt(filename);
  const fromCopy = /(\d+)\s*$/.exec(base);
  if (fromCopy?.[1]) return Number(fromCopy[1]);
  if (/^\d+$/.test(base)) return Number(base);
  return null;
}

function sectionFromPath(path: string): BambuProductSection | null {
  for (const [folder, section] of Object.entries(FOLDER_TO_SECTION)) {
    if (path.includes(`/${folder}/`)) return section;
  }
  return null;
}

for (const [path, url] of Object.entries(legacyGlobs)) {
  const file = path.split("/").pop() ?? "";
  const base = stripExt(file);
  if (base) byBaseName[base] = url;
}

for (const [path, url] of Object.entries(bambuGlobs)) {
  const file = path.split("/").pop() ?? "";
  const catalogNum = extractCatalogNumber(file);
  const section = sectionFromPath(path);
  if (catalogNum != null) {
    byBaseName[String(catalogNum)] = url;
    if (section) {
      bySectionRow[`${section}:${catalogNum}`] = url;
      const bucket = sectionBuckets[section] ?? [];
      bucket.push({ num: catalogNum, url });
      sectionBuckets[section] = bucket;
    }
  }
}

for (const section of Object.keys(sectionBuckets) as BambuProductSection[]) {
  const sorted = sectionBuckets[section]!.sort((a, b) => a.num - b.num);
  bySectionIndex[section] = sorted.map((x) => x.url);
}

function isHttpUrl(s: string): boolean {
  return /^https?:\/\//i.test(s.trim());
}

function googleDriveFileId(url: string): string | null {
  const u = url.trim();
  const fromPath = /\/file\/d\/([a-zA-Z0-9_-]+)/.exec(u);
  if (fromPath?.[1]) return fromPath[1];
  const fromQuery = /[?&]id=([a-zA-Z0-9_-]+)/.exec(u);
  if (fromQuery?.[1]) return fromQuery[1];
  return null;
}

function toDirectImageUrl(raw: string): string {
  const t = raw.trim();
  if (!isHttpUrl(t)) return t;
  try {
    const host = new URL(t).hostname.toLowerCase();
    if (host === "drive.google.com" || host === "docs.google.com") {
      const id = googleDriveFileId(t);
      if (id) {
        return `https://drive.google.com/thumbnail?id=${encodeURIComponent(id)}&sz=w1200`;
      }
    }
  } catch {
    /* ignore */
  }
  return t;
}

export function isNumericPhotoStt(photoStt: number | string | null | undefined): boolean {
  if (photoStt == null) return false;
  if (typeof photoStt === "number" && Number.isFinite(photoStt)) return true;
  const s = String(photoStt).trim();
  if (!s || isHttpUrl(s)) return false;
  return /^\d+(\.\d+)?$/.test(s);
}

function candidateKeys(photoStt: number | string): string[] {
  const s = String(photoStt).trim();
  const out: string[] = [s];
  const n = Number(s);
  if (!Number.isNaN(n)) {
    out.push(String(n));
    if (Number.isInteger(n)) out.push(String(Math.trunc(n)));
  }
  return [...new Set(out)];
}

function resolveLocal(options?: ProductImageOptions): string | null {
  if (!options?.section) return null;

  if (options.rowStt != null) {
    const key = `${options.section}:${options.rowStt}`;
    const hit = bySectionRow[key];
    if (hit) return hit;
  }

  if (options.rowIndex != null) {
    const list = bySectionIndex[options.section];
    if (list?.[options.rowIndex]) return list[options.rowIndex];
  }

  return null;
}

export function getProductImageUrl(
  photoStt: number | string | null | undefined,
  fallbackUrl: string,
  options?: ProductImageOptions,
): string {
  // Confirmed menu data ships every image as a Google Drive link — a remote
  // URL always wins over any local/legacy asset match.
  if (photoStt != null) {
    const url = String(photoStt).trim();
    if (url && isHttpUrl(url)) return toDirectImageUrl(url);
  }

  const local = resolveLocal(options);
  if (local) return local;

  if (photoStt == null) return fallbackUrl;
  const raw = String(photoStt).trim();
  if (!raw || /không|no\s*image|^n\/?a$/i.test(raw)) return fallbackUrl;

  for (const key of candidateKeys(photoStt)) {
    const hit = byBaseName[key];
    if (hit) return hit;
  }
  const noZero = raw.replace(/^0+(?=\d)/, "");
  if (noZero !== raw && byBaseName[noZero]) return byBaseName[noZero];

  return fallbackUrl;
}

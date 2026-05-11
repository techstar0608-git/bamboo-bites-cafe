/**
 * Resolves workbook `photoStt` (STT ảnh):
 * - `http(s)://...` → used as the image src (Google Drive sharing links are rewritten for embedding)
 * - otherwise → files under `src/assets/products/` / `src/assets/coffes/` named like `46.png` (stem = STT)
 */

const globs = import.meta.glob<string>(
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

const byBaseName: Record<string, string> = {};

for (const [path, url] of Object.entries(globs)) {
  const file = path.split("/").pop() ?? "";
  const base = stripExt(file);
  if (base) byBaseName[base] = url;
}

function stripExt(name: string): string {
  return name.replace(/\.(png|jpe?g|webp)$/i, "");
}

function isHttpUrl(s: string): boolean {
  return /^https?:\/\//i.test(s.trim());
}

/** Drive file id from /file/d/<id>/, ?id=, open?id=, uc?id= */
function googleDriveFileId(url: string): string | null {
  const u = url.trim();
  const fromPath = /\/file\/d\/([a-zA-Z0-9_-]+)/.exec(u);
  if (fromPath?.[1]) return fromPath[1];
  const fromQuery = /[?&]id=([a-zA-Z0-9_-]+)/.exec(u);
  if (fromQuery?.[1]) return fromQuery[1];
  return null;
}

/**
 * Google Drive “open/view” URLs are HTML pages, not image bytes — they break `<img>`.
 * Thumbnail endpoint returns actual image data when the file is shared as “Anyone with the link”.
 */
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

/** Show corner “STT ảnh” only for numeric workbook codes (local assets); hide for Drive URLs. */
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

export function getProductImageUrl(
  photoStt: number | string | null | undefined,
  fallbackUrl: string,
): string {
  if (photoStt == null) return fallbackUrl;
  const raw = String(photoStt).trim();
  if (!raw || /không|no\s*image|^n\/?a$/i.test(raw)) return fallbackUrl;

  if (isHttpUrl(raw)) return toDirectImageUrl(raw);

  for (const key of candidateKeys(photoStt)) {
    const hit = byBaseName[key];
    if (hit) return hit;
  }
  const noZero = raw.replace(/^0+(?=\d)/, "");
  if (noZero !== raw && byBaseName[noZero]) return byBaseName[noZero];

  return fallbackUrl;
}

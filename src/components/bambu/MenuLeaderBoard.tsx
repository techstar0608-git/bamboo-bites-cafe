import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import type { UberMenuRow } from "@/data/uber-menu.generated";
import { groupRowsByProductId, type MenuProduct, type MenuVariant } from "@/lib/group-menu-rows";
import { getProductImageUrl, type BambuProductSection } from "@/lib/product-images";
import { UBER_EATS_DEFAULT } from "@/lib/branches";

function formatPrice(n: number | null | undefined): string | null {
  if (n == null) return null;
  return `$${n.toFixed(2)}`;
}

function variantPrice(v: MenuVariant): number | null {
  return v.priceUber ?? v.pricePickup;
}

const SIZE_NAMES: Record<string, string> = {
  XS: "Extra Small",
  S: "Small",
  R: "Regular",
  REGULAR: "Regular",
  M: "Medium",
  L: "Large",
  XL: "Extra Large",
};

function sizeName(size: string | null): string | null {
  if (!size) return null;
  return SIZE_NAMES[size.trim().toUpperCase()] ?? size.trim();
}

/** Label for one variant row in the detail sheet — type shown only when it varies. */
function variantLabel(v: MenuVariant, typeVaries: boolean): string {
  const parts: string[] = [];
  if (typeVaries && v.type) parts.push(v.type);
  const s = sizeName(v.size);
  if (s) parts.push(s);
  return parts.join(" · ") || "Standard";
}

/** Card price — a single price, or "from $min" when a product has several variants. */
function cardPrice(product: MenuProduct): string | null {
  const prices = product.variants.map(variantPrice).filter((p): p is number => p != null);
  if (prices.length === 0) return null;
  const min = Math.min(...prices);
  return prices.length > 1 ? `from ${formatPrice(min)}` : formatPrice(min);
}

/** Badge label per workbook `Tag` letter — a product may carry several (e.g. "N,P"). */
const TAG_LABELS: Record<string, string> = {
  N: "New",
  P: "Popular",
  H: "Hot",
  S: "Seasonal",
};

/** Highlight badges from the workbook `Tag` column. */
function badgeLabels(product: MenuProduct): string[] {
  const letters = (product.tag?.toUpperCase() ?? "").split(/[^A-Z]+/).filter(Boolean);
  const out = Object.entries(TAG_LABELS)
    .filter(([letter]) => letters.includes(letter))
    .map(([, label]) => label);
  if (out.length === 0 && (product.note?.toLowerCase() ?? "").includes("best seller")) {
    out.push("Best Seller");
  }
  return out;
}

type SelectedProduct = { img: string; product: MenuProduct; badges: string[] };

/** Bottom-sheet detail view for a tapped product, with sizes, type, note and CTA. */
function ItemDetailModal({ item, onClose }: { item: SelectedProduct; onClose: () => void }) {
  const { product } = item;
  const typeVaries = product.uniformType == null && product.variants.some((v) => v.type);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const name = product.nameEn || product.nameVi || "Menu item";
  const singleVariant = product.variants.length === 1;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={name}
      onClick={onClose}
      className="fixed inset-0 z-[200] flex items-stretch justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-dvh w-full flex-col overflow-hidden bg-background shadow-2xl sm:h-auto sm:max-h-[90dvh] sm:max-w-lg sm:rounded-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng"
          className="absolute left-4 top-4 z-10 inline-flex size-9 items-center justify-center rounded-full bg-white/90 text-xl leading-none text-[#2b2b2b] shadow-sm transition hover:bg-white"
        >
          ×
        </button>

        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="aspect-4/3 w-full bg-white">
            <img
              src={item.img}
              alt={name}
              referrerPolicy="no-referrer"
              className="size-full object-contain"
            />
          </div>
          <div className="px-5 py-5">
            <div className="flex flex-wrap items-center gap-2">
              {item.badges.map((b) => (
                <span
                  key={b}
                  className="inline-flex items-center rounded-md bg-[#2b3440] px-2 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-wide text-white"
                >
                  {b}
                </span>
              ))}
              {product.uniformType ? (
                <span className="inline-flex items-center rounded-md border border-primary/30 bg-primary/5 px-2 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-wide text-primary">
                  {product.uniformType}
                </span>
              ) : null}
            </div>
            <h2 className="mt-2 font-display text-xl font-semibold text-heading">{name}</h2>
            {product.nameVi && product.nameVi !== name ? (
              <p className="mt-0.5 text-sm text-muted-foreground">{product.nameVi}</p>
            ) : null}

            {product.description ? (
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            ) : null}

            {/* Sizes & prices */}
            {product.variants.length > 0 ? (
              <div className="mt-4">
                {!singleVariant ? (
                  <h3 className="mb-2 text-[0.6875rem] font-semibold uppercase tracking-wide text-muted-foreground">
                    Sizes & prices
                  </h3>
                ) : null}
                <ul className="divide-y divide-border/60 rounded-xl border border-border/60">
                  {product.variants.map((v, i) => {
                    const price = formatPrice(variantPrice(v));
                    return (
                      <li
                        key={`${v.type ?? ""}-${v.size ?? ""}-${i}`}
                        className="flex items-center justify-between px-3.5 py-2.5"
                      >
                        <span className="text-sm text-heading">
                          {singleVariant && !v.size && !typeVaries
                            ? "Price"
                            : variantLabel(v, typeVaries)}
                        </span>
                        {price ? (
                          <span className="text-sm font-semibold tabular-nums text-primary">
                            {price}
                          </span>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : null}

            {/* Note */}
            {product.note ? (
              <div className="mt-4 rounded-xl bg-muted/40 px-3.5 py-3">
                <h3 className="mb-1 text-[0.6875rem] font-semibold uppercase tracking-wide text-muted-foreground">
                  Note
                </h3>
                <p className="text-sm leading-relaxed text-heading">{product.note}</p>
              </div>
            ) : null}
          </div>
        </div>

        <div className="border-t border-border/60 bg-background px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          <a
            href={UBER_EATS_DEFAULT}
            target="_blank"
            rel="noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#BD9C30] px-6 py-3.5 text-sm font-semibold tracking-wide text-white shadow-sm transition hover:bg-[#a8892a]"
          >
            Order in Uber →
          </a>
        </div>
      </div>
    </div>,
    document.body,
  );
}

type MenuLeaderBoardProps = {
  /** Optional section heading shown above the board */
  heading?: string;
  items: readonly UberMenuRow[];
  placeholderImg: string;
  section: BambuProductSection;
};

/** Dotted board — one card per Product ID; tap for sizes, type and note in a detail sheet. */
export function MenuLeaderBoard({ heading, items, placeholderImg, section }: MenuLeaderBoardProps) {
  const [selected, setSelected] = useState<SelectedProduct | null>(null);
  const products = useMemo(() => groupRowsByProductId(items), [items]);

  return (
    <section>
      {heading ? <h2 className="mb-3 font-display text-xl text-heading">{heading}</h2> : null}
      <ul role="list" className="divide-y divide-primary/10 border-y border-primary/10">
        {products.map((product, i) => {
          const img = getProductImageUrl(product.photoStt, placeholderImg, {
            section,
            rowStt: product.stt,
            rowIndex: i,
          });
          const price = cardPrice(product);
          const badges = badgeLabels(product);
          const name = product.nameEn || product.nameVi || "Menu item";
          return (
            <li key={product.key}>
              <button
                type="button"
                onClick={() => setSelected({ img, product, badges })}
                className="group flex w-full items-start gap-4 py-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                <span className="relative aspect-4/3 h-24 shrink-0 overflow-hidden rounded-[10px] bg-white ring-1 ring-primary/10 transition group-hover:ring-2 group-hover:ring-primary/40 md:h-28">
                  <img
                    src={img}
                    alt={name}
                    width={240}
                    height={240}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="size-full object-contain object-center transition group-hover:scale-105"
                  />
                </span>
                <span className="min-w-0 flex-1">
                  {badges.length > 0 ? (
                    <span className="mb-1.5 flex flex-wrap gap-1.5">
                      {badges.map((b) => (
                        <span
                          key={b}
                          className="inline-flex items-center rounded-md bg-[#2b3440] px-2 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-wide text-white"
                        >
                          {b}
                        </span>
                      ))}
                    </span>
                  ) : null}
                  <span className="block font-display text-sm font-semibold leading-tight text-heading transition group-hover:text-primary md:text-base">
                    {name}
                  </span>
                  <span className="mt-0.5 line-clamp-2 block h-[2lh] text-[0.6875rem] leading-tight text-muted-foreground md:text-xs">
                    {product.description ?? ""}
                  </span>
                  {price ? (
                    <span className="mt-1 block text-sm font-semibold tabular-nums text-heading">
                      {price}
                    </span>
                  ) : null}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      {selected ? <ItemDetailModal item={selected} onClose={() => setSelected(null)} /> : null}
    </section>
  );
}

/** Gold pill CTA shown at the bottom of category boards. */
export function MenuOrderNow() {
  return (
    <div className="mt-8 flex justify-center">
      <a
        href={UBER_EATS_DEFAULT}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-[#BD9C30] px-7 py-2.5 text-sm font-semibold tracking-wide text-white shadow-sm transition hover:bg-[#a8892a]"
      >
        Order in Uber →
      </a>
    </div>
  );
}

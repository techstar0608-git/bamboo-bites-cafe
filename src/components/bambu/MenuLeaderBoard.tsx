import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { UberMenuRow } from "@/data/uber-menu.generated";
import { getProductImageUrl, type BambuProductSection } from "@/lib/product-images";
import { UBER_EATS_DEFAULT } from "@/lib/branches";

type SelectedItem = {
  img: string;
  name: string;
  badge: string | null;
  price: string | null;
  description: string | null;
};

/** Bottom-sheet detail view for a tapped menu item, with an Uber Eats CTA. */
function ItemDetailModal({ item, onClose }: { item: SelectedItem; onClose: () => void }) {
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

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.name}
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
              alt={item.name}
              referrerPolicy="no-referrer"
              className="size-full object-contain"
            />
          </div>
          <div className="px-5 py-5">
            {item.badge ? (
              <span className="mb-2 inline-flex items-center rounded-md bg-[#2b3440] px-2 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-wide text-white">
                {item.badge}
              </span>
            ) : null}
            <h2 className="font-display text-xl font-semibold text-heading">{item.name}</h2>
            {item.price ? (
              <p className="mt-1 text-base font-semibold tabular-nums text-primary">{item.price}</p>
            ) : null}
            {item.description ? (
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
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

function priceLabel(row: UberMenuRow): string | null {
  const p = row.priceUber ?? row.pricePickup;
  if (p == null) return null;
  return `$${p.toFixed(2)}`;
}

/** Map a row's free-text `notes` to a short highlight badge (Popular / New / Best Seller). */
function badgeLabel(row: UberMenuRow): string | null {
  const n = row.notes?.toLowerCase() ?? "";
  if (n.includes("best seller")) return "Best Seller";
  if (n.includes("popular")) return "Popular";
  if (n === "new" || n.includes("new")) return "New";
  return null;
}

type MenuLeaderBoardProps = {
  /** Optional section heading shown above the board */
  heading?: string;
  items: readonly UberMenuRow[];
  placeholderImg: string;
  section: BambuProductSection;
};

/** Dotted board — circular photo, green name, description, dashed leader line → price. */
export function MenuLeaderBoard({ heading, items, placeholderImg, section }: MenuLeaderBoardProps) {
  const [selected, setSelected] = useState<SelectedItem | null>(null);
  return (
    <section>
      {heading ? (
        <h2 className="mb-3 font-display text-xl text-heading">{heading}</h2>
      ) : null}
      <ul role="list" className="divide-y divide-primary/10 border-y border-primary/10">
        {items.map((row, i) => {
          const img = getProductImageUrl(row.photoStt, placeholderImg, {
            section,
            rowStt: row.stt,
            rowIndex: i,
          });
          const price = priceLabel(row);
          const badge = badgeLabel(row);
          const name = row.nameEn || row.nameVi || "Menu item";
          return (
            <li key={`${row.stt}-${row.nameEn}-${row.size ?? i}`}>
              <button
                type="button"
                onClick={() =>
                  setSelected({ img, name, badge, price, description: row.description })
                }
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
                  {badge ? (
                    <span className="mb-1.5 inline-flex items-center rounded-md bg-[#2b3440] px-2 py-0.5 text-[0.6875rem] font-semibold uppercase tracking-wide text-white">
                      {badge}
                    </span>
                  ) : null}
                  <span className="block font-display text-sm font-semibold leading-tight text-heading transition group-hover:text-primary md:text-base">
                    {name}
                  </span>
                  <span className="mt-0.5 line-clamp-2 block h-[2lh] text-[0.6875rem] leading-tight text-muted-foreground md:text-xs">
                    {row.description ?? ""}
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

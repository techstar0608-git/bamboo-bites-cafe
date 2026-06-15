import { useEffect, useState } from "react";
import type { UberMenuRow } from "@/data/uber-menu.generated";
import { getProductImageUrl, type BambuProductSection } from "@/lib/product-images";
import { UBER_EATS_DEFAULT } from "@/lib/branches";

type ZoomedImage = { src: string; alt: string };

/** Full-screen overlay showing the tapped product photo at large size. */
function ImageLightbox({ image, onClose }: { image: ZoomedImage; onClose: () => void }) {
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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      onClick={onClose}
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Đóng"
        className="absolute right-4 top-4 inline-flex size-10 items-center justify-center rounded-full bg-white/15 text-2xl leading-none text-white transition hover:bg-white/25"
      >
        ×
      </button>
      <img
        src={image.src}
        alt={image.alt}
        onClick={(e) => e.stopPropagation()}
        referrerPolicy="no-referrer"
        className="max-h-[85vh] max-w-[90vw] rounded-2xl object-contain shadow-2xl"
      />
    </div>
  );
}

function priceLabel(row: UberMenuRow): string | null {
  const p = row.priceUber ?? row.pricePickup;
  if (p == null) return null;
  return `$ ${Number.isInteger(p) ? p : p.toFixed(2)}`;
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
  const [zoomed, setZoomed] = useState<ZoomedImage | null>(null);
  return (
    <section>
      {heading ? (
        <h2 className="mb-3 text-center font-display text-xl text-heading">{heading}</h2>
      ) : null}
      <div className="rounded-2xl border border-dashed border-primary/40 bg-card/40 p-4 shadow-sm sm:p-6 md:p-8">
        <ul role="list" className="space-y-4 md:space-y-5">
          {items.map((row, i) => {
            const img = getProductImageUrl(row.photoStt, placeholderImg, {
              section,
              rowStt: row.stt,
              rowIndex: i,
            });
            const price = priceLabel(row);
            return (
              <li key={`${row.stt}-${row.nameEn}-${row.size ?? i}`}>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setZoomed({ src: img, alt: row.nameEn || row.nameVi || "Menu item" })
                    }
                    aria-label={`Phóng to ảnh ${row.nameEn || row.nameVi || "món"}`}
                    className="group relative size-11 shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-primary/10 transition hover:ring-2 hover:ring-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:size-12"
                  >
                    <img
                      src={img}
                      alt={row.nameEn || row.nameVi || "Menu item"}
                      width={112}
                      height={112}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="size-full scale-110 object-cover object-[center_22%] transition group-hover:scale-125"
                    />
                  </button>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-base font-semibold leading-snug text-primary md:text-lg">
                      {row.nameEn || row.nameVi}
                    </h3>
                    {row.description ? (
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground md:text-[0.8125rem]">
                        {row.description}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="mt-3 flex items-end gap-3">
                  <span className="mb-1.5 flex-1 border-b border-dashed border-primary/35" />
                  {price ? (
                    <span className="text-sm font-semibold tabular-nums text-primary md:text-base">
                      {price}
                    </span>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      {zoomed ? <ImageLightbox image={zoomed} onClose={() => setZoomed(null)} /> : null}
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

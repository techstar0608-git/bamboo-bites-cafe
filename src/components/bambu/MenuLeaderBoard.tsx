import type { UberMenuRow } from "@/data/uber-menu.generated";
import { getProductImageUrl, type BambuProductSection } from "@/lib/product-images";
import { UBER_EATS_DEFAULT } from "@/lib/branches";

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
  return (
    <section>
      {heading ? (
        <h2 className="mb-3 text-center font-display text-xl text-primary">{heading}</h2>
      ) : null}
      <div className="rounded-2xl border border-dashed border-primary/40 bg-card/40 p-4 shadow-sm sm:p-6 md:p-8">
        <ul role="list" className="space-y-7 md:space-y-8">
          {items.map((row, i) => {
            const img = getProductImageUrl(row.photoStt, placeholderImg, {
              section,
              rowStt: row.stt,
              rowIndex: i,
            });
            const price = priceLabel(row);
            return (
              <li key={`${row.stt}-${row.nameEn}-${row.size ?? i}`}>
                <div className="flex gap-4">
                  <div className="size-16 shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-primary/10 md:size-[4.25rem]">
                    <img
                      src={img}
                      alt={row.nameEn || row.nameVi || "Menu item"}
                      width={112}
                      height={112}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="size-full scale-110 object-cover object-[center_22%]"
                    />
                  </div>
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
        Order Now →
      </a>
    </div>
  );
}

import type { UberMenuRow } from "@/data/uber-menu.generated";
import { formatPricePair } from "@/lib/menu-format";
import { getProductImageUrl, type BambuProductSection } from "@/lib/product-images";

type FigmaMenuItemRowProps = {
  row: UberMenuRow;
  placeholderImg: string;
  section?: BambuProductSection;
  rowIndex?: number;
};

/** Figma menu row — circular image, title, description, price bar */
export function FigmaMenuItemRow({
  row,
  placeholderImg,
  section,
  rowIndex,
}: FigmaMenuItemRowProps) {
  const img = getProductImageUrl(row.photoStt, placeholderImg, {
    section,
    rowStt: row.stt,
    rowIndex,
  });
  const desc = row.description?.trim() || row.nameVi?.trim() || "";
  const price = formatPricePair(row);

  return (
    <article className="flex gap-4 border-b border-border/40 py-6 last:border-0 lg:rounded-2xl lg:border-0 lg:bg-white/80 lg:p-4 lg:ring-1 lg:ring-border/50">
      <div className="size-[4.25rem] shrink-0 overflow-hidden rounded-full ring-2 ring-border/50">
        <img
          src={img}
          alt={row.nameEn || row.nameVi || "Menu item"}
          width={68}
          height={68}
          loading="lazy"
          className="size-full object-cover"
        />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold text-[#2b2b2b]">{row.nameEn || row.nameVi}</h3>
        {desc ? (
          <p className="mt-1 text-[0.75rem] leading-snug text-[#2b2b2b]/70">{desc}</p>
        ) : null}
        {price ? (
          <div className="mt-3 inline-flex rounded-full bg-[#2b2b2b] px-3 py-1">
            <span className="text-[0.6875rem] font-medium tabular-nums text-white">{price}</span>
          </div>
        ) : null}
      </div>
    </article>
  );
}

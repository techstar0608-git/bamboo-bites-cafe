import type { UberMenuRow } from "@/data/uber-menu.generated";
import { getProductImageUrl, isNumericPhotoStt } from "@/lib/product-images";
import {
  MenuCircularProductImage,
  MenuDottedBoard,
  MenuDottedRow,
  MenuPriceStack,
  pairIntoGridRows,
  splitIntoTwoColumns,
} from "@/components/bambu/MenuDottedBoard";

type UberMenuListProps = {
  items: UberMenuRow[];
  placeholderImg: string;
  /** Legacy flag — layout is always dotted two-column menu board */
  compact?: boolean;
};

function badgeForRow(notes: string | null | undefined): string | null {
  if (!notes) return null;
  if (notes.toLowerCase().includes("best") || notes === "Best Seller") return "Best Seller";
  if (notes === "NEW" || notes.includes("NEW")) return "New";
  return null;
}

function subtitleLine(r: UberMenuRow): string | undefined {
  const d = r.description?.trim();
  const v = r.nameVi?.trim();
  if (d && v) return `${d} · ${v}`;
  return d || v || undefined;
}

function renderRow(r: UberMenuRow, placeholderImg: string) {
  const imgSrc = getProductImageUrl(r.photoStt, placeholderImg);
  const badge = badgeForRow(r.notes);
  const subtitle = subtitleLine(r);

  const noteExtra =
    (r.notes && !badge) || (badge && r.notes && r.notes !== badge) ? r.notes : null;

  return (
    <MenuDottedRow
      image={
        <MenuCircularProductImage
          src={imgSrc}
          alt={r.nameEn ? `${r.nameEn} — ${r.nameVi}` : r.nameVi || "Menu item"}
          photoSttBadge={
            isNumericPhotoStt(r.photoStt) ? (
              <span className="absolute bottom-0 right-0 rounded-tl bg-background/95 px-1 py-px text-[0.42rem] font-semibold uppercase leading-none text-primary shadow-sm ring-1 ring-border/60">
                {r.photoStt}
              </span>
            ) : undefined
          }
        />
      }
      title={
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span>{r.nameEn || r.nameVi}</span>
          {r.size ? (
            <span className="text-[0.65rem] font-medium tracking-[0.12em] text-muted-foreground uppercase">
              {r.size}
            </span>
          ) : null}
          {badge ? (
            <span className="rounded-sm bg-primary px-1.5 py-0.5 text-[0.55rem] font-semibold tracking-[0.1em] text-primary-foreground uppercase">
              {badge}
            </span>
          ) : null}
        </span>
      }
      subtitle={subtitle}
      price={<MenuPriceStack row={r} />}
      below={
        noteExtra ? <p className="text-[0.7rem] leading-relaxed text-amber-800">{noteExtra}</p> : null
      }
    />
  );
}

export function UberMenuList({ items, placeholderImg }: UberMenuListProps) {
  const [colA, colB] = splitIntoTwoColumns(items);
  const rows = pairIntoGridRows(colA, colB);

  return (
    <MenuDottedBoard>
      <div
        role="list"
        className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2 md:items-start md:gap-y-10 md:gap-x-16 lg:gap-x-20 xl:gap-x-28 2xl:gap-x-32"
      >
        {rows.flatMap(([l, r], rowIdx) => [
          <div key={`menu-L-${rowIdx}`} className="min-w-0 self-start">
            {l ? renderRow(l, placeholderImg) : null}
          </div>,
          <div key={`menu-R-${rowIdx}`} className="min-w-0 self-start">
            {r ? renderRow(r, placeholderImg) : null}
          </div>,
        ])}
      </div>
    </MenuDottedBoard>
  );
}

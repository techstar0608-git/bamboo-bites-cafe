import type { UberMenuRow } from "@/data/uber-menu.generated";
import { formatPricePair } from "@/lib/menu-format";
import { getProductImageUrl, isNumericPhotoStt } from "@/lib/product-images";

type UberMenuListProps = {
  items: UberMenuRow[];
  placeholderImg: string;
  /** Smaller rows without thumbnail column */
  compact?: boolean;
};

export function UberMenuList({ items, placeholderImg, compact }: UberMenuListProps) {
  return (
    <ul className="space-y-8">
      {items.map((r, idx) => {
        const key = `${r.stt ?? "x"}-${r.nameEn}-${r.size ?? ""}-${idx}`;
        const imgSrc = getProductImageUrl(r.photoStt, placeholderImg);
        const badge =
          r.notes?.toLowerCase().includes("best") || r.notes === "Best Seller"
            ? "Best Seller"
            : r.notes === "NEW" || r.notes?.includes("NEW")
              ? "New"
              : null;
        const body = (
          <div className="min-w-0 flex flex-col justify-center">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="font-display text-xl md:text-2xl text-foreground">{r.nameEn}</h3>
              {r.size ? (
                <span className="text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground">
                  {r.size}
                </span>
              ) : null}
              {badge ? (
                <span className="rounded-sm bg-primary px-2 py-0.5 text-[0.55rem] tracking-[0.12em] text-primary-foreground uppercase">
                  {badge}
                </span>
              ) : null}
            </div>
            {r.nameVi ? (
              <p className="mt-0.5 text-sm text-muted-foreground italic">{r.nameVi}</p>
            ) : null}
            <p className="mt-2 font-display text-lg text-primary tabular-nums">
              {formatPricePair(r)}
            </p>
            {r.description ? (
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{r.description}</p>
            ) : null}
            {r.notes && !badge ? (
              <p className="mt-2 text-xs text-amber-200/90">{r.notes}</p>
            ) : null}
            {badge && r.notes && r.notes !== badge ? (
              <p className="mt-2 text-xs text-amber-200/90">{r.notes}</p>
            ) : null}
          </div>
        );

        if (compact) {
          return (
            <li
              key={key}
              className="flex gap-4 border-b border-border/50 pb-8"
            >
              <div className="flex-none w-[4.5rem] sm:w-24 shrink-0">
                <div className="relative aspect-square overflow-hidden rounded-sm border border-border/50 bg-card/30">
                  <img
                    src={imgSrc}
                    alt={r.nameEn ? `${r.nameEn} — ${r.nameVi}` : r.nameVi || ""}
                    width={128}
                    height={128}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                  {isNumericPhotoStt(r.photoStt) ? (
                    <span className="absolute bottom-0.5 left-0.5 bg-background/90 px-1 py-0.5 text-[0.45rem] tracking-tight uppercase text-primary leading-none">
                      {r.photoStt}
                    </span>
                  ) : null}
                </div>
              </div>
              {body}
            </li>
          );
        }

        return (
          <li
            key={key}
            className="grid sm:grid-cols-[minmax(0,140px)_1fr] md:grid-cols-[minmax(0,160px)_1fr] gap-5 border-b border-border/50 pb-10"
          >
            <div className="relative aspect-square md:aspect-[4/3] overflow-hidden rounded-sm border border-border/50 bg-card/30">
              <img
                src={imgSrc}
                alt={r.nameEn ? `${r.nameEn} — ${r.nameVi}` : r.nameVi || "Menu item"}
                width={320}
                height={320}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
              {isNumericPhotoStt(r.photoStt) ? (
                <span className="absolute bottom-2 left-2 bg-background/95 border border-primary/40 px-2 py-1 text-[0.55rem] tracking-[0.15em] uppercase text-primary">
                  STT ảnh {r.photoStt}
                </span>
              ) : null}
            </div>
            {body}
          </li>
        );
      })}
    </ul>
  );
}

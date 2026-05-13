"use client";

import { useEffect, useMemo, useState } from "react";
import type { UberMenuRow } from "@/data/uber-menu.generated";
import { formatPricePair } from "@/lib/menu-format";
import { getProductImageUrl, isNumericPhotoStt } from "@/lib/product-images";
import { groupMenuRowsByProductKey } from "@/lib/group-menu-rows";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type UberMenuGroupedListProps = {
  items: UberMenuRow[];
  placeholderImg: string;
};

function mergeNotes(variants: UberMenuRow[]): string | null {
  for (const v of variants) {
    if (v.notes?.trim()) return v.notes.trim();
  }
  return null;
}

function mergeDescription(variants: UberMenuRow[]): string | null {
  for (const v of variants) {
    if (v.description?.trim()) return v.description.trim();
  }
  return null;
}

function photoForGroup(variants: UberMenuRow[]): number | string | null {
  for (const v of variants) {
    if (v.photoStt != null) return v.photoStt;
  }
  return null;
}

function badgeFromNotes(notes: string | null): string | null {
  if (!notes) return null;
  if (notes.toLowerCase().includes("best") || notes === "Best Seller") return "Best Seller";
  if (notes === "NEW" || notes.includes("NEW")) return "New";
  return null;
}

function GroupedCard({ variants, placeholderImg }: { variants: UberMenuRow[]; placeholderImg: string }) {
  const sorted = variants;
  const head = sorted[0]!;
  const sizes = sorted.map((v) => v.size).filter((s): s is string => s != null && s !== "");

  const defaultSize = sizes[0] ?? "";
  const [selectedSize, setSelectedSize] = useState(defaultSize);

  useEffect(() => {
    if (!sizes.includes(selectedSize) && sizes[0]) {
      setSelectedSize(sizes[0]!);
    }
  }, [selectedSize, sizes]);

  const active = useMemo(
    () => sorted.find((v) => v.size === selectedSize) ?? sorted[0]!,
    [sorted, selectedSize],
  );

  const imgSrc = getProductImageUrl(photoForGroup(sorted), placeholderImg);
  const description = mergeDescription(sorted);
  const notes = mergeNotes(sorted);
  const badge = badgeFromNotes(notes);
  const photoStt = photoForGroup(sorted);

  const productKey = head.nameUber ?? `${head.nameEn}-${head.nameVi}`;

  return (
    <li className="flex gap-4 border-b border-border/50 pb-8">
      <div className="flex-none w-[4.5rem] sm:w-24 shrink-0">
        <div className="relative aspect-square overflow-hidden rounded-sm border border-border/50 bg-card/30">
          <img
            src={imgSrc}
            alt={head.nameEn ? `${head.nameEn} — ${head.nameVi}` : head.nameVi || ""}
            width={128}
            height={128}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover"
          />
          {isNumericPhotoStt(photoStt) ? (
            <span className="absolute bottom-0.5 left-0.5 bg-background/90 px-1 py-0.5 text-[0.45rem] tracking-tight uppercase text-primary leading-none">
              {photoStt}
            </span>
          ) : null}
        </div>
      </div>

      <div className="min-w-0 flex flex-col flex-1">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3 className="font-display text-xl md:text-2xl text-foreground">{head.nameEn}</h3>
          {badge ? (
            <span className="rounded-sm bg-primary px-2 py-0.5 text-[0.55rem] tracking-[0.12em] text-primary-foreground uppercase">
              {badge}
            </span>
          ) : null}
        </div>
        {head.nameVi ? (
          <p className="mt-0.5 text-sm text-muted-foreground italic">{head.nameVi}</p>
        ) : null}

        {sizes.length > 1 ? (
          <div className="mt-4">
            <span className="text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground block mb-2">
              Size
            </span>
            <ToggleGroup
              type="single"
              value={selectedSize}
              onValueChange={(v) => v && setSelectedSize(v)}
              className="justify-start flex-wrap gap-2"
              aria-label={`${head.nameEn} size`}
            >
              {sorted
                .filter((v) => v.size != null && v.size !== "")
                .map((v) => (
                  <ToggleGroupItem
                    key={`${productKey}-${v.size}`}
                    value={v.size!}
                    className="h-9 px-4 py-2 text-xs tracking-wider uppercase data-[state=on]:bg-primary data-[state=on]:text-primary-foreground data-[state=on]:hover:bg-primary/90"
                  >
                    {v.size}
                  </ToggleGroupItem>
                ))}
            </ToggleGroup>
          </div>
        ) : sizes.length === 1 ? (
          <p className="mt-3 text-[0.65rem] tracking-[0.2em] uppercase text-muted-foreground">
            Size · {sizes[0]}
          </p>
        ) : null}

        <p className="mt-3 font-display text-lg text-primary tabular-nums">
          {formatPricePair(active)}
        </p>

        {description ? (
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{description}</p>
        ) : null}
        {notes && !badge ? (
          <p className="mt-2 text-xs text-amber-200/90">{notes}</p>
        ) : null}
        {badge && notes && notes !== badge ? (
          <p className="mt-2 text-xs text-amber-200/90">{notes}</p>
        ) : null}
      </div>
    </li>
  );
}

export function UberMenuGroupedList({ items, placeholderImg }: UberMenuGroupedListProps) {
  const groups = useMemo(() => groupMenuRowsByProductKey(items), [items]);

  return (
    <ul className="space-y-8">
      {groups.map((variants) => (
        <GroupedCard
          key={variants[0]!.nameUber ?? `${variants[0]!.nameEn}-${variants[0]!.nameVi}`}
          variants={variants}
          placeholderImg={placeholderImg}
        />
      ))}
    </ul>
  );
}

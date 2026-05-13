"use client";

import { useEffect, useMemo, useState } from "react";
import type { UberMenuRow } from "@/data/uber-menu.generated";
import { getProductImageUrl, isNumericPhotoStt } from "@/lib/product-images";
import { groupMenuRowsByProductKey } from "@/lib/group-menu-rows";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  MenuCircularProductImage,
  MenuDottedBoard,
  MenuDottedRow,
  MenuPriceStack,
  pairIntoGridRows,
  splitIntoTwoColumns,
} from "@/components/bambu/MenuDottedBoard";

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

function GroupedCard({
  variants,
  placeholderImg,
}: {
  variants: UberMenuRow[];
  placeholderImg: string;
}) {
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
  const subtitle = [description, head.nameVi?.trim()].filter(Boolean).join(" · ") || undefined;

  const notesExtra =
    (notes && !badge) || (badge && notes && notes !== badge) ? notes : null;

  const sizeBlock =
    sizes.length > 1 ? (
      <div>
        <span className="mb-2 block text-[0.65rem] font-medium tracking-[0.18em] text-muted-foreground uppercase">
          Size
        </span>
        <ToggleGroup
          type="single"
          value={selectedSize}
          onValueChange={(v) => v && setSelectedSize(v)}
          className="flex flex-wrap justify-start gap-2"
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
      <p className="text-[0.65rem] tracking-[0.18em] text-muted-foreground uppercase">
        Size · {sizes[0]}
      </p>
    ) : null;

  return (
    <MenuDottedRow
      image={
        <MenuCircularProductImage
          src={imgSrc}
          alt={head.nameEn ? `${head.nameEn} — ${head.nameVi}` : head.nameVi || "Menu item"}
          photoSttBadge={
            isNumericPhotoStt(photoStt) ? (
              <span className="absolute bottom-0 right-0 rounded-tl bg-background/95 px-1 py-px text-[0.42rem] font-semibold uppercase leading-none text-primary shadow-sm ring-1 ring-border/60">
                {photoStt}
              </span>
            ) : undefined
          }
        />
      }
      title={
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span>{head.nameEn || head.nameVi}</span>
          {badge ? (
            <span className="rounded-sm bg-primary px-1.5 py-0.5 text-[0.55rem] font-semibold tracking-[0.1em] text-primary-foreground uppercase">
              {badge}
            </span>
          ) : null}
        </span>
      }
      subtitle={subtitle}
      price={<MenuPriceStack row={active} />}
      below={
        notesExtra || sizeBlock ? (
          <div className="space-y-2">
            {sizeBlock}
            {notesExtra ? (
              <p className="text-[0.7rem] leading-relaxed text-amber-800">{notesExtra}</p>
            ) : null}
          </div>
        ) : null
      }
    />
  );
}

export function UberMenuGroupedList({ items, placeholderImg }: UberMenuGroupedListProps) {
  const groups = useMemo(() => groupMenuRowsByProductKey(items), [items]);
  const [colA, colB] = splitIntoTwoColumns(groups);
  const rows = pairIntoGridRows(colA, colB);

  return (
    <MenuDottedBoard>
      <div
        role="list"
        className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2 md:items-start md:gap-y-10 md:gap-x-16 lg:gap-x-20 xl:gap-x-28 2xl:gap-x-32"
      >
        {rows.flatMap(([lv, rv], rowIdx) => [
          <div key={`grp-L-${rowIdx}`} className="min-w-0 self-start">
            {lv ? (
              <GroupedCard variants={lv} placeholderImg={placeholderImg} />
            ) : null}
          </div>,
          <div key={`grp-R-${rowIdx}`} className="min-w-0 self-start">
            {rv ? (
              <GroupedCard variants={rv} placeholderImg={placeholderImg} />
            ) : null}
          </div>,
        ])}
      </div>
    </MenuDottedBoard>
  );
}

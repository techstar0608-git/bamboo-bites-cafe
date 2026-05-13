import type { ReactNode } from "react";
import type { UberMenuRow } from "@/data/uber-menu.generated";
import { formatPricePair } from "@/lib/menu-format";

export function splitIntoTwoColumns<T>(items: T[]): [T[], T[]] {
  const mid = Math.ceil(items.length / 2);
  return [items.slice(0, mid), items.slice(mid)];
}

/** Pair left/right lists so grid rows align horizontally ([L₀,R₀], [L₁,R₁], …). */
export function pairIntoGridRows<T>(left: T[], right: T[]): [T | null, T | null][] {
  const n = Math.max(left.length, right.length);
  return Array.from({ length: n }, (_, i) => [left[i] ?? null, right[i] ?? null]);
}

export function MenuDottedBoard({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-neutral-400/70 bg-card p-5 shadow-sm md:p-8 lg:p-10">
      {children}
    </div>
  );
}

type MenuDottedRowProps = {
  image: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  price: ReactNode;
  /** Shown under the row, inset to align with text (sizes, long notes) */
  below?: ReactNode;
};

export function MenuDottedRow({ image, title, subtitle, price, below }: MenuDottedRowProps) {
  return (
    <div role="listitem" className="outline-none">
      <div className="flex gap-3 md:gap-4">
        <div className="shrink-0 pt-0.5">{image}</div>
        <div className="min-w-0 flex-1 space-y-1 md:space-y-1.5">
          <div className="block text-[0.9375rem] leading-snug font-semibold tracking-tight text-foreground md:text-base">
            {title}
          </div>
          {subtitle ? (
            <p className="block text-[0.7rem] leading-relaxed text-muted-foreground md:text-xs">
              {subtitle}
            </p>
          ) : null}
          <div className="text-[0.8125rem] font-bold leading-snug tracking-tight text-foreground tabular-nums md:text-sm">
            {price}
          </div>
        </div>
      </div>
      {below ? (
        <div className="mt-2 pl-[calc(3.25rem+0.75rem)] sm:pl-[calc(3.5rem+1rem)]">{below}</div>
      ) : null}
    </div>
  );
}

type MenuCircularImageProps = {
  src: string;
  alt: string;
  /** STT badge for workbook photo reference */
  photoSttBadge?: ReactNode;
};

export function MenuCircularProductImage({ src, alt, photoSttBadge }: MenuCircularImageProps) {
  return (
    <div className="relative size-[3.25rem] shrink-0 overflow-hidden rounded-full border border-neutral-200/90 bg-white shadow-[0_2px_14px_-3px_rgba(0,0,0,0.12)] ring-[3px] ring-card sm:size-[3.5rem]">
      <img
        src={src}
        alt={alt}
        width={112}
        height={112}
        loading="lazy"
        referrerPolicy="no-referrer"
        className="size-full object-cover"
      />
      {photoSttBadge}
    </div>
  );
}

/** Pickup · Uber Eats on one line */
export function MenuPriceStack({ row }: { row: UberMenuRow }) {
  const s = formatPricePair(row).trim();
  if (!s) return <span>—</span>;
  return <span className="whitespace-normal">{s}</span>;
}

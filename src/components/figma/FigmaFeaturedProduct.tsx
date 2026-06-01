import { cn } from "@/lib/utils";

type FigmaFeaturedProductProps = {
  name: string;
  image: string;
  imageAlt?: string;
  /** Side-by-side row under page hero (2-column grid) */
  compact?: boolean;
};

/** Figma Signature / Coffee — large product feature card */
export function FigmaFeaturedProduct({ name, image, imageAlt, compact }: FigmaFeaturedProductProps) {
  return (
    <article className="overflow-hidden rounded-2xl bg-muted/30 ring-1 ring-border/50">
      <div
        className={cn(
          "relative overflow-hidden",
          compact
            ? "aspect-[3/4] sm:aspect-[349/436] lg:aspect-auto lg:h-[min(36vh,320px)]"
            : "aspect-[349/436] lg:aspect-auto lg:h-[min(40vh,380px)]",
        )}
      >
        <img
          src={image}
          alt={imageAlt ?? name}
          width={349}
          height={436}
          loading="lazy"
          className="size-full object-cover"
        />
        <div
          className={cn(
            "absolute inset-x-0 top-0 bg-gradient-to-b from-black/35 to-transparent px-3 pb-6 pt-4 sm:px-5 sm:pb-8 sm:pt-5",
            compact && "pb-4 pt-3 sm:pb-6",
          )}
        >
          <h3
            className={cn(
              "font-display leading-tight text-white",
              compact ? "text-sm sm:text-lg md:text-xl" : "text-2xl md:text-3xl",
            )}
          >
            {name}
          </h3>
        </div>
      </div>
    </article>
  );
}

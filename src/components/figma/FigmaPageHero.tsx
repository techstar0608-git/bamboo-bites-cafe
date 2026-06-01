import { bambuDefaultHero } from "@/lib/bambu-assets";
import { FigmaHeroSpeckle } from "@/components/figma/FigmaHeroSpeckle";
import { cn } from "@/lib/utils";

type FigmaPageHeroProps = {
  image?: string;
  alt?: string;
  className?: string;
  /** Override the hero image classes (e.g. to match a specific Figma crop) */
  imageClassName?: string;
  /** Optional title overlay band (inner pages) */
  overlayTitle?: string;
  /** Optional breadcrumb shown under the overlay title */
  overlayBreadcrumb?: { current: string };
  /** Optional background video (Menu hero) */
  video?: string;
  poster?: string;
};

/** Mobile aspect frame; desktop fills viewport below fixed header (h-20) */
export const FIGMA_HERO_FRAME =
  "relative aspect-[390/540] w-full overflow-hidden md:aspect-[390/420] lg:aspect-auto lg:h-[calc(100svh-5rem)]";

/** Inner-page hero — full-bleed image or video on desktop */
export function FigmaPageHero({
  image = bambuDefaultHero,
  alt = "Bambu Cafe & Desserts",
  className,
  overlayTitle,
  overlayBreadcrumb,
  imageClassName,
  video,
  poster,
}: FigmaPageHeroProps) {
  return (
    <div className={cn("relative w-full", className)}>
      <div className={FIGMA_HERO_FRAME}>
        {video ? (
          <video
            src={video}
            poster={poster ?? image}
            autoPlay
            muted
            loop
            playsInline
            aria-label={alt}
            className="size-full object-cover"
          />
        ) : (
          <img
            src={image}
            alt={alt}
            width={390}
            height={540}
            className={cn("size-full object-cover", imageClassName)}
          />
        )}
        <FigmaHeroSpeckle className="h-[34%] translate-y-[42%]" />
        {overlayTitle ? (
          <div className="absolute inset-x-0 top-0 flex flex-col items-center bg-gradient-to-b from-black/55 via-black/25 to-transparent px-5 pb-16 pt-24 text-center lg:pt-28">
            <h1 className="font-display text-3xl text-white md:text-4xl lg:text-5xl">{overlayTitle}</h1>
            {overlayBreadcrumb ? (
              <p className="mt-2 text-sm text-white/85">
                <span>Home</span>
                <span aria-hidden className="mx-1.5">
                  :
                </span>
                <span>{overlayBreadcrumb.current}</span>
              </p>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

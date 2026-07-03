"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import haloHaloBg from "@/assets/Bambu/homepage/popular/halo-halo-bg.png";
import haloHaloFg from "@/assets/Bambu/homepage/popular/halo-halo-fg.png";
import lycheeBg from "@/assets/Bambu/homepage/popular/lychee-watermelon-bg.png";
import lycheeFg from "@/assets/Bambu/homepage/popular/lychee-watermelon-fg.png";
import mixedFlanBg from "@/assets/Bambu/homepage/popular/mixed-flan-bg.png";
import mixedFlanFg from "@/assets/Bambu/homepage/popular/mixed-flan-fg.png";
import pistachioBg from "@/assets/Bambu/homepage/popular/pistachio-sweet-bg.png";
import pistachioFg from "@/assets/Bambu/homepage/popular/pistachio-sweet-fg.png";
import passionBg from "@/assets/Bambu/homepage/popular/passion-calamansi-bg.png";
import passionFg from "@/assets/Bambu/homepage/popular/passion-calamansi-fg.png";
import grilledBreadBg from "@/assets/Bambu/homepage/popular/grilled-bread-bg.png";
import grilledBreadFg from "@/assets/Bambu/homepage/popular/grilled-bread-fg.png";
import grilledEggsBg from "@/assets/Bambu/homepage/popular/grilled-eggs-bg.png";
import grilledEggsFg from "@/assets/Bambu/homepage/popular/grilled-eggs-fg.png";
import { LeafDivider } from "@/components/figma/LeafDivider";
import { FigmaPillButton } from "@/components/home/FigmaPillButton";
import { UBER_EATS_DEFAULT } from "@/lib/branches";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 4500;

/** Figma Popular slides — bg card photo + floating cut-out layer on top */
const slides = [
  { name: "Halo Halo", bg: haloHaloBg, fg: haloHaloFg },
  { name: "Lychee & Watermelon", bg: lycheeBg, fg: lycheeFg },
  { name: "Mixed Flan & Fruit & Coco Cream", bg: mixedFlanBg, fg: mixedFlanFg },
  { name: "Pitaschio Sweet", bg: pistachioBg, fg: pistachioFg },
  { name: "Passion & Calamansi", bg: passionBg, fg: passionFg },
  { name: "Grilled Bread w Chilli Salt", bg: grilledBreadBg, fg: grilledBreadFg },
  { name: "Grilled Eggs", bg: grilledEggsBg, fg: grilledEggsFg },
] as const;

/**
 * Figma — Popular carousel. Each slide layers the floating-ingredients PNG
 * over its dish card; the layer drifts in with a parallax rise when the
 * slide becomes active (Pinterest "carousel animation in Figma" reference).
 */
export function HomePopularSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selected, setSelected] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;
    const id = window.setInterval(() => emblaApi.scrollNext(), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [emblaApi]);

  return (
    <section className="relative z-10 overflow-hidden bg-cream px-0 py-14 md:py-20">
      <div className="mx-auto max-w-md px-5 md:max-w-2xl md:px-6">
        <LeafDivider className="mb-4 text-primary" />
        <h2 className="text-center font-display text-2xl text-heading md:text-3xl">Popular</h2>
      </div>

      <div className="relative mt-10">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {slides.map((slide, index) => {
              const active = index === selected;
              return (
                <div
                  key={slide.name}
                  className="min-w-0 shrink-0 grow-0 basis-[82%] pl-4 sm:basis-85"
                >
                  <div className="relative pt-10">
                    <div
                      className={cn(
                        "relative overflow-visible rounded-[20px] transition-all duration-700 ease-out",
                        active ? "scale-100 opacity-100" : "scale-[0.92] opacity-60",
                      )}
                    >
                      <img
                        src={slide.bg}
                        alt={slide.name}
                        width={1086}
                        height={1448}
                        loading="lazy"
                        className="w-full rounded-[20px] shadow-[0px_4px_12px_rgba(0,0,0,0.18)]"
                      />
                      {/* TODO: designer will split bg into backdrop + subject; move this layer between them then */}
                      <img
                        src={slide.fg}
                        alt=""
                        aria-hidden
                        width={1086}
                        height={1448}
                        loading="lazy"
                        className={cn(
                          "pointer-events-none absolute inset-0 w-full transition-all duration-700 ease-out",
                          active
                            ? "translate-y-[-7%] scale-105 opacity-100 delay-150"
                            : "translate-y-[2%] scale-100 opacity-0",
                        )}
                      />
                    </div>

                    <p
                      className={cn(
                        "mt-4 text-center text-base font-bold tracking-wider text-[#2b2b2b] transition-opacity duration-500",
                        active ? "opacity-100 delay-200" : "opacity-0",
                      )}
                    >
                      {slide.name}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-between px-3 sm:px-6 lg:px-10">
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous popular item"
            className="pointer-events-auto flex size-12 items-center justify-center rounded-full border border-[#2b2b2b]/30 bg-cream/70 text-[#2b2b2b] backdrop-blur-sm transition hover:border-[#2b2b2b]/60"
          >
            <ChevronLeft className="size-6" strokeWidth={1.25} />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next popular item"
            className="pointer-events-auto flex size-12 items-center justify-center rounded-full border border-[#2b2b2b]/30 bg-cream/70 text-[#2b2b2b] backdrop-blur-sm transition hover:border-[#2b2b2b]/60"
          >
            <ChevronRight className="size-6" strokeWidth={1.25} />
          </button>
        </div>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.name}
            type="button"
            aria-label={`Go to ${slide.name}`}
            onClick={() => emblaApi?.scrollTo(index)}
            className={cn(
              "h-1.5 rounded-full transition-all duration-300",
              index === selected ? "w-6 bg-[#BD9C30]" : "w-1.5 bg-[#2b2b2b]/20",
            )}
          />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <FigmaPillButton href={UBER_EATS_DEFAULT} target="_blank" rel="noreferrer">
          Order In Uber →
        </FigmaPillButton>
      </div>
    </section>
  );
}

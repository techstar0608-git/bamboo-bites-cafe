"use client";

import { useCallback, useEffect, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { bambuHomeHeroSlides } from "@/lib/bambu-assets";
import { FIGMA_HERO_FRAME } from "@/components/figma/FigmaPageHero";
import { FigmaPillButton } from "@/components/home/FigmaPillButton";

const AUTOPLAY_MS = 4000;

/** Figma hero — full-bleed carousel with Bambu images + Explore Our Menu */
export function HomeHeroFigma() {
  const sectionRef = useRef<HTMLElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return undefined;

    let running = false;
    let timeoutId = 0;

    const queueNext = () => {
      if (!running) return;
      timeoutId = window.setTimeout(() => {
        if (!running) return;
        emblaApi.scrollNext();
        queueNext();
      }, AUTOPLAY_MS);
    };

    const play = () => {
      if (running) return;
      running = true;
      window.clearTimeout(timeoutId);
      queueNext();
    };

    const pause = () => {
      running = false;
      window.clearTimeout(timeoutId);
    };

    play();
    const el = sectionRef.current;
    if (el) {
      el.addEventListener("mouseenter", pause);
      el.addEventListener("mouseleave", play);
    }

    return () => {
      pause();
      if (el) {
        el.removeEventListener("mouseenter", pause);
        el.removeEventListener("mouseleave", play);
      }
    };
  }, [emblaApi]);

  return (
    <section ref={sectionRef} className="relative bg-cream pt-20">
      <div className="relative w-full overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {bambuHomeHeroSlides.map((slide) => (
            <div key={slide.id} className="min-w-0 shrink-0 grow-0 basis-full">
              <div className={FIGMA_HERO_FRAME}>
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="absolute inset-0 size-full object-cover object-[center_60%]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-20 bottom-0 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Previous slide"
          className="pointer-events-auto flex size-14 items-center justify-center rounded-full border border-white/90 bg-transparent text-white/90 transition hover:border-white hover:text-white"
        >
          <ChevronLeft className="size-6" strokeWidth={1.25} />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          aria-label="Next slide"
          className="pointer-events-auto flex size-14 items-center justify-center rounded-full border border-white/90 bg-transparent text-white/90 transition hover:border-white hover:text-white"
        >
          <ChevronRight className="size-6" strokeWidth={1.25} />
        </button>
      </div>

      <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center px-4 sm:px-6">
        <FigmaPillButton to="/menu" className="shadow-md">
          Explore Our Menu
        </FigmaPillButton>
      </div>
    </section>
  );
}

"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import haloHaloCard from "@/assets/Bambu/homepage/popular/halo-halo-card.png";
import haloHaloFx from "@/assets/Bambu/homepage/popular/halo-halo-fg.png";
import haloHaloSubject from "@/assets/Bambu/homepage/popular/halo-halo-subject.png";
import lycheeCard from "@/assets/Bambu/homepage/popular/lychee-watermelon-card.png";
import lycheeFx from "@/assets/Bambu/homepage/popular/lychee-watermelon-fg.png";
import lycheeSubject from "@/assets/Bambu/homepage/popular/lychee-watermelon-subject.png";
import mixedFlanCard from "@/assets/Bambu/homepage/popular/mixed-flan-card.png";
import mixedFlanFx from "@/assets/Bambu/homepage/popular/mixed-flan-fg.png";
import mixedFlanSubject from "@/assets/Bambu/homepage/popular/mixed-flan-subject.png";
import pistachioCard from "@/assets/Bambu/homepage/popular/pistachio-sweet-card.png";
import pistachioFx from "@/assets/Bambu/homepage/popular/pistachio-sweet-fg.png";
import pistachioSubject from "@/assets/Bambu/homepage/popular/pistachio-sweet-subject.png";
import passionCard from "@/assets/Bambu/homepage/popular/passion-calamansi-card.png";
import passionFx from "@/assets/Bambu/homepage/popular/passion-calamansi-fg.png";
import passionSubject from "@/assets/Bambu/homepage/popular/passion-calamansi-subject.png";
import grilledBreadCard from "@/assets/Bambu/homepage/popular/grilled-bread-card.png";
import grilledBreadFx from "@/assets/Bambu/homepage/popular/grilled-bread-fg.png";
import grilledBreadSubject from "@/assets/Bambu/homepage/popular/grilled-bread-subject.png";
import grilledEggsCard from "@/assets/Bambu/homepage/popular/grilled-eggs-card.png";
import grilledEggsFx from "@/assets/Bambu/homepage/popular/grilled-eggs-fg.png";
import grilledEggsSubject from "@/assets/Bambu/homepage/popular/grilled-eggs-subject.png";
import { LeafDivider } from "@/components/figma/LeafDivider";
import { FigmaPillButton } from "@/components/home/FigmaPillButton";
import { UBER_EATS_DEFAULT } from "@/lib/branches";
import { cn } from "@/lib/utils";

type Slide = {
  name: string;
  /** inner gradient backdrop (Figma 256×340 at 26,35 inside the 308×410 cream card) */
  card: string;
  /** floating-elements layer — animated, sits between backdrop and subject */
  fx: string;
  /** per-slide fx placement when the Figma layer is offset from the card */
  fxClass?: string;
  /** dish cut-out — static top layer */
  subject: string;
  /** positioning for subjects that are not full-canvas (e.g. Grilled Bread plate) */
  subjectClass?: string;
};

/** Figma Popular slides — designer-split layers: backdrop → effects → subject */
const slides: Slide[] = [
  { name: "Halo Halo", card: haloHaloCard, fx: haloHaloFx, subject: haloHaloSubject },
  { name: "Lychee & Watermelon", card: lycheeCard, fx: lycheeFx, subject: lycheeSubject },
  {
    name: "Mixed Flan & Fruit & Coco Cream",
    card: mixedFlanCard,
    fx: mixedFlanFx,
    subject: mixedFlanSubject,
  },
  { name: "Pitaschio Sweet", card: pistachioCard, fx: pistachioFx, subject: pistachioSubject },
  {
    name: "Passion & Calamansi",
    card: passionCard,
    fx: passionFx,
    /* Figma places this fx layer 7px lower than the card so the lemon hides behind the cup */
    fxClass: "left-0 top-[1.7%] w-full",
    subject: passionSubject,
  },
  {
    name: "Grilled Bread w Chilli Salt",
    card: grilledBreadCard,
    fx: grilledBreadFx,
    subject: grilledBreadSubject,
    subjectClass: "left-[8.4%] top-[51.5%] w-[79%]",
  },
  { name: "Grilled Eggs", card: grilledEggsCard, fx: grilledEggsFx, subject: grilledEggsSubject },
];

/**
 * Figma — Popular carousel. Layer order per slide: cream card + gradient
 * backdrop at the bottom, floating-ingredients layer animating in the middle,
 * dish cut-out on top (Pinterest "carousel animation in Figma" reference).
 */
/**
 * Continuous per-slide "closeness to center" (0..1), updated on every scroll
 * frame. Handles Embla loop points so slides at the wrap seam don't read a
 * wrong distance (which showed two enlarged cards at once).
 */
function useCenterCloseness(emblaApi: ReturnType<typeof useEmblaCarousel>[1]) {
  const [values, setValues] = useState<number[]>([]);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();

    const next = emblaApi.scrollSnapList().map((scrollSnap, index) => {
      let diffToTarget = scrollSnap - scrollProgress;
      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopItem) => {
          const target = loopItem.target();
          if (index === loopItem.index && target !== 0) {
            const sign = Math.sign(target);
            if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress);
            if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress);
          }
        });
      }
      return Math.max(0, 1 - Math.abs(diffToTarget * slides.length));
    });
    setValues(next);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onScroll();
    emblaApi.on("scroll", onScroll);
    emblaApi.on("reInit", onScroll);
    return () => {
      emblaApi.off("scroll", onScroll);
      emblaApi.off("reInit", onScroll);
    };
  }, [emblaApi, onScroll]);

  return values;
}

export function HomePopularSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selected, setSelected] = useState(0);
  const closeness = useCenterCloseness(emblaApi);

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
              /* 0 = far from center, 1 = centered — drives every layer, no CSS transitions so drag stays in sync */
              const t = closeness[index] ?? (index === selected ? 1 : 0);
              const cardScale = 0.78 + 0.22 * t;
              /* ends at exactly 1.0 so fx elements land where the designer placed them (they hide behind the subject) */
              const fxScale = 0.55 + 0.45 * t;
              const fxOpacity = t * t;
              return (
                <div
                  key={slide.name}
                  className="min-w-0 shrink-0 grow-0 basis-[70%] pl-4 sm:basis-85"
                >
                  <div className="relative pt-10">
                    <div
                      className="relative aspect-308/410 overflow-visible rounded-[20px] bg-[#FCEDD9] shadow-[0px_4px_12px_rgba(0,0,0,0.12)]"
                      style={{ transform: `scale(${cardScale})`, opacity: 0.55 + 0.45 * t }}
                    >
                      {/* layer 1 — gradient backdrop */}
                      <img
                        src={slide.card}
                        alt=""
                        aria-hidden
                        width={256}
                        height={340}
                        loading="lazy"
                        className="absolute left-[8.4%] top-[8.5%] w-[83.1%] rounded-2xl"
                      />
                      {/* layer 2 — floating elements burst outward from the card center */}
                      <img
                        src={slide.fx}
                        alt=""
                        aria-hidden
                        width={1086}
                        height={1448}
                        loading="lazy"
                        className={cn(
                          "pointer-events-none absolute origin-center",
                          slide.fxClass ?? "inset-0 w-full",
                        )}
                        style={{ transform: `scale(${fxScale})`, opacity: fxOpacity }}
                      />
                      {/* layer 3 — dish subject on top */}
                      <img
                        src={slide.subject}
                        alt={slide.name}
                        loading="lazy"
                        className={cn("absolute", slide.subjectClass ?? "inset-0 w-full")}
                        style={{ transform: `scale(${0.94 + 0.06 * t})` }}
                      />
                    </div>

                    <p
                      className="mt-4 text-center text-base font-bold tracking-wider text-[#2b2b2b]"
                      style={{ opacity: t }}
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

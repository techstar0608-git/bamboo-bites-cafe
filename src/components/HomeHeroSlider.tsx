"use client";

import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import heroProductWelcome from "@/assets/hero-slide-product-welcome.png";
import heroProductCoffee from "@/assets/hero-slide-product-coffee.png";
import heroProductFood from "@/assets/hero-slide-product-food.png";
import heroProductChe from "@/assets/hero-slide-product-che.png";
import { UBER_EATS_CANLEY } from "@/lib/branches";
import { cn } from "@/lib/utils";

type HeroSlide = {
  id: string;
  image: string;
  imageAlt: string;
  line1: string;
  line2: string;
  body: string;
  /** Decorative glow behind cutout — varies per slide to avoid monotone look */
  glowClass: string;
};

const SLIDES = [
  {
    id: "welcome",
    image: heroProductWelcome,
    imageAlt: "Bambu cafe drinks and desserts",
    line1: "Where Every Sip",
    line2: "Tells a Story",
    body: "Vietnamese iced coffee, sweet chè bowls and street-food bites — made fresh for Cabramatta, Canley Heights and your next Uber Eats order.",
    glowClass:
      "opacity-95 bg-[radial-gradient(ellipse_72%_70%_at_48%_58%,rgba(255,209,148,0.55)_0%,rgba(237,154,109,0.18)_42%,transparent_72%)]",
  },
  {
    id: "coffee",
    image: heroProductCoffee,
    imageAlt: "Iced Vietnamese coffee at Bambu",
    line1: "Bold Vietnamese",
    line2: "Iced Coffee",
    body: "Slow-brewed, strong and perfectly chilled — the way cà phê is meant to taste. Order pickup or delivery on Uber Eats.",
    glowClass:
      "opacity-90 bg-[radial-gradient(ellipse_68%_64%_at_50%_52%,rgba(230,246,255,0.5)_0%,rgba(148,208,236,0.16)_38%,transparent_70%)]",
  },
  {
    id: "food",
    image: heroProductFood,
    imageAlt: "Vietnamese street-food bites at Bambu",
    line1: "Street-Style",
    line2: "Bites",
    body: "Crispy finger food, savoury plates and Vietnamese snacks — fried, fresh and made to share alongside your drinks and sweets.",
    glowClass:
      "opacity-95 bg-[radial-gradient(ellipse_70%_66%_at_48%_56%,rgba(255,218,164,0.48)_0%,rgba(220,154,94,0.2)_38%,transparent_72%)]",
  },
  {
    id: "sweet",
    image: heroProductChe,
    imageAlt: "Sweet chè and desserts at Bambu",
    line1: "Colourful Chè",
    line2: "& Shared Treats",
    body: "Bowls, blends and fruit sweets made to linger over — built for friends, family and every sweet tooth in the neighbourhood.",
    glowClass:
      "opacity-95 bg-[radial-gradient(ellipse_70%_68%_at_52%_55%,rgba(255,173,173,0.38)_0%,rgba(255,120,154,0.16)_36%,transparent_72%)]",
  },
] as const satisfies readonly HeroSlide[];

const AUTOPLAY_MS = 2000;

export function HomeHeroSlider() {
  const sectionRef = useRef<HTMLElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [animateTick, setAnimateTick] = useState(0);
  const prevSnapRef = useRef<number | null>(null);
  const [burstKey, setBurstKey] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const selectHandler = () => {
      const next = emblaApi.selectedScrollSnap();
      const prev = prevSnapRef.current;
      if (prev !== null && prev !== next) {
        setBurstKey((k) => k + 1);
      }
      prevSnapRef.current = next;
      setSelectedIndex(next);
      setAnimateTick((t) => t + 1);
    };
    selectHandler();
    emblaApi.on("select", selectHandler);
    emblaApi.on("reInit", selectHandler);
    return () => {
      emblaApi.off("select", selectHandler);
      emblaApi.off("reInit", selectHandler);
    };
  }, [emblaApi]);

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

    const onVisibility = () => {
      if (document.visibilityState === "hidden") pause();
      else play();
    };

    play();
    document.addEventListener("visibilitychange", onVisibility);

    const el = sectionRef.current;
    if (el) {
      el.addEventListener("mouseenter", pause);
      el.addEventListener("mouseleave", play);
    }

    return () => {
      pause();
      document.removeEventListener("visibilitychange", onVisibility);
      if (el) {
        el.removeEventListener("mouseenter", pause);
        el.removeEventListener("mouseleave", play);
      }
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  const pagination = useMemo(
    () =>
      SLIDES.map((_, i) => ({
        index: i,
        label: String(i + 1).padStart(2, "0"),
      })),
    [],
  );

  return (
    <section
      ref={sectionRef}
      className="relative isolate min-h-[85vh] overflow-hidden bg-hero-foodily pt-20 pb-24 md:min-h-[88vh] md:pb-28 lg:pb-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_78%_42%,rgba(255,255,255,0.14)_0%,transparent_55%)]"
      />

      {burstKey > 0 ? (
        <div
          key={burstKey}
          aria-hidden
          className={cn(
            "hero-ppt-wipe-shell",
            burstKey % 2 === 1 ? "hero-ppt-wipe-shell--dr" : "hero-ppt-wipe-shell--dl",
          )}
        />
      ) : null}

      <div className="absolute bottom-28 left-3 right-3 z-20 flex justify-between sm:bottom-32 md:bottom-36 lg:bottom-auto lg:top-1/2 lg:left-5 lg:right-5 lg:-translate-y-1/2 lg:px-0">
        <button
          type="button"
          onClick={scrollPrev}
          aria-label="Previous slide"
          className="flex size-11 items-center justify-center rounded-full border border-white/40 bg-white/[0.07] text-white shadow-sm backdrop-blur-sm transition hover:bg-white/15 hover:ring-2 hover:ring-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#a3a886] md:size-[3.25rem]"
        >
          <ChevronLeft className="size-5 opacity-90 md:size-6" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          onClick={scrollNext}
          aria-label="Next slide"
          className="flex size-11 items-center justify-center rounded-full border border-white/40 bg-white/[0.07] text-white shadow-sm backdrop-blur-sm transition hover:bg-white/15 hover:ring-2 hover:ring-white/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#a3a886] md:size-[3.25rem]"
        >
          <ChevronRight className="size-5 opacity-90 md:size-6" strokeWidth={1.5} />
        </button>
      </div>

      <div className="overflow-hidden pt-4 md:pt-6" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {SLIDES.map((slide, slideIndex) => {
            const active = selectedIndex === slideIndex;

            return (
              <div
                key={slide.id}
                className="min-h-[min(80vh,860px)] min-w-0 shrink-0 grow-0 basis-full py-6 md:min-h-[min(82vh,900px)] md:py-8"
              >
                <div className="relative z-10 mx-auto grid max-w-[92rem] grid-cols-1 items-center gap-10 px-5 sm:px-6 md:gap-12 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-12 xl:max-w-[100rem]">
                  <div className="order-2 text-center lg:order-1 lg:col-span-5 xl:col-span-4 lg:pl-14 lg:text-left xl:pl-16">
                    <h1
                      key={active ? `h-${animateTick}` : `h-idle-${slide.id}`}
                      className={cn(
                        "!font-accent font-medium tracking-tight text-[clamp(2.65rem,9.2vw,4.75rem)] leading-[0.95] text-white",
                        active && cn("animate-ppt-slide", `ppt-slide-animate-head-${slide.id}`),
                      )}
                    >
                      <span className="block text-balance">{slide.line1}</span>
                      <span className="block text-balance">{slide.line2}</span>
                    </h1>
                    <p
                      key={active ? `p-${animateTick}` : `p-idle-${slide.id}`}
                      className={cn(
                        "mx-auto mt-6 max-w-lg text-pretty text-sm leading-relaxed text-white/88 md:text-[0.9375rem] lg:mx-0",
                        active && cn("animate-ppt-slide", `ppt-slide-animate-copy-${slide.id}`),
                      )}
                    >
                      {slide.body}
                    </p>
                    <div
                      key={active ? `cta-${animateTick}` : `cta-idle-${slide.id}`}
                      className={cn(
                        "mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start",
                        active && cn("animate-ppt-slide", `ppt-slide-animate-band-${slide.id}`),
                      )}
                    >
                      <a
                        href={UBER_EATS_CANLEY}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-3 rounded-full bg-primary py-2.5 pr-2 pl-9 shadow-gold transition hover:opacity-95"
                      >
                        <span className="text-xs font-semibold tracking-[0.24em] text-primary-foreground uppercase">
                          Order now
                        </span>
                        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-primary shadow-md">
                          <ArrowRight className="size-4" />
                        </span>
                      </a>
                      <a
                        href="#find-us"
                        className="inline-flex items-center justify-center rounded-full border border-white/50 bg-white/[0.08] px-9 py-3.5 text-xs font-semibold tracking-[0.22em] text-white uppercase backdrop-blur-sm transition hover:bg-white/18"
                      >
                        Find us
                      </a>
                    </div>

                    {active ? (
                      <nav
                        aria-label="Hero slides"
                        className={cn(
                          "mt-12 flex items-center justify-center gap-3 text-[0.7rem] font-semibold tracking-[0.32em] text-white lg:justify-start",
                          active && cn("animate-ppt-slide", `ppt-slide-animate-band-${slide.id}`),
                        )}
                      >
                        {pagination.map(({ index, label }) => (
                          <Fragment key={`${slide.id}-dot-${label}`}>
                            {index === 0 ? null : (
                              <span className="text-white/35" aria-hidden>
                                /
                              </span>
                            )}
                            <button
                              type="button"
                              onClick={() => scrollTo(index)}
                              aria-current={selectedIndex === index ? "true" : undefined}
                              aria-label={`Slide ${label}`}
                              className={cn(
                                "min-h-9 min-w-[2rem] transition",
                                selectedIndex === index
                                  ? "scale-105 text-white"
                                  : "text-white/45 hover:text-white/85",
                              )}
                            >
                              {label}
                            </button>
                          </Fragment>
                        ))}
                      </nav>
                    ) : (
                      <div className="mt-12 min-h-[2.75rem]" aria-hidden />
                    )}
                  </div>

                  <div className="relative order-1 flex justify-center lg:order-2 lg:col-span-7 xl:col-span-8 lg:justify-end lg:px-2 lg:pr-14 xl:px-6 xl:pr-16">
                    <div
                      className={cn(
                        "relative flex w-full justify-center lg:items-center lg:min-h-[min(72vh,880px)]",
                        active && "motion-safe:animate-home-hero-float",
                      )}
                    >
                      <div
                        aria-hidden
                        className={cn(
                          "pointer-events-none absolute inset-[-8%_-20%_-4%_-20%] -z-0 blur-[70px] sm:inset-[-6%_-18%_-2%_-18%] sm:blur-[90px]",
                          slide.glowClass,
                        )}
                      />
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-[10%_8%_-6%_8%] -z-[1] rounded-[40%] bg-linear-to-t from-black/28 via-transparent to-transparent opacity-[0.45] blur-2xl"
                      />
                      <img
                        key={active ? `img-${animateTick}` : `img-idle-${slide.id}`}
                        src={slide.image}
                        alt={slide.imageAlt}
                        width={960}
                        height={1200}
                        className={cn(
                          "relative z-[1] h-auto w-full max-w-[min(100%,22rem)] object-contain object-center drop-shadow-[0_42px_80px_-32px_rgb(0_0_0/0.55)] saturate-[1.08] contrast-[1.04] max-h-[min(68vh,800px)] sm:max-w-[min(100%,28rem)] sm:max-h-[min(74vh,860px)] md:max-h-[min(78vh,900px)] lg:max-h-[min(88vh,1020px)] lg:max-w-[min(100%,min(90vw,55rem))] xl:max-h-[min(90vh,1100px)] xl:drop-shadow-[0_52px_100px_-36px_rgb(0_0_0/0.5)] xl:max-w-[min(100%,min(58vw,60rem))]",
                          active && cn("animate-ppt-slide", `ppt-slide-animate-img-${slide.id}`),
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] overflow-hidden leading-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          aria-hidden
          className="-mb-px block h-16 min-w-[100%] w-[110%] -translate-x-[5%] fill-background md:h-20 lg:h-28"
        >
          <path d="M0 72C260 102 490 118 723 118c266 1 489-62 717-118V126H0Z" />
        </svg>
      </div>
    </section>
  );
}

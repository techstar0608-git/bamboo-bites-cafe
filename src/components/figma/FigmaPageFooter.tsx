"use client";

import { useCallback, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Facebook, Instagram, Mail, Phone } from "lucide-react";
import { branches } from "@/lib/branches";
import footerStorefront from "@/assets/Bambu/homepage/footer-gallery/footer-1.jpg";
import footerFruitStand from "@/assets/Bambu/homepage/footer-gallery/footer-2.jpg";
import footerHotPairing from "@/assets/Bambu/homepage/footer-gallery/footer-3.png";
import footerBreakDoneRight from "@/assets/Bambu/homepage/footer-gallery/footer-4.png";

const FOOTER_LINKS = [
  { to: "/", label: "Home", exact: true },
  { to: "/menu", label: "Menu", exact: true },
  { to: "/iced-coffee", label: "Signature", exact: true },
  { to: "/about", label: "About us", exact: true },
] as const;

const SOCIAL = [
  { href: "https://www.facebook.com/", label: "Facebook", icon: Facebook },
  { href: "https://www.instagram.com/", label: "Instagram", icon: Instagram },
] as const;

/** Footer carousel photos downloaded from the Bambu Figma file */
const GALLERY = [
  footerStorefront,
  footerFruitStand,
  footerHotPairing,
  footerBreakDoneRight,
] as const;

const AUTOPLAY_MS = 4000;

/** Figma footer — auto-rotating photo carousel on top, deep-green info below */
export function FigmaPageFooter() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const reduced =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const id = window.setInterval(() => emblaApi.scrollNext(), AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [emblaApi]);

  return (
    <footer>
      {/* Part 1 — photo carousel */}
      <div className="relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {GALLERY.map((src, i) => (
              <div key={i} className="min-w-0 shrink-0 grow-0 basis-full">
                <div className="aspect-[39/35] w-full overflow-hidden sm:aspect-[16/10] lg:aspect-[16/7]">
                  <img
                    src={src}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="size-full object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-between px-4 sm:px-6">
          <button
            type="button"
            onClick={scrollPrev}
            aria-label="Previous photo"
            className="pointer-events-auto flex size-11 items-center justify-center rounded-full bg-white/90 text-[#2B6641] shadow-md transition hover:bg-white"
          >
            <ChevronLeft className="size-5" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            aria-label="Next photo"
            className="pointer-events-auto flex size-11 items-center justify-center rounded-full bg-white/90 text-[#2B6641] shadow-md transition hover:bg-white"
          >
            <ChevronRight className="size-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Part 2 — deep-green info */}
      <div className="bg-[#2B6641] px-5 py-12 text-white/85 md:px-6">
        <div className="mx-auto max-w-md space-y-10 md:max-w-2xl lg:max-w-4xl lg:grid lg:grid-cols-3 lg:gap-10 lg:space-y-0">
          <div>
            <h2 className="text-sm font-semibold tracking-wide text-white">Contact Us</h2>
            <div className="mt-3 h-px w-12 bg-white/30" />
            <ul className="mt-5 space-y-6 text-sm">
              {branches.map((b) => (
                <li key={b.key}>
                  <p className="font-medium text-white">{b.title}</p>
                  <p className="mt-1 text-white/70">{b.addressLine}</p>
                  <div className="mt-2 flex flex-wrap gap-4 text-white/75">
                    <a
                      href={`tel:${b.phone.replace(/\s/g, "")}`}
                      className="inline-flex items-center gap-1.5 hover:text-white"
                    >
                      <Phone className="size-3.5" strokeWidth={1.5} />
                      {b.phone}
                    </a>
                    <a
                      href={b.uberEatsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 hover:text-white"
                    >
                      <Mail className="size-3.5" strokeWidth={1.5} />
                      Uber Eats
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-wide text-white">Useful Links</h2>
            <div className="mt-3 h-px w-12 bg-white/30" />
            <ul className="mt-5 space-y-2 text-sm">
              {FOOTER_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-white/75 transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-sm font-semibold tracking-wide text-white">Follow Us Now</h2>
              <div className="mt-3 h-px w-12 bg-white/30" />
              <div className="mt-5 flex gap-3">
                {SOCIAL.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="inline-flex size-9 items-center justify-center rounded-full text-white/85 ring-1 ring-white/30 transition hover:bg-white/10 hover:text-white"
                  >
                    <s.icon className="size-4" strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </div>
            <p className="text-[0.65rem] leading-relaxed text-white/55">
              © {new Date().getFullYear()} Copyright
              <br />
              Designed by S.T.A.R Marketing &amp; Tech
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

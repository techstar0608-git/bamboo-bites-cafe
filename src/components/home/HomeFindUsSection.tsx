import { Star } from "lucide-react";
import { branches } from "@/lib/branches";
import iconLocation from "@/assets/Bambu/icons/findus-location.svg";
import iconClock from "@/assets/Bambu/icons/findus-clock.svg";
import iconOpen from "@/assets/Bambu/icons/findus-open.svg";

/** Figma Group 18 — Find Us location cards (map left, details right) */
export function HomeFindUsSection() {
  return (
    <section id="find-us" className="scroll-mt-28 bg-background px-5 py-14 md:px-6 md:py-20">
      <div className="mx-auto max-w-md md:max-w-2xl">
        <div className="text-center">
          <h2 className="font-display text-2xl text-heading md:text-3xl">Find Us</h2>
          <p className="mt-2 text-sm text-[#2b2b2b]/75">Two locations. One family. Always fresh.</p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6">
          {branches.map((b) => (
            <article
              key={b.key}
              className="flex flex-col gap-5 rounded-3xl border border-[#BD9C30]/60 bg-background p-4 sm:p-5"
            >
              <div className="grid grid-cols-[181fr_169fr] items-start gap-4 sm:gap-5">
                <div className="aspect-181/176 w-full overflow-hidden rounded-2xl bg-muted">
                  <iframe
                    title={`Map — ${b.title}`}
                    src={b.mapEmbedSrc}
                    className="size-full border-0 grayscale-15"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>

                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1.5">
                    <img
                      src={iconLocation}
                      alt=""
                      aria-hidden
                      className="h-5 w-5 shrink-0 sm:h-7 sm:w-7"
                    />
                    <h3 className="font-display text-base leading-tight text-heading sm:text-xl">
                      {b.title}
                    </h3>
                  </div>

                  <a
                    href={b.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 text-[0.6875rem] leading-snug text-[#2b2b2b] hover:text-primary sm:mt-3 sm:text-sm"
                  >
                    {b.addressLine}
                  </a>

                  <div className="mt-2 flex items-center gap-1.5 sm:mt-3 sm:gap-2">
                    <Star className="size-3.5 shrink-0 fill-heading text-heading sm:size-4" />
                    <span className="text-[0.6875rem] sm:text-sm">
                      <span className="font-semibold text-heading">{b.ratingValue}</span>{" "}
                      <span className="text-[#2b2b2b]/70">({b.reviewCount})</span>
                    </span>
                  </div>

                  <div className="mt-2 flex gap-1.5 sm:mt-3 sm:gap-2">
                    <img
                      src={iconClock}
                      alt=""
                      aria-hidden
                      className="mt-0.5 size-4 shrink-0 sm:size-5"
                    />
                    <div className="text-[0.6875rem] leading-snug text-[#2b2b2b] sm:text-sm">
                      <p className="font-semibold">{b.hours.weekdayLabel}</p>
                      <p className="text-[#2b2b2b]/80">{b.hours.weekdayTime}</p>
                      <p className="mt-1 font-semibold">{b.hours.weekendLabel}</p>
                      <p className="text-[#2b2b2b]/80">{b.hours.weekendTime}</p>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href={b.uberEatsUrl}
                target="_blank"
                rel="noreferrer"
                className="mx-auto inline-flex items-center gap-2 rounded-full bg-[#BD9C30] px-7 py-2.5 text-sm font-medium text-background shadow-gold transition hover:bg-[#a8892a]"
              >
                Order Now
                <img src={iconOpen} alt="" aria-hidden className="size-4" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

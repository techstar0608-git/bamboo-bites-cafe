import { Clock, ExternalLink, MapPin, Star } from "lucide-react";
import { FigmaPillButton } from "@/components/home/FigmaPillButton";
import { branches } from "@/lib/branches";

/** Figma Group 18 — Find Us location cards */
export function HomeFindUsSection() {
  return (
    <section id="find-us" className="scroll-mt-28 bg-background px-5 py-14 md:px-6 md:py-20">
        <div className="mx-auto max-w-md md:max-w-4xl">
          <div className="text-center">
            <h2 className="font-display text-2xl text-[#2b2b2b] md:text-3xl">Find Us</h2>
            <p className="mt-2 text-sm text-[#2b2b2b]/75">
              Two locations. One family. Always fresh.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-6">
            {branches.map((b) => (
              <article
                key={b.key}
                className="flex flex-col overflow-hidden rounded-2xl bg-muted/25 ring-1 ring-border/50"
              >
                <div className="aspect-[350/235] w-full bg-muted">
                  <iframe
                    title={`Map — ${b.title}`}
                    src={b.mapEmbedSrc}
                    className="size-full border-0 grayscale-[15%]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-4 p-5">
                  <div className="flex-1">
                    <div className="flex items-start gap-2">
                      <MapPin className="mt-0.5 size-5 shrink-0 text-primary" strokeWidth={1.5} />
                      <div>
                        <p className="font-medium text-[#2b2b2b]">{b.title}</p>
                        <a
                          href={b.mapUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-1 block text-sm leading-snug text-[#2b2b2b]/75 hover:text-primary"
                        >
                          {b.addressLine}
                        </a>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2 text-sm text-[#2b2b2b]/75">
                      <Star className="size-4 fill-primary text-primary" />
                      <span>
                        {b.uberEatsRating.replace(" ★", "")} ({b.uberEatsReviewNote.replace(/^Uber Eats — /, "")})
                      </span>
                    </div>
                    <div className="mt-2 flex items-start gap-2 text-sm text-[#2b2b2b]/75">
                      <Clock className="mt-0.5 size-4 shrink-0" strokeWidth={1.5} />
                      <span>{b.hoursShort}</span>
                    </div>
                  </div>
                  <FigmaPillButton
                    href={b.uberEatsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-fit gap-1.5"
                  >
                    Order Now
                    <ExternalLink className="size-3.5 opacity-70" />
                  </FigmaPillButton>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
  );
}

import { MapPin, Star, UtensilsCrossed } from "lucide-react";

const stats = [
  {
    value: "2",
    label: "Locations",
    sub: "Across Sydney",
    icon: MapPin,
    showStar: false,
  },
  {
    value: "4.5",
    label: "Uber Eats Rating",
    sub: "Canley Heights",
    icon: Star,
    showStar: true,
  },
  {
    value: "4.9",
    label: "Uber Eats Rating",
    sub: "Cabramatta",
    icon: Star,
    showStar: true,
  },
  {
    value: "200+",
    label: "Menu Items",
    sub: "Fresh & Delicious",
    icon: UtensilsCrossed,
    showStar: false,
  },
] as const;

/** Figma — Loved by Sydney Locals stats row */
export function HomeLocalsStatsSection() {
  return (
    <section className="bg-cream px-5 py-14 md:px-6 md:py-20">
        <div className="mx-auto max-w-md text-center md:max-w-3xl">
          <h2 className="font-display text-2xl text-[#2b2b2b] md:text-3xl">Loved by Sydney Locals</h2>
          <p className="mt-2 text-sm text-[#2b2b2b]/75">
            Thank you for supporting our family business
          </p>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {stats.map((stat) => (
              <article
                key={stat.label + stat.sub}
                className="flex flex-col items-center rounded-xl bg-white/70 px-2 py-4 ring-1 ring-border/50 md:px-3 md:py-5"
              >
                <p className="font-display text-3xl tabular-nums leading-none text-[#2b2b2b] md:text-4xl">
                  {stat.value}
                  {stat.showStar ? (
                    <Star className="ml-0.5 inline size-3 fill-primary text-primary md:size-3.5" />
                  ) : null}
                </p>
                <p className="mt-3 text-[0.625rem] font-medium leading-tight text-[#2b2b2b]/80">
                  {stat.label}
                </p>
                <p className="mt-0.5 text-[0.625rem] leading-tight text-[#2b2b2b]/60">{stat.sub}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
  );
}

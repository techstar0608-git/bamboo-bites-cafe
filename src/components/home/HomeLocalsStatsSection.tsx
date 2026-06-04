import { Star } from "lucide-react";
import iconStorefront from "@/assets/Bambu/icons/stat-storefront.svg";
import iconBook from "@/assets/Bambu/icons/stat-book.svg";
import leafLine from "@/assets/Bambu/icons/stat-leaf-line.svg";
import leafBranch from "@/assets/Bambu/icons/stat-leaf-branch.svg";

/** Round Uber Eats platform badge used on the rating cards (Figma: 20px ellipse) */
function UberEatsBadge() {
  return (
    <span className="flex size-8 flex-col items-center justify-center rounded-full bg-[#6B9E5E] leading-none text-white">
      <span className="text-[0.5rem] font-semibold tracking-tight">Uber</span>
      <span className="text-[0.5rem] font-semibold tracking-tight">Eats</span>
    </span>
  );
}

type Stat = {
  value: string;
  label: string;
  sub: string;
  showStar: boolean;
  badge: "store" | "uber" | "book";
};

const stats: Stat[] = [
  { value: "2", label: "Locations", sub: "Across Sydney", showStar: false, badge: "store" },
  { value: "4.5", label: "Uber Eats Rating", sub: "Canley Heights", showStar: true, badge: "uber" },
  { value: "4.9", label: "Uber Eats Rating", sub: "Cabramatta", showStar: true, badge: "uber" },
  { value: "200+", label: "Menu Items", sub: "Fresh & Delicious", showStar: false, badge: "book" },
];

function StatBadge({ badge }: { badge: Stat["badge"] }) {
  if (badge === "uber") return <UberEatsBadge />;
  if (badge === "store") return <img src={iconStorefront} alt="" aria-hidden className="size-7" />;
  return <img src={iconBook} alt="" aria-hidden className="w-7" />;
}

/** Figma — Loved by Sydney Locals stats row */
export function HomeLocalsStatsSection() {
  return (
    <section className="bg-cream px-5 py-14 md:px-6 md:py-20">
      <div className="mx-auto max-w-lg text-center">
        <img src={leafBranch} alt="" aria-hidden className="mx-auto mb-5 w-32 md:w-36" />
        <h2 className="font-display text-2xl text-heading md:text-3xl">Loved by Sydney Locals</h2>
        <p className="mt-2 text-sm text-[#2b2b2b]/75">
          Thank you for supporting our family business
        </p>

        {/* Figma: 4 cards, each 76×105 (W×H), 15px gap — taller than wide, top-weighted */}
        <div className="mt-10 grid grid-cols-4 gap-3 sm:gap-4">
          {stats.map((stat) => (
            <article
              key={stat.label + stat.sub}
              className="flex h-full flex-col items-center rounded-2xl bg-white px-1 py-4 shadow-sm ring-1 ring-border/40"
            >
              <p className="flex items-center justify-center font-display text-3xl tabular-nums leading-none text-heading sm:text-4xl">
                {stat.value}
                {stat.showStar ? (
                  <Star className="ml-0.5 inline size-4 fill-heading text-heading sm:size-5" />
                ) : null}
              </p>

              <img src={leafLine} alt="" aria-hidden className="my-1.5 w-[80%]" />

              <div className="flex h-8 items-center justify-center">
                <StatBadge badge={stat.badge} />
              </div>

              <p className="mt-2 whitespace-nowrap text-[0.625rem] font-semibold leading-tight text-[#2b2b2b] sm:text-xs">
                {stat.label}
              </p>
              <p className="mt-0.5 whitespace-nowrap text-[0.5625rem] leading-tight text-[#2b2b2b]/60 sm:text-[0.625rem]">
                {stat.sub}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

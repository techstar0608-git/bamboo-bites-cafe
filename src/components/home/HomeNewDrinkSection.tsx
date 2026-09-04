import { Link } from "@tanstack/react-router";
import newDrinkAutumnVibe from "@/assets/Bambu/homepage/new-drink/figma-autumn-vibe.png";
import phalau from "@/assets/Bambu/homepage/new-drink/phalau.png";
import newDrinkStrawberryYogurt from "@/assets/Bambu/homepage/new-drink/figma-strawberry-yogurt.png";
import newDrinkMatchaSeries from "@/assets/Bambu/homepage/new-drink/figma-matcha-series.png";
import { LeafDivider } from "@/components/figma/LeafDivider";
import { FigmaPillButton } from "@/components/home/FigmaPillButton";

const posters = [
  {
    src: phalau,
    alt: "Pha lau",
  },
  {
    src: newDrinkStrawberryYogurt,
    alt: "Strawberry yogurt dessert cup on a bed of fresh strawberries",
  },
  {
    src: newDrinkMatchaSeries,
    alt: "New Matcha Series — Coconut Cloud, Taro and Pitaschio matcha",
  },
] as const;

/** Figma — New Drink promo posters (full-bleed stack) */
export function HomeNewDrinkSection() {
  return (
    <section className="bg-cream pt-12 md:pt-20">
      <div className="mx-auto max-w-md px-5 md:max-w-2xl md:px-6">
        <LeafDivider className="mb-4 text-primary" />
        <h2 className="text-center font-display text-3xl text-heading md:text-4xl">
          What’s New
        </h2>
      </div>

      <div className="mt-10 md:mx-auto md:max-w-4xl">
        {posters.map((poster) => (
          <Link key={poster.src} to="/bambu-special" className="block">
            <img
              src={poster.src}
              alt={poster.alt}
              width={1080}
              height={1350}
              loading="lazy"
              className="h-auto w-full"
            />
          </Link>
        ))}
      </div>

      <div className="flex justify-center pt-10">
        <FigmaPillButton to="/menu">View Full Menu →</FigmaPillButton>
      </div>
    </section>
  );
}

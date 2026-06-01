import { Link } from "@tanstack/react-router";
import { bambuBranchPhotos, bambuHomeIcedCoffee, favDessertHero } from "@/lib/bambu-assets";
import { FigmaPillButton } from "@/components/home/FigmaPillButton";

const favourites = [
  {
    title: "Iced Coffee →",
    to: "/iced-coffee",
    img: bambuHomeIcedCoffee,
    alt: "Iced Vietnamese coffee",
  },
  {
    title: "Cabramatta Food →",
    to: "/vietnamese-food",
    img: bambuBranchPhotos.cabramatta,
    alt: "Vietnamese street food",
  },
  {
    title: "Sweet Desserts →",
    to: "/sweet-desserts",
    img: favDessertHero,
    alt: "Sweet chè and desserts",
  },
] as const;

/** Figma — Our Favourites stacked category cards */
export function HomeFavouritesSection() {
  return (
    <section className="bg-background px-5 py-14 md:px-6 md:py-20">
        <div className="mx-auto max-w-md md:max-w-2xl lg:max-w-4xl">
          <h2 className="text-center font-display text-2xl text-[#2b2b2b] md:text-3xl">
            Our Favourites
          </h2>

          <div className="mt-10 flex flex-col gap-8 md:grid md:grid-cols-3 md:gap-6">
            {favourites.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="group block overflow-hidden rounded-2xl bg-muted/30 ring-1 ring-border/40 hover:ring-primary/30"
              >
                <div className="aspect-[340/265] overflow-hidden">
                  <img
                    src={item.img}
                    alt={item.alt}
                    width={340}
                    height={265}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="py-4 text-center text-sm font-medium tracking-[0.02em] text-[#2b2b2b]">
                  {item.title}
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <FigmaPillButton to="/menu">View Full Menu</FigmaPillButton>
          </div>
        </div>
      </section>
  );
}

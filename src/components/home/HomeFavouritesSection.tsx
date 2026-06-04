import { Link } from "@tanstack/react-router";
import favCoffee from "@/assets/Bambu/favourites/fav-coffee.png";
import favFood from "@/assets/Bambu/favourites/fav-food.png";
import favDessert from "@/assets/Bambu/favourites/fav-dessert.png";
import { FigmaPillButton } from "@/components/home/FigmaPillButton";
import { LeafDivider } from "@/components/figma/LeafDivider";
import { cn } from "@/lib/utils";

const favourites = [
  {
    title: "Iced Coffee →",
    to: "/iced-coffee",
    img: favCoffee,
    alt: "Iced Vietnamese coffee",
    objectPos: "object-center",
  },
  {
    title: "Cabramatta Food →",
    to: "/vietnamese-food",
    img: favFood,
    alt: "Vietnamese street food",
    objectPos: "object-[center_88%]",
  },
  {
    title: "Sweet Desserts →",
    to: "/sweet-desserts",
    img: favDessert,
    alt: "Sweet chè and desserts",
    objectPos: "object-[center_70%]",
  },
] as const;

/** Figma — Our Favourites stacked category cards */
export function HomeFavouritesSection() {
  return (
    <section className="relative z-10 px-5 py-14 md:px-6 md:py-20">
        <div className="mx-auto max-w-md md:max-w-2xl lg:max-w-4xl">
          <LeafDivider className="mb-4 text-primary" />
          <h2 className="text-center font-display text-2xl text-heading md:text-3xl">
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
                    className={cn("h-full w-full object-cover", item.objectPos)}
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

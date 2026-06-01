import { createFileRoute, Link } from "@tanstack/react-router";
import { FigmaCategoryPageLayout } from "@/components/figma/FigmaCategoryPageLayout";
import { FigmaFeaturedProduct } from "@/components/figma/FigmaFeaturedProduct";
import { bambuCategoryHero, bambuCategoryThumbs } from "@/lib/bambu-assets";

export const Route = createFileRoute("/desserts")({
  head: () => ({
    meta: [
      { title: "Sweet Desserts — Tráng Miệng | Bambu Cafe & Desserts" },
      {
        name: "description",
        content:
          "The Bambu dessert story — chè, fruit bowls and sweet cups made fresh daily. Discover our craft, then explore the full dessert menu.",
      },
    ],
  }),
  component: DessertsPage,
});

function DessertsPage() {
  const intro = (
    <p className="text-center text-[0.8125rem] leading-relaxed tracking-[0.02em] text-[#2b2b2b]/85 md:text-sm">
      Chè, fruit bowls and sweet cups — layered, colourful and made fresh every day.
    </p>
  );

  return (
    <FigmaCategoryPageLayout
      title="Sweet Desserts"
      breadcrumbCurrent="Signature"
      intro={intro}
      heroImage={bambuCategoryHero.sweetDesserts}
      heroAlt="Bambu sweet desserts"
      orderCta={false}
    >
      <div className="space-y-10">
        <section className="space-y-4 text-center">
          <h2 className="font-display text-2xl text-primary">Our Dessert Story</h2>
          <p className="mx-auto max-w-prose text-sm leading-relaxed text-[#2b2b2b]/80">
            Bambu began with dessert. Our chè is built bowl by bowl — jackfruit, jellies, beans,
            taro and silky coconut milk over crushed ice. From the classic thập cẩm to fresh fruit
            bowls, every cup is a little celebration of Vietnamese sweetness.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-center font-display text-xl text-primary">Sweet Favourites</h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            <FigmaFeaturedProduct name="Bambu Special Chè" image={bambuCategoryThumbs.dessert} compact />
            <FigmaFeaturedProduct name="Fresh Fruit Bowls" image={bambuCategoryThumbs.dessert} compact />
          </div>
        </section>

        <div className="flex justify-center">
          <Link
            to="/sweet-desserts"
            className="inline-flex items-center gap-2 rounded-full bg-[#BD9C30] px-7 py-2.5 text-sm font-semibold tracking-wide text-white shadow-sm transition hover:bg-[#a8892a]"
          >
            View Full Dessert Menu →
          </Link>
        </div>
      </div>
    </FigmaCategoryPageLayout>
  );
}

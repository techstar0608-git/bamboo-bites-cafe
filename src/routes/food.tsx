import { createFileRoute, Link } from "@tanstack/react-router";
import { FigmaCategoryPageLayout } from "@/components/figma/FigmaCategoryPageLayout";
import { FigmaFeaturedProduct } from "@/components/figma/FigmaFeaturedProduct";
import { bambuAbout, bambuCategoryHero, bambuCategoryThumbs } from "@/lib/bambu-assets";

export const Route = createFileRoute("/food")({
  head: () => ({
    meta: [
      { title: "Food — Món Ăn Việt | Bambu Cafe & Desserts" },
      {
        name: "description",
        content:
          "The Bambu food story — Vietnamese street snacks and dishes made fresh. Discover our kitchen, then explore the full food menu.",
      },
    ],
  }),
  component: FoodPage,
});

function FoodPage() {
  const intro = (
    <p className="text-center text-[0.8125rem] leading-relaxed tracking-[0.02em] text-[#2b2b2b]/85 md:text-sm">
      Familiar flavours, made fresh — street snacks and dishes straight from the Vietnamese food
      playbook.
    </p>
  );

  return (
    <FigmaCategoryPageLayout
      title="Food"
      breadcrumbCurrent="Signature"
      intro={intro}
      heroImage={bambuCategoryHero.foods}
      heroAlt="Bambu Vietnamese food"
      orderCta={false}
    >
      <div className="space-y-10">
        <section className="space-y-4 text-center">
          <h2 className="font-display text-2xl text-primary">Our Food Story</h2>
          <p className="mx-auto max-w-prose text-sm leading-relaxed text-[#2b2b2b]/80">
            From grilled skewers and crispy bites to hearty rice and noodle plates, every dish at
            Bambu is a taste of home. We cook the way our families do — fresh herbs, bold sauces and
            the comforting flavours of Vietnamese street corners, served two ways across Cabramatta
            and Canley Heights.
          </p>
        </section>

        <section>
          <h2 className="mb-4 text-center font-display text-xl text-primary">Kitchen Favourites</h2>
          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            <FigmaFeaturedProduct name="Cabramatta Plates" image={bambuCategoryThumbs.food} compact />
            <FigmaFeaturedProduct name="Canley Heights Bites" image={bambuAbout.values[1]} compact />
          </div>
        </section>

        <div className="flex justify-center">
          <Link
            to="/vietnamese-food"
            className="inline-flex items-center gap-2 rounded-full bg-[#BD9C30] px-7 py-2.5 text-sm font-semibold tracking-wide text-white shadow-sm transition hover:bg-[#a8892a]"
          >
            View Full Food Menu →
          </Link>
        </div>
      </div>
    </FigmaCategoryPageLayout>
  );
}

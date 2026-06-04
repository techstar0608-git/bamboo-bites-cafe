import { createFileRoute, Link } from "@tanstack/react-router";
import { FigmaCategoryPageLayout } from "@/components/figma/FigmaCategoryPageLayout";
import { FigmaFeaturedProduct } from "@/components/figma/FigmaFeaturedProduct";
import { LeafDivider } from "@/components/figma/LeafDivider";
import { bambuSignature } from "@/lib/bambu-assets";

export const Route = createFileRoute("/coffee")({
  head: () => ({
    meta: [
      { title: "Coffee — Cà Phê Việt | Bambu Cafe & Desserts" },
      {
        name: "description",
        content:
          "The Bambu coffee story — slow-brewed Vietnamese coffee, salted cream and coconut classics. Discover our craft, then explore the full coffee menu.",
      },
    ],
  }),
  component: CoffeePage,
});

function CoffeePage() {
  const intro = (
    <p className="text-center text-[0.8125rem] leading-relaxed tracking-[0.02em] text-[#2b2b2b]/85 md:text-sm">
      Vietnamese coffee, done the way it was meant to be — bold, slow-brewed through a phin, and
      perfectly balanced with condensed milk.
    </p>
  );

  return (
    <FigmaCategoryPageLayout
      title="Coffee"
      breadcrumbCurrent="Coffee"
      intro={intro}
      heroImage={bambuSignature.hero}
      heroAlt="Signature Bambu coffee"
      orderCta={false}
    >
      <div className="space-y-10">
        <section className="space-y-4 text-center">
          <h2 className="font-display text-2xl text-heading">Our Coffee Story</h2>
          <p className="mx-auto max-w-prose text-sm leading-relaxed text-[#2b2b2b]/80">
            Every cup at Bambu starts with robusta beans roasted dark and brewed slow. It's the
            taste of Saigon street corners and family kitchens — strong enough to stand up to ice,
            sweet enough to keep you coming back. From the classic cà phê sữa đá to our signature
            salted-cream and coconut blends, this is coffee with a story in every sip.
          </p>
        </section>

        <section>
          <h2 className="mb-6 text-center font-display text-xl text-heading">Signature Pours</h2>
          <div className="space-y-6">
            <FigmaFeaturedProduct name="Vietnamese Salted Coffee" image={bambuSignature.salted} />
            <LeafDivider className="text-primary" />
            <FigmaFeaturedProduct name="Vietnamese Coconut Coffee" image={bambuSignature.coconut} />
          </div>
        </section>

        <div className="flex justify-center">
          <Link
            to="/iced-coffee"
            className="inline-flex items-center gap-2 rounded-full bg-[#BD9C30] px-7 py-2.5 text-sm font-semibold tracking-wide text-white shadow-sm transition hover:bg-[#a8892a]"
          >
            View Full Coffee Menu →
          </Link>
        </div>
      </div>
    </FigmaCategoryPageLayout>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { FigmaCategoryPageLayout } from "@/components/figma/FigmaCategoryPageLayout";
import { MenuLeaderBoard, MenuOrderNow } from "@/components/bambu/MenuLeaderBoard";
import { bambuCategoryHero, bambuCategoryThumbs } from "@/lib/bambu-assets";
import { SMOOTHIES } from "@/data/uber-menu.generated";

export const Route = createFileRoute("/smoothies")({
  head: () => ({
    meta: [
      { title: "Smoothies — Sinh Tố | Bambu Cafe & Desserts" },
      {
        name: "description",
        content:
          "Blended Vietnamese fruit smoothies from the Bambu menu — pickup and Uber Eats pricing.",
      },
    ],
  }),
  component: SmoothiesPage,
});

function SmoothiesPage() {
  return (
    <FigmaCategoryPageLayout
      title="Smoothies"
      breadcrumbCurrent="Menu"
      heroImage={bambuCategoryHero.smoothies}
      heroAlt="Smoothies"
    >
      <MenuLeaderBoard
        items={SMOOTHIES}
        placeholderImg={bambuCategoryThumbs.coffee}
        section="smoothies"
      />
      <MenuOrderNow />
    </FigmaCategoryPageLayout>
  );
}

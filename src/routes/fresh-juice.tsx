import { createFileRoute } from "@tanstack/react-router";
import { FigmaCategoryPageLayout } from "@/components/figma/FigmaCategoryPageLayout";
import { MenuLeaderBoard, MenuOrderNow } from "@/components/bambu/MenuLeaderBoard";
import { bambuCategoryHero, bambuCategoryThumbs } from "@/lib/bambu-assets";
import { FRESH_JUICE } from "@/data/uber-menu.generated";

export const Route = createFileRoute("/fresh-juice")({
  head: () => ({
    meta: [
      { title: "Fresh Juice — Nước Ép | Bambu Cafe & Desserts" },
      {
        name: "description",
        content:
          "Cold-pressed and fresh fruit juices from the Bambu menu — pickup and Uber Eats pricing.",
      },
    ],
  }),
  component: FreshJuicePage,
});

function FreshJuicePage() {
  return (
    <FigmaCategoryPageLayout
      title="Fresh Juice"
      breadcrumbCurrent="Menu"
      heroImage={bambuCategoryHero.freshJuice}
      heroAlt="Fresh juice"
    >
      <MenuLeaderBoard
        items={FRESH_JUICE}
        placeholderImg={bambuCategoryThumbs.coffee}
        section="fresh-juice"
      />
      <MenuOrderNow />
    </FigmaCategoryPageLayout>
  );
}

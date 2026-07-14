import { createFileRoute } from "@tanstack/react-router";
import { FigmaCategoryPageLayout } from "@/components/figma/FigmaCategoryPageLayout";
import { MenuLeaderBoard, MenuOrderNow } from "@/components/bambu/MenuLeaderBoard";
import { bambuCategoryHero, bambuCategoryThumbs } from "@/lib/bambu-assets";
import { OVER_ICE } from "@/data/uber-menu.generated";

export const Route = createFileRoute("/iced-coffee")({
  head: () => ({
    meta: [
      { title: "Over Ice — Cà Phê Đá | Bambu Cafe & Desserts" },
      {
        name: "description",
        content:
          "Full over-ice menu — Vietnamese salted, coconut, condensed milk coffee, iced lattes and more. Pickup and delivery prices.",
      },
    ],
  }),
  component: OverIcePage,
});

function OverIcePage() {
  return (
    <FigmaCategoryPageLayout
      title="Over Ice"
      breadcrumbCurrent="Menu"
      heroImage={bambuCategoryHero.icedCoffee}
      heroAlt="Over ice drinks"
    >
      <MenuLeaderBoard
        items={OVER_ICE}
        placeholderImg={bambuCategoryThumbs.coffee}
        section="over-ice"
      />
      <MenuOrderNow />
    </FigmaCategoryPageLayout>
  );
}

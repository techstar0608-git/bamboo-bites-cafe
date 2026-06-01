import { createFileRoute } from "@tanstack/react-router";
import { FigmaCategoryPageLayout } from "@/components/figma/FigmaCategoryPageLayout";
import { MenuLeaderBoard, MenuOrderNow } from "@/components/bambu/MenuLeaderBoard";
import { bambuCategoryHero, bambuCategoryThumbs } from "@/lib/bambu-assets";
import { ICED_COFFEE } from "@/data/uber-menu.generated";

export const Route = createFileRoute("/iced-coffee")({
  head: () => ({
    meta: [
      { title: "Iced Coffee — Cà Phê Đá | Bambu Cafe & Desserts" },
      {
        name: "description",
        content:
          "Full iced coffee menu from Bambu Uber — Vietnamese salted, coconut, condensed milk coffee and more. Pickup and Uber Eats prices.",
      },
    ],
  }),
  component: IcedCoffeePage,
});

function IcedCoffeePage() {
  return (
    <FigmaCategoryPageLayout
      title="Iced Coffee"
      breadcrumbCurrent="Menu"
      heroImage={bambuCategoryHero.icedCoffee}
      heroAlt="Iced coffee"
    >
      <MenuLeaderBoard
        items={ICED_COFFEE}
        placeholderImg={bambuCategoryThumbs.coffee}
        section="iced-coffee"
      />
      <MenuOrderNow />
    </FigmaCategoryPageLayout>
  );
}

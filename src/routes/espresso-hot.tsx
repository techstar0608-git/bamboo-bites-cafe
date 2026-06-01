import { createFileRoute } from "@tanstack/react-router";
import { FigmaCategoryPageLayout } from "@/components/figma/FigmaCategoryPageLayout";
import { MenuLeaderBoard, MenuOrderNow } from "@/components/bambu/MenuLeaderBoard";
import { bambuCategoryHero, bambuCategoryThumbs } from "@/lib/bambu-assets";
import { ESPRESSO_HOT } from "@/data/uber-menu.generated";

export const Route = createFileRoute("/espresso-hot")({
  head: () => ({
    meta: [
      { title: "Hot Coffee & Espresso — Cà Phê Nóng | Bambu Cafe & Desserts" },
      {
        name: "description",
        content:
          "Hot Vietnamese coffee and espresso drinks from the Bambu menu — pickup and Uber Eats pricing.",
      },
    ],
  }),
  component: EspressoHotPage,
});

function EspressoHotPage() {
  return (
    <FigmaCategoryPageLayout
      title="Hot Coffee & Espresso"
      breadcrumbCurrent="Menu"
      heroImage={bambuCategoryHero.hotCoffee}
      heroAlt="Hot coffee & espresso"
    >
      <MenuLeaderBoard
        items={ESPRESSO_HOT}
        placeholderImg={bambuCategoryThumbs.coffee}
        section="espresso-hot"
      />
      <MenuOrderNow />
    </FigmaCategoryPageLayout>
  );
}

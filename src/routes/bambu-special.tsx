import { createFileRoute } from "@tanstack/react-router";
import { FigmaCategoryPageLayout } from "@/components/figma/FigmaCategoryPageLayout";
import { MenuLeaderBoard, MenuOrderNow } from "@/components/bambu/MenuLeaderBoard";
import { bambuCategoryHero, bambuCategoryThumbs } from "@/lib/bambu-assets";
import { BAMBU_SPECIAL } from "@/data/uber-menu.generated";

export const Route = createFileRoute("/bambu-special")({
  head: () => ({
    meta: [
      { title: "Bambu Special Menu | Bambu Cafe & Desserts" },
      {
        name: "description",
        content:
          "Bambu's signature specials — avocado coconut lattes, milo, coconut jelly milks and more. Pickup and delivery prices.",
      },
    ],
  }),
  component: BambuSpecialPage,
});

function BambuSpecialPage() {
  return (
    <FigmaCategoryPageLayout
      title="Bambu Special Menu"
      breadcrumbCurrent="Menu"
      heroImage={bambuCategoryHero.newDrink}
      heroAlt="Bambu special drinks"
    >
      <MenuLeaderBoard
        items={BAMBU_SPECIAL}
        placeholderImg={bambuCategoryThumbs.coffee}
        section="bambu-special"
      />
      <MenuOrderNow />
    </FigmaCategoryPageLayout>
  );
}

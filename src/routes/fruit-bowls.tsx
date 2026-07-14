import { createFileRoute } from "@tanstack/react-router";
import { FigmaCategoryPageLayout } from "@/components/figma/FigmaCategoryPageLayout";
import { MenuLeaderBoard, MenuOrderNow } from "@/components/bambu/MenuLeaderBoard";
import { bambuCategoryHero, bambuCategoryThumbs } from "@/lib/bambu-assets";
import { SMASHED_FRUIT } from "@/data/uber-menu.generated";

export const Route = createFileRoute("/fruit-bowls")({
  head: () => ({
    meta: [
      { title: "Smashed Fruit & Sweets — Dầm Trái Cây | Bambu Cafe & Desserts" },
      {
        name: "description",
        content:
          "Smashed fruit bowls & sweet cups — dầm trái cây with pickup & delivery pricing from the Bambu menu.",
      },
    ],
  }),
  component: SmashedFruitPage,
});

function SmashedFruitPage() {
  return (
    <FigmaCategoryPageLayout
      title="Smashed Fruit & Sweets"
      breadcrumbCurrent="Menu"
      heroImage={bambuCategoryHero.fruitBowls}
      heroAlt="Smashed fruit & sweets"
    >
      <MenuLeaderBoard
        items={SMASHED_FRUIT}
        placeholderImg={bambuCategoryThumbs.dessert}
        section="smashed-fruit"
      />
      <MenuOrderNow />
    </FigmaCategoryPageLayout>
  );
}

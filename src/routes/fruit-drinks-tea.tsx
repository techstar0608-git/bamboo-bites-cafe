import { createFileRoute } from "@tanstack/react-router";
import { FigmaCategoryPageLayout } from "@/components/figma/FigmaCategoryPageLayout";
import { MenuLeaderBoard, MenuOrderNow } from "@/components/bambu/MenuLeaderBoard";
import { bambuCategoryHero, bambuCategoryThumbs } from "@/lib/bambu-assets";
import { FRUIT_DRINKS_TEA } from "@/data/uber-menu.generated";

export const Route = createFileRoute("/fruit-drinks-tea")({
  head: () => ({
    meta: [
      { title: "Fruit Drinks & Tea — Trà Trái Cây | Bambu Cafe & Desserts" },
      {
        name: "description",
        content:
          "Refreshing Vietnamese fruit teas and tea drinks from the Bambu menu — pickup and Uber Eats pricing.",
      },
    ],
  }),
  component: FruitDrinksTeaPage,
});

function FruitDrinksTeaPage() {
  return (
    <FigmaCategoryPageLayout
      title="Fruit Drinks & Tea"
      breadcrumbCurrent="Menu"
      heroImage={bambuCategoryHero.fruitDrinksTea}
      heroAlt="Fruit drinks & tea"
    >
      <MenuLeaderBoard
        items={FRUIT_DRINKS_TEA}
        placeholderImg={bambuCategoryThumbs.coffee}
        section="fruit-drinks"
      />
      <MenuOrderNow />
    </FigmaCategoryPageLayout>
  );
}

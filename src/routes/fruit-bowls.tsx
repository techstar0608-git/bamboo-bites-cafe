import { createFileRoute } from "@tanstack/react-router";
import { FigmaCategoryPageLayout } from "@/components/figma/FigmaCategoryPageLayout";
import { MenuLeaderBoard, MenuOrderNow } from "@/components/bambu/MenuLeaderBoard";
import { bambuCategoryHero, bambuCategoryThumbs } from "@/lib/bambu-assets";
import { FRUIT_BOWLS_DESSERT } from "@/data/uber-menu.generated";

export const Route = createFileRoute("/fruit-bowls")({
  head: () => ({
    meta: [
      { title: "Fruit Bowls & Dessert — Dầm Trái Cây | Bambu Cafe & Desserts" },
      {
        name: "description",
        content:
          "Fruit bowls & dessert cups — dầm trái cây with pickup & Uber pricing from the Bambu Uber spreadsheet.",
      },
    ],
  }),
  component: FruitBowlsPage,
});

function FruitBowlsPage() {
  return (
    <FigmaCategoryPageLayout
      title="Fruit Bowls"
      breadcrumbCurrent="Menu"
      heroImage={bambuCategoryHero.fruitBowls}
      heroAlt="Fruit bowls & dessert"
    >
      <div className="space-y-10">
        <MenuLeaderBoard
          heading="Fruit bowls & more"
          items={FRUIT_BOWLS_DESSERT}
          placeholderImg={bambuCategoryThumbs.dessert}
          section="fruit-bowls"
        />
      </div>
      <MenuOrderNow />
    </FigmaCategoryPageLayout>
  );
}

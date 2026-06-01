import { createFileRoute } from "@tanstack/react-router";
import { FigmaCategoryPageLayout } from "@/components/figma/FigmaCategoryPageLayout";
import { MenuLeaderBoard, MenuOrderNow } from "@/components/bambu/MenuLeaderBoard";
import { bambuCategoryHero, bambuCategoryThumbs } from "@/lib/bambu-assets";
import { FRUIT_BOWLS_DESSERT, SWEET_DESSERT } from "@/data/uber-menu.generated";

export const Route = createFileRoute("/sweet-desserts")({
  head: () => ({
    meta: [
      { title: "Sweet Desserts — Tráng Miệng | Bambu Cafe & Desserts" },
      {
        name: "description",
        content:
          "Chè, fruit bowls, dầm trái cây — full dessert menu from the Bambu Uber spreadsheet with pickup & Uber pricing.",
      },
    ],
  }),
  component: SweetDessertsPage,
});

function SweetDessertsPage() {
  return (
    <FigmaCategoryPageLayout
      title="Sweet Desserts"
      breadcrumbCurrent="Menu"
      heroImage={bambuCategoryHero.sweetDesserts}
      heroAlt="Sweet desserts"
    >
      <div className="space-y-10">
        <MenuLeaderBoard
          heading="Chè & sweet cups"
          items={SWEET_DESSERT}
          placeholderImg={bambuCategoryThumbs.dessert}
          section="sweet-dessert"
        />
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

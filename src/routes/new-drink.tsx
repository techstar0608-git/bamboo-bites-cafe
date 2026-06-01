import { createFileRoute } from "@tanstack/react-router";
import { FigmaCategoryPageLayout } from "@/components/figma/FigmaCategoryPageLayout";
import { MenuLeaderBoard, MenuOrderNow } from "@/components/bambu/MenuLeaderBoard";
import { bambuCategoryHero, bambuCategoryThumbs } from "@/lib/bambu-assets";
import { NEW_DRINK } from "@/data/uber-menu.generated";

export const Route = createFileRoute("/new-drink")({
  head: () => ({
    meta: [
      { title: "New Drinks — Món Mới | Bambu Cafe & Desserts" },
      {
        name: "description",
        content:
          "The latest new drinks from the Bambu menu — pickup and Uber Eats pricing.",
      },
    ],
  }),
  component: NewDrinkPage,
});

function NewDrinkPage() {
  return (
    <FigmaCategoryPageLayout
      title="New Drinks"
      breadcrumbCurrent="Menu"
      heroImage={bambuCategoryHero.newDrink}
      heroAlt="New drinks"
    >
      <MenuLeaderBoard
        items={NEW_DRINK}
        placeholderImg={bambuCategoryThumbs.coffee}
        section="new-drink"
      />
      <MenuOrderNow />
    </FigmaCategoryPageLayout>
  );
}

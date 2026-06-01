import { createFileRoute } from "@tanstack/react-router";
import { FigmaCategoryPageLayout } from "@/components/figma/FigmaCategoryPageLayout";
import { MenuLeaderBoard, MenuOrderNow } from "@/components/bambu/MenuLeaderBoard";
import { bambuCategoryHero, bambuCategoryThumbs } from "@/lib/bambu-assets";
import { MATCHA } from "@/data/uber-menu.generated";

export const Route = createFileRoute("/matcha")({
  head: () => ({
    meta: [
      { title: "Matcha Drinks — Trà Xanh | Bambu Cafe & Desserts" },
      {
        name: "description",
        content:
          "Whipped matcha lattes and matcha drinks from the Bambu menu — pickup and Uber Eats pricing.",
      },
    ],
  }),
  component: MatchaPage,
});

function MatchaPage() {
  return (
    <FigmaCategoryPageLayout
      title="Matcha Drinks"
      breadcrumbCurrent="Menu"
      heroImage={bambuCategoryHero.matcha}
      heroAlt="Matcha drinks"
    >
      <MenuLeaderBoard
        items={MATCHA}
        placeholderImg={bambuCategoryThumbs.coffee}
        section="matcha"
      />
      <MenuOrderNow />
    </FigmaCategoryPageLayout>
  );
}

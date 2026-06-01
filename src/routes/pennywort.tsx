import { createFileRoute } from "@tanstack/react-router";
import { FigmaCategoryPageLayout } from "@/components/figma/FigmaCategoryPageLayout";
import { MenuLeaderBoard, MenuOrderNow } from "@/components/bambu/MenuLeaderBoard";
import { bambuCategoryHero, bambuCategoryThumbs } from "@/lib/bambu-assets";
import { PENNYWORT } from "@/data/uber-menu.generated";

export const Route = createFileRoute("/pennywort")({
  head: () => ({
    meta: [
      { title: "Pennywort Drinks — Rau Má | Bambu Cafe & Desserts" },
      {
        name: "description",
        content:
          "Refreshing pennywort (rau má) drinks from the Bambu menu — pickup and Uber Eats pricing.",
      },
    ],
  }),
  component: PennywortPage,
});

function PennywortPage() {
  return (
    <FigmaCategoryPageLayout
      title="Pennywort Drinks"
      breadcrumbCurrent="Menu"
      heroImage={bambuCategoryHero.pennywort}
      heroAlt="Pennywort drinks"
    >
      <MenuLeaderBoard
        items={PENNYWORT}
        placeholderImg={bambuCategoryThumbs.coffee}
        section="pennywort"
      />
      <MenuOrderNow />
    </FigmaCategoryPageLayout>
  );
}

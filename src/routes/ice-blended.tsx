import { createFileRoute } from "@tanstack/react-router";
import { FigmaCategoryPageLayout } from "@/components/figma/FigmaCategoryPageLayout";
import { MenuLeaderBoard, MenuOrderNow } from "@/components/bambu/MenuLeaderBoard";
import { bambuCategoryHero, bambuCategoryThumbs } from "@/lib/bambu-assets";
import { ICE_BLENDED } from "@/data/uber-menu.generated";

export const Route = createFileRoute("/ice-blended")({
  head: () => ({
    meta: [
      { title: "Ice Blended — Đá Xay | Bambu Cafe & Desserts" },
      {
        name: "description",
        content:
          "Blended ice drinks from the Bambu menu — matcha, fruit and coffee. Pickup and Uber Eats pricing.",
      },
    ],
  }),
  component: IceBlendedPage,
});

function IceBlendedPage() {
  return (
    <FigmaCategoryPageLayout
      title="Ice Blended"
      breadcrumbCurrent="Menu"
      heroImage={bambuCategoryHero.iceBlended}
      heroAlt="Ice blended"
    >
      <MenuLeaderBoard
        items={ICE_BLENDED}
        placeholderImg={bambuCategoryThumbs.coffee}
        section="ice-blended"
      />
      <MenuOrderNow />
    </FigmaCategoryPageLayout>
  );
}

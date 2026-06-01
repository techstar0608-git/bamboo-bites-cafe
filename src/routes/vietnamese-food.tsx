import { createFileRoute } from "@tanstack/react-router";
import { FigmaCategoryPageLayout } from "@/components/figma/FigmaCategoryPageLayout";
import { MenuLeaderBoard, MenuOrderNow } from "@/components/bambu/MenuLeaderBoard";
import { bambuCategoryHero, bambuCategoryThumbs } from "@/lib/bambu-assets";
import { FOOD_CABRAMATTA, FOOD_CANLEY_HEIGHTS } from "@/data/uber-menu.generated";

export const Route = createFileRoute("/vietnamese-food")({
  head: () => ({
    meta: [
      { title: "Vietnamese Food — Ăn Vặt Việt Nam | Bambu" },
      {
        name: "description",
        content:
          "Street snacks and combos — Cabramatta and Canley Heights Uber menu prices from the live workbook.",
      },
    ],
  }),
  component: VietnameseFoodPage,
});

function VietnameseFoodPage() {
  const intro = (
    <p className="text-center text-[0.8125rem] leading-relaxed tracking-[0.02em] text-[#2b2b2b]/85 md:text-sm">
      Familiar flavours, made fresh — street snacks and dishes straight from the Vietnamese food playbook.
    </p>
  );

  return (
    <FigmaCategoryPageLayout
      title="Foods"
      breadcrumbCurrent="Menu"
      intro={intro}
      heroImage={bambuCategoryHero.foods}
      heroAlt="Vietnamese foods"
    >
      <div className="space-y-10">
        <MenuLeaderBoard
          heading="Cabramatta"
          items={FOOD_CABRAMATTA}
          placeholderImg={bambuCategoryThumbs.food}
          section="food"
        />
        <MenuLeaderBoard
          heading="Canley Heights"
          items={FOOD_CANLEY_HEIGHTS}
          placeholderImg={bambuCategoryThumbs.food}
          section="food"
        />
      </div>
      <MenuOrderNow />
    </FigmaCategoryPageLayout>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { FigmaBambooWave } from "@/components/figma/FigmaBambooWave";
import { FigmaPageFooter } from "@/components/figma/FigmaPageFooter";
import { FigmaPageHero } from "@/components/figma/FigmaPageHero";
import { HomeFindUsSection } from "@/components/home/HomeFindUsSection";
import {
  MenuCategoryExplorer,
  type MenuCategory,
} from "@/components/bambu/MenuCategoryExplorer";
import { bambuCategoryThumbs, bambuMenuHero } from "@/lib/bambu-assets";
import {
  BAMBU_SPECIAL,
  ESPRESSO_HOT,
  FOOD_CANLEY_HEIGHTS,
  FRESH_JUICE,
  FRUIT_DRINKS_TEA,
  ICE_BLENDED,
  MATCHA,
  OVER_ICE,
  SMASHED_FRUIT,
  SMOOTHIES,
  SWEET_DESSERT,
} from "@/data/uber-menu.generated";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu Hub — Bambu Cafe & Desserts" },
      {
        name: "description",
        content:
          "Browse our full menu on one page — iced coffee, Vietnamese street snacks and sweet desserts, grouped by category with photos and pricing.",
      },
    ],
  }),
  component: MenuHubPage,
});

const { coffee, dessert, food } = bambuCategoryThumbs;

// Order mirrors the Figma "Our Menu" grid. Each entry becomes a chip + a section.
const MENU_CATEGORIES: MenuCategory[] = [
  {
    id: "sweet-desserts",
    label: "Sweet Desserts",
    boards: [{ items: SWEET_DESSERT, placeholderImg: dessert, section: "sweet-dessert" }],
  },
  {
    id: "smashed-fruit",
    label: "Smashed Fruit & Sweets",
    boards: [{ items: SMASHED_FRUIT, placeholderImg: dessert, section: "smashed-fruit" }],
  },
  {
    id: "matcha",
    label: "Matcha Drinks",
    boards: [{ items: MATCHA, placeholderImg: coffee, section: "matcha" }],
  },
  {
    id: "fruit-drinks-tea",
    label: "Fruit Drinks & Tea",
    boards: [{ items: FRUIT_DRINKS_TEA, placeholderImg: coffee, section: "fruit-drinks" }],
  },
  {
    id: "fresh-juice",
    label: "Fresh Juice",
    boards: [{ items: FRESH_JUICE, placeholderImg: coffee, section: "fresh-juice" }],
  },
  {
    id: "over-ice",
    label: "Over Ice",
    boards: [{ items: OVER_ICE, placeholderImg: coffee, section: "over-ice" }],
  },
  {
    id: "espresso-hot",
    label: "Espresso (Hot)",
    boards: [{ items: ESPRESSO_HOT, placeholderImg: coffee, section: "espresso-hot" }],
  },
  {
    id: "ice-blended",
    label: "Ice Blended",
    boards: [{ items: ICE_BLENDED, placeholderImg: coffee, section: "ice-blended" }],
  },
  {
    id: "smoothies",
    label: "Smoothies",
    boards: [{ items: SMOOTHIES, placeholderImg: coffee, section: "smoothies" }],
  },
  {
    id: "bambu-special",
    label: "Bambu Special Menu",
    boards: [{ items: BAMBU_SPECIAL, placeholderImg: coffee, section: "bambu-special" }],
  },
  {
    id: "foods",
    label: "Canley Foods",
    boards: [{ items: FOOD_CANLEY_HEIGHTS, placeholderImg: food, section: "food" }],
  },
];

function MenuHubPage() {
  return (
    <div className="bg-cream">
      <FigmaPageHero
        video={bambuMenuHero.video}
        poster={bambuMenuHero.poster}
        alt="Bambu menu highlights"
        overlayTitle="Our Menu"
        overlayBreadcrumb={{ current: "Menu" }}
      />
      <p className="mx-auto max-w-3xl px-5 pt-8 text-center text-[0.8125rem] leading-relaxed tracking-[0.02em] text-[#2b2b2b]/85 md:px-6 md:text-sm">
        Explore everything we have to offer — from Vietnamese coffee to desserts and street food
        bites.
      </p>
      <MenuCategoryExplorer categories={MENU_CATEGORIES} />
      <FigmaBambooWave />
      <HomeFindUsSection />
      <FigmaPageFooter />
    </div>
  );
}

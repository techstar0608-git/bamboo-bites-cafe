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
  ESPRESSO_HOT,
  FOOD_CABRAMATTA,
  FOOD_CANLEY_HEIGHTS,
  FRESH_JUICE,
  FRUIT_BOWLS_DESSERT,
  FRUIT_DRINKS_TEA,
  ICE_BLENDED,
  ICED_COFFEE,
  MATCHA,
  NEW_DRINK,
  PENNYWORT,
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
    boards: [
      { heading: "Chè & sweet cups", items: SWEET_DESSERT, placeholderImg: dessert, section: "sweet-dessert" },
      { heading: "Fruit bowls & more", items: FRUIT_BOWLS_DESSERT, placeholderImg: dessert, section: "fruit-bowls" },
    ],
  },
  {
    id: "smoothies",
    label: "Smoothies",
    boards: [{ items: SMOOTHIES, placeholderImg: coffee, section: "smoothies" }],
  },
  {
    id: "fresh-juice",
    label: "Fresh Juice",
    boards: [{ items: FRESH_JUICE, placeholderImg: coffee, section: "fresh-juice" }],
  },
  {
    id: "pennywort",
    label: "Pennywort Drinks",
    boards: [{ items: PENNYWORT, placeholderImg: coffee, section: "pennywort" }],
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
    id: "ice-blended",
    label: "Ice Blended",
    boards: [{ items: ICE_BLENDED, placeholderImg: coffee, section: "ice-blended" }],
  },
  {
    id: "iced-coffee",
    label: "Iced Coffee",
    boards: [{ items: ICED_COFFEE, placeholderImg: coffee, section: "iced-coffee" }],
  },
  {
    id: "hot-coffee",
    label: "Hot Coffee",
    boards: [{ items: ESPRESSO_HOT, placeholderImg: coffee, section: "espresso-hot" }],
  },
  {
    id: "new-drinks",
    label: "New Drinks",
    boards: [{ items: NEW_DRINK, placeholderImg: coffee, section: "new-drink" }],
  },
  {
    id: "foods",
    label: "Foods",
    boards: [
      { heading: "Cabramatta", items: FOOD_CABRAMATTA, placeholderImg: food, section: "food" },
      { heading: "Canley Heights", items: FOOD_CANLEY_HEIGHTS, placeholderImg: food, section: "food" },
    ],
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

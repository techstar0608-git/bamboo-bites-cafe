import { createFileRoute } from "@tanstack/react-router";
import { FigmaBambooWave } from "@/components/figma/FigmaBambooWave";
import { FigmaMenuGrid, type FigmaMenuGridItem } from "@/components/figma/FigmaMenuGrid";
import { FigmaPageFooter } from "@/components/figma/FigmaPageFooter";
import { FigmaPageHero } from "@/components/figma/FigmaPageHero";
import { FigmaPillButton } from "@/components/home/FigmaPillButton";
import { HomeFindUsSection } from "@/components/home/HomeFindUsSection";
import { bambuMenuGridImages, bambuMenuHero } from "@/lib/bambu-assets";
import { UBER_EATS_DEFAULT } from "@/lib/branches";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu Hub — Bambu Cafe & Desserts" },
      {
        name: "description",
        content:
          "Browse iced coffee, Vietnamese street snacks and sweet desserts — each course has its own page with photos and STT ảnh references.",
      },
    ],
  }),
  component: MenuHubPage,
});

const MENU_LABELS = [
  { label: "Sweet Desserts →", to: "/sweet-desserts" },
  { label: "Fruit Bowls →", to: "/sweet-desserts" },
  { label: "Pennywort Drinks →", to: "/pennywort" },
  { label: "Fresh Juice →", to: "/fresh-juice" },
  { label: "Matcha Drinks →", to: "/matcha" },
  { label: "Fruit Drinks & Tea →", to: "/fruit-drinks-tea" },
  { label: "Ice Blended →", to: "/ice-blended" },
  { label: "Iced Coffee →", to: "/iced-coffee" },
  { label: "Hot Coffee →", to: "/espresso-hot" },
  { label: "New Drinks →", to: "/new-drink" },
  { label: "Foods →", to: "/vietnamese-food" },
  { label: "Smoothies →", to: "/smoothies" },
] as const;

const MENU_GRID: FigmaMenuGridItem[] = MENU_LABELS.map((item, i) => ({
  ...item,
  image: bambuMenuGridImages[i] ?? bambuMenuGridImages[0],
}));

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
      <div className="mx-auto max-w-3xl">
        <p className="px-5 pt-8 text-center text-[0.8125rem] leading-relaxed tracking-[0.02em] text-[#2b2b2b]/85 md:px-6 md:text-sm">
          Explore everything we have to offer — from Vietnamese coffee to desserts and street food
          bites.
        </p>
        <div className="px-5 py-8 md:px-6">
          <FigmaMenuGrid items={MENU_GRID} />
        </div>
        <div className="flex justify-center px-5 pb-8">
          <FigmaPillButton href={UBER_EATS_DEFAULT} target="_blank" rel="noreferrer">
            Order Now →
          </FigmaPillButton>
        </div>
      </div>
      <FigmaBambooWave />
      <HomeFindUsSection />
      <FigmaPageFooter />
    </div>
  );
}

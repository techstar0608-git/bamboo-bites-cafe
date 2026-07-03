import { createFileRoute } from "@tanstack/react-router";
import { HomeCategoryStrip } from "@/components/home/HomeCategoryStrip";
import { HomePopularSection } from "@/components/home/HomePopularSection";
import { HomeFindUsSection } from "@/components/home/HomeFindUsSection";
import { HomeHeroFigma } from "@/components/home/HomeHeroFigma";
import { HomeLocalsStatsSection } from "@/components/home/HomeLocalsStatsSection";
import { HomeNewDrinkSection } from "@/components/home/HomeNewDrinkSection";
import { HomeOurStorySection } from "@/components/home/HomeOurStorySection";
import { FigmaPageFooter } from "@/components/figma/FigmaPageFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bambu Cafe & Desserts — Cabramatta & Canley Heights NSW" },
      {
        name: "description",
        content:
          "Born in Sydney's southwest: Vietnamese coffee, dessert bowls and street-food bites. Two locations, one family — Bambu Cafe & Desserts.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <HomeHeroFigma />
      <HomeCategoryStrip />
      <HomeOurStorySection />
      <HomeNewDrinkSection />
      <HomePopularSection />
      <HomeLocalsStatsSection />
      <HomeFindUsSection />
      <FigmaPageFooter />
    </>
  );
}

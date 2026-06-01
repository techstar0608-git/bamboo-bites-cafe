import type { ReactNode } from "react";
import { FigmaBambooWave } from "@/components/figma/FigmaBambooWave";
import { FigmaPageFooter } from "@/components/figma/FigmaPageFooter";
import { FigmaPageHero } from "@/components/figma/FigmaPageHero";
import { FigmaPillButton } from "@/components/home/FigmaPillButton";
import { HomeFindUsSection } from "@/components/home/HomeFindUsSection";
import { UBER_EATS_DEFAULT } from "@/lib/branches";

type FigmaCategoryPageLayoutProps = {
  title: string;
  breadcrumbCurrent?: string;
  heroImage?: string;
  heroAlt?: string;
  intro?: ReactNode;
  orderCta?: boolean;
  showFindUs?: boolean;
  children: ReactNode;
};

/** Shared shell for Figma category pages (menu, coffee, desserts, food) */
export function FigmaCategoryPageLayout({
  title,
  breadcrumbCurrent = "Menu",
  heroImage,
  heroAlt,
  intro,
  orderCta = true,
  showFindUs = true,
  children,
}: FigmaCategoryPageLayoutProps) {
  return (
    <div className="bg-cream">
      <FigmaPageHero
        image={heroImage}
        alt={heroAlt}
        overlayTitle={title}
        overlayBreadcrumb={{ current: breadcrumbCurrent }}
      />
      <div className="mx-auto max-w-3xl">
        {intro ? <div className="px-5 pb-6 pt-8 md:px-6">{intro}</div> : null}
        {orderCta ? (
          <div className="flex justify-center px-5 pb-8">
            <FigmaPillButton href={UBER_EATS_DEFAULT} target="_blank" rel="noreferrer">
              Order Now →
            </FigmaPillButton>
          </div>
        ) : null}
      </div>
      <FigmaBambooWave />
      <div className="mx-auto max-w-3xl px-5 py-8 md:px-6">{children}</div>
      {showFindUs ? <HomeFindUsSection /> : null}
      <FigmaPageFooter />
    </div>
  );
}

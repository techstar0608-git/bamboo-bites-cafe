import { createFileRoute } from "@tanstack/react-router";
import valuePillarsImg from "@/assets/Bambu/icons/value-pillars.png";
import aboutHeroFig from "@/assets/Bambu/about-figma/about-hero.jpg";
import aboutBrandStoryFig from "@/assets/Bambu/about-figma/about-brand-story.jpg";
import aboutCounterFig from "@/assets/Bambu/about-figma/about-counter.jpg";
import aboutFruitFig from "@/assets/Bambu/about-figma/about-fruit.jpg";
import { FigmaBambooWave } from "@/components/figma/FigmaBambooWave";
import { FigmaPageFooter } from "@/components/figma/FigmaPageFooter";
import { FigmaPageHero } from "@/components/figma/FigmaPageHero";
import { HomeFindUsSection } from "@/components/home/HomeFindUsSection";
import { bambuAbout } from "@/lib/bambu-assets";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Bambu Cafe & Desserts" },
      {
        name: "description",
        content:
          "Vietnamese-inspired cafe in Sydney's southwest — handcrafted drinks, traditional desserts and two welcoming locations.",
      },
      { property: "og:title", content: "About Us — Bambu Cafe & Desserts" },
      {
        property: "og:description",
        content: "Vietnamese roots, made to share, rooted in Canley Heights and Cabramatta.",
      },
    ],
  }),
  component: AboutPage,
});

const VALUES = ["Vietnamese Roots", "Made to Share", "Rooted in the Community"] as const;

function AboutPage() {
  return (
    <div className="bg-cream">
      <FigmaPageHero
        image={aboutHeroFig}
        alt="Inside Bambu cafe"
        overlayTitle="Who We Are"
        overlayBreadcrumb={{ current: "About" }}
      />
      <div className="mx-auto max-w-3xl">
        <div className="space-y-5 px-5 py-8 text-center text-[0.8125rem] leading-relaxed tracking-[0.02em] text-[#2b2b2b] md:px-6 md:text-sm">
          <p>
            Bambu Cafe &amp; Desserts is a Vietnamese-inspired cafe serving handcrafted drinks,
            traditional desserts, and light bites across two locations in Sydney&apos;s southwest —
            Canley Heights and Cabramatta.
          </p>
          <p>
            We started in Canley Heights in 2025 with one simple idea: a place where people feel at
            home. A table for a family catching up, a corner for friends sharing something sweet, a
            quiet cup of coffee in the middle of a busy day.
          </p>
          <p>
            Everything we make is designed to bring people together — from the slow-brewed Vietnamese
            coffee to the colourful dessert bowls that become the centrepiece of every table.
          </p>
        </div>

        <FigmaBambooWave />

        <section className="px-5 py-10 md:px-6">
          <div className="overflow-hidden rounded-2xl ring-1 ring-border/50">
            <div className="aspect-[16/10]">
              <img
                src={aboutBrandStoryFig}
                alt="Bambu storefront in the evening"
                className="size-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <h2 className="mt-8 text-center font-display text-2xl text-primary">Brand Story</h2>
          <div className="mt-6 space-y-4 text-center text-[0.8125rem] leading-relaxed tracking-[0.02em] text-[#2b2b2b] md:text-sm">
            <p>Some cafes are built around a drink. Bambu was built around a table.</p>
            <p>
              When we opened in 2025, we weren&apos;t chasing a trend. We were thinking about a
              specific kind of moment — the Sunday afternoon when the whole family shows up, the
              catch-up that stretches from coffee into dessert into something fried and shared between
              too many hands. The kind of gathering where nobody agrees on what to eat, and somehow
              that&apos;s exactly the point.
            </p>
            <p>
              So we built a menu wide enough to hold all of it. Vietnamese coffee brewed slow and
              strong. Dessert bowls layered with colour and texture. Street food that disappears
              before it hits the table. Every item chosen so that no one at your table has to settle.
            </p>
            <p>
              Bambu isn&apos;t just a place to eat. It&apos;s a reason to stay a little longer — with
              the people who matter.
            </p>
          </div>
        </section>

        <section className="px-5 py-10 md:px-6">
          <div className="space-y-4">
            {[aboutCounterFig, aboutFruitFig].map((src, i) => (
              <div key={i} className="overflow-hidden rounded-2xl ring-1 ring-border/50">
                <div className="aspect-[16/10]">
                  <img src={src} alt="" className="size-full object-cover" loading="lazy" />
                </div>
              </div>
            ))}
          </div>
          <h2 className="mt-10 text-center font-display text-2xl text-primary">Value Pillars</h2>
          <img
            src={valuePillarsImg}
            alt="Vietnamese Roots, Made to Share, Rooted in the Community"
            className="mx-auto mt-8 w-full max-w-md"
            loading="lazy"
          />
          <div className="mx-auto mt-3 grid max-w-md grid-cols-3 gap-3 text-center">
            {VALUES.map((t) => (
              <span
                key={t}
                className="text-[0.6875rem] font-medium leading-tight text-[#2b2b2b] md:text-xs"
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        <section className="px-5 py-10 md:px-6">
          <h2 className="text-center font-display text-2xl text-primary">What People Say</h2>
          <div className="mt-6 grid grid-cols-2 gap-3">
            {bambuAbout.reviews.map((src, i) => (
              <div
                key={src}
                className="aspect-[170/255] overflow-hidden rounded-xl bg-muted ring-1 ring-border/40"
              >
                <img
                  src={src}
                  alt={`Customer review ${i + 1}`}
                  className="size-full object-cover"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>

        <HomeFindUsSection />
      </div>
      <FigmaPageFooter />
    </div>
  );
}

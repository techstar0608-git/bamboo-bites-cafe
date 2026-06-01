import bambooTree from "@/assets/figma-bamboo-tree.png";
import { FigmaPillButton } from "@/components/home/FigmaPillButton";

/** Figma — brand intro with bamboo decoration + Our Story CTA */
export function HomeOurStorySection() {
  return (
    <section className="relative overflow-hidden bg-cream px-5 py-12 md:px-6 md:py-20">
        <img
          src={bambooTree}
          alt=""
          aria-hidden
          width={331}
          height={465}
          className="pointer-events-none absolute -right-16 top-4 w-[min(55vw,14rem)] select-none opacity-90 md:-right-8 md:top-8 md:w-[min(40vw,18rem)] lg:right-4 lg:w-72"
        />
        <img
          src={bambooTree}
          alt=""
          aria-hidden
          width={223}
          height={460}
          className="pointer-events-none absolute -left-20 bottom-8 w-[min(45vw,10rem)] scale-x-[-1] select-none opacity-35 md:-left-12 md:bottom-16 md:w-44 lg:hidden"
        />

        <div className="relative mx-auto max-w-xl md:max-w-2xl">
          <p className="max-w-[15rem] text-[0.8125rem] leading-[1.45] tracking-[0.04em] text-[#2b2b2b] md:max-w-md md:text-[0.9375rem] md:leading-relaxed">
            Born in the heart of Sydney&apos;s southwest, Bambu Cafe &amp; Desserts is a place
            built around one thing: bringing people together.
          </p>
          <p className="mt-4 max-w-[15rem] text-[0.8125rem] leading-[1.45] tracking-[0.04em] text-[#2b2b2b] md:max-w-md md:text-[0.9375rem] md:leading-relaxed">
            From slow-brewed Vietnamese coffee to colourful dessert bowls and fresh street food
            bites — everything on our menu is made to share, savour, and come back for.
          </p>

          <p className="mt-8 font-display text-xl leading-snug text-[#2b2b2b] md:text-2xl">
            Two locations. One family.
            <br />
            Always fresh.
          </p>

          <div className="mt-8">
            <FigmaPillButton to="/about">Our Story →</FigmaPillButton>
          </div>
        </div>
      </section>
  );
}

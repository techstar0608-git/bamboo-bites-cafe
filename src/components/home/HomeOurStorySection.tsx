import treeRight from "@/assets/Bambu/about-figma/tre1.png";
import { FigmaPillButton } from "@/components/home/FigmaPillButton";

/** Figma — brand intro with bamboo decoration + Our Story CTA */
export function HomeOurStorySection() {
  return (
    <section className="relative bg-cream px-5 py-12 md:px-6 md:py-20">
        <img
          src={treeRight}
          alt=""
          aria-hidden
          width={331}
          height={465}
          className="pointer-events-none absolute right-0 top-0 z-0 w-[min(150vw,30rem)] max-w-none translate-x-[68%] select-none opacity-90 md:w-[min(85vw,44rem)] lg:w-[52rem]"
        />

        <div className="relative mx-auto max-w-xl md:max-w-2xl">
          <h2 className="font-display text-2xl leading-snug text-[#2b2b2b] md:text-3xl">
            Two locations. One family.
            <br />
            Always fresh.
          </h2>

          <p className="mt-6 max-w-[15rem] text-[0.8125rem] leading-[1.45] tracking-[0.04em] text-[#2b2b2b] md:max-w-md md:text-[0.9375rem] md:leading-relaxed">
            Born in the heart of Sydney&apos;s southwest, Bambu Cafe &amp; Desserts is a place
            built around one thing: bringing people together.
          </p>
          <p className="mt-4 max-w-[15rem] text-[0.8125rem] leading-[1.45] tracking-[0.04em] text-[#2b2b2b] md:max-w-md md:text-[0.9375rem] md:leading-relaxed">
            From slow-brewed Vietnamese coffee to colourful dessert bowls and fresh street food
            bites — everything on our menu is made to share, savour, and come back for.
          </p>

          <div className="mt-8">
            <FigmaPillButton to="/about">Our Story →</FigmaPillButton>
          </div>
        </div>
      </section>
  );
}

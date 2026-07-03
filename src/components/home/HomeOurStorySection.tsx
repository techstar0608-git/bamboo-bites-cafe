import { FigmaPillButton } from "@/components/home/FigmaPillButton";

/** Figma — brand intro + Our Story CTA */
export function HomeOurStorySection() {
  return (
    <section className="relative bg-cream px-5 py-12 md:px-6 md:py-20">
      <div className="mx-auto max-w-xl text-left md:max-w-2xl">
        <h2 className="font-display text-2xl leading-snug text-heading md:text-3xl">
          Two locations. One family.
          <br />
          Always fresh.
        </h2>

        <p className="mt-6 max-w-md text-[0.8125rem] leading-[1.45] tracking-[0.04em] text-[#2b2b2b] md:text-[0.9375rem] md:leading-relaxed">
          Born in the heart of Sydney&apos;s southwest, Bambu Cafe &amp; Desserts is a place
          built around one thing: bringing people together.
        </p>
        <p className="mt-4 max-w-md text-[0.8125rem] leading-[1.45] tracking-[0.04em] text-[#2b2b2b] md:text-[0.9375rem] md:leading-relaxed">
          From slow-brewed Vietnamese coffee to colourful dessert bowls and fresh street food
          bites — everything on our menu is made to share, savour, and come back for.
        </p>

        <div className="mt-8 flex justify-center">
          <FigmaPillButton to="/about">Our Story →</FigmaPillButton>
        </div>
      </div>
    </section>
  );
}

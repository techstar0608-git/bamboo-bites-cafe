import { createFileRoute } from "@tanstack/react-router";
import { SectionLabel } from "@/components/SectionLabel";
import { UberMenuGroupedList } from "@/components/bambu/UberMenuGroupedList";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import cafeImg from "@/assets/category-cafe.png";
import { UBER_EATS_DEFAULT } from "@/lib/branches";
import { ICED_COFFEE, ICED_COFFEE_EXTRAS } from "@/data/uber-menu.generated";

export const Route = createFileRoute("/iced-coffee")({
  head: () => ({
    meta: [
      { title: "Iced Coffee — Cà Phê Đá | Bambu Cafe & Desserts" },
      {
        name: "description",
        content:
          "Full iced coffee menu from Bambu Uber — Vietnamese salted, coconut, condensed milk coffee and more. Pickup and Uber Eats prices.",
      },
    ],
  }),
  component: IcedCoffeePage,
});

function IcedCoffeePage() {
  return (
    <>
      <section className="py-24 px-6 bg-gradient-hero text-center">
        <div className="mx-auto max-w-3xl">
          <SectionLabel>Iced Coffee — Cà Phê Đá</SectionLabel>
          <h1 className="mt-6 font-display text-5xl md:text-7xl text-balance leading-[1.05]">
            Vietnamese coffee, <em className="text-primary">done right.</em>
          </h1>
          <p className="mt-6 text-muted-foreground text-lg">
            Bold, slow-brewed, and perfectly iced.
          </p>
          <p className="mt-2 text-sm text-muted-foreground italic">
            Cà phê Việt, pha đúng cách. Đậm, chậm, và đủ lạnh.
          </p>
          <a
            href={UBER_EATS_DEFAULT}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center justify-center px-8 py-4 bg-[#1B5E20] text-white text-xs tracking-[0.3em] uppercase font-medium hover:opacity-90 transition"
          >
            Order Now
          </a>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="mx-auto max-w-4xl">
          <p className="text-center text-sm text-muted-foreground">
            Prices from workbook <strong className="text-foreground font-medium">Bambu · Uber Menu · 19.04.2026</strong>
            — pickup (in-store) and Uber Eats shown per row.
          </p>
        </div>
      </section>

      <section className="pb-20 px-6">
        <div className="mx-auto max-w-4xl">
          <UberMenuGroupedList items={ICED_COFFEE} placeholderImg={cafeImg} />
        </div>
      </section>

      <section className="py-16 px-6 bg-card/40 border-t border-border/40">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-2xl text-center text-foreground">Add-ons & customisation</h2>
          <Accordion type="single" collapsible className="mt-8 w-full">
            <AccordionItem value="extras">
              <AccordionTrigger className="text-foreground">Extras (from spreadsheet)</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-3 text-sm text-muted-foreground pt-2">
                  {ICED_COFFEE_EXTRAS.map((ex) => (
                    <li key={`${ex.nameEn}-${ex.nameVi}`} className="flex flex-wrap justify-between gap-2 border-b border-border/30 pb-2">
                      <span>
                        <span className="text-foreground">{ex.nameEn}</span>
                        {ex.nameVi ? (
                          <span className="block text-xs italic opacity-90">{ex.nameVi}</span>
                        ) : null}
                      </span>
                      <span className="text-primary tabular-nums whitespace-nowrap">{ex.priceLine}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </>
  );
}

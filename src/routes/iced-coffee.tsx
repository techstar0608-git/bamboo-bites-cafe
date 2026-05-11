import { createFileRoute } from "@tanstack/react-router";
import { SectionLabel } from "@/components/SectionLabel";
import { ProductHeroCard } from "@/components/bambu/ProductHeroCard";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import cafeImg from "@/assets/category-cafe.jpg";
import { UBER_EATS_DEFAULT } from "@/lib/branches";

export const Route = createFileRoute("/iced-coffee")({
  head: () => ({
    meta: [
      { title: "Iced Coffee — Cà Phê Đá | Bambu Cafe & Desserts" },
      {
        name: "description",
        content:
          "Vietnamese iced coffee at Bambu: salted coffee, coconut coffee, cà phê sữa đá. Uber Eats prices shown; pickup is typically lower.",
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

      <section className="py-16 px-6">
        <div className="mx-auto max-w-4xl space-y-16">
          <p className="text-center text-sm text-muted-foreground">
            Prices below are Uber Eats; pickup is usually about $2 less per item.
          </p>

          <ProductHeroCard
            sttAnh={1}
            img={cafeImg}
            titleEn="Vietnamese Salted Coffee (Iced)"
            titleVi="Cà Phê Muối Đá"
            price="$11.50 (R) / $14.90 (L) AUD"
            ingredients="Slow-brewed phin coffee, condensed milk, salted cream."
            highlight="Sweet, salty and bitter in balance — unlike ordinary coffee. Bambu's standout signature."
            pairing="Pair with Bánh Tráng Trộn or Phô Mai Que for the perfect afternoon pick-me-up."
            badges={["signature"]}
            orderUrl={UBER_EATS_DEFAULT}
          />

          <ProductHeroCard
            sttAnh={2}
            img={cafeImg}
            titleEn="Vietnamese Coconut Coffee (Iced)"
            titleVi="Cà Phê Dừa Đá"
            price="$10.50 (R) / $12.50 (L) AUD"
            ingredients="Condensed milk coffee, fresh coconut cream."
            highlight="Gentle coconut richness with enough coffee kick — ideal if you prefer a milder brew. A summer favourite."
            pairing="Try with Smashed Mix Fruit or an Avocado Coconut Bowl for dessert + coffee in one visit."
            orderUrl={UBER_EATS_DEFAULT}
          />

          <ProductHeroCard
            sttAnh={3}
            img={cafeImg}
            titleEn="Condensed Milk Coffee (Iced)"
            titleVi="Cà Phê Sữa Đá"
            price="$6.90 (S) / $8.50 (R) / $10.90 (L) AUD"
            ingredients="Vietnamese phin coffee, condensed milk, ice."
            highlight="Classic Vietnamese iced milk coffee — simple, strong, and never wrong. The safe choice for first-timers."
            pairing="Order with any chè for the iconic Vietnamese combo."
            orderUrl={UBER_EATS_DEFAULT}
          />
        </div>
      </section>

      <section className="py-16 px-6 bg-card/40 border-t border-border/40">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-2xl text-center text-foreground">Toppings & extras</h2>
          <Accordion type="single" collapsible className="mt-8 w-full">
            <AccordionItem value="extras">
              <AccordionTrigger className="text-foreground">Customize your drink</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-2 text-sm text-muted-foreground pt-2">
                  <li>Extra shot espresso — +$0.50</li>
                  <li>Decaf — +$0.50</li>
                  <li>Caramel / Hazelnut / Vanilla syrup — +$0.50</li>
                  <li>Plant milk: Soy / Almond / Oat / Lactose-free — +$0.90</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
    </>
  );
}

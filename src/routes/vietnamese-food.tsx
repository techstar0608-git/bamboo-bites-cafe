import { createFileRoute } from "@tanstack/react-router";
import { SectionLabel } from "@/components/SectionLabel";
import { ProductHeroCard } from "@/components/bambu/ProductHeroCard";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import fingerImg from "@/assets/category-finger.jpg";
import { UBER_EATS_DEFAULT } from "@/lib/branches";

export const Route = createFileRoute("/vietnamese-food")({
  head: () => ({
    meta: [
      { title: "Vietnamese Food — Ăn Vặt Việt Nam | Bambu" },
      {
        name: "description",
        content:
          "Street-food favourites at Bambu: bánh tráng trộn, rice paper rolls with avocado, fried combo platter, and more.",
      },
    ],
  }),
  component: VietnameseFoodPage,
});

const otherItems = [
  { name: "Fish & Chips", price: "$17.90", note: "3 pieces of fish + chips, tartar & sweet chilli" },
  { name: "Mini Churros", price: "$11.90", note: "Chocolate sauce" },
  { name: "Chicken Nuggets", price: "$11.50", note: "10 pieces with chilli sauce" },
  { name: "Spaghetti Bolognese", price: "$18.90", note: "Beef mince, tomato sauce, parmesan" },
  { name: "Xíu Mại (Dimsim)", price: "$9.50", note: "6 pieces with soy dipping sauce" },
  { name: "Há Cảo (Har Gow)", price: "$9.50", note: "6 pieces with soy dipping sauce" },
];

function VietnameseFoodPage() {
  return (
    <>
      <section className="py-24 px-6 bg-gradient-hero text-center">
        <div className="mx-auto max-w-3xl">
          <SectionLabel>Vietnamese Food — Ăn Vặt Việt Nam</SectionLabel>
          <h1 className="mt-6 font-display text-5xl md:text-7xl text-balance leading-[1.05]">
            Familiar flavours, <em className="text-primary">made fresh.</em>
          </h1>
          <p className="mt-6 text-muted-foreground text-lg">
            Snacks and dishes straight from the Vietnamese street-food playbook.
          </p>
          <p className="mt-2 text-sm text-muted-foreground italic">
            Hương vị quen thuộc, làm mới mỗi ngày. Ăn vặt đường phố Việt Nam, ngay tại Sydney.
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
          <ProductHeroCard
            sttAnh={4}
            img={fingerImg}
            titleEn="Vietnamese Spicy Rice Paper"
            titleVi="Bánh Tráng Trộn"
            price="$14.90 AUD"
            ingredients="Hand-mixed rice paper with shredded chicken, herbs, and tangy spices."
            highlight="Impossible to stop after the first bite — a familiar street snack many guests reorder every week."
            pairing="Balance the heat with Cà Phê Muối Đá or Trà Đào Cam Sả."
            orderUrl={UBER_EATS_DEFAULT}
          />

          <ProductHeroCard
            sttAnh={5}
            img={fingerImg}
            titleEn="Rice Paper Rolls with Avocado"
            titleVi="Bánh Tráng Cuốn Bơ"
            price="$18.50 (3 rolls) / $22.50 (4 rolls) AUD"
            ingredients="Fresh rice paper, avocado, shredded chicken, crushed peanuts."
            highlight="Light, fresh and nutty — the avocado adds a creaminess you won't get in classic rolls."
            pairing="Add Bánh Tráng Trộn as the Bánh Tráng Combo ($29.90) — better value than ordering separately."
            orderUrl={UBER_EATS_DEFAULT}
          />

          <ProductHeroCard
            sttAnh={6}
            img={fingerImg}
            titleEn="Fried Combo"
            titleVi="Combo Chiên"
            price="$34.50 AUD"
            ingredients="4 fish balls + 4 beef balls + 4 prawn balls + 1 lap cheong, with pickled vegetables."
            highlight="A sharing platter for the table — variety, flavour and enough to fill everyone. Saves vs ordering à la carte."
            pairing="Round it out with Bánh Tráng Trộn and any drink for an at-home feast."
            badges={["best-for-groups"]}
            orderUrl={UBER_EATS_DEFAULT}
          />
        </div>
      </section>

      <section className="py-16 px-6 bg-card/40 border-t border-border/40">
        <div className="mx-auto max-w-2xl">
          <h2 className="font-display text-2xl text-center">More on the menu</h2>
          <Accordion type="single" collapsible className="mt-8">
            <AccordionItem value="more">
              <AccordionTrigger className="text-foreground">See full snacks list</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-4 text-sm text-muted-foreground pt-2">
                  {otherItems.map((it) => (
                    <li key={it.name} className="border-b border-border/40 pb-3">
                      <span className="text-foreground font-medium">
                        {it.name} — {it.price}
                      </span>
                      <span className="block mt-1">{it.note}</span>
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

import { createFileRoute } from "@tanstack/react-router";
import { SectionLabel } from "@/components/SectionLabel";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Bambu Cafe & Desserts" },
      { name: "description", content: "Browse Bambu's menu: traditional Vietnamese chè, iced coffee, smoothies and crispy finger food." },
      { property: "og:title", content: "Menu — Bambu Cafe & Desserts" },
      { property: "og:description", content: "Chè, cafe drinks and finger food made fresh daily." },
    ],
  }),
  component: MenuPage,
});

const sections = [
  {
    name: "Chè — Vietnamese Desserts",
    tagline: "Cool, colourful, made for sharing.",
    items: [
      { n: "Chè Ba Màu", d: "Three-colour layers of red bean, mung bean and pandan jelly with coconut cream.", p: "$7.50" },
      { n: "Chè Thái", d: "Tropical fruits, jackfruit and jelly in chilled coconut milk.", p: "$8.50" },
      { n: "Chè Đậu Đỏ", d: "Slow-cooked red beans, glutinous rice and coconut cream.", p: "$7.00" },
      { n: "Chè Khúc Bạch", d: "Soft milk pudding cubes, lychee and almond syrup.", p: "$8.00" },
      { n: "Chè Bưởi", d: "Pomelo rind, mung beans and pandan-scented coconut.", p: "$7.50" },
      { n: "Chè Sương Sa Hạt Lựu", d: "Pomegranate-shaped tapioca, jelly and coconut milk.", p: "$7.50" },
    ],
  },
  {
    name: "Cafe — Coffee & Drinks",
    tagline: "Bold roasts, creamy classics.",
    items: [
      { n: "Cà Phê Sữa Đá", d: "Vietnamese iced coffee with condensed milk.", p: "$6.00" },
      { n: "Cà Phê Đen Đá", d: "Strong iced black coffee, no milk.", p: "$5.50" },
      { n: "Coconut Coffee", d: "Espresso blended with creamy coconut ice.", p: "$7.50" },
      { n: "Egg Coffee", d: "Whipped egg cream over hot Vietnamese coffee.", p: "$7.50" },
      { n: "Matcha Latte", d: "Stone-ground matcha with steamed milk.", p: "$7.00" },
      { n: "Avocado Smoothie", d: "Fresh avocado blended with milk and palm sugar.", p: "$8.00" },
    ],
  },
  {
    name: "Finger Food",
    tagline: "Crispy bites for every catch-up.",
    items: [
      { n: "Crispy Spring Rolls", d: "Golden rolls with pork, prawn and vermicelli, herbs & nước chấm.", p: "$10.00" },
      { n: "Salt & Pepper Squid", d: "Crispy squid tossed with chilli, salt and spring onion.", p: "$13.50" },
      { n: "Karaage Chicken", d: "Crunchy fried chicken bites with house mayo.", p: "$11.50" },
      { n: "Crispy Tofu Bites", d: "Golden tofu with sweet chilli dipping sauce.", p: "$9.00" },
      { n: "Bánh Mì Sliders", d: "Mini Vietnamese rolls with grilled pork & pâté.", p: "$12.00" },
      { n: "Sweet Potato Fries", d: "Lightly salted, served with garlic aioli.", p: "$8.50" },
    ],
  },
];

function MenuPage() {
  return (
    <>
      <section className="py-24 px-6 bg-gradient-hero text-center">
        <div className="mx-auto max-w-3xl">
          <SectionLabel>The Menu</SectionLabel>
          <h1 className="mt-6 font-display text-6xl md:text-7xl text-balance">
            Made <em className="text-primary">fresh,</em> made for sharing.
          </h1>
          <p className="mt-6 text-muted-foreground">
            A modern take on Vietnamese classics — desserts, coffee and crispy bites,
            crafted in-house every day.
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="mx-auto max-w-5xl space-y-24">
          {sections.map((s) => (
            <div key={s.name}>
              <div className="text-center">
                <SectionLabel>{s.tagline}</SectionLabel>
                <h2 className="mt-5 font-display text-4xl md:text-5xl italic text-primary">
                  {s.name}
                </h2>
              </div>

              <ul className="mt-12 grid md:grid-cols-2 gap-x-12 gap-y-8">
                {s.items.map((it) => (
                  <li key={it.n} className="border-b border-border/60 pb-6">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-display text-2xl text-foreground">{it.n}</h3>
                      <span className="font-display text-xl text-primary tabular-nums">
                        {it.p}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                      {it.d}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-20 text-center text-xs tracking-[0.25em] uppercase text-muted-foreground">
          Prices in AUD · Menu may vary by location
        </p>
      </section>
    </>
  );
}

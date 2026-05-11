import { createFileRoute } from "@tanstack/react-router";
import { SectionLabel } from "@/components/SectionLabel";
import { ProductHeroCard } from "@/components/bambu/ProductHeroCard";
import cheImg from "@/assets/category-che.jpg";
import { UBER_EATS_DEFAULT } from "@/lib/branches";

export const Route = createFileRoute("/sweet-desserts")({
  head: () => ({
    meta: [
      { title: "Sweet Desserts — Tráng Miệng | Bambu Cafe & Desserts" },
      {
        name: "description",
        content:
          "Vietnamese chè, fruit bowls and halo halo at Bambu. Hero desserts plus full chè list — optional durian add-on.",
      },
    ],
  }),
  component: SweetDessertsPage,
});

const otherChe = [
  {
    name: "Bambu Special — Chè Bambu Thập Cẩm",
    price: "$15.50",
    note: "Jackfruit, lychee, avocado, young coconut, red & mung beans, tamarind, coconut water",
  },
  {
    name: "Ching Bo Leung — Chè Sâm Bổ Lượng",
    price: "$14.50",
    note: "Water chestnut, lotus seed, longan, seaweed, barley, red date",
  },
  {
    name: "Panna Cotta — Chè Khúc Bạch",
    price: "$14.90",
    note: "Panna cotta, basil seed, lychee, pineapple, sliced almond",
  },
  {
    name: "Smashed Durian — Sầu Riêng Dầm",
    price: "$18.90",
    note: "Durian, coconut cream, white pearls (+$3.50 extra durian on Uber Eats menu) · guest favourite",
    badge: "Best seller" as const,
  },
  { name: "Bánh Flan", price: "$11.90", note: "Traditional soft custard flan" },
];

function SweetDessertsPage() {
  return (
    <>
      <section className="py-24 px-6 bg-gradient-hero text-center">
        <div className="mx-auto max-w-3xl">
          <SectionLabel>Sweet Desserts — Tráng Miệng</SectionLabel>
          <h1 className="mt-6 font-display text-5xl md:text-7xl text-balance leading-[1.05]">
            Where the meal becomes <em className="text-primary">a moment.</em>
          </h1>
          <p className="mt-6 text-muted-foreground text-lg">
            Vietnamese chè, fruit bowls and ice blends made to linger over.
          </p>
          <p className="mt-2 text-sm text-muted-foreground italic">
            Nơi bữa ăn trở thành một khoảnh khắc. Chè, dầm trái cây và đá xay — để ngồi lại
            thật lâu.
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
            sttAnh={7}
            img={cheImg}
            titleEn="Pandan Noodle Sweet"
            titleVi="Chè Bánh Lọt — Củ Năng"
            price="$13.50 AUD"
            ingredients="Pandan jellies, crunchy water chestnut, ruby chestnuts, shaved ice."
            highlight="Striking colour — green noodles, red chestnuts — light, refreshing and classically Vietnamese."
            pairing="Cool down with Cà Phê Dừa Đá or Soursop Tea."
            orderUrl={UBER_EATS_DEFAULT}
          />

          <ProductHeroCard
            sttAnh={8}
            img={cheImg}
            titleEn="Awsom Trio"
            titleVi="Chè 3 Màu"
            price="$13.90 AUD"
            ingredients="Red bean, mung bean, pandan noodles, ruby chestnuts, clear jelly, peanuts, coconut cream."
            highlight="Three bold layers — as photogenic as it is delicious. Gentle sweetness, nutty crunch, soft coconut cream."
            pairing="Classic pairing: Cà Phê Sữa Đá — peanuts and coffee, a Vietnamese favourite."
            orderUrl={UBER_EATS_DEFAULT}
          />

          <ProductHeroCard
            sttAnh={9}
            img={cheImg}
            titleEn="Halo Halo"
            titleVi="Chè Halo Halo"
            price="$15.50 AUD"
            ingredients="Rainbow jelly, coconut jelly, pandan noodles, taro ice cream, peanuts, ruby chestnuts, coconut water."
            highlight="Our most colourful bowl — every layer a new flavour and hue. Taro ice cream melts into coconut for a mellow finish. Generous enough to share (or finish solo)."
            pairing="Contrast the sweetness with Cà Phê Muối Đá or Trà Đào Cam Sả."
            badges={["must-try"]}
            orderUrl={UBER_EATS_DEFAULT}
          />
        </div>
      </section>

      <section className="py-16 px-6 bg-card/40 border-t border-border/40">
        <div className="mx-auto max-w-4xl">
          <h2 className="font-display text-2xl text-center">More chè & desserts</h2>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Extra durian add-on <span className="text-foreground font-medium">+$5.00</span> where
            available — confirm on Uber Eats.
          </p>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {otherChe.map((it) => (
              <li
                key={it.name}
                className="border border-border/50 bg-background/50 p-4 text-sm text-muted-foreground relative"
              >
                {"badge" in it && it.badge ? (
                  <span className="absolute top-3 right-3 bg-[#1B5E20] text-white text-[0.55rem] tracking-[0.12em] uppercase px-2 py-0.5">
                    {it.badge}
                  </span>
                ) : null}
                <span className="font-display text-lg text-foreground block pr-20">
                  {it.name} — {it.price}
                </span>
                <span className="mt-1 block">{it.note}</span>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-xs text-center text-muted-foreground tracking-wide">
            Ask staff or check Uber Eats for vegan-friendly chè options.
          </p>
        </div>
      </section>
    </>
  );
}

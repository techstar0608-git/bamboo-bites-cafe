import { createFileRoute } from "@tanstack/react-router";
import { SectionLabel } from "@/components/SectionLabel";
import { UberMenuList } from "@/components/bambu/UberMenuList";
import cheImg from "@/assets/category-che.png";
import { UBER_EATS_DEFAULT } from "@/lib/branches";
import { FRUIT_BOWLS_DESSERT, SWEET_DESSERT } from "@/data/uber-menu.generated";

export const Route = createFileRoute("/sweet-desserts")({
  head: () => ({
    meta: [
      { title: "Sweet Desserts — Tráng Miệng | Bambu Cafe & Desserts" },
      {
        name: "description",
        content:
          "Chè, fruit bowls, dầm trái cây — full dessert menu from the Bambu Uber spreadsheet with pickup & Uber pricing.",
      },
    ],
  }),
  component: SweetDessertsPage,
});

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
            Chè, dầm trái cây — cập nhật từ menu Uber 19.04.2026.
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
        <div className="mx-auto max-w-3xl rounded-sm border border-primary/25 bg-primary/5 px-5 py-4 text-center text-sm text-muted-foreground">
          <span className="text-foreground font-medium">Extra durian</span> add-on (workbook):{" "}
          <strong className="text-primary">$4 pickup</strong> · <strong className="text-primary">$5 Uber Eats</strong>.
          Some items list their own durian surcharges in notes.
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <SectionLabel>Chè & sweet cups</SectionLabel>
            <h2 className="mt-4 font-display text-4xl italic text-primary">Sweet chè</h2>
          </div>
          <UberMenuList items={SWEET_DESSERT} placeholderImg={cheImg} compact />
        </div>
      </section>

      <section className="py-16 px-6 bg-card/40 border-t border-border/40">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <SectionLabel>Bowls & dầm</SectionLabel>
            <h2 className="mt-4 font-display text-4xl italic text-primary">Fruit bowls & more</h2>
          </div>
          <UberMenuList items={FRUIT_BOWLS_DESSERT} placeholderImg={cheImg} compact />
        </div>
      </section>
    </>
  );
}

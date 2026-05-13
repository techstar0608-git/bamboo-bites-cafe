import { createFileRoute } from "@tanstack/react-router";
import { SectionLabel } from "@/components/SectionLabel";
import { UberMenuGroupedList } from "@/components/bambu/UberMenuGroupedList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import fingerImg from "@/assets/category-finger.png";
import { UBER_EATS_DEFAULT } from "@/lib/branches";
import { FOOD_CABRAMATTA, FOOD_CANLEY_HEIGHTS } from "@/data/uber-menu.generated";

export const Route = createFileRoute("/vietnamese-food")({
  head: () => ({
    meta: [
      { title: "Vietnamese Food — Ăn Vặt Việt Nam | Bambu" },
      {
        name: "description",
        content:
          "Street snacks and combos — Cabramatta and Canley Heights Uber menu prices from the live workbook.",
      },
    ],
  }),
  component: VietnameseFoodPage,
});

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
            Hương vị quen thuộc — ăn vặt đường phố Việt Nam tại Sydney.
          </p>
          <a
            href={UBER_EATS_DEFAULT}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center justify-center rounded-full bg-primary px-8 py-4 text-xs font-semibold tracking-[0.3em] text-primary-foreground uppercase shadow-gold transition hover:opacity-95"
          >
            Order Now
          </a>
        </div>
      </section>

      <section className="py-12 px-6">
        <p className="mx-auto max-w-3xl text-center text-sm text-muted-foreground">
          Food rows differ slightly by store (see tabs). Data:{" "}
          <strong className="text-foreground font-normal">Bambu · Uber Menu · 19.04.2026</strong>.
        </p>
      </section>

      <section className="pb-24 px-6">
        <div className="mx-auto max-w-4xl">
          <Tabs defaultValue="cabramatta" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-12 h-auto p-1">
              <TabsTrigger value="cabramatta" className="text-xs uppercase tracking-wide">
                Cabramatta
              </TabsTrigger>
              <TabsTrigger value="canley" className="text-xs uppercase tracking-wide">
                Canley Heights
              </TabsTrigger>
            </TabsList>
            <TabsContent value="cabramatta">
              <UberMenuGroupedList items={FOOD_CABRAMATTA} placeholderImg={fingerImg} />
            </TabsContent>
            <TabsContent value="canley">
              <UberMenuGroupedList items={FOOD_CANLEY_HEIGHTS} placeholderImg={fingerImg} />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}

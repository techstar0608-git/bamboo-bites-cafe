import { createFileRoute } from "@tanstack/react-router";
import { SectionLabel } from "@/components/SectionLabel";
import interiorImg from "@/assets/interior.jpg";
import heroImg from "@/assets/hero-bambu.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story — Bambu Cafe & Desserts" },
      { name: "description", content: "The story behind Bambu Cafe & Desserts — bringing Vietnamese flavours to NSW with warmth, freshness and family." },
      { property: "og:title", content: "Our Story — Bambu Cafe & Desserts" },
      { property: "og:description", content: "Vietnamese flavours, family roots, and a place to belong." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="py-24 px-6 bg-gradient-hero text-center">
        <div className="mx-auto max-w-3xl">
          <SectionLabel>Our Story</SectionLabel>
          <h1 className="mt-6 font-display text-6xl md:text-7xl text-balance leading-[1.05]">
            Rooted in <em className="text-primary">tradition,</em> growing together.
          </h1>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-16 items-center">
          <img
            src={interiorImg}
            alt="Inside Bambu cafe"
            loading="lazy"
            width={1536}
            height={1024}
            className="rounded-sm shadow-elegant w-full aspect-[4/3] object-cover"
          />
          <div>
            <h2 className="font-display text-4xl md:text-5xl text-balance leading-tight">
              A taste of <em className="text-primary">home,</em> shared with everyone.
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Bambu was born from a simple idea: bring the colours, flavours and warmth of
              Vietnamese street food and dessert culture to one welcoming space. Like the
              bamboo we're named after, we grow strong by standing together — family,
              friends, neighbours and visitors all under one roof.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Every chè cup, every iced coffee and every crispy bite is prepared in-house,
              using recipes passed down and refined with care. It's tradition — with a
              modern, friendly twist.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-card/40">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <SectionLabel>What we stand for</SectionLabel>
            <h2 className="mt-6 font-display text-4xl md:text-5xl text-balance">
              Small details, <em className="text-primary">big flavour.</em>
            </h2>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {[
              { t: "Fresh by the day", d: "Beans, jellies, syrups and broths — prepped in-house each morning, never the night before." },
              { t: "Generous by nature", d: "Big portions, bold flavours and a smile at the counter. Hospitality that feels like home." },
              { t: "Better together", d: "Built to be shared — across tables, generations and cultures. Bambu is for everyone." },
            ].map((v) => (
              <div key={v.t} className="border border-border bg-background p-8 hover:border-primary/50 transition-colors">
                <div className="font-display italic text-3xl text-primary">✦</div>
                <h3 className="mt-4 font-display text-2xl">{v.t}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="mx-auto max-w-5xl text-center">
          <img
            src={heroImg}
            alt="Bambu desserts"
            loading="lazy"
            width={1536}
            height={1536}
            className="mx-auto rounded-sm shadow-elegant w-full max-w-3xl aspect-square object-cover"
          />
          <h2 className="mt-12 font-display text-4xl md:text-5xl text-balance italic text-primary">
            "Come hungry. Leave happy."
          </h2>
          <p className="mt-4 text-muted-foreground">— The Bambu Family</p>
        </div>
      </section>
    </>
  );
}

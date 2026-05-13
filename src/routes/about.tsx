import { createFileRoute, Link } from "@tanstack/react-router";
import { Coffee, Heart, MapPin, ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/SectionLabel";
import interiorImg from "@/assets/interior.jpg";
import heroImg from "@/assets/hero-bambu.jpg";
import { branches } from "@/lib/branches";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Bambu Cafe & Desserts" },
      {
        name: "description",
        content:
          "Vietnamese-inspired cafe in Sydney's southwest — handcrafted drinks, traditional desserts and two welcoming locations.",
      },
      { property: "og:title", content: "About Us — Bambu Cafe & Desserts" },
      {
        property: "og:description",
        content: "Vietnamese roots, made to share, rooted in Canley Heights and Cabramatta.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="py-24 px-6 bg-gradient-hero text-center">
        <div className="mx-auto max-w-3xl">
          <SectionLabel>About us</SectionLabel>
          <h1 className="mt-6 font-display text-6xl md:text-7xl text-balance leading-[1.05]">
            Understand <em className="text-primary">Bambu</em> before you order.
          </h1>
          <p className="mt-6 text-lg text-primary italic">Where Every Sip Tells a Story</p>
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
            className="aspect-[4/3] w-full rounded-3xl object-cover shadow-elegant"
          />
          <div>
            <SectionLabel>Who we are</SectionLabel>
            <h2 className="mt-6 font-display text-4xl md:text-5xl text-balance leading-tight">
              Built for <em className="text-primary">togetherness.</em>
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Bambu Cafe &amp; Desserts is a Vietnamese-inspired cafe serving handcrafted
                drinks, traditional desserts, and light bites across two locations in Sydney&apos;s
                southwest — Canley Heights and Cabramatta.
              </p>
              <p>
                We started in Canley Heights in 2025 with one simple idea: a place where people
                feel at home. A table for a family catching up, a corner for friends sharing
                something sweet, a quiet cup of coffee in the middle of a busy day.
              </p>
              <p>
                Everything we make is designed to bring people together — from the slow-brewed
                Vietnamese coffee to the colourful dessert bowls that become the centrepiece of
                every table.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/50 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <SectionLabel>Values</SectionLabel>
            <h2 className="mt-6 font-display text-4xl md:text-5xl text-balance">
              What we <em className="text-primary">believe</em>
            </h2>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {[
              {
                Icon: Coffee,
                t: "Vietnamese Roots",
                tv: "Hương vị Việt Nam",
                d: "Every menu item is rooted in Vietnamese food culture — adapted for Sydney, never watered down.",
              },
              {
                Icon: Heart,
                t: "Made to Share",
                tv: "Dành để chia sẻ",
                d: "Our portions, our tables, our vibe — all built for groups. Come with people you love.",
              },
              {
                Icon: MapPin,
                t: "Rooted in the Community",
                tv: "Gắn bó cộng đồng",
                d: "Two stores, one neighbourhood. Canley Heights and Cabramatta are home, not just a location.",
              },
            ].map(({ Icon, t, tv, d }) => (
              <div
                key={t}
                className="rounded-3xl border border-border bg-card p-8 text-center shadow-elegant transition-colors hover:border-primary/40 md:text-left"
              >
                <div className="mx-auto inline-flex size-14 items-center justify-center rounded-2xl border border-primary/35 text-primary md:mx-0">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="mt-6 font-display text-2xl">{t}</h3>
                <p className="mt-1 text-sm text-primary italic">{tv}</p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <SectionLabel>Visit</SectionLabel>
            <h2 className="mt-6 font-display text-4xl md:text-5xl text-balance">
              Our two <em className="text-primary">branches</em>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {branches.map((b) => (
              <article
                key={b.key}
                className="overflow-hidden rounded-3xl border border-border bg-card shadow-elegant"
              >
                <img
                  src={b.key === "canley" ? interiorImg : heroImg}
                  alt={`${b.title} — Bambu`}
                  className="w-full aspect-[16/10] object-cover"
                  width={800}
                  height={500}
                  loading="lazy"
                />
                <div className="p-8">
                  <h3 className="font-display text-2xl italic text-primary">{b.title}</h3>
                  <p className="mt-2 text-sm text-foreground">{b.addressLine}</p>
                  <p className="mt-4 text-sm text-muted-foreground">{b.hoursShort}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Uber Eats · {b.uberEatsRating} · {b.uberEatsReviewNote}
                  </p>
                  <a
                    href={b.uberEatsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-xs font-semibold tracking-[0.25em] text-primary-foreground uppercase shadow-gold transition hover:opacity-95"
                  >
                    Order Now <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-12 text-center">
            <Link
              to="/contact"
              className="text-sm tracking-[0.2em] uppercase text-primary hover:underline"
            >
              Full contact &amp; directions →
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}

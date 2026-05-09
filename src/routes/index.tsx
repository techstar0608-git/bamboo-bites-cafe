import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Leaf, Coffee } from "lucide-react";
import heroImg from "@/assets/hero-bambu.jpg";
import cheImg from "@/assets/category-che.jpg";
import cafeImg from "@/assets/category-cafe.jpg";
import fingerImg from "@/assets/category-finger.jpg";
import interiorImg from "@/assets/interior.jpg";
import { SectionLabel } from "@/components/SectionLabel";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bambu Cafe & Desserts — Cabramatta & Canley Heights NSW" },
      {
        name: "description",
        content:
          "Vietnamese chè desserts, bold iced coffee and crispy finger food. Made fresh daily in Cabramatta & Canley Heights.",
      },
    ],
  }),
  component: HomePage,
});

const categories = [
  {
    title: "Chè",
    img: cheImg,
    desc: "Traditional Vietnamese desserts with coconut milk, assorted beans, jellies and tropical fruits — made fresh daily.",
  },
  {
    title: "Cafe",
    img: cafeImg,
    desc: "From bold Vietnamese iced coffee to creamy blends — our cafe menu is rooted in tradition with a modern twist.",
  },
  {
    title: "Finger Food",
    img: fingerImg,
    desc: "Light bites and savoury snacks perfect for sharing — crispy, fresh and full of flavour.",
  },
];

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-gradient-hero">
        <div
          aria-hidden
          className="absolute inset-0 opacity-25 mix-blend-luminosity"
          style={{
            backgroundImage: `url(${heroImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/60" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <div className="inline-flex items-center gap-3 px-5 py-2 border border-primary/40 text-primary text-[0.65rem] tracking-[0.4em] uppercase">
            <span className="h-px w-6 bg-primary" />
            Cabramatta · Canley Heights NSW
            <span className="h-px w-6 bg-primary" />
          </div>

          <h1 className="mt-10 font-display text-6xl sm:text-7xl md:text-8xl leading-[0.95] text-balance">
            <span className="italic text-primary">Bambu</span>
            <br />
            <span className="text-foreground">Cafe & Desserts</span>
          </h1>

          <p className="mt-8 text-sm sm:text-base tracking-[0.35em] uppercase text-muted-foreground">
            Desserts · Drinks · Good Times
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-gold text-gold-foreground text-xs tracking-[0.3em] uppercase font-medium shadow-gold hover:opacity-90 transition"
            >
              Explore Menu <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground text-xs tracking-[0.3em] uppercase hover:border-primary hover:text-primary transition"
            >
              Our Story
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
          <div className="h-12 w-px bg-primary/40" />
          <span className="text-[0.6rem] tracking-[0.4em] uppercase">Scroll</span>
        </div>
      </section>

      {/* WELCOME */}
      <section className="py-28 px-6">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel>Welcome to Bambu</SectionLabel>
            <h2 className="mt-6 font-display text-5xl md:text-6xl leading-tight text-balance">
              Where tradition meets <em className="text-primary">your next hangout</em>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed text-lg">
              From colourful Vietnamese desserts to crispy finger food and bold iced coffee
              — Bambu is where families gather, friends catch up, and every visit feels
              like a good time. Fresh, flavourful, made for sharing.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-border pt-8">
              {[
                { n: "50+", l: "Menu Items" },
                { n: "4.8", l: "Google Rating" },
                { n: "2K+", l: "Happy Customers" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-display text-4xl text-primary">{s.n}</div>
                  <div className="mt-1 text-[0.65rem] tracking-[0.25em] uppercase text-muted-foreground">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-gold/20 blur-3xl rounded-full" />
            <img
              src={heroImg}
              alt="Vietnamese chè desserts at Bambu"
              loading="lazy"
              width={1536}
              height={1536}
              className="relative rounded-sm shadow-elegant w-full aspect-square object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-card border border-primary/30 px-6 py-4 shadow-elegant">
              <div className="font-display italic text-2xl text-primary">Better</div>
              <div className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
                Together
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-28 px-6 bg-card/40">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <SectionLabel>Our Collections</SectionLabel>
            <h2 className="mt-6 font-display text-5xl md:text-6xl text-balance">
              A Taste for <em className="text-primary">Everyone</em>
            </h2>
            <p className="mt-5 max-w-2xl mx-auto text-muted-foreground">
              From classic Vietnamese desserts to crispy bites and refreshing drinks —
              there's always something to share at Bambu.
            </p>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {categories.map((c) => (
              <article
                key={c.title}
                className="group relative overflow-hidden bg-background border border-border hover:border-primary/50 transition-colors"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={c.img}
                    alt={c.title}
                    loading="lazy"
                    width={1024}
                    height={1280}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-7">
                  <h3 className="font-display text-3xl text-primary italic">{c.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {c.desc}
                  </p>
                  <Link
                    to="/menu"
                    className="mt-5 inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-foreground group-hover:text-primary transition"
                  >
                    Explore <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PICKUP */}
      <section className="py-28 px-6">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionLabel>Order & Pickup</SectionLabel>
            <h2 className="mt-6 font-display text-5xl md:text-6xl text-balance">
              Skip the wait. <em className="text-primary">Order ahead.</em>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Order through Uber Eats and pick up at your nearest Bambu. Your food will be
              ready when you arrive — no queues, no waiting.
            </p>
            <a
              href="https://www.ubereats.com/"
              target="_blank"
              rel="noreferrer"
              className="mt-10 inline-flex items-center gap-2 px-8 py-4 bg-gradient-gold text-gold-foreground text-xs tracking-[0.3em] uppercase font-medium shadow-gold hover:opacity-90 transition"
            >
              Order on Uber Eats <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <ol className="space-y-6">
            {[
              { n: "01", t: "Order on Uber Eats", d: "Choose your favourites and select Pickup." },
              { n: "02", t: "Head to Bambu", d: "We'll prepare your order fresh." },
              { n: "03", t: "Collect & Enjoy", d: "Ready when you walk in." },
            ].map((s) => (
              <li
                key={s.n}
                className="flex gap-6 p-6 border border-border hover:border-primary/50 transition-colors bg-card/40"
              >
                <span className="font-display italic text-4xl text-primary leading-none">
                  {s.n}
                </span>
                <div>
                  <h3 className="text-base tracking-[0.18em] uppercase text-foreground">
                    {s.t}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="py-28 px-6 bg-card/40">
        <div className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <img
              src={interiorImg}
              alt="Bambu cafe interior"
              loading="lazy"
              width={1536}
              height={1024}
              className="rounded-sm shadow-elegant w-full aspect-[4/3] object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <SectionLabel>The Bambu Experience</SectionLabel>
            <h2 className="mt-6 font-display text-5xl md:text-6xl text-balance leading-tight">
              More than a cafe. <em className="text-primary">A place to belong.</em>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed">
              Step into a space where good food meets good company. Whether you're catching
              up with friends, treating the family, or just need a break — Bambu is the
              spot.
            </p>

            <ul className="mt-10 space-y-6">
              {[
                { Icon: Sparkles, t: "Made Fresh Daily", d: "Everything prepared in-house, from our chè to crispy finger food." },
                { Icon: Leaf, t: "Spacious & Cosy", d: "Comfortable seating for families, friends and solo visits." },
                { Icon: Coffee, t: "Order & Collect", d: "Order ahead and collect — your food is ready when you arrive." },
              ].map(({ Icon, t, d }) => (
                <li key={t} className="flex gap-5">
                  <div className="flex-none w-12 h-12 rounded-sm border border-primary/40 grid place-items-center text-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{t}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <SectionLabel>Visit Us</SectionLabel>
          <h2 className="mt-6 font-display text-5xl md:text-6xl text-balance">
            Find Your Nearest <em className="text-primary">Bambu</em>
          </h2>
          <p className="mt-5 text-muted-foreground">
            Swing by for desserts, drinks, and good times — we're open 7 days.
          </p>
          <Link
            to="/contact"
            className="mt-10 inline-flex items-center gap-2 px-8 py-4 bg-gradient-gold text-gold-foreground text-xs tracking-[0.3em] uppercase font-medium shadow-gold hover:opacity-90 transition"
          >
            See Locations <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

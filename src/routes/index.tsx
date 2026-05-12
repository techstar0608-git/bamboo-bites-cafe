import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-bambu.jpg";
import cheImg from "@/assets/category-che.png";
import cafeImg from "@/assets/category-cafe.png";
import fingerImg from "@/assets/category-finger.png";
import { SectionLabel } from "@/components/SectionLabel";
import { branches, UBER_EATS_CANLEY, UBER_EATS_CABRAMATTA } from "@/lib/branches";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bambu Cafe & Desserts — Cabramatta & Canley Heights NSW" },
      {
        name: "description",
        content:
          "Born in Sydney's southwest: Vietnamese coffee, dessert bowls and street-food bites. Two locations, one family — Bambu Cafe & Desserts.",
      },
    ],
  }),
  component: HomePage,
});

const categories = [
  {
    titleEn: "Iced Coffee",
    titleVi: "Cà Phê Đá",
    to: "/iced-coffee",
    img: cafeImg,
    desc: "Bold, slow-brewed Vietnamese coffee — perfectly iced.",
  },
  {
    titleEn: "Vietnamese Food",
    titleVi: "Ăn Vặt Việt Nam",
    to: "/vietnamese-food",
    img: fingerImg,
    desc: "Street snacks and dishes made fresh — familiar flavours from home.",
  },
  {
    titleEn: "Sweet Desserts",
    titleVi: "Tráng Miệng",
    to: "/sweet-desserts",
    img: cheImg,
    desc: "Chè, fruit bowls and ice blends meant to share and linger over.",
  },
] as const;

function HomePage() {
  return (
    <>
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
            Bambu Cafe & Desserts
            <span className="h-px w-6 bg-primary" />
          </div>

          <h1 className="mt-10 font-display text-6xl sm:text-7xl md:text-8xl leading-[0.95] text-balance">
            <span className="italic text-primary">Bambu</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed font-light">
            Where Every Sip Tells a Story
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <a
              href={UBER_EATS_CANLEY}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#1B5E20] text-white text-xs tracking-[0.3em] uppercase font-medium hover:opacity-90 transition"
            >
              Order Now <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#find-us"
              className="inline-flex items-center gap-2 px-8 py-4 border border-border text-foreground text-xs tracking-[0.3em] uppercase hover:border-primary hover:text-primary transition"
            >
              Find Us
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
          <div className="h-12 w-px bg-primary/40" />
          <span className="text-[0.6rem] tracking-[0.4em] uppercase">Scroll</span>
        </div>
      </section>

      <section className="py-28 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel>Brand intro</SectionLabel>
          <p className="mt-8 text-muted-foreground leading-relaxed text-lg text-balance">
            Born in the heart of Sydney&apos;s southwest, Bambu Cafe & Desserts is a place built
            around one thing: bringing people together.
          </p>
          <p className="mt-6 text-muted-foreground leading-relaxed text-lg text-balance">
            From slow-brewed Vietnamese coffee to colourful dessert bowls and fresh street food
            bites — everything on our menu is made to share, savour, and come back for.
          </p>
          <p className="mt-8 font-display text-2xl text-primary italic leading-relaxed">
            Two locations. One family. Always fresh.
          </p>
        </div>
      </section>

      <section className="py-16 px-6 bg-[#1B5E20] text-white">
        <div className="mx-auto max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 text-center">
          <div>
            <div className="font-display text-4xl md:text-5xl tabular-nums">2</div>
            <div className="mt-2 text-[0.65rem] tracking-[0.25em] uppercase text-white/85">
              Branches in Sydney
            </div>
          </div>
          <div>
            <div className="font-display text-4xl md:text-5xl tabular-nums">4.9 ★</div>
            <div className="mt-2 text-[0.65rem] tracking-[0.25em] uppercase text-white/85">
              Uber Eats · Cabramatta
            </div>
          </div>
          <div>
            <div className="font-display text-4xl md:text-5xl tabular-nums">4.5 ★</div>
            <div className="mt-2 text-[0.65rem] tracking-[0.25em] uppercase text-white/85">
              Uber Eats · Canley Heights
            </div>
          </div>
          <div className="col-span-2 md:col-span-1">
            <div className="font-display text-4xl md:text-5xl tabular-nums">100+</div>
            <div className="mt-2 text-[0.65rem] tracking-[0.25em] uppercase text-white/85">
              Dishes on the menu
            </div>
          </div>
        </div>
      </section>

      <section className="py-28 px-6 bg-card/40">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <SectionLabel>Featured categories</SectionLabel>
            <h2 className="mt-6 font-display text-5xl md:text-6xl text-balance">
              What we&apos;re known <em className="text-primary">for</em>
            </h2>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {categories.map((c) => (
              <article
                key={c.to}
                className="group relative overflow-hidden bg-background border border-border hover:border-primary/50 transition-colors"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={c.img}
                    alt={`${c.titleEn} — ${c.titleVi}`}
                    loading="lazy"
                    width={1024}
                    height={1280}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-7">
                  <h3 className="font-display text-2xl text-primary italic">{c.titleEn}</h3>
                  <p className="mt-1 text-[0.65rem] tracking-[0.28em] uppercase text-muted-foreground">
                    {c.titleVi}
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                  <Link
                    to={c.to}
                    className="mt-5 inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-foreground group-hover:text-primary transition"
                  >
                    See more · Xem thêm <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 px-6">
        <div className="mx-auto max-w-3xl">
          <div
            className="mb-10 rounded-sm border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-center text-xs tracking-wide text-amber-100/90"
            data-approval-notice
          >
            <span className="font-semibold text-amber-200">[PENDING APPROVAL]</span> Brand
            story copy below is placeholder — please confirm with ownership before final launch.
          </div>
          <SectionLabel>Brand story</SectionLabel>
          <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed text-lg text-balance">
            <p>
              We opened our first store in Canley Heights in 2025 — not with a grand plan, but
              with a simple desire: to create a space that feels like home.
            </p>
            <p>
              The name Bambu came naturally. Like bamboo, we grow quietly, stay rooted, and bend
              without breaking. It&apos;s what we believe a neighbourhood cafe should be.
            </p>
            <p>
              Today, with two stores across Canley Heights and Cabramatta, we&apos;re still that
              same place — just with more tables, more desserts, and more familiar faces.
            </p>
          </div>
        </div>
      </section>

      <section id="find-us" className="py-28 px-6 bg-card/40 scroll-mt-28">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <SectionLabel>Find us</SectionLabel>
            <h2 className="mt-6 font-display text-5xl md:text-6xl text-balance">
              Two <em className="text-primary">locations</em>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {branches.map((b) => (
              <article
                key={b.key}
                className="border border-border bg-background/60 overflow-hidden rounded-sm flex flex-col"
              >
                <div className="aspect-[16/10] w-full bg-muted">
                  <iframe
                    title={`Map — ${b.title}`}
                    src={b.mapEmbedSrc}
                    className="h-full w-full border-0 grayscale-[20%] contrast-[1.05]"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="font-display text-3xl italic text-primary">{b.title}</h3>
                  <p className="mt-2 text-sm text-foreground">{b.addressLine}</p>
                  <p className="mt-4 text-sm text-muted-foreground">{b.hoursShort}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {b.uberEatsRating} · {b.uberEatsReviewNote}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href={b.mapUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-[#1B5E20] text-white text-xs tracking-[0.25em] uppercase font-medium hover:opacity-90 transition"
                    >
                      Get Directions
                    </a>
                    <a
                      href={b.uberEatsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground text-xs tracking-[0.25em] uppercase hover:border-primary hover:text-primary transition"
                    >
                      Uber Eats
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 px-6 border-t border-border/40">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-4xl md:text-5xl text-balance">Ready to order?</h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Fresh drinks and desserts, delivered to your door.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row flex-wrap justify-center gap-4">
            <a
              href={UBER_EATS_CANLEY}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1B5E20] text-white text-xs tracking-[0.25em] uppercase font-medium hover:opacity-90 transition"
            >
              Order from Canley Heights <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={UBER_EATS_CABRAMATTA}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1B5E20] text-white text-xs tracking-[0.25em] uppercase font-medium hover:opacity-90 transition"
            >
              Order from Cabramatta <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

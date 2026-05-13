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
    countLabel: "Full drink list",
  },
  {
    titleEn: "Vietnamese Food",
    titleVi: "Ăn Vặt Việt Nam",
    to: "/vietnamese-food",
    img: fingerImg,
    desc: "Street snacks and dishes made fresh — familiar flavours from home.",
    countLabel: "Snacks & plates",
  },
  {
    titleEn: "Sweet Desserts",
    titleVi: "Tráng Miệng",
    to: "/sweet-desserts",
    img: cheImg,
    desc: "Chè, fruit bowls and ice blends meant to share and linger over.",
    countLabel: "Chè & sweets",
  },
] as const;

function HomePage() {
  return (
    <>
      <section className="relative flex min-h-[92vh] items-center justify-center overflow-hidden bg-gradient-hero">
        <div
          aria-hidden
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url(${heroImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-background via-background/85 to-background/92" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <p className="font-accent text-3xl text-primary sm:text-4xl md:text-[2.65rem]">Made fresh daily</p>

          <div className="mt-6 inline-flex items-center rounded-full border border-primary/30 bg-card/80 px-6 py-2.5 shadow-elegant backdrop-blur-sm">
            <span className="text-[0.65rem] font-semibold tracking-[0.32em] text-primary uppercase">
              Bambu Cafe & Desserts
            </span>
          </div>

          <h1 className="mt-8 font-display text-6xl leading-[1.05] text-balance sm:text-7xl md:text-8xl">
            <span className="italic text-foreground">Bambu</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed font-light text-muted-foreground sm:text-xl">
            Where Every Sip Tells a Story — Vietnamese drinks, sweets &amp; bites in Sydney&apos;s
            southwest.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <a
              href={UBER_EATS_CANLEY}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-9 py-4 text-xs font-semibold tracking-[0.26em] text-primary-foreground uppercase shadow-gold transition hover:opacity-95"
            >
              Order Now <ArrowRight className="size-4" />
            </a>
            <a
              href="#find-us"
              className="inline-flex items-center gap-2 rounded-full border-2 border-foreground/15 bg-card/60 px-9 py-4 text-xs font-semibold tracking-[0.26em] text-foreground uppercase backdrop-blur-sm transition hover:border-primary hover:text-primary"
            >
              Find Us
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground">
          <div className="h-10 w-px bg-primary/45" />
          <span className="text-[0.6rem] tracking-[0.38em] uppercase">Scroll</span>
        </div>
      </section>

      <section className="px-6 py-28">
        <div className="mx-auto max-w-3xl text-center">
          <SectionLabel>Brand intro</SectionLabel>
          <p className="mt-8 text-lg leading-relaxed text-muted-foreground text-balance">
            Born in the heart of Sydney&apos;s southwest, Bambu Cafe & Desserts is a place built
            around one thing: bringing people together.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-balance">
            From slow-brewed Vietnamese coffee to colourful dessert bowls and fresh street food
            bites — everything on our menu is made to share, savour, and come back for.
          </p>
          <p className="mt-8 font-display text-2xl italic leading-relaxed text-primary">
            Two locations. One family. Always fresh.
          </p>
        </div>
      </section>

      <section className="border-y border-primary/15 bg-linear-to-br from-primary to-[oklch(0.52_0.16_34)] px-6 py-20 text-primary-foreground">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-10 text-center md:grid-cols-4 md:gap-8">
          <div>
            <div className="font-display text-4xl tabular-nums md:text-5xl">2</div>
            <div className="mt-2 text-[0.65rem] tracking-[0.26em] text-primary-foreground/90 uppercase">
              Branches in Sydney
            </div>
          </div>
          <div>
            <div className="font-display text-4xl tabular-nums md:text-5xl">4.9 ★</div>
            <div className="mt-2 text-[0.65rem] tracking-[0.26em] text-primary-foreground/90 uppercase">
              Uber Eats · Cabramatta
            </div>
          </div>
          <div>
            <div className="font-display text-4xl tabular-nums md:text-5xl">4.5 ★</div>
            <div className="mt-2 text-[0.65rem] tracking-[0.26em] text-primary-foreground/90 uppercase">
              Uber Eats · Canley Heights
            </div>
          </div>
          <div className="col-span-2 md:col-span-1">
            <div className="font-display text-4xl tabular-nums md:text-5xl">100+</div>
            <div className="mt-2 text-[0.65rem] tracking-[0.26em] text-primary-foreground/90 uppercase">
              Dishes on the menu
            </div>
          </div>
        </div>
      </section>

      <section className="bg-muted/50 px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <SectionLabel>Best for you</SectionLabel>
            <h2 className="mt-6 font-display text-5xl text-balance md:text-6xl">
              What we&apos;re known <em className="text-primary not-italic">for</em>
            </h2>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {categories.map((c) => (
              <article
                key={c.to}
                className="group overflow-hidden rounded-3xl border border-border/60 bg-card shadow-elegant transition hover:border-primary/35 hover:shadow-gold"
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
                  <p className="text-[0.62rem] font-semibold tracking-[0.22em] text-muted-foreground uppercase">
                    {c.countLabel}
                  </p>
                  <h3 className="mt-2 font-display text-2xl text-foreground italic">{c.titleEn}</h3>
                  <p className="mt-1 text-[0.65rem] tracking-[0.28em] text-primary uppercase">
                    {c.titleVi}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
                  <Link
                    to={c.to}
                    className="mt-6 inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-xs font-semibold tracking-[0.22em] text-foreground uppercase transition group-hover:border-primary group-hover:text-primary"
                  >
                    View menu <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-12 text-center">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 text-xs font-semibold tracking-[0.22em] text-primary-foreground uppercase shadow-gold transition hover:opacity-95"
            >
              View all categories <ArrowRight className="size-4" />
            </Link>
          </p>
        </div>
      </section>

      <section className="bg-gradient-deal px-6 py-24">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 text-center lg:flex-row lg:items-center lg:justify-between lg:text-left">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-[0.35em] text-primary uppercase">This week</p>
            <h2 className="mt-4 font-display text-4xl text-balance md:text-5xl">
              Big flavours, <em className="text-primary not-italic">short wait</em>
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Order your usual or try something new — both stores fire the menu fresh through lunch,
              dinner, and late-night dessert runs.
            </p>
          </div>
          <div className="shrink-0">
            <a
              href={UBER_EATS_CABRAMATTA}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-10 py-4 text-xs font-semibold tracking-[0.26em] text-primary-foreground uppercase shadow-gold transition hover:opacity-95"
            >
              Order on Uber Eats <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="px-6 py-28">
        <div className="mx-auto max-w-3xl">
          <div
            className="mb-10 rounded-2xl border border-amber-600/25 bg-amber-500/10 px-4 py-3 text-center text-xs tracking-wide text-amber-950/90"
            data-approval-notice
          >
            <span className="font-semibold text-amber-800">[PENDING APPROVAL]</span> Brand story
            copy below is placeholder — please confirm with ownership before final launch.
          </div>
          <SectionLabel>Brand story</SectionLabel>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-muted-foreground text-balance">
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

      <section className="scroll-mt-28 bg-muted/40 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <SectionLabel>Order with confidence</SectionLabel>
            <h2 className="mt-6 font-display text-4xl text-balance md:text-5xl">
              Uber Eats <em className="text-primary not-italic">ratings</em>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
              Live star ratings and review counts from our store listings — tap through to read
              feedback on Uber Eats.
            </p>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {branches.map((b) => (
              <article
                key={b.key}
                className="flex flex-col rounded-3xl border border-border/70 bg-card p-8 shadow-elegant"
              >
                <p className="font-display text-5xl tabular-nums text-foreground">{b.uberEatsRating}</p>
                <p className="mt-2 font-display text-xl text-primary italic">{b.title}</p>
                <p className="mt-3 grow text-sm text-muted-foreground">{b.uberEatsReviewNote}</p>
                <a
                  href={b.uberEatsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-primary uppercase transition hover:underline"
                >
                  Store on Uber Eats <ArrowRight className="size-3.5" />
                </a>
              </article>
            ))}
            <article className="flex flex-col rounded-3xl border border-border/70 bg-card p-8 shadow-elegant">
              <p className="font-display text-5xl tabular-nums text-foreground">100+</p>
              <p className="mt-2 font-display text-xl italic text-primary">Dishes</p>
              <p className="mt-3 grow text-sm text-muted-foreground">
                Iced coffee, chè, bowls and street-food picks — browse the full workbook-backed
                menu online.
              </p>
              <Link
                to="/menu"
                className="mt-6 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-primary uppercase transition hover:underline"
              >
                Browse menu hub <ArrowRight className="size-3.5" />
              </Link>
            </article>
          </div>
        </div>
      </section>

      <section id="find-us" className="scroll-mt-28 bg-background px-6 py-28">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <SectionLabel>Find us</SectionLabel>
            <h2 className="mt-6 font-display text-5xl text-balance md:text-6xl">
              Two <em className="text-primary not-italic">locations</em>
            </h2>
          </div>

          <div className="grid gap-10 lg:grid-cols-2">
            {branches.map((b) => (
              <article
                key={b.key}
                className="flex flex-col overflow-hidden rounded-3xl border border-border/80 bg-card shadow-elegant"
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
                <div className="flex flex-1 flex-col p-8">
                  <h3 className="font-display text-3xl text-primary italic">{b.title}</h3>
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
                      className="inline-flex items-center gap-2 rounded-full border-2 border-border px-7 py-3 text-xs font-semibold tracking-[0.22em] text-foreground uppercase transition hover:border-primary hover:text-primary"
                    >
                      Get Directions
                    </a>
                    <a
                      href={b.uberEatsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-xs font-semibold tracking-[0.22em] text-primary-foreground uppercase shadow-gold transition hover:opacity-95"
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

      <section className="border-t border-border/50 px-6 py-28">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-4xl text-balance md:text-5xl">Ready to order?</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Fresh drinks and desserts, delivered to your door.
          </p>
          <div className="mt-10 flex flex-col flex-wrap justify-center gap-4 sm:flex-row">
            <a
              href={UBER_EATS_CANLEY}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-9 py-4 text-xs font-semibold tracking-[0.22em] text-primary-foreground uppercase shadow-gold transition hover:opacity-95"
            >
              Order from Canley Heights <ArrowRight className="size-4" />
            </a>
            <a
              href={UBER_EATS_CABRAMATTA}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-9 py-4 text-xs font-semibold tracking-[0.22em] text-primary-foreground uppercase shadow-gold transition hover:opacity-95"
            >
              Order from Cabramatta <ArrowRight className="size-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

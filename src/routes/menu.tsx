import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SectionLabel } from "@/components/SectionLabel";
import cafeImg from "@/assets/category-cafe.jpg";
import fingerImg from "@/assets/category-finger.jpg";
import cheImg from "@/assets/category-che.jpg";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu Hub — Bambu Cafe & Desserts" },
      {
        name: "description",
        content:
          "Browse iced coffee, Vietnamese street snacks and sweet desserts — each course has its own page with photos and STT ảnh references.",
      },
    ],
  }),
  component: MenuHubPage,
});

const links = [
  {
    to: "/iced-coffee",
    titleEn: "Iced Coffee",
    titleVi: "Cà Phê Đá",
    img: cafeImg,
  },
  {
    to: "/vietnamese-food",
    titleEn: "Vietnamese Food",
    titleVi: "Ăn Vặt Việt Nam",
    img: fingerImg,
  },
  {
    to: "/sweet-desserts",
    titleEn: "Sweet Desserts",
    titleVi: "Tráng Miệng",
    img: cheImg,
  },
] as const;

function MenuHubPage() {
  return (
    <>
      <section className="py-24 px-6 bg-gradient-hero text-center">
        <div className="mx-auto max-w-3xl">
          <SectionLabel>Menu</SectionLabel>
          <h1 className="mt-6 font-display text-6xl md:text-7xl text-balance">
            Choose a <em className="text-primary">course</em>
          </h1>
          <p className="mt-6 text-muted-foreground">
            Iced coffee, Vietnamese bites and desserts are loaded from the latest Uber menu
            workbook — browse by category below.
          </p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="mx-auto max-w-5xl grid md:grid-cols-3 gap-8">
          {links.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group block border border-border bg-card/30 overflow-hidden rounded-sm hover:border-primary/50 transition-colors"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={item.img}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  width={800}
                  height={600}
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h2 className="font-display text-2xl text-primary italic">{item.titleEn}</h2>
                <p className="text-[0.65rem] tracking-[0.25em] uppercase text-muted-foreground">
                  {item.titleVi}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-foreground group-hover:text-primary transition">
                  Open <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

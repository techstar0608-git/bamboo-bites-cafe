import { Link } from "@tanstack/react-router";

export type FigmaMenuGridItem = {
  label: string;
  to: string;
  image: string;
  imageAlt?: string;
};

/** Figma menu hub — 2-column category grid */
export function FigmaMenuGrid({ items }: { items: FigmaMenuGridItem[] }) {
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <Link
          key={`${item.to}-${item.label}`}
          to={item.to}
          className="group block text-center"
        >
          <div className="aspect-[166/197] overflow-hidden rounded-xl bg-muted/40 ring-1 ring-border/40 group-hover:ring-primary/35">
            <img
              src={item.image}
              alt={item.imageAlt ?? item.label}
              width={166}
              height={197}
              loading="lazy"
              className="size-full object-cover"
            />
          </div>
          <p className="mt-3 text-[0.8125rem] font-medium tracking-[0.02em] text-[#2b2b2b]">
            {item.label}
          </p>
        </Link>
      ))}
    </div>
  );
}

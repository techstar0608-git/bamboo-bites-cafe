import { ArrowRight } from "lucide-react";

export type ProductBadge = "signature" | "best-seller" | "must-try" | "best-for-groups";

const badgeLabel: Record<ProductBadge, string> = {
  signature: "Signature",
  "best-seller": "Best Seller",
  "must-try": "Must Try",
  "best-for-groups": "Best for Groups",
};

type ProductHeroCardProps = {
  sttAnh?: number;
  img: string;
  titleEn: string;
  titleVi: string;
  price: string;
  ingredients: string;
  highlight: string;
  pairing: string;
  badges?: ProductBadge[];
  orderUrl?: string;
};

export function ProductHeroCard({
  sttAnh,
  img,
  titleEn,
  titleVi,
  price,
  ingredients,
  highlight,
  pairing,
  badges,
  orderUrl,
}: ProductHeroCardProps) {
  const orderHref = orderUrl ?? "";

  return (
    <article className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] border border-border/60 bg-card/30 p-6 lg:p-8 rounded-sm">
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-border/50">
        <img
          src={img}
          alt={`${titleEn} — ${titleVi}`}
          width={960}
          height={720}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        {sttAnh != null && (
          <span className="absolute bottom-3 left-3 bg-background/95 border border-primary/40 px-2 py-1 text-[0.55rem] tracking-[0.2em] uppercase text-primary">
            STT ảnh {String(sttAnh).padStart(2, "0")}
          </span>
        )}
        {badges && badges.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {badges.map((b) => (
              <span
                key={b}
                className="bg-[#1B5E20] text-white text-[0.55rem] tracking-[0.15em] uppercase px-2 py-1"
              >
                {badgeLabel[b]}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col min-w-0">
        <h3 className="font-display text-2xl md:text-3xl text-foreground leading-tight">
          {titleEn}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground italic">{titleVi}</p>
        <p className="mt-3 font-display text-xl text-primary tabular-nums">{price}</p>
        <p className="mt-4 text-sm text-muted-foreground">
          <span className="text-foreground font-medium">Ingredients: </span>
          {ingredients}
        </p>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          <span className="text-primary">✦ </span>
          {highlight}
        </p>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed border-l-2 border-primary/40 pl-4">
          {pairing}
        </p>
        {orderHref ? (
          <a
            href={orderHref}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex w-fit items-center gap-2 px-6 py-3 bg-[#1B5E20] text-white text-xs tracking-[0.25em] uppercase font-medium hover:opacity-90 transition"
          >
            Order Now <ArrowRight className="w-4 h-4" />
          </a>
        ) : null}
      </div>
    </article>
  );
}

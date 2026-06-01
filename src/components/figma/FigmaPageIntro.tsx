import { Link } from "@tanstack/react-router";

type FigmaPageIntroProps = {
  title: string;
  breadcrumb?: { home?: string; current: string };
  /** When set, title renders outside hero overlay (default inner pages) */
  showTitleBelowHero?: boolean;
};

export function FigmaPageIntro({
  title,
  breadcrumb = { home: "Home", current: "Menu" },
  showTitleBelowHero = true,
}: FigmaPageIntroProps) {
  if (!showTitleBelowHero) return null;

  return (
    <header className="px-5 pt-8 text-center md:px-6 lg:pt-10">
      <h1 className="font-display text-3xl text-[#2b2b2b] md:text-4xl lg:text-5xl">{title}</h1>
      <p className="mt-3 text-sm text-[#2b2b2b]/65">
        <Link to="/" className="transition hover:text-primary">
          {breadcrumb.home ?? "Home"}
        </Link>
        <span aria-hidden className="mx-1.5">
          :
        </span>
        <span>{breadcrumb.current}</span>
      </p>
    </header>
  );
}

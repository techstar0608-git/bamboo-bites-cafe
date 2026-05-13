import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { UBER_EATS_DEFAULT } from "@/lib/branches";

const links = [
  { to: "/", label: "Home", exact: true },
  { to: "/iced-coffee", label: "Coffee", exact: true },
  { to: "/vietnamese-food", label: "Food", exact: true },
  { to: "/sweet-desserts", label: "Desserts", exact: true },
  { to: "/about", label: "Our Story", exact: true },
  { to: "/contact", label: "Visit Us", exact: true },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-border/80 bg-background/90 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-6">
        <Link
          to="/"
          className="group flex shrink-0 items-center gap-2"
          onClick={() => setOpen(false)}
        >
          <span className="font-display text-3xl leading-none text-primary italic">Bambu</span>
          <span className="hidden border-l border-border pl-2 text-[0.65rem] uppercase tracking-[0.28em] text-muted-foreground sm:inline">
            Cafe & Desserts
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="whitespace-nowrap text-xs tracking-[0.14em] text-foreground/75 uppercase transition-colors hover:text-primary xl:text-sm xl:tracking-[0.18em]"
              activeProps={{ className: "whitespace-nowrap text-xs font-semibold tracking-[0.14em] text-primary uppercase xl:text-sm xl:tracking-[0.18em]" }}
              activeOptions={{ exact: l.exact }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={UBER_EATS_DEFAULT}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full bg-primary px-5 py-2.5 text-[0.65rem] font-semibold tracking-[0.18em] text-primary-foreground uppercase shadow-gold transition hover:opacity-95 md:inline-flex xl:px-6 xl:text-xs xl:tracking-[0.2em]"
          >
            Order
          </a>

          <button
            className="p-1 text-foreground lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-border/60 bg-background lg:hidden">
          <div className="flex flex-col gap-5 px-6 py-6">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-sm tracking-[0.18em] text-foreground/80 uppercase"
                activeProps={{ className: "text-sm font-semibold tracking-[0.18em] text-primary uppercase" }}
                activeOptions={{ exact: l.exact }}
              >
                {l.label}
              </Link>
            ))}
            <a
              href={UBER_EATS_DEFAULT}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-xs font-semibold tracking-[0.2em] text-primary-foreground uppercase shadow-gold"
            >
              Order Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

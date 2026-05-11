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
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/40">
      <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2 group shrink-0" onClick={() => setOpen(false)}>
          <span className="font-display italic text-3xl text-primary leading-none">Bambu</span>
          <span className="hidden sm:inline text-[0.65rem] tracking-[0.3em] text-muted-foreground uppercase border-l border-border pl-2">
            Cafe & Desserts
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-xs xl:text-sm tracking-[0.12em] xl:tracking-[0.18em] uppercase text-foreground/80 hover:text-primary transition-colors whitespace-nowrap"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: l.exact }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={UBER_EATS_DEFAULT}
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline-flex items-center px-4 xl:px-5 py-2.5 text-[0.65rem] xl:text-xs tracking-[0.15em] xl:tracking-[0.2em] uppercase bg-gradient-gold text-gold-foreground font-medium rounded-sm shadow-gold hover:opacity-90 transition whitespace-nowrap"
          >
            Order
          </a>

          <button
            className="lg:hidden text-foreground p-1"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border/40 bg-background/95 max-h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="px-6 py-6 flex flex-col gap-5">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-sm tracking-[0.18em] uppercase text-foreground/80"
                activeProps={{ className: "text-primary" }}
                activeOptions={{ exact: l.exact }}
              >
                {l.label}
              </Link>
            ))}
            <a
              href={UBER_EATS_DEFAULT}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center px-5 py-3 text-xs tracking-[0.2em] uppercase bg-gradient-gold text-gold-foreground font-medium rounded-sm"
            >
              Order Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

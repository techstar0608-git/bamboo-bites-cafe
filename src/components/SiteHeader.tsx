import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/menu", label: "Menu" },
  { to: "/about", label: "Our Story" },
  { to: "/contact", label: "Visit Us" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/40">
      <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group" onClick={() => setOpen(false)}>
          <span className="font-display italic text-3xl text-primary leading-none">Bambu</span>
          <span className="hidden sm:inline text-[0.65rem] tracking-[0.3em] text-muted-foreground uppercase border-l border-border pl-2">
            Cafe & Desserts
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm tracking-[0.18em] uppercase text-foreground/80 hover:text-primary transition-colors"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <a
          href="https://www.ubereats.com/"
          target="_blank"
          rel="noreferrer"
          className="hidden md:inline-flex items-center px-5 py-2.5 text-xs tracking-[0.2em] uppercase bg-gradient-gold text-gold-foreground font-medium rounded-sm shadow-gold hover:opacity-90 transition"
        >
          Order Pickup
        </a>

        <button
          className="md:hidden text-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/40 bg-background/95">
          <div className="px-6 py-6 flex flex-col gap-5">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-sm tracking-[0.18em] uppercase text-foreground/80"
                activeProps={{ className: "text-primary" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            <a
              href="https://www.ubereats.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center px-5 py-3 text-xs tracking-[0.2em] uppercase bg-gradient-gold text-gold-foreground font-medium rounded-sm"
            >
              Order Pickup
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-baseline gap-2">
            <span className="font-display italic text-4xl text-primary">Bambu</span>
            <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground">
              Cafe & Desserts
            </span>
          </div>
          <p className="mt-4 max-w-md text-sm text-muted-foreground leading-relaxed">
            Where tradition meets your next hangout. Vietnamese desserts, bold iced coffee
            and crispy bites — made fresh, made for sharing.
          </p>
        </div>

        <div>
          <h4 className="text-xs tracking-[0.25em] uppercase text-primary">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/menu" className="hover:text-primary">Menu</Link></li>
            <li><Link to="/about" className="hover:text-primary">Our Story</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Locations</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs tracking-[0.25em] uppercase text-primary">Visit</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>Canley Heights · Cabramatta</li>
            <li>Open 7 days · 8AM – 10PM</li>
            <li>(+61) 282 013 894</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/40">
        <div className="mx-auto max-w-7xl px-6 py-6 flex flex-col sm:flex-row justify-between gap-2 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Bambu Cafe & Desserts. All rights reserved.</span>
          <span className="tracking-[0.2em] uppercase">Made with care in NSW</span>
        </div>
      </div>
    </footer>
  );
}

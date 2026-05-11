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
            Iced coffee · Vietnamese snacks · Sweet chè — two branches in Sydney&apos;s
            southwest, made for sharing.
          </p>
        </div>

        <div>
          <h4 className="text-xs tracking-[0.25em] uppercase text-primary">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/iced-coffee" className="hover:text-primary">
                Iced Coffee
              </Link>
            </li>
            <li>
              <Link to="/vietnamese-food" className="hover:text-primary">
                Vietnamese Food
              </Link>
            </li>
            <li>
              <Link to="/sweet-desserts" className="hover:text-primary">
                Sweet Desserts
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-primary">
                Our Story
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary">
                Locations
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs tracking-[0.25em] uppercase text-primary">Visit</h4>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>Canley Heights · Cabramatta</li>
            <li>Mon–Thu 7:00 AM – 10:00 PM</li>
            <li>Fri–Sun 7:00 AM – 11:00 PM</li>
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

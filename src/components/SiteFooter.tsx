import { Link } from "@tanstack/react-router";
import { FormEvent } from "react";

export function SiteFooter() {
  function onSubscribe(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-4xl text-background italic">Bambu</span>
            <span className="text-xs tracking-[0.3em] text-background/70 uppercase">
              Cafe & Desserts
            </span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-background/75">
            Iced coffee · Vietnamese snacks · Sweet chè — two branches in Sydney&apos;s southwest,
            made for sharing.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold tracking-[0.28em] text-primary uppercase">
            Explore
          </h4>
          <ul className="mt-4 space-y-2.5 text-sm text-background/75">
            <li>
              <Link to="/iced-coffee" className="transition hover:text-background">
                Iced Coffee
              </Link>
            </li>
            <li>
              <Link to="/vietnamese-food" className="transition hover:text-background">
                Vietnamese Food
              </Link>
            </li>
            <li>
              <Link to="/sweet-desserts" className="transition hover:text-background">
                Sweet Desserts
              </Link>
            </li>
            <li>
              <Link to="/about" className="transition hover:text-background">
                Our Story
              </Link>
            </li>
            <li>
              <Link to="/contact" className="transition hover:text-background">
                Locations
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold tracking-[0.28em] text-primary uppercase">Visit</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-background/75">
            <li>Canley Heights · Cabramatta</li>
            <li>Mon–Thu 7:00 AM – 10:00 PM</li>
            <li>Fri–Sun 7:00 AM – 11:00 PM</li>
            <li>
              <a href="tel:+61282013894" className="transition hover:text-background">
                (+61) 282 013 894
              </a>
            </li>
          </ul>

          <h4 className="mt-10 text-xs font-semibold tracking-[0.28em] text-primary uppercase">
            Subscribe
          </h4>
          <p className="mt-2 text-xs text-background/60">
            Deals and new drops from the kitchen (no spam).
          </p>
          <form onSubmit={onSubscribe} className="mt-4 flex flex-col gap-2 sm:flex-row">
            <input
              type="email"
              name="email"
              placeholder="Your email"
              autoComplete="email"
              className="min-h-11 flex-1 rounded-full border border-background/25 bg-background/10 px-4 text-sm text-background placeholder:text-background/45 outline-none ring-primary focus-visible:border-transparent focus-visible:ring-2"
            />
            <button
              type="submit"
              className="rounded-full bg-primary px-6 py-2.5 text-xs font-semibold tracking-[0.2em] text-primary-foreground uppercase transition hover:opacity-95"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-background/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-6 text-xs text-background/55 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} Bambu Cafe & Desserts. All rights reserved.</span>
          <span className="tracking-[0.22em] uppercase">Made with care in NSW</span>
        </div>
      </div>
    </footer>
  );
}

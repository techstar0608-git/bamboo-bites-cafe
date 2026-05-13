import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { UBER_EATS_DEFAULT } from "@/lib/branches";
import { cn } from "@/lib/utils";
import logoBambu from "@/assets/logo-bambu.png";

const SCROLL_BLEND_THRESHOLD = 72;

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
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onHome = pathname === "/";
  const blendWithHero = onHome && !scrolledPastHero;

  /** Close drawer on SPA navigation — Link onClick alone can race or miss edge cases */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!onHome) {
      setScrolledPastHero(false);
      return;
    }
    const onScroll = () => {
      setScrolledPastHero(window.scrollY > SCROLL_BLEND_THRESHOLD);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [onHome]);

  useEffect(() => {
    if (!open) return;
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 1023px)");
    if (!mq.matches) return;

    const prevHtml = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";

    const onChange = () => {
      if (!mq.matches) document.documentElement.style.overflow = prevHtml;
      else document.documentElement.style.overflow = "hidden";
    };

    mq.addEventListener("change", onChange);
    return () => {
      mq.removeEventListener("change", onChange);
      document.documentElement.style.overflow = prevHtml;
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-[100] isolate flex max-h-none flex-col transition-[background-color,box-shadow,border-color,backdrop-filter] duration-300",
        open && "max-h-dvh overflow-hidden",
        blendWithHero
          ? "border-b border-transparent bg-transparent shadow-none backdrop-blur-none"
          : "border-b border-border/80 bg-background/90 shadow-sm backdrop-blur-md translate-z-0",
      )}
    >
      <div className="mx-auto flex h-20 w-full max-w-7xl shrink-0 items-center justify-between gap-4 px-6">
        <Link
          to="/"
          className={cn(
            "group flex shrink-0 items-center gap-2 outline-none ring-primary focus-visible:rounded-md focus-visible:ring-2",
            blendWithHero ? "ring-offset-2 ring-offset-transparent" : "ring-offset-2 ring-offset-background",
          )}
          onClick={() => setOpen(false)}
        >
          <img
            src={logoBambu}
            alt="Bambu Desserts Cafe"
            width={640}
            height={360}
            className="h-12 w-auto max-w-[152px] object-contain object-left sm:h-14 sm:max-w-[190px]"
            decoding="async"
          />
          <span className="sr-only">Bambu Cafe &amp; Desserts — home</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "whitespace-nowrap text-xs uppercase transition-colors xl:text-sm",
                blendWithHero
                  ? "tracking-[0.14em] text-white/85 hover:text-white xl:tracking-[0.18em]"
                  : "tracking-[0.14em] text-foreground/75 hover:text-primary xl:tracking-[0.18em]",
              )}
              activeProps={{
                className: cn(
                  "whitespace-nowrap text-xs font-semibold uppercase xl:text-sm",
                  blendWithHero
                    ? "tracking-[0.14em] text-white xl:tracking-[0.18em]"
                    : "tracking-[0.14em] text-primary xl:tracking-[0.18em]",
                ),
              }}
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
            type="button"
            className={cn(
              "relative z-[1] inline-flex min-h-10 min-w-10 shrink-0 items-center justify-center rounded-lg p-1.5 lg:hidden",
              blendWithHero
                ? "text-white bg-black/25 shadow-[0_2px_12px_rgba(0,0,0,0.35)] ring-1 ring-white/25 backdrop-blur-sm [&_svg]:size-6 [&_svg]:drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
                : "text-foreground bg-background ring-1 ring-border/65 shadow-sm [&_svg]:size-6",
            )}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-6 shrink-0" /> : <Menu className="size-6 shrink-0" />}
          </button>
        </div>
      </div>

      {open && (
        <div
          className={cn(
            "flex min-h-0 w-full min-w-0 flex-1 flex-col overflow-x-hidden overflow-y-auto overscroll-y-contain border-t touch-pan-y lg:hidden",
            blendWithHero
              ? "border-white/15 bg-[var(--hero-olive)]"
              : "border-border/60 bg-background",
          )}
        >
          <nav className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-6 py-6 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={cn(
                  "min-w-0 max-w-full break-words text-sm tracking-[0.18em] uppercase",
                  blendWithHero ? "text-white/90" : "text-foreground/80",
                )}
                activeProps={{
                  className: cn(
                    "min-w-0 max-w-full break-words text-sm font-semibold tracking-[0.18em] uppercase",
                    blendWithHero ? "text-white" : "text-primary",
                  ),
                }}
                activeOptions={{ exact: l.exact }}
              >
                {l.label}
              </Link>
            ))}
            <a
              href={UBER_EATS_DEFAULT}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full max-w-full shrink-0 items-center justify-center break-words rounded-full bg-primary px-5 py-3 text-center text-xs font-semibold tracking-[0.2em] text-primary-foreground uppercase shadow-gold"
            >
              Order Now
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

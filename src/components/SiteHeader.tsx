import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { UBER_EATS_DEFAULT } from "@/lib/branches";
import { cn } from "@/lib/utils";
import logoBambu from "@/assets/logo-bambu.png";

const SIGNATURE_CHILDREN = [
  { to: "/coffee", label: "Coffee" },
  { to: "/food", label: "Food" },
  { to: "/desserts", label: "Sweet desserts" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  /** Close drawer on SPA navigation — Link onClick alone can race or miss edge cases */
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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
        "fixed inset-x-0 top-0 z-[100] isolate flex max-h-none flex-col border-b border-border/80 bg-background/90 shadow-sm backdrop-blur-md transition-colors duration-300 transform-gpu",
        open && "max-h-dvh overflow-hidden",
      )}
    >
      <div className="relative mx-auto flex h-20 w-full max-w-7xl shrink-0 items-center justify-between gap-4 px-6">
        <button
          type="button"
          className="relative z-1 inline-flex min-h-10 min-w-10 shrink-0 items-center justify-center rounded-lg bg-background p-1.5 text-foreground ring-1 ring-border/65 shadow-sm lg:hidden [&_svg]:size-6"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="size-6 shrink-0" /> : <Menu className="size-6 shrink-0" />}
        </button>

        <Link
          to="/"
          className="group absolute left-1/2 flex shrink-0 -translate-x-1/2 items-center gap-2 outline-none ring-primary ring-offset-2 ring-offset-background focus-visible:rounded-md focus-visible:ring-2 lg:static lg:left-auto lg:translate-x-0"
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

        <nav className="hidden items-center gap-7 lg:flex xl:gap-9">
          <TopLink to="/" exact>
            Homepage
          </TopLink>
          <TopLink to="/menu" exact>
            Menu
          </TopLink>
          <NavDropdown label="Signature" items={SIGNATURE_CHILDREN} />
          <TopLink to="/about" exact>
            About Us
          </TopLink>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <a
            href={UBER_EATS_DEFAULT}
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full bg-[#BD9C30] px-5 py-2.5 text-[0.65rem] font-semibold tracking-[0.18em] text-white uppercase shadow-gold transition hover:bg-[#a8892a] md:inline-flex xl:px-6 xl:text-xs xl:tracking-[0.2em]"
          >
            Order
          </a>
        </div>
      </div>

      {open && (
        <div className="flex min-h-0 w-full min-w-0 flex-1 flex-col overflow-x-hidden overflow-y-auto overscroll-y-contain border-t border-border/60 bg-background touch-pan-y lg:hidden">
          <nav className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-6 py-6 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
            <MobileLink to="/" onClick={() => setOpen(false)}>
              Homepage
            </MobileLink>

            <MobileLink to="/menu" onClick={() => setOpen(false)}>
              Menu
            </MobileLink>
            <MobileGroup label="Signature" items={SIGNATURE_CHILDREN} onNavigate={() => setOpen(false)} />

            <MobileLink to="/about" onClick={() => setOpen(false)}>
              About Us
            </MobileLink>

            <a
              href={UBER_EATS_DEFAULT}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex w-full max-w-full shrink-0 items-center justify-center break-words rounded-full bg-[#BD9C30] px-5 py-3 text-center text-xs font-semibold tracking-[0.2em] text-white uppercase shadow-gold"
            >
              Order in Uber
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

const TOP_CLASS =
  "whitespace-nowrap text-xs uppercase tracking-[0.14em] text-foreground/75 transition-colors hover:text-primary xl:text-sm xl:tracking-[0.18em]";

function TopLink({ to, exact, children }: { to: string; exact?: boolean; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className={TOP_CLASS}
      activeProps={{ className: cn(TOP_CLASS, "font-semibold text-primary") }}
      activeOptions={{ exact }}
    >
      {children}
    </Link>
  );
}

type NavItem = { to: string; label: string };

function NavDropdown({
  label,
  to,
  items,
  columns = 1,
}: {
  label: string;
  to?: string;
  items: readonly NavItem[];
  columns?: 1 | 2;
}) {
  const Trigger = to ? Link : "button";
  return (
    <div className="group relative">
      <Trigger
        {...(to ? { to } : { type: "button" as const })}
        className={cn(TOP_CLASS, "inline-flex items-center gap-1")}
      >
        {label}
        <ChevronDown className="size-3.5 transition-transform group-hover:rotate-180" strokeWidth={2} />
      </Trigger>
      <div className="invisible absolute left-0 top-full z-50 transform-gpu pt-3 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
        <ul
          className={cn(
            "rounded-2xl border border-border/60 bg-background p-2 shadow-lg",
            columns === 2 ? "grid w-max grid-cols-2 gap-x-4" : "min-w-[12rem]",
          )}
        >
          {items.map((item) => (
            <li key={`${item.to}-${item.label}`}>
              <Link
                to={item.to}
                className="block whitespace-nowrap rounded-lg px-3 py-2 text-sm text-foreground/80 transition-colors hover:bg-muted/60 hover:text-primary"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function MobileLink({
  to,
  onClick,
  children,
}: {
  to: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="text-sm uppercase tracking-[0.18em] text-foreground/80"
      activeProps={{ className: "text-sm font-semibold uppercase tracking-[0.18em] text-primary" }}
    >
      {children}
    </Link>
  );
}

function MobileGroup({
  label,
  to,
  items,
  onNavigate,
}: {
  label: string;
  to?: string;
  items: readonly NavItem[];
  onNavigate: () => void;
}) {
  return (
    <div className="space-y-3">
      {to ? (
        <Link
          to={to}
          onClick={onNavigate}
          className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground"
        >
          {label}
        </Link>
      ) : (
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">{label}</p>
      )}
      <ul className="space-y-2.5 border-l border-border/50 pl-4">
        {items.map((item) => (
          <li key={`${item.to}-${item.label}`}>
            <Link
              to={item.to}
              onClick={onNavigate}
              className="block text-[0.8125rem] tracking-[0.04em] text-foreground/70 hover:text-primary"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

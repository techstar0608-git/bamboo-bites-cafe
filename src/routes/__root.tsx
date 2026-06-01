import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { cn } from "@/lib/utils";
import faviconLogo from "@/assets/logo-bambu.png";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Bambu Cafe & Desserts — Vietnamese Desserts, Coffee & Bites" },
      { name: "description", content: "Vietnamese chè desserts, bold iced coffee and crispy finger food in Cabramatta & Canley Heights NSW. Made fresh daily." },
      { name: "author", content: "Bambu Cafe & Desserts" },
      { property: "og:title", content: "Bambu Cafe & Desserts" },
      { property: "og:description", content: "Where tradition meets your next hangout — desserts, drinks, good times." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        type: "image/png",
        href: faviconLogo,
      },
      {
        rel: "apple-touch-icon",
        href: faviconLogo,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";
  const figmaFooterRoutes = [
    "/",
    "/menu",
    "/about",
    "/contact",
    "/sweet-desserts",
    "/coffee",
    "/food",
    "/desserts",
    "/iced-coffee",
    "/vietnamese-food",
    "/fruit-drinks-tea",
    "/fresh-juice",
    "/smoothies",
    "/pennywort",
    "/espresso-hot",
    "/ice-blended",
    "/matcha",
    "/new-drink",
  ] as const;
  const hideSiteFooter = figmaFooterRoutes.includes(
    pathname as (typeof figmaFooterRoutes)[number],
  );

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen min-w-0 max-w-full flex-col overflow-x-clip">
        <SiteHeader />
        <main className={cn("min-w-0 flex-1 overflow-x-clip", isHome ? "pt-0" : "pt-20")}>
          <Outlet />
        </main>
        <SiteFooter className={cn(hideSiteFooter && "hidden")} />
      </div>
    </QueryClientProvider>
  );
}

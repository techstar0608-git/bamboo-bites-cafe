import { useEffect, useRef, useState } from "react";
import { MenuLeaderBoard, MenuOrderNow } from "@/components/bambu/MenuLeaderBoard";
import type { UberMenuRow } from "@/data/uber-menu.generated";
import type { BambuProductSection } from "@/lib/product-images";
import { cn } from "@/lib/utils";

export type MenuBoard = {
  heading?: string;
  items: readonly UberMenuRow[];
  placeholderImg: string;
  section: BambuProductSection;
};

export type MenuCategory = {
  /** Anchor id + scrollspy key */
  id: string;
  /** Chip label (no arrow) */
  label: string;
  boards: MenuBoard[];
};

/** Fixed site header height (h-20 = 80px) — the category bar sticks just below it. */
const HEADER_HEIGHT = 80;
/** Category bar height (title row + underline tabs) — sections offset by header + bar. */
const BAR_HEIGHT = 92;
const STICKY_OFFSET = HEADER_HEIGHT + BAR_HEIGHT;

function ListIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
  );
}

function ClipboardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      <line x1="9" y1="12" x2="9.01" y2="12" />
      <line x1="13" y1="12" x2="16" y2="12" />
      <line x1="9" y1="16" x2="9.01" y2="16" />
      <line x1="13" y1="16" x2="16" y2="16" />
    </svg>
  );
}

/**
 * Single-page menu: a sticky horizontal category bar over every product board.
 * Click a chip → smooth-scroll to that category. Scroll the page → the active
 * chip highlights and the bar auto-scrolls it into view.
 */
export function MenuCategoryExplorer({ categories }: { categories: MenuCategory[] }) {
  const [activeId, setActiveId] = useState(categories[0]?.id ?? "");
  const sectionRefs = useRef(new Map<string, HTMLElement>());
  const chipRefs = useRef(new Map<string, HTMLAnchorElement>());
  const navRef = useRef<HTMLDivElement>(null);
  // Suppress scrollspy briefly after a chip click so it doesn't fight the smooth scroll.
  const lockUntil = useRef(0);

  // Scrollspy — pick the section whose top is closest above the sticky bar.
  useEffect(() => {
    function onScroll() {
      if (performance.now() < lockUntil.current) return;
      // The visible content area = below the sticky header+bar, down to the viewport bottom.
      // Active category = whichever one fills the most of that area, so it switches as soon
      // as the next category dominates the screen (not only after the previous one clears).
      const viewTop = STICKY_OFFSET;
      const viewBottom = window.innerHeight;
      let current = categories[0]?.id ?? "";
      let maxVisible = 0;
      for (const cat of categories) {
        const el = sectionRefs.current.get(cat.id);
        if (!el) continue;
        const { top, bottom } = el.getBoundingClientRect();
        const visible = Math.min(bottom, viewBottom) - Math.max(top, viewTop);
        if (visible > maxVisible) {
          maxVisible = visible;
          current = cat.id;
        }
      }
      setActiveId((prev) => (prev === current ? prev : current));
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [categories]);

  // Keep the active chip visible in the horizontal bar.
  useEffect(() => {
    const chip = chipRefs.current.get(activeId);
    chip?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [activeId]);

  function handleChipClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    const el = sectionRefs.current.get(id);
    if (!el) return;
    lockUntil.current = performance.now() + 800;
    setActiveId(id);
    const top = window.scrollY + el.getBoundingClientRect().top - STICKY_OFFSET;
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <div>
      <div
        ref={navRef}
        className="sticky top-20 z-30 border-b border-primary/10 bg-cream/95 backdrop-blur supports-backdrop-filter:bg-cream/80"
      >
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 pt-3 md:px-6">
          <span className="font-display text-lg font-semibold text-heading md:text-xl">
            Categories
          </span>
          <span className="text-primary/60" aria-hidden="true">
            <ClipboardIcon />
          </span>
        </div>
        <nav
          className="mx-auto flex max-w-3xl items-center gap-5 overflow-x-auto px-4 pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:px-6"
          aria-label="Menu categories"
        >
          <span
            className="mb-2 mt-2 grid size-9 shrink-0 place-items-center rounded-lg border border-primary/20 bg-card/40 text-primary/70"
            aria-hidden="true"
          >
            <ListIcon />
          </span>
          {categories.map((cat) => {
            const active = cat.id === activeId;
            return (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                ref={(node) => {
                  if (node) chipRefs.current.set(cat.id, node);
                  else chipRefs.current.delete(cat.id);
                }}
                onClick={(e) => handleChipClick(e, cat.id)}
                aria-current={active ? "true" : undefined}
                className={cn(
                  "shrink-0 whitespace-nowrap border-b-2 px-1 pb-3 pt-2 text-[0.9375rem] tracking-[0.01em] transition",
                  active
                    ? "border-primary font-semibold text-primary"
                    : "border-transparent font-medium text-[#2b2b2b]/70 hover:text-primary",
                )}
              >
                {cat.label}
              </a>
            );
          })}
        </nav>
      </div>

      <div className="mx-auto max-w-3xl px-5 py-10 md:px-6">
        <div className="space-y-14">
          {categories.map((cat) => (
            <section
              key={cat.id}
              id={cat.id}
              ref={(node) => {
                if (node) sectionRefs.current.set(cat.id, node);
                else sectionRefs.current.delete(cat.id);
              }}
              style={{ scrollMarginTop: STICKY_OFFSET }}
              aria-label={cat.label}
            >
              <h2 className="mb-4 font-display text-2xl text-heading md:text-3xl">
                {cat.label}
              </h2>
              <div className="space-y-10">
                {cat.boards.map((board, i) => (
                  <MenuLeaderBoard
                    key={`${cat.id}-${board.section}-${i}`}
                    heading={board.heading}
                    items={board.items}
                    placeholderImg={board.placeholderImg}
                    section={board.section}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
        <MenuOrderNow />
      </div>
    </div>
  );
}

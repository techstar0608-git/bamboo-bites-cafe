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
/** Category bar height — sections offset by header + bar so headings clear both. */
const BAR_HEIGHT = 56;
const STICKY_OFFSET = HEADER_HEIGHT + BAR_HEIGHT;

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
        <nav
          className="mx-auto flex w-max max-w-full gap-2 overflow-x-auto px-4 py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:px-6"
          aria-label="Menu categories"
        >
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
                  "shrink-0 whitespace-nowrap rounded-full border px-4 py-1.5 text-[0.8125rem] font-medium tracking-[0.02em] transition",
                  active
                    ? "border-primary bg-primary text-white shadow-sm"
                    : "border-primary/25 bg-card/40 text-[#2b2b2b] hover:border-primary/50 hover:text-primary",
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
              <h2 className="mb-6 text-center font-display text-2xl text-heading md:text-3xl">
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

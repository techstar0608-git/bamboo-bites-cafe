import speckleUrl from "@/assets/Bambu/hero-speckle.svg";
import { cn } from "@/lib/utils";

/**
 * "Loang lổ" overlay — the Figma cream vector with a speckled/torn top edge,
 * anchored to the bottom of the hero so the media melts into the cream page.
 *
 * Rendered as a horizontally-repeating background (auto width / full height) so
 * the flecks stay crisp and the cream band spans full width on any screen —
 * avoids the SVG's internal preserveAspectRatio shrinking it on wide desktops.
 * Decorative only; never intercepts pointer events.
 */
export function FigmaHeroSpeckle({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 bottom-0 z-10 h-[30%] select-none bg-bottom bg-repeat-x",
        className,
      )}
      style={{ backgroundImage: `url(${speckleUrl})`, backgroundSize: "auto 100%" }}
    />
  );
}

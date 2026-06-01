import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

export const SCROLL_REVEAL_VARIANTS = [
  "zoom",
  "peek",
  "rise",
  "drift-right",
  "tilt-rise",
  "pulse-up",
  "skew-in",
  "float-in",
  "corner-in",
  "ripple-fade",
] as const;

export type ScrollRevealVariant = (typeof SCROLL_REVEAL_VARIANTS)[number];

type ScrollRevealProps = {
  variant: ScrollRevealVariant;
  stagger?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

/** Passthrough wrapper — scroll animations disabled */
export function ScrollReveal({ className, style, children }: ScrollRevealProps) {
  if (!className && !style) return <>{children}</>;
  return (
    <div className={cn(className)} style={style}>
      {children}
    </div>
  );
}

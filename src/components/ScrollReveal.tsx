"use client";

import { type CSSProperties, type ReactNode, useEffect, useRef, useState } from "react";
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

function useReducedMotion(): boolean {
  const [yes, setYes] = useState(false);
  useEffect(() => {
    const mq =
      typeof window.matchMedia === "function"
        ? window.matchMedia("(prefers-reduced-motion: reduce)")
        : null;
    if (!mq) return undefined;
    setYes(mq.matches);
    const fn = () => setYes(mq.matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);
  return yes;
}

function useMounted(): boolean {
  const [m, setM] = useState(false);
  useEffect(() => {
    setM(true);
  }, []);
  return m;
}

function mostlyInViewport(el: HTMLElement): boolean {
  const r = el.getBoundingClientRect();
  const ih = window.innerHeight;
  const margin = ih * 0.1;
  return r.bottom > margin && r.top < ih - margin;
}

/**
 * Homepage blocks — exaggerated enter when scrolling into view, softened exit when leaving.
 */
export function ScrollReveal({ variant, stagger, className, style, children }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mounted = useMounted();
  const passive = reduced || !mounted;
  const [shown, setShown] = useState(true);

  useEffect(() => {
    if (passive) {
      setShown(true);
      return undefined;
    }

    const el = ref.current;
    if (!el) return undefined;

    setShown(mostlyInViewport(el));

    const update = (e: IntersectionObserverEntry) => {
      const ratio = e.intersectionRatio;
      const ok =
        e.isIntersecting &&
        (ratio >= 0.115 || ratio >= 0.999 || (ratio > 0 && mostlyInViewport(el)));
      setShown(ok);
    };

    const obs = new IntersectionObserver(
      ([e]) => {
        if (e) update(e);
      },
      {
        threshold: [0, 0.05, 0.115, 0.2, 0.35, 0.55],
        rootMargin: "5% 0px -15% 0px",
      },
    );

    obs.observe(el);
    const queued = obs.takeRecords();
    if (queued[0]) update(queued[0]);
    else setShown(mostlyInViewport(el));

    return () => obs.disconnect();
  }, [passive]);

  const dataShown = passive ? true : shown;

  return (
    <div
      ref={ref}
      data-scroll-reveal={variant}
      data-scroll-passive={passive ? "true" : "false"}
      data-scroll-shown={dataShown ? "true" : "false"}
      className={cn("scroll-reveal-scope", stagger && "scroll-reveal-stagger", className)}
      style={style}
    >
      {children}
    </div>
  );
}

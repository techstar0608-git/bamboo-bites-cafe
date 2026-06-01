import type { ReactNode } from "react";

/** Product list — 1 column mobile, 2 columns desktop */
export function FigmaMenuProductGrid({ children }: { children: ReactNode }) {
  return <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-4">{children}</div>;
}

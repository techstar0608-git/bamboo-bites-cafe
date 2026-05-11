import type { UberMenuRow } from "@/data/uber-menu.generated";

export function formatPricePair(r: UberMenuRow): string {
  const parts: string[] = [];
  if (r.pricePickup != null) parts.push(`$${money(r.pricePickup)} pickup`);
  if (r.priceUber != null) parts.push(`$${money(r.priceUber)} Uber Eats`);
  return parts.join(" · ");
}

function money(n: number): string {
  return Number.isInteger(n) ? String(n) : n.toFixed(2);
}

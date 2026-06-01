import leafDivider from "@/assets/Bambu/icons/leaf-divider.svg";
import { cn } from "@/lib/utils";

/** Figma leaf-branch ornament shown above section headings */
export function LeafDivider({ className }: { className?: string }) {
  return (
    <img
      src={leafDivider}
      alt=""
      aria-hidden="true"
      className={cn("mx-auto aspect-[143/27] w-28 select-none object-contain md:w-32", className)}
    />
  );
}

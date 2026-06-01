import { Link } from "@tanstack/react-router";
import catDrink from "@/assets/Bambu/icons/cat-drink.svg";
import catFood from "@/assets/Bambu/icons/cat-food.svg";
import catSnack from "@/assets/Bambu/icons/cat-snack.svg";

const items = [
  { to: "/coffee", label: "Coffee", icon: catDrink },
  { to: "/food", label: "Food", icon: catFood },
  { to: "/desserts", label: "Desserts", icon: catSnack },
] as const;

/** Figma Group 2 — three line-art category icons below the hero */
export function HomeCategoryStrip() {
  return (
    <nav
      aria-label="Menu categories"
      className="relative z-10 mx-auto -mt-6 flex max-w-md items-center justify-between px-9 py-6 md:max-w-lg md:px-12"
    >
      {items.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          className="group flex flex-col items-center gap-2 transition hover:opacity-90"
        >
          <span className="flex size-16 items-center justify-center md:size-[4.25rem]">
            <img src={item.icon} alt="" aria-hidden="true" className="size-9 md:size-10" />
          </span>
          <span className="text-xs font-medium tracking-wide text-foreground/80">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}

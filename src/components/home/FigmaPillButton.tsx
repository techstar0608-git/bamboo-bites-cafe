import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

type FigmaPillButtonProps = {
  children: React.ReactNode;
  className?: string;
} & (
  | { to: string; href?: never }
  | { href: string; to?: never; target?: string; rel?: string }
);

/** Small rounded CTA matching Figma mobile frames (Our Story →, View Full Menu, etc.) */
export function FigmaPillButton({ children, className, ...props }: FigmaPillButtonProps) {
  const classes = cn(
    "inline-flex min-h-7 items-center justify-center rounded-full bg-[#BD9C30] px-5 py-2 text-[0.8125rem] font-semibold tracking-[0.04em] text-white shadow-sm transition hover:bg-[#a8892a]",
    className,
  );

  if ("href" in props && props.href) {
    const { href, target, rel } = props;
    return (
      <a href={href} target={target} rel={rel} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link to={props.to!} className={classes}>
      {children}
    </Link>
  );
}

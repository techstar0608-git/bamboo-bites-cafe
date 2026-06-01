/** Decorative bamboo wave divider between sections (Figma Vector bands) */
export function FigmaBambooWave() {
  return (
    <div aria-hidden className="pointer-events-none overflow-hidden leading-none text-primary/25">
      <svg
        viewBox="0 0 390 28"
        preserveAspectRatio="none"
        className="block h-7 w-full min-w-full fill-current md:h-8"
      >
        <path d="M0 14c48-8 96-8 143 0s95 8 143 0 96-8 104 0v14H0Z" />
      </svg>
    </div>
  );
}

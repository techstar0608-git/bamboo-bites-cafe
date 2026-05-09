export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-3 text-primary">
      <span className="h-px w-8 bg-primary/60" />
      <span className="text-xs tracking-[0.35em] uppercase">{children}</span>
      <span className="h-px w-8 bg-primary/60" />
    </div>
  );
}

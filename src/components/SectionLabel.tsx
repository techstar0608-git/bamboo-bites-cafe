export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center justify-center gap-3">
      <span className="inline-block size-1.5 shrink-0 rotate-45 bg-primary" aria-hidden />
      <span className="text-[0.68rem] font-semibold tracking-[0.3em] uppercase text-primary">
        {children}
      </span>
      <span className="inline-block size-1.5 shrink-0 rotate-45 bg-primary" aria-hidden />
    </div>
  );
}

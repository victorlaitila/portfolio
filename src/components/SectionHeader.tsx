interface SectionHeaderProps {
  title: string;
  subtitle?: string;
}

export function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  const header = (
    <div className="text-center mb-8">
      <h2 className="font-display text-4xl sm:text-5xl tracking-widest uppercase font-bold mb-1 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]">
        {title}
      </h2>
      <div className="w-20 h-1 mx-auto rounded-full shadow-glow" />
    </div>
  );

  if (!subtitle) return header;

  return (
    <div className="text-center mb-12 animate-fade-in">
      {header}
      <p className="mt-6 text-lg text-muted-foreground">{subtitle}</p>
    </div>
  );
}

export default function SectionHeader({ title }: { title: string }) {
  return (
    <div className="text-center mb-8">
      <h2 className="text-4xl sm:text-5xl tracking-widest uppercase font-bold mb-1 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]" style={{fontFamily: 'Orbitron, sans-serif'}}>
        {title}
      </h2>
      <div className="w-20 h-1 bg-gradient-accent mx-auto rounded-full shadow-glow" />
    </div>
  );
}
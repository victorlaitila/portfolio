/**
 * Thin glowing neon separator dropped between sections: a sharp hairline in
 * the accent color that fades out at both edges.
 */
export function SectionDivider() {
  return (
    <div className="relative z-10 px-2" aria-hidden="true">
      <div
        className="h-px w-full bg-accent"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          boxShadow: "0 0 6px hsl(var(--accent) / 0.8), 0 0 14px hsl(var(--accent) / 0.4)",
        }}
      />
    </div>
  );
}

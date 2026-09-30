import { useMemo } from "react";

const BLOCK_COUNT = 64;
const MIN_HEIGHT_PX = 3;
const MAX_HEIGHT_PX = 16;
const SHADES = [0.25, 0.35, 0.5, 0.65, 0.8, 1];

interface PixelBlock {
  widthPct: number;
  height: number;
  opacity: number;
}

function buildPixelBlocks(): PixelBlock[] {
  const weights = Array.from({ length: BLOCK_COUNT }, () => 0.5 + Math.random() * 1.5);
  const totalWeight = weights.reduce((sum, w) => sum + w, 0);

  return weights.map((weight) => ({
    widthPct: (weight / totalWeight) * 100,
    height: MIN_HEIGHT_PX + Math.round(Math.random() * (MAX_HEIGHT_PX - MIN_HEIGHT_PX)),
    opacity: SHADES[Math.floor(Math.random() * SHADES.length)],
  }));
}

export function SectionDivider() {
  const blocks = useMemo(buildPixelBlocks, []);

  return (
    <div className="relative z-10 px-2" aria-hidden="true">
      <div
        className="flex items-center gap-px h-4 sm:h-5"
        style={{
          maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          filter:
            "drop-shadow(0 0 3px hsl(var(--accent) / 0.9)) drop-shadow(0 0 10px hsl(var(--accent) / 0.6)) drop-shadow(0 0 20px hsl(var(--accent) / 0.3))",
        }}
      >
        {blocks.map((block, index) => (
          <span
            key={index}
            style={{
              width: `${block.widthPct}%`,
              height: `${block.height}px`,
              backgroundColor: `hsl(var(--accent) / ${block.opacity})`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

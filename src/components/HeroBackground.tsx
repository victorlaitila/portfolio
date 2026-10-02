import type { CSSProperties } from "react";
import { useGlitchBurst } from "@/hooks/useGlitchBurst";
import { cn } from "@/lib/utils";
import heroCyan from "@/assets/hero-cyan.webp";
import heroCharcoal from "@/assets/hero-charcoal.webp";

// Periodic glitch burst: shows the charcoal frame in a flickering, RGB-split
// jump-cut every so often, then settles back on the cyan background.
const GLITCH_TIMING = {
  burstMs: 900,
  firstDelayMs: 500,
  minDelayMs: 7000,
  maxDelayMs: 13000,
};

// The base frame plus two tinted copies for the chromatic-aberration fringe.
// Styles and keyframes live in index.css under "Hero glitch".
const GLITCH_LAYERS = ["hero-glitch-base", "hero-glitch-cyan-tint", "hero-glitch-magenta-tint"];

/**
 * Digital-avatar hero image. The cyan frame is the permanent background;
 * the charcoal frame periodically flickers in as a glitch burst.
 */
export function HeroBackground() {
  const isGlitching = useGlitchBurst(GLITCH_TIMING);

  return (
    <div
      className="absolute inset-0 -z-10 overflow-hidden"
      aria-hidden="true"
      style={{ "--hero-glitch-duration": `${GLITCH_TIMING.burstMs}ms` } as CSSProperties}
    >
      <img src={heroCyan} alt="" className="hero-image" />
      {GLITCH_LAYERS.map((layer) => (
        <img
          key={layer}
          src={heroCharcoal}
          alt=""
          className={cn("hero-image hero-glitch-layer", layer, isGlitching && "hero-glitch-play")}
        />
      ))}
    </div>
  );
}

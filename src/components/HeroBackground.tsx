import type { CSSProperties } from "react";
import { useGlitchBurst } from "@/hooks/useGlitchBurst";
import { HERO_SPLIT_MEDIA } from "@/config/site";
import { cn } from "@/lib/utils";
import heroCyan from "@/assets/hero-cyan.webp";
import heroCharcoal from "@/assets/hero-charcoal.webp";
import heroCyanMobile from "@/assets/hero-cyan-mobile.webp";
import heroCharcoalMobile from "@/assets/hero-charcoal-mobile.webp";

// Fades the avatar into the page background so its body doesn't end in a hard edge.
const FADE_OUT = "linear-gradient(to bottom, black 60%, transparent 100%)";

// Periodic glitch burst: shows the charcoal frame in a flickering, RGB-split
// jump-cut every so often, then settles back on the cyan background.
const GLITCH_TIMING = {
  burstMs: 900,
  // Lands just after the hero title finishes typing out.
  firstDelayMs: 2400,
  minDelayMs: 3000,
  maxDelayMs: 6000,
};

// The base frame plus two tinted copies for the chromatic-aberration fringe.
// Styles and keyframes live in index.css under "Hero glitch".
const GLITCH_LAYERS = ["hero-glitch-base", "hero-glitch-cyan-tint", "hero-glitch-magenta-tint"];

// Outside the split layout the image is dimmed and only a slice around the avatar shows, so a small
// crop around the face is enough.
const MOBILE_MEDIA = `not all and ${HERO_SPLIT_MEDIA}`;

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
      style={
        {
          "--hero-glitch-duration": `${GLITCH_TIMING.burstMs}ms`,
          maskImage: FADE_OUT,
          WebkitMaskImage: FADE_OUT,
        } as CSSProperties
      }
    >
      <picture>
        <source media={MOBILE_MEDIA} srcSet={heroCyanMobile} />
        <img src={heroCyan} alt="" className="hero-image" {...{ fetchpriority: "high" }} />
      </picture>
      {/* Only needed once the first glitch burst plays, so it shouldn't compete with the cyan frame. */}
      {GLITCH_LAYERS.map((layer) => (
        <picture key={layer}>
          <source media={MOBILE_MEDIA} srcSet={heroCharcoalMobile} />
          <img
            src={heroCharcoal}
            alt=""
            {...{ fetchpriority: "low" }}
            className={cn("hero-image hero-glitch-layer", layer, isGlitching && "hero-glitch-play")}
          />
        </picture>
      ))}
      {/* Outside the split layout the text is centered over the avatar, so darken the image to keep it readable. */}
      <div className="absolute inset-0 bg-background/80 hero-split:hidden" />
    </div>
  );
}

import { useEffect, useState } from "react";

interface GlitchTiming {
  /** How long each burst lasts. */
  burstMs: number;
  /** Delay before the first burst, kept short so it isn't missed. */
  firstDelayMs: number;
  /** Bursts after the first one start at a random delay in this range. */
  minDelayMs: number;
  maxDelayMs: number;
}

/** Returns true while a glitch burst is playing, on a randomized schedule. */
export function useGlitchBurst({ burstMs, firstDelayMs, minDelayMs, maxDelayMs }: GlitchTiming): boolean {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    let scheduleTimer: ReturnType<typeof setTimeout>;
    let burstTimer: ReturnType<typeof setTimeout>;

    const runBurst = () => {
      setIsGlitching(true);
      burstTimer = setTimeout(() => {
        setIsGlitching(false);
        scheduleTimer = setTimeout(runBurst, minDelayMs + Math.random() * (maxDelayMs - minDelayMs));
      }, burstMs);
    };

    scheduleTimer = setTimeout(runBurst, firstDelayMs);

    return () => {
      clearTimeout(scheduleTimer);
      clearTimeout(burstTimer);
    };
  }, [burstMs, firstDelayMs, minDelayMs, maxDelayMs]);

  return isGlitching;
}

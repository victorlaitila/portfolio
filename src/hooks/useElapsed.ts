import { useEffect, useState } from "react";

/** Milliseconds since `running` became true, updated every frame until `untilMs` has passed. */
export function useElapsed(running: boolean, untilMs: number): number {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!running) return;
    const start = performance.now();
    let frame = 0;
    const tick = () => {
      const now = performance.now() - start;
      setElapsed(now);
      if (now < untilMs) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running, untilMs]);

  return elapsed;
}

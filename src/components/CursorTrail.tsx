import { useEffect, useRef, useState } from "react";

const MAX_PARTICLES = 20;

interface Particle {
  id: number;
  x: number;
  y: number;
}

/** Fading dots that follow the mouse pointer. */
export function CursorTrail() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const nextId = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const particle = { id: nextId.current++, x: e.clientX, y: e.clientY };
      setParticles((prev) => [...prev.slice(-MAX_PARTICLES), particle]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute w-2 h-2 bg-gradient-to-r from-emerald-400 to-primary/10 rounded-full animate-cursor-fade"
          style={{ left: p.x, top: p.y, transform: "translate(-50%, -50%)" }}
        />
      ))}
    </div>
  );
}

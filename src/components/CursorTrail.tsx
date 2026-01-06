import { useState, useEffect } from "react";

const MAX_PARTICLES = 20;

export default function CursorTrail() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newParticle = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now() + Math.random(),
      };

      setParticles((prev) => [...prev.slice(-MAX_PARTICLES), newParticle]);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-50">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute w-2 h-2 bg-gradient-to-r from-emerald-400 to-primary/10 rounded-full"
          style={{
            left: p.x,
            top: p.y,
            transform: "translate(-50%, -50%)",
            animation: "fadeOut 0.6s forwards",
          }}
        />
      ))}

      {/* Tailwind does not have keyframes by default, so we add it here */}
      <style>{`
        @keyframes fadeOut {
          0% { opacity: 0.8; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
        }
      `}</style>
    </div>
  );
}

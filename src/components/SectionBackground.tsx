// Fades the image in and out at the section's edges so neighbouring sections blend into each other.
const EDGE = "min(100px, 30%)";
const EDGE_FADE = `linear-gradient(to bottom, transparent, black ${EDGE}, black calc(100% - ${EDGE}), transparent)`;

/**
 * Per-section background image, absolutely positioned within whichever section it is used in.
 * Sections sit below the fold, so the image is lazy-loaded.
 */
export function SectionBackground({ src }: { src: string }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      aria-hidden="true"
      style={{ maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE }}
    >
      <img src={src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
    </div>
  );
}

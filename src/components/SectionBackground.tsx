/**
 * Per-section background image, absolutely positioned within whichever section it is used in.
 * Sections sit below the fold, so the image is lazy-loaded.
 */
export function SectionBackground({ src }: { src: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <img src={src} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover object-top" />
    </div>
  );
}

import { cn } from "@/lib/utils";

interface SectionBackgroundProps {
  src: string;
  className?: string;
}

/**
 * Per-section background image. Absolutely positioned within whichever section it is used in.
 */
export function SectionBackground({ src, className }: SectionBackgroundProps) {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <img
        src={src}
        alt=""
        className={cn("h-full w-full object-cover object-top", className)}
      />
    </div>
  );
}

import type { ReactNode } from "react";
import type { SectionId } from "@/config/site";
import { cn } from "@/lib/utils";
import { SectionBackground } from "./SectionBackground";
import { SectionHeader } from "./SectionHeader";

interface SectionProps {
  id: SectionId;
  title: string;
  subtitle?: string;
  /** Background image imported from src/assets. */
  background: string;
  /** Overrides the content width (default `max-w-6xl`). */
  className?: string;
  children: ReactNode;
}

/** Standard page section: background image, centered content column and section heading. */
export function Section({ id, title, subtitle, background, className, children }: SectionProps) {
  return (
    <section id={id} className="py-20 relative overflow-hidden">
      <SectionBackground src={background} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={cn("max-w-6xl mx-auto", className)}>
          <SectionHeader title={title} subtitle={subtitle} />
          {children}
        </div>
      </div>
    </section>
  );
}

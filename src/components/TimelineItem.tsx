import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { GlowCard } from "./GlowCard";

interface TimelineItemProps {
  icon: LucideIcon;
  title: string;
  /** The line under the title, e.g. company and period. */
  meta: ReactNode;
  /** Draws the rail segment down to the next item. */
  hasNext: boolean;
  children?: ReactNode;
}

/** One entry in a vertical timeline (Experience, Education). */
export function TimelineItem({ icon: Icon, title, meta, hasNext, children }: TimelineItemProps) {
  return (
    <div className="relative flex gap-4 sm:gap-6">
      {/* Timeline rail: glowing dot aligned to the card's title row,
          connected to the next entry by a vertical line segment. */}
      <div className="relative flex w-6 shrink-0 justify-center" aria-hidden="true">
        <span className="absolute top-6 h-3 w-3 rounded-full bg-accent shadow-[0_0_10px_2px_hsl(var(--accent)/0.7)] ring-4 ring-background" />
        {hasNext && (
          <span className="absolute left-1/2 top-6 -bottom-12 w-px -translate-x-1/2 bg-gradient-to-b from-accent via-accent/50 to-accent/20" />
        )}
      </div>

      <GlowCard className="flex-1 p-6">
        <div className="flex gap-4">
          <Icon className="h-5 w-5 text-primary relative top-1 hidden md:block" />
          <div className="flex-1 space-y-3">
            <div>
              <div className="flex items-start gap-3">
                <Icon className="h-5 w-5 text-primary relative top-1 md:hidden" />
                <h3 className="font-display text-lg font-bold">{title}</h3>
              </div>
              {meta}
            </div>
            {children}
          </div>
        </div>
      </GlowCard>
    </div>
  );
}

/** Thin vertical separator between items in a timeline entry's meta line. */
export function MetaSeparator() {
  return <span aria-hidden className="h-4 w-px m-2 bg-muted-foreground" />;
}

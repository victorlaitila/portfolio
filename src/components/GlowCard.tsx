import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { Shimmer } from "@/components/ui/shimmer";
import { cn } from "@/lib/utils";

interface GlowCardProps {
  className?: string;
  children: ReactNode;
}

/** The site's standard content card: translucent background, glow and shimmer on hover. */
export function GlowCard({ className, children }: GlowCardProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden group bg-background/80 border-border/50 hover:border-primary/40 transition-all duration-500 animate-scale-in hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.3)]",
        className,
      )}
    >
      <Shimmer />
      {children}
    </Card>
  );
}

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Puzzle, Users, Code2, Brain, Footprints, Dumbbell } from "lucide-react";
import Shimmer from "./ui/shimmer";
import SectionHeader from "./SectionHeader";
import { getPortfolioExtensions } from "@/data";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Code2,
  Puzzle,
  Users,
  Brain,
};

export function About() {
  const extensions = getPortfolioExtensions();
  const { about } = extensions;

  const highlights = about.highlights.map(h => ({
    icon: iconMap[h.icon] || Code2,
    title: h.title,
  }));

  return (
    <section id="about" className="py-20 relative overflow-hidden ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="About Me" />
          {/* Badges Row */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {highlights.map((item, index) => (
              <Badge 
                key={index}
                variant="secondary"
                className="px-6 py-3 text-base font-medium bg-background/80 hover:bg-background/80 border border-border/50"
              >
                <item.icon className="h-5 w-5 mr-2 text-primary" />
                {item.title}
              </Badge>
            ))}
          </div>

          {/* Description Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="relative bg-background/80 border-border/50 hover:border-primary/40 transition-all duration-500 animate-scale-in overflow-hidden group hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.3)]">
              <Shimmer />
              <CardContent className="relative p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Footprints className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    My Journey
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {about.journey}
                </p>
              </CardContent>
            </Card>

            <Card className="relative bg-background/80 border-border/50 hover:border-primary/40 transition-all duration-500 animate-scale-in overflow-hidden group hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.3)]">
              <Shimmer />
              <CardContent className="relative p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Dumbbell className="h-6 w-6 text-primary" />
                  <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Beyond Tech
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {about.beyondTech}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

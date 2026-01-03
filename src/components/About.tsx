import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Puzzle, Users, Code2, Brain } from "lucide-react";
import Shimmer from "./ui/shimmer";

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
  },
  {
    icon: Puzzle,
    title: "Problem Solver",
  },
  {
    icon: Users,
    title: "Team Player",
  },
  {
    icon: Brain,
    title: "Fast Learner",
  },
];

export function About() {
  return (
    <section id="about" className="py-20 relative overflow-hidden ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-4xl sm:text-5xl tracking-widest uppercase font-bold mb-1 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]">
              About Me
            </h2>
            <div className="w-20 h-1  mx-auto rounded-full shadow-glow" />
          </div>

          {/* Badges Row */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in">
            {highlights.map((item, index) => (
              <Badge 
                key={index}
                variant="secondary"
                className="px-6 py-3 text-base font-medium bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/40 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <item.icon className="h-5 w-5 mr-2 text-primary" />
                {item.title}
              </Badge>
            ))}
          </div>

          {/* Description Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="relative bg-gradient-to-br from-card to-card border-border/50 hover:border-primary/40 transition-all duration-500 animate-scale-in overflow-hidden group hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.3)]">
              <Shimmer />
              <CardContent className="relative p-8">
                <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  My Journey
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  I'm a passionate software engineer with a keen eye for creating seamless user experiences. 
                  Driven by a profound interest in technology, I am committed to continuously expanding my knowledge and skills to stay at the forefront of innovation.
                </p>
              </CardContent>
            </Card>

            <Card className="relative bg-gradient-to-br from-card to-card border-border/50 hover:border-primary/40 transition-all duration-500 animate-scale-in overflow-hidden group hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.3)]">
              <Shimmer />
              <CardContent className="relative p-8">
                <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Beyond Code
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  While technology fuels my professional journey, I find balance by hitting the gym and strumming my guitar. Fitness and music not only keep me grounded, but also enhance my creativity and focus.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

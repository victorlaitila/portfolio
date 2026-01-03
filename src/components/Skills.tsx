import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Code, Database, Wrench, Cloud } from "lucide-react";
import Shimmer from "./ui/shimmer";

const skillCategories = [
  {
    title: "Frontend",
    icon: Code,
    skills: ["React", "Redux", "TypeScript", "Vue.js", "AngularJS", "CSS", "Tailwind CSS"],
  },
  {
    title: "Backend",
    icon: Database,
    skills: ["Node.js", "Express", "Python", "C/C++", "Java", "Scala", "PostgreSQL", "MongoDB"],
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    skills: ["Azure DevOps", "Google Cloud", "Docker", "CI/CD", "Terraform"],
  },
  {
    title: "Tools & Others",
    icon: Wrench,
    skills: ["Git", "Jest", "Robot Framework", "REST APIs", "Agile", "Figma"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="py-20 relative overflow-hidden">
    
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h2 className="text-4xl sm:text-5xl tracking-widest uppercase font-bold mb-1 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]">
              Skills & Tech Stack
            </h2>
            <div className="w-20 h-1 bg-gradient-accent mx-auto rounded-full shadow-glow" />
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => (
              <Card 
                key={index}
                className="group relative p-8 bg-background/80 border-border/50 hover:border-primary/40 transition-all duration-500 animate-scale-in overflow-hidden group hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.3)]"
              >                  
                <Shimmer />
                <div className="relative z-10">
                  {/* Icon header with enhanced styling */}
                  <div className="flex items-center gap-3 mb-6">
                    <category.icon className="h-6 w-6 text-primary" />
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {category.title}
                    </h3>
                  </div>
                  
                  {/* Skills badges */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge 
                        key={skill}
                        variant="secondary"
                        className="px-4 py-2 text-sm font-medium bg-background/80 hover:bg-background/80 border border-border/50 cursor-default"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

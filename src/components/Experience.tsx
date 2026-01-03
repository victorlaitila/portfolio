import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Briefcase } from "lucide-react";
import Shimmer from "./ui/shimmer";

const experiences = [
  {
    title: "Software Developer",
    company: "ABB",
    period: "May 2023 - Present",
    description: "Made significant contributions to the Drive Composer 3 project, successfully closing over 250 tickets of varying complexity.",
    achievements: [
      "Full stack development using TypeScript, Vue and C++",
      "Designing software architecture with comprehensive documentation",
      "Using Git and Azure DevOps for management and version control",
      "Close collaboration with other teams, such as designers and lower-level backend developers",
      "Demoing implemented features to other teams and stakeholders",
      "International SCRUM-based project"
    ],
  },
  {
    title: "Software Developer",
    company: "Teonos Oy",
    period: "May 2022 - Mar 2023",
    description: "Developed new and improved existing features in an online booking service called Slotti.",
    achievements: [
      "Frontend development using TypeScript, Vue and AngularJS",
      "Using Git and GitLab for team collaboration, version control and project management",
    ],
  },
  {
    title: "Summer Intern",
    company: "ABB",
    period: "Jun 2021 - Aug 2021",
    achievements: [
      "Different kinds of manual work with electric motors in a production chain.",
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h2 className="text-4xl sm:text-5xl tracking-widest uppercase font-bold mb-1 bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]">Experience</h2>
            <div className="w-20 h-1 bg-gradient-accent mx-auto rounded-full" />
          </div>

          <div className="space-y-6 mb-12">
            {experiences.map((exp, index) => (
              <Card 
                key={index}
                className="relative p-6 hover:border-primary/40 transition-all duration-500 
                  animate-scale-in overflow-hidden group 
                  hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.3)]"
              >
                <Shimmer />
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-black to-gray-900 rounded-lg">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h3 className="text-xl font-bold">{exp.title}</h3>
                        <p className="text-muted-foreground">{exp.company}</p>
                      </div>
                      <span className="text-sm text-muted-foreground font-medium">
                        {exp.period}
                      </span>
                    </div>

                    <p className="text-muted-foreground leading-relaxed">
                      {exp.description}
                    </p>

                    <ul className="space-y-3">
                      {exp.achievements.map((achievement, i) => (
                        <li 
                          key={i}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="text-accent">▹</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center animate-fade-in">
            <Button variant="hero" size="lg" asChild>
              <a href="/cv.pdf" download>
                <Download className="mr-2 h-5 w-5" />
                Download CV
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

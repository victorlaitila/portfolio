import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Briefcase } from "lucide-react";
import Shimmer from "./ui/shimmer";

const experiences = [
  {
    title: "Software Developer",
    company: "ABB",
    period: "May 2023 - Present",
    achievements: [
      "Closed 250+ tickets across bug fixes, feature development, and refactoring in a large-scale industrial software product (Drive Composer 3)",
      "Delivered production-ready features using Vue, TypeScript, C++, Azure DevOps and Git",
      "Improved system performance, maintainability, and overall quality while reducing technical debt",
      "Designed software architecture and authored comprehensive technical documentation",
      "Delivered regular feature demos to stakeholders, accelerating feedback and alignment",
      "Worked in an international, SCRUM-based software team requiring close cross-functional collaboration",
    ],
  },
  {
    title: "Software Developer",
    company: "Teonos Oy",
    period: "May 2022 - Mar 2023",
    achievements: [
      "Developed and maintained core functionality in an online booking system (Slotti)",
      "Implemented front-end features using Vue, TypeScript, AngularJS, Git and GitLab",
      "Contributed to a major refactoring effort, reducing technical debt and improving system performance and scalability",
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
  const cvSrc = `${import.meta.env.BASE_URL}cv.pdf`;

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
                className="bg-background/80 relative p-6 hover:border-primary/40 transition-all duration-500 
                  animate-scale-in overflow-hidden group 
                  hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.3)]"
              >
                <Shimmer />
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  <Briefcase className="h-5 w-5 text-primary relative top-1" />
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <h3 className="text-xl font-bold">{exp.title}</h3>
                        <div className="flex items-center">
                          <p className="text-muted-foreground">{exp.company}</p>
                          <span aria-hidden className="h-4 w-px m-2 bg-muted-foreground" />
                          <p className="text-muted-foreground">{exp.period}</p>
                        </div>
                      </div>
                    </div>

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
              <a href={cvSrc} download>
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

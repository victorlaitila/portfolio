import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, BriefcaseBusiness } from "lucide-react";
import Shimmer from "./ui/shimmer";
import SectionHeader from "./SectionHeader";
import { getCareerData } from "@/data";

const technologyKeywords = [
  "Azure DevOps",
  "TypeScript",
  "AngularJS",
  "GitLab",
  "C#/.NET",
  "Vue.js",
  "SCRUM",
  "Vue",
  "Git",
];

const technologyPattern = new RegExp(
  `(${technologyKeywords
    .sort((a, b) => b.length - a.length)
    .map((keyword) => keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|")})`,
  "gi"
);

function renderAchievementWithTechHighlights(text: string) {
  const chunks = text.split(technologyPattern);

  return chunks.map((chunk, index) => {
    const isTechnology = technologyKeywords.some(
      (keyword) => keyword.toLowerCase() === chunk.toLowerCase()
    );

    if (!isTechnology) {
      return <span key={`${chunk}-${index}`}>{chunk}</span>;
    }

    return (
      <strong key={`${chunk}-${index}`} className="font-semibold text-foreground">
        {chunk}
      </strong>
    );
  });
}

// Format YYYY-MM to human readable
function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split('-');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${monthNames[parseInt(month) - 1]} ${year}`;
}

export function Experience() {
  const career = getCareerData();
  const cvSrc = `${import.meta.env.BASE_URL}Victor-Laitila-Software-Engineer-CV.pdf`;

  // Map career data to display format
  const experiences = career.experience.map(exp => ({
    title: exp.title,
    company: exp.company,
    period: `${formatDate(exp.start)} - ${exp.end === 'present' ? 'Present' : formatDate(exp.end)}`,
    achievements: exp.highlights,
  }));

  return (
    <section id="experience" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="Experience" />

          <div className="space-y-6 mb-12">
            {experiences.map((exp, index) => (
              <Card 
                key={index}
                className="bg-background/80 relative p-6 hover:border-primary/40 transition-all duration-500 
                  animate-scale-in overflow-hidden group 
                  hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.3)]"
              >
                <Shimmer />
                <div className="flex gap-4">
                  <BriefcaseBusiness className="h-5 w-5 text-primary relative top-1 hidden md:block" />
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <div className="flex items-start gap-3">
                          <BriefcaseBusiness className="h-5 w-5 text-primary relative top-1 md:hidden" />
                          <h3 className="text-xl font-bold">{exp.title}</h3>
                        </div>
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
                          <span>{renderAchievementWithTechHighlights(achievement)}</span>
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

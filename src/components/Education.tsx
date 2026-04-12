import { Card } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import Shimmer from "./ui/shimmer";
import SectionHeader from "./SectionHeader";
import { getCareerData } from "@/data";

function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split("-");
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${monthNames[parseInt(month) - 1]} ${year}`;
}

function formatEndDate(end: string): string {
  if (end === "present") return "Present";
  if (end.startsWith("expected ")) {
    return `Expected ${formatDate(end.replace("expected ", ""))}`;
  }
  return formatDate(end);
}

export function Education() {
  const career = getCareerData();

  const educationItems = career.education.map((edu) => ({
    degree: edu.degree,
    institution: edu.institution,
    period: `${formatDate(edu.start)} - ${formatEndDate(edu.end)}`,
    details: edu.details || [],
  }));

  return (
    <section id="education" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="Education" />

          <div className="space-y-6">
            {educationItems.map((edu, index) => (
              <Card
                key={index}
                className="bg-background/80 relative p-6 hover:border-primary/40 transition-all duration-500 
                  animate-scale-in overflow-hidden group 
                  hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.3)]"
              >
                <Shimmer />
                <div className="flex gap-4">
                  <GraduationCap className="h-5 w-5 text-primary relative top-1 hidden md:block" />
                  <div className="flex-1 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <div className="flex items-start gap-3">
                          <GraduationCap className="h-5 w-5 text-primary relative top-1 md:hidden" />
                          <h3 className="text-xl font-bold">{edu.degree}</h3>
                        </div>
                        <div className="flex items-center">
                          <p className="text-muted-foreground">{edu.institution}</p>
                          <span aria-hidden className="h-4 w-px m-2 bg-muted-foreground" />
                          <p className="text-muted-foreground">{edu.period}</p>
                        </div>
                      </div>
                    </div>

                    {edu.details.length > 0 && (
                      <ul className="space-y-3">
                        {edu.details.map((detail, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span className="text-accent">▹</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}
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

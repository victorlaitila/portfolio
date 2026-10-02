import { Card } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";
import Shimmer from "./ui/shimmer";
import SectionHeader from "./SectionHeader";
import { SectionBackground } from "./SectionBackground";
import { getCareerData } from "@/data";
import backgroundImg from "@/assets/background-education.png";

function formatDate(dateStr: string): string {
  const [year, month] = dateStr.split("-");
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${monthNames[parseInt(month) - 1]} ${year}`;
}

function formatEndDate(end: string): string {
  if (end === "present") return "Present";
  if (end.startsWith("expected ")) {
    return `Exp. ${formatDate(end.replace("expected ", ""))}`;
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
      <SectionBackground src={backgroundImg} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionHeader title="Academic Background" />

          <div className="space-y-6">
            {educationItems.map((edu, index) => (
              <div key={index} className="relative flex gap-4 sm:gap-6">
                {/* Timeline rail: glowing dot aligned to the card's title row,
                    connected to the next entry by a vertical line segment. */}
                <div className="relative flex w-6 shrink-0 justify-center" aria-hidden="true">
                  <span className="absolute top-6 h-3 w-3 rounded-full bg-accent shadow-[0_0_10px_2px_hsl(var(--accent)/0.7)] ring-4 ring-background" />
                  {index < educationItems.length - 1 && (
                    <span className="absolute left-1/2 top-6 -bottom-12 w-px -translate-x-1/2 bg-gradient-to-b from-accent via-accent/50 to-accent/20" />
                  )}
                </div>

                <Card
                  className="flex-1 bg-background/80 relative p-6 hover:border-primary/40 transition-all duration-500
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
                            <h3 className="text-lg font-bold" style={{ fontFamily: "Orbitron, sans-serif" }}>
                              {edu.degree}
                            </h3>
                          </div>
                          <div className="flex flex-row sm:items-center gap-1 sm:gap-0 mt-2">
                            <p className="text-muted-foreground">{edu.institution}</p>
                            <span aria-hidden className="h-4 w-px m-2 bg-muted-foreground" />
                            <p className="text-muted-foreground sm:whitespace-nowrap">{edu.period}</p>
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
                              <span>{detail.toString()}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

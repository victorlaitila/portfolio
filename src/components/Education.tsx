import { Award, GraduationCap } from "lucide-react";
import { SECTION_IDS } from "@/config/site";
import { getCareerData } from "@/data";
import backgroundImg from "@/assets/background-education.webp";
import { BulletList } from "./BulletList";
import { GlowCard } from "./GlowCard";
import { Section } from "./Section";
import { MetaSeparator, Period, TimelineItem } from "./TimelineItem";

export function Education() {
  const { education, courses, honors } = getCareerData();
  const extras = [...courses, ...honors];

  return (
    <Section id={SECTION_IDS.education} title="Academic Background" background={backgroundImg}>
      <div className="space-y-6">
        {education.map((edu, index) => (
          <TimelineItem
            key={`${edu.institution}-${edu.degree}`}
            icon={GraduationCap}
            title={edu.degree}
            hasNext={index < education.length - 1}
            meta={
              <div className="flex items-center mt-2 text-sm sm:text-base">
                <p className="text-muted-foreground">{edu.institution}</p>
                <MetaSeparator />
                <Period start={edu.start} end={edu.end} />
              </div>
            }
          >
            <BulletList items={edu.details} />
          </TimelineItem>
        ))}

        {extras.length > 0 && (
          // Offset by the timeline rail's width and gap so it lines up with the cards above.
          <GlowCard className="ml-10 sm:ml-12 p-6">
            <div className="flex items-start gap-3 mb-3">
              <Award className="h-5 w-5 text-primary relative top-1" />
              <h3 className="font-display text-lg font-bold">Courses & Honors</h3>
            </div>
            <BulletList items={extras} />
          </GlowCard>
        )}
      </div>
    </Section>
  );
}

import { GraduationCap } from "lucide-react";
import { SECTION_IDS } from "@/config/site";
import { getCareerData } from "@/data";
import backgroundImg from "@/assets/background-education.webp";
import { BulletList } from "./BulletList";
import { Section } from "./Section";
import { MetaSeparator, Period, TimelineItem } from "./TimelineItem";

export function Education() {
  const { education } = getCareerData();

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
      </div>
    </Section>
  );
}

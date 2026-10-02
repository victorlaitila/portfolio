import { GraduationCap } from "lucide-react";
import { SECTION_IDS } from "@/config/site";
import { getCareerData } from "@/data";
import { formatPeriod } from "@/lib/dates";
import backgroundImg from "@/assets/background-education.webp";
import { BulletList } from "./BulletList";
import { Section } from "./Section";
import { MetaSeparator, TimelineItem } from "./TimelineItem";

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
              <div className="flex flex-row sm:items-center gap-1 sm:gap-0 mt-2">
                <p className="text-muted-foreground">{edu.institution}</p>
                <MetaSeparator />
                <p className="text-muted-foreground sm:whitespace-nowrap">{formatPeriod(edu.start, edu.end)}</p>
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

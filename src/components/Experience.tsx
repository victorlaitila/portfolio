import { BriefcaseBusiness, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CV_FILENAME, SECTION_IDS } from "@/config/site";
import { getCareerData } from "@/data";
import { formatPeriod } from "@/lib/dates";
import { splitByKeywords } from "@/lib/keywords";
import backgroundImg from "@/assets/background-experience.webp";
import { BulletList } from "./BulletList";
import { Section } from "./Section";
import { MetaSeparator, TimelineItem } from "./TimelineItem";

function HighlightedText({ text, keywords }: { text: string; keywords: string[] }) {
  return (
    <>
      {splitByKeywords(text, keywords).map(({ text: chunk, isKeyword }, index) =>
        isKeyword ? (
          <strong key={index} className="font-semibold text-foreground">
            {chunk}
          </strong>
        ) : (
          <span key={index}>{chunk}</span>
        ),
      )}
    </>
  );
}

export function Experience() {
  const { experience, keywords } = getCareerData();

  return (
    <Section id={SECTION_IDS.experience} title="Professional Experience" background={backgroundImg}>
      <div className="space-y-6 mb-12">
        {experience.map((exp, index) => (
          <TimelineItem
            key={`${exp.company}-${exp.start}`}
            icon={BriefcaseBusiness}
            title={exp.title}
            hasNext={index < experience.length - 1}
            meta={
              <div className="flex items-center">
                <p className="text-muted-foreground">{exp.company}</p>
                <MetaSeparator />
                <p className="text-muted-foreground">{formatPeriod(exp.start, exp.end)}</p>
              </div>
            }
          >
            <BulletList
              items={exp.highlights.map((highlight) => (
                <HighlightedText text={highlight} keywords={keywords} />
              ))}
            />
          </TimelineItem>
        ))}
      </div>

      <div className="text-center animate-fade-in">
        <Button variant="hero" size="lg" asChild className="font-display font-bold">
          <a href={`${import.meta.env.BASE_URL}${CV_FILENAME}`} download>
            <Download className="mr-2 h-5 w-5" />
            Download CV
          </a>
        </Button>
      </div>
    </Section>
  );
}

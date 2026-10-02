import { CloudUpload, DatabaseBackup, SquareCode, Wrench, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SECTION_IDS } from "@/config/site";
import { getCareerData } from "@/data";
import { getSkillIcon } from "@/data/skillIcons";
import { SKILL_CATEGORIES, type SkillCategory } from "@/data/types";
import backgroundImg from "@/assets/background-skills.webp";
import { GlowCard } from "./GlowCard";
import { Section } from "./Section";

const CATEGORY_HEADINGS: Record<SkillCategory, { title: string; icon: LucideIcon }> = {
  frontend: { title: "Frontend", icon: SquareCode },
  backend: { title: "Backend & Data", icon: DatabaseBackup },
  technologies: { title: "Cloud, Testing & DevOps", icon: CloudUpload },
  practices: { title: "Engineering Practices", icon: Wrench },
};

export function Skills() {
  const { skills } = getCareerData();
  const categories = SKILL_CATEGORIES.filter((category) => skills[category].length > 0);

  return (
    <Section id={SECTION_IDS.skills} title="Skills & Tech Stack" background={backgroundImg}>
      <div className="grid md:grid-cols-2 gap-8">
        {categories.map((category) => {
          const { title, icon: Icon } = CATEGORY_HEADINGS[category];
          return (
            <GlowCard key={category} className="p-8">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <Icon className="h-6 w-6 text-primary" />
                  <h3 className="font-display text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    {title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {skills[category].map((skill) => {
                    const SkillIcon = getSkillIcon(skill);
                    return (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="gap-1.5 px-4 py-2 text-sm font-medium bg-background/80 hover:bg-background/80 border border-border/50 cursor-default"
                      >
                        {SkillIcon && <SkillIcon className="h-3.5 w-3.5 shrink-0 opacity-80" />}
                        {skill}
                      </Badge>
                    );
                  })}
                </div>
              </div>
            </GlowCard>
          );
        })}
      </div>
    </Section>
  );
}

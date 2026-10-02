import { Badge } from "@/components/ui/badge";
import { CardContent } from "@/components/ui/card";
import { SECTION_IDS } from "@/config/site";
import { getPortfolioExtensions } from "@/data";
import backgroundImg from "@/assets/background-general.webp";
import { GlowCard } from "./GlowCard";
import { Section } from "./Section";

export function About() {
  const { about } = getPortfolioExtensions();

  return (
    <Section id={SECTION_IDS.about} title="About Me" background={backgroundImg}>
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {about.highlights.map(({ icon: Icon, title }) => (
          <Badge
            key={title}
            variant="secondary"
            className="font-display px-6 py-3 text-sm font-medium bg-background/80 hover:bg-background/80 border border-border/50"
          >
            <Icon className="h-5 w-5 mr-2 text-primary" />
            {title}
          </Badge>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {about.stories.map(({ icon: Icon, title, text }) => (
          <GlowCard key={title}>
            <CardContent className="relative p-8">
              <div className="flex items-center gap-3 mb-4">
                <Icon className="h-6 w-6 text-primary" />
                <h3 className="font-display text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {title}
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed">{text}</p>
            </CardContent>
          </GlowCard>
        ))}
      </div>
    </Section>
  );
}

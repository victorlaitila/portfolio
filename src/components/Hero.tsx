import { ArrowDown, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SECTION_IDS } from "@/config/site";
import { getCareerData, getPortfolioExtensions } from "@/data";
import { useTypewriter } from "@/hooks/useTypewriter";
import { CursorTrail } from "./CursorTrail";
import { HeroBackground } from "./HeroBackground";
import { SocialLinks } from "./SocialLinks";

const GRADIENT_TEXT =
  "bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent drop-shadow-[0_0_12px_hsl(var(--primary)/0.6)]";
const GLOW_TEXT = "text-foreground drop-shadow-[0_0_8px_hsl(var(--primary)/0.4)]";
const GREETING = "font-display text-xs sm:text-sm tracking-[0.3em] uppercase font-bold drop-shadow-[0_0_8px_hsl(var(--accent)/0.5)]";

export function Hero() {
  const { personal } = getCareerData();
  const { tagline } = getPortfolioExtensions();

  const [firstName, ...lastNames] = personal.name.split(" ");
  // The title's first word is highlighted, e.g. "Software" in "Software Engineer".
  const titleBreak = personal.title.indexOf(" ") + 1 || personal.title.length;
  const typedTitle = useTypewriter(personal.title);

  return (
    <section
      id={SECTION_IDS.home}
      className="min-h-screen flex items-center relative z-10 overflow-hidden pt-24 pb-16 lg:pt-16 lg:pb-0"
    >
      <CursorTrail />
      <HeroBackground />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="space-y-6 md:space-y-8 animate-fade-in text-center lg:text-left order-2 lg:order-1">
            <div className="space-y-2 md:space-y-4">
              <div className="flex justify-center lg:justify-start gap-2">
                <p className={`${GREETING} text-accent`}>Hi,</p>
                <p className={GREETING}>I'm</p>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-widest uppercase font-bold">
                <span className={GLOW_TEXT}>{firstName} </span>
                <span className={GRADIENT_TEXT}>{lastNames.join(" ")}</span>
              </h1>
              <h2 className="font-display sm:text-2xl md:text-3xl lg:text-4xl tracking-widest uppercase font-bold">
                <span className={`${GRADIENT_TEXT} tracking-[4px]`}>{typedTitle.slice(0, titleBreak)}</span>
                <span className={`whitespace-nowrap ${GLOW_TEXT} tracking-[4px]`}>
                  {typedTitle.slice(titleBreak)}
                  <span className="animate-pulse relative bottom-0.5 ml-1">|</span>
                </span>
              </h2>
            </div>

            <p className="font-display text-sm sm:text-base text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
              {tagline}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Button variant="hero" size="lg" asChild className="font-display font-bold">
                <a href={`#${SECTION_IDS.projects}`}>View Projects</a>
              </Button>
              <Button variant="hero-outline" size="lg" asChild className="font-display">
                <a href={`#${SECTION_IDS.contact}`}>Contact Me</a>
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <SocialLinks />
              <div className="flex items-center gap-2 text-muted-foreground ml-4">
                <MapPin className="h-5 w-5 text-accent/90" />
                <span className="font-display text-xs tracking-wider uppercase font-medium">{personal.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href={`#${SECTION_IDS.about}`} aria-label="Scroll to about section">
          <ArrowDown className="h-6 w-6 mx-auto text-muted-foreground" />
        </a>
      </div>
    </section>
  );
}

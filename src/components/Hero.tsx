import { Button } from "@/components/ui/button";
import { MapPin, Mail, ArrowDown } from "lucide-react";
import { TbBrandGithub, TbBrandLinkedin } from "react-icons/tb";
import CursorTrail from "./CursorTrail";
import { useState, useEffect } from "react";
import { getCareerData, getPortfolioExtensions } from "@/data";
import { cn } from "@/lib/utils";
import heroCyan from "@/assets/hero-cyan.jpeg";
import heroCharcoal from "@/assets/hero-charcoal.jpeg";

// Periodic glitch burst: shows the charcoal frame in a flickering, RGB-split
// jump-cut every so often, then settles back on the cyan background.
const GLITCH_BURST_MS = 900;
const GLITCH_FIRST_DELAY_MS = 500;
const GLITCH_MIN_DELAY_MS = 7000;
const GLITCH_MAX_DELAY_MS = 13000;

export function Hero() {
  const career = getCareerData();
  const extensions = getPortfolioExtensions();
  const { personal } = career;

  const [displayedText, setDisplayedText] = useState("");
  const fullText = `${personal.title} `;
  const typingSpeed = 100;

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [fullText]);

  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    let scheduleTimer: ReturnType<typeof setTimeout>;
    let burstTimer: ReturnType<typeof setTimeout>;

    const runBurst = () => {
      setIsGlitching(true);
      burstTimer = setTimeout(() => {
        setIsGlitching(false);
        scheduleNextGlitch();
      }, GLITCH_BURST_MS);
    };

    const scheduleNextGlitch = () => {
      const delay = GLITCH_MIN_DELAY_MS + Math.random() * (GLITCH_MAX_DELAY_MS - GLITCH_MIN_DELAY_MS);
      scheduleTimer = setTimeout(runBurst, delay);
    };

    // Fire the first glitch almost immediately so it isn't missed; after that,
    // fall back to the randomized cadence.
    scheduleTimer = setTimeout(runBurst, GLITCH_FIRST_DELAY_MS);

    return () => {
      clearTimeout(scheduleTimer);
      clearTimeout(burstTimer);
    };
  }, []);

  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative z-10 overflow-hidden pt-24 pb-16 lg:pt-16 lg:pb-0"
    >
      <CursorTrail />

      {/* Background: digital-avatar hero image. The cyan frame is the permanent
          background; the charcoal frame periodically flickers in as a glitch burst. */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <img
          src={heroCyan}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[78%_center] sm:object-[75%_center] lg:object-[72%_center]"
        />

        <img
          src={heroCharcoal}
          alt=""
          className={cn("hero-glitch-layer hero-glitch-base", isGlitching && "hero-glitch-play")}
        />
        <img
          src={heroCharcoal}
          alt=""
          className={cn("hero-glitch-layer hero-glitch-cyan-tint", isGlitching && "hero-glitch-play")}
        />
        <img
          src={heroCharcoal}
          alt=""
          className={cn("hero-glitch-layer hero-glitch-magenta-tint", isGlitching && "hero-glitch-play")}
        />

        <style>{`
          .hero-glitch-layer {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: 78% center;
            pointer-events: none;
            opacity: 0;
            will-change: opacity, transform, clip-path;
          }
          @media (min-width: 640px) {
            .hero-glitch-layer { object-position: 75% center; }
          }
          @media (min-width: 1024px) {
            .hero-glitch-layer { object-position: 72% center; }
          }

          .hero-glitch-cyan-tint,
          .hero-glitch-magenta-tint {
            mix-blend-mode: screen;
          }
          .hero-glitch-cyan-tint {
            filter: grayscale(1) sepia(1) hue-rotate(152deg) saturate(2) brightness(1.05);
          }
          .hero-glitch-magenta-tint {
            filter: grayscale(1) sepia(1) hue-rotate(305deg) saturate(2) brightness(1);
          }

          .hero-glitch-base.hero-glitch-play {
            animation: hero-glitch-base-flicker ${GLITCH_BURST_MS}ms steps(1, end) 1;
          }
          .hero-glitch-cyan-tint.hero-glitch-play {
            animation: hero-glitch-cyan-flicker ${GLITCH_BURST_MS}ms steps(1, end) 1;
          }
          .hero-glitch-magenta-tint.hero-glitch-play {
            animation: hero-glitch-magenta-flicker ${GLITCH_BURST_MS}ms steps(1, end) 1;
          }

          /* Base charcoal frame: quick clipped flickers first (the "glitch"),
             then one held full-frame reveal near the end (~600-850ms) that
             lingers long enough to actually register as another photo. */
          @keyframes hero-glitch-base-flicker {
            0%, 100% { opacity: 0; clip-path: inset(0 0 0 0); transform: translateX(0); }
            1.6% { opacity: 1; clip-path: inset(8% 0 62% 0);  transform: translateX(-1%); }
            7%   { opacity: 0; }
            12.4% { opacity: 1; clip-path: inset(55% 0 6% 0);  transform: translateX(1.2%); }
            17.9% { opacity: 0; }
            25.7% { opacity: 1; clip-path: inset(20% 0 45% 0); transform: translateX(-0.8%); }
            31.1% { opacity: 0; }
            38.9% { opacity: 1; clip-path: inset(70% 0 3% 0);  transform: translateX(1%); }
            44.3% { opacity: 0; }
            52.9% { opacity: 1; clip-path: inset(4% 0 78% 0);  transform: translateX(-1.2%); }
            58.3% { opacity: 0; }
            66.7% { opacity: 1; clip-path: inset(0 0 0 0);     transform: translateX(0); }
            94.4% { opacity: 0; }
          }

          /* RGB-split fringe layers: subtle, only near the slice edges — a hint
             of chromatic aberration, not a color wash over the whole image. */
          @keyframes hero-glitch-cyan-flicker {
            0%, 100% { opacity: 0; transform: translateX(0); }
            1.6% { opacity: 0.35; transform: translateX(-3px); }
            7%   { opacity: 0; }
            12.4% { opacity: 0.3;  transform: translateX(3px); }
            17.9% { opacity: 0; }
            25.7% { opacity: 0.3;  transform: translateX(-2px); }
            31.1% { opacity: 0; }
            38.9% { opacity: 0.3;  transform: translateX(3px); }
            44.3% { opacity: 0; }
            52.9% { opacity: 0.3;  transform: translateX(-3px); }
            58.3% { opacity: 0; }
            66.7% { opacity: 0.2; transform: translateX(2px); }
            94.4% { opacity: 0; }
          }

          @keyframes hero-glitch-magenta-flicker {
            0%, 100% { opacity: 0; transform: translateX(0); }
            1.6% { opacity: 0.3;  transform: translateX(3px); }
            7%   { opacity: 0; }
            12.4% { opacity: 0.28; transform: translateX(-3px); }
            17.9% { opacity: 0; }
            25.7% { opacity: 0.28; transform: translateX(2px); }
            31.1% { opacity: 0; }
            38.9% { opacity: 0.28; transform: translateX(-3px); }
            44.3% { opacity: 0; }
            52.9% { opacity: 0.28; transform: translateX(3px); }
            58.3% { opacity: 0; }
            66.7% { opacity: 0.18; transform: translateX(-2px); }
            94.4% { opacity: 0; }
          }

          @media (prefers-reduced-motion: reduce) {
            .hero-glitch-play { animation: none !important; opacity: 0 !important; }
          }
        `}</style>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Text content */}
          <div className="space-y-6 md:space-y-8 animate-fade-in text-center lg:text-left order-2 lg:order-1">
            <div className="space-y-2 md:space-y-4">
              <div className="flex gap-2">
                <p
                className="text-xs sm:text-sm tracking-[0.3em] uppercase font-bold text-accent drop-shadow-[0_0_8px_hsl(var(--accent)/0.5)]"
                style={{ fontFamily: "Orbitron, sans-serif" }}
                >
                  Hi, 
                </p>
                <p
                  className="text-xs sm:text-sm tracking-[0.3em] uppercase font-bold drop-shadow-[0_0_8px_hsl(var(--accent)/0.5)]"
                  style={{ fontFamily: "Orbitron, sans-serif" }}
                >
                  I'm
                </p>
              </div>
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-widest uppercase font-bold"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                <span className="text-foreground drop-shadow-[0_0_8px_hsl(var(--primary)/0.4)]">Victor </span>
                <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent drop-shadow-[0_0_12px_hsl(var(--primary)/0.6)]">
                  Laitila
                </span>
              </h1>
              <h2
                className="text-md sm:text-2xl md:text-3xl lg:text-4xl tracking-widest uppercase font-bold"
                style={{ fontFamily: "Orbitron, sans-serif" }}
              >
                <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent drop-shadow-[0_0_12px_hsl(var(--primary)/0.6)] tracking-[4px]">
                  {displayedText.slice(0, 9)}
                </span>
                <span className="text-foreground drop-shadow-[0_0_8px_hsl(var(--primary)/0.4)] tracking-[4px]">
                  {displayedText.slice(9)}
                </span>
                <span className="animate-pulse text-foreground relative bottom-0.5">|</span>
              </h2>
            </div>

            <p 
              className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed" 
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              {extensions.tagline}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <Button variant="hero" size="lg" asChild style={{ fontFamily: "Orbitron, sans-serif" }}>
                <a href="#projects">View Projects</a>
              </Button>
              <Button variant="hero-outline" size="lg" asChild style={{ fontFamily: "Orbitron, sans-serif" }}>
                <a href="#contact">Contact Me</a>
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <div className="flex items-center gap-2">
                {personal.links.github && (
                  <Button variant="ghost" size="icon" asChild>
                    <a href={personal.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                      <TbBrandGithub className="h-5 w-5" />
                    </a>
                  </Button>
                )}
                {personal.links.linkedin && (
                  <Button variant="ghost" size="icon" asChild>
                    <a href={personal.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                      <TbBrandLinkedin className="h-5 w-5" />
                    </a>
                  </Button>
                )}
                <Button variant="ghost" size="icon" asChild>
                  <a href={`mailto:${personal.email}`} aria-label="Email">
                    <Mail className="h-5 w-5" />
                  </a>
                </Button>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground ml-4">
                <MapPin className="h-5 w-5 text-accent/90" />
                <span
                  className="text-xs tracking-wider uppercase font-medium"
                  style={{ fontFamily: "Orbitron, sans-serif" }}
                >
                  {personal.location}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#about" aria-label="Scroll to about section">
          <ArrowDown className="h-6 w-6 mx-auto text-muted-foreground" />
        </a>
      </div>
    </section>
  );
}

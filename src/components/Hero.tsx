import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";
import CursorTrail from "./CursorTrail";
import { useState, useEffect } from "react";

export function Hero() {
  const [displayedText, setDisplayedText] = useState("");
  const fullText = "Software Engineer ";
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
  }, []);
  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16"
    >      
    <CursorTrail />
      {/* Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
          <div className="space-y-2 md:space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-widest uppercase font-bold mb-1" style={{fontFamily: 'Orbitron, sans-serif'}}>
              <span className="text-foreground drop-shadow-[0_0_8px_hsl(var(--primary)/0.4)]">Hi I'm </span>
              <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent drop-shadow-[0_0_12px_hsl(var(--primary)/0.6)]">Victor Laitila</span>
            </h1>
            <h2 className="text-md sm:text-2xl md:text-3xl lg:text-4xl tracking-widest uppercase font-bold mb-1" style={{fontFamily: 'Orbitron, sans-serif'}}>
              <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent drop-shadow-[0_0_12px_hsl(var(--primary)/0.6)] tracking-[4px]">
                {displayedText.slice(0, 9)}
              </span>
              <span className="text-foreground drop-shadow-[0_0_8px_hsl(var(--primary)/0.4)] tracking-[4px]">
                {displayedText.slice(9)}
              </span>
              <span className="animate-pulse text-foreground relative bottom-0.5">|</span>
            </h2>
          </div>

          <p className="text-[11px] sm:text-xs md:text-sm tracking-widest uppercase font-bold text-muted-foreground max-w-[80vw] mx-auto leading-relaxed mb-2" style={{fontFamily: 'Orbitron, sans-serif'}}>
            I build exceptional digital experiences with modern technologies - passionate about creating elegant solutions to complex problems.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button variant="hero" size="lg" asChild>
              <a href="#projects">View Projects</a>
            </Button>
            <Button variant="hero-outline" size="lg" asChild>
              <a href="#contact">Contact Me</a>
            </Button>
          </div>

          <div className="flex items-center justify-center gap-4 pt-4">
            <Button variant="ghost" size="icon" asChild >
              <a href="https://github.com/victorlaitila" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://linkedin.com/in/victorlaitila" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="mailto:viclait@gmail.com" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </Button>
          </div>

          <div className="pt-12 animate-bounce">
            <a href="#about" aria-label="Scroll to about section">
              <ArrowDown className="h-6 w-6 mx-auto text-muted-foreground" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

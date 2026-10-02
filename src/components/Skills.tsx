import { useRef, useState } from "react";
import { CloudUpload, DatabaseBackup, SquareCode, Wrench, type LucideIcon } from "lucide-react";
import { SECTION_IDS } from "@/config/site";
import { getCareerData } from "@/data";
import { getSkillIcon } from "@/data/skillIcons";
import { SKILL_CATEGORIES, type SkillCategory } from "@/data/types";
import { useElapsed } from "@/hooks/useElapsed";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import backgroundImg from "@/assets/background-skills.webp";
import { Section } from "./Section";

const CATEGORY_HEADINGS: Record<SkillCategory, { title: string; module: string; icon: LucideIcon }> = {
  frontend: { title: "Frontend", module: "frontend", icon: SquareCode },
  backend: { title: "Backend & Data", module: "backend", icon: DatabaseBackup },
  technologies: { title: "Cloud, Testing & DevOps", module: "cloud_ops", icon: CloudUpload },
  practices: { title: "Engineering Practices", module: "practices", icon: Wrench },
};

// Boot animation timing: each module types out its log, then its skill tiles appear one by one.
const MS_PER_CHAR = 14;
const MODULE_STAGGER_MS = 450;
const TILE_STAGGER_MS = 70;
const ANIMATION_END_MS = 8000;

interface ModuleProps {
  category: SkillCategory;
  skills: string[];
  index: number;
  /** Milliseconds since the boot animation started. */
  elapsed: number;
}

function Module({ category, skills, index, elapsed }: ModuleProps) {
  const { title, module, icon: Icon } = CATEGORY_HEADINGS[category];
  const lines = [`> mount ${module}.module`, `> load ${skills.length} packages ........ done`, "> status: ONLINE"];
  const start = index * MODULE_STAGGER_MS;
  const totalChars = lines.reduce((sum, line) => sum + line.length, 0);
  const typedChars = Math.max(0, Math.floor((elapsed - start) / MS_PER_CHAR));
  const bootDone = typedChars >= totalChars;
  const tilesStart = start + totalChars * MS_PER_CHAR + 150;

  let remaining = typedChars;
  const typedLines = lines.map((line) => {
    const shown = line.slice(0, Math.max(0, remaining));
    remaining -= line.length;
    return { line, shown, typing: shown.length > 0 && shown.length < line.length };
  });

  return (
    <div className="relative min-w-0 border border-primary/30 bg-background/70 backdrop-blur-sm">
      <span className="hud-corner hud-corner-tl" />
      <span className="hud-corner hud-corner-tr" />
      <span className="hud-corner hud-corner-bl" />
      <span className="hud-corner hud-corner-br" />

      <div className="flex items-center justify-between gap-3 border-b border-primary/20 px-4 py-4 bg-primary/5">
        <div className="flex items-center gap-2.5 min-w-0">
          <Icon className="h-4 w-4 text-primary shrink-0" />
          <h3 className="font-display text-sm sm:text-base tracking-widest uppercase text-primary leading-snug">
            <span className="text-muted-foreground">[0{index + 1}]</span> {title}
          </h3>
        </div>
        <span
          className={cn(
            "font-mono text-[10px] tracking-widest px-2 py-0.5 border shrink-0 transition-colors duration-500",
            bootDone ? "border-primary/60 text-primary" : "border-muted-foreground/40 text-muted-foreground",
          )}
        >
          {bootDone ? "● ONLINE" : "○ BOOT"}
        </span>
      </div>

      <div className="px-4 pt-3 pb-1 font-mono text-xs text-primary/70 h-[4.5rem]" aria-hidden="true">
        {typedLines.map(({ line, shown, typing }) => (
          <div key={line} className="whitespace-pre truncate">
            {shown}
            {typing && <span className="animate-pulse">▌</span>}
          </div>
        ))}
      </div>

      {/* Columns follow the module's width, not the viewport's, so long names never get clipped. */}
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(12rem,1fr))] gap-2 p-4 pt-2">
        {skills.map((skill, i) => {
          const SkillIcon = getSkillIcon(skill);
          const visible = elapsed >= tilesStart + i * TILE_STAGGER_MS;
          return (
            <li
              key={skill}
              className={cn(
                "hud-tile group relative flex items-center gap-2.5 px-3 py-2.5 border border-primary/25 bg-primary/[0.04] transition-all duration-300",
                "hover:border-primary hover:bg-primary/10 hover:shadow-[0_0_18px_-4px_hsl(var(--primary)/0.7)]",
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2",
              )}
            >
              <span className="font-mono text-[10px] text-primary/50 w-6 shrink-0">
                {(i + 1).toString(16).toUpperCase().padStart(2, "0")}
              </span>
              {SkillIcon && <SkillIcon className="h-4 w-4 shrink-0 text-primary/80 group-hover:text-primary" />}
              <span className="min-w-0 text-sm font-medium text-foreground">{skill}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** The skills section, styled as a sci-fi system console that boots up when scrolled into view. */
export function Skills() {
  const { skills } = getCareerData();
  const categories = SKILL_CATEGORIES.filter((category) => skills[category].length > 0);
  const skillCount = categories.reduce((sum, category) => sum + skills[category].length, 0);

  const consoleRef = useRef<HTMLDivElement>(null);
  const inView = useInView(consoleRef);
  const [reducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const elapsed = useElapsed(inView && !reducedMotion, ANIMATION_END_MS);

  return (
    <Section id={SECTION_IDS.skills} title="Skills & Tech Stack" background={backgroundImg}>
      <div ref={consoleRef} className="hud-frame relative border border-primary/40 bg-background/60 p-3 sm:p-6">
        <div className="hud-scanlines pointer-events-none absolute inset-0" aria-hidden="true" />
        {/* From md up, the status bar uses the module grid's columns, so the counts line up with the right-hand modules. */}
        <div className="relative flex flex-wrap items-center justify-between gap-2 md:grid md:grid-cols-2 md:gap-x-8 mb-4 sm:mb-6 font-mono text-[11px] tracking-widest text-primary/80">
          <span>SYS://VICTOR.LAITILA/SKILLS</span>
          <div className="contents md:flex md:items-center md:justify-between">
            <span className="hidden sm:inline text-muted-foreground">
              {categories.length} MODULES · {skillCount} PACKAGES
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> LIVE
            </span>
          </div>
        </div>
        <div className="relative grid md:grid-cols-2 gap-6 sm:gap-8">
          {categories.map((category, index) => (
            <Module
              key={category}
              category={category}
              skills={skills[category]}
              index={index}
              elapsed={reducedMotion ? Infinity : elapsed}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}

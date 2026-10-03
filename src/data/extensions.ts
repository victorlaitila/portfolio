/**
 * Site-only content that isn't career data, so it doesn't belong in career.yaml:
 * the hero tagline, the About section and the project thumbnail imports.
 */

import {
  CircleHelp,
  Dumbbell,
  Guitar,
  Palette,
  Plane,
  Rocket,
  ShieldCheck,
  Sparkles,
  Trophy,
  Wrench,
  Zap,
  type LucideIcon,
} from "lucide-react";

import articleSummarizerThumbnail from "@/assets/article-summarizer-thumbnail.webp";
import dependencyRiskScannerThumbnail from "@/assets/dependency-risk-scanner-thumbnail.webp";
import soundAtlasThumbnail from "@/assets/sound-atlas-thumbnail.webp";

export interface IconText {
  icon: LucideIcon;
  title: string;
  text: string;
}

export interface PortfolioExtensions {
  tagline: string;
  about: {
    /** Intro on the ID card. Location and current job come from career.yaml. */
    intro: (career: { location: string; role: string; company: string }) => string;
    principles: IconText[];
    interests: IconText[];
    /** Areas being deepened, not started from scratch. */
    deepening: IconText[];
  };
  /** Maps `image` filenames in career.yaml to imported assets. */
  projectImages: Record<string, string>;
}

export const portfolioExtensions: PortfolioExtensions = {
  tagline: "I build reliable software, untangle complex problems and turn ideas into working solutions.",
  about: {
    intro: ({ location, role, company }) =>
      `I'm a ${location}-based software engineer who has spent the last few years between two worlds: large-scale industrial software and modern web systems. I like the moment when a complex system becomes easy to use, whether that's a drive configuration tool or a voice user interface. Today I'm a ${role.toLowerCase()} at ${company}.`,
    principles: [
      {
        icon: Rocket,
        title: "Ship, then sharpen",
        text: "Get a working version in front of people early, then improve it based on real feedback.",
      },
      {
        icon: CircleHelp,
        title: "Understand the why",
        text: "I look past the task to the context around it: who it's for and why it's being built. That bigger picture makes the work clearer, and lets me add value in discussions well beyond the feature at hand.",
      },
      {
        icon: Wrench,
        title: "Leave it better",
        text: "A campsite ethos: whatever I touch, whether code, docs or a process, I leave it a little better than I found it.",
      },
      {
        icon: ShieldCheck,
        title: "Own it end to end",
        text: "From technical design and architecture through implementation and release, to the feedback that follows.",
      },
      {
        icon: Zap,
        title: "Learn fast, adapt faster",
        text: "New tool, technology, domain or role, I get up to speed quickly and do my best work when things keep changing.",
      },
    ],
    interests: [
      { icon: Dumbbell, title: "Gym", text: "Keeps me grounded, and proof that consistency beats intensity." },
      { icon: Trophy, title: "Sports", text: "Competitive by nature, and a team player on and off the field." },
      { icon: Guitar, title: "Guitar", text: "My creative reset, far away from any screen." },
      { icon: Plane, title: "Travel", text: "New places and cultures, and the fresh perspective they bring." },
    ],
    deepening: [
      {
        icon: Sparkles,
        title: "AI-driven development",
        text: "Already part of how I work daily. Now going deeper into agentic workflows and keeping AI-built software reliable.",
      },
      {
        icon: Palette,
        title: "UI/UX patterns & design",
        text: "A strong technical solution only lands if people find it clear and enjoyable to use, so I'm sharpening my design eye.",
      },
    ],
  },
  projectImages: {
    "article-summarizer-thumbnail.webp": articleSummarizerThumbnail,
    "dependency-risk-scanner-thumbnail.webp": dependencyRiskScannerThumbnail,
    "sound-atlas-thumbnail.webp": soundAtlasThumbnail,
  },
};

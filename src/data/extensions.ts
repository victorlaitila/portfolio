/**
 * Site-only content that isn't career data, so it doesn't belong in career.yaml:
 * the hero tagline, the About section and the project thumbnail imports.
 */

import { Brain, Code2, Dumbbell, Footprints, Puzzle, Users, type LucideIcon } from "lucide-react";

import articleSummarizerThumbnail from "@/assets/article-summarizer-thumbnail.webp";
import dependencyRiskScannerThumbnail from "@/assets/dependency-risk-scanner-thumbnail.webp";
import soundAtlasThumbnail from "@/assets/sound-atlas-thumbnail.webp";

interface IconLabel {
  icon: LucideIcon;
  title: string;
}

export interface PortfolioExtensions {
  tagline: string;
  about: {
    highlights: IconLabel[];
    stories: Array<IconLabel & { text: string }>;
  };
  /** Maps `image` filenames in career.yaml to imported assets. */
  projectImages: Record<string, string>;
}

export const portfolioExtensions: PortfolioExtensions = {
  tagline:
    "I build exceptional digital experiences with modern technologies - passionate about creating elegant solutions to complex problems.",
  about: {
    highlights: [
      { icon: Code2, title: "Clean Code" },
      { icon: Puzzle, title: "Problem Solver" },
      { icon: Users, title: "Team Player" },
      { icon: Brain, title: "Fast Learner" },
    ],
    stories: [
      {
        icon: Footprints,
        title: "My Journey",
        text: "I'm a software engineer with a keen eye for creating seamless user experiences. Driven by a profound interest in technology, I'm committed to continuously expanding my knowledge and skills to stay at the forefront of innovation.",
      },
      {
        icon: Dumbbell,
        title: "Beyond Tech",
        text: "While technology fuels my professional journey, I find balance by hitting the gym, playing sports, and strumming my guitar. Fitness and music not only keep me grounded, but also enhance my creativity and focus.",
      },
    ],
  },
  projectImages: {
    "article-summarizer-thumbnail.webp": articleSummarizerThumbnail,
    "dependency-risk-scanner-thumbnail.webp": dependencyRiskScannerThumbnail,
    "sound-atlas-thumbnail.webp": soundAtlasThumbnail,
  },
};

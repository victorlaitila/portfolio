/**
 * Career data loader.
 *
 * career.yaml is the single source of truth for both this site and the CV PDF (generated with
 * `npm run generate:cv`, see cv-generator/). Entries limited to `targets: [cv]` are dropped here.
 */

import yaml from "js-yaml";
import careerYamlRaw from "./career.yaml?raw";
import { portfolioExtensions, type PortfolioExtensions } from "./extensions";
import { isForPortfolio } from "./targets";
import {
  SKILL_CATEGORIES,
  type CareerData,
  type CareerYaml,
  type DetailEntry,
  type SkillCategory,
  type SkillEntry,
} from "./types";

/** Flattens a list of plain or `{text|name, targets}` entries to the strings shown on the site. */
function pickPortfolioText(entries: Array<DetailEntry | SkillEntry> = []): string[] {
  return entries.flatMap((entry) => {
    if (typeof entry === "string") return [entry];
    if (!isForPortfolio(entry.targets)) return [];
    return ["text" in entry ? entry.text : entry.name];
  });
}

function resolveCareerData(raw: CareerYaml): CareerData {
  return {
    personal: raw.personal,
    summary: raw.summary,
    keywords: raw.keywords ?? [],
    experience: raw.experience.filter((exp) => isForPortfolio(exp.targets)),
    education: raw.education
      .filter((edu) => isForPortfolio(edu.targets))
      .map((edu) => ({ ...edu, details: pickPortfolioText(edu.details) })),
    skills: Object.fromEntries(
      SKILL_CATEGORIES.map((category) => [category, pickPortfolioText(raw.skills[category])]),
    ) as Record<SkillCategory, string[]>,
    projects: (raw.projects ?? [])
      .filter((project) => isForPortfolio(project.targets))
      .map((project) => ({
        ...project,
        image: project.image ? (portfolioExtensions.projectImages[project.image] ?? project.image) : undefined,
        tags: project.tags ?? [],
      })),
  };
}

const careerData = resolveCareerData(yaml.load(careerYamlRaw) as CareerYaml);

/** Career data from career.yaml, filtered for the portfolio. */
export function getCareerData(): CareerData {
  return careerData;
}

/** Site-only content that isn't career data (tagline, About text, project images). */
export function getPortfolioExtensions(): PortfolioExtensions {
  return portfolioExtensions;
}

export type { CareerData, PortfolioExtensions };

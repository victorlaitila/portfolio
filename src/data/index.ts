/**
 * Career data loader - loads data from career.yaml (synced by career-engine).
 * 
 * The portfolio reads from a YAML file that career-engine copies
 * during the sync process. This keeps the portfolio in sync with the
 * canonical career.yaml source of truth.
 * 
 * Target filtering: Items with `targets: [portfolio]` or `targets: [cv, portfolio]`
 * are included. Items with only `targets: [cv]` are excluded.
 */

import yaml from 'js-yaml';
import type { CareerData, PortfolioExtensions, Project } from './types';
import careerYamlRaw from './career.yaml?raw';
import { portfolioExtensions } from './extensions';

const rawCareerData = yaml.load(careerYamlRaw) as CareerData;

/**
 * Check if an item should appear in the portfolio.
 * Default is true if targets is not specified.
 */
function hasPortfolioTarget(targets?: string[]): boolean {
  if (!targets || targets.length === 0) return true;
  return targets.includes('portfolio');
}

/**
 * Get skill name from skill item (can be string or object).
 */
function getSkillName(skill: string | { name: string; targets?: string[] }): string | null {
  if (typeof skill === 'string') return skill;
  if (!hasPortfolioTarget(skill.targets)) return null;
  return skill.name;
}

/**
 * Filter skills array for portfolio target and extract names.
 */
function filterSkills(skills: Array<string | { name: string; targets?: string[] }>): string[] {
  return skills
    .map(getSkillName)
    .filter((name): name is string => name !== null);
}

/**
 * Get the full career data filtered for portfolio and with images resolved.
 */
export function getCareerData(): CareerData & { projects: Project[] } {
  // Filter experience for portfolio target
  const experience = rawCareerData.experience
    .filter(exp => hasPortfolioTarget(exp.targets));

  // Filter education for portfolio target
  const education = rawCareerData.education
    .filter(edu => hasPortfolioTarget(edu.targets));

  // Filter skills for portfolio target
  const skills = {
    frontend: filterSkills(rawCareerData.skills.frontend),
    backend: filterSkills(rawCareerData.skills.backend),
    technologies: filterSkills(rawCareerData.skills.technologies),
    practices: filterSkills(rawCareerData.skills.practices),
  };

  // Filter and process projects for portfolio target
  const projects = (rawCareerData.projects || [])
    .filter(proj => hasPortfolioTarget(proj.targets))
    .map(project => ({
      ...project,
      // Resolve image filename to imported asset
      image: project.image 
        ? portfolioExtensions.projectImages[project.image] || project.image
        : undefined,
    }));

  return {
    personal: rawCareerData.personal,
    summary: rawCareerData.summary,
    experience,
    education,
    skills,
    projects,
  };
}

/**
 * Get portfolio-specific extensions (about section, tagline, etc.)
 */
export function getPortfolioExtensions(): PortfolioExtensions {
  return portfolioExtensions;
}

export { portfolioExtensions };
export type { CareerData, PortfolioExtensions } from './types';

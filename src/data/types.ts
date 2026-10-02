/**
 * Career data types.
 *
 * `CareerYaml` mirrors career.yaml as written (and cv-generator's schema). `CareerData` is what
 * `getCareerData()` returns: filtered to portfolio entries, with targeted items flattened to
 * plain strings and project images resolved to asset URLs.
 */

import type { Target } from "./targets";

interface Targeted {
  targets?: Target[];
}

export type DetailEntry = string | ({ text: string } & Targeted);
export type SkillEntry = string | ({ name: string } & Targeted);

export const SKILL_CATEGORIES = ["frontend", "backend", "technologies", "practices"] as const;
export type SkillCategory = (typeof SKILL_CATEGORIES)[number];

export interface PersonalLinks {
  github: string | null;
  linkedin: string | null;
  website: string | null;
}

export interface Personal {
  name: string;
  title: string;
  email: string;
  location: string;
  links: PersonalLinks;
}

export interface Experience extends Targeted {
  company: string;
  title: string;
  location: string;
  start: string;
  end: string;
  highlights: string[];
}

interface EducationBase extends Targeted {
  institution: string;
  degree: string;
  field: string | null;
  start: string;
  end: string;
}

export interface ProjectYaml extends Targeted {
  name: string;
  description: string;
  /** GitHub repository. */
  url?: string | null;
  demo?: string;
  video?: string;
  /** Filename in src/assets, mapped to an import in extensions.ts. */
  image?: string;
  /** Short label shown over the thumbnail, e.g. "Beta". */
  badge?: string;
  tags?: string[];
}

export interface CareerYaml {
  personal: Personal;
  summary: string;
  /** Technology names shown in bold in experience highlights, on the site and the CV. */
  keywords?: string[];
  experience: Experience[];
  education: Array<EducationBase & { details?: DetailEntry[] }>;
  skills: Record<SkillCategory, SkillEntry[]>;
  projects?: ProjectYaml[];
}

export type Education = EducationBase & { details: string[] };

export interface Project extends Omit<ProjectYaml, "image" | "tags"> {
  /** Resolved asset URL. */
  image?: string;
  tags: string[];
}

export interface CareerData {
  personal: Personal;
  summary: string;
  keywords: string[];
  experience: Experience[];
  education: Education[];
  skills: Record<SkillCategory, string[]>;
  projects: Project[];
}

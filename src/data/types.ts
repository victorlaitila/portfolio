/**
 * Career data types - matches career-engine output schema.
 */

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

export interface Experience {
  company: string;
  title: string;
  location: string;
  start: string;
  end: string;
  duration: string;
  highlights: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string | null;
  start: string;
  end: string;
}

export interface Skills {
  frontend: string[];
  backend: string[];
  technologies: string[];
  practices: string[];
}

export interface Project {
  name: string;
  description: string;
  url: string | null;
  highlights: string[];
  // Portfolio-specific extensions (not from career-engine)
  image?: string;
  tags?: string[];
  demo?: string;
  video?: string;
}

export interface CareerData {
  personal: Personal;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: Skills;
  projects: Project[];
}

/**
 * Portfolio-specific extensions for data that career-engine doesn't manage.
 * These are merged with career.json data at runtime.
 */
export interface ProjectAsset {
  image: string;
  tags: string[];
  demo?: string;
  video?: string;
}

export interface PortfolioExtensions {
  about: {
    highlights: Array<{ icon: string; title: string }>;
    journey: string;
    beyondTech: string;
  };
  // Array indexed by project position (allows different assets for same-named projects)
  projectAssets: ProjectAsset[];
}

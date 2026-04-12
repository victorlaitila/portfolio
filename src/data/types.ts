/**
 * Career data types - matches career-engine output schema.
 * 
 * Target system: Items can have `targets: ['cv', 'portfolio']` to control
 * where they appear. The portfolio filters for items with 'portfolio' target.
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
  highlights: string[];
  targets?: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string | null;
  start: string;
  end: string;
  details?: string[];
  targets?: string[];
}

export interface Skills {
  frontend: Array<string | { name: string; targets?: string[] }>;
  backend: Array<string | { name: string; targets?: string[] }>;
  technologies: Array<string | { name: string; targets?: string[] }>;
  practices: Array<string | { name: string; targets?: string[] }>;
}

export interface Project {
  name: string;
  description: string;
  url?: string | null;
  highlights?: string[];
  targets?: string[];
  // Portfolio-specific fields
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
  projects?: Project[];
}

/**
 * Portfolio-specific extensions for data that career-engine doesn't manage.
 */
export interface PortfolioExtensions {
  tagline: string;
  about: {
    highlights: Array<{ icon: string; title: string }>;
    journey: string;
    beyondTech: string;
  };
  // Map image filenames to imported image assets
  projectImages: Record<string, string>;
}

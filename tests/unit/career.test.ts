import { describe, expect, it } from 'vitest';
import yaml from 'js-yaml';
import careerYamlRaw from '@/data/career.yaml?raw';
import { getCareerData, getPortfolioExtensions } from '@/data';
import type { CareerYaml } from '@/data/types';
import { isForPortfolio } from '@/data/targets';

// career.yaml is hand-edited and drives both the site and the CV, so these
// tests guard against edits that would silently break the rendered portfolio.

const raw = yaml.load(careerYamlRaw) as CareerYaml;
const career = getCareerData();

const YEAR_MONTH = /^\d{4}-(0[1-9]|1[0-2])$/;

describe('career.yaml', () => {
  it('has the personal info shown in the hero and contact sections', () => {
    const { personal } = career;
    expect(personal.name).toBeTruthy();
    expect(personal.title).toBeTruthy();
    expect(personal.email).toMatch(/^[^@\s]+@[^@\s]+\.[^@\s]+$/);
    expect(personal.links.github).toMatch(/^https:\/\//);
    expect(personal.links.linkedin).toMatch(/^https:\/\//);
  });

  it('uses YYYY-MM dates for experience (the site formats them as "Mon YYYY")', () => {
    for (const exp of raw.experience) {
      expect(String(exp.start), `${exp.company} start`).toMatch(YEAR_MONTH);
      if (exp.end !== 'present') {
        expect(String(exp.end), `${exp.company} end`).toMatch(YEAR_MONTH);
      }
    }
  });

  it('lists experience newest first', () => {
    const starts = raw.experience.map((exp) => String(exp.start));
    expect(starts).toEqual([...starts].sort().reverse());
  });
});

describe('getCareerData', () => {
  it('keeps exactly the experience entries targeting the portfolio', () => {
    const expected = raw.experience.filter((exp) => isForPortfolio(exp.targets));
    expect(career.experience).toEqual(expected);
  });

  it('flattens targeted education details and skills to plain strings', () => {
    for (const edu of career.education) {
      for (const detail of edu.details ?? []) expect(typeof detail).toBe('string');
    }
    for (const list of Object.values(career.skills)) {
      for (const skill of list) expect(typeof skill).toBe('string');
    }
  });

  it('resolves every project image to an imported asset', () => {
    expect(career.projects.length).toBeGreaterThan(0);
    for (const project of career.projects) {
      expect(project.image, `${project.name} has no image`).toBeTruthy();
      expect(
        Object.keys(getPortfolioExtensions().projectImages),
        `${project.name}: add ${project.image} to projectImages in extensions.ts`,
      ).toContain(raw.projects!.find((p) => p.name === project.name)!.image);
    }
  });

  it('gives every project at least one link', () => {
    for (const project of career.projects) {
      expect(project.url || project.demo || project.video, project.name).toBeTruthy();
    }
  });

  it('uses well-formed project links', () => {
    for (const project of career.projects) {
      for (const link of [project.url, project.demo, project.video].filter(Boolean)) {
        expect(link, project.name).toMatch(/^https:\/\//);
      }
      // YouTube answers 200 even for a malformed id (e.g. a trailing slash), so
      // a link checker can't catch this. Check the id format instead.
      if (project.video) {
        expect(project.video, project.name).toMatch(/^https:\/\/www\.youtube\.com\/watch\?v=[\w-]{11}$/);
      }
    }
  });
});

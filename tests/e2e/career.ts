// Derives test expectations from career.yaml, the same data the site renders.
import { career } from "../../scripts/career";
import { isForPortfolio } from "../../src/data/targets";
import { SKILL_CATEGORIES } from "../../src/data/types";

export { BASE_PATH, SITE_URL } from "../../scripts/career";

export const personal = career.personal;
export const projects = (career.projects ?? []).filter((p) => isForPortfolio(p.targets));

/** Every skill name the portfolio should show, across all categories. */
export const skills = SKILL_CATEGORIES.flatMap((category) => career.skills[category])
  .filter((skill) => typeof skill === "string" || isForPortfolio(skill.targets))
  .map((skill) => (typeof skill === "string" ? skill : skill.name));

/** Every external link the portfolio should show. */
export const expectedExternalLinks = [
  ...new Set(
    [
      personal.links.github,
      personal.links.linkedin,
      ...projects.flatMap((p) => [p.url, p.demo, p.video]),
    ].filter((link): link is string => !!link),
  ),
].sort();

// Derives test expectations from career.yaml, the same data the site renders.
import { career } from "../../scripts/career";
import { isForPortfolio } from "../../src/data/targets";

export { BASE_PATH, SITE_URL } from "../../scripts/career";

export const personal = career.personal;
export const projects = (career.projects ?? []).filter((p) => isForPortfolio(p.targets));

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

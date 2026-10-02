// Reads career.yaml so tests derive expectations from the same data the site renders.
import { readFileSync } from "node:fs";
import yaml from "js-yaml";
import { isForPortfolio } from "../../src/data/targets";
import type { CareerYaml } from "../../src/data/types";

const career = yaml.load(readFileSync("src/data/career.yaml", "utf8")) as CareerYaml;

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

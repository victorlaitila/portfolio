// Reads career.yaml so tests derive expectations from the same data the site renders.
import { readFileSync } from "node:fs";
import yaml from "js-yaml";
import type { CareerData } from "../../src/data/types";

const career = yaml.load(readFileSync("src/data/career.yaml", "utf8")) as CareerData;

const onPortfolio = (targets?: string[]) => !targets || targets.includes("portfolio");

export const personal = career.personal;
export const projects = (career.projects ?? []).filter((p) => onPortfolio(p.targets));

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

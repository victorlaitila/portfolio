/**
 * Reads career.yaml for Node-side code: the Vite and Playwright configs and the e2e tests.
 * The site's own URL comes from `personal.links.website`, so changing it there moves the
 * link-preview tags and the CV together.
 */
import { readFileSync } from "node:fs";
import yaml from "js-yaml";
import type { CareerYaml } from "../src/data/types";

export const career = yaml.load(
  readFileSync(new URL("../src/data/career.yaml", import.meta.url), "utf8"),
) as CareerYaml;

const website = career.personal.links.website;
if (!website) throw new Error("career.yaml: personal.links.website is required (it is the site's URL)");

/** The deployed site's URL, with a trailing slash, e.g. "https://www.victorlaitila.com/". */
export const SITE_URL = website.replace(/\/*$/, "/");

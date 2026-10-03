/**
 * Facts for the About section's ID card and stats, derived from career.yaml so they stay current.
 */

import type { CareerData } from "./types";

export interface AboutFacts {
  /** The job marked `end: present`, or the most recent one. */
  current: { title: string; company: string };
  /** Year of the earliest job. */
  since: number;
  yearsBuilding: number;
  /** First education entry with a "GPA: x/y" detail, e.g. { value: 4.86, scale: 5, degree: "M.Sc." }. */
  gpa: { value: number; scale: number; degree: string } | null;
}

export function getAboutFacts({ experience, education }: CareerData, now = new Date()): AboutFacts {
  const current = experience.find((job) => job.end === "present") ?? experience[0];
  const since = Math.min(...experience.map((job) => Number(job.start.slice(0, 4))));

  let gpa: AboutFacts["gpa"] = null;
  for (const edu of education) {
    const match = edu.details.map((detail) => detail.match(/GPA:\s*([\d.]+)\s*\/\s*([\d.]+)/)).find(Boolean);
    if (match) {
      // "Software & Service Engineering (M.Sc.)" -> "M.Sc."
      const degree = edu.degree.match(/\(([^)]+)\)/)?.[1] ?? edu.degree;
      gpa = { value: Number(match[1]), scale: Number(match[2]), degree };
      break;
    }
  }

  return {
    current: { title: current.title, company: current.company },
    since,
    yearsBuilding: now.getFullYear() - since,
    gpa,
  };
}

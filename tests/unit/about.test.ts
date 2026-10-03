import { describe, expect, it } from "vitest";
import { getCareerData } from "@/data";
import { getAboutFacts } from "@/data/about";
import type { CareerData } from "@/data/types";

// The About card derives its facts from career.yaml. A format change there (dates, the
// "GPA: x/y" detail) would otherwise silently show wrong numbers or drop a stat.

describe("getAboutFacts", () => {
  it("finds every fact the About card shows in career.yaml", () => {
    const facts = getAboutFacts(getCareerData());
    expect(facts.current.company).toBeTruthy();
    expect(facts.since).toBeLessThanOrEqual(new Date().getFullYear());
    expect(facts.yearsBuilding).toBeGreaterThan(0);
    expect(facts.gpa, 'an education detail like "GPA: 4.86/5.0"').not.toBeNull();
    expect(facts.gpa!.value).toBeLessThanOrEqual(facts.gpa!.scale);
  });

  it("uses the current job, the earliest start year and the first GPA", () => {
    const career = {
      experience: [
        { company: "Old Co", title: "Developer", start: "2019-06", end: "2022-01" },
        { company: "Now Co", title: "Consultant", start: "2022-02", end: "present" },
      ],
      education: [
        { degree: "Engineering (M.Sc.)", details: ["Minor: Data", "GPA: 4.5/5.0"] },
        { degree: "Science (B.Sc.)", details: ["GPA: 3.9/4.0"] },
      ],
    } as unknown as CareerData;

    expect(getAboutFacts(career, new Date("2026-03-01"))).toEqual({
      current: { title: "Consultant", company: "Now Co" },
      since: 2019,
      yearsBuilding: 7,
      gpa: { value: 4.5, scale: 5, degree: "M.Sc." },
    });
  });
});

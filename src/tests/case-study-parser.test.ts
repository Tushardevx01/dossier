import { describe, it, expect, beforeAll } from "vitest";
import type { CaseStudyRecord } from "@/lib/case-studies-meta";
import { getCaseStudyBySlug } from "@/lib/case-studies";
import { parseCaseStudyContent } from "@/lib/case-study-parser";

const SKIP_DB = !process.env.DATABASE_URL;

const slugs = [
  "runstack",
  "aegis",
  "carepulse",
  "fenix",
  "signifiya",
  "webscope",
  "subscription-tracker",
];

describe.skipIf(SKIP_DB)("Case Study Content Parser", () => {
  let caseStudiesData: CaseStudyRecord[];

  beforeAll(async () => {
    const results = await Promise.all(
      slugs.map((slug) => getCaseStudyBySlug(slug))
    );
    caseStudiesData = results.filter(Boolean) as CaseStudyRecord[];
  });

  it("parses all 7 production case studies without errors", () => {
    expect(caseStudiesData.length).toBe(7);

    caseStudiesData.forEach((cs: CaseStudyRecord) => {
      const parsed = parseCaseStudyContent(cs.content);
      expect(parsed.sections.length).toBeGreaterThan(0);
      expect(parsed.totalDiagrams).toBeGreaterThanOrEqual(0);

      parsed.sections.forEach((sec, idx) => {
        expect(sec.id).toBeTruthy();
        expect(sec.number).toBe(String(idx + 1).padStart(2, "0"));
        expect(sec.title).toBeTruthy();
      });
    });
  });

  it("extracts RunStack diagrams and ASCII art completely", async () => {
    const runstack = await getCaseStudyBySlug("runstack");
    expect(runstack).toBeDefined();
    if (!runstack) return;

    const parsed = parseCaseStudyContent(runstack.content);
    expect(parsed.totalDiagrams).toBeGreaterThanOrEqual(20);

    const problemSec = parsed.sections.find((s) => s.id === "problem");
    expect(problemSec).toBeDefined();
    expect(problemSec?.sectionType).toBe("problem");
    expect(problemSec?.constraints.length).toBeGreaterThanOrEqual(5);
    expect(problemSec?.diagrams.length).toBeGreaterThanOrEqual(1);

    const diag = problemSec?.diagrams[0];
    expect(diag?.ascii).toContain("DISTRIBUTED EXECUTION");
    expect(diag?.ascii).toContain("COORDINATION");
  });

  it("extracts Engineering Challenges and Solutions cleanly", async () => {
    const runstack = await getCaseStudyBySlug("runstack");
    if (!runstack) return;

    const parsed = parseCaseStudyContent(runstack.content);
    const challengesSec = parsed.sections.find((s) => s.id === "challenges");
    expect(challengesSec).toBeDefined();
    expect(challengesSec?.challenges.length).toBe(4);

    const solutionsSec = parsed.sections.find((s) => s.id === "solutions");
    expect(solutionsSec).toBeDefined();
    expect(solutionsSec?.solutions.length).toBe(4);
    expect(solutionsSec?.solutions[0].title).toContain("NODE FAILURE & RECOVERY");
  });

  it("extracts Technical Decisions and Measurable Outcomes", async () => {
    const runstack = await getCaseStudyBySlug("runstack");
    if (!runstack) return;

    const parsed = parseCaseStudyContent(runstack.content);
    const decisionsSec = parsed.sections.find((s) => s.id === "decisions");
    expect(decisionsSec).toBeDefined();
    expect(decisionsSec?.decisions.length).toBe(6);

    const outcomesSec = parsed.sections.find((s) => s.id === "outcomes");
    expect(outcomesSec).toBeDefined();
    expect(outcomesSec?.outcomes.length).toBe(6);
  });

  it("extracts all structured sections cleanly from Subscription Tracker", async () => {
    const subTracker = await getCaseStudyBySlug("subscription-tracker");
    expect(subTracker).toBeDefined();
    if (!subTracker) return;

    const parsed = parseCaseStudyContent(subTracker.content);
    expect(parsed.sections.length).toBe(16);
    expect(parsed.totalDiagrams).toBeGreaterThanOrEqual(15);

    const problemSec = parsed.sections.find((s) => s.id === "problem");
    expect(problemSec).toBeDefined();
    expect(problemSec?.constraints.length).toBe(7);
    expect(problemSec?.diagrams.length).toBeGreaterThanOrEqual(1);

    const challengesSec = parsed.sections.find((s) => s.id === "challenges");
    expect(challengesSec).toBeDefined();
    expect(challengesSec?.challenges.length).toBe(5);
    challengesSec?.challenges.forEach((ch, i) => {
      expect(ch.num).toBe(String(i + 1).padStart(2, "0"));
      expect(ch.title).not.toMatch(/^\d+\.\s*/);
      expect(ch.tag).not.toContain("Impact:");
      expect(ch.impact).toBeTruthy();
    });

    const decisionsSec = parsed.sections.find((s) => s.id === "decisions");
    expect(decisionsSec).toBeDefined();
    expect(decisionsSec?.decisions.length).toBe(5);
    decisionsSec?.decisions.forEach((dec, i) => {
      expect(dec.num).toBe(String(i + 1).padStart(2, "0"));
      expect(dec.tech).toBeTruthy();
      expect(dec.area).toBeTruthy();
      expect(dec.area).not.toContain("Decision:");
      expect(dec.why.length).toBeGreaterThan(10);
      expect(dec.tradeoff.length).toBeGreaterThan(10);
      expect(dec.outcome.length).toBeGreaterThan(10);
    });

    const rigorSec = parsed.sections.find((s) => s.id === "rigor");
    expect(rigorSec).toBeDefined();
    expect(rigorSec?.tables.length).toBeGreaterThanOrEqual(1);
    expect(rigorSec?.tables[0].headers.length).toBeGreaterThan(0);
    expect(rigorSec?.tables[0].rows.length).toBeGreaterThan(0);

    const apiSec = parsed.sections.find((s) => s.id === "api-surface");
    expect(apiSec).toBeDefined();
    expect(apiSec?.tables.length).toBe(2);
    expect(apiSec?.tables[0].title).toBe("Implemented Production Endpoints");
    expect(apiSec?.tables[1].title).toBe("Scaffolded Router Definitions in Repo");
    expect(apiSec?.tables[0].rows.length).toBe(6);
    expect(apiSec?.tables[1].rows.length).toBe(7);
  });

  it("extracts schema validation supportingItems cleanly from CarePulse without overflow", async () => {
    const carepulse = await getCaseStudyBySlug("carepulse");
    expect(carepulse).toBeDefined();
    if (!carepulse) return;

    const parsed = parseCaseStudyContent(carepulse.content);
    const valSec = parsed.sections.find((s) => s.id === "validation");
    expect(valSec).toBeDefined();
    expect(valSec?.supportingItems.length).toBe(5);

    const userForm = valSec?.supportingItems[0];
    expect(userForm?.title).toBe("UserFormValidation");
    expect(userForm?.badge).toBe("Patient Onboarding Step 1");
    expect(userForm?.tag).toBe("name, email, phone");
    expect(userForm?.desc).toContain("RFC email standards");

    const scheduleForm = valSec?.supportingItems[3];
    expect(scheduleForm?.title).toBe("ScheduleAppointmentSchema");
    expect(scheduleForm?.badge).toBe("Administrative Confirmation");
    expect(scheduleForm?.tag).toContain("cancellationReason (optional)");

    const cancelForm = valSec?.supportingItems[4];
    expect(cancelForm?.title).toBe("CancelAppointmentSchema");
    expect(cancelForm?.badge).toBe("Administrative Cancellation");
    expect(cancelForm?.tag).toBe("cancellationReason (required)");
  });

  it("ensures no titles, badges, or records contain decorative // symbols", () => {
    caseStudiesData.forEach((cs) => {
      const parsed = parseCaseStudyContent(cs.content);
      parsed.sections.forEach((sec) => {
        expect(sec.title).not.toContain("//");
        if (sec.badge) expect(sec.badge).not.toContain("//");
        if (sec.intro) expect(sec.intro).not.toContain("//");
        if (sec.readingText) expect(sec.readingText).not.toContain("//");

        sec.diagrams.forEach((d) => {
          expect(d.title).not.toContain("//");
          if (d.badge) expect(d.badge).not.toContain("//");
        });

        sec.challenges.forEach((c) => {
          expect(c.title).not.toContain("//");
          expect(c.num).not.toContain("//");
          if (c.tag) expect(c.tag).not.toContain("//");
        });

        sec.decisions.forEach((d) => {
          expect(d.tech).not.toContain("//");
          expect(d.area).not.toContain("//");
          expect(d.num).not.toContain("//");
        });

        sec.solutions.forEach((s) => {
          expect(s.title).not.toContain("//");
          expect(s.num).not.toContain("//");
        });

        sec.supportingItems.forEach((si) => {
          expect(si.title).not.toContain("//");
          if (si.num) expect(si.num).not.toContain("//");
          if (si.badge) expect(si.badge).not.toContain("//");
          if (si.tag) expect(si.tag).not.toContain("//");
        });
      });
    });
  });
});


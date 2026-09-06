import { describe, it, expect } from "vitest";
import { caseStudiesData } from "@/lib/case-studies-data";
import { parseCaseStudyContent } from "@/lib/case-study-parser";

describe("Case Study Content Parser", () => {
  it("parses all 7 production case studies without errors", () => {
    expect(caseStudiesData.length).toBe(7);

    caseStudiesData.forEach((cs) => {
      const parsed = parseCaseStudyContent(cs.content);
      expect(parsed.sections.length).toBeGreaterThan(0);
      expect(parsed.totalDiagrams).toBeGreaterThanOrEqual(0);

      // Verify every section has an id, number, and title
      parsed.sections.forEach((sec, idx) => {
        expect(sec.id).toBeTruthy();
        expect(sec.number).toBe(String(idx + 1).padStart(2, "0"));
        expect(sec.title).toBeTruthy();
      });
    });
  });

  it("extracts RunStack diagrams and ASCII art completely", () => {
    const runstack = caseStudiesData.find((cs) => cs.slug === "runstack");
    expect(runstack).toBeDefined();
    if (!runstack) return;

    const parsed = parseCaseStudyContent(runstack.content);
    expect(parsed.totalDiagrams).toBeGreaterThanOrEqual(20);

    const problemSec = parsed.sections.find((s) => s.id === "problem");
    expect(problemSec).toBeDefined();
    expect(problemSec?.sectionType).toBe("problem");
    expect(problemSec?.constraints.length).toBeGreaterThanOrEqual(5);
    expect(problemSec?.diagrams.length).toBeGreaterThanOrEqual(1);

    // Verify ASCII characters are preserved
    const diag = problemSec?.diagrams[0];
    expect(diag?.ascii).toContain("DISTRIBUTED EXECUTION");
    expect(diag?.ascii).toContain("COORDINATION");
  });

  it("extracts Engineering Challenges and Solutions cleanly", () => {
    const runstack = caseStudiesData.find((cs) => cs.slug === "runstack");
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

  it("extracts Technical Decisions and Measurable Outcomes", () => {
    const runstack = caseStudiesData.find((cs) => cs.slug === "runstack");
    if (!runstack) return;

    const parsed = parseCaseStudyContent(runstack.content);
    const decisionsSec = parsed.sections.find((s) => s.id === "decisions");
    expect(decisionsSec).toBeDefined();
    expect(decisionsSec?.decisions.length).toBe(6);

    const outcomesSec = parsed.sections.find((s) => s.id === "outcomes");
    expect(outcomesSec).toBeDefined();
    expect(outcomesSec?.outcomes.length).toBe(6);
  });

  it("extracts all structured sections cleanly from Subscription Tracker", () => {
    const subTracker = caseStudiesData.find((cs) => cs.slug === "subscription-tracker");
    expect(subTracker).toBeDefined();
    if (!subTracker) return;

    const parsed = parseCaseStudyContent(subTracker.content);
    expect(parsed.sections.length).toBe(16);
    expect(parsed.totalDiagrams).toBeGreaterThanOrEqual(15);

    // Problem constraints
    const problemSec = parsed.sections.find((s) => s.id === "problem");
    expect(problemSec).toBeDefined();
    expect(problemSec?.constraints.length).toBe(7);
    expect(problemSec?.diagrams.length).toBeGreaterThanOrEqual(1);

    // Challenges
    const challengesSec = parsed.sections.find((s) => s.id === "challenges");
    expect(challengesSec).toBeDefined();
    expect(challengesSec?.challenges.length).toBe(5);
    challengesSec?.challenges.forEach((ch, i) => {
      expect(ch.num).toBe(String(i + 1).padStart(2, "0"));
      expect(ch.title).not.toMatch(/^\d+\.\s*/);
      expect(ch.tag).not.toContain("Impact:");
      expect(ch.impact).toBeTruthy();
    });

    // Decisions
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

    // Technical Rigor Table
    const rigorSec = parsed.sections.find((s) => s.id === "rigor");
    expect(rigorSec).toBeDefined();
    expect(rigorSec?.tables.length).toBeGreaterThanOrEqual(1);
    expect(rigorSec?.tables[0].headers.length).toBeGreaterThan(0);
    expect(rigorSec?.tables[0].rows.length).toBeGreaterThan(0);

    // API Surface Tables
    const apiSec = parsed.sections.find((s) => s.id === "api-surface");
    expect(apiSec).toBeDefined();
    expect(apiSec?.tables.length).toBe(2);
    expect(apiSec?.tables[0].title).toBe("Implemented Production Endpoints");
    expect(apiSec?.tables[1].title).toBe("Scaffolded Router Definitions in Repo");
    expect(apiSec?.tables[0].rows.length).toBe(6);
    expect(apiSec?.tables[1].rows.length).toBe(7);
  });
});

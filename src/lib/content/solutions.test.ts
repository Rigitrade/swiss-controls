import { describe, it, expect } from "vitest"
import { SOLUTION_SLUGS, SOLUTIONS, getSolution } from "./solutions"

describe("solutions registry", () => {
  it("SOLUTION_SLUGS contains exactly 4 slugs in order", () => {
    expect(SOLUTION_SLUGS).toEqual([
      "operational-modernization",
      "energy-transition",
      "industrial-digitalization",
      "capital-investment",
    ])
  })

  it("getSolution returns the correct solution for energy-transition", () => {
    const solution = getSolution("energy-transition")
    expect(solution).toBeDefined()
    expect(solution?.title).toBe("Energy Transition & Infrastructure Reliability")
  })

  it("getSolution returns undefined for unknown slug", () => {
    const solution = getSolution("nope")
    expect(solution).toBeUndefined()
  })
})

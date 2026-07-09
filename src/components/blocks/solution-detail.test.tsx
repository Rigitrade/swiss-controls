import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { SolutionDetail } from "./solution-detail"

describe("SolutionDetail", () => {
  it("renders the approach and each capability", () => {
    render(
      <SolutionDetail
        challenge="Our critical infrastructure is aging."
        approach="We bridge the gap between legacy systems and modern efficiency."
        capabilities={[
          "Plant Modernization & Automation Migration",
          "Retrofit Engineering & Electrical Upgrades",
          "Lifecycle Extension & Asset Optimization",
        ]}
      />,
    )
    expect(
      screen.getByText("We bridge the gap between legacy systems and modern efficiency."),
    ).toBeInTheDocument()
    expect(screen.getByText("Plant Modernization & Automation Migration")).toBeInTheDocument()
    expect(screen.getByText("Retrofit Engineering & Electrical Upgrades")).toBeInTheDocument()
    expect(screen.getByText("Lifecycle Extension & Asset Optimization")).toBeInTheDocument()
  })
})

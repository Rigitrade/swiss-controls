import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { SolutionsIndex } from "./solutions-index"

const items = [
  {
    slug: "operational-modernization",
    title: "Operational Modernization & Asset Lifecycle",
    summary: "Systematically audit and upgrade legacy systems.",
    image: "/img/solutions/operational-modernization.jpg",
    capabilities: ["Plant Modernization & Automation Migration", "Retrofit Engineering", "Lifecycle Extension"],
  },
  {
    slug: "energy-transition",
    title: "Energy Transition & Infrastructure Reliability",
    summary: "Design robust electrical infrastructure.",
    image: "/img/solutions/energy-transition.jpg",
    capabilities: ["Energy Management", "Power Distribution", "Arc Flash Studies"],
  },
]

describe("SolutionsIndex", () => {
  it("links each row to its localized solution route", () => {
    render(<SolutionsIndex number="01" label="OUR SOLUTIONS" items={items} locale="en" />)
    const link = screen.getByRole("link", { name: "Operational Modernization & Asset Lifecycle" })
    expect(link).toHaveAttribute("href", "/en/solutions/operational-modernization")
  })

  it("renders a capability tag for a solution", () => {
    render(<SolutionsIndex number="01" label="OUR SOLUTIONS" items={items} locale="en" />)
    expect(screen.getByText("Power Distribution")).toBeInTheDocument()
  })
})

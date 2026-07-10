import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { SolutionsGrid } from "./solutions-grid"

const content = {
  number: "01", label: "SOLUTIONS",
  items: [
    { slug: "operational-modernization", title: "Operational Modernization & Asset Lifecycle", summary: "…", image: "/img/solutions/operational-modernization.jpg" },
    { slug: "energy-transition", title: "Energy Transition & Infrastructure Reliability", summary: "…", image: "/img/solutions/energy-transition.jpg" },
  ],
}

describe("SolutionsGrid", () => {
  it("links each card to the localized solution route", () => {
    render(<SolutionsGrid content={content} locale="en" />)
    const link = screen.getByRole("link", { name: /Operational Modernization/ })
    expect(link).toHaveAttribute("href", "/en/solutions/operational-modernization")
  })

  it("renders the solution title", () => {
    render(<SolutionsGrid content={content} locale="en" />)
    expect(screen.getByText("Energy Transition & Infrastructure Reliability")).toBeInTheDocument()
  })
})

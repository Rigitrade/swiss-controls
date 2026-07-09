import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { IndustriesGroups } from "./industries-groups"

describe("IndustriesGroups", () => {
  it("renders each category and its member items", () => {
    render(
      <IndustriesGroups
        number="03"
        label="INDUSTRIES"
        intro="We serve organizations across the industrial spectrum."
        groups={[
          {
            category: "Energy & Utilities",
            items: ["Power Generation", "Renewables", "Utilities", "Oil & Gas", "Hydrogen"],
          },
          {
            category: "Heavy Industry",
            items: ["Mining", "Steel", "Cement", "Metal Processing"],
          },
        ]}
      />,
    )
    expect(screen.getByText("Energy & Utilities")).toBeInTheDocument()
    expect(screen.getByText("Hydrogen")).toBeInTheDocument()
    expect(screen.getByText("Heavy Industry")).toBeInTheDocument()
    expect(screen.getByText("Mining")).toBeInTheDocument()
  })
})

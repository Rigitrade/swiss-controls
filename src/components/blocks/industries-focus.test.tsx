import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { IndustriesFocus } from "./industries-focus"

const groups = [
  { category: "Energy & Utilities", items: ["Power Generation", "Renewables"], image: "/img/industries/energy-utilities.jpg" },
  { category: "Manufacturing", items: ["Automotive", "Packaging"], image: "/img/industries/manufacturing.jpg" },
]

describe("IndustriesFocus", () => {
  it("renders the label and heading", () => {
    render(<IndustriesFocus label="INDUSTRIES WE SERVE" heading="Deep domain expertise." groups={groups} />)
    expect(screen.getByText("INDUSTRIES WE SERVE")).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 2, name: "Deep domain expertise." })).toBeInTheDocument()
  })

  it("renders each group's name and its sub-items", () => {
    render(<IndustriesFocus label="X" heading="Y" groups={groups} />)
    expect(screen.getByRole("heading", { level: 3, name: "Energy & Utilities" })).toBeInTheDocument()
    expect(screen.getByText("Renewables")).toBeInTheDocument()
    expect(screen.getByText("Automotive")).toBeInTheDocument()
  })
})

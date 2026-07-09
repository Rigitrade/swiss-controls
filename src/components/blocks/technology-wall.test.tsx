import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { TechnologyWall } from "./technology-wall"
const content = { number: "04", label: "TECH", note: "Independent.", vendors: ["ABB", "Siemens"] }
describe("TechnologyWall", () => {
  it("renders vendors", () => {
    render(<TechnologyWall content={content} />)
    expect(screen.getByText("ABB")).toBeInTheDocument()
    expect(screen.getByText("Siemens")).toBeInTheDocument()
  })
})

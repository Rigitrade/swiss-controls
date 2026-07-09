import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { IndustriesGrid } from "./industries-grid"

describe("IndustriesGrid", () => {
  it("renders items", () => {
    render(<IndustriesGrid number="05" label="INDUSTRIES" intro="x" items={["Oil & Gas", "Utilities"]} />)
    expect(screen.getByText("Oil & Gas")).toBeInTheDocument()
    expect(screen.getByText("Utilities")).toBeInTheDocument()
  })
})

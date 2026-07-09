import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ProcessTimeline } from "./process-timeline"

const content = {
  number: "03",
  label: "PROCESS",
  steps: [{ step: "Discover", detail: "a" }, { step: "Support", detail: "b" }],
}

describe("ProcessTimeline", () => {
  it("renders each step", () => {
    render(<ProcessTimeline content={content} />)
    expect(screen.getByText("Discover")).toBeInTheDocument()
    expect(screen.getByText("Support")).toBeInTheDocument()
  })
})

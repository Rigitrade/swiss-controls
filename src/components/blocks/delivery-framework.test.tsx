import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { DeliveryFramework } from "./delivery-framework"

const content = {
  number: "04",
  label: "DELIVERY FRAMEWORK",
  steps: [
    { step: "Discover", detail: "Understand operations and objectives." },
    { step: "Assess", detail: "Evaluate existing assets and risks." },
    { step: "Design", detail: "Develop the engineering solution:", points: ["Electrical Engineering", "Automation Architecture"] },
    { step: "Build", detail: "Manufacture, assemble, and integrate:", points: ["Electrical Panels", "PLC Panels"] },
    { step: "Validate", detail: "Internal QA before delivery:", points: ["FAT", "Simulation"] },
    { step: "Deploy", detail: "Install and integrate on site:", points: ["Installation"] },
    { step: "Commission", detail: "Startup and commissioning:", points: ["SAT"] },
    { step: "Optimize", detail: "After commissioning:", points: ["AI Analytics"] },
    { step: "Support", detail: "Long-term partnership:", points: ["Lifecycle Services"] },
  ],
}

describe("DeliveryFramework", () => {
  it("renders the first and last step", () => {
    render(<DeliveryFramework content={content} />)
    expect(screen.getByText("Discover")).toBeInTheDocument()
    expect(screen.getByText("Support")).toBeInTheDocument()
  })

  it("renders all 9 steps", () => {
    render(<DeliveryFramework content={content} />)
    for (const s of content.steps) {
      expect(screen.getByText(s.step)).toBeInTheDocument()
    }
  })

  it("renders sub-bullets when a step has points", () => {
    render(<DeliveryFramework content={content} />)
    expect(screen.getByText("FAT")).toBeInTheDocument()
    expect(screen.getByText("Automation Architecture")).toBeInTheDocument()
  })
})

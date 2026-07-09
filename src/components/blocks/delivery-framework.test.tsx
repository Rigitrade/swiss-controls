import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { DeliveryFramework } from "./delivery-framework"

const content = {
  number: "05",
  label: "DELIVERY FRAMEWORK",
  steps: [
    { step: "Discover", detail: "Understand business objectives." },
    { step: "Assess", detail: "Evaluate existing assets." },
    { step: "Design", detail: "Develop independent concepts." },
    { step: "Engineer", detail: "Produce detailed engineering." },
    { step: "Validate", detail: "Verify compliance." },
    { step: "Commission", detail: "Support installation and startup." },
    { step: "Optimize", detail: "Improve performance." },
    { step: "Support", detail: "Provide lifecycle engineering." },
  ],
}

describe("DeliveryFramework", () => {
  it("renders the first and last step", () => {
    render(<DeliveryFramework content={content} />)
    expect(screen.getByText("Discover")).toBeInTheDocument()
    expect(screen.getByText("Support")).toBeInTheDocument()
  })

  it("renders all 8 steps", () => {
    render(<DeliveryFramework content={content} />)
    for (const s of content.steps) {
      expect(screen.getByText(s.step)).toBeInTheDocument()
    }
  })
})

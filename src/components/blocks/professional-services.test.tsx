import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ProfessionalServices } from "./professional-services"

const items = [
  { title: "Factory & Site Acceptance Testing (FAT/SAT)", detail: "Verifying system functionality." },
  { title: "Commissioning & Startup", detail: "Seamless integration of automation." },
  { title: "Training & Knowledge Transfer", detail: "Empowering your internal teams." },
  { title: "Support & Troubleshooting", detail: "Continuous technical review." },
]

describe("ProfessionalServices", () => {
  it("renders the heading and intro", () => {
    render(<ProfessionalServices heading="Professional Services" intro="Through disciplined execution." items={items} />)
    expect(screen.getByRole("heading", { level: 2, name: "Professional Services" })).toBeInTheDocument()
    expect(screen.getByText("Through disciplined execution.")).toBeInTheDocument()
  })

  it("renders each service item", () => {
    render(<ProfessionalServices heading="Professional Services" intro="x" items={items} />)
    for (const item of items) {
      expect(screen.getByText(item.title)).toBeInTheDocument()
    }
  })
})

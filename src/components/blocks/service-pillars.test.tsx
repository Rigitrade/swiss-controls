import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ServicePillars } from "./service-pillars"

const content = {
  number: "01",
  label: "OUR SERVICES",
  items: [
    {
      title: "Automation",
      summary: "Control systems engineered for uptime.",
      points: ["PLC Systems", "DCS Systems", "SCADA Systems", "Control Panels"],
    },
    {
      title: "Electrification",
      summary: "Robust power and drive infrastructure.",
      points: ["Power Distribution", "Motor Control & Drives", "Switchgear & Protection", "Energy Management"],
    },
    {
      title: "Digital Transformation",
      summary: "A single, actionable view of your operation.",
      points: ["Industrial IoT", "Data & Analytics", "Industry 4.0 / MES", "OT Cybersecurity"],
    },
    {
      title: "AI Condition Monitoring",
      summary: "Predictive intelligence in real time.",
      points: ["Predictive Maintenance", "Anomaly Detection", "Asset Health Monitoring", "Real-Time Analytics"],
    },
  ],
}

describe("ServicePillars", () => {
  it("renders the section label", () => {
    render(<ServicePillars content={content} />)
    expect(screen.getByText("OUR SERVICES")).toBeInTheDocument()
  })

  it("renders each pillar as a labelled, focusable region", () => {
    render(<ServicePillars content={content} />)
    // The accessible name comes from the reveal-face heading (aria-labelledby).
    const automation = screen.getByRole("article", { name: "Automation" })
    expect(automation).toHaveAttribute("tabindex", "0")
  })

  it("renders every capability point", () => {
    render(<ServicePillars content={content} />)
    expect(screen.getByText("PLC Systems")).toBeInTheDocument()
    expect(screen.getByText("OT Cybersecurity")).toBeInTheDocument()
    expect(screen.getByText("Real-Time Analytics")).toBeInTheDocument()
  })
})

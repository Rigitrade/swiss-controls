import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ServicesGrid } from "./services-grid"

const content = {
  number: "02", label: "SERVICES",
  items: [
    { slug: "industrial-automation", icon: "Cpu", title: "Industrial Automation", summary: "…" },
    { slug: "system-integration", icon: "Network", title: "System Integration", summary: "…" },
  ],
}

describe("ServicesGrid", () => {
  it("links each card to the localized service route", () => {
    render(<ServicesGrid content={content} locale="en" />)
    expect(screen.getByRole("link", { name: /Industrial Automation/ }))
      .toHaveAttribute("href", "/en/services/industrial-automation")
  })
})

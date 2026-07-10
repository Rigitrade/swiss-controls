import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { PartnerStrip } from "./partner-strip"

const content = {
  label: "PLATFORM FLUENCY",
  statement: "Vendor-independent by principle — fluent across the industrial platforms you already run.",
  cta: { label: "Technology Expertise", href: "/technology" },
  items: ["ABB", "Siemens", "Schneider Electric", "Honeywell"],
}

describe("PartnerStrip", () => {
  it("renders each partner wordmark", () => {
    render(<PartnerStrip content={content} locale="en" />)
    expect(screen.getByText("ABB")).toBeInTheDocument()
    expect(screen.getByText("Honeywell")).toBeInTheDocument()
  })

  it("links the CTA to the localized technology route", () => {
    render(<PartnerStrip content={content} locale="en" />)
    expect(screen.getByRole("link", { name: /Technology Expertise/ })).toHaveAttribute(
      "href",
      "/en/technology",
    )
  })
})

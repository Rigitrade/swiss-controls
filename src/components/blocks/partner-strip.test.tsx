import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { PartnerStrip } from "./partner-strip"

const content = {
  number: "05",
  label: "PLATFORM FLUENCY",
  statement: "Vendor-independent by principle — fluent across the industrial platforms you already run.",
  cta: { label: "Technology Expertise", href: "/technology" },
  items: [
    { name: "ABB", logo: "/img/logos/abb.svg" },
    { name: "Siemens", logo: "/img/logos/siemens.svg" },
    { name: "Schneider Electric", logo: "/img/logos/schneider-electric.svg" },
    { name: "Honeywell", logo: "/img/logos/honeywell.svg" },
  ],
}

describe("PartnerStrip", () => {
  it("renders each partner logo with its brand name as alt text", () => {
    render(<PartnerStrip content={content} locale="en" />)
    expect(screen.getByAltText("ABB")).toHaveAttribute("src", "/img/logos/abb.svg")
    expect(screen.getByAltText("Honeywell")).toBeInTheDocument()
  })

  it("links the CTA to the localized technology route", () => {
    render(<PartnerStrip content={content} locale="en" />)
    expect(screen.getByRole("link", { name: /Technology Expertise/ })).toHaveAttribute(
      "href",
      "/en/technology",
    )
  })
})

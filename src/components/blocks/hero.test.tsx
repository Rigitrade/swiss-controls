import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Hero } from "./hero"

const hero = {
  eyebrow: "A Brand by RIGITRADE AG",
  wordmark: "SWISS CONTROLS",
  headline: "Engineering Leadership. Swiss Precision. Industrial Transformation.",
  subheadline: "We are an independent engineering advisory firm.",
  positioning: "Independent Engineering. Intelligent Integration. Reliable Performance.",
  primaryCta: { label: "Partner With Us", href: "/contact" },
}

describe("Hero", () => {
  it("renders wordmark, headline and CTA to the localized contact route", () => {
    render(<Hero hero={hero} locale="en" />)
    // The hero renders the shared Wordmark lockup (lowercase "swiss controls").
    expect(screen.getByText("swiss controls")).toBeInTheDocument()
    expect(
      screen.getByText(
        "Engineering Leadership. Swiss Precision. Industrial Transformation.",
      ),
    ).toBeInTheDocument()
    const cta = screen.getByRole("link", { name: "Partner With Us" })
    expect(cta).toHaveAttribute("href", "/en/contact")
  })
})

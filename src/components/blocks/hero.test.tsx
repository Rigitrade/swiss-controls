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
  it("renders the accessible headline", () => {
    render(<Hero hero={hero} locale="en" />)
    // The visible focal point is the animated words; the full headline stays
    // available to screen readers via an sr-only copy.
    expect(
      screen.getByText(
        "Engineering Leadership. Swiss Precision. Industrial Transformation.",
      ),
    ).toBeInTheDocument()
  })
})

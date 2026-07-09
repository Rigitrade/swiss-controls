import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Hero } from "./hero"

const hero = {
  wordmark: "SWISS CONTROLS",
  eyebrow: "A Brand by RIGITRADE AG",
  headline: "Engineering the Future of Industry",
  body: "We deliver independent engineering.",
  positioning: "Independent Engineering. Intelligent Integration. Reliable Performance.",
  primaryCta: { label: "Discuss Your Project", href: "/contact" },
}

describe("Hero", () => {
  it("renders wordmark, headline and CTA to the localized contact route", () => {
    render(<Hero hero={hero} locale="en" />)
    expect(screen.getByText("SWISS CONTROLS")).toBeInTheDocument()
    expect(screen.getByText("Engineering the Future of Industry")).toBeInTheDocument()
    const cta = screen.getByRole("link", { name: "Discuss Your Project" })
    expect(cta).toHaveAttribute("href", "/en/contact")
  })
})

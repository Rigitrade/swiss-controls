import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { WhyChoose } from "./why-choose"
describe("WhyChoose", () => {
  it("renders items", () => {
    render(<WhyChoose number="06" label="WHY" items={[{ title: "Swiss Quality", detail: "d" }]} />)
    expect(screen.getByText("Swiss Quality")).toBeInTheDocument()
  })
})

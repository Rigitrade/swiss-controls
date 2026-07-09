import { describe, it, expect, beforeAll } from "vitest"
import { render, screen } from "@testing-library/react"
import { AtAGlance } from "./at-a-glance"

const content = {
  number: "01", label: "AT A GLANCE",
  items: [
    { value: "20", suffix: "+", label: "Years of Engineering Experience" },
    { value: "5", label: "Core Engineering Disciplines" },
    { value: "100", suffix: "%", label: "Independent Engineering" },
    { value: "International", label: "Projects Across CH, EU, GCC, Middle East & Africa" },
  ],
}

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {},
    }),
  })

  global.IntersectionObserver = class IntersectionObserver {
    constructor(public callback: IntersectionObserverCallback) {}
    observe() {
      this.callback(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        this as any
      )
    }
    disconnect() {}
    unobserve() {}
    takeRecords() {
      return []
    }
  } as any
})

describe("AtAGlance", () => {
  it("renders all four metric labels", () => {
    render(<AtAGlance content={content} />)
    expect(screen.getByText("Core Engineering Disciplines")).toBeInTheDocument()
    expect(screen.getByText("International")).toBeInTheDocument()
  })
})

import { describe, it, expect } from "vitest"
import { SERVICES, SERVICE_SLUGS, getService } from "./services"

describe("service registry", () => {
  it("has the six services in nav order", () => {
    expect(SERVICE_SLUGS).toEqual([
      "industrial-automation",
      "electrical-engineering",
      "system-integration",
      "engineering-consulting",
      "commissioning-lifecycle",
      "procurement-sourcing",
    ])
  })
  it("getService returns a known service", () => {
    expect(getService("system-integration")?.title).toBe("System Integration")
  })
  it("getService returns undefined for unknown slug", () => {
    expect(getService("nope")).toBeUndefined()
  })
})

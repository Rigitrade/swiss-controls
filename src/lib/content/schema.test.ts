import { describe, it, expect } from "vitest"
import {
  homeSchema,
  serviceDetailSchema,
  servicesIndexSchema,
} from "./schema"

describe("homeSchema", () => {
  it("requires hero, metrics, services, process, technologies, industries, whyChoose, finalCta", () => {
    const result = homeSchema.safeParse({})
    expect(result.success).toBe(false)
  })
})

describe("serviceDetailSchema", () => {
  it("accepts a service with a numbered catalog", () => {
    const ok = serviceDetailSchema.safeParse({
      pageHeader: { number: "01", label: "SERVICE", title: "T", intro: "i" },
      summary: "s",
      catalog: ["PLC Programming", "SCADA / HMI Development"],
    })
    expect(ok.success).toBe(true)
  })
  it("rejects an empty catalog", () => {
    const bad = serviceDetailSchema.safeParse({
      pageHeader: { number: "01", label: "S", title: "T", intro: "i" },
      summary: "s",
      catalog: [],
    })
    expect(bad.success).toBe(false)
  })
})

describe("servicesIndexSchema", () => {
  it("accepts a page header + intro", () => {
    const ok = servicesIndexSchema.safeParse({
      pageHeader: { number: "01", label: "SERVICES", title: "T", intro: "i" },
    })
    expect(ok.success).toBe(true)
  })
})

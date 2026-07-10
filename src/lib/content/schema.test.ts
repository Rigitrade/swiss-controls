import { describe, it, expect } from "vitest"
import {
  homeSchema,
  solutionsIndexSchema,
  solutionDetailSchema,
  whoWeAreSchema,
  technologySchema,
  contactPageSchema,
} from "./schema"

const validHome = {
  hero: {
    eyebrow: "A Brand by RIGITRADE AG",
    wordmark: "SWISS CONTROLS",
    headline: "Engineering Leadership. Swiss Precision. Industrial Transformation.",
    subheadline: "Some subheadline paragraph.",
    positioning: "The three-part positioning line.",
    primaryCta: { label: "Partner With Us", href: "/contact" },
  },
  purpose: {
    heading: "Engineering with Purpose",
    body: "We believe successful industrial projects begin long before equipment is selected.",
  },
  metrics: {
    number: "01",
    label: "AT A GLANCE",
    items: [
      { value: "100+", suffix: "", label: "Years Combined Engineering Leadership" },
      { value: "30+", suffix: "", label: "Countries Served" },
      { value: "20+", suffix: "", label: "Industry Sectors Supported" },
      { value: "End-to-End", label: "Industrial Asset Lifecycle" },
    ],
  },
  whyPartner: {
    number: "02",
    label: "WHY PARTNER WITH US",
    items: [
      { title: "Executive Engineering Leadership", detail: "Industrial expertise developed across global engineering organizations." },
      { title: "Independent Engineering", detail: "Vendor-neutral recommendations focused exclusively on technical suitability." },
      { title: "Swiss Engineering Standards", detail: "Precision, transparency, reliability, and disciplined project governance." },
      { title: "Regional Execution Power", detail: "Direct engineering expertise located in Switzerland, Dubai, Cairo, and Saudi Arabia." },
    ],
  },
  deliveryFramework: {
    number: "03",
    label: "DELIVERY FRAMEWORK",
    steps: [
      { step: "Discover", detail: "Understand business objectives, operational challenges, and project requirements." },
      { step: "Assess", detail: "Evaluate existing assets, risks, constraints, and opportunities." },
      { step: "Design", detail: "Develop independent engineering concepts and solution architectures." },
      { step: "Engineer", detail: "Produce detailed multidisciplinary engineering, software, and electrical designs." },
      { step: "Validate", detail: "Verify compliance, functionality, quality, and operational readiness through reviews and testing." },
      { step: "Commission", detail: "Support installation, FAT, SAT, startup, and performance verification." },
      { step: "Optimize", detail: "Improve performance, energy efficiency, reliability, and operational intelligence." },
      { step: "Support", detail: "Provide lifecycle engineering, modernization, troubleshooting, and continuous improvement." },
    ],
  },
  partners: {
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
  },
}

describe("homeSchema", () => {
  it("rejects an empty object", () => {
    const result = homeSchema.safeParse({})
    expect(result.success).toBe(false)
  })

  it("accepts a full valid home object", () => {
    const result = homeSchema.safeParse(validHome)
    expect(result.success).toBe(true)
  })

  it("requires exactly 4 metrics items", () => {
    const bad = homeSchema.safeParse({
      ...validHome,
      metrics: { ...validHome.metrics, items: validHome.metrics.items.slice(0, 2) },
    })
    expect(bad.success).toBe(false)
  })
})

describe("solutionsIndexSchema", () => {
  it("accepts a page header", () => {
    const ok = solutionsIndexSchema.safeParse({
      pageHeader: { number: "01", label: "SOLUTIONS", title: "T", intro: "i" },
    })
    expect(ok.success).toBe(true)
  })

  it("rejects a missing page header", () => {
    const bad = solutionsIndexSchema.safeParse({})
    expect(bad.success).toBe(false)
  })
})

describe("solutionDetailSchema", () => {
  const base = {
    pageHeader: { number: "01", label: "SOLUTION", title: "T", intro: "i" },
    challenge: "Our critical infrastructure is aging.",
    approach: "We bridge the gap between legacy systems and modern efficiency.",
  }

  it("accepts a solution with a non-empty capabilities list", () => {
    const ok = solutionDetailSchema.safeParse({
      ...base,
      capabilities: ["Plant Modernization & Automation Migration"],
    })
    expect(ok.success).toBe(true)
  })

  it("rejects an empty capabilities list", () => {
    const bad = solutionDetailSchema.safeParse({ ...base, capabilities: [] })
    expect(bad.success).toBe(false)
  })
})

describe("whoWeAreSchema", () => {
  const base = {
    pageHeader: { number: "01", label: "WHO WE ARE", title: "T", intro: "i" },
    narrative: ["More Than Engineers. Trusted Industrial Advisors."],
    executiveLeadership: ["100+ years combined leadership across Schneider Electric, ABB, Siemens."],
    mission: "Our mission statement.",
    vision: "Our vision statement.",
  }

  it("requires pillars", () => {
    const bad = whoWeAreSchema.safeParse({
      ...base,
      industries: [{ category: "Energy & Utilities", items: ["Power Generation"] }],
    })
    expect(bad.success).toBe(false)
  })

  it("requires industries", () => {
    const bad = whoWeAreSchema.safeParse({
      ...base,
      pillars: [{ title: "Precision", detail: "detail" }],
    })
    expect(bad.success).toBe(false)
  })

  it("accepts a full valid object", () => {
    const ok = whoWeAreSchema.safeParse({
      ...base,
      pillars: [
        { title: "Precision", detail: "detail" },
        { title: "Independence", detail: "detail" },
      ],
      industries: [
        { category: "Energy & Utilities", items: ["Power Generation", "Renewables"] },
        { category: "Process Industries", items: ["Chemical", "Water"] },
      ],
    })
    expect(ok.success).toBe(true)
  })
})

describe("technologySchema", () => {
  const base = {
    pageHeader: { number: "01", label: "TECHNOLOGY", title: "T", intro: "i" },
    flow: ["Automation", "Power", "Motion", "Industrial Software", "Networks", "Digital"],
    commissioning: {
      heading: "Precision Is Our Standard",
      body: "Some body text.",
      items: ["Factory Acceptance Testing (FAT) & Site Acceptance Testing (SAT)"],
    },
  }

  it("requires categories", () => {
    const bad = technologySchema.safeParse(base)
    expect(bad.success).toBe(false)
  })

  it("accepts a full valid object", () => {
    const ok = technologySchema.safeParse({
      ...base,
      categories: [
        { category: "Automation Platforms", items: ["PLC", "SCADA", "DCS", "RTU", "HMI", "Industrial IoT"] },
        { category: "Motion & Drives", items: ["VFD", "VSD", "Servo"] },
      ],
    })
    expect(ok.success).toBe(true)
  })
})

describe("contactPageSchema", () => {
  it("accepts a page header, office, and regions", () => {
    const ok = contactPageSchema.safeParse({
      pageHeader: { number: "01", label: "CONTACT", title: "T", intro: "i" },
      office: {
        address: "Schaffhauserstrasse 550, 8052 Zurich",
        phone: "+41 76 366 66 69",
        email: "info@swiss-controls.com",
      },
      regions: ["Switzerland", "Dubai", "Cairo", "Saudi Arabia"],
    })
    expect(ok.success).toBe(true)
  })

  it("rejects a missing regions array", () => {
    const bad = contactPageSchema.safeParse({
      pageHeader: { number: "01", label: "CONTACT", title: "T", intro: "i" },
      office: {
        address: "Schaffhauserstrasse 550, 8052 Zurich",
        phone: "+41 76 366 66 69",
        email: "info@swiss-controls.com",
      },
    })
    expect(bad.success).toBe(false)
  })
})

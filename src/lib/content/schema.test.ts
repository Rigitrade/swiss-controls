import { describe, it, expect } from "vitest"
import {
  homeSchema,
  solutionsIndexSchema,
  solutionDetailSchema,
  aboutSchema,
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
  services: {
    number: "01",
    label: "OUR SERVICES",
    items: [
      { title: "Automation", summary: "Control systems engineered for uptime.", points: ["PLC Systems", "SCADA Systems"] },
      { title: "Electrification", summary: "Robust power and drive infrastructure.", points: ["Power Distribution"] },
      { title: "Digital Transformation", summary: "A single, actionable view of your operation.", points: ["Industrial IoT"] },
      { title: "AI Condition Monitoring", summary: "Predictive intelligence in real time.", points: ["Predictive Maintenance"] },
    ],
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

describe("aboutSchema", () => {
  const base = {
    pageHeader: { number: "01", label: "", title: "About Us", intro: "i" },
    legalIdentity: "Backed by Rigitrade AG (UID CHE-199.884.159).",
  }

  it("requires beliefs and leadership", () => {
    const bad = aboutSchema.safeParse(base)
    expect(bad.success).toBe(false)
  })

  it("accepts a full valid object", () => {
    const ok = aboutSchema.safeParse({
      ...base,
      beliefs: [
        { title: "Swiss Precision", body: "Some belief body." },
        { title: "Zero Bureaucracy", body: "Another belief body." },
      ],
      leadership: {
        intro: "An elite executive task force.",
        profiles: [
          {
            role: "Chief Technology Visionary",
            points: [
              { label: "The Authority", text: "Over 44 years of mastery." },
              { label: "The Track Record", text: "Rescued a $100M vessel." },
            ],
          },
        ],
      },
    })
    expect(ok.success).toBe(true)
  })
})

describe("technologySchema", () => {
  const base = {
    pageHeader: { number: "01", label: "", title: "T", intro: "i" },
    openEcosystem: { heading: "Open Ecosystem", body: "Some body text." },
  }

  it("requires coreTechnologies", () => {
    const bad = technologySchema.safeParse(base)
    expect(bad.success).toBe(false)
  })

  it("accepts a full valid object", () => {
    const ok = technologySchema.safeParse({
      ...base,
      coreTechnologies: [
        { group: "Hardware", subtitle: "Automation, Power & Motion", image: "/img/services/automation.jpg", items: ["PLC", "DCS"] },
        { group: "Software", subtitle: "Connectivity & Intelligence Layer", image: "/img/services/digital-transformation.jpg", items: ["SCADA & HMI Software"] },
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

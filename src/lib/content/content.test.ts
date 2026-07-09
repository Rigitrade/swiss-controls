import { describe, it, expect } from "vitest"
import { loadPageContent, loadSharedContent } from "./load"
import {
  homeSchema,
  solutionsIndexSchema,
  solutionDetailSchema,
  whoWeAreSchema,
  technologySchema,
  contactPageSchema,
  privacyPageSchema,
  navSchema,
  footerSchema,
} from "./schema"
import { SOLUTION_SLUGS } from "./solutions"

describe("content loads and validates", () => {
  it("home", async () => { await loadPageContent("en", "home", homeSchema) })
  it("solutions index", async () => { await loadPageContent("en", "solutions/index", solutionsIndexSchema) })
  it("who we are", async () => { await loadPageContent("en", "who-we-are", whoWeAreSchema) })
  it("technology", async () => { await loadPageContent("en", "technology", technologySchema) })
  it("contact", async () => { await loadPageContent("en", "contact", contactPageSchema) })
  it("privacy", async () => { await loadPageContent("en", "privacy", privacyPageSchema) })
  it("imprint", async () => { await loadPageContent("en", "imprint", privacyPageSchema) })
  it("nav + footer", async () => {
    await loadSharedContent("en", "nav", navSchema)
    await loadSharedContent("en", "footer", footerSchema)
  })
  it("all four solution detail files", async () => {
    for (const slug of SOLUTION_SLUGS) {
      const { frontmatter } = await loadPageContent(
        "en",
        `solutions/${slug}`,
        solutionDetailSchema,
      )
      expect(frontmatter.capabilities.length).toBeGreaterThan(0)
    }
  })
})

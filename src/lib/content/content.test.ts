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
  it("about", async () => { await loadPageContent("en", "about", whoWeAreSchema) })
  it("technology", async () => { await loadPageContent("en", "technology", technologySchema) })
  it("contact", async () => { await loadPageContent("en", "contact", contactPageSchema) })
  it("privacy", async () => { await loadPageContent("en", "privacy", privacyPageSchema) })
  it("gtc", async () => { await loadPageContent("en", "gtc", privacyPageSchema) })
  it("cookies", async () => { await loadPageContent("en", "cookies", privacyPageSchema) })
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

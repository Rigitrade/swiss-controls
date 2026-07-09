import { describe, it, expect } from "vitest"
import { loadPageContent, loadSharedContent } from "./load"
import {
  homeSchema, aboutPageSchema, industriesPageSchema, contactPageSchema,
  privacyPageSchema, servicesIndexSchema, serviceDetailSchema,
  navSchema, footerSchema,
} from "./schema"
import { SERVICE_SLUGS } from "./services"

describe("content loads and validates", () => {
  it("home", async () => { await loadPageContent("en", "home", homeSchema) })
  it("about", async () => { await loadPageContent("en", "about", aboutPageSchema) })
  it("industries", async () => { await loadPageContent("en", "industries", industriesPageSchema) })
  it("contact", async () => { await loadPageContent("en", "contact", contactPageSchema) })
  it("privacy", async () => { await loadPageContent("en", "privacy", privacyPageSchema) })
  it("imprint", async () => { await loadPageContent("en", "imprint", privacyPageSchema) })
  it("services index", async () => { await loadPageContent("en", "services/index", servicesIndexSchema) })
  it("nav + footer", async () => {
    await loadSharedContent("en", "nav", navSchema)
    await loadSharedContent("en", "footer", footerSchema)
  })
  it("all six service detail files", async () => {
    for (const slug of SERVICE_SLUGS) {
      const { frontmatter } = await loadPageContent("en", `services/${slug}`, serviceDetailSchema)
      expect(frontmatter.catalog.length).toBeGreaterThan(0)
    }
  })
})

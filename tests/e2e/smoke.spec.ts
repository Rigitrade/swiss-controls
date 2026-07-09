import { test, expect } from "@playwright/test"
import AxeBuilder from "@axe-core/playwright"

const ROUTES = [
  "/en/",
  "/en/services/",
  "/en/services/industrial-automation/",
  "/en/services/electrical-engineering/",
  "/en/services/system-integration/",
  "/en/services/engineering-consulting/",
  "/en/services/commissioning-lifecycle/",
  "/en/services/procurement-sourcing/",
  "/en/about/",
  "/en/industries/",
  "/en/contact/",
  "/en/privacy/",
  "/en/imprint/",
] as const

test.describe("smoke: pages load", () => {
  for (const route of ROUTES) {
    test(`${route} loads with a visible top-level heading`, async ({
      page,
    }) => {
      const response = await page.goto(route)
      expect(response?.ok(), `${route} should respond ok`).toBeTruthy()

      const heading = page.locator("h1, h2").first()
      await expect(heading).toBeVisible()
      await expect(heading).not.toBeEmpty()
    })
  }
})

test.describe("smoke: a11y", () => {
  test("/en/ has no serious or critical accessibility violations", async ({
    page,
  }) => {
    await page.goto("/en/")

    // The homepage's entrance animations (framer-motion) fade elements in
    // from opacity 0 with an easing transform. Scanning mid-transition makes
    // axe sample a transiently interpolated, low-contrast color and report a
    // false-positive contrast violation. Freeze all animation/transition and
    // force final opacity before scanning so the scan always evaluates the
    // settled, final visual state. This targets the CSS `opacity` property
    // only (not Tailwind's color-alpha modifiers like `text-ink/70`, which
    // compile to rgba()/color-mix() color values, not `opacity`), so it does
    // not mask genuine low-opacity-text contrast issues.
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation-play-state: paused !important;
          animation-duration: 0s !important;
          transition-duration: 0s !important;
          opacity: 1 !important;
          transform: none !important;
        }
      `,
    })

    const results = await new AxeBuilder({ page }).analyze()

    const seriousOrCritical = results.violations.filter(
      (violation) =>
        violation.impact === "serious" || violation.impact === "critical",
    )

    expect(
      seriousOrCritical,
      JSON.stringify(seriousOrCritical, null, 2),
    ).toEqual([])
  })
})
